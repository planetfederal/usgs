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

    initComponent : function() {
        NHDEdit.AttributeForm.superclass.initComponent.call(this);
        this.schema.each(function(r) {
            var type = r.get("type");
            if (type.match(/^[^:]*:?((Multi)?(Point|Line|Polygon|Curve|Surface|Geometry))/)) {
                // exclude gml geometries
                return;
            }
            var name = r.get("name");
            var value = this.feature.attributes[name];
            var fieldCfg = GeoExt.form.recordToField(r);
            fieldCfg.value = value;
            this.add(fieldCfg);
        }, this);
    }

});

Ext.reg('app_attributeform', NHDEdit.AttributeForm);
