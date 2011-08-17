/**
 * Copyright (c) 2008-2011 The Open Planning Project
 * 
 * Published under the BSD license.
 * See https://github.com/opengeo/gxp/raw/master/license.txt for the full text
 * of the license.
 */

Ext.ns("NHDEdit.plugins");

/** api: (define)
 *  module = NHDEdit.plugins
 *  class = Preferences
 *  extends = gxp.plugins.Tool
 */

/** api: constructor
 *  .. class:: Preferences(config)
 *
 *    Preferences dialog.
 */
NHDEdit.plugins.Preferences = Ext.extend(gxp.plugins.Tool, {

    /** api: ptype = app_preferences */
    ptype: "app_preferences",

    /** i18n */
    buttonText: "Preferences",
    tooltipText: "Change editing preferences",

    vendorId: "usgs",
    featureManager: null,

    /** private: method[init]
     */
    init: function(target) {
        NHDEdit.plugins.Preferences.superclass.init.apply(this, arguments);
        var featureManager = this.target.tools[this.featureManager];
        featureManager.addListener('layerchange', this.onLayerChange, this);
        target.addListener('setpreference', this.onSetPreference, this);
    },

    onLayerChange: function(tool, layer, schema) {
        var store = tool.featureStore;
        if (store) {
            store.addListener('beforewrite', this.beforeStoreWrite, this);
        }
    },

    onSetPreference: function(code, pref) {
        this.actions[0].enable();
        // TODO update form if dialog already open
    },
    
    beforeStoreWrite: function(store, action, rs, options) {
        if (NHDEdit.preferences) {
            var nativeElements = options.params.nativeElements;
            var obj = {};
            if (nativeElements && nativeElements.length === 1) {
                obj = Ext.util.JSON.decode(nativeElements[0].value);
            }
            OpenLayers.Util.extend(obj, NHDEdit.preferences);
            options.params.nativeElements = [{
                vendorId: this.vendorId,
                safeToIgnore: true,
                value: Ext.util.JSON.encode(obj)
            }];
        }
    },
    
    /** api: method[addOutput]
     */
    addOutput: function() {
        var items = [], rule;
        for (var code in NHDEdit.preferences) {
            rule = Ext.apply({code: code}, NHDEdit.preferences[code]);
            items.push({
                xtype: "fieldset",
                cls: "app-preferences-fieldset",
                title: rule.title,
                labelWidth: 115,
                items: NHDEdit.createAutoCorrectItems(rule)
            });
        }
        this.form = new Ext.form.FormPanel({
            padding: 5,
            border: false,
            items: items
        });
        return NHDEdit.plugins.Preferences.superclass.addOutput.call(this, this.form);
    },

    /** api: method[addActions]
     */
    addActions: function() {
        return NHDEdit.plugins.Preferences.superclass.addActions.call(this, [
            {
                handler: this.addOutput,
                scope: this,
                disabled: true,
                text: this.buttonText,
                tooltip: this.tooltipText,
                iconCls: "process"
            }
        ]);
    }

});

Ext.preg(NHDEdit.plugins.Preferences.prototype.ptype, NHDEdit.plugins.Preferences);
