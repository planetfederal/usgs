/**
 * Copyright (c) 2008-2011 The Open Planning Project
 * 
 * Published under the BSD license.
 * See https://github.com/opengeo/gxp/raw/master/license.txt for the full text
 * of the license.
 */

Ext.ns("NHDEdit.plugins");

/**
 * @include NHDEdit/widgets/MetadataForm.js
 */

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
        this.form = new NHDEdit.MetadataForm({
            labelWidth: 200,
            url: this.url,
            featureType: this.featureType,
            featureNS: this.featureNS, 
            autoHeight: true
/*            fbar: [
                {
                    text: "Open",
                    iconCls: "gxp-icon-open",
                    disabled: true,
                    id: "app-open-button",
                    handler: this.openEntry,
                    scope: this
                }, {
                    text: "Save", 
                    iconCls: "gxp-icon-save", 
                    handler: this.saveEntry, 
                    scope: this
                }
            ],*/
        });
        return NHDEdit.plugins.MetadataEntry.superclass.addOutput.call(this, this.form);
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
