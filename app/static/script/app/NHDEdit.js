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
            // add any custom application events
            this.addEvents(
                /** api: event[setpreference]
                 *  Fires when an autocorrect preference has been set.
                 */
                "setpreference"
            );
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
        },
        /** private: method[setPreference]
         *  :arg code: ``Object`` rule with an exception code
         *  :arg object: ``Object`` object to set for the preference
         */
        setPreference: function(rule, object) {
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
            this.fireEvent("setpreference", code, pref);
        }
    });
    
    /** private: property[preferences]
     *  ``Object``
     */
    NHDEdit.preferences = {};
    
    NHDEdit.ruleSpecificItems = {
        // specific handling for vertical relationship rule
        "6": function(rule) {
            return {
                xtype: "combo",
                store: ["over", "under"],
                fieldLabel: "Vertical relationship",
                triggerAction: "all",
                mode: 'local',
                value: rule.autoCorrect ? rule.autoCorrect.relationship : undefined,
                width: 60,
                listeners: {
                    select: function(combo, record, index) {
                        var value = combo.getValue();
                        app.setPreference(rule, {
                            autoCorrect: value ? {relationship: value} : false
                        });
                    },
                    scope: this
                }
            };
        }
    };

    /** private: property[metadataSchema]
     *  ``GeoExt.data.AttributeStore`` The attribute store for the NHDMetadata 
     *  feature type. Will be set and reused by the MetadataForm.
     */

    /** private: property[metadataStore]
     * ``gxp.data.WFSFeatureStore`` The feature store for the NHDMetadata 
     * feature type. Will be set and reused by the MetadataForm.
     */
    
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
    
    NHDEdit.createAutoCorrectItems = function(rule) {
        var code = rule.code, items;
        // add any items for specific rules
        if (code in NHDEdit.ruleSpecificItems) {
            items = NHDEdit.ruleSpecificItems[code].call(this, rule);
        } else {
            items = {
                xtype: "checkbox",
                fieldLabel: "Autocorrect",
                checked: !!rule.autoCorrect,
                name: "autoCorrect",
                listeners: {
                    "check": function(checkbox, checked) {
                        app.setPreference(rule, {
                            autoCorrect: checked ? true : false
                        });
                    },
                    scope: this
                }            
            };
        }
        return items;
    };
    
})();
