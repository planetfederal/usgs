/**
 * Copyright (c) 2008-2011 The Open Planning Project
 * 
 * Published under the BSD license.
 * See https://github.com/opengeo/gxp/raw/master/license.txt for the full text
 * of the license.
 */

Ext.ns("NHDEdit");

/**
 * @include NHDEdit/data/NHDFType.js
 */

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

    vendorId: 'usgs',

    /** private: property[autoCorrectValue]
     *  ``Boolean|Object`` the value to set on the NativeElement when the
     *  Autocorrect checkbox is checked.
     */
    autoCorrectValue: null,
    
    ruleSpecificItems: {
        // specific handling for vertical relationship rule
        "6": function() {
            var code = "6";
            return {
                xtype: "combo",
                store: ["over", "under"],
                fieldLabel: "Vertical relationship",
                triggerAction: "all",
                mode: 'local',
                width: 60,
                listeners: {
                    select: function(combo, record, index) {
                        var value = combo.getValue();
                        this.autoCorrectValue = {
                            relationship: value
                        };
                        var pref = NHDEdit.getPreference(code);
                        NHDEdit.setPreference(code, {
                            autoCorrect: pref.autoCorrect ? this.autoCorrectValue : false
                        });
                        if (this._beforeWrite6) {
                            this.store.removeListener('beforewrite', this._beforeWrite6);
                        }
                        this._beforeWrite6 = function(store, action, rs, options) {
                            var nativeElements = options.params.nativeElements;
                            var obj = {};
                            if (nativeElements && nativeElements.length === 1) {
                                obj = Ext.util.JSON.decode(nativeElements[0].value);
                            }
                            obj[code] = {autoCorrect: {relationship: value}};
                            options.params.nativeElements = [{
                                vendorId: this.vendorId,
                                safeToIgnore: true,
                                value: Ext.util.JSON.encode(obj)
                            }];
                        };
                        this.store.addListener('beforewrite', this._beforeWrite6, this, {single: true});
                    },
                    scope: this
                }
            };
        }
    },
    
    initComponent : function() {
        NHDEdit.ExceptionPanel.superclass.initComponent.call(this);
        var known = false,
            code = this.getProperty("code"),
            locator = this.getProperty("locator"),
            tpl = NHDEdit.exceptionTemplates[locator];
        if (tpl) {
            // this is a known exception type, we expect a parseable message
            var messageObj = this.getMessageObject();
            if (messageObj) {
                known = true;
                this.add({
                    xtype: "fieldset",
                    title: "Exception",
                    items: [{
                        xtype: "box",
                        cls: "app-exception-text",
                        html: "<p>" + tpl.applyTemplate(messageObj) +
                            "</p><p>Return to the previous step to keep editing " +
                            "attributes, modify the geometry, or provide additional " + 
                            "information below.</p>"
                    }]
                });
                if (messageObj.autoCorrectable) {
                    // add an auto-correct field
                    this.add(this.createAutoCorrectField(code));
                    // add any items for specific rules
                    if (code in this.ruleSpecificItems) {
                        this.add(this.ruleSpecificItems[code].call(this));
                    }
                } else {
                    // allow user to queue exception
                    this.add(this.createQueueField(code));
                }
            }
        }
        if (!known) {
            this.add({
                xtype: "fieldset",
                title: "Exception",
                items: [{
                    xtype: "displayfield", 
                    fieldLabel: "Exception code", 
                    name: "exceptionCode", 
                    value: code
                }, {
                    xtype: "displayfield", 
                    fieldLabel: "Locator", 
                    name: "locator", 
                    value: locator
                }, {
                    xtype: "box",
                    cls: "app-exception-text",
                    html: gxp.util.getOGCExceptionText(this.exceptionReport)
                }]
            });
        }
        
        this.doLayout();
    },

    createAutoCorrectField: function(code) {
        return {
            xtype: "checkbox",
            fieldLabel: "Autocorrect",
            value: false,
            name: "autoCorrect",
            listeners: {
                "check": function(checkbox, checked) {
                    NHDEdit.setPreference(code, {
                        autoCorrect: checked ? this.autoCorrectValue || true : false
                    });
                },
                scope: this
            }            
        };
    },
    
    createQueueField: function(code) {
        return {
            xtype: "checkbox",
            fieldLabel: "Queue exception",
            value: false,
            name: "queue",
            listeners: {
                check: function(checkbox, checked) {
                    this.getForm().items.each(function(item) {
                        if (item.name !== "queue") {
                            item.setDisabled(checked);
                        }
                    });
                    if (this._beforeWriteQueue){
                        this.store.removeListener("beforewrite", this._beforeWriteQueue, this);
                    }
                    if (checked === true) {
                        this._beforeWriteQueue = function(store, action, rs, options) {
                            var nativeElements = options.params.nativeElements;
                            var obj = {};
                            if (nativeElements && nativeElements.length === 1) {
                                obj = Ext.util.JSON.decode(nativeElements[0].value);
                            }
                            obj[code] = {queue: checked};
                            options.params.nativeElements = [{
                                vendorId: this.vendorId,
                                safeToIgnore: true,
                                value: Ext.util.JSON.encode(obj)
                            }];
                        };
                        this.store.addListener("beforewrite", this._beforeWriteQueue, this, {single: true});
                    }
                },
                scope: this
            }
        };
    },


    /** private: method[getMessageObject]
     *  :returns: ``Object`` The first exception message decoded.  Returns 
     *      undefined if the message is not a JSON string.
     * 
     *  Try to decode the first exception text as a JSON string.  If the first
     *  message is not valid JSON, undefined will be returned.
     */
    getMessageObject: function() {
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
     *  :arg property: ``String`` an exception property name
     *  :returns: ``Object`` The value of the passed property from the first
     *      exception of the exception report
     */
    getProperty: function(property) {
        // get the first exception
        var exc = this.exceptionReport.exceptions[0];
        return exc[property];
    }
    
});

Ext.reg('app_exceptionpanel', NHDEdit.ExceptionPanel);
