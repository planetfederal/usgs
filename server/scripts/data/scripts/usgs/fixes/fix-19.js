// fix for roads touching road edges
var usgs = require("usgs");
var catalog = require("geoserver/catalog");
var roads = catalog.getFeatureType(usgs.NAMESPACE_URI, "Trans_RoadSegment");
var split = require("./splitTouching").split;

exports.fix = function(featureInfo, outputs) {
    return split(roads, featureInfo, outputs);
};
