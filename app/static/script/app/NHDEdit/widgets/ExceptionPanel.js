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

    
    /** private: method[getWriter]
     *  :arg processId: ``String`` the locator
     *  :return: ``Object`` the writer that creates additional form components
     *      and handlers to recover from the exception, or null if no recovery
     *      strategy is implemented
     */
    getWriter: function(processId) {
        var writer = null;
        if (processId) {
            writer = this.writers[processId] || this.writers[processId.split(":")[0]];
        }
        return writer;
    },

    templates: {
        "js:MustIntersect": new Ext.XTemplate(
            ['<p>{subjectFType:this.getFType} features must ', 
            'intersect a feature from one of the following layers: ',
            '<tpl for="objects">{layer}<tpl if="values.ftypes"> (FType: ',
            '<tpl for="ftypes">{.:this.getFType}{[xindex < xcount ? ", " : ""]}</tpl>)</tpl>',
            '{[xindex < xcount ? ", " : ""]}</tpl>.<tpl if="values.autoCorrectable">',
            ' This exception can be autocorrected.</tpl>'].join(""),
            {
                getFType: function(value) {
                    return NHDEdit.fTypeDict[value];
                }
            }
        ),
        "js:MustIntersectEndpoint": new Ext.XTemplate(
            ['<p>{subjectFType:this.getFType} features must ', 
            'intersect an endpoint (the first or last point) of a feature ',
            'from one of the following layers: ',
            '<tpl for="objects">{layer}<tpl if="values.ftypes"> (FType: ',
            '<tpl for="ftypes">{.:this.getFType}{[xindex < xcount ? ", " : ""]}</tpl>)</tpl>',
            '{[xindex < xcount ? ", " : ""]}</tpl>.<tpl if="values.autoCorrectable">',
            ' This exception can be autocorrected.</tpl>'].join(""),
            {
                getFType: function(value) {
                    return NHDEdit.fTypeDict[value];
                }
            }
        ),
        "js:MustNotCross": new Ext.XTemplate(
            ['<p>{subjectFType:this.getFType} features must not intersect ',
            'a feature from one of the following layers: ',
            '<tpl for="objects">{layer}<tpl if="values.ftypes"> (FType: ',
            '<tpl for="ftypes">{.:this.getFType}{[xindex < xcount ? ", " : ""]}</tpl>)</tpl>',
            '{[xindex < xcount ? ", " : ""]}</tpl>.<tpl if="values.autoCorrectable">',
            ' This exception can be autocorrected.</tpl>'].join(""),
            {
                getFType: function(value) {
                    return NHDEdit.fTypeDict[value];
                }
            }
        )
    },

    writers: {
        "js": function(processId, options) {
            return options.autoCorrectable ? {
                xtype: "checkbox",
                fieldLabel: "Autocorrect",
                value: false,
                name: "autoCorrect",
                listeners: {
                    check: function(checkbox, checked) {
                        if (!NHDEdit.preferences) {
                            NHDEdit.preferences = {};
                        }
                        NHDEdit.preferences[options.code] =
                            Ext.apply(NHDEdit.preferences[options.code] || {}, {
                                autoCorrect: checked
                            });
                    }
                }
            } : {
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
        "js:PipelineVerticalRelationship": function(processId, autoCorrectable) {
            var result = [];
            result.push(this.writers.js.apply(this, arguments));
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
        var code = this.getProperty("code"),
            locator = this.getProperty("locator"),
            tpl = this.templates[locator],
            text, autoCorrectable;
        if (tpl) {
            var messageObj = this.getMessageObject();
            if (messageObj) {
                autoCorrectable = messageObj.autoCorrectable;
                text = tpl.applyTemplate(messageObj) +
                    "<p>Go back to the previous step and keep editing " +
                    "attributes, or modify the geometry, or provide " +
                    "additional information below.</p>";
            }
        }
        if (!text) {
            text = gxp.util.getOGCExceptionText(this.exceptionReport);
        }
        this.add({
            xtype: "fieldset",
            title: "Exception",
            items: [{
                xtype: "box",
                html: text
            }]
        });
        var recoveryForm = this.getWriter(locator);
        if (recoveryForm) {
            var options = {
                code: code,
                autoCorrectable: autoCorrectable
            };
            this.add(recoveryForm.call(this, locator, options));
        } else {
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
        }
        this.doLayout();
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
