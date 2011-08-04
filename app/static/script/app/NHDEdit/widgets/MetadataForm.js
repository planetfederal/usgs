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
    
    fieldMetadata: {
        contactorganization: {fieldset: "contact", label: "Contact Organization"},
        contactemailaddress: {fieldset: "contact", label: "Contact E-mail"},
        contactvoicetelephone: {fieldset: "contact", label: "Contact Telephone"},
        address: {fieldset: "contact", label: "Address"},
        postalcode: {fieldset: "contact", label: "Postal Code"},
        city: {fieldset: "contact", label: "City"},
        stateorprovince: {fieldset: "contact", label: "State or Province"},
        contactinstructions: {fieldset: "contact", label: "Contact Instructions"},
        datasetcredit: {label: "Dataset Credit", xtype: "textarea"},
        metadatadate: {label: "Metadata Date"},
        metadatastandardname: {label: "Metadata Standard Name"},
        metadatastandardversion: {label: "Metadata Standard Version"}
    },

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
                this.setFieldValues(NHDEdit.metadataRecord);
            }
        }, this);
        this.addEvents(
            'metadatasaved',
            'metadataopened');
    },

    createGrid: function() {
        //TODO this check is just a workaround - the solution is to create a
        // new store for every popup - see https://github.com/opengeo/usgs/issues/84
        if (this.findButton) {
            this.findButton.setDisabled(false);            
        }
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
    
    setFieldValues: function(record) {
        var processDescription = record.fields.find(function(f) {
            return f.name.toLowerCase() == "processdescription"; 
        }).name;
        var copy = record.get(processDescription) != null;
        this.getForm().items.each(function(field) {
            var value = record.get(field.name);
            field.setValue(value);
            if (!value && field.getXType().indexOf("date") == 0) {
                field.setValue(new Date().format("c"));
            }
            if (copy === true) {
                field.on("change", function() {
                    NHDEdit.setMetadataRecord(null);
                });
            }
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
        this.setFieldValues(record);
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
        this.featureStore.addListener('load', this.createGrid, this, {single: true});
        var fid = NHDEdit.metadataId;
        if (fid !== undefined) {
            this.featureStore.on("load", function(store, records) {
                var record = store.getAt(store.findExact("fid", fid));
                NHDEdit.setMetadataRecord(record);
                this.fireEvent('metadataopened', this, record);
            }, this, {single: true});
        }
        this.featureStore.load();
    },

    onLoad: function() {
        this.createStore();
        //Ext.getCmp("app-save-button").setDisabled(false);
        var masterFieldset = new Ext.form.FieldSet({
            title: "Metadata Record",
            cls: "app-metadata-fieldset",
            labelAlign: "top"
        });
        var fieldSet = new Ext.form.FieldSet({
            collapsible: true,
            collapsed: true,
            title: "Optional",
            autoHeight: false,
            autoScroll: true,
            labelAlign: "top",
            defaults: {
                anchor: "-10",
                labelAlign: "top"
            },
            listeners: {
                "expand": function() { fieldSet.setHeight(220); }
            }
        });
        var fieldSets = {
            contact: new Ext.form.FieldSet({
                title: "Contact",
                defaults: {
                    anchor: "100%",
                    labelAlign: "top"
                }
            })
        };
        for (var s in fieldSets) {
            fieldSet.add(fieldSets[s]);
        }
        var desc = this.schema.getAt(this.schema.findBy(function(r) {
            return r.get("name").toLowerCase() == "processdescription";
        }));
        var fieldCfg = GeoExt.form.recordToField(desc);
        fieldCfg.xtype = "textarea";
        fieldCfg.fieldLabel = "Commit message";
        fieldCfg.allowBlank = false;
        fieldCfg.anchor = "100%";
        masterFieldset.add(fieldCfg);

        var rec, fieldData, type, name;
        for (var field in this.fieldMetadata) {
            fieldData = this.fieldMetadata[field];
            rec = this.schema.getAt(this.schema.findBy(function(r) {
                return r.get("name").toLowerCase() == field;
            }, this));
            name = rec.get("name");
            fieldCfg = GeoExt.form.recordToField(rec);
            fieldCfg.fieldLabel = fieldData.label;
            if (fieldData.xtype) {
                fieldCfg.xtype = fieldData.xtype;
            }
            if (fieldData.fieldset) {
                fieldSets[fieldData.fieldset].add(fieldCfg);
            } else {
                fieldSet.add(fieldCfg);
            }
        }
        masterFieldset.add(fieldSet);

        this.add(masterFieldset);
        this.add(new Ext.Button({
            iconCls: "gxp-icon-search",
            disabled: true,
            ref: "findButton",
            text: "Find",
            tooltip: "Find an existing metadata record",
            handler: this.openEntry,
            scope: this
        }));
        this.doLayout();
    }

});

Ext.reg('app_metadataform', NHDEdit.MetadataForm);
