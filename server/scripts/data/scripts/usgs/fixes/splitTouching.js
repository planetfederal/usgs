var usgs = require("usgs");
var filter = require("geoscript/filter");
var geom = require("geoscript/geom");

exports.split = function(layer, featureInfo, outputs) {
    var fixed = false;
    
    var geometry = layer.get(featureInfo.feature.id).geometry;
    if (geometry.components && geometry.components.length == 1) {
        // get all the features that the feature touches
        var fidFilter = filter.fids(outputs.fids.split(","));
        var count = 0;
        var target;
        var cursor = layer.query(fidFilter);
        cursor.forEach(function(touched) {
            ++count;
            target = touched;
            return count < 2;
        });
        cursor.close();

        if ((count == 1) && target.geometry.components && (target.geometry.components.length == 1)) {
            var input = geometry.components[0];
            var object = target.geometry.components[0];
            var splitPoint = input.startPoint;
            if (!(object.distance(splitPoint) <= usgs.TOLERANCE)) {
                // try the endpoint
                splitPoint = input.endPoint;
                if (!(object.distance(splitPoint) <= usgs.TOLERANCE)) {
                    splitPoint = null;
                }
            }
            if (splitPoint) {
                // walk through pairs and find the first segment that intersects (within tolerance)
                var c1, c2, segment, g1, g2, coords1 = [], coords2;
                for (var i=0, ii=object.coordinates.length-1; i<ii; ++i) {
                    c1 = object.coordinates[i];
                    c2 = object.coordinates[i+1];
                    if (!coords2) {
                        segment = new geom.LineString([c1, c2]);
                        if (segment.distance(splitPoint) <= usgs.TOLERANCE) {
                            coords1.push(c1, splitPoint.coordinates);
                            g1 = new geom.MultiLineString([new geom.LineString(coords1)]);
                            coords2 = [splitPoint.coordinates, c2];
                        } else {
                            coords1.push(c1);
                        }
                    } else {
                        coords2.push(c2);
                    }
                }
                if (g1) {
                    g2 = new geom.MultiLineString([new geom.LineString(coords2)]);
                    var clone = target.clone();
                    target.geometry = g1;
                    layer.update();
                    clone.geometry = g2;
                    layer.add(clone);
                    fixed = true;
                }
            }
        }
    }
    return fixed;
};
