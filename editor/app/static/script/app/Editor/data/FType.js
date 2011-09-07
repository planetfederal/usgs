/**
 * Copyright (c) 2008-2011 The Open Planning Project
 * 
 * Published under the GPL license.
 * See https://github.com/opengeo/gxp/raw/master/license.txt for the full text
 * of the license.
 */

/**
 * @requires Editor.js
 */
Ext.namespace("Editor");

/**
 * api: property[Editor.layerFTypes]
 * ``Object``
 * A code list for mapping layer types to their possible FTYPE values.
 */
Editor.layerFTypes = {
    "NHDFlowline": ['334', '336', '420', '428', '460', '558', '566', '567'],
    "NHDArea": ['307', '312', '318', '336', '343', '362', '364', '373', '398', '403', '431', '445', '454', '455', '460', '461', '484', '485', '537', '568'],
    "NHDLine": ['318', '343', '362', '369', '398', '411', '431', '434', '450', '478', '483', '487', '503', '533', '568'],
    "NHDPoint": ['367', '369', '398', '431', '436', '441', '450', '458', '485', '487', '488'],
    "NHDWaterbody": ['361', '378', '390', '436', '466', '493'],
    "Struct_Point": ['701', '790', '760', '720', '730', '740', '750', '830', '800', '710', '880', '780', '820', '810', '850', '840'],
    "Trans_AirportPoint": [200, 201],
    "Trans_RailFeature": [202]
};

/**
 * api: property[Editor.fTypeDict]
 * ``Object``
 * A code list for mapping FTYPE codes to their values/descriptions.
 */
Editor.fTypeDict = {
    '307':'Area to be Submerged',
    '312':'Bay/Inlet',
    '318':'Bridge',
    '334':'Connector',
    '336':'Canal Ditch',
    '343':'Dam/Weir',
    '361':'Playa',
    '362':'Flume',
    '364':'Foreshore',
    '367':'Gaging Station',
    '369':'Gate',
    '373':'Hazard Zone',
    '378':'Ice Mass',
    '390':'Lake/Pond',
    '398':'Lock Chamber',
    '403':'Inundation Area',
    '411':'Nonearthen Shore',
    '420':'Underground Conduit',
    '428':'Pipeline',
    '431':'Rapids',
    '434':'Reef',
    '436':'Reservoir',
    '441':'Rock',
    '445':'Sea/Ocean',
    '450':'Sink/Rise',
    '454':'Special Use Zone',
    '455':'Spillway',
    '458':'Spring/Seep',
    '460':'Stream/River',
    '461':'Submerged Stream',
    '466':'Swamp/Marsh',
    '478':'Tunnel',
    '483':'Wall',
    '484':'Wash',
    '485':'Water Intake/Outflow',
    '487':'Waterfall',
    '488':'Well',
    '493':'Estuary',
    '503':'Sounding Datum Line',
    '533':'Special Use Zone Limit',
    '537':'Area of Complex Channels',
    '558':'Artificial Path',
    '566':'Coastline',
    '567':'Shoreline',
    '568':'Levee',
    '701': 'Agriculture, Food and Livestock',
    '790': 'Building General',
    '760': 'Banking and Finance',
    '720': 'Commercial and Retail',
    '730': 'Education',
    '740': 'Emergency Response and Law Enforcement',
    '750': 'Energy',
    '830': 'Government and Military',
    '800': 'Health and Medical',
    '710': 'Industry',
    '880': 'Information and Communication',
    '780': 'Mail and Shipping',
    '820': 'Public Attractions and Landmark Buildings',
    '810': 'Transportation Facilities',
    '850': 'Water Supply and Treatment',
    '840': 'Weather'
};

/** api: method[Editor.getFTypes]
 *  Get a list of FTYPE values and their corresponding descriptions filtered 
 *  by the layer type.
 *
 *  :arg layer: ``String`` The layer to filter for, e.g. NHDFlowline
 *
 *  Returns:
 *  ``Array`` An Array containing the keys and values for FTYPE matching the
 *  layer type.
 */
Editor.getFTypes = function(layer) {
    var fTypes, fType;
    var layerFTypes = Editor.layerFTypes[layer];
    if (layerFTypes) {
        fTypes = [];
        for (var i=0,ii=layerFTypes.length; i<ii; ++i) {
            fType = layerFTypes[i];
            fTypes.push([fType, Editor.fTypeDict[fType]]);
        }
    }
    return fTypes;
};
