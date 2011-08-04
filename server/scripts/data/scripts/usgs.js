var where = require("geoscript/filter").where;
var fids = require("geoscript/filter").fids;

var NAMESPACE_URI = exports.NAMESPACE_URI = "http://www.usgs.gov/";

var TOLERANCE = exports.TOLERANCE = 0.000001; // meters tolerance for intersection tests

var featureRules = [
    {code: "1", process: "js:MustIntersect", subjectLayer: "NHDPoint", subjectFType: 431, objects: [{layer: "NHDFlowline"}]},
    {code: "2", process: "js:MustIntersect", subjectLayer: "NHDPoint", subjectFType: 487, objects: [{layer: "NHDFlowline"}]},
    {code: "3", process: "js:MustIntersect", subjectLayer: "NHDPoint", subjectFType: 369, objects: [{layer: "NHDLine", ftypes: [398]}, {layer: "NHDArea", ftypes: [398]}]},
    {code: "4", process: "js:MustIntersect", subjectLayer: "NHDPoint", subjectFType: 398, objects: [{layer: "NHDFlowline", ftypes: [336, 460]}, {layer: "NHDArea", ftypes: [460]}]},
    {code: "5", process: "js:MustIntersectEndpoint", subjectLayer: "NHDPoint", subjectFType: 450, objects: [{layer: "NHDFlowline", ftypes: [420, 460]}]},
    {code: "6", title: "Pipeline Vertical Relationship", process: "js:MustHaveVerticalRelationship", subjectLayer: "NHDFlowline", subjectFType: 428, objects: [{layer: "NHDFlowline"}], autoCorrectable: true},
    {code: "7", title: "Stream or River Crossing Waterbody", process: "js:MustNotCross", subjectLayer: "NHDFlowline", subjectFType: 460, objects: [{layer: "NHDWaterbody", ftypes: [390]}], autoCorrectable: true},
    {code: "8", process: "js:MustTouch", subjectLayer: "NHDFlowline", subjectFType: 334, objects: [{layer: "NHDFlowline", ftypes: [334, 336, 420, 460, 558, 566, 567]}, {layer: "NHDPoint", ftypes: [450]}]},
    {code: "9", process: "js:MustTouch", subjectLayer: "NHDFlowline", subjectFType: 336, objects: [{layer: "NHDFlowline", ftypes: [334, 336, 420, 460, 558, 566, 567]}, {layer: "NHDPoint", ftypes: [450]}]},
    {code: "10", process: "js:MustTouch", subjectLayer: "NHDFlowline", subjectFType: 420, objects: [{layer: "NHDFlowline", ftypes: [334, 336, 420, 460, 558, 566, 567]}, {layer: "NHDPoint", ftypes: [450]}]},
    {code: "11", process: "js:MustTouch", subjectLayer: "NHDFlowline", subjectFType: 460, objects: [{layer: "NHDFlowline", ftypes: [334, 336, 420, 460, 558, 566, 567]}, {layer: "NHDPoint", ftypes: [450]}]},
    {code: "12", process: "js:MustTouch", subjectLayer: "NHDFlowline", subjectFType: 558, objects: [{layer: "NHDFlowline", ftypes: [334, 336, 420, 460, 558, 566, 567]}, {layer: "NHDPoint", ftypes: [450]}]},
    {code: "13", process: "js:MustTouch", subjectLayer: "NHDFlowline", subjectFType: 566, objects: [{layer: "NHDFlowline", ftypes: [334, 336, 420, 460, 558, 566, 567]}, {layer: "NHDPoint", ftypes: [450]}]},
    {code: "14", process: "js:MustTouch", subjectLayer: "NHDFlowline", subjectFType: 567, objects: [{layer: "NHDFlowline", ftypes: [334, 336, 420, 460, 558, 566, 567]}, {layer: "NHDPoint", ftypes: [450]}]},
    {code: "15", process: "js:MustTouchCanCross", subjectLayer: "NHDFlowline", subjectFType: 428, objects: [{layer: "NHDFlowline", ftypes: [334, 336, 420, 428, 460, 558, 566, 567]}, {layer: "NHDPoint", ftypes: [450]}]},
    {code: "16", process: "js:MustIntersectEndpoint", subjectLayer: "NHDFlowline", objects: [{layer: "NHDFlowline"}]}
];

function lower(str) {
    return (str || "").toLowerCase();
}

function getRules(featureInfo) {
    return featureRules.filter(function(rule) {
        return ruleApplies(rule, featureInfo);
    });
};

function getRule(code) {
    return featureRules.filter(function(rule) {
        return rule.code === code;
    })[0];
}

function ruleApplies(rule, featureInfo) {
    var applies = false;
    if (lower(featureInfo.uri) == lower(NAMESPACE_URI) && lower(rule.subjectLayer) == lower(featureInfo.name)) {
        if (!rule.subjectFType || rule.subjectFType == featureInfo.feature.get("FType")) {
            applies = true;
        }
    }
    return applies;
}

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
                        processid: rule.code, // TODO: fix the schema https://github.com/opengeo/usgs/issues/89
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

exports.ruleSatisfied = function(code, featureInfo) {
    var satisfied = false;
    var rule = getRule(code);
    if (rule) {
        if (!ruleApplies(rule, featureInfo)) {
            satisfied = true;
        } else {
            satisfied = getProcessOutputs(featureInfo, rule).result;
        }
    }
    return satisfied;
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
};

