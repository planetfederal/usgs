/**
 * Copyright (c) 2008-2011 The Open Planning Project
 * 
 * Published under the BSD license.
 * See https://github.com/opengeo/gxp/raw/master/license.txt for the full text
 * of the license.
 */

Ext.ns("NHDEdit");

/**
 * @include NHDEdit/data/NHDFCode.js
 */

/** api: (define)
 *  module = NHDEdit
 *  class = AttributeForm
 *  extends = Ext.form.FormPanel
 */

/** api: constructor
 *  .. class:: AttributeForm(config)
 *
 *    Entry form for feature types of NDD. Has special handling for adding
 *    lookup values for FType and FCode attributes.
 */
NHDEdit.AttributeForm = Ext.extend(Ext.form.FormPanel, {

    feature: null,

    schema: null,

    autoScroll: true,
    
    excludeFields: null,
    
    fTypes: {
        "nhdflowline": [558, 460, 336, 334, 420, 428],
        "nhdarea": [403, 455, 336, 364, 484, 362, 343, 431, 460, 461],
        "nhdline": [478, 318, 487, 483, 362, 343, 411, 369],
        "nhdpoint": [436, 458, 485, 487, 488, 367, 450, 369],
        "nhdwaterbody": [390, 436, 466, 378, 361]
    },
    
    fTypeDict: {
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
    },
    
    fCodeDict: {
        '30700':'Area to be Submerged',
        '31200':'Bay/Inlet',
        '31800':'Bridge',
        '33400':'Connector',
        '33600':'Canal/Ditch',
        '33601':'Canal/Ditch: Canal/Ditch Type = Aqueduct',
        '33603':'Canal Ditch: Canal Ditch Type = Stormwater',
        '34300':'Dam/Weir',
        '34305':'Dam/Weir: Construction Material = Earthen',
        '34306':'Dam/Weir: Construction Material = Nonearthen',
        '36100':'Playa',
        '36200':'Flume',
        '36400':'Foreshore',
        '36700':'Gaging Station',
        '36900':'Gate',
        '37300':'Hazard Zone',
        '37800':'Ice Mass',
        '39000':'Lake/Pond',
        '39001':'Lake/Pond: Hydrographic Category = Intermittent',
        '39004':'Lake/Pond: Hydrographic Category = Perennial',
        '39005':'Lake/Pond: Hydrographic Category = Intermittent; Stage = High Water Elevation',
        '39006':'Lake/Pond: Hydrographic Category = Intermittent; Stage = Date of Photography',
        '39009':'Lake/Pond: Hydrographic Category = Perennial; Stage = Average Water Elevation',
        '39010':'Lake/Pond: Hydrographic Category = Perennial; Stage = Normal Pool',
        '39011':'Lake/Pond: Hydrographic Category = Perennial; Stage = Date of Photography',
        '39012':'Lake/Pond: Hydrographic Category = Perennial; Stage = Spillway Elevation',
        '39800':'Lock Chamber',
        '40300':'Inundation Area',
        '40307':'Inundation Area: Inundation Control Status = Not Controlled',
        '40308':'Inundation Area: Inundation Control Status = Controlled',
        '40309':'Inundation Area: Inundation Control Status = Controlled; Stage = Flood Elevation',
        '41100':'Nonearthen Shore',
        '42000':'Underground Conduit',
        '42001':'Underground Conduit: Positional Accuracy = Definite',
        '42002':'Underground Conduit: Positional Accuracy = Indefinite',
        '42003':'Underground Conduit: Positional Accuracy = Approximate',
        '42800':'Pipeline',
        '42801':'Pipeline: Pipeline Type = Aqueduct; Relationship to Surface = At or Near',
        '42802':'Pipeline: Pipeline Type = Aqueduct; Relationship to Surface = Elevated',
        '42803':'Pipeline: Pipeline Type = Aqueduct; Relationship to Surface = Underground',
        '42804':'Pipeline: Pipeline Type = Aqueduct; Relationship to Surface = Underwater',
        '42805':'Pipeline: Pipeline Type = General Case; Relationship to Surface = At or Near',
        '42806':'Pipeline: Pipeline Type = General Case; Relationship to Surface = Elevated',
        '42807':'Pipeline: Pipeline Type = General Case; Relationship to Surface = Underground',
        '42808':'Pipeline: Pipeline Type = General Case; Relationship to Surface = Underwater',
        '42809':'Pipeline: Pipeline Type = Penstock; Relationship to Surface = At or Near',
        '42810':'Pipeline: Pipeline Type = Penstock; Relationship to Surface = Elevated',
        '42811':'Pipeline: Pipeline Type = Penstock; Relationship to Surface = Underground',
        '42812':'Pipeline: Pipeline Type = Penstock; Relationship to Surface = Underwater',
        '42813':'Pipeline: Pipeline Type = Siphon',
        '42814':'Pipeline: Pipeline Type = General Case',
        '42815':'Pipeline: Pipeline Type = Penstock',
        '42816':'Pipeline: Pipeline Type = Aqueduct',
        '42820':'Pipeline: Pipeline Type = Stormwater',
        '42821':'Pipeline: Pipeline Type = Stormwater; Relationship to Surface = At or Near',
        '42822':'Pipeline: Pipeline Type = Stormwater; Relationship to Surface = Elevated',
        '42823':'Pipeline: Pipeline Type = Stormwater; Relationship to Surface = Underground',
        '42824':'Pipeline: Pipeline Type = Stormwater; Relationship to Surface = Underwater',
        '43100':'Rapids',
        '43400':'Reef',
        '43600':'Reservoir',
        '43601':'Reservoir: Reservoir Type = Aquaculture',
        '43603':'Reservoir: Reservoir Type = Decorative Pool',
        '43604':'Reservoir: Reservoir Type = Tailings Pond; Construction Material = Earthen',
        '43605':'Reservoir: Reservoir Type = Tailings Pond',
        '43606':'Reservoir: Reservoir Type = Disposal',
        '43607':'Reservoir: Reservoir Type = Evaporator',
        '43608':'Reservoir: Reservoir Type = Swimming Pool',
        '43609':'Reservoir: Reservoir Type = Cooling Pond',
        '43610':'Reservoir: Reservoir Type = Filtration Pond',
        '43611':'Reservoir: Reservoir Type = Settling Pond',
        '43612':'Reservoir: Reservoir Type = Sewage Treatment Pond',
        '43613':'Reservoir: Reservoir Type = Water Storage; Construction Material = Nonearthen',
        '43614':'Reservoir: Reservoir Type = Water Storage; Construction Material = Earthen; Hydrographic Category = Intermittent',
        '43615':'Reservoir: Reservoir Type = Water Storage; Construction Material = Earthen; Hydrographic Category = Perennial',
        '43617':'Reservoir: Reservoir Type = Water Storage',
        '43618':'Reservoir: Construction Material = Earthen',
        '43619':'Reservoir: Construction Material = Nonearthen',
        '43621':'Reservoir: Reservoir Type = Water Storage; Hydrographic Category = Perennial',
        '43623':'Reservoir: Reservoir Type = Evaporator; Construction Material = Earthen',
        '43624':'Reservoir: Reservoir Type = Treatment',
        '43625':'Reservoir: Reservoir Type = Disposal; Construction Material = Earthen',
        '43626':'Reservoir: Reservoir Type = Disposal; Construction Material = Nonearthen',
        '44100':'Rock',
        '44101':'Rock: Relationship to Surface = Abovewater',
        '44102':'Rock: Relationship to Surface = Underwater',
        '44500':'Sea/Ocean',
        '45000':'Sink/Rise',
        '45400':'Special Use Zone',
        '45401':'Special Use Zone: Special Use Zone Type = Dump Site; Operational Status = Operational',
        '45402':'Special Use Zone: Special Use Zone Type = Dump Site; Operational Status = Abandoned',
        '45403':'Special Use Zone: Special Use Zone Type = Spoil Area; Operational Status = Operational',
        '45404':'Special Use Zone: Special Use Zone Type = Spoil Area; Operational Status = Abandoned',
        '45500':'Spillway',
        '45800':'Spring/Seep',
        '46000':'Stream/River',
        '46003':'Stream/River: Hydrographic Category = Intermittent',
        '46006':'Stream/River: Hydrographic Category = Perennial',
        '46007':'Stream/River: Hydrographic Category = Ephemeral',
        '46100':'Submerged Stream',
        '46600':'Swamp/Marsh',
        '46601':'Swamp/Marsh: Hydrographic Category = Intermittent',
        '46602':'Swamp/Marsh: Hydrographic Category = Perennial',
        '47800':'Tunnel',
        '48300':'Wall',
        '48400':'Wash',
        '48500':'Water Intake/Outflow',
        '48700':'Waterfall',
        '48800':'Well',
        '49300':'Estuary',
        '50300':'Sounding Datum Line',
        '50301':'Sounding Datum Line: Positional Accuracy = Approximate',
        '50302':'Sounding Datum Line: Positional Accuracy = Definite',
        '53300':'Special Use Zone Limit',
        '53301':'Special Use Zone Limit: Positional Accuracy = Definite',
        '53302':'Special Use Zone Limit: Positional Accuracy = Indefinite',
        '53700':'Area of Complex Channels',
        '55800':'Artificial Path',
        '56600':'Coastline',
        '56700':'Shoreline',
        '56800':'Levee'
    },

    initComponent : function() {
        NHDEdit.AttributeForm.superclass.initComponent.call(this);
        var store = new Ext.data.ArrayStore({
            fields: ['value', 'description'],
            data : NHDEdit.fCodes
        });
        this.schema.each(function(r) {
            var name = r.get("name");
            if (this.excludeFields.indexOf(name) != -1) {
                return;
            }
            var type = r.get("type");
            if (type.match(/^[^:]*:?((Multi)?(Point|Line|Polygon|Curve|Surface|Geometry))/)) {
                // exclude gml geometries
                return;
            }
            var fieldCfg;
            if (name.toLowerCase() === "fcode") {
                fieldCfg = {
                    xtype: "combo",
                    listWidth: 650,
                    mode: "local",
                    name: name,
                    fieldLabel: name,
                    store: store, 
                    triggerAction: 'all',
                    displayField: 'description',
                    valueField: 'value'
                };
            } else {
                fieldCfg = GeoExt.form.recordToField(r);
            }
            var value = this.feature.attributes[name];
            fieldCfg.value = value;
            this.add(fieldCfg);
        }, this);
    }

});

Ext.reg('app_attributeform', NHDEdit.AttributeForm);
