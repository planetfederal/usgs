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

    msg: null,

    initComponent : function() {
        NHDEdit.ExceptionPanel.superclass.initComponent.call(this);
        this.add({
            xtype: "displayfield", 
            fieldLabel: "Process identifier", 
            name: "locator", 
            value: this.getProperty("locator")
        });
        this.add({
            xtype: "displayfield", 
            fieldLabel: "Exception code", 
            name: "exceptionCode", 
            value: this.getProperty("code")
        });
        this.add({
            xtype: "textarea",
            readOnly: true,
            grow: true, 
            fieldLabel: "Message",
            width: 150, 
            value: this.msg
        });
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
