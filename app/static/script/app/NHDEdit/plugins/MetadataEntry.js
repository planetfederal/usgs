/**
 * Copyright (c) 2008-2011 The Open Planning Project
 * 
 * Published under the BSD license.
 * See https://github.com/opengeo/gxp/raw/master/license.txt for the full text
 * of the license.
 */

Ext.ns("NHDEdit.plugins");

/** api: (define)
 *  module = NHDEdit.plugins
 *  class = MetadataEntry
 *  extends = gxp.plugins.Tool
 */

/** api: constructor
 *  .. class:: MetadataEntry(config)
 *
 *    Entry form for adding a new metadata record.
 */
NHDEdit.plugins.MetadataEntry = Ext.extend(gxp.plugins.Tool, {

    /** api: ptype = app_metadataentry */
    ptype: "app_metadataentry",

    featureType: null,

    featureNS: null,

    url: null,

    featureStore: null,

    /** api: property[schema]
     *  ``GeoExt.data.AttributeStore`` 
     */
    schema: null,

    /** private: method[init]
     */
    init: function(target) {
        NHDEdit.plugins.MetadataEntry.superclass.init.apply(this, arguments);
        this.schema = new GeoExt.data.AttributeStore({
            url: this.url,
            baseParams: {
                SERVICE: "WFS",
                VERSION: "1.1.0",
                REQUEST: "DescribeFeatureType",
                TYPENAME: this.featurePrefix + ":" + this.featureType
            },
            autoLoad: true,
            listeners: {
                "load": this.createStore,
                scope: this
            }
        });
    },

    createStore: function() {
        var fields = [];
        this.schema.each(function(r) {
            fields.push({name: r.get("name")});
        }, this);
        this.featureStore = new gxp.data.WFSFeatureStore({
            fields: fields,
            url: this.schema.url,
            featureType: this.featureType,
            featureNS: this.featureNS
        });
    },

    saveEntry: function() {
        var feature = new OpenLayers.Feature.Vector(null, {});
        this.form.getForm().items.each(function(item) {
            var value = item.getRawValue();
            if (value !== "") {
                feature.attributes[item.name] = value;
            }
        });
        feature.state = OpenLayers.State.INSERT;
        this.featureStore.proxy.protocol.commit([feature]);
    },

    /** api: method[addOutput]
     */
    addOutput: function() {
        this.form = new Ext.form.FormPanel({
            labelWidth: 200,
            fbar: [{text: "Save", handler: this.saveEntry, scope: this}],
            plugins: [new GeoExt.plugins.AttributeForm({attributeStore: this.schema})]
        });
        return NHDEdit.plugins.MetadataEntry.superclass.addOutput.call(this, this.form);
    },

    /** api: method[addActions]
     */
    addActions: function() {
        return NHDEdit.plugins.MetadataEntry.superclass.addActions.call(this, [
            {
                handler: this.addOutput,
                scope: this,
                text: "Add metadata"
            }
        ]);
    }

});

Ext.preg(NHDEdit.plugins.MetadataEntry.prototype.ptype, NHDEdit.plugins.MetadataEntry);
