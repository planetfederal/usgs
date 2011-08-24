<StyledLayerDescriptor xmlns="http://www.opengis.net/sld" xmlns:ogc="http://www.opengis.net/ogc" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
  xsi:schemaLocation="http://www.opengis.net/sld http://schemas.opengis.net/sld/1.0.0/StyledLayerDescriptor.xsd"
  version="1.0.0">
  <NamedLayer>
    <Name>Struct_Point</Name>
    <UserStyle>
      <Name>Struct_Point_style</Name>
      <FeatureTypeStyle>
        <Rule>
          <Name>Campground</Name>
          <Title>Campground</Title>
          <ogc:Filter>
            <ogc:PropertyIsEqualTo>
              <ogc:PropertyName>FCode</ogc:PropertyName>
              <ogc:Literal><![CDATA[82008]]></ogc:Literal>
            </ogc:PropertyIsEqualTo>
          </ogc:Filter>
          <PointSymbolizer>
            <Graphic>
              <Mark>
                <WellKnownName>ttf://PLTS Topographic Map#65</WellKnownName>
                <Fill>
                  <CssParameter name="fill">#CC2030</CssParameter>
                </Fill>
              </Mark>
              <Opacity>1</Opacity>
              <Size>12</Size>
            </Graphic>
          </PointSymbolizer>
        </Rule>
        <Rule>
          <Name>Cemetery</Name>
          <Title>Cemetery</Title>
          <ogc:Filter>
            <ogc:PropertyIsEqualTo>
              <ogc:PropertyName>FCode</ogc:PropertyName>
              <ogc:Literal><![CDATA[82010]]></ogc:Literal>
            </ogc:PropertyIsEqualTo>
          </ogc:Filter>
          <PointSymbolizer>
            <Graphic>
              <Mark>
                <WellKnownName>ttf://PLTS Topographic Map#57</WellKnownName>
                <Fill>
                  <CssParameter name="fill">#000000</CssParameter>
                </Fill>
              </Mark>
              <Opacity>1</Opacity>
              <Size>12</Size>
            </Graphic>
          </PointSymbolizer>
        </Rule>
        <Rule>
          <Name>College / University</Name>
          <Title>College / University</Title>
          <ogc:Filter>
            <ogc:PropertyIsEqualTo>
              <ogc:PropertyName>FCode</ogc:PropertyName>
              <ogc:Literal><![CDATA[73006]]></ogc:Literal>
            </ogc:PropertyIsEqualTo>
          </ogc:Filter>
          <PointSymbolizer>
            <Graphic>
              <Mark>
                <WellKnownName>ttf://ESRI Default Marker#179</WellKnownName>
                <Fill>
                  <CssParameter name="fill">#00A638</CssParameter>
                </Fill>
              </Mark>
              <Opacity>1</Opacity>
              <Size>11</Size>
            </Graphic>
          </PointSymbolizer>
          <PointSymbolizer>
            <Graphic>
              <Mark>
                <WellKnownName>ttf://PLTS Topographic Map#45</WellKnownName>
                <Fill>
                  <CssParameter name="fill">#000000</CssParameter>
                </Fill>
              </Mark>
              <Opacity>1</Opacity>
              <Size>9.77777777777778</Size>
            </Graphic>
          </PointSymbolizer>
        </Rule>
        <Rule>
          <Name>Education Facility</Name>
          <Title>Education Facility</Title>
          <ogc:Filter>
            <ogc:PropertyIsEqualTo>
              <ogc:PropertyName>FCode</ogc:PropertyName>
              <ogc:Literal><![CDATA[73000]]></ogc:Literal>
            </ogc:PropertyIsEqualTo>
          </ogc:Filter>
          <PointSymbolizer>
            <Graphic>
              <Mark>
                <WellKnownName>ttf://ESRI Default Marker#179</WellKnownName>
                <Fill>
                  <CssParameter name="fill">#00A638</CssParameter>
                </Fill>
              </Mark>
              <Opacity>1</Opacity>
              <Size>11</Size>
            </Graphic>
          </PointSymbolizer>
          <PointSymbolizer>
            <Graphic>
              <Mark>
                <WellKnownName>ttf://ESRI Default Marker#110</WellKnownName>
                <Fill>
                  <CssParameter name="fill">#000000</CssParameter>
                </Fill>
              </Mark>
              <Opacity>1</Opacity>
              <Size>9.77777777777778</Size>
            </Graphic>
          </PointSymbolizer>
        </Rule>
        <Rule>
          <Name>Fire Station / EMS Station</Name>
          <Title>Fire Station / EMS Station</Title>
          <ogc:Filter>
            <ogc:PropertyIsEqualTo>
              <ogc:PropertyName>FCode</ogc:PropertyName>
              <ogc:Literal><![CDATA[74026]]></ogc:Literal>
            </ogc:PropertyIsEqualTo>
          </ogc:Filter>
          <PointSymbolizer>
            <Graphic>
              <Mark>
                <WellKnownName>ttf://Wingdings#110</WellKnownName>
                <Fill>
                  <CssParameter name="fill">#E60000</CssParameter>
                </Fill>
              </Mark>
              <Opacity>1</Opacity>
              <Size>11</Size>
            </Graphic>
          </PointSymbolizer>
          <PointSymbolizer>
            <Graphic>
              <Mark>
                <WellKnownName>ttf://Arial Black#70</WellKnownName>
                <Fill>
                  <CssParameter name="fill">#FFFFFF</CssParameter>
                </Fill>
              </Mark>
              <Opacity>1</Opacity>
              <Size>6.875</Size>
            </Graphic>
          </PointSymbolizer>
        </Rule>
        <Rule>
          <Name>Hospital / Medical Center</Name>
          <Title>Hospital / Medical Center</Title>
          <ogc:Filter>
            <ogc:PropertyIsEqualTo>
              <ogc:PropertyName>FCode</ogc:PropertyName>
              <ogc:Literal><![CDATA[80012]]></ogc:Literal>
            </ogc:PropertyIsEqualTo>
          </ogc:Filter>
          <PointSymbolizer>
            <Graphic>
              <Mark>
                <WellKnownName>ttf://Wingdings#110</WellKnownName>
                <Fill>
                  <CssParameter name="fill">#444F89</CssParameter>
                </Fill>
              </Mark>
              <Opacity>1</Opacity>
              <Size>11</Size>
            </Graphic>
          </PointSymbolizer>
          <PointSymbolizer>
            <Graphic>
              <Mark>
                <WellKnownName>ttf://Arial Black#72</WellKnownName>
                <Fill>
                  <CssParameter name="fill">#FFFFFF</CssParameter>
                </Fill>
              </Mark>
              <Opacity>1</Opacity>
              <Size>6.875</Size>
            </Graphic>
          </PointSymbolizer>
        </Rule>
        <Rule>
          <Name>Law Enforcement</Name>
          <Title>Law Enforcement</Title>
          <ogc:Filter>
            <ogc:PropertyIsEqualTo>
              <ogc:PropertyName>FCode</ogc:PropertyName>
              <ogc:Literal><![CDATA[74034]]></ogc:Literal>
            </ogc:PropertyIsEqualTo>
          </ogc:Filter>
          <PointSymbolizer>
            <Graphic>
              <Mark>
                <WellKnownName>ttf://Wingdings#110</WellKnownName>
                <Fill>
                  <CssParameter name="fill">#444F89</CssParameter>
                </Fill>
              </Mark>
              <Opacity>1</Opacity>
              <Size>11</Size>
            </Graphic>
          </PointSymbolizer>
          <PointSymbolizer>
            <Graphic>
              <Mark>
                <WellKnownName>ttf://Arial Black#80</WellKnownName>
                <Fill>
                  <CssParameter name="fill">#FFFFFF</CssParameter>
                </Fill>
              </Mark>
              <Opacity>1</Opacity>
              <Size>6.875</Size>
            </Graphic>
          </PointSymbolizer>
        </Rule>
        <Rule>
          <Name>Picnic Area</Name>
          <Title>Picnic Area</Title>
          <ogc:Filter>
            <ogc:PropertyIsEqualTo>
              <ogc:PropertyName>FCode</ogc:PropertyName>
              <ogc:Literal><![CDATA[82040]]></ogc:Literal>
            </ogc:PropertyIsEqualTo>
          </ogc:Filter>
          <PointSymbolizer>
            <Graphic>
              <Mark>
                <WellKnownName>ttf://PLTS Topographic Map#66</WellKnownName>
                <Fill>
                  <CssParameter name="fill">#CC2030</CssParameter>
                </Fill>
              </Mark>
              <Opacity>1</Opacity>
              <Size>12</Size>
            </Graphic>
          </PointSymbolizer>
        </Rule>
        <Rule>
          <Name>Rehabilitation Center</Name>
          <Title>Rehabilitation Center</Title>
          <ogc:Filter>
            <ogc:PropertyIsEqualTo>
              <ogc:PropertyName>FCode</ogc:PropertyName>
              <ogc:Literal><![CDATA[80030]]></ogc:Literal>
            </ogc:PropertyIsEqualTo>
          </ogc:Filter>
          <PointSymbolizer>
            <Graphic>
              <Mark>
                <WellKnownName>ttf://Wingdings#110</WellKnownName>
                <Fill>
                  <CssParameter name="fill">#444F89</CssParameter>
                </Fill>
              </Mark>
              <Opacity>1</Opacity>
              <Size>11</Size>
            </Graphic>
          </PointSymbolizer>
          <PointSymbolizer>
            <Graphic>
              <Mark>
                <WellKnownName>ttf://Arial Black#72</WellKnownName>
                <Fill>
                  <CssParameter name="fill">#FFFFFF</CssParameter>
                </Fill>
              </Mark>
              <Opacity>1</Opacity>
              <Size>6.875</Size>
            </Graphic>
          </PointSymbolizer>
        </Rule>
        <Rule>
          <Name>School</Name>
          <Title>School</Title>
          <ogc:Filter>
            <ogc:PropertyIsEqualTo>
              <ogc:PropertyName>FCode</ogc:PropertyName>
              <ogc:Literal><![CDATA[73002]]></ogc:Literal>
            </ogc:PropertyIsEqualTo>
          </ogc:Filter>
          <PointSymbolizer>
            <Graphic>
              <Mark>
                <WellKnownName>ttf://ESRI Default Marker#179</WellKnownName>
                <Fill>
                  <CssParameter name="fill">#00A638</CssParameter>
                </Fill>
              </Mark>
              <Opacity>1</Opacity>
              <Size>11</Size>
            </Graphic>
          </PointSymbolizer>
          <PointSymbolizer>
            <Graphic>
              <Mark>
                <WellKnownName>ttf://ESRI Default Marker#110</WellKnownName>
                <Fill>
                  <CssParameter name="fill">#000000</CssParameter>
                </Fill>
              </Mark>
              <Opacity>1</Opacity>
              <Size>9.77777777777778</Size>
            </Graphic>
          </PointSymbolizer>
        </Rule>
        <Rule>
          <Name>School: Elementary</Name>
          <Title>School: Elementary</Title>
          <ogc:Filter>
            <ogc:PropertyIsEqualTo>
              <ogc:PropertyName>FCode</ogc:PropertyName>
              <ogc:Literal><![CDATA[73003]]></ogc:Literal>
            </ogc:PropertyIsEqualTo>
          </ogc:Filter>
          <PointSymbolizer>
            <Graphic>
              <Mark>
                <WellKnownName>ttf://ESRI Default Marker#179</WellKnownName>
                <Fill>
                  <CssParameter name="fill">#00A638</CssParameter>
                </Fill>
              </Mark>
              <Opacity>1</Opacity>
              <Size>11</Size>
            </Graphic>
          </PointSymbolizer>
          <PointSymbolizer>
            <Graphic>
              <Mark>
                <WellKnownName>ttf://ESRI Default Marker#110</WellKnownName>
                <Fill>
                  <CssParameter name="fill">#000000</CssParameter>
                </Fill>
              </Mark>
              <Opacity>1</Opacity>
              <Size>9.77777777777778</Size>
            </Graphic>
          </PointSymbolizer>
        </Rule>
        <Rule>
          <Name>School: High School</Name>
          <Title>School: High School</Title>
          <ogc:Filter>
            <ogc:PropertyIsEqualTo>
              <ogc:PropertyName>FCode</ogc:PropertyName>
              <ogc:Literal><![CDATA[73005]]></ogc:Literal>
            </ogc:PropertyIsEqualTo>
          </ogc:Filter>
          <PointSymbolizer>
            <Graphic>
              <Mark>
                <WellKnownName>ttf://ESRI Default Marker#179</WellKnownName>
                <Fill>
                  <CssParameter name="fill">#00A638</CssParameter>
                </Fill>
              </Mark>
              <Opacity>1</Opacity>
              <Size>11</Size>
            </Graphic>
          </PointSymbolizer>
          <PointSymbolizer>
            <Graphic>
              <Mark>
                <WellKnownName>ttf://ESRI Default Marker#110</WellKnownName>
                <Fill>
                  <CssParameter name="fill">#000000</CssParameter>
                </Fill>
              </Mark>
              <Opacity>1</Opacity>
              <Size>9.77777777777778</Size>
            </Graphic>
          </PointSymbolizer>
        </Rule>
        <Rule>
          <Name>School: Middle School</Name>
          <Title>School: Middle School</Title>
          <ogc:Filter>
            <ogc:PropertyIsEqualTo>
              <ogc:PropertyName>FCode</ogc:PropertyName>
              <ogc:Literal><![CDATA[73004]]></ogc:Literal>
            </ogc:PropertyIsEqualTo>
          </ogc:Filter>
          <PointSymbolizer>
            <Graphic>
              <Mark>
                <WellKnownName>ttf://ESRI Default Marker#179</WellKnownName>
                <Fill>
                  <CssParameter name="fill">#00A638</CssParameter>
                </Fill>
              </Mark>
              <Opacity>1</Opacity>
              <Size>11</Size>
            </Graphic>
          </PointSymbolizer>
          <PointSymbolizer>
            <Graphic>
              <Mark>
                <WellKnownName>ttf://ESRI Default Marker#110</WellKnownName>
                <Fill>
                  <CssParameter name="fill">#000000</CssParameter>
                </Fill>
              </Mark>
              <Opacity>1</Opacity>
              <Size>9.77777777777778</Size>
            </Graphic>
          </PointSymbolizer>
        </Rule>
        <Rule>
          <Name>Trailhead</Name>
          <Title>Trailhead</Title>
          <ogc:Filter>
            <ogc:PropertyIsEqualTo>
              <ogc:PropertyName>FCode</ogc:PropertyName>
              <ogc:Literal><![CDATA[82047]]></ogc:Literal>
            </ogc:PropertyIsEqualTo>
          </ogc:Filter>
          <PointSymbolizer>
            <Graphic>
              <Mark>
                <WellKnownName>ttf://PLTS Topographic Map#67</WellKnownName>
                <Fill>
                  <CssParameter name="fill">#CC2030</CssParameter>
                </Fill>
              </Mark>
              <Opacity>1</Opacity>
              <Size>12</Size>
            </Graphic>
          </PointSymbolizer>
        </Rule>
        <Rule>
          <Name>Water Tank</Name>
          <Title>Water Tank</Title>
          <ogc:Filter>
            <ogc:PropertyIsEqualTo>
              <ogc:PropertyName>FCode</ogc:PropertyName>
              <ogc:Literal><![CDATA[85012]]></ogc:Literal>
            </ogc:PropertyIsEqualTo>
          </ogc:Filter>
          <PointSymbolizer>
            <Graphic>
              <Mark>
                <WellKnownName>ttf://Arial#39</WellKnownName>
                <Fill>
                  <CssParameter name="fill">#E5F2F5</CssParameter>
                </Fill>
              </Mark>
              <Opacity>1</Opacity>
              <Size>11</Size>
            </Graphic>
          </PointSymbolizer>
          <PointSymbolizer>
            <Graphic>
              <Mark>
                <WellKnownName>ttf://PLTS Topographic Map#63</WellKnownName>
                <Fill>
                  <CssParameter name="fill">#000000</CssParameter>
                </Fill>
              </Mark>
              <Opacity>1</Opacity>
              <Size>11</Size>
            </Graphic>
          </PointSymbolizer>
        </Rule>
      </FeatureTypeStyle>
    </UserStyle>
  </NamedLayer>
</StyledLayerDescriptor>