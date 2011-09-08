// fix for streams crossing lakes
var usgs = require("usgs");
var catalog = require("geoserver/catalog");
var flowlines = catalog.getFeatureType(usgs.NAMESPACE_URI, "NHDFlowline");
var split = require("./splitTouching").split;

exports.fix = function(featureInfo, outputs) {
    return split(flowlines, featureInfo, outputs);
};
