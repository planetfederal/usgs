var usgs = require("../usgs");
var where = require("geoscript/filter").where;
var catalog = require("geoserver/catalog");

exports.beforeCommit = function(details, request) {
    var nativ;
    try {
        nativ = parseNatives(details.natives);
    } catch (err) {
        return {
            locator: "beforeCommit",
            message: err.message
        };
    }
    var features = details.PreInsert || [];
    features = features.concat(details.PostUpdate || []);
    
    var exception;
    for (var i=0, ii=features.length; i<ii; ++i) {
        exception = getFirstException(features[i], nativ);
        if (exception) {
            break;
        }
    }
    return exception;
};

exports.afterTransaction = function(details, request) {
    var nativ;
    try {
        nativ = parseNatives(details.natives);
    } catch (err) {
        return {
            locator: "afterTransaction",
            message: err.message
        };
    }
    var features = details.PostInsert || [];
    features = features.concat(details.PostUpdate || []);
    
    var featureInfo;
    var exceptions = [];
    for (var i=0, ii=features.length; i<ii; ++i) {
        featureInfo = features[i];
        exceptions = exceptions.concat(getQueuedExceptions(featureInfo, nativ));
    }
    var num = exceptions.length;
    if (num > 0) {
        var layer = catalog.getFeatureType(usgs.NAMESPACE_URI, "nhdexceptions");
        var record;
        for (var i=0; i<num; ++i) {
            record = exceptions[i];
            record.metadataid = details.handle;
            layer.add(record);
            LOGGER.info("exception queued: " + record.exceptionmessage);
        }
        layer.update();
    }
};

function getFirstException(featureInfo, nativ) {
    var exception;
    var feature = featureInfo.feature;
    var geometry = feature.geometry;

    var rules = usgs.getRules(featureInfo);
    var rule, satisfies;
    for (var i=0, ii=rules.length; i<ii; ++i) {
        rule = rules[i];
        // ignore queued rules
        if (!(nativ["js:" + rule.name] || {}).queue) {
            satisfies = satisfiesRule(geometry, rule);
            if (satisfies == false) {
                exception = {
                    locator: "js:" + rule.name,
                    message: JSON.stringify(rule)
                };
                // found first failure, no need to continue
                break;
            }
        }
    }
    return exception;
}

function satisfiesRule(geometry, rule) {
    var satisfies = false;
    var process = require("processes/" + rule.name).process;
    var object, ftypes, filter, outputs;
    for (var i=0, ii=rule.objects.length; i<ii; ++i) {
        object = rule.objects[i];
        ftypes = object.ftypes;
        if (ftypes) {
            filter = where.apply(null, ["FType IN"].concat(ftypes));
        } else {
            filter = undefined;
        }
        outputs = process.run({
            geometry: geometry,
            namespace: usgs.NAMESPACE_URI,
            featureType: object.layer,
            filter: filter
        });
        satisfies = outputs.result;
        if (satisfies == true) {
            // rule was satisfied, no need to continue
            break;
        }
    }
    return satisfies;
}

function getQueuedExceptions(featureInfo, nativ) {
    var exceptions = [];
    var featureType = featureInfo.name;
    var feature = featureInfo.feature;
    var geometry = feature.geometry;

    var rules = usgs.getRules(featureInfo);
    var rule, satisfies;
    for (var i=0, ii=rules.length; i<ii; ++i) {
        rule = rules[i];
        // only test queued rules
        if ((nativ["js:" + rule.name] || {}).queue) {
            satisfies = satisfiesRule(geometry, rule);
            if (satisfies == false) {
                // prepare the exception record
                exceptions.push({
                    namespace: usgs.NAMESPACE_URI,
                    featuretype: featureType,
                    featureid: feature.id,
                    processid: "js:" + rule.name,
                    exceptionmessage: JSON.stringify(rule)
                });
            }
        }
    }
    return exceptions;
}

/**
 * Parse content from first Native element with vendorId "usgs".  Content
 * is assumed to be a JSON string.
 */
function parseNatives(natives) {
    var nativ, obj = {};
    for (var i=0, ii=natives.length; i<ii; ++i) {
        nativ = natives[i];
        if (nativ.vendorId === "usgs") {
            try {
                obj = JSON.parse(nativ.value);
            } catch (err) {
                throw new Error("Trouble parsing <Native> element: " + nativ.value);
            }
            break;
        }
    }
    return obj;
};

