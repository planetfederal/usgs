// fix for streams crossing lakes
var usgs = require("usgs");
var catalog = require("geoserver/catalog");
var filter = require("geoscript/filter");
var geom = require("geoscript/geom");

var flowlines = catalog.getFeatureType(usgs.NAMESPACE_URI, "nhdflowline");
var waterbodies = catalog.getFeatureType(usgs.NAMESPACE_URI, "nhdwaterbody");

exports.fix = function(featureInfo, outputs) {

    var stream = flowlines.get(featureInfo.feature.id);
    var path = stream.clone({values: {
        "FType": 558,
        "FCode": 55800
    }});

    var streamGeometry = stream.geometry;
    var pathParts = [];

    // get all the features crossed by the stream
    var fidFilter = filter.fids(outputs.fids.split(","));
    waterbodies.query(fidFilter).forEach(function(lake) {
        // remove parts that cross waterbodies
        streamGeometry = streamGeometry.difference(lake.geometry);
        // keep track of parts that cross
        var inside = stream.geometry.intersection(lake.geometry);
        if (inside instanceof geom.MultiLineString) {
            pathParts = pathParts.concat(inside.components);
        } else {
            pathParts.push(inside);
        }
    });
    
    var streamParts;
    if (streamGeometry instanceof geom.MultiLineString) {
        streamParts = streamGeometry.components;
    } else {
        streamParts = [streamGeometry];
    }
    
    // modify the original stream
    stream.geometry = new geom.MultiLineString([streamParts[0]]);
    flowlines.update();

    // add additional features for any additional stream parts
    var streamClone;
    for (var i=1, ii=streamParts.length; i<ii; ++i) {
        streamClone = stream.clone();
        streamClone.geometry = new geom.MultiLineString([streamParts[i]]);
        flowlines.add(streamClone);
    }
    
    // add artificial paths
    var pathClone;
    for (i=0, ii=pathParts.length; i<ii; ++i) {
        pathClone = path.clone();
        pathClone.geometry = new geom.MultiLineString([pathParts[i]]);
        flowlines.add(pathClone);
    }
    
    return true;

};
