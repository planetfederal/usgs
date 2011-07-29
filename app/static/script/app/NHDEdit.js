(function() {
    function getUrlConfig(){
        var hash = window.location.hash, urlConfig = {};
        if (hash) {
            Ext.apply(urlConfig, Ext.urlDecode(hash.substr(1)));
        }
        return urlConfig;
    }
    
    window.NHDEdit = Ext.extend(gxp.Viewer, {
        constructor: function(config) {
            NHDEdit.superclass.constructor.apply(this, arguments);
            this.on("portalready", function() {
                var map = this.mapPanel.map;
                map.events.register("moveend", this, function() {
                    var urlConfig = getUrlConfig();
                    urlConfig.c = map.getCenter().toShortString().replace(" ", "");
                    urlConfig.z = map.getZoom();
                    window.location.hash = Ext.urlEncode(urlConfig);
                });
            }, this);
        },
        loadConfig: function(config, callback) {
            var urlConfig = getUrlConfig();
            if (urlConfig.z != null) {
                config.map.zoom = urlConfig.z;
            }
            if (urlConfig.c != null) {
                config.map.center = urlConfig.c.split(",");
            }
            NHDEdit.metadataId = urlConfig.m;
            callback.call(this, config);
        }
    });
    NHDEdit.setMetadataRecord = function(record) {
        NHDEdit.metadataRecord = record;
        var urlConfig = getUrlConfig();
        if (record) {
            urlConfig.m = record.get("feature").fid;
            NHDEdit.metadataId = urlConfig.m;
        } else {
            delete urlConfig.m;
        }
        window.location.hash = Ext.urlEncode(urlConfig);
    };
})();
