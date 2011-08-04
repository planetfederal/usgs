var usgs = require("../usgs");
var fidFilter = require("geoscript/filter").fids;
var catalog = require("geoserver/catalog");
var exceptions = catalog.getFeatureType(usgs.NAMESPACE_URI, "NHDExceptions");

exports.beforeCommit = function(details, request) {
    LOGGER.info("beforeCommit");
    var hints;
    try {
        hints = parseNatives(details.natives);
    } catch (err) {
        return {
            locator: "beforeCommit",
            message: err.message
        };
    }
    var featureInfos = details.PreInsert || [];
    featureInfos = featureInfos.concat(details.PostUpdate || []);
    
    var exception;
    for (var i=0, ii=featureInfos.length; i<ii; ++i) {
        exception = usgs.getFirstException(featureInfos[i], hints);
        if (exception) {
            break;
        }
    }
    return exception;
};

exports.afterTransaction = function(details, request) {
    LOGGER.info("afterTransaction");
    var hints;
    try {
        hints = parseNatives(details.natives);
    } catch (err) {
        return {
            locator: "afterTransaction",
            message: err.message
        };
    }
    var featureInfos = details.PostInsert || [];
    featureInfos = featureInfos.concat(details.PostUpdate || []);
    
    var featureInfo;
    var records = [];
    for (var i=0, ii=featureInfos.length; i<ii; ++i) {
        featureInfo = featureInfos[i];
        records = records.concat(usgs.getQueuedExceptions(featureInfo, hints));
    }
    var num = records.length;
    if (num > 0) {
        var record;
        for (var i=0; i<num; ++i) {
            record = records[i];
            record.metadataid = details.handle;
            exceptions.add(record);
            LOGGER.info("exception queued: " + record.exceptionmessage);
        }
    }
    updateQueuedExceptions();
};

function updateQueuedExceptions() {
    var removals = [];
    exceptions.features.forEach(function(exception) {
        var layer = catalog.getFeatureType(usgs.NAMESPACE_URI, exception.get("featuretype"));
        var fid = exception.get("featureid");
        var feature = layer.get(fid);
        if (!feature) {
            removals.push(exception.id);
        }
    });
    exceptions.remove(fidFilter(removals));
}

/**
 * Parse content from first Native element with vendorId "usgs".  Content
 * is assumed to be a JSON string.
 */
function parseNatives(natives) {
    var el, hints = {};
    for (var i=0, ii=natives.length; i<ii; ++i) {
        el = natives[i];
        if (el.vendorId === "usgs") {
            try {
                hints = JSON.parse(el.value);
            } catch (err) {
                throw new Error("Trouble parsing <Native> element: " + el.value);
            }
            break;
        }
    }
    return hints;
};

