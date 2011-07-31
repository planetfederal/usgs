var Process = require("geoscript/process").Process;
var where = require("geoscript/filter").where;
var wkt = require("geoscript/geom/io/wkt");
var catalog = require("geoserver/catalog");

exports.process = new Process({
    title: "Must Not Cross",
    description: "Determines whether the given geometry crosses any target feature.",
    inputs: {
        geometry: {
            type: "Geometry",
            title: "Input Geometry",
            description: "Input geometry that must not cross any target feature."
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
            title: "Result",
            description: "The input geometry does not cross any features in the target set."
        }
    },
    run: function(inputs) {
        var geometry = inputs.geometry;
        var layer = catalog.getFeatureType(inputs.namespace, inputs.featureType);

        var filter = where("CROSSES", layer.schema.geometry.name, wkt.write(geometry));
        if (inputs.filter) {
            filter = filter.and(inputs.filter);
        }
        var count = layer.getCount(filter);
        LOGGER.info("MustNotCross: " + count + " " + filter.cql);
        return {
            result: count == 0
        };
    }
});
