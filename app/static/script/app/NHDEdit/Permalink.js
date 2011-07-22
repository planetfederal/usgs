Ext.ns("NHDEdit.Control");
NHDEdit.Control.Permalink = OpenLayers.Class(OpenLayers.Control.Permalink, {

    createParams: function(center, zoom, layers) {
        var params = OpenLayers.Control.Permalink.prototype.createParams.apply(this, arguments);
        if (NHDEdit.metadataRecord) {
            params.metadata = NHDEdit.metadataRecord.get("feature").fid;
        }
        return params;
    },

    CLASS_NAME: "NHDEdit.Control.Permalink"

});
