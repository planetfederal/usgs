var Process = require("geoscript/process").Process;
var where = require("geoscript/filter").where;
var wkt = require("geoscript/geom/io/wkt");
var catalog = require("geoserver/catalog");
var TOLERANCE = require("../usgs").TOLERANCE;

exports.process = new Process({
    title: "Must Intersect Endpoint",
    description: "Determines whether a given geometry intersects an endpoint of target features.",
    inputs: {
        geometry: {
            type: "Geometry",
            title: "Input Geometry",
            description: "Input geometry that must intersect at least one target feature geometry endpoint."
        },
        featureType: {
            type: "String",
            title: "Target Feature Type",
            description: "The unqualified name of the target feature type."
        },
        namespace: {
            type: "String",
            title: "Target Namespace URI",
            description: "The namespace URI for the target feature type."
        },
        filter: {
            type: "String",
            title: "Target Filter",
            description: "CQL used to filter features from the target feature type (optional)."
        },
        detail: {
            type: "Boolean",
            title: "Detail",
            description: "Generate extra detail for the output."
        }
    },
    outputs: {
        result: {
            type: "Boolean",
            title: "Intersection Result",
            description: "The input geometry intersects at least one endpoint of one feature in the target feature set."
        },
        fids: {
            type: "String",
            title: "Feature Ids",
            description: "If the 'detail' input is true, a comma separated string of feature ids will be generated representing all features intersected by the input geometry where the intersection is not an endpoint."
        }
    },
    run: function(inputs) {
        var geometry = inputs.geometry;
        var layer = catalog.getFeatureType(inputs.namespace, inputs.featureType);

        var filter = where("DWITHIN", layer.schema.geometry.name, wkt.write(geometry), TOLERANCE, "meters");
        if (inputs.filter) {
            filter = filter.and(inputs.filter);
        }
        var cursor = layer.query(filter);
        var intersects = false;
        var fids = [];
        cursor.forEach(function(target) {
            var satisfies = false;  // for details, we need another flag
            target.geometry.endPoints.forEach(function(point) {
                if (geometry.distance(point) <= TOLERANCE) {
                    // hit endpoint
                    intersects = true;
                    satisfies = true;
                }
            });
            if (inputs.detail && !satisfies) {
                fids.push(target.id);
            }
            // continue if looking for detail, stop if intersects
            return inputs.detail || !intersects;
        });
        // in case we stopped early
        cursor.close();
        LOGGER.info("MustIntersectEndpoint " + inputs.featureType + ": " + intersects + " " + filter);
        return {
            result: intersects,
            fids: fids.join(",")
        };
    }
});
