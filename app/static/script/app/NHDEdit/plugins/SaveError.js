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
 *  class = SaveError
 *  extends = gxp.plugins.Tool
 */

/** api: constructor
 *  .. class:: SaveError(config)
 *
 *    Invisible plugin for writing Transaction errors to an administrative
 *    table.
 */
NHDEdit.plugins.SaveError = Ext.extend(gxp.plugins.Tool, {

    /** api: ptype = app_saveerror */
    ptype: "app_saveerror",

    featureType: null,

    featureNS: null,

    url: null,

    featureStore: null,

    featureManager: null,

    /** api: property[schema]
     *  ``GeoExt.data.AttributeStore`` 
     */
    schema: null,

    /** private: method[init]
     */
    init: function(target) {
        NHDEdit.plugins.SaveError.superclass.init.apply(this, arguments);
        var featureManager = this.target.tools[this.featureManager];
        featureManager.on('exception', this.handleException, this);
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
            autoLoad: false,
            url: this.schema.url,
            featureType: this.featureType,
            featureNS: this.featureNS
        });
    },

    getLocator: function(exceptionReport) {
        var locator;
        Ext.each(exceptionReport.exceptions, function(exc) {
            locator = exc.locator;
        });
        return locator;
    },

    handleException: function(tool, exceptionReport, msg, records) {
        var feature = new OpenLayers.Feature.Vector(null, {
            featureid: records[0].getFeature().fid,
            processid: this.getLocator(exceptionReport),
            exceptionmessage: msg 
        });
        feature.state = OpenLayers.State.INSERT;
        this.featureStore.proxy.protocol.commit([feature]);
    }

});

Ext.preg(NHDEdit.plugins.SaveError.prototype.ptype, NHDEdit.plugins.SaveError);
