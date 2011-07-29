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

    url: null,

    schema: null,

    featureType: null,

    featureNS: null,

    featureStore: null,

    openWindow: null,

    initComponent : function() {
        this.schema = new GeoExt.data.AttributeStore({
            sortInfo: {
                field: 'name',
                direction: 'ASC'
            },
            url: this.url,
            baseParams: {
                SERVICE: "WFS",
                VERSION: "1.1.0",
                REQUEST: "DescribeFeatureType",
                TYPENAME: this.featurePrefix + ":" + this.featureType
            },
            autoLoad: true,
            listeners: {
                "load": this.onLoad,
                scope: this
            }
        });
        NHDEdit.MetadataForm.superclass.initComponent.call(this);
        this.deleteLabel = new Ext.form.Label({
            hidden: true, 
            html: '<p style="color:red;font-weight:bold">Are you sure you want to delete this feature?</p>'
        });
        this.add(this.deleteLabel);
        this.on('show', function() {
            // restore previous record
            if (NHDEdit.metadataRecord) {
                this.getForm().items.each(function(field) {
                    field.setValue(NHDEdit.metadataRecord.get(field.name));
                });
            }
        }, this);
        this.addEvents(
            'metadatasaved',
            'metadataopened');
    },

    createGrid: function() {
        Ext.getCmp("app-open-button").setDisabled(false);
        this.grid = new gxp.grid.FeatureGrid({
            store: this.featureStore,
            schema: this.schema,
            loadMask: true,
            listeners: {
                'dblclick': this.openMetadata,
                scope: this
            },
            fieldVisibility: {
                'ProcessDate': true,
                'ProcessDescription': true
            },
            propertyNames: {
                'ProcessDate': 'Date',
                'ProcessDescription': 'Summary'
            },
            height: 300,
            bbar: ["->", {
                text: "Cancel", 
                handler: function() { this.openWindow.close(); }, 
                scope: this
            }, {
                text: "Open", 
                handler: this.openMetadata, 
                scope: this
            }]
        });
    },

    saveEntry: function() {
        var feature = new OpenLayers.Feature.Vector(null, {});
        this.getForm().items.each(function(item) {
            var value = item.getRawValue();
            if (value !== "") {
                feature.attributes[item.name] = value;
            }
        });
        feature.state = OpenLayers.State.INSERT;
        this.featureStore.add(new this.featureStore.recordType({feature: feature}));
    },

    openEntry: function() {
        if (this.openWindow === null) {
            this.openWindow = new Ext.Window({
                title: "Metadata Records", 
                layout: "fit",
                closeAction: "hide",
                items: [this.grid]
            });
        }
        this.openWindow.show();
    },

    openMetadata: function() {
        var record = this.grid.getSelectionModel().getSelected();
        this.getForm().items.each(function(field) {
            field.setValue(record.get(field.name));
        });
        this.fireEvent('metadataopened', this, record);
        this.openWindow.hide();
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
                "write": function(store, action, data, response, rs) {
                    this.fireEvent('metadatasaved', this, rs);
                },
                scope: this
            },
            url: this.schema.url,
            featureType: this.featureType,
            featureNS: this.featureNS
        });
        if (NHDEdit.metadataId !== undefined) {
            this.featureStore.setOgcFilter(new OpenLayers.Filter.FeatureId({fids: [NHDEdit.metadataId]}));
            this.featureStore.addListener('load', function(store, records, options) {
                delete NHDEdit.metadataId;
                NHDEdit.metadataRecord = records[0];
                this.featureStore.setOgcFilter(null);
                this.featureStore.addListener('load', this.createGrid, this, {single: true});
                this.featureStore.load();
            }, this, {single: true});
            this.featureStore.load();
        } else {
            this.featureStore.addListener('load', this.createGrid, this, {single: true});
            this.featureStore.load();
        }
    },

    onLoad: function() {
        this.createStore();
        //Ext.getCmp("app-save-button").setDisabled(false);
        var masterFieldset = new Ext.form.FieldSet({title: "Metadata Record"});
        var fieldSet = new Ext.form.FieldSet({
            collapsible: true,
            collapsed: true,
            title: "Optional",
            height: 300,
            autoHeight: false,
            autoScroll: true,
            labelWidth: 170,
            listeners: {
                "expand": function() { fieldSet.setHeight(250); }
            }
        });
        this.schema.each(function(r) {
            var type = r.get("type");
            if (type.match(/^[^:]*:?((Multi)?(Point|Line|Polygon|Curve|Surface|Geometry))/)) {
                // exclude gml geometries
                return;
            }
            var name = r.get("name");
            var fieldCfg = GeoExt.form.recordToField(r);
            fieldCfg.anchor = "100%";
            if (name.toLowerCase() === "processdescription") {
                fieldCfg.xtype = "textarea";
                fieldCfg.hideLabel = true;
                fieldCfg.allowBlank = false;
                masterFieldset.add({xtype: 'label', text: "Commit message:"});
                masterFieldset.add(fieldCfg);
            } else {
                fieldSet.add(fieldCfg);
            }
        }, this);
        masterFieldset.add(fieldSet);
        this.add(masterFieldset);
        this.add(new Ext.Button({
            iconCls: "gxp-icon-search",
            disabled: true,
            id: "app-open-button",
            text: "Find",
            tooltip: "Find an existing metadata record",
            handler: this.openEntry,
            scope: this
        }));
        this.doLayout();
    }

});

Ext.reg('app_metadataform', NHDEdit.MetadataForm);
