var Process = require("geoscript/process").Process;
var where = require("geoscript/filter").where;
var wkt = require("geoscript/geom/io/wkt");
var catalog = require("geoserver/catalog");

exports.process = new Process({
    title: "Intersection Test",
    description: "Determines whether a given geometry intersect target features.",
    inputs: {
        geometry: {
            type: "Geometry",
            title: "Input Geometry",
            description: "Input geometry that must intersect at least one target feature geometry."
        },
        srs: {
            type: "String",
            title: "Input Geometry SRS",
            description: "SRS identifier (e.g. 'EPSG:900913') for the geometry if this differs from the target feature type SRS (optional)."
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
        if (inputs.srs && !geometry.projection) {
            geometry.projection = input.srs;
        }
        if (geometry.projection && !geometry.projection.equals(layer.projection)) {
            geometry = geometry.transform(layer.projection);
        }
        // TODO: accept tolerance
        var filter = where("DWITHIN", layer.schema.geometry.name, wkt.write(geometry), 0.000001, "meters"); // TODO: I'm suspicious this is actually being treated as decimal degrees
        if (inputs.filter) {
            filter = filter.and(inputs.filter);
        }
        var count = layer.getCount(filter);
        return {
            result: count > 0,
            count: count
        };
    }
});
