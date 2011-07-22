Ext.ns("NHDEdit.Control");
NHDEdit.Control.Permalink = OpenLayers.Class(OpenLayers.Control.Permalink, {

    createParams: function(center, zoom, layers) {
        var params = OpenLayers.Control.Permalink.prototype.createParams.apply(this, arguments);
        if (NHDEdit.metadataId || NHDEdit.metadataRecord) {
            params.metadata = NHDEdit.metadataId || NHDEdit.metadataRecord.get("feature").fid;
        }
        return params;
    },

    setMap: function(map) {
        OpenLayers.Control.Permalink.prototype.setMap.apply(this, arguments);
        var args = OpenLayers.Control.ArgParser.prototype.getParameters(window.location.href);
        if (args.metadata) {
            NHDEdit.metadataId = args.metadata;
        }
    },

    CLASS_NAME: "NHDEdit.Control.Permalink"

});
