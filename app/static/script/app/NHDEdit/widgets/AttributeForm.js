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
        var store = new Ext.data.ArrayStore({
            fields: ['value', 'description'],
            data : NHDEdit.fCodes
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
            if (name.toLowerCase() === "fcode") {
                fieldCfg = {
                    xtype: "combo",
                    listWidth: 650,
                    mode: "local",
                    name: name,
                    fieldLabel: name,
                    store: store, 
                    triggerAction: 'all',
                    displayField: 'description',
                    valueField: 'value'
                };
            } else {
                fieldCfg = GeoExt.form.recordToField(r);
            }
            var value = this.feature.attributes[name];
            fieldCfg.value = value;
            this.add(fieldCfg);
        }, this);
    }

});

Ext.reg('app_attributeform', NHDEdit.AttributeForm);
