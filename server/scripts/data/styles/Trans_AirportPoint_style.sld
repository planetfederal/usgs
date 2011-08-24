<StyledLayerDescriptor xmlns="http://www.opengis.net/sld" xmlns:ogc="http://www.opengis.net/ogc" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
  xsi:schemaLocation="http://www.opengis.net/sld http://schemas.opengis.net/sld/1.0.0/StyledLayerDescriptor.xsd"
  version="1.0.0">
  <NamedLayer>
    <Name>Trans_AirportPoint</Name>
    <UserStyle>
      <Name>Trans_AirportPoint_style</Name>
      <FeatureTypeStyle>
        <Rule>
          <Name>Airports</Name>
          <Title>Airports</Title><ogc:Filter><ogc:PropertyIsEqualTo><ogc:PropertyName>FCode</ogc:PropertyName> <ogc:Literal><![CDATA[20000]]></ogc:Literal> </ogc:PropertyIsEqualTo></ogc:Filter><PointSymbolizer><Graphic><Mark><WellKnownName>ttf://ESRI Default Marker#112</WellKnownName><Fill><CssParameter
                    name="fill">#000000</CssParameter></Fill></Mark><Opacity>1</Opacity><Size>12</Size></Graphic></PointSymbolizer></Rule>
      </FeatureTypeStyle>
    </UserStyle>
  </NamedLayer>
</StyledLayerDescriptor>