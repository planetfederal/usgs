// fix for pipelines crossing flowlines
var usgs = require("usgs");
var catalog = require("geoserver/catalog");
var filter = require("geoscript/filter");

var relationships = catalog.getFeatureType(usgs.NAMESPACE_URI, "nhdverticalrelationship");
var flowlines = catalog.getFeatureType(usgs.NAMESPACE_URI, "nhdflowline");

exports.fix = function(featureInfo, outputs, autoCorrect) {

    var over = (autoCorrect.relationship == "over");
    var feature = featureInfo.feature;
    
    // get all the features crossed by the pipeline
    var fidFilter = filter.fids(outputs.fids.split(","));
    flowlines.query(fidFilter).forEach(function(target) {
        // add a vertical relationship
        relationships.add({
            "Above_Permanent_Identifier": over ? feature.id : target.id,
            "Below_Permanent_Identifier": over ? target.id : feature.id
        });
    });
    
    return true;

};
