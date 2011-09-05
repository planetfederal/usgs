/**
 * Copyright (c) 2008-2011 The Open Planning Project
 * 
 * Published under the GPL license.
 * See https://github.com/opengeo/gxp/raw/master/license.txt for the full text
 * of the license.
 */

(function() {
    /** private[method] getUrlConfig
     *  Gets the url config from the anchor/hash in the url.
     * 
     *  :returns: ``Object`` Object containing the values for c (center),
     *  z (zoom level) and m (metadata record id).
     */
    function getUrlConfig(){
        var hash = window.location.hash, urlConfig = {};
        if (hash) {
            Ext.apply(urlConfig, Ext.urlDecode(hash.substr(1)));
        }
        return urlConfig;
    }

    /** api: constructor
     *  .. class:: Editor(config)
     *
     *  Create a viewer object specific for the Editor prototype.
     */    
    window.Editor = Ext.extend(gxp.Viewer, {
        /** private: method[constructor]
         *  Construct the viewer.
         */
        constructor: function(config) {
            Editor.superclass.constructor.apply(this, arguments);
            // add any custom application events
            this.addEvents(
                /** api: event[setpreference]
                 *  Fires when an autocorrect preference has been set.
                 *
                 *  Optional listeners arguments:
                 *
                 *  * code - ``Object`` rule with an exception code
                 *  * pref - ``Object`` the preference object for the code.
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
        /** api: method[loadConfig]
         *  :arg config: ``Object`` The config object passed to the constructor.
         *
         *  Subclasses that load config asynchronously can override this to load
         *  any configuration before applyConfig is called.
         */ 
        loadConfig: function(config, callback) {
            var urlConfig = getUrlConfig();
            if (urlConfig.z != null) {
                config.map.zoom = urlConfig.z;
            }
            if (urlConfig.c != null) {
                config.map.center = urlConfig.c.split(",");
            }
            Editor.metadataId = urlConfig.m;
            callback.call(this, config);
        },
        /** private: method[setPreference]
         *  Sets an autocorrect preference and saves it to the metadata record.
         *
         *  :arg code: ``Object`` rule with an exception code
         *  :arg object: ``Object`` object to set for the preference
         */
        setPreference: function(rule, object) {
            var code = rule.code,
                urlConfig = getUrlConfig();
            var pref = Ext.apply(Editor.preferences[code] || {
                title: rule.title
            }, object);
            Editor.preferences[code] = pref;
            var record = Editor.metadataRecord;
            if (record) {
                var completenessReport = record.fields.find(function(f) {
                    return f.name.toLowerCase() == "completenessreport"; 
                }).name;
                record.set(completenessReport, Ext.encode(Editor.preferences));
                record.store.save();
            }
            this.fireEvent("setpreference", code, pref);
        }
    });
    
    /** private: property[preferences]
     *  ``Object``
     *  Central object containing all the prefences in a session.
     */
    Editor.preferences = {};

    /** private: property[ruleSpecificItems]
     *  ``Object``
     *  Specific handling for certain rules.
     */
    Editor.ruleSpecificItems = {
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
     *  ``gxp.data.WFSFeatureStore`` The feature store for the NHDMetadata 
     *  feature type. Will be set and reused by the MetadataForm.
     */
    
    /** private: property[metadataId]
     *  ``String`` fid of the metadata record currently being used
     */
     
    /** private: property[metadataRecord]
     *  ``GeoExt.data.FeatureRecord`` metadata record currently being used
     */

    /** api: method[Editor.setMetadataRecord]
     *  Set the specified record as the current metadata record.
     *
     *  :arg record: ``Ext.data.Record``
     */
    Editor.setMetadataRecord = function(record) {
        Editor.metadataRecord = record;
        var urlConfig = getUrlConfig();
        if (record) {
            // restore preferences
            var completenessReport = record.fields.find(function(f) {
                return f.name.toLowerCase() == "completenessreport";
            }).name;
            if (record.get(completenessReport) !== undefined && record.get(completenessReport) !== "") {
                Editor.preferences = Ext.decode(record.get(completenessReport));
                app.fireEvent("setpreference");
            }
            urlConfig.m = record.getFeature().fid;
            Editor.metadataId = urlConfig.m;
        } else {
            delete urlConfig.m;
        }
        window.location.hash = Ext.urlEncode(urlConfig);
    };

    /** api: method[Editor.createAutoCorrectItems]
     *  Creates any auto correct form items for the specific rule.
     *
     *  :arg rule: ``Object``
     */    
    Editor.createAutoCorrectItems = function(rule) {
        var code = rule.code, items;
        // add any items for specific rules
        if (code in Editor.ruleSpecificItems) {
            items = Editor.ruleSpecificItems[code].call(this, rule);
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
