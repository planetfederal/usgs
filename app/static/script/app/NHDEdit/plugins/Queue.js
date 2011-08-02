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
 *  class = Queue
 *  extends = gxp.plugins.Tool
 */

/** api: constructor
 *  .. class:: Queue(config)
 *
 *    Show the exceptions queue.
 */
NHDEdit.plugins.Queue = Ext.extend(gxp.plugins.Tool, {

    /** api: ptype = app_queue */
    ptype: "app_queue",

    /** i18n */
    tooltip: "Show the exception queue",
    buttonText: "Exceptions",

    url: null,

    featurePrefix: null,

    featureType: null,

    schema: null,

    featureStore: null,

    /** private: method[init]
     */
    init: function(target) {
        NHDEdit.plugins.Queue.superclass.init.apply(this, arguments);
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
        // TODO: decide if we should filter by the current metadata record or not
    },

    /** api: method[addOutput]
     */
    addOutput: function() {
        this.featureStore.load();
        var me = this;
        this.grid = new gxp.grid.FeatureGrid({
            store: this.featureStore,
            getColumns: function(store) {
                var columns = gxp.grid.FeatureGrid.prototype.getColumns.apply(this, arguments);
                columns.unshift({xtype: 'actioncolumn', width: 30, items: [{
                    tooltip: "Zoom to the feature associated with this exception",
                    iconCls: 'gxp-icon-zoomtofeature',
                    handler: function(grid, rowIndex, colIndex) {
                        var record = store.getAt(rowIndex);
                        var feature = record.get("feature");
                        var featureType = feature.attributes.featuretype;
                        var featureNS = feature.attributes.namespace;
                        var tpl = new Ext.Template("service=WFS&version=1.1.0&request=GetFeature&typename={featuretype}&featureNS={namespace}&featureid={featureid}");
                        var url = OpenLayers.Util.urlAppend(this.url, tpl.applyTemplate(feature.attributes));
                        OpenLayers.Request.GET({
                            url: url,
                            success: function(response) {
                                var map = this.target.mapPanel.map;
                                var format = new OpenLayers.Format.GML.v3({featureType: featureType, featureNS: featureNS});
                                var features = format.read(response.responseXML || response.responseText);
                                map.zoomToExtent(features[0].geometry.getBounds());
                            }, 
                            scope: this
                        });
                    },
                    scope: me}]
                });
                return columns;
            },
            schema: this.schema,
            loadMask: true,
            viewConfig: {forceFit: true},
            height: 300
        });
        return NHDEdit.plugins.Preferences.superclass.addOutput.call(this, {
            xtype: 'container', 
            layout: 'fit', 
            items: [this.grid]
        });
    },

    /** api: method[addActions]
     */
    addActions: function() {
        return NHDEdit.plugins.Queue.superclass.addActions.call(this, [
            {
                text: this.buttonText,
                handler: this.addOutput,
                iconCls: "gxp-icon-queue",
                tooltip: this.tooltip,
                scope: this
            }
        ]);
    }

});

Ext.preg(NHDEdit.plugins.Queue.prototype.ptype, NHDEdit.plugins.Queue);
