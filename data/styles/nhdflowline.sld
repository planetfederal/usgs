<StyledLayerDescriptor xmlns="http://www.opengis.net/sld" xmlns:ogc="http://www.opengis.net/ogc" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
  xsi:schemaLocation="http://www.opengis.net/sld http://schemas.opengis.net/sld/1.0.0/StyledLayerDescriptor.xsd"
  version="1.0.0">
  <NamedLayer>
    <Name>NHDFlowline</Name>
    <UserStyle>
      <Name>NHDFlowline_style</Name>
      <FeatureTypeStyle>
        <Rule>
          <Name>ArtificialPath</Name>
          <Title>ArtificialPath</Title><ogc:Filter><ogc:PropertyIsEqualTo><ogc:PropertyName>FType</ogc:PropertyName> <ogc:Literal><![CDATA[558]]></ogc:Literal> </ogc:PropertyIsEqualTo></ogc:Filter><LineSymbolizer><Stroke><CssParameter
                name="stroke">#FF0000</CssParameter><CssParameter
                name="stroke-width">1.5</CssParameter></Stroke></LineSymbolizer><PointSymbolizer><Geometry><ogc:Function name="endPoint"><ogc:PropertyName>the_geom</ogc:PropertyName></ogc:Function></Geometry><Graphic><Mark><WellKnownName>square</WellKnownName><Fill><CssParameter
                    name="fill">#000000</CssParameter></Fill></Mark><Opacity>1</Opacity><Size>7</Size></Graphic></PointSymbolizer></Rule>
        <Rule>
          <Name>CanalDitch</Name>
          <Title>CanalDitch</Title><ogc:Filter><ogc:PropertyIsEqualTo><ogc:PropertyName>FType</ogc:PropertyName> <ogc:Literal><![CDATA[336]]></ogc:Literal> </ogc:PropertyIsEqualTo></ogc:Filter><LineSymbolizer><Stroke><CssParameter
                name="stroke">#0070FF</CssParameter><CssParameter
                name="stroke-width">2</CssParameter><CssParameter
                name="stroke-dasharray"> 4 4</CssParameter></Stroke></LineSymbolizer></Rule>
        <Rule>
          <Name>Coastline</Name>
          <Title>Coastline</Title><ogc:Filter><ogc:PropertyIsEqualTo><ogc:PropertyName>FType</ogc:PropertyName> <ogc:Literal><![CDATA[566]]></ogc:Literal> </ogc:PropertyIsEqualTo></ogc:Filter><LineSymbolizer><Stroke><CssParameter
                name="stroke">#894444</CssParameter><CssParameter
                name="stroke-width">2</CssParameter></Stroke></LineSymbolizer><PointSymbolizer><Geometry><ogc:Function name="endPoint"><ogc:PropertyName>the_geom</ogc:PropertyName></ogc:Function></Geometry><Graphic><Mark><WellKnownName>square</WellKnownName><Fill><CssParameter
                    name="fill">#000000</CssParameter></Fill></Mark><Opacity>1</Opacity><Size>7</Size></Graphic></PointSymbolizer></Rule>
        <Rule>
          <Name>Connector</Name>
          <Title>Connector</Title><ogc:Filter><ogc:PropertyIsEqualTo><ogc:PropertyName>FType</ogc:PropertyName> <ogc:Literal><![CDATA[334]]></ogc:Literal> </ogc:PropertyIsEqualTo></ogc:Filter><LineSymbolizer><Stroke><CssParameter
                name="stroke">#55FF00</CssParameter><CssParameter
                name="stroke-width">2</CssParameter></Stroke></LineSymbolizer><PointSymbolizer><Geometry><ogc:Function name="endPoint"><ogc:PropertyName>the_geom</ogc:PropertyName></ogc:Function></Geometry><Graphic><Mark><WellKnownName>square</WellKnownName><Fill><CssParameter
                    name="fill">#000000</CssParameter></Fill></Mark><Opacity>1</Opacity><Size>7</Size></Graphic></PointSymbolizer></Rule>
        <Rule>
          <Name>Pipeline</Name>
          <Title>Pipeline</Title><ogc:Filter><ogc:PropertyIsEqualTo><ogc:PropertyName>FType</ogc:PropertyName> <ogc:Literal><![CDATA[428]]></ogc:Literal> </ogc:PropertyIsEqualTo></ogc:Filter><LineSymbolizer><Stroke><CssParameter
                name="stroke">#000000</CssParameter><CssParameter
                name="stroke-width">1</CssParameter><CssParameter
                name="stroke-dasharray"> 1 1</CssParameter></Stroke></LineSymbolizer><PointSymbolizer><Geometry><ogc:Function name="endPoint"><ogc:PropertyName>the_geom</ogc:PropertyName></ogc:Function></Geometry><Graphic><Mark><WellKnownName>square</WellKnownName><Fill><CssParameter
                    name="fill">#000000</CssParameter></Fill></Mark><Opacity>1</Opacity><Size>12</Size></Graphic></PointSymbolizer></Rule>
        <Rule>
          <Name>StreamRiver</Name>
          <Title>StreamRiver</Title><ogc:Filter><ogc:PropertyIsEqualTo><ogc:PropertyName>FType</ogc:PropertyName> <ogc:Literal><![CDATA[460]]></ogc:Literal> </ogc:PropertyIsEqualTo></ogc:Filter><LineSymbolizer><Stroke><CssParameter
                name="stroke">#73B2FF</CssParameter><CssParameter
                name="stroke-width">2</CssParameter></Stroke></LineSymbolizer><PointSymbolizer><Geometry><ogc:Function name="endPoint"><ogc:PropertyName>the_geom</ogc:PropertyName></ogc:Function></Geometry><Graphic><Mark><WellKnownName>square</WellKnownName><Fill><CssParameter
                    name="fill">#000000</CssParameter></Fill></Mark><Opacity>1</Opacity><Size>7</Size></Graphic></PointSymbolizer></Rule>
        <Rule>
          <Name>&lt;all other values&gt;</Name>
          <Title>&lt;all other values&gt;</Title>
          <ElseFilter />
          <LineSymbolizer>
            <Stroke>
              <CssParameter
                name="stroke">#009C82</CssParameter>
              <CssParameter
                name="stroke-width">1</CssParameter>
            </Stroke>
          </LineSymbolizer>
        </Rule>
        <Rule>
          <MinScaleDenominator>500</MinScaleDenominator>
          <MaxScaleDenominator>40000</MaxScaleDenominator>
          <TextSymbolizer><Label><ogc:PropertyName>ComID</ogc:PropertyName></Label><Font><CssParameter
                name="font-family">Times New Roman</CssParameter><CssParameter
                name="font-size">12</CssParameter></Font><LabelPlacement><LinePlacement><PerpendicularOffset>10</PerpendicularOffset></LinePlacement></LabelPlacement><Fill><CssParameter
                name="fill">#000000</CssParameter></Fill></TextSymbolizer>
        </Rule>
      </FeatureTypeStyle>
    </UserStyle>
  </NamedLayer>
</StyledLayerDescriptor>