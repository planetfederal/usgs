/**
 * Copyright (c) 2008-2011 The Open Planning Project
 */

Ext.ns("NHDEdit");

/** api: (define)
 *  module = app
 *  class = FeatureEditWizard
 *  extends = Ext.Window
 */

/** api: constructor
 *  .. class:: FeatureEditWizard(config)
 *
 *      Create a new popup which displays the attributes of a feature and
 *      makes the feature editable,
 *      using an ``OpenLayers.Control.ModifyFeature``.
 */
NHDEdit.FeatureEditWizard = Ext.extend(Ext.Window, {
    
    /** i18n **/
    closeMsgTitle: 'Changes will be lost?',
    closeMsg: 'Any changes will be lost after closing this window. Are you sure you want to close the window?',
    deleteMsgTitle: 'Delete Feature?',
    deleteMsg: 'Are you sure you want to delete this feature?',
    deleteButtonText: 'Delete',
    deleteButtonTooltip: 'Delete this feature',
    saveButtonText: 'Save',
    saveButtonTooltip: 'Save changes',
    
    /** private config overrides **/
    autoHeight: true,
    shadow: false,
        
    /** api: config[feature]
     *  ``OpenLayers.Feature.Vector``|``GeoExt.data.FeatureRecord`` The feature
     *  to edit and display.
     */
    
    /** api: config[vertexRenderIntent]
     *  ``String`` renderIntent for feature vertices when modifying. Undefined
     *  by default.
     */
    
    /** api: config[feature]
     *  ``GeoExt.data.FeatureRecord`` The feature being edited
     */
    feature: null,
    
    /** api: config[schema]
     *  ``GeoExt.data.AttributeStore`` Optional. If provided, available
     *  feature attributes will be determined from the schema instead of using
     *  the attributes that the feature has currently set.
     */
    schema: null,
    
   /** api: config[excludeFields]
     *  ``Array`` Optional list of field names (case sensitive) that are to be
     *  excluded from the attributeForm.
     */
    
    /** private: property[excludeFields]
     */
    
    /** private: property[modifyControl]
     *  ``OpenLayers.Control.ModifyFeature`` control for editing the geometry.
     */
    modifyControl: null,
    
    /** private: property[geometry]
     *  ``OpenLayers.Geometry`` The original geometry of the feature we are
     *  editing.
     */
    geometry: null,
    
    /** private: property[attributes]
     *  ``Object`` The original attributes of the feature we are editing.
     */
    attributes: null,
    
    /** private: property[saveButton]
     *  ``Ext.Button``
     */
    saveButton: null,
    
    /** private: property[deleteButton]
     *  ``Ext.Button``
     */
    deleteButton: null,

    postDeleteButton: null,
    
    /** private: property[store]
     *  ``GeoExt.data.FeatureStore`` The store holding the feature being edited
     */
        
    /** api: config[metadataSource]
     *  ``Object``
     */
     
    metadataForm: null,
    attributeForm: null,
    exceptionPanel: null,
    metadataId: null,
     
    /** private: method[initComponent]
     */
    initComponent: function() {
        
        this.store = this.feature.store;
        var feature = this.feature;
        if (feature instanceof GeoExt.data.FeatureRecord) {
            feature = this.feature = feature.getFeature();
        }
        
        if(!this.title && feature.fid) {
            this.title = feature.fid;
        }
        
        this.deleteButton = new Ext.Button({
            text: this.deleteButtonText,
            tooltip: this.deleteButtonTooltip,
            iconCls: "delete",
            hidden: !this.allowDelete,
            handler: this.preDeleteFeature,
            scope: this
        });

        this.postDeleteButton = new Ext.Button({
            text: this.deleteButtonText,
            tooltip: this.deleteButtonTooltip,
            hidden: true,
            handler: this.deleteFeature,
            scope: this
        });
        
        this.saveButton = new Ext.Button({
            text: this.saveButtonText,
            tooltip: this.saveButtonTooltip,
            hidden: true,
            handler: function() {
                if (this.metadataId === null) {
                    this.metadataForm.saveEntry();
                } else {
                    this.stopEditing(true);
                }
            },
            scope: this
        });

        this.cancelButton = new Ext.Button({
            text: "Cancel",
            handler: function() {
                this.stopEditing(false);
            },
            scope: this
        });
        
        this.previousButton = new Ext.Button({
            text: "Previous",
            hidden: true,
            handler: function() {
                this.metadataForm.hide();
                this.attributeForm.show();
                this.previousButton.hide();
                this.saveButton.hide();
                this.deleteButton.show();
                this.nextButton.show();
            },
            scope: this
        });
        this.nextButton = new Ext.Button({
            text: "Next",
            handler: function() {
                this.attributeForm.hide();
                this.metadataForm.show();
                this.nextButton.hide();
                this.saveButton.show();
                this.deleteButton.hide();
                this.previousButton.show();
            },
            scope: this
        });
        
        this.attributeForm = new NHDEdit.AttributeForm({
            feature: feature,
            schema: this.schema,
            excludeFields: this.excludeFields || [],
            padding: 5,
            border: false
        });
        
        this.metadataForm = new NHDEdit.MetadataForm({
            hidden: true,
            padding: 5,
            border: false,
            url: this.metadataSource.url,
            featureType: this.metadataSource.featureType,
            featureNS: this.metadataSource.featureNS,
            listeners: {
                "metadatasaved": function(cmp, id) {
                    this.metadataId = id;
                    this.store.addListener('beforewrite', function(store, action, rs, options) {
                        options.params.handle = id;
                    } , this);
                    // TODO there must be some better way to determine if we are deleting or updating
                    if (this.postDeleteButton.isVisible() === true) {
                        this.deleteFeature();
                    } else {
                        this.stopEditing(true);
                    }
                },
                "metadataopened": function(cmp, id) {
                    this.metadataId = id;
                    this.store.addListener('beforewrite', function(store, action, rs, options) {
                        options.params.handle = id;
                    } , this);
                },
                scope: this
            }
        });
        
        this.items = [
            this.attributeForm,
            this.metadataForm
        ];

        this.bbar = new Ext.Toolbar({
            items: [
                this.deleteButton,
                "->",
                this.previousButton,
                this.cancelButton,
                this.nextButton,
                this.saveButton,
                this.postDeleteButton
            ]
        });
        
        NHDEdit.FeatureEditWizard.superclass.initComponent.call(this);
        
        this.store.on({
            "exception": function(proxy, type, action, options, response, records) {
                this.attributeForm.hide();
                this.metadataForm.hide();
                this.previousButton.hide();
                this.nextButton.hide();
                if (this.exceptionPanel !== null) {
                    this.remove(this.exceptionPanel);
                }
                this.exceptionPanel = new NHDEdit.ExceptionPanel({
                    padding: 5,
                    border: false,
                    store: this.store,
                    exceptionReport: response.exceptionReport
                });
                this.add(this.exceptionPanel);
                this.doLayout();
            },
            "write": function() {
                this.suspendEvents();
                this.close();
            },
            scope: this
        });
        
        this.on({
            "show": function() {
                this.startEditing();
            },
            "beforeclose": function() {
                this.updateFeature();
                if(this.feature.state === this.getDirtyState()) {
                    Ext.Msg.show({
                        title: this.closeMsgTitle,
                        msg: this.closeMsg,
                        buttons: Ext.Msg.YESNO,
                        fn: function(button) {
                            if(button && button === "yes") {
                                // don't fire another beforeclose event
                                this.suspendEvents();
                                this.modifyControl.unselectFeature(this.feature);
                                this.store.removeAll();
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
        
    /** private: method[getDirtyState]
     *  Get the appropriate OpenLayers.State value to indicate a dirty feature.
     *  We don't cache this value because the popup may remain open through
     *  several state changes.
     */
    getDirtyState: function() {
        return this.feature.state === OpenLayers.State.INSERT ?
            this.feature.state : OpenLayers.State.UPDATE;
    },
    
    /** private: method[startEditing]
     */
    startEditing: function() {
        this.geometry = this.feature.geometry.clone();
        this.attributes = Ext.apply({}, this.feature.attributes);

        this.modifyControl = new OpenLayers.Control.ModifyFeature(
            this.feature.layer,
            {standalone: true, vertexRenderIntent: this.vertexRenderIntent}
        );
        this.feature.layer.map.addControl(this.modifyControl);
        this.modifyControl.activate();
        this.modifyControl.selectFeature(this.feature);
    },
    
    updateFeature: function() {
        var feature = this.feature;
        var fields = this.attributeForm.getForm().items;
        var modified = false;
        fields.each(function(f) {
            if (f.isDirty()) {
                modified = true;
                feature.attributes[f.getName()] = f.getValue();
            }
        });
        if (modified) {
            this.setFeatureState(this.getDirtyState());
        }
    },
    
    /** private: method[stopEditing]
     *  :arg save: ``Boolean`` If set to true, changes will be saved and the
     *      ``featuremodified`` event will be fired.
     */
    stopEditing: function(save) {
        if (save) {
            this.updateFeature();
        }
        
        //TODO remove the line below when
        // http://trac.openlayers.org/ticket/2210 is fixed.
        this.modifyControl.deactivate();
        this.modifyControl.destroy();
        
        var feature = this.feature;
        if (feature.state === this.getDirtyState()) {
            if (save === true) {
                //TODO When http://trac.osgeo.org/openlayers/ticket/3131
                // is resolved, remove the if clause below
                if (this.schema) {
                    var attribute, rec;
                    for (var i in feature.attributes) {
                        rec = this.schema.getAt(this.schema.findExact("name", i));
                        attribute = feature.attributes[i];
                        if (attribute instanceof Date) {
                            var type = rec.get("type").split(":").pop();
                            feature.attributes[i] = attribute.format(
                                type == "date" ? "Y-m-d" : "c"
                            );
                        }
                    }
                }
                this.fireEvent("featuremodified", this, feature);
            } else if(feature.state === OpenLayers.State.INSERT) {
                this.editing = false;
                feature.layer.destroyFeatures([feature]);
                this.fireEvent("canceledit", this, null);
                this.close();
            } else {
                var layer = feature.layer;
                layer.drawFeature(feature, {display: "none"});
                feature.geometry = this.geometry;
                feature.attributes = this.attributes;
                this.setFeatureState(null);
                layer.drawFeature(feature);
                this.fireEvent("canceledit", this, feature);
            }
        }
    },
    
    preDeleteFeature: function() {
        this.attributeForm.hide();
        this.metadataForm.deleteLabel.show();
        this.metadataForm.show();
        this.nextButton.hide();
        this.saveButton.hide();
        this.deleteButton.hide();
        this.previousButton.hide();
        this.postDeleteButton.show();
    },

    deleteFeature: function() {
        if (this.metadataId === null) {
            this.metadataForm.saveEntry();
        } else {
            this.setFeatureState(OpenLayers.State.DELETE);
            this.fireEvent("featuremodified", this, this.feature);
            this.close();
        }
    },
    
    /** private: method[setFeatureState]
     *  Set the state of this popup's feature and trigger a featuremodified
     *  event on the feature's layer.
     */
    setFeatureState: function(state) {
        this.feature.state = state;
        var layer = this.feature.layer;
        if (layer) {
            layer.events.triggerEvent("featuremodified", {
                feature: this.feature
            });
        }
    }

});

/** api: xtype = app_featureeditwizard */
Ext.reg('app_featureeditwizard', NHDEdit.FeatureEditWizard);
