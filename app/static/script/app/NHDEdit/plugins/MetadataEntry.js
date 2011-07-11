/**
 * Copyright (c) 2008-2011 The Open Planning Project
 * 
 * Published under the BSD license.
 * See https://github.com/opengeo/gxp/raw/master/license.txt for the full text
 * of the license.
 */

Ext.ns("NHDEdit.plugins");

/**
 * @include NHDEdit/widgets/MetadataForm.js
 */

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

    openWindow: null,

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
            autoLoad: true,
            listeners: {
                "load": this.createGrid,
                scope: this
            },
            url: this.schema.url,
            featureType: this.featureType,
            featureNS: this.featureNS
        });
    },

    createGrid: function() {
        Ext.getCmp("app-open-button").setDisabled(false);
        this.grid = new gxp.grid.FeatureGrid({
            store: this.featureStore,
            schema: this.schema,
            loadMask: true,
            /* TODO: in this case it would be easier to specify the includeFields */
            ignoreFields: ['meta_processid', 'attributeaccuracyreport', 'logicalconsistencyreport', 'completenessreport', 'horizpositionalaccuracyreport', 'vertpositionalaccuracyreport', 'metadatastandardname', 'metadatastandardversion', 'metadatadate', 'datasetcredit', 'contactorganization', 'addresstype', 'address', 'city', 'stateorprovince', 'postalcode', 'contactvoicetelephone', 'contactinstructions'],
            height: 300,
            bbar: ["->", {text: "Open", iconCls: "gxp-icon-open", handler: this.openMetadata, scope: this}]
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
        var options = {
            callback: function(response) {
                if (response && response.insertIds) {
                    this.target.metadataId = response.insertIds[0];
                    this.removeOutput();
                }
            },
            scope: this
        };
        this.featureStore.proxy.protocol.commit([feature], options);
    },

    openEntry: function() {
        if (this.openWindow === null) {
            this.openWindow = new Ext.Window({title: "Open", layout: "fit", items: [this.grid]});
        }
        this.openWindow.show();
    },

    openMetadata: function() {
        var fid = this.grid.getSelectionModel().getSelected().get("feature").fid;
        this.target.metadataId = fid;
        this.openWindow.close();
        this.removeOutput();
    },

    /** api: method[addOutput]
     */
    addOutput: function() {
        this.form = new NHDEdit.MetadataForm({
            labelWidth: 200,
            autoHeight: true,
            fbar: [
                {
                    text: "Open",
                    iconCls: "gxp-icon-open",
                    disabled: true,
                    id: "app-open-button",
                    handler: this.openEntry,
                    scope: this
                }, {
                    text: "Save", 
                    iconCls: "gxp-icon-save", 
                    handler: this.saveEntry, 
                    scope: this
                }
            ],
            schema: this.schema    
        });
        this.grid = new gxp.grid.FeatureGrid({
            loadMask: true,
            /* TODO: in this case it would be easier to specify the includeFields */
            ignoreFields: ['meta_processid', 'attributeaccuracyreport', 'logicalconsistencyreport', 'completenessreport', 'horizpositionalaccuracyreport', 'vertpositionalaccuracyreport', 'metadatastandardname', 'metadatastandardversion', 'metadatadate', 'datasetcredit', 'contactorganization', 'addresstype', 'address', 'city', 'stateorprovince', 'postalcode', 'contactvoicetelephone', 'contactinstructions'],
            height: 300,
            bbar: ["->", {text: "Open", iconCls: "gxp-icon-open", handler: this.openMetadata, scope: this}]
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
