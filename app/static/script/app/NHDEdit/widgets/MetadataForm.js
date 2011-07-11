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
 *  class = MetadataForm
 *  extends = Ext.form.FormPanel
 */

/** api: constructor
 *  .. class:: MetadataForm(config)
 *
 *    Entry form for metadata.
 */
NHDEdit.MetadataForm = Ext.extend(Ext.form.FormPanel, {

    schema: null,

    initComponent : function() {
        NHDEdit.MetadataForm.superclass.initComponent.call(this);
        this.schema.on({
            "load": this.onLoad,
            scope: this
        });
    },

    onLoad: function() {
        this.schema.each(function(r) {
            var type = r.get("type");
            if (type.match(/^[^:]*:?((Multi)?(Point|Line|Polygon|Curve|Surface|Geometry))/)) {
                // exclude gml geometries
                return;
            }
            var name = r.get("name");
            var fieldCfg = GeoExt.form.recordToField(r);
            this.add(fieldCfg);
        }, this);
        this.doLayout();
    }

});

Ext.reg('app_metadataform', NHDEdit.MetadataForm);
