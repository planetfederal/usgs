/**
 * Copyright (c) 2008-2011 The Open Planning Project
 * 
 * Published under the GPL license.
 * See https://github.com/opengeo/gxp/raw/master/license.txt for the full text
 * of the license.
 */

Ext.ns("Editor");

/**
 * @requires Editor/templates.js
 * @requires Editor/data/FType.js
 */

/** api: (define)
 *  module = Editor
 *  class = ExceptionPanel
 *  extends = Ext.form.FormPanel
 */

/** api: constructor
 *  .. class:: ExceptionPanel(config)
 *
 *    Panel to show an exception message, and ways for the user to answer
 *    a question (e.g. is this feature over other features) and re-submit a 
 *    WFS transaction.
 */
Editor.ExceptionPanel = Ext.extend(Ext.form.FormPanel, {

    /** api: config[exceptionReport]
     *  ``Object`` An object representing the exception returned by the WFS.
     */
    exceptionReport: null,

    /** api: config[store]
     *  ``gxp.data.WFSFeatureStore`` The store used to do the WFS transactions.
     */
    store: null,

    /** private: config[vendorId]
     *  ``String``
     *  The vendorId attribute value of the Native element of a WFS 
     *  Transaction.
     */
    vendorId: 'usgs',

    /** i18n */
    queueTitle: "Queue exception",
    exceptionCodeTitle: "Exception code",
    locatorTitle: "Locator",
    fieldsetTitle: "Exception",
    instructionText: 'Return to the previous step to keep editing attributes, modify the geometry, or provide additional information below.',
    /** end i18n */

    /** private: method[initComponent]
     */
    initComponent : function() {
        Editor.ExceptionPanel.superclass.initComponent.call(this);
        var known = false,
            locator = this.getProperty("locator"),
            tpl = Editor.exceptionTemplates[locator];
        if (tpl) {
            // this is a known exception type, we expect a parseable message
            var rule = this.getRule();
            if (rule) {
                known = true;
                this.add({
                    xtype: "fieldset",
                    title: this.fieldsetTitle,
                    items: [{
                        xtype: "box",
                        cls: "app-exception-text",
                        html: "<p>" + tpl.applyTemplate(rule) +
                            "</p><p>" + this.instructionText + "</p>"
                    }]
                });
                if (rule.autoCorrectable) {
                    // add auto-correct items or a generic auto-correct field
                    this.add(Editor.createAutoCorrectItems(rule));
                } else {
                    // allow user to queue exception
                    this.add(this.createQueueField(rule.code));
                }
            }
        }
        if (!known) {
            this.add({
                xtype: "fieldset",
                title: this.fieldsetTitle,
                items: [{
                    xtype: "displayfield", 
                    fieldLabel: this.exceptionCodeTitle, 
                    name: "exceptionCode", 
                    value: this.getProperty("code")
                }, {
                    xtype: "displayfield", 
                    fieldLabel: this.locatorTitle, 
                    name: "locator", 
                    value: locator
                }, {
                    xtype: "box",
                    cls: "app-exception-text",
                    html: gxp.util.getOGCExceptionText(this.exceptionReport)
                }]
            });
        }

        this.nativeElements = {};
        if (this.store) {
            this.store.addListener('beforewrite', this.beforeStoreWrite, this);
        }

        this.on({
            "beforedestroy": function() {
                this.store.un("beforewrite", this.beforeStoreWrite, this);
            },
            scope: this
        });
        
        this.doLayout();
    },

    /** private: method[beforeStoreWrite]
     *  beforewrite handle of the store. This handler is used to set up the 
     *  Native element in the WFS Transaction with the information for the
     *  server on how to continue with this transaction.
     * 
     *  :arg store: ``Ext.data.Store`` The store
     *  :arg action: ``String`` create, update or destroy
     *  :arg rs: ``Ext.data.Record`` The record set (can also be an array)
     *  :arg options: ``Object`` The loading options that were specified.
     */
    beforeStoreWrite: function(store, action, rs, options) {
        var nativeElements = options.params.nativeElements;
        var obj = {};
        if (nativeElements && nativeElements.length === 1) {
            obj = Ext.util.JSON.decode(nativeElements[0].value);
        }
        OpenLayers.Util.extend(obj, this.nativeElements);
        options.params.nativeElements = [{
            vendorId: this.vendorId,
            safeToIgnore: true,
            value: Ext.util.JSON.encode(obj)
        }];
    },

    /** private: method[createQueueField]
     *  Creates a field for the user to select if they want to queue the
     *  exception server-side.
     *
     *  :arg code: ``String`` The value of the locator attribute.
     *
     *  :returns: ``Object`` Configuration for Ext to create a checkbox.
     */
    createQueueField: function(code) {
        return {
            xtype: "checkbox",
            fieldLabel: this.queueTitle,
            value: false,
            name: "queue",
            listeners: {
                check: function(checkbox, checked) {
                    this.getForm().items.each(function(item) {
                        if (item.name !== "queue") {
                            item.setDisabled(checked);
                        }
                    });
                    if (checked === true) {
                        // this should be cumulative
                        var obj = {};
                        obj[code] = {queue: checked};
                        OpenLayers.Util.extend(this.nativeElements, obj);
                    }
                },
                scope: this
            }
        };
    },

    /** private: method[getRule]
     *  Try to decode the first exception text as a JSON string.  If the first
     *  message is not valid JSON, undefined will be returned.
     *
     *  :returns: ``Object`` The first exception message decoded.  Returns 
     *      undefined if the message is not a JSON string.
     */
    getRule: function() {
        // get the first exception
        var exc = this.exceptionReport.exceptions[0];
        var obj;
        try {
            obj = Ext.util.JSON.decode(exc.texts[0]);
        } catch (err) {
            // pass
        }
        return obj;
    },

    /** private: method[getProperty]
     *  Get the value of the passed property from the first exception of the
     *  exception report.
     *
     *  :arg property: ``String`` an exception property name
     *
     *  :returns: ``Object`` The value of the passed property from the first
     *      exception of the exception report
     */
    getProperty: function(property) {
        // get the first exception
        var exc = this.exceptionReport.exceptions[0];
        return exc[property];
    }
    
});

Ext.reg('app_exceptionpanel', Editor.ExceptionPanel);
