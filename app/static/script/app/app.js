// this is where your application code goes

var app;
Ext.onReady(function() {
    app = new gxp.Viewer({
        portalConfig: {
            layout: "border",
            region: "center",
            
            // by configuring items here, we don't need to configure portalItems
            // and save a wrapping container
            items: [{
                id: "centerpanel",
                xtype: "panel",
                layout: "fit",
                region: "center",
                border: false,
                items: ["mymap"]
            }, {
                id: "westpanel",
                xtype: "container",
                layout: "fit",
                region: "west",
                width: 200
            }],
            bbar: {id: "mybbar"}
        },
        
        // configuration of all tool plugins for this application
        tools: [{
            ptype: "gxp_layertree",
            outputConfig: {
                id: "tree",
                border: true,
                tbar: [] // we will add buttons to "tree.bbar" later
            },
            outputTarget: "westpanel"
        }, {
            ptype: "gxp_featuremanager",
            id: "nhd-manager",
            listeners: {
                "beforesave": function(tool, store, params) {
                    params.nativeElements = [{vendorId: 'ORACLE', safeToIgnore: false, value: 'xxxxxx'}];
                }
            },
            paging: false,
            autoSetLayer: true,
            maxFeatures: 1
        }, {
            ptype: "gxp_addlayers",
            actionTarget: "tree.tbar"
        }, {
            ptype: "gxp_removelayer",
            actionTarget: ["tree.tbar", "tree.contextMenu"]
        }, {
            ptype: "gxp_zoomtoextent",
            actionTarget: "map.tbar"
        }, {
            ptype: "gxp_zoom",
            actionTarget: "map.tbar"
        }, {
            ptype: "gxp_navigationhistory",
            actionTarget: "map.tbar"
        }, {
            ptype: "gxp_featureeditor",
            featureManager: "nhd-manager",
            autoLoadFeatures: true,
            toggleGroup: "main",
            actionTarget: "map.tbar",
            modifyOnly: true,
            tolerance: 6
        }, {
           ptype: "app_metadataentry",
           featureType: "nhdmetadata",
           featureNS: "http://www.usgs.gov/",
           url: "/geoserver/wfs?",
           actionTarget: "map.tbar",
            outputConfig: {
                title: "Metadata entry",
                width: 400, 
                defaults: { 
                    autoScroll: true
                },
                height: 200
            }
        }],
        
        // layer sources
        sources: {
            local: {
                ptype: "gxp_wmscsource",
                url: "/geoserver/wms",
                version: "1.1.1"
            },
            osm: {
                ptype: "gxp_osmsource"
            }
        },
        
        // map and layers
        map: {
            id: "mymap", // id needed to reference map in portalConfig above
            title: "Map",
            projection: "EPSG:900913",
            units: "m",
            maxResolution: 156543.0339,
            maxExtent: [-20037508, -20037508, 20037508, 20037508],
            center: [-11746265.687635, 4694206.416048],
            zoom: 6,
            layers: [{
                source: "osm",
                name: "mapnik",
                group: "background"
            }, {
                source: "local",
                name: "usgs:nhdwaterbody"
            }, {
                source: "local",
                name: "usgs:nhdarea"
            }, {
                source: "local",
                name: "usgs:nhdline"
            }, {
                source: "local",
                name: "usgs:nhdflowline"
            }, {
                source: "local",
                name: "usgs:nhdpoint"
            }],
            items: [{
                xtype: "gx_zoomslider",
                vertical: true,
                height: 100
            }]
        }

    });
});
