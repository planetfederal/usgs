/**
 * Copyright (c) 2008-2011 The Open Planning Project
 * 
 * Published under the GPL license.
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
 *    Entry form for a metadata record.
 */
NHDEdit.MetadataForm = Ext.extend(Ext.form.FormPanel, {

    /** i18n */
    findText: "Find",
    findTooltip: "Find an existing metadata record",
    commitTitle: "Commit message",
    contactTitle: "Contact",
    masterFieldsetTitle: "Metadata Record",
    optionalFieldsetTitle: "Optional",
    windowTitle: "Metadata Records",
    deleteText: "Are you sure you want to delete this feature?",
    cancelText: "Cancel",
    openText: "Open",
    /** end i18n */

    /** api: config[url]
     * ``String`` 
     * The online resource of the Web Feature Service to retrieve the exception 
     * queue feature type from.
     */
    url: null,

    /** api: config[featureNS]
     * ``String``
     * The feature name space.
     */
    featureNS: null,

    /** api: config[featureType]
     *  ``String``
     *  The unqualified typename associated with the exception queue
     */
    featureType: null,

    /**
     * private: property[openWindow]
     * ``Ext.Window``
     * The window to open up an existing metadata record.
     */
    openWindow: null,
    
    /** api: config[fieldMetadata]
     *  ``Object``
     *  Metadata about the fields, i.e. how are the fieldsets organized and
     *  what field titles should be used?
     */
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

    /** private: method[initComponent]
     */
    initComponent : function() {
        NHDEdit.MetadataForm.superclass.initComponent.call(this);
        if (NHDEdit.metadataSchema === undefined) {
            NHDEdit.metadataSchema = new GeoExt.data.AttributeStore({
                sortInfo: {
                    field: 'name',
                    direction: 'ASC'
                },
                url: this.url,
                baseParams: {
                    SERVICE: "WFS",
                    VERSION: "1.1.0",
                    REQUEST: "DescribeFeatureType",
                    TYPENAME: this.featureType
                },
                autoLoad: true,
                listeners: {
                    "load": this.onLoad,
                    scope: this
                }
            });
        } else {
            this.createFieldSets();
            this.createGrid();
        }
        this.deleteLabel = new Ext.form.Label({
            hidden: true, 
            html: '<p style="color:red;font-weight:bold">' + this.deleteText + '</p>'
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
            'metadataopened'
        );
    },

    /**
     * private: method[createGrid]
     * Creates the feature grid which is used for opening up an existing 
     * metadata record.
     */
    createGrid: function() {
        //TODO this check is just a workaround - the solution is to create a
        // new store for every popup - see https://github.com/opengeo/usgs/issues/84
        if (this.findButton) {
            this.findButton.setDisabled(false);            
        }
        this.grid = new gxp.grid.FeatureGrid({
            store: NHDEdit.metadataStore,
            schema: NHDEdit.metadataSchema,
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
                text: this.cancelText, 
                handler: function() { this.openWindow.close(); }, 
                scope: this
            }, {
                text: this.openText, 
                handler: this.openMetadata, 
                scope: this
            }]
        });
    },

    /** private: method[setFieldValues]
     *  Update the record with the values from the form.
     *
     *  :arg record: ``Ext.data.Record``
     */
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

    /** api: method[saveEntry]
     *  Save the new metadata record to the WFS.
     */
    saveEntry: function() {
        var feature = new OpenLayers.Feature.Vector(null, {});
        this.getForm().items.each(function(item) {
            var value = item.getRawValue();
            if (value !== "") {
                feature.attributes[item.name] = value;
            }
        });
        feature.state = OpenLayers.State.INSERT;
        NHDEdit.metadataStore.add(new NHDEdit.metadataStore.recordType({feature: feature}));
        NHDEdit.metadataStore.save();
    },

    /** private: method[openEntry]
     *  Show the window to open up an existing metadata record.
     */
    openEntry: function() {
        if (this.openWindow === null) {
            this.openWindow = new Ext.Window({
                title: this.windowTitle, 
                layout: "fit",
                closeAction: "hide",
                items: [this.grid]
            });
        }
        this.openWindow.show();
    },

    /** private: method[openMetadata]
     *  Open up an exisiting metadata record, and fire the metadataopened event.
     */
    openMetadata: function() {
        var record = this.grid.getSelectionModel().getSelected();
        this.setFieldValues(record);
        this.fireEvent('metadataopened', this, record);
        this.openWindow.hide();
    },

    /** private: method[createStore]
     *  Create the feature store for the metadata records.
     */
    createStore: function() {
        var fields = [];
        var schema = NHDEdit.metadataSchema;
        schema.each(function(r) {
            fields.push({name: r.get("name")});
        }, this);
        NHDEdit.metadataStore = new gxp.data.WFSFeatureStore({
            fields: fields,
            layer: new OpenLayers.Layer.Vector(null, {projection: new OpenLayers.Projection("EPSG:900913")}),
            autoLoad: true,
            autoSave: false,
            listeners: {
                "write": function(store, action, data, response, rs) {
                    this.fireEvent('metadatasaved', this, rs);
                },
                scope: this
            },
            url: schema.url,
            featureType: this.featureType,
            featureNS: this.featureNS
        });
        NHDEdit.metadataStore.addListener('load', this.createGrid, this, {single: true});
        var fid = NHDEdit.metadataId;
        if (fid !== undefined) {
            NHDEdit.metadataStore.on("load", function(store, records) {
                var record = store.getAt(store.findExact("fid", fid));
                NHDEdit.setMetadataRecord(record);
                this.fireEvent('metadataopened', this, record);
            }, this, {single: true});
        }
        NHDEdit.metadataStore.load();
    },

    /** private: method[onLoad]
     *  load handler for the AttributeStore.
     */
    onLoad: function() {
        this.createStore();
        this.createFieldSets();
    },

    /** private: method[createFieldSets]
     *  Creates the fielsets for the form.
     */
    createFieldSets: function() {
        var masterFieldset = new Ext.form.FieldSet({
            title: this.masterFieldsetTitle,
            cls: "app-metadata-fieldset",
            labelAlign: "top"
        });
        var fieldSet = new Ext.form.FieldSet({
            collapsible: true,
            collapsed: true,
            title: this.optionalFieldsetTitle,
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
                title: this.contactTitle,
                defaults: {
                    anchor: "100%",
                    labelAlign: "top"
                }
            })
        };
        for (var s in fieldSets) {
            fieldSet.add(fieldSets[s]);
        }
        var schema = NHDEdit.metadataSchema;
        var desc = schema.getAt(schema.findBy(function(r) {
            return r.get("name").toLowerCase() == "processdescription";
        }));
        var fieldCfg = GeoExt.form.recordToField(desc);
        fieldCfg.xtype = "textarea";
        fieldCfg.fieldLabel = this.commitTitle;
        fieldCfg.allowBlank = false;
        fieldCfg.anchor = "100%";
        masterFieldset.add(fieldCfg);

        var rec, fieldData, type, name;
        for (var field in this.fieldMetadata) {
            fieldData = this.fieldMetadata[field];
            rec = schema.getAt(schema.findBy(function(r) {
                return r.get("name").toLowerCase() == field;
            }, this));
            name = rec.get("name");
            fieldCfg = GeoExt.form.recordToField(rec);
            fieldCfg.fieldLabel = fieldData.label;
            if (fieldData.xtype) {
                fieldCfg.xtype = fieldData.xtype;
            }
            if (fieldCfg.xtype.indexOf("date") == 0) {
                fieldCfg.value = new Date().format("c");
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
            text: this.findText,
            tooltip: this.findTooltip,
            handler: this.openEntry,
            scope: this
        }));
        this.doLayout();
    }

});

Ext.reg('app_metadataform', NHDEdit.MetadataForm);
