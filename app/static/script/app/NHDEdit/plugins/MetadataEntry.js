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
 *  class = MetadataEntry
 *  extends = gxp.plugins.Tool
 */

/** api: constructor
 *  .. class:: MetadataEntry(config)
 *
 *    Entry form for adding a new metadata record.
 */
NHDEdit.plugins.MetadataEntry = Ext.extend(gxp.plugins.Tool, {

    /** api: ptype = app_metadataentry */
    ptype: "app_metadataentry",

    /** api: method[addOutput]
     */
    addOutput: function() {
        return NHDEdit.plugins.MetadataEntry.superclass.addOutput.call(this, {xtype: 'form', title: 'Metadata entry'});
    },

    /** api: method[addActions]
     */
    addActions: function() {
        return NHDEdit.plugins.MetadataEntry.superclass.addActions.call(this, [
            {
                handler: this.addOutput,
                scope: this,
                text: "Add metadata"
            }
        ]);
    }

});

Ext.preg(NHDEdit.plugins.MetadataEntry.prototype.ptype, NHDEdit.plugins.MetadataEntry);
