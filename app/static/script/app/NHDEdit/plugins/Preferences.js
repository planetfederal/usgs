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

    /** private: method[init]
     */
    init: function(target) {
        NHDEdit.plugins.Preferences.superclass.init.apply(this, arguments);
    },

    apply: function() {
        if (!NHDEdit.preferences) {
            NHDEdit.preferences = {};
        }
        this.form.getForm().items.each(function(item) {
            NHDEdit.preferences[item.name] = item.getValue();
        });
    },

    /** api: method[addOutput]
     */
    addOutput: function() {
        this.form = new Ext.form.FormPanel({
            labelWidth: 100,
            padding: 5,
            border: false,
            fbar: [{text: "Apply", handler: this.apply, scope: this}],
            items: [{
                xtype: "fieldset",
                title: "Vertical relationships",
                items: [{
                    xtype: "combo",
                    store: [["over", "Always over"], ["under", "Always under"]],
                    name: "js:vert",
                    mode: "local",
                    triggerAction: "all",
                    fieldLabel: "Default"
                }]
            }]
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
                text: "Preferences"
            }
        ]);
    }

});

Ext.preg(NHDEdit.plugins.Preferences.prototype.ptype, NHDEdit.plugins.Preferences);
