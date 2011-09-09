// fix for rails touching rail edges
var usgs = require("usgs");
var catalog = require("geoserver/catalog");
var rails = catalog.getFeatureType(usgs.NAMESPACE_URI, "Trans_RailFeature");
var split = require("./splitTouching").split;

exports.fix = function(featureInfo, outputs) {
    return split(rails, featureInfo, outputs);
};
