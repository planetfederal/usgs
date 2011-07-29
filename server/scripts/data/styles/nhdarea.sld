<StyledLayerDescriptor xmlns="http://www.opengis.net/sld" xmlns:ogc="http://www.opengis.net/ogc" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
  xsi:schemaLocation="http://www.opengis.net/sld http://schemas.opengis.net/sld/1.0.0/StyledLayerDescriptor.xsd"
  version="1.0.0">
  <NamedLayer>
    <Name>NHDArea</Name>
    <UserStyle>
      <Name>NHDArea_style</Name>
      <FeatureTypeStyle>
        <Rule>
          <Name>Area of Complex Channels</Name>
          <Title>Area of Complex Channels</Title><ogc:Filter><ogc:PropertyIsEqualTo><ogc:PropertyName>FType</ogc:PropertyName> <ogc:Literal><![CDATA[537]]></ogc:Literal> </ogc:PropertyIsEqualTo></ogc:Filter><PolygonSymbolizer><Fill><GraphicFill><Graphic><Mark><WellKnownName>shape://slash</WellKnownName><Fill><CssParameter
                        name="fill">#D2D2D2</CssParameter></Fill><Stroke><CssParameter
                        name="stroke">#D2D2D2</CssParameter><CssParameter
                        name="stroke-width">2</CssParameter></Stroke></Mark><Opacity>1</Opacity><Size>10</Size></Graphic></GraphicFill></Fill></PolygonSymbolizer><PolygonSymbolizer><Fill><GraphicFill><Graphic><Mark><WellKnownName>shape://slash</WellKnownName><Fill><CssParameter
                        name="fill">#6B7E93</CssParameter></Fill><Stroke><CssParameter
                        name="stroke">#6B7E93</CssParameter><CssParameter
                        name="stroke-width">1</CssParameter></Stroke></Mark><Opacity>1</Opacity><Size>10</Size></Graphic></GraphicFill><CssParameter
                name="fill">#6B7E93</CssParameter></Fill><Stroke><CssParameter
                name="stroke">#6B7E93</CssParameter><CssParameter
                name="stroke-width">0.4</CssParameter></Stroke></PolygonSymbolizer><PolygonSymbolizer><Fill><GraphicFill><Graphic><Mark><WellKnownName>shape://slash</WellKnownName><Fill><CssParameter
                        name="fill">#6B7E93</CssParameter></Fill><Stroke><CssParameter
                        name="stroke">#6B7E93</CssParameter><CssParameter
                        name="stroke-width">1</CssParameter></Stroke></Mark><Opacity>1</Opacity><Size>10</Size></Graphic></GraphicFill><CssParameter
                name="fill">#6B7E93</CssParameter></Fill><Stroke><CssParameter
                name="stroke">#6B7E93</CssParameter><CssParameter
                name="stroke-width">0.4</CssParameter></Stroke></PolygonSymbolizer></Rule>
        <Rule>
          <Name>Area to be Submerged</Name>
          <Title>Area to be Submerged</Title><ogc:Filter><ogc:PropertyIsEqualTo><ogc:PropertyName>FType</ogc:PropertyName> <ogc:Literal><![CDATA[307]]></ogc:Literal> </ogc:PropertyIsEqualTo></ogc:Filter><PolygonSymbolizer><Fill><CssParameter
                name="fill">#005CE6</CssParameter></Fill><Stroke><CssParameter
                name="stroke">#005CE6</CssParameter><CssParameter
                name="stroke-width">0.4</CssParameter></Stroke></PolygonSymbolizer></Rule>
        <Rule>
          <Name>BayInlet</Name>
          <Title>BayInlet</Title><ogc:Filter><ogc:PropertyIsEqualTo><ogc:PropertyName>FType</ogc:PropertyName> <ogc:Literal><![CDATA[312]]></ogc:Literal> </ogc:PropertyIsEqualTo></ogc:Filter><PolygonSymbolizer><Fill><GraphicFill><Graphic><Mark><WellKnownName>shape://slash</WellKnownName><Fill><CssParameter
                        name="fill">#002673</CssParameter></Fill><Stroke><CssParameter
                        name="stroke">#002673</CssParameter><CssParameter
                        name="stroke-width">0.5</CssParameter></Stroke></Mark><Opacity>1</Opacity><Size>10</Size></Graphic></GraphicFill></Fill></PolygonSymbolizer><PolygonSymbolizer><Fill><GraphicFill><Graphic><Mark><WellKnownName>shape://backslash</WellKnownName><Fill><CssParameter
                        name="fill">#002673</CssParameter></Fill><Stroke><CssParameter
                        name="stroke">#002673</CssParameter><CssParameter
                        name="stroke-width">0.5</CssParameter></Stroke></Mark><Opacity>1</Opacity><Size>10</Size></Graphic></GraphicFill><CssParameter
                name="fill">#002673</CssParameter></Fill><Stroke><CssParameter
                name="stroke">#000000</CssParameter><CssParameter
                name="stroke-width">1</CssParameter></Stroke></PolygonSymbolizer><PolygonSymbolizer><Fill><GraphicFill><Graphic><Mark><WellKnownName>shape://backslash</WellKnownName><Fill><CssParameter
                        name="fill">#002673</CssParameter></Fill><Stroke><CssParameter
                        name="stroke">#002673</CssParameter><CssParameter
                        name="stroke-width">0.5</CssParameter></Stroke></Mark><Opacity>1</Opacity><Size>10</Size></Graphic></GraphicFill><CssParameter
                name="fill">#002673</CssParameter></Fill><Stroke><CssParameter
                name="stroke">#000000</CssParameter><CssParameter
                name="stroke-width">1</CssParameter></Stroke></PolygonSymbolizer></Rule>
        <Rule>
          <Name>Bridge</Name>
          <Title>Bridge</Title><ogc:Filter><ogc:PropertyIsEqualTo><ogc:PropertyName>FType</ogc:PropertyName> <ogc:Literal><![CDATA[318]]></ogc:Literal> </ogc:PropertyIsEqualTo></ogc:Filter><PolygonSymbolizer><Fill><CssParameter
                name="fill">#E3CBF7</CssParameter></Fill><Stroke><CssParameter
                name="stroke">#6E6E6E</CssParameter><CssParameter
                name="stroke-width">0.4</CssParameter></Stroke></PolygonSymbolizer></Rule>
        <Rule>
          <Name>CanalDitch</Name>
          <Title>CanalDitch</Title><ogc:Filter><ogc:PropertyIsEqualTo><ogc:PropertyName>FType</ogc:PropertyName> <ogc:Literal><![CDATA[336]]></ogc:Literal> </ogc:PropertyIsEqualTo></ogc:Filter><PolygonSymbolizer><Fill><CssParameter
                name="fill">#000000</CssParameter></Fill><Stroke><CssParameter
                name="stroke">#730000</CssParameter><CssParameter
                name="stroke-width">0.5</CssParameter></Stroke></PolygonSymbolizer></Rule>
        <Rule>
          <Name>DamWeir</Name>
          <Title>DamWeir</Title><ogc:Filter><ogc:PropertyIsEqualTo><ogc:PropertyName>FType</ogc:PropertyName> <ogc:Literal><![CDATA[343]]></ogc:Literal> </ogc:PropertyIsEqualTo></ogc:Filter><PolygonSymbolizer><Fill><CssParameter
                name="fill">#DFFAC8</CssParameter></Fill><Stroke><CssParameter
                name="stroke">#6E6E6E</CssParameter><CssParameter
                name="stroke-width">0.4</CssParameter></Stroke></PolygonSymbolizer></Rule>
        <Rule>
          <Name>Flume</Name>
          <Title>Flume</Title><ogc:Filter><ogc:PropertyIsEqualTo><ogc:PropertyName>FType</ogc:PropertyName> <ogc:Literal><![CDATA[362]]></ogc:Literal> </ogc:PropertyIsEqualTo></ogc:Filter><PolygonSymbolizer><Fill><CssParameter
                name="fill">#F7D4FA</CssParameter></Fill><Stroke><CssParameter
                name="stroke">#6E6E6E</CssParameter><CssParameter
                name="stroke-width">0.4</CssParameter></Stroke></PolygonSymbolizer></Rule>
        <Rule>
          <Name>Foreshore</Name>
          <Title>Foreshore</Title><ogc:Filter><ogc:PropertyIsEqualTo><ogc:PropertyName>FType</ogc:PropertyName> <ogc:Literal><![CDATA[364]]></ogc:Literal> </ogc:PropertyIsEqualTo></ogc:Filter><PolygonSymbolizer><Fill><CssParameter
                name="fill">#894444</CssParameter></Fill><Stroke><CssParameter
                name="stroke">#894444</CssParameter><CssParameter
                name="stroke-width">1</CssParameter></Stroke></PolygonSymbolizer></Rule>
        <Rule>
          <Name>Inundation Area</Name>
          <Title>Inundation Area</Title><ogc:Filter><ogc:PropertyIsEqualTo><ogc:PropertyName>FType</ogc:PropertyName> <ogc:Literal><![CDATA[403]]></ogc:Literal> </ogc:PropertyIsEqualTo></ogc:Filter><PolygonSymbolizer><Fill><CssParameter
                name="fill">#00A9E6</CssParameter></Fill><Stroke><CssParameter
                name="stroke">#00A9E6</CssParameter><CssParameter
                name="stroke-width">0.4</CssParameter></Stroke></PolygonSymbolizer></Rule>
        <Rule>
          <Name>Hazard Zone</Name>
          <Title>Hazard Zone</Title><ogc:Filter><ogc:PropertyIsEqualTo><ogc:PropertyName>FType</ogc:PropertyName> <ogc:Literal><![CDATA[373]]></ogc:Literal> </ogc:PropertyIsEqualTo></ogc:Filter><PolygonSymbolizer><Fill><GraphicFill><Graphic><Mark><WellKnownName>shape://slash</WellKnownName><Fill><CssParameter
                        name="fill">#FF0000</CssParameter></Fill><Stroke><CssParameter
                        name="stroke">#FF0000</CssParameter><CssParameter
                        name="stroke-width">0.4</CssParameter></Stroke></Mark><Opacity>1</Opacity><Size>9.9936</Size></Graphic></GraphicFill><CssParameter
                name="fill">#FF0000</CssParameter></Fill><Stroke><CssParameter
                name="stroke">#4065EB</CssParameter><CssParameter
                name="stroke-width">0.4</CssParameter></Stroke></PolygonSymbolizer><PolygonSymbolizer><Fill><GraphicFill><Graphic><Mark><WellKnownName>shape://slash</WellKnownName><Fill><CssParameter
                        name="fill">#FF0000</CssParameter></Fill><Stroke><CssParameter
                        name="stroke">#FF0000</CssParameter><CssParameter
                        name="stroke-width">0.4</CssParameter></Stroke></Mark><Opacity>1</Opacity><Size>9.9936</Size></Graphic></GraphicFill><CssParameter
                name="fill">#FF0000</CssParameter></Fill><Stroke><CssParameter
                name="stroke">#4065EB</CssParameter><CssParameter
                name="stroke-width">0.4</CssParameter></Stroke></PolygonSymbolizer></Rule>
        <Rule>
          <Name>Lock Chamber</Name>
          <Title>Lock Chamber</Title><ogc:Filter><ogc:PropertyIsEqualTo><ogc:PropertyName>FType</ogc:PropertyName> <ogc:Literal><![CDATA[398]]></ogc:Literal> </ogc:PropertyIsEqualTo></ogc:Filter><PolygonSymbolizer><Fill><CssParameter
                name="fill">#F2F2CE</CssParameter></Fill><Stroke><CssParameter
                name="stroke">#6E6E6E</CssParameter><CssParameter
                name="stroke-width">0.4</CssParameter></Stroke></PolygonSymbolizer></Rule>
        <Rule>
          <Name>Rapids</Name>
          <Title>Rapids</Title><ogc:Filter><ogc:PropertyIsEqualTo><ogc:PropertyName>FType</ogc:PropertyName> <ogc:Literal><![CDATA[431]]></ogc:Literal> </ogc:PropertyIsEqualTo></ogc:Filter><PolygonSymbolizer><Fill><CssParameter
                name="fill">#17A8E8</CssParameter></Fill><Stroke><CssParameter
                name="stroke">#17A8E8</CssParameter><CssParameter
                name="stroke-width">0.4</CssParameter></Stroke></PolygonSymbolizer></Rule>
        <Rule>
          <Name>SeaOcean</Name>
          <Title>SeaOcean</Title><ogc:Filter><ogc:PropertyIsEqualTo><ogc:PropertyName>FType</ogc:PropertyName> <ogc:Literal><![CDATA[445]]></ogc:Literal> </ogc:PropertyIsEqualTo></ogc:Filter><PolygonSymbolizer><Fill><CssParameter
                name="fill">#8400A8</CssParameter></Fill><Stroke><CssParameter
                name="stroke">#6E6E6E</CssParameter><CssParameter
                name="stroke-width">0.4</CssParameter></Stroke></PolygonSymbolizer></Rule>
        <Rule>
          <Name>Special Use Zone</Name>
          <Title>Special Use Zone</Title><ogc:Filter><ogc:PropertyIsEqualTo><ogc:PropertyName>FType</ogc:PropertyName> <ogc:Literal><![CDATA[454]]></ogc:Literal> </ogc:PropertyIsEqualTo></ogc:Filter><PolygonSymbolizer><Fill><GraphicFill><Graphic><Mark><WellKnownName>shape://slash</WellKnownName><Fill><CssParameter
                        name="fill">#EBFFCC</CssParameter></Fill><Stroke><CssParameter
                        name="stroke">#EBFFCC</CssParameter><CssParameter
                        name="stroke-width">3</CssParameter></Stroke></Mark><Opacity>1</Opacity><Size>9.9936</Size></Graphic></GraphicFill></Fill></PolygonSymbolizer><PolygonSymbolizer><Fill><GraphicFill><Graphic><Mark><WellKnownName>shape://slash</WellKnownName><Fill><CssParameter
                        name="fill">#000000</CssParameter></Fill><Stroke><CssParameter
                        name="stroke">#000000</CssParameter><CssParameter
                        name="stroke-width">0.4</CssParameter></Stroke></Mark><Opacity>1</Opacity><Size>10</Size></Graphic></GraphicFill></Fill></PolygonSymbolizer><PolygonSymbolizer><Fill><GraphicFill><Graphic><Mark><WellKnownName>shape://slash</WellKnownName><Fill><CssParameter
                        name="fill">#000000</CssParameter></Fill><Stroke><CssParameter
                        name="stroke">#000000</CssParameter><CssParameter
                        name="stroke-width">0.4</CssParameter></Stroke></Mark><Opacity>1</Opacity><Size>10</Size></Graphic></GraphicFill><CssParameter
                name="fill">#000000</CssParameter></Fill><Stroke><CssParameter
                name="stroke">#000000</CssParameter><CssParameter
                name="stroke-width">0.4</CssParameter></Stroke></PolygonSymbolizer><PolygonSymbolizer><Fill><GraphicFill><Graphic><Mark><WellKnownName>shape://slash</WellKnownName><Fill><CssParameter
                        name="fill">#000000</CssParameter></Fill><Stroke><CssParameter
                        name="stroke">#000000</CssParameter><CssParameter
                        name="stroke-width">0.4</CssParameter></Stroke></Mark><Opacity>1</Opacity><Size>10</Size></Graphic></GraphicFill><CssParameter
                name="fill">#000000</CssParameter></Fill><Stroke><CssParameter
                name="stroke">#000000</CssParameter><CssParameter
                name="stroke-width">0.4</CssParameter></Stroke></PolygonSymbolizer></Rule>
        <Rule>
          <Name>Spillway</Name>
          <Title>Spillway</Title><ogc:Filter><ogc:PropertyIsEqualTo><ogc:PropertyName>FType</ogc:PropertyName> <ogc:Literal><![CDATA[455]]></ogc:Literal> </ogc:PropertyIsEqualTo></ogc:Filter><PolygonSymbolizer><Fill><CssParameter
                name="fill">#EDCDFA</CssParameter></Fill><Stroke><CssParameter
                name="stroke">#6E6E6E</CssParameter><CssParameter
                name="stroke-width">0.4</CssParameter></Stroke></PolygonSymbolizer></Rule>
        <Rule>
          <Name>StreamRiver</Name>
          <Title>StreamRiver</Title><ogc:Filter><ogc:PropertyIsEqualTo><ogc:PropertyName>FType</ogc:PropertyName> <ogc:Literal><![CDATA[460]]></ogc:Literal> </ogc:PropertyIsEqualTo></ogc:Filter><PolygonSymbolizer><Fill><GraphicFill><Graphic><Mark><WellKnownName>shape://slash</WellKnownName><Fill><CssParameter
                        name="fill">#4FD1F8</CssParameter></Fill><Stroke><CssParameter
                        name="stroke">#4FD1F8</CssParameter><CssParameter
                        name="stroke-width">0.5</CssParameter></Stroke></Mark><Opacity>1</Opacity><Size>5.76</Size></Graphic></GraphicFill><CssParameter
                name="fill">#4FD1F8</CssParameter></Fill><Stroke><CssParameter
                name="stroke">#446589</CssParameter><CssParameter
                name="stroke-width">0.4</CssParameter></Stroke></PolygonSymbolizer><PolygonSymbolizer><Fill><GraphicFill><Graphic><Mark><WellKnownName>shape://slash</WellKnownName><Fill><CssParameter
                        name="fill">#4FD1F8</CssParameter></Fill><Stroke><CssParameter
                        name="stroke">#4FD1F8</CssParameter><CssParameter
                        name="stroke-width">0.5</CssParameter></Stroke></Mark><Opacity>1</Opacity><Size>5.76</Size></Graphic></GraphicFill><CssParameter
                name="fill">#4FD1F8</CssParameter></Fill><Stroke><CssParameter
                name="stroke">#446589</CssParameter><CssParameter
                name="stroke-width">0.4</CssParameter></Stroke></PolygonSymbolizer></Rule>
        <Rule>
          <Name>Submerged Stream</Name>
          <Title>Submerged Stream</Title><ogc:Filter><ogc:PropertyIsEqualTo><ogc:PropertyName>FType</ogc:PropertyName> <ogc:Literal><![CDATA[461]]></ogc:Literal> </ogc:PropertyIsEqualTo></ogc:Filter><PolygonSymbolizer><Fill><CssParameter
                name="fill">#73DFFF</CssParameter></Fill></PolygonSymbolizer></Rule>
        <Rule>
          <Name>Wash</Name>
          <Title>Wash</Title><ogc:Filter><ogc:PropertyIsEqualTo><ogc:PropertyName>FType</ogc:PropertyName> <ogc:Literal><![CDATA[484]]></ogc:Literal> </ogc:PropertyIsEqualTo></ogc:Filter><PolygonSymbolizer><Fill><CssParameter
                name="fill">#CBF7C3</CssParameter></Fill><Stroke><CssParameter
                name="stroke">#6E6E6E</CssParameter><CssParameter
                name="stroke-width">0.4</CssParameter></Stroke></PolygonSymbolizer></Rule>
        <Rule>
          <Name>Water IntakeOutflow</Name>
          <Title>Water IntakeOutflow</Title><ogc:Filter><ogc:PropertyIsEqualTo><ogc:PropertyName>FType</ogc:PropertyName> <ogc:Literal><![CDATA[485]]></ogc:Literal> </ogc:PropertyIsEqualTo></ogc:Filter><PolygonSymbolizer><Fill><CssParameter
                name="fill">#CCBDF2</CssParameter></Fill><Stroke><CssParameter
                name="stroke">#6E6E6E</CssParameter><CssParameter
                name="stroke-width">0.4</CssParameter></Stroke></PolygonSymbolizer></Rule>
        <Rule>
          <Name>&lt;all other values&gt;</Name>
          <Title>&lt;all other values&gt;</Title>
          <ElseFilter />
          <PolygonSymbolizer>
            <Fill>
              <CssParameter
                name="fill">#BEF2F7</CssParameter>
            </Fill>
            <Stroke>
              <CssParameter
                name="stroke">#6E6E6E</CssParameter>
              <CssParameter
                name="stroke-width">0.4</CssParameter>
            </Stroke>
          </PolygonSymbolizer>
        </Rule>
      </FeatureTypeStyle>
    </UserStyle>
  </NamedLayer>
</StyledLayerDescriptor>