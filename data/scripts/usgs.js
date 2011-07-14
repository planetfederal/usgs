var NAMESPACE_URI = exports.NAMESPACE_URI = "http://www.usgs.gov/";

var featureRules = [
    {name: "intersects", subjectLayer: "nhdpoint", subjectFType: 431, objectLayer: "nhdflowline"},
    {name: "intersects", subjectLayer: "nhdpoint", subjectFType: 450, objectLayer: "nhdflowline", objectFTypes: [420, 460]},
    {name: "intersects", subjectLayer: "nhdpoint", subjectFType: 487, objectLayer: "nhdflowline"},
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
            if (lower(candidate.subjectLayer) == name && candidate.subjectFType == fType) {
                rules.push(candidate);
            }
        }
    }
    return rules;
}