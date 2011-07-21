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
    features = features.concat(details.PreUpdate || []);
    var featureInfo, feature, rules, rule, inputs, filter, process, outputs;

    for (var i=0, ii=features.length; i<ii; ++i) {
        featureInfo = features[i];
        feature = featureInfo.feature;
        rules = usgs.getRules(featureInfo);
        for (var j=0, jj=rules.length; j<jj; ++j) {
            rule = rules[i];
            inputs = nativ["js:" + rule.name] || {};
            if (!inputs.queue) {
                if (rule.objectFTypes) {
                    filter = where.apply(null, ["FType IN"].concat(rule.objectFTypes));
                } else {
                    filter = undefined;
                }
                process = require("processes/" + rule.name).process;
                outputs = process.run({
                    geometry: feature.geometry,
                    featureType: rule.objectLayer,
                    namespace: usgs.NAMESPACE_URI,
                    filter: filter
                });
                if (outputs.result == false) {
                    return {
                        locator: "js:" + rule.name,
                        message: JSON.stringify({
                            message: process.title + " Failed",
                            rule: rule
                        })
                    };
                }
            }
        }
    }
};

// TODO: get rid of redundant codoe here
exports.afterTransaction = function(details, request) {
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
    var featureInfo, feature, rules, rule, inputs, filter, process, outputs;

    for (var i=0, ii=features.length; i<ii; ++i) {
        featureInfo = features[i];
        feature = featureInfo.feature;
        rules = usgs.getRules(featureInfo);
        for (var j=0, jj=rules.length; j<jj; ++j) {
            rule = rules[i];
            inputs = nativ["js:" + rule.name] || {};
            if (inputs.queue) {
                if (rule.objectFTypes) {
                    filter = where.apply(null, ["FType IN"].concat(rule.objectFTypes));
                } else {
                    filter = undefined;
                }
                process = require("processes/" + rule.name).process;
                outputs = process.run({
                    geometry: feature.geometry,
                    featureType: rule.objectLayer,
                    namespace: usgs.NAMESPACE_URI,
                    filter: filter
                });
                if (outputs.result == false) {
                    // add the exception to the queue
                    var exceptions = catalog.getFeatureType(usgs.NAMESPACE_URI, "nhdexceptions");
                    exceptions.add({
                        metadataid: "bogusid", // TODO: add handle to details
                        featureid: feature.id, // TODO: continue the discussion about PostInsert
                        // see https://github.com/groldan/geoserver_trunk/blob/gss/community/geosync/src/main/java/org/geoserver/gss/wfsbridge/GSSTransactionListener.java#L310
                        // also see http://pastebin.com/P6PCCzBe
                        processid: "js:" + rule.name,
                        exceptionmessage: JSON.stringify({
                            message: process.title + " Failed",
                            rule: rule
                        })
                    });
                    exceptions.update();
                }
            }
        }
    }
};

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

