/**
 * Copyright (c) 2008-2011 The Open Planning Project
 */

Ext.ns("NHDEdit");

/** api: (define)
 *  module = app
 *  class = FeatureEditWizard
 *  extends = gxp.FeatureEditPopup
 */

/** api: constructor
 *  .. class:: FeatureEditPopup(config)
 *
 *      Create a new popup which displays the attributes of a feature and
 *      makes the feature editable,
 *      using an ``OpenLayers.Control.MofidyFeature``.
 */
NHDEdit.FeatureEditWizard = Ext.extend(gxp.FeatureEditPopup, {
    
    layout: null,
    autoHeight: true,
    
    /** private: property[store]
     *  ``GeoExt.data.FeatureStore`` The store holding the feature being edited
     */
    
    /** api: config[feature]
     *  ``GeoExt.data.FeatureRecord``
     */
     
    /** private: method[initComponent]
     */
    initComponent: function() {
        
        // we only support editing mode for this subclass
        this.editing = true;
        
        this.store = this.feature.store;
        var feature = this.feature;
        if (feature instanceof GeoExt.data.FeatureRecord) {
            feature = this.feature = feature.getFeature();
        }
        if (!this.location) {
            this.location = feature;
        }
        
        this.anchored = !this.editing;
        
        if(!this.title && feature.fid) {
            this.title = feature.fid;
        }
        
        this.editButton = new Ext.Button({
            text: this.editButtonText,
            tooltip: this.editButtonTooltip,
            iconCls: "edit",
            handler: this.startEditing,
            scope: this
        });
        
        this.deleteButton = new Ext.Button({
            text: this.deleteButtonText,
            tooltip: this.deleteButtonTooltip,
            iconCls: "delete",
            hidden: !this.allowDelete,
            handler: this.deleteFeature,
            scope: this
        });
        
        this.cancelButton = new Ext.Button({
            text: this.cancelButtonText,
            tooltip: this.cancelButtonTooltip,
            iconCls: "cancel",
            hidden: true,
            handler: function() {
                this.stopEditing(false);
            },
            scope: this
        });
        
        this.saveButton = new Ext.Button({
            text: this.saveButtonText,
            tooltip: this.saveButtonTooltip,
            iconCls: "save",
            hidden: true,
            handler: function() {
                this.stopEditing(true);
            },
            scope: this
        });
        
        this.attributeForm = new NHDEdit.AttributeForm({
            feature: feature,
            schema: this.schema,
            padding: 5,
            border: false
        });
        
        this.items = [
            this.attributeForm
        ];

        this.bbar = new Ext.Toolbar({
            hidden: this.readOnly,
            items: [
                this.editButton,
                this.deleteButton,
                this.saveButton,
                this.cancelButton
            ]
        });
        
        // this initComponent implementation replaces the one of the superclass,
        // so we call it on the superclass's superclass.
        gxp.FeatureEditPopup.superclass.initComponent.call(this);
        
        this.store.on({
            "exception": function(proxy, type, action, options, response, records) {
                this.attributeForm.hide();
                this.add(new NHDEdit.ExceptionPanel({
                    padding: 5,
                    border: false,
                    exceptionReport: response.exceptionReport
                }));
                this.doLayout();
            },
            scope: this
        });
        
        this.on({
            "show": function() {
                if(this.editing) {
                    this.editing = null;
                    this.startEditing();
                }
            },
            "beforeclose": function() {
                if(!this.editing) {
                    return;
                }
                if(this.feature.state === this.getDirtyState()) {
                    Ext.Msg.show({
                        title: this.closeMsgTitle,
                        msg: this.closeMsg,
                        buttons: Ext.Msg.YESNOCANCEL,
                        fn: function(button) {
                            if(button && button !== "cancel") {
                                this.stopEditing(button === "yes");
                                this.close();
                            } else {
                                this.fireEvent("cancelclose", this);
                            }
                        },
                        scope: this,
                        icon: Ext.MessageBox.QUESTION,
                        animEl: this.getEl()
                    });
                    return false;
                } else {
                    this.stopEditing(false);
                }
            },
            scope: this
        });
    },
        
    /** private: method[stopEditing]
     *  :arg save: ``Boolean`` If set to true, changes will be saved and the
     *      ``featuremodified`` event will be fired.
     */
    stopEditing: function(save) {
        var feature = this.feature;
        var attributes = this.attributeForm.getForm().getFieldValues();
        var modified = false;
        for (var a in attributes) {
            if (attributes[a] != feature.attributes[a]) {
                modified = true;
                feature.attributes[a] = attributes[a];
            }
        }
        modified && this.setFeatureState(OpenLayers.State.UPDATE);

        NHDEdit.FeatureEditWizard.superclass.stopEditing.apply(this, arguments);
    }
    
});

/** api: xtype = app_featureeditwizard */
Ext.reg('app_featureeditwizard', NHDEdit.FeatureEditWizard);
