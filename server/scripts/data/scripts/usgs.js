var where = require("geoscript/filter").where;
var fids = require("geoscript/filter").fids;

var NAMESPACE_URI = exports.NAMESPACE_URI = "http://www.usgs.gov/";

var TOLERANCE = exports.TOLERANCE = 0.000001; // meters tolerance for intersection tests

var featureRules = [
    {code: "1", process: "js:MustIntersect", subjectLayer: "nhdpoint", subjectFType: 431, objects: [{layer: "nhdflowline"}]},
    {code: "2", process: "js:MustIntersect", subjectLayer: "nhdpoint", subjectFType: 487, objects: [{layer: "nhdflowline"}]},
    {code: "3", process: "js:MustIntersect", subjectLayer: "nhdpoint", subjectFType: 369, objects: [{layer: "nhdline", ftypes: [398]}, {layer: "nhdarea", ftypes: [398]}]},
    {code: "4", process: "js:MustIntersect", subjectLayer: "nhdpoint", subjectFType: 398, objects: [{layer: "nhdflowline", ftypes: [336, 460]}, {layer: "nhdarea", ftypes: [460]}]},
    {code: "5", process: "js:MustIntersectEndpoint", subjectLayer: "nhdpoint", subjectFType: 450, objects: [{layer: "nhdflowline", ftypes: [420, 460]}]},
    {code: "6", process: "js:PipelineMustHaveVerticalRelationship", subjectLayer: "nhdflowline", subjectFType: 428, objects: [{layer: "nhdflowline"}], autoCorrectable: true},
    {code: "7", process: "js:MustNotCross", subjectLayer: "nhdflowline", subjectFType: 460, objects: [{layer: "nhdwaterbody", ftypes: [390]}], autoCorrectable: true},
    {code: "8", process: "js:MustNotCross", subjectLayer: "nhdflowline", subjectFType: 460, objects: [{layer: "nhdflowline", ftypes: [460]}]},
    {code: "9", process: "js:MustIntersectEndpoint", subjectLayer: "nhdflowline", subjectFType: 460, objects: [{layer: "nhdflowline", ftypes: [460]}]},
];

function lower(str) {
    return (str || "").toLowerCase();
}

function getRules(featureInfo) {
    var rules = [];
    if (lower(featureInfo.uri) == lower(NAMESPACE_URI)) {
        var fType = featureInfo.feature.get("FType");
        var name = lower(featureInfo.name);
        var candidate;
        for (var i=0, ii=featureRules.length; i<ii; ++i) {
            candidate = featureRules[i];
            if (lower(candidate.subjectLayer) == name) {
                if (!candidate.subjectFType || candidate.subjectFType == fType) {
                    rules.push(candidate);
                }
            }
        }
    }
    return rules;
};

function getFix(rule) {
    return require("./usgs/fixes/fix-" + rule.code).fix;
}

exports.getQueuedExceptions = function(featureInfo, hints) {
    var exceptions = [];
    var featureType = featureInfo.name;
    var feature = featureInfo.feature;

    var rules = getRules(featureInfo);
    var rule, hint, outputs;
    for (var i=0, ii=rules.length; i<ii; ++i) {
        rule = rules[i];
        hint = hints[rule.code] || {};
        // only test queued or auto-correct rules
        if (hint.queue || (hint.autoCorrect && rule.autoCorrectable)) {
            outputs = getProcessOutputs(featureInfo, rule, !!hint.autoCorrect);
            if (outputs.result == false) {
                var fixed = false;
                if (hint.autoCorrect) {
                    try {
                        var fix = getFix(rule);
                        fixed = fix(featureInfo, outputs, hint.autoCorrect);
                    } catch (err) {
                        LOGGER.warning("fix failed: " + err.message);
                    }
                }
                if (!fixed) {
                    // prepare the exception record
                    exceptions.push({
                        namespace: NAMESPACE_URI,
                        featuretype: featureType,
                        featureid: feature.id,
                        processid: rule.process,
                        exceptionmessage: JSON.stringify(rule)
                    });
                }
            }
        }
    }
    return exceptions;
};

function getProcessOutputs(featureInfo, rule, detail) {
    var feature = featureInfo.feature;
    var featureType = featureInfo.name;
    var geometry = feature.geometry;
    var locator = "processes/" + rule.process.split(":").pop();
    var process = require(locator).process;
    var object, ftypes, selfless, filter, outputs;
    for (var i=0, ii=rule.objects.length; i<ii; ++i) {
        object = rule.objects[i];
        if (object.layer == featureType && feature.id) {
            // make sure to exclude the feature itself it is is already on the layer
            selfless = fids([feature.id]).not;
        } else {
            selfless = undefined;
        }
        ftypes = object.ftypes;
        if (ftypes) {
            filter = where(["FType IN"].concat(ftypes));
            if (selfless) {
                filter = filter.and(selfless);
            }
        } else {
            filter = selfless;
        }
        outputs = process.run({
            geometry: geometry,
            namespace: NAMESPACE_URI,
            featureType: object.layer,
            filter: filter,
            detail: detail
        });
        if (outputs.result == true) {
            // rule was satisfied, no need to continue
            break;
        }
    }
    return outputs;
};

var getFirstException = exports.getFirstException = function(featureInfo, hints) {
    var exception;
    var feature = featureInfo.feature;

    var rules = getRules(featureInfo);
    var rule, hint, satisfies;
    for (var i=0, ii=rules.length; i<ii; ++i) {
        rule = rules[i];
        hint = hints[rule.code] || {};
        // ignore queued and auto-correct rules
        if (!hint.queue && !(hint.autoCorrect && rule.autoCorrectable)) {
            satisfies = getProcessOutputs(featureInfo, rule).result;
            if (satisfies == false) {
                exception = {
                    code: rule.code,
                    locator: rule.process,
                    message: JSON.stringify(rule)
                };
                // found first failure, no need to continue
                break;
            }
        }
    }
    return exception;
}

