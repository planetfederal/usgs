var NAMESPACE_URI = exports.NAMESPACE_URI = "http://www.usgs.gov/";

var TOLERANCE = exports.TOLERANCE = 0.000001; // meters tolerance for intersection tests

var featureRules = [
    {code: "1", process: "js:MustIntersect", subjectLayer: "nhdpoint", subjectFType: 431, objects: [{layer: "nhdflowline"}]},
    {code: "2", process: "js:MustIntersect", subjectLayer: "nhdpoint", subjectFType: 487, objects: [{layer: "nhdflowline"}]},
    {code: "3", process: "js:MustIntersect", subjectLayer: "nhdpoint", subjectFType: 369, objects: [{layer: "nhdline", ftypes: [398]}, {layer: "nhdarea", ftypes: [398]}]},
    {code: "4", process: "js:MustIntersect", subjectLayer: "nhdpoint", subjectFType: 398, objects: [{layer: "nhdflowline", ftypes: [336, 460]}, {layer: "nhdarea", ftypes: [460]}]},
    {code: "5", process: "js:MustIntersectEndpoint", subjectLayer: "nhdpoint", subjectFType: 450, objects: [{layer: "nhdflowline", ftypes: [420, 460]}]},
    {code: "6", process: "js:PipelineMustHaveVerticalRelationship", subjectLayer: "nhdflowline", subjectFType: 428, objects: [{layer: "nhdflowline"}], autoCorrectable: true},
    {code: "7", process: "js:MustNotCross", subjectLayer: "nhdflowline", subjectFType: 460, objects: [{layer: "nhdwaterbody", ftypes: [390]}], autoCorrectable: true},
    {code: "8", process: "js:MustNotCross", subjectLayer: "nhdflowline", subjectFType: 460, objects: [{layer: "nhdflowline", ftypes: [460]}]}
];

function lower(str) {
    return (str || "").toLowerCase();
}

exports.getRules = function(featureInfo) {
    var rules = [];
    if (lower(featureInfo.uri) == lower(NAMESPACE_URI)) {
        var fType = featureInfo.feature.get("FType");
        var name = lower(featureInfo.name);
        var candidate;
        for (var i=0, ii=featureRules.length; i<ii; ++i) {
            candidate = featureRules[i];
            if (lower(candidate.subjectLayer) == name) {
                if (!candidate.subjectFType || candidate.subjectFType == fType) {
                    rules.push(candidate);
                }
            }
        }
    }
    return rules;
};

exports.getFix = function(rule) {
    return require("./usgs/fixes/fix-" + rule.code).fix;
}
