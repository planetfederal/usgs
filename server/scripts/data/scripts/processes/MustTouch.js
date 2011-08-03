var Process = require("geoscript/process").Process;
var where = require("geoscript/filter").where;
var wkt = require("geoscript/geom/io/wkt");
var catalog = require("geoserver/catalog");
var TOLERANCE = require("../usgs").TOLERANCE;

exports.process = new Process({
    title: "Must Touch",
    description: "Determines whether a given geometry touches (intersects and does not cross) target features.",
    inputs: {
        geometry: {
            type: "Geometry",
            title: "Input Geometry",
            description: "Input geometry that must touch at least one target feature geometry."
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
            description: "The input geometry touches at least one feature in the target feature set (and does not cross any)."
        }
    },
    run: function(inputs) {
        var geometry = inputs.geometry;
        var layer = catalog.getFeatureType(inputs.namespace, inputs.featureType);

        var filter = where("DWITHIN", layer.schema.geometry.name, wkt.write(geometry), TOLERANCE, "meters");
        if (inputs.filter) {
            filter = filter.and(inputs.filter);
        }
        var touches = false;
        var cursor = layer.query(filter);
        cursor.forEach(function(target) {
            touches = true;
            if (geometry.crosses(target.geometry)) {
                touches = false;
            }
            return touches; // stop looking if crosses
        });
        cursor.close();
        LOGGER.info("MustTouch " + inputs.featureType + ": " + touches + " " + filter);
        return {
            result: touches
        };
    }
});
