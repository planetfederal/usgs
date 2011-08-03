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
            ['{subjectFType:this.getFType} {subjectLayer} features must ', 
            'intersect a feature from one of the following layers: ',
            '<tpl for="objects">{layer}<tpl if="values.ftypes"> (',
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
            ['{subjectFType:this.getFType} {subjectLayer} features must ', 
            'intersect an endpoint (the first or last point) of a feature ',
            'from one of the following layers: ',
            '<tpl for="objects">{layer}<tpl if="values.ftypes"> (',
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
            ['{subjectFType:this.getFType} {subjectLayer} features must not cross ',
            'any features from any of the following layers: ',
            '<tpl for="objects">{layer}<tpl if="values.ftypes"> (',
            '<tpl for="ftypes">{.:this.getFType}{[xindex < xcount ? ", " : ""]}</tpl>)</tpl>',
            '{[xindex < xcount ? ", " : ""]}</tpl>.<tpl if="values.autoCorrectable">',
            ' This exception can be autocorrected.</tpl>'].join(""),
            {
                getFType: function(value) {
                    return NHDEdit.fTypeDict[value];
                }
            }
        ),
        "js:MustHaveVerticalRelationship": new Ext.XTemplate(
            ['Pipeline {layer} features must have a vertical relationship. ',
            '<tpl if="values.autoCorrectable">This exception can be autocorrected.</tpl>'].join("")
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
                    "check": function(checkbox, checked) {
                        this.setPreference(options.code, {
                            autoCorrect: checked ? this.autoCorrectValue || true : false
                        });
                    },
                    scope: this
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
                                obj[processId] = {queue: checked};
                                options.params.nativeElements = [{
                                    vendorId: this.vendorId,
                                    safeToIgnore: true,
                                    value: Ext.util.JSON.encode(obj)
                                }];
                            };
                            this.store.addListener('beforewrite', this._beforeWriteQueue, this, {single: true});
                        }
                    },
                    scope: this
                }
            };
        },
        // code 6
        "js:MustHaveVerticalRelationship": function(processId, options) {
            var result = [];
            result.push(this.writers.js.apply(this, arguments));
            result.push({
                xtype: "combo",
                store: ["over", "under"],
                fieldLabel: "Vertical relationship",
                triggerAction: "all",
                mode: 'local',
                width: 60,
                listeners: {
                    "select": function(combo, record, index) {
                        var value = combo.getValue();
                        this.autoCorrectValue = {
                            relationship: value
                        };
                        var pref = this.getPreference(options.code);
                        this.setPreference(options.code, {
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
                            obj[processId] = {relationship: value};
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
                text = "<p>" + tpl.applyTemplate(messageObj) +
                    "</p><p>Return to the previous step to keep editing " +
                    "attributes, modify the geometry, or provide additional " + 
                    "information below.</p>";
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
                cls: "app-exception-text",
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
    },
    
    /** private: method[getPreference]
     *  :arg code: ``String`` exception code in the NHDEdit.preferences object
     *  :returns: ``Objext`` the object from the preferences
     */
    getPreference: function(code) {
        return (NHDEdit.preferences || {})[code] || {};
    },
    
    /** private: method[setPreference]
     *  :arg code: ``String`` exception code in the NHDEdit.preferences object
     *  :arg object: ``Object`` object to set for the preference
     */
    setPreference: function(code, object) {
        if (!NHDEdit.preferences) {
            NHDEdit.preferences = {};
        }
        NHDEdit.preferences[code] =
            Ext.apply(NHDEdit.preferences[code] || {}, object);
    }

});

Ext.reg('app_exceptionpanel', NHDEdit.ExceptionPanel);
