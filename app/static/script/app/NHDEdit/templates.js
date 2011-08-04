Ext.ns("NHDEdit");
NHDEdit.exceptionTemplates = {
    "js:MustIntersect": new Ext.XTemplate(
        ['{subjectFType:this.getFType} {subjectLayer} features must ', 
        'intersect a feature from one of the following layers: ',
        '<tpl for="objects">{layer}<tpl if="values.ftypes"> (',
        '<tpl for="ftypes">{.:this.getFType}{[xindex < xcount ? ", " : ""]}</tpl>)</tpl>',
        '{[xindex < xcount ? ", " : ""]}</tpl>.<tpl if="values.autoCorrectable">',
        ' This exception can be autocorrected.</tpl>'].join(""), 
        {
            getFType: function(value) {
                return NHDEdit.fTypeDict[value];
            }
        }
    ),
    "js:MustIntersectEndpoint": new Ext.XTemplate(
        ['{subjectFType:this.getFType} {subjectLayer} features must ', 
        'intersect an endpoint (the first or last point) of a feature ',
        'from one of the following layers: ',
        '<tpl for="objects">{layer}<tpl if="values.ftypes"> (',
        '<tpl for="ftypes">{.:this.getFType}{[xindex < xcount ? ", " : ""]}</tpl>)</tpl>',
        '{[xindex < xcount ? ", " : ""]}</tpl>.<tpl if="values.autoCorrectable">',
        ' This exception can be autocorrected.</tpl>'].join(""), 
        {
            getFType: function(value) {
                return NHDEdit.fTypeDict[value];
            }
        }
    ),
    "js:MustNotCross": new Ext.XTemplate(
        ['{subjectFType:this.getFType} {subjectLayer} features must not cross ',
        'any features from any of the following layers: ',
        '<tpl for="objects">{layer}<tpl if="values.ftypes"> (',
        '<tpl for="ftypes">{.:this.getFType}{[xindex < xcount ? ", " : ""]}</tpl>)</tpl>',
        '{[xindex < xcount ? ", " : ""]}</tpl>.<tpl if="values.autoCorrectable">',
        ' This exception can be autocorrected.</tpl>'].join(""), 
        {
            getFType: function(value) {
                return NHDEdit.fTypeDict[value];
            }
        }
    ),
    "js:MustHaveVerticalRelationship": new Ext.XTemplate(
        ['{subjectFType:this.getFType} {subjectLayer} features must have a vertical relationship. ',
        '<tpl if="values.autoCorrectable">This exception can be autocorrected.</tpl>'].join(""), 
        {
            getFType: function(value) {
                return NHDEdit.fTypeDict[value];
            }
        }
    ),
    "js:MustTouch": new Ext.XTemplate(
        ['{subjectFType:this.getFType} {subjectLayer} features must touch (intersect but not cross) ',
        'features from any of the following layers: ',
        '<tpl for="objects">{layer}<tpl if="values.ftypes"> (',
        '<tpl for="ftypes">{.:this.getFType}{[xindex < xcount ? ", " : ""]}</tpl>)</tpl>',
        '{[xindex < xcount ? ", " : ""]}</tpl>.<tpl if="values.autoCorrectable">',
        ' This exception can be autocorrected.</tpl>'].join(""), 
        {
            getFType: function(value) {
                return NHDEdit.fTypeDict[value];
            }
        }
    ),
    "js:MustTouchCanCross": new Ext.XTemplate(
        ['{subjectFType:this.getFType} {subjectLayer} features must touch at least ',
        'one feature from any of the following layers (but can cross others): ',
        '<tpl for="objects">{layer}<tpl if="values.ftypes"> (',
        '<tpl for="ftypes">{.:this.getFType}{[xindex < xcount ? ", " : ""]}</tpl>)</tpl>',
        '{[xindex < xcount ? ", " : ""]}</tpl>.<tpl if="values.autoCorrectable">',
        ' This exception can be autocorrected.</tpl>'].join(""), 
        {
            getFType: function(value) {
                return NHDEdit.fTypeDict[value];
            }
        }
    )
};
