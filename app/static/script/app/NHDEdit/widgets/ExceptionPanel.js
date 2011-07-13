/**
 * Copyright (c) 2008-2011 The Open Planning Project
 * 
 * Published under the BSD license.
 * See https://github.com/opengeo/gxp/raw/master/license.txt for the full text
 * of the license.
 */

Ext.ns("NHDEdit");

/** api: (define)
 *  module = NHDEdit
 *  class = ExceptionPanel
 *  extends = Ext.form.FormPanel
 */

/** api: constructor
 *  .. class:: ExceptionPanel(config)
 *
 *    Panel to show an exception message, and ways for the user to answer
 *    a question (e.g. is this feature over feature X?) a re-submit a 
 *    transaction.
 */
NHDEdit.ExceptionPanel = Ext.extend(Ext.form.FormPanel, {

    exceptionReport: null,

    store: null,

    vendorId: 'GeoServer',

    initComponent : function() {
        NHDEdit.ExceptionPanel.superclass.initComponent.call(this);
        var code = this.getProperty("code");
        var locator = this.getProperty("locator");
        this.add({
            xtype: "label",
            fieldLabel: "Message",
            text: gxp.util.getOGCExceptionText(this.exceptionReport)
        });
        if (code === "js:PipelineVerticalRelationship") {
            this.add({
                xtype: "combo",
                store: ["over", "under"],
                fieldLabel: "Specify the vertical relationship",
                triggerAction: "all",
                mode: 'local',
                listeners: {
                    "select": function(combo, record, index) {
                        var value = combo.getValue();
                        var beforeWrite = function(store, action, rs, options) {
                            options.params.nativeElements = [{
                                vendorId: this.vendorId, 
                                safeToIgnore: true, 
                                value: '{"js:PipelineVerticalRelationship": {"relationship": "'+value+'"}}'
                            }];
                        };
                        this.store.addListener('beforewrite', beforeWrite, this, {single: true});
                    },
                    scope: this
                }
            });
        } else {
            this.add({
                xtype: "displayfield", 
                fieldLabel: "Locator", 
                name: "locator", 
                value: locator
            });
            this.add({
                xtype: "displayfield", 
                fieldLabel: "Process identifier", 
                name: "exceptionCode", 
                value: code
            });
        }
        this.doLayout();
    },

    getProperty: function(property) {
        var result;
        // we only expect one, so overwrite if multiple
        Ext.each(this.exceptionReport.exceptions, function(exc) {
            result = exc[property];
        });
        return result;
    }

});

Ext.reg('app_exceptionpanel', NHDEdit.ExceptionPanel);
