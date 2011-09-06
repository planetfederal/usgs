/**
 * Copyright (c) 2008-2011 The Open Planning Project
 * 
 * Published under the GPL license.
 * See https://github.com/opengeo/gxp/raw/master/license.txt for the full text
 * of the license.
 */

/**
 * @requires Editor.js
 * @requires Editor/templates.js
 */
Ext.ns("Editor.plugins");

/** api: (define)
 *  module = Editor.plugins
 *  class = Queue
 *  extends = gxp.plugins.Tool
 */

/** api: constructor
 *  .. class:: Queue(config)
 *
 *  Show the exceptions queue. This is a dialog with the rows of the server-side
 *  managed exceptions queue in a grid, along with a button to zoom to the feature
 *  which is the subject of the exception message.
 */
Editor.plugins.Queue = Ext.extend(gxp.plugins.Tool, {

    /** api: ptype = app_queue */
    ptype: "app_queue",

    /** i18n */
    tooltip: "Show the exception queue",
    buttonText: "Exceptions",
    exceptionFieldTitle: "Exception Message",
    zoomToFeatureTooltip: "Zoom to the feature associated with this exception",
    /** end i18n */

    /** api: config[url]
     *  ``String`` 
     *  The online resource of the Web Feature Service to retrieve the exception 
     *  queue feature type from.
     */
    url: null,

    /** api: config[featurePrefix]
     *  ``String``
     *  The prefix to use to get a fully qualified typename.
     */
    featurePrefix: null,

    /** api: config[featureType]
     *  ``String``
     *  The unqualified typename associated with the exception queue
     */
    featureType: null,

    /** private: property[schema]
     *  ``GeoExt.data.AttributeStore``
     *  The attribute store for the exception queue feature type.
     */
    schema: null,

    /** private: property[featureStore]
     *  ``gxp.data.WFSFeatureStore``
     *  The feature store containing the records of the exception queue.
     */
    featureStore: null,
    
    /** api: config[nhdFeatureManager]
     *  ``String`` id of the feature manager used for editing nhd feature types.
     */
    nhdFeatureManager: null,

    /** private: method[init]
     *
     *  :arg target: ``gxp.Viewer`` The viewer initializing this plugin.
     */
    init: function(target) {
        Editor.plugins.Queue.superclass.init.apply(this, arguments);
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
                "load": this.onSchemaLoad,
                scope: this
            }
        });
    },

    /** private: method[destroy]
     *  Clean up.
     */
    destroy: function() {
        if (this.schema) {
            this.schema.removeListener("load", this.onSchemaLoad, this);
        }
        this.schema = null;
        this.featureStore = null;
        Editor.plugins.Queue.superclass.destroy.apply(this, arguments);
    },

    /** private: method[onSchemaLoad]
     *  Listener for when the attribute store is ready. Create the featureStore.
     *  Currently we show the full queue, not filtered by the current metadata
     *  record.
     */
    onSchemaLoad: function() {
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

    /** api: method[addOutput]
     *  When someone pressed the Queue button, this function will be called.
     *  So load the featureStore and show it in a grid.
     */
    addOutput: function() {
        this.featureStore.load();
        this.target.on({
            featureedit: function() {
                this.featureStore.reload();
            },
            scope: this
        });
        var me = this;
        var output = Editor.plugins.Queue.superclass.addOutput.call(this, {
            xtype: "gxp_featuregrid",
            cls: "app-exceptionqueue",
            store: this.featureStore,
            includeFields: ["exceptionmessage"],
            propertyNames: {exceptionmessage: this.exceptionFieldTitle},
            customRenderers: {
                exceptionmessage: function(output) {
                    var data = Ext.decode(output);
                    var tpl = Editor.exceptionTemplates[data.process];
                    if (tpl) {
                        output = tpl.applyTemplate(data);
                    }
                    return output;
                }
            },
            getColumns: function(store) {
                var columns = gxp.grid.FeatureGrid.prototype.getColumns.apply(this, arguments);
                columns.unshift({xtype: 'actioncolumn', width: 30, items: [{
                    tooltip: this.zoomToFeatureTooltip,
                    iconCls: 'gxp-icon-zoomtofeature',
                    handler: function(grid, rowIndex, colIndex) {
                        var record = store.getAt(rowIndex);
                        var layer = this.target.getLayerRecordFromMap({
                            source: "local", name: "usgs:" + record.get("featuretype")
                        });
                        if (layer) {
                            var featureManager = this.target.tools[this.nhdFeatureManager];
                            featureManager.showLayer(this.id);
                            this.target.selectLayer();
                            featureManager.on("layerchange", function() {
                                featureManager.loadFeatures(new OpenLayers.Filter.FeatureId({
                                    fids: [record.get("featureid")]
                                }), function() {
                                    this.target.mapPanel.map.zoomToExtent(featureManager.featureLayer.getDataExtent());
                                }, this);
                            }, this, {single: true});
                            featureManager.setLayer(layer);
                            this.target.selectLayer(layer);
                        }
                    },
                    scope: me}]
                });
                return columns;
            },
            schema: this.schema,
            loadMask: true,
            autoExpandColumn: 1,
            height: 200,
            autoHeight: false,
            border: false
        });
        this.grid = output;
        this.grid.ownerCt.ownerCt.addListener("beforehide", function() {
            var featureManager = this.target.tools[this.nhdFeatureManager];
            featureManager.clearFeatures();
        }, this);
        return output;
    },

    /** api: method[addActions]
     *  Which actions should we show in the UI?
     */
    addActions: function() {
        return Editor.plugins.Queue.superclass.addActions.call(this, [{
            text: this.buttonText,
            handler: this.addOutput,
            iconCls: "gxp-icon-queue",
            tooltip: this.tooltip,
            scope: this
        }]);
    }

});

Ext.preg(Editor.plugins.Queue.prototype.ptype, Editor.plugins.Queue);
