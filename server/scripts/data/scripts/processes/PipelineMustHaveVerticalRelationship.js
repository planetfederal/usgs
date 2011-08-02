var Process = require("geoscript/process").Process;
var where = require("geoscript/filter").where;
var wkt = require("geoscript/geom/io/wkt");
var catalog = require("geoserver/catalog");
var usgs = require("../usgs");

exports.process = new Process({
    title: "Must Not Cross Without a Vertical Relationship",
    description: "Determines whether the given geometry crosses any target feature without a specified vertical relationship.",
    inputs: {
        geometry: {
            type: "Geometry",
            title: "Input Geometry",
            description: "Input geometry that must not cross any target feature without a specified vertical relationship."
        },
        featureId: {
            type: "String",
            title: "Feature Identifier",
            description: "For modification of existing features, supply the feature id."
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
            description: "The input geometry does not cross any features in the target set without having a vertical relationship specified."
        },
        fids: {
            type: "String",
            title: "Feature Ids",
            description: "A comma separated string of feature ids will be generated representing all features crossed by the input geometry."
        }
    },
    run: function(inputs) {
        var relationships = catalog.getFeatureType(usgs.NAMESPACE_URI, "nhdverticalrelationship");
        var geometry = inputs.geometry;
        var layer = catalog.getFeatureType(inputs.namespace, inputs.featureType);

        var filter = where("CROSSES", layer.schema.geometry.name, wkt.write(geometry));
        if (inputs.filter) {
            filter = filter.and(inputs.filter);
        }
        var fids = [];
        layer.query(filter).forEach(function(crossed) {
            if (!inputs.featureId) {
                // newly inserted feature
                fids.push(crossed.id);
            } else {
                // modified feature - check existing relationships
                var over = where("Above_Permanent_Identifier = '" + crossed.id + "'")
                    .and("Below_Permanent_Identifier = '" + inputs.featureId);
                var under = where("Above_Permanent_Identifier = '" + inputs.featureId + "'")
                    .and("Below_Permanent_Identifier = '" + crossed.id);
                if (relationships.getCount(over.or(under)) == 0) {
                    fids.push(crossed.id);
                }
            }
        });
        LOGGER.info("PipelineMustHaveVerticalRelationship: [" + fids + "] " + filter.cql);
        return {
            result: fids.length === 0,
            fids: fids.join(",")
        };
    }
});
