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

    featureManager: null,

    initComponent : function() {
        this.plugins = [new GeoExt.plugins.AttributeForm({attributeStore: this.featureManager.schema})];
        NHDEdit.AttributeForm.superclass.initComponent.call(this);
    }

});

Ext.reg('app_attributeform', NHDEdit.AttributeForm);
