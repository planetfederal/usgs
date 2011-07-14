/**
 * Copyright (c) 2008-2011 The Open Planning Project
 * 
 * Published under the BSD license.
 * See https://github.com/opengeo/gxp/raw/master/license.txt for the full text
 * of the license.
 */

Ext.ns("NHDEdit");

/**
 * @include NHDEdit/data/NHDFCode.js
 */

/** api: (define)
 *  module = NHDEdit
 *  class = AttributeForm
 *  extends = Ext.form.FormPanel
 */

/** api: constructor
 *  .. class:: AttributeForm(config)
 *
 *    Entry form for feature types of NDD. Has special handling for adding
 *    lookup values for FType and FCode attributes.
 */
NHDEdit.AttributeForm = Ext.extend(Ext.form.FormPanel, {

    feature: null,

    schema: null,

    autoScroll: true,
    
    excludeFields: null,
    
    initComponent : function() {
        NHDEdit.AttributeForm.superclass.initComponent.call(this);
        var typeName = this.schema.reader.raw.featureTypes[0].typeName;
        var fTypeStore = new Ext.data.ArrayStore({
            fields: ['value', 'description'],
            data : NHDEdit.getFTypes(typeName)
        });
        var fCodeStore = new Ext.data.ArrayStore({
            fields: ['value', 'description'],
            data : NHDEdit.getFCodes(typeName)
        });
        this.schema.each(function(r) {
            var name = r.get("name");
            if (this.excludeFields.indexOf(name) != -1) {
                return;
            }
            var type = r.get("type");
            if (type.match(/^[^:]*:?((Multi)?(Point|Line|Polygon|Curve|Surface|Geometry))/)) {
                // exclude gml geometries
                return;
            }
            var fieldCfg;
            if (name.toLowerCase() == "ftype") {
                fieldCfg = {
                    xtype: "combo",
                    mode: "local",
                    forceSelection: true,
                    name: name,
                    fieldLabel: name,
                    store: fTypeStore, 
                    triggerAction: 'all',
                    displayField: 'description',
                    valueField: 'value',
                    listeners: {
                        "valid": function(field) {
                            window.setTimeout(function() {
                                var value = field.getValue();
                                fCodeStore.filterBy(function(r) {
                                    return r.get("value").indexOf(value) === 0;
                                }, this);
                                var fCode = field.ownerCt.fCode;
                                if (fCodeStore.findExact("value", fCode.getValue()) == -1) {
                                    fCode.setValue(fCodeStore.getAt(0).get("value"));
                                }
                            }, 0);
                        } 
                    }
                };
            } else if (name.toLowerCase() == "fcode") {
                fieldCfg = {
                    xtype: "combo",
                    ref: "fCode",
                    listWidth: 650,
                    mode: "local",
                    lastQuery: "",
                    forceSelection: true,
                    name: name,
                    fieldLabel: name,
                    store: fCodeStore, 
                    triggerAction: 'all',
                    displayField: 'description',
                    valueField: 'value'
                };            
            } else {
                fieldCfg = GeoExt.form.recordToField(r);
            }
            fieldCfg.value = this.feature.attributes[name];
            if (fieldCfg.value && fieldCfg.xtype == "datefield") {
                var dateFormat = "Y-m-d";
                fieldCfg.format = dateFormat;
                fieldCfg.value = Date.parseDate(fieldCfg.value.replace(/Z$/, ""), dateFormat);
            }
            this.add(fieldCfg);
        }, this);
    }

});

Ext.reg('app_attributeform', NHDEdit.AttributeForm);
