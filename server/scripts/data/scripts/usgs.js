var NAMESPACE_URI = exports.NAMESPACE_URI = "http://www.usgs.gov/";

var TOLERANCE = exports.TOLERANCE = 0.000001; // meters tolerance for intersection tests

var featureRules = [
    {name: "MustIntersect", subjectLayer: "nhdpoint", subjectFType: 431, objects: [{layer: "nhdflowline"}]},
    {name: "MustIntersect", subjectLayer: "nhdpoint", subjectFType: 487, objects: [{layer: "nhdflowline"}]},
    {name: "MustIntersect", subjectLayer: "nhdpoint", subjectFType: 369, objects: [{layer: "nhdline", ftypes: [398]}, {layer: "nhdarea", ftypes: [398]}]},
    {name: "MustIntersect", subjectLayer: "nhdpoint", subjectFType: 398, objects: [{layer: "nhdflowline", ftypes: [336, 340]}, {layer: "nhdarea", ftypes: [460]}]},
    {name: "MustIntersectEndpoint", subjectLayer: "nhdpoint", subjectFType: 450, objects: [{layer: "nhdflowline", ftypes: [420, 460]}]},
    {name: "MustNotCross", subjectLayer: "nhdflowline", objects: [{layer: "nhdflowline"}]},
    {name: "MustNotCross", subjectLayer: "nhdflowline", objects: [{layer: "nhdwaterbody"}]}
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
