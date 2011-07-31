var Process = require("geoscript/process").Process;
var where = require("geoscript/filter").where;
var wkt = require("geoscript/geom/io/wkt");
var catalog = require("geoserver/catalog");
var TOLERANCE = require("../usgs").TOLERANCE;

exports.process = new Process({
    title: "Must Intersect",
    description: "Determines whether a given geometry intersect target features.",
    inputs: {
        geometry: {
            type: "Geometry",
            title: "Input Geometry",
            description: "Input geometry that must intersect at least one target feature geometry."
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
        }
    },
    outputs: {
        result: {
            type: "Boolean",
            title: "Intersection Result",
            description: "The input geometry intersects at least one feature in the target feature set."
        },
        count: {
            type: "Integer",
            title: "Number of Intersections",
            description: "The number of target features intersected by the input geometry."
        }
    },
    run: function(inputs) {
        var geometry = inputs.geometry;
        var layer = catalog.getFeatureType(inputs.namespace, inputs.featureType);

        var filter = where("DWITHIN", layer.schema.geometry.name, wkt.write(geometry), TOLERANCE, "meters");
        if (inputs.filter) {
            filter = filter.and(inputs.filter);
        }
        var count = layer.getCount(filter);
        LOGGER.info("MustIntersect: " + count + " " + filter.cql);
        return {
            result: count > 0,
            count: count
        };
    }
});
