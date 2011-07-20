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

    vendorId: 'usgs',

    isUnrecoverable: function(processId) {
        return (processId === null || this.writers[processId] === undefined);
    },

    templates: {
        "intersects": new Ext.XTemplate(
            '{subjectFType:this.getSubject} features must intersect a feature from the {objectLayer} layer.',
            {
                getSubject: function(value) {
                    var result;
                    switch(value) {
                        case 487: result = "Waterfall"; break;
                        case 431: result = "Rapids"; break;
                        case 460: result = "Sink/Rise"; break;
                        case 369: result = "Gate"; break;
                        default: result = "Unknown";
                    }
                    return result;
                }
            }
        )
    },

    writers: {
        "queue": function(processId) {
            return {
                xtype: "checkbox",
                fieldLabel: "Queue exception",
                value: false,
                name: "queue",
                listeners: {
                    "check": function(checkbox, checked) {
                        this.getForm().items.each(function(item) {
                            if (item.name !== "queue") {
                                item.setDisabled(checked);
                            }
                        });
                        var beforeWriteQueue;
                        if (checked === true) {
                            beforeWriteQueue = function(store, action, rs, options) {
                                var nativeElements = options.params.nativeElements;
                                var obj = {};
                                if (nativeElements && nativeElements.length === 1) {
                                    obj = Ext.util.JSON.decode(nativeElements[0].value);
                                }
                                obj[processId] = {queue: checked};
                                options.params.nativeElements = [{
                                    vendorId: this.vendorId,
                                    safeToIgnore: true,
                                    value: Ext.util.JSON.encode(obj)
                                }];
                            };
                            this.store.addListener('beforewrite', beforeWriteQueue, this, {single: true});
                        } else {
                            this.store.removeListener("beforewrite", beforeWriteQueue, this);
                        }
                    },
                    scope: this
                }
            };
        },
        "js:PipelineVerticalRelationship": function(processId) {
            var result = [];
            result.push(this.writers.queue.apply(this, arguments));
            result.push({
                xtype: "combo",
                store: ["over", "under"],
                fieldLabel: "Specify the vertical relationship",
                triggerAction: "all",
                mode: 'local',
                listeners: {
                    "select": function(combo, record, index) {
                        var value = combo.getValue();
                        var beforeWrite = function(store, action, rs, options) {
                            var nativeElements = options.params.nativeElements;
                            var obj = {};
                            if (nativeElements && nativeElements.length === 1) {
                                obj = Ext.util.JSON.decode(nativeElements[0].value);
                            }
                            obj[processId] = {relationship: value};
                            options.params.nativeElements = [{
                                vendorId: this.vendorId,
                                safeToIgnore: true,
                                value: Ext.util.JSON.encode(obj)
                            }];
                        };
                        this.store.addListener('beforewrite', beforeWrite, this, {single: true});
                    },
                    scope: this
                }
            });
            return result;
        }
    },

    initComponent : function() {
        NHDEdit.ExceptionPanel.superclass.initComponent.call(this);
        var code = this.getProperty("code");
        var locator = this.getProperty("locator");
        var messageObj = this.getMessageObject();
        var text;
        if (messageObj && messageObj.rule && messageObj.rule.name) {
            var tpl = this.templates[messageObj.rule.name];
            if (tpl) {
                text = messageObj.message + ": " + tpl.applyTemplate(messageObj.rule);
            }
        } else {
            text = gxp.util.getOGCExceptionText(this.exceptionReport);
        }
        this.add({
            xtype: "label",
            fieldLabel: "Message",
            text: text
        });
        if (this.isUnrecoverable(locator) === true) {
            this.add({
                xtype: "displayfield", 
                fieldLabel: "Locator", 
                name: "locator", 
                value: locator
            });
            this.add({
                xtype: "displayfield", 
                fieldLabel: "Exception code", 
                name: "exceptionCode", 
                value: code
            });
        } else {
            this.add(this.writers[locator].apply(this, [locator]));
        }
        this.doLayout();
    },

    getMessageObject: function() {
        var result = null;
        Ext.each(this.exceptionReport.exceptions, function(exc) {
            result = Ext.util.JSON.decode(exc.texts[0]);
        });
        return result;
    },

    getProperty: function(property) {
        var result = null;
        // we only expect one, so overwrite if multiple
        Ext.each(this.exceptionReport.exceptions, function(exc) {
            result = exc[property];
        });
        return result;
    }

});

Ext.reg('app_exceptionpanel', NHDEdit.ExceptionPanel);
