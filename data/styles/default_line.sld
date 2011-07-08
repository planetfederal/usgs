<?xml version="1.0" encoding="UTF-8"?>
<sld:StyledLayerDescriptor xmlns="http://www.opengis.net/sld" xmlns:sld="http://www.opengis.net/sld" xmlns:ogc="http://www.opengis.net/ogc" xmlns:gml="http://www.opengis.net/gml" version="1.0.0">
  <sld:NamedLayer>
    <sld:Name>line</sld:Name>
    <sld:UserStyle>
      <sld:Name>line</sld:Name>
      <sld:Title>1 px black line</sld:Title>
      <sld:IsDefault>1</sld:IsDefault>
      <sld:Abstract>Default line style, 1 pixel wide black</sld:Abstract>
      <sld:FeatureTypeStyle>
        <sld:Name>name</sld:Name>
        <sld:Rule>
          <sld:Title>Blue Line</sld:Title>
          <sld:Abstract>A 1 pixel wide black line</sld:Abstract>
          <sld:LineSymbolizer>
            <sld:Stroke>
              <sld:CssParameter name="stroke">#598CD4</sld:CssParameter>
              <sld:CssParameter name="stroke-width">2</sld:CssParameter>
            </sld:Stroke>
          </sld:LineSymbolizer>
          <sld:TextSymbolizer>
            <sld:Label>
              <ogc:PropertyName>GNIS_Name</ogc:PropertyName>
            </sld:Label>
            <sld:LabelPlacement>
              <sld:PointPlacement>
                <sld:AnchorPoint>
                  <sld:AnchorPointX>
                    <ogc:Literal>0.0</ogc:Literal>
                  </sld:AnchorPointX>
                  <sld:AnchorPointY>
                    <ogc:Literal>0.5</ogc:Literal>
                  </sld:AnchorPointY>
                </sld:AnchorPoint>
                <sld:Rotation>
                  <ogc:Literal>0</ogc:Literal>
                </sld:Rotation>
              </sld:PointPlacement>
            </sld:LabelPlacement>
          </sld:TextSymbolizer>
        </sld:Rule>
      </sld:FeatureTypeStyle>
    </sld:UserStyle>
  </sld:NamedLayer>
</sld:StyledLayerDescriptor>

