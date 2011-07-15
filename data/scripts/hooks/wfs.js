var usgs = require("../usgs");
var where = require("geoscript/filter").where;

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
    var inserts = details.PreInsert || [];
    var featureInfo, feature, rules, rule, filter, process, outputs;
    for (var i=0, ii=inserts.length; i<ii; ++i) {
        featureInfo = inserts[i];
        feature = featureInfo.feature;
        rules = usgs.getRules(featureInfo);
        for (var j=0, jj=rules.length; j<jj; ++j) {
            rule = rules[i];
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
                // TODO: native handling
                return {
                    locator: "js:" + rule.name,
                    // TODO: determine where message is composed
                    message: JSON.stringify({
                        message: process.title + " Failed",
                        rule: rule
                    })
                };
            }
        }
    }
};

/**
 * Parse content from first Native element with vendorId "usgs".  Content
 * is assumed to be a JSON string.
 */
function parseNatives(natives) {
    var nativ, obj;
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

