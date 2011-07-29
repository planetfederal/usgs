<StyledLayerDescriptor xmlns="http://www.opengis.net/sld" xmlns:ogc="http://www.opengis.net/ogc" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
  xsi:schemaLocation="http://www.opengis.net/sld http://schemas.opengis.net/sld/1.0.0/StyledLayerDescriptor.xsd"
  version="1.0.0">
  <NamedLayer>
    <Name>NHDWaterbody</Name>
    <UserStyle>
      <Name>NHDWaterbody_style</Name>
      <FeatureTypeStyle>
        <Rule>
          <Name>Estuary</Name>
          <Title>Estuary</Title><ogc:Filter><ogc:PropertyIsEqualTo><ogc:PropertyName>FType</ogc:PropertyName> <ogc:Literal><![CDATA[493]]></ogc:Literal> </ogc:PropertyIsEqualTo></ogc:Filter><PolygonSymbolizer><Fill><CssParameter
                name="fill">#DE9E66</CssParameter></Fill><Stroke><CssParameter
                name="stroke">#000000</CssParameter><CssParameter
                name="stroke-width">0.4</CssParameter></Stroke></PolygonSymbolizer></Rule>
        <Rule>
          <Name>Ice Mass</Name>
          <Title>Ice Mass</Title><ogc:Filter><ogc:PropertyIsEqualTo><ogc:PropertyName>FType</ogc:PropertyName> <ogc:Literal><![CDATA[378]]></ogc:Literal> </ogc:PropertyIsEqualTo></ogc:Filter><PolygonSymbolizer><Fill><CssParameter
                name="fill">#17A8E8</CssParameter></Fill><Stroke><CssParameter
                name="stroke">#17A8E8</CssParameter><CssParameter
                name="stroke-width">0.4</CssParameter></Stroke></PolygonSymbolizer></Rule>
        <Rule>
          <Name>LakePond</Name>
          <Title>LakePond</Title><ogc:Filter><ogc:PropertyIsEqualTo><ogc:PropertyName>FType</ogc:PropertyName> <ogc:Literal><![CDATA[390]]></ogc:Literal> </ogc:PropertyIsEqualTo></ogc:Filter><PolygonSymbolizer><Fill><CssParameter
                name="fill">#0070FF</CssParameter></Fill><Stroke><CssParameter
                name="stroke">#004DA8</CssParameter><CssParameter
                name="stroke-width">0.4</CssParameter></Stroke></PolygonSymbolizer></Rule>
        <Rule>
          <Name>Playa</Name>
          <Title>Playa</Title><ogc:Filter><ogc:PropertyIsEqualTo><ogc:PropertyName>FType</ogc:PropertyName> <ogc:Literal><![CDATA[361]]></ogc:Literal> </ogc:PropertyIsEqualTo></ogc:Filter><PolygonSymbolizer><Fill><CssParameter
                name="fill">#6DBB43</CssParameter></Fill><Stroke><CssParameter
                name="stroke">#6DBB43</CssParameter><CssParameter
                name="stroke-width">0.4</CssParameter></Stroke></PolygonSymbolizer></Rule>
        <Rule>
          <Name>Reservoir</Name>
          <Title>Reservoir</Title><ogc:Filter><ogc:PropertyIsEqualTo><ogc:PropertyName>FType</ogc:PropertyName> <ogc:Literal><![CDATA[436]]></ogc:Literal> </ogc:PropertyIsEqualTo></ogc:Filter><PolygonSymbolizer><Fill><GraphicFill><Graphic><Mark><WellKnownName>shape://slash</WellKnownName><Fill><CssParameter
                        name="fill">#97DBF2</CssParameter></Fill><Stroke><CssParameter
                        name="stroke">#97DBF2</CssParameter><CssParameter
                        name="stroke-width">1.6</CssParameter></Stroke></Mark><Opacity>1</Opacity><Size>10</Size></Graphic></GraphicFill></Fill></PolygonSymbolizer><PolygonSymbolizer><Fill><GraphicFill><Graphic><Mark><WellKnownName>shape://slash</WellKnownName><Fill><CssParameter
                        name="fill">#4065EB</CssParameter></Fill><Stroke><CssParameter
                        name="stroke">#4065EB</CssParameter><CssParameter
                        name="stroke-width">0.4</CssParameter></Stroke></Mark><Opacity>1</Opacity><Size>10</Size></Graphic></GraphicFill><CssParameter
                name="fill">#4065EB</CssParameter></Fill><Stroke><CssParameter
                name="stroke">#4065EB</CssParameter><CssParameter
                name="stroke-width">0.4</CssParameter></Stroke></PolygonSymbolizer><PolygonSymbolizer><Fill><GraphicFill><Graphic><Mark><WellKnownName>shape://slash</WellKnownName><Fill><CssParameter
                        name="fill">#4065EB</CssParameter></Fill><Stroke><CssParameter
                        name="stroke">#4065EB</CssParameter><CssParameter
                        name="stroke-width">0.4</CssParameter></Stroke></Mark><Opacity>1</Opacity><Size>10</Size></Graphic></GraphicFill><CssParameter
                name="fill">#4065EB</CssParameter></Fill><Stroke><CssParameter
                name="stroke">#4065EB</CssParameter><CssParameter
                name="stroke-width">0.4</CssParameter></Stroke></PolygonSymbolizer></Rule>
        <Rule>
          <Name>SwampMarsh</Name>
          <Title>SwampMarsh</Title><ogc:Filter><ogc:PropertyIsEqualTo><ogc:PropertyName>FType</ogc:PropertyName> <ogc:Literal><![CDATA[466]]></ogc:Literal> </ogc:PropertyIsEqualTo></ogc:Filter><PolygonSymbolizer><Fill><CssParameter
                name="fill">#004C73</CssParameter></Fill></PolygonSymbolizer></Rule>
        <Rule>
          <Name>&lt;all other values&gt;</Name>
          <Title>&lt;all other values&gt;</Title>
          <ElseFilter />
          <PolygonSymbolizer>
            <Fill>
              <CssParameter
                name="fill">#73B273</CssParameter>
            </Fill>
          </PolygonSymbolizer>
        </Rule>
      </FeatureTypeStyle>
    </UserStyle>
  </NamedLayer>
</StyledLayerDescriptor>