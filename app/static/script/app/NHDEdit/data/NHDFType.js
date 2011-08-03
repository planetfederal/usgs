Ext.namespace("NHDEdit");
(function() {
    NHDEdit.layerFTypes = {
        "nhdflowline": ['558', '460', '336', '334', '420', '428', '566', '567'],
        "nhdarea": ['403', '455', '336', '364', '484', '362', '343', '431', '460', '461', '537', '307', '312', '318', '373', '568', '398', '445', '454', '485'],
        "nhdline": ['478', '318', '487', '483', '362', '343', '411', '369', '568', '398', '431', '434', '450', '503', '533'],
        "nhdpoint": ['436', '458', '485', '487', '488', '367', '450', '369', '398', '431', '436', '441', '458'],
        "nhdwaterbody": ['390', '436', '466', '378', '361', '493']
    };

    NHDEdit.fTypeDict = {
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
        '568':'Levee'
    };
    NHDEdit.fTypes = [];
    for (var fType in NHDEdit.fTypeDict) {
        NHDEdit.fTypes.push([fType, NHDEdit.fTypeDict[fType]]);
    }

    NHDEdit.getFTypes = function(layer) {
        var fTypes = [], fType;
        for (var i=0,ii=NHDEdit.layerFTypes[layer].length; i<ii; ++i) {
            fType = NHDEdit.layerFTypes[layer][i];
            fTypes.push([fType, NHDEdit.fTypeDict[fType]]);
        }
        return fTypes;
    };
})();
