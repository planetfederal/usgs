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
    
    /** private: property[preferences]
     *  ``Object``
     */
    NHDEdit.preferences = {};
    
    /** private: property[metadataId]
     *  ``String`` fid of the metadata record currently being used
     */
     
    /** private: property[metadataRecord]
     *  ``GeoExt.data.FeatureRecord`` metadata record currently being used
     */
    
    NHDEdit.setMetadataRecord = function(record) {
        NHDEdit.metadataRecord = record;
        var urlConfig = getUrlConfig();
        if (record) {
            urlConfig.m = record.getFeature().fid;
            NHDEdit.metadataId = urlConfig.m;
        } else {
            delete urlConfig.m;
        }
        window.location.hash = Ext.urlEncode(urlConfig);
    };
    
    /** private: method[setPreference]
     *  :arg code: ``Object`` rule with an exception code
     *  :arg object: ``Object`` object to set for the preference
     */
    NHDEdit.setPreference = function(rule, object) {
        var code = rule.code,
            urlConfig = getUrlConfig();
        var pref = Ext.apply(NHDEdit.preferences[code] || {
            title: rule.title
        }, object);
        NHDEdit.preferences[code] = pref;
        var record = NHDEdit.metadataRecord;
        if (record) {
            var completenessReport = record.fields.find(function(f) {
                return f.name.toLowerCase() == "completenessreport"; 
            }).name;
            //TODO the line below makes things break seriously
            //record.set(completenessReport, Ext.encode(pref));
        }
    };

})();
