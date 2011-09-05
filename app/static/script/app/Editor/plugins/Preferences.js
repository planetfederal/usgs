/**
 * Copyright (c) 2008-2011 The Open Planning Project
 * 
 * Published under the GPL license.
 * See https://github.com/opengeo/gxp/raw/master/license.txt for the full text
 * of the license.
 */

/**
 * @requires Editor.js
 */
Ext.ns("Editor.plugins");

/** api: (define)
 *  module = Editor.plugins
 *  class = Preferences
 *  extends = gxp.plugins.Tool
 */

/** api: constructor
 *  .. class:: Preferences(config)
 *
 *  Preferences dialog. The prefences dialog allows the end user to set
 *  preferences such as "always use over for the vertical relationship" 
 *  question. The preferences are tied to a specific metadata record.  
 */
Editor.plugins.Preferences = Ext.extend(gxp.plugins.Tool, {

    /** api: ptype = app_preferences */
    ptype: "app_preferences",

    /** i18n */
    buttonText: "Preferences",
    tooltipText: "Change editing preferences",
    /** end i18n */

    /** private: config[vendorId]
     *  ``String``
     *  The vendorId attribute value of the Native element of a WFS 
     *  Transaction.
     */
    vendorId: "usgs",

    /** api: config[featureManager]
     * The feature manager to use for this tool. This is needed to hook up
     * to the layerchange event of the feature manager.
     */
    featureManager: null,

    /** private: method[init]
     *
     *  :arg target: ``gxp.Viewer`` The viewer initializing this plugin.
     */
    init: function(target) {
        Editor.plugins.Preferences.superclass.init.apply(this, arguments);
        var featureManager = this.target.tools[this.featureManager];
        featureManager.addListener('layerchange', this.onLayerChange, this);
        target.addListener('setpreference', this.onSetPreference, this);
    },

    /** private: method[onLayerChange]
     *  If the layer changes that the feature manager is working on, we need
     *  to register a beforewrite listener on its store, so that we can pass on
     *  the preferences in the Native element of the WFS Transaction.
     *
     *  :arg tool: ``gxp.plugins.FeatureManager`` The feature manager.
     *  :arg layer: ``GeoExt.data.LayerRecord`` the new layer
     *  :arg schema: ``GeoExt.data.AttributeStore``
     */
    onLayerChange: function(tool, layer, schema) {
        var store = tool.featureStore;
        if (store) {
            store.addListener('beforewrite', this.beforeStoreWrite, this);
        }
    },

    /** private: method[onSetPreference]
     *  When a prefence has been set (e.g. loaded from an existing metadata 
     *  record), enable the Preferences button in the UI.
     *
     *  :arg code: ``Object`` Rule with an exception code.
     *  :arg pref: ``Object`` The preferences object associated with the code.
     */
    onSetPreference: function(code, pref) {
        this.actions[0].enable();
    },
    
    /**
     * private: method[beforeStoreWrite]
     * beforewrite handle of the store. This handler is used to set up the 
     * Native element in the WFS Transaction with the preferences information.
     * 
     * :arg store: ``Ext.data.Store`` The store
     * :arg action: ``String`` create, update or destroy
     * :arg rs: ``Ext.data.Record`` The record set (can also be an array)
     * :arg options: ``Object`` The loading options that were specified.
     */
    beforeStoreWrite: function(store, action, rs, options) {
        if (Editor.preferences) {
            var nativeElements = options.params.nativeElements;
            var obj = {};
            if (nativeElements && nativeElements.length === 1) {
                obj = Ext.util.JSON.decode(nativeElements[0].value);
            }
            OpenLayers.Util.extend(obj, Editor.preferences);
            options.params.nativeElements = [{
                vendorId: this.vendorId,
                safeToIgnore: true,
                value: Ext.util.JSON.encode(obj)
            }];
        }
    },
    
    /** api: method[addOutput]
     * Creates the output for this tool.
     */
    addOutput: function() {
        var items = [], rule;
        for (var code in Editor.preferences) {
            rule = Ext.apply({code: code}, Editor.preferences[code]);
            items.push({
                xtype: "fieldset",
                cls: "app-preferences-fieldset",
                title: rule.title,
                labelWidth: 115,
                items: Editor.createAutoCorrectItems(rule)
            });
        }
        this.form = new Ext.form.FormPanel({
            padding: 5,
            border: false,
            items: items
        });
        return Editor.plugins.Preferences.superclass.addOutput.call(this, this.form);
    },

    /** api: method[addActions]
     * Creates the actions for this tool.
     */
    addActions: function() {
        return Editor.plugins.Preferences.superclass.addActions.call(this, [{
            handler: this.addOutput,
            scope: this,
            disabled: true,
            text: this.buttonText,
            tooltip: this.tooltipText,
            iconCls: "process"
        }]);
    },

    /** private: method[destroy]
     * Clean up.
     */
    destroy: function() {
        this.form = null;
        if (this.target) {
            if (this.target.tools && this.featureManager) {
                var featureManager = this.target.tools[this.featureManager];
                if (featureManager) {
                    featureManager.removeListener('layerchange', this.onLayerChange, this);
                    if (featureManager.featureStore) {
                        featureManager.featureStore.removeListener('beforewrite', this.beforeStoreWrite, this);
                    }
                }
            }
            this.target.removeListener('setpreference', this.onSetPreference, this);
        }
        Editor.plugins.Preferences.superclass.destroy.apply(this, arguments);
    }

});

Ext.preg(Editor.plugins.Preferences.prototype.ptype, Editor.plugins.Preferences);
