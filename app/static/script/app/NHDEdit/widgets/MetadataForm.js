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
        this.addEvents(
            'metadatasaved',
            'metadataopened'
        );
    },

    createGrid: function() {
        Ext.getCmp("app-open-button").setDisabled(false);
        this.grid = new gxp.grid.FeatureGrid({
            store: this.featureStore,
            schema: this.schema,
            loadMask: true,
            /* TODO: in this case it would be easier to specify the includeFields */
            ignoreFields: ['AttributeAccuracyreport', 'LogicalConsistencyReport', 'CompletenessReport', 'HorizPositionalAccuracyReport', 'VertPositionalAccuracyReport', 'MetadataStandardName', 'MetadataStandardVersion', 'MetadataDate', 'DataSetCredit', 'ContactOrganization', 'AddressType', 'Address', 'City', 'StateOrProvince', 'PostalCode', 'ContactVoiceTelephone', 'ContactInstructions', 'ContactEmailAddress'],
            height: 300,
            bbar: ["->", {text: "Open", iconCls: "gxp-icon-open", handler: this.openMetadata, scope: this}]
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
                title: "Open", 
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
                "load": this.createGrid,
                "write": function(store, action, data, response, rs) {
                    this.fireEvent('metadatasaved', this, rs);
                },
                scope: this
            },
            url: this.schema.url,
            featureType: this.featureType,
            featureNS: this.featureNS
        });
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
                fieldCfg.grow = true;
                fieldCfg.hideLabel = true;
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
