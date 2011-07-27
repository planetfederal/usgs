<?xml version="1.0" encoding="UTF-8"?>
<StyledLayerDescriptor xmlns="http://www.opengis.net/sld" xmlns:ogc="http://www.opengis.net/ogc"
    xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
    xsi:schemaLocation="http://www.opengis.net/sld http://schemas.opengis.net/sld/1.0.0/StyledLayerDescriptor.xsd"
    version="1.0.0">
    <NamedLayer>
        <Name>NHDPoint</Name>
        <UserStyle>
            <Name>NHDPoint_style</Name>
            <FeatureTypeStyle>
                <Rule>
                    <Name>Gaging Station</Name>
                    <Title>Gaging Station</Title>
                    <ogc:Filter>
                        <ogc:PropertyIsEqualTo>
                            <ogc:PropertyName>FType</ogc:PropertyName>
                            <ogc:Literal><![CDATA[367]]></ogc:Literal>
                        </ogc:PropertyIsEqualTo>
                    </ogc:Filter>
                    <MinScaleDenominator>1000000</MinScaleDenominator>
                    <PointSymbolizer>
                        <Graphic>
                            <Mark>
                                <WellKnownName>ttf://ESRI Surveyor#43</WellKnownName>
                                <Fill>
                                    <CssParameter name="fill">#FFFFFF</CssParameter>
                                </Fill>
                            </Mark>
                            <Opacity>1</Opacity>
                            <Size>7</Size>
                        </Graphic>
                    </PointSymbolizer>
                    <PointSymbolizer>
                        <Graphic>
                            <Mark>
                                <WellKnownName>ttf://ESRI Surveyor#85</WellKnownName>
                                <Fill>
                                    <CssParameter name="fill">#000000</CssParameter>
                                </Fill>
                            </Mark>
                            <Opacity>1</Opacity>
                            <Size>7</Size>
                        </Graphic>
                    </PointSymbolizer>
                </Rule>
                <Rule>
                    <Name>Gaging Station</Name>
                    <Title>Gaging Station</Title>
                    <ogc:Filter>
                        <ogc:PropertyIsEqualTo>
                            <ogc:PropertyName>FType</ogc:PropertyName>
                            <ogc:Literal><![CDATA[367]]></ogc:Literal>
                        </ogc:PropertyIsEqualTo>
                    </ogc:Filter>
                    <MaxScaleDenominator>1000000</MaxScaleDenominator>
                    <PointSymbolizer>
                        <Graphic>
                            <Mark>
                                <WellKnownName>ttf://ESRI Surveyor#43</WellKnownName>
                                <Fill>
                                    <CssParameter name="fill">#FFFFFF</CssParameter>
                                </Fill>
                            </Mark>
                            <Opacity>1</Opacity>
                            <Size>14</Size>
                        </Graphic>
                    </PointSymbolizer>
                    <PointSymbolizer>
                        <Graphic>
                            <Mark>
                                <WellKnownName>ttf://ESRI Surveyor#85</WellKnownName>
                                <Fill>
                                    <CssParameter name="fill">#000000</CssParameter>
                                </Fill>
                            </Mark>
                            <Opacity>1</Opacity>
                            <Size>14</Size>
                        </Graphic>
                    </PointSymbolizer>
                </Rule>
                <Rule>
                    <Name>Gate</Name>
                    <Title>Gate</Title>
                    <ogc:Filter>
                        <ogc:PropertyIsEqualTo>
                            <ogc:PropertyName>FType</ogc:PropertyName>
                            <ogc:Literal><![CDATA[369]]></ogc:Literal>
                        </ogc:PropertyIsEqualTo>
                    </ogc:Filter>
                    <MaxScaleDenominator>1000000</MaxScaleDenominator>
                    <PointSymbolizer>
                        <Graphic>
                            <Mark>
                                <WellKnownName>ttf://ESRI Default Marker#33</WellKnownName>
                                <Fill>
                                    <CssParameter name="fill">#FFFFFF</CssParameter>
                                </Fill>
                            </Mark>
                            <Opacity>1</Opacity>
                            <Size>11.25</Size>
                        </Graphic>
                    </PointSymbolizer>
                    <PointSymbolizer>
                        <Graphic>
                            <Mark>
                                <WellKnownName>ttf://ESRI AMFM Water#40</WellKnownName>
                                <Fill>
                                    <CssParameter name="fill">#E60000</CssParameter>
                                </Fill>
                            </Mark>
                            <Opacity>1</Opacity>
                            <Size>12</Size>
                            <Rotation>270</Rotation>
                        </Graphic>
                    </PointSymbolizer>
                </Rule>
                <Rule>
                    <Name>Gate</Name>
                    <Title>Gate</Title>
                    <ogc:Filter>
                        <ogc:PropertyIsEqualTo>
                            <ogc:PropertyName>FType</ogc:PropertyName>
                            <ogc:Literal><![CDATA[369]]></ogc:Literal>
                        </ogc:PropertyIsEqualTo>
                    </ogc:Filter>
                    <MinScaleDenominator>1000000</MinScaleDenominator>
                    <PointSymbolizer>
                        <Graphic>
                            <Mark>
                                <WellKnownName>ttf://ESRI Default Marker#33</WellKnownName>
                                <Fill>
                                    <CssParameter name="fill">#FFFFFF</CssParameter>
                                </Fill>
                            </Mark>
                            <Opacity>1</Opacity>
                            <Size>5.625</Size>
                        </Graphic>
                    </PointSymbolizer>
                    <PointSymbolizer>
                        <Graphic>
                            <Mark>
                                <WellKnownName>ttf://ESRI AMFM Water#40</WellKnownName>
                                <Fill>
                                    <CssParameter name="fill">#E60000</CssParameter>
                                </Fill>
                            </Mark>
                            <Opacity>1</Opacity>
                            <Size>6</Size>
                            <Rotation>270</Rotation>
                        </Graphic>
                    </PointSymbolizer>
                </Rule>
                <Rule>
                    <Name>Lock Chamber</Name>
                    <Title>Lock Chamber</Title>
                    <ogc:Filter>
                        <ogc:PropertyIsEqualTo>
                            <ogc:PropertyName>FType</ogc:PropertyName>
                            <ogc:Literal><![CDATA[398]]></ogc:Literal>
                        </ogc:PropertyIsEqualTo>
                    </ogc:Filter>
                    <MaxScaleDenominator>1000000</MaxScaleDenominator>
                    <PointSymbolizer>
                        <Graphic>
                            <Mark>
                                <WellKnownName>ttf://ESRI Default Marker#218</WellKnownName>
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
                    <Name>Lock Chamber</Name>
                    <Title>Lock Chamber</Title>
                    <ogc:Filter>
                        <ogc:PropertyIsEqualTo>
                            <ogc:PropertyName>FType</ogc:PropertyName>
                            <ogc:Literal><![CDATA[398]]></ogc:Literal>
                        </ogc:PropertyIsEqualTo>
                    </ogc:Filter>
                    <MinScaleDenominator>1000000</MinScaleDenominator>
                    <PointSymbolizer>
                        <Graphic>
                            <Mark>
                                <WellKnownName>ttf://ESRI Default Marker#218</WellKnownName>
                                <Fill>
                                    <CssParameter name="fill">#000000</CssParameter>
                                </Fill>
                            </Mark>
                            <Opacity>1</Opacity>
                            <Size>6</Size>
                        </Graphic>
                    </PointSymbolizer>
                </Rule>
                <Rule>
                    <Name>Rapids</Name>
                    <Title>Rapids</Title>
                    <ogc:Filter>
                        <ogc:PropertyIsEqualTo>
                            <ogc:PropertyName>FType</ogc:PropertyName>
                            <ogc:Literal><![CDATA[431]]></ogc:Literal>
                        </ogc:PropertyIsEqualTo>
                    </ogc:Filter>
                    <MaxScaleDenominator>1000000</MaxScaleDenominator>
                    <PointSymbolizer>
                        <Graphic>
                            <Mark>
                                <WellKnownName>circle</WellKnownName>
                                <Fill>
                                    <CssParameter name="fill">#876300</CssParameter>
                                </Fill>
                                <Stroke>
                                    <CssParameter name="stroke">#000000</CssParameter>
                                    <CssParameter name="stroke-width">1</CssParameter>
                                </Stroke>
                            </Mark>
                            <Opacity>1</Opacity>
                            <Size>4</Size>
                        </Graphic>
                    </PointSymbolizer>
                </Rule>
                <Rule>
                    <Name>Rapids</Name>
                    <Title>Rapids</Title>
                    <ogc:Filter>
                        <ogc:PropertyIsEqualTo>
                            <ogc:PropertyName>FType</ogc:PropertyName>
                            <ogc:Literal><![CDATA[431]]></ogc:Literal>
                        </ogc:PropertyIsEqualTo>
                    </ogc:Filter>
                    <MinScaleDenominator>1000000</MinScaleDenominator>
                    <PointSymbolizer>
                        <Graphic>
                            <Mark>
                                <WellKnownName>circle</WellKnownName>
                                <Fill>
                                    <CssParameter name="fill">#876300</CssParameter>
                                </Fill>
                                <Stroke>
                                    <CssParameter name="stroke">#000000</CssParameter>
                                    <CssParameter name="stroke-width">0.5</CssParameter>
                                </Stroke>
                            </Mark>
                            <Opacity>1</Opacity>
                            <Size>2</Size>
                        </Graphic>
                    </PointSymbolizer>
                </Rule>
                <Rule>
                    <Name>Reservoir</Name>
                    <Title>Reservoir</Title>
                    <ogc:Filter>
                        <ogc:PropertyIsEqualTo>
                            <ogc:PropertyName>FType</ogc:PropertyName>
                            <ogc:Literal><![CDATA[436]]></ogc:Literal>
                        </ogc:PropertyIsEqualTo>
                    </ogc:Filter>
                    <MaxScaleDenominator>1000000</MaxScaleDenominator>
                    <PointSymbolizer>
                        <Graphic>
                            <Mark>
                                <WellKnownName>ttf://ESRI Surveyor#43</WellKnownName>
                                <Fill>
                                    <CssParameter name="fill">#A6D8F7</CssParameter>
                                </Fill>
                            </Mark>
                            <Opacity>1</Opacity>
                            <Size>11</Size>
                        </Graphic>
                    </PointSymbolizer>
                    <PointSymbolizer>
                        <Graphic>
                            <Mark>
                                <WellKnownName>ttf://ESRI Surveyor#82</WellKnownName>
                                <Fill>
                                    <CssParameter name="fill">#000000</CssParameter>
                                </Fill>
                            </Mark>
                            <Opacity>1</Opacity>
                            <Size>11</Size>
                        </Graphic>
                    </PointSymbolizer>
                </Rule>
                <Rule>
                    <Name>Reservoir</Name>
                    <Title>Reservoir</Title>
                    <ogc:Filter>
                        <ogc:PropertyIsEqualTo>
                            <ogc:PropertyName>FType</ogc:PropertyName>
                            <ogc:Literal><![CDATA[436]]></ogc:Literal>
                        </ogc:PropertyIsEqualTo>
                    </ogc:Filter>
                    <MinScaleDenominator>1000000</MinScaleDenominator>
                    <PointSymbolizer>
                        <Graphic>
                            <Mark>
                                <WellKnownName>ttf://ESRI Surveyor#43</WellKnownName>
                                <Fill>
                                    <CssParameter name="fill">#A6D8F7</CssParameter>
                                </Fill>
                            </Mark>
                            <Opacity>1</Opacity>
                            <Size>5.5</Size>
                        </Graphic>
                    </PointSymbolizer>
                    <PointSymbolizer>
                        <Graphic>
                            <Mark>
                                <WellKnownName>ttf://ESRI Surveyor#82</WellKnownName>
                                <Fill>
                                    <CssParameter name="fill">#000000</CssParameter>
                                </Fill>
                            </Mark>
                            <Opacity>1</Opacity>
                            <Size>5.5</Size>
                        </Graphic>
                    </PointSymbolizer>
                </Rule>
                <Rule>
                    <Name>Rock</Name>
                    <Title>Rock</Title>
                    <ogc:Filter>
                        <ogc:PropertyIsEqualTo>
                            <ogc:PropertyName>FType</ogc:PropertyName>
                            <ogc:Literal><![CDATA[441]]></ogc:Literal>
                        </ogc:PropertyIsEqualTo>
                    </ogc:Filter>
                    <MaxScaleDenominator>1000000</MaxScaleDenominator>
                    <PointSymbolizer>
                        <Graphic>
                            <Mark>
                                <WellKnownName>ttf://ESRI Default Marker#108</WellKnownName>
                                <Fill>
                                    <CssParameter name="fill">#000000</CssParameter>
                                </Fill>
                            </Mark>
                            <Opacity>1</Opacity>
                            <Size>14</Size>
                        </Graphic>
                    </PointSymbolizer>
                </Rule>
                <Rule>
                    <Name>Rock</Name>
                    <Title>Rock</Title>
                    <ogc:Filter>
                        <ogc:PropertyIsEqualTo>
                            <ogc:PropertyName>FType</ogc:PropertyName>
                            <ogc:Literal><![CDATA[441]]></ogc:Literal>
                        </ogc:PropertyIsEqualTo>
                    </ogc:Filter>
                    <MinScaleDenominator>1000000</MinScaleDenominator>
                    <PointSymbolizer>
                        <Graphic>
                            <Mark>
                                <WellKnownName>ttf://ESRI Default Marker#108</WellKnownName>
                                <Fill>
                                    <CssParameter name="fill">#000000</CssParameter>
                                </Fill>
                            </Mark>
                            <Opacity>1</Opacity>
                            <Size>7</Size>
                        </Graphic>
                    </PointSymbolizer>
                </Rule>
                <Rule>
                    <Name>SinkRise</Name>
                    <Title>SinkRise</Title>
                    <ogc:Filter>
                        <ogc:PropertyIsEqualTo>
                            <ogc:PropertyName>FType</ogc:PropertyName>
                            <ogc:Literal><![CDATA[450]]></ogc:Literal>
                        </ogc:PropertyIsEqualTo>
                    </ogc:Filter>
                    <MaxScaleDenominator>1000000</MaxScaleDenominator>
                    <PointSymbolizer>
                        <Graphic>
                            <Mark>
                                <WellKnownName>ttf://ESRI Surveyor#99</WellKnownName>
                                <Fill>
                                    <CssParameter name="fill">#0070FF</CssParameter>
                                </Fill>
                            </Mark>
                            <Opacity>1</Opacity>
                            <Size>8</Size>
                        </Graphic>
                    </PointSymbolizer>
                </Rule>
                <Rule>
                    <Name>SinkRise</Name>
                    <Title>SinkRise</Title>
                    <ogc:Filter>
                        <ogc:PropertyIsEqualTo>
                            <ogc:PropertyName>FType</ogc:PropertyName>
                            <ogc:Literal><![CDATA[450]]></ogc:Literal>
                        </ogc:PropertyIsEqualTo>
                    </ogc:Filter>
                    <MinScaleDenominator>1000000</MinScaleDenominator>
                    <PointSymbolizer>
                        <Graphic>
                            <Mark>
                                <WellKnownName>ttf://ESRI Surveyor#99</WellKnownName>
                                <Fill>
                                    <CssParameter name="fill">#0070FF</CssParameter>
                                </Fill>
                            </Mark>
                            <Opacity>1</Opacity>
                            <Size>4</Size>
                        </Graphic>
                    </PointSymbolizer>
                </Rule>
                <Rule>
                    <Name>SpringSeep</Name>
                    <Title>SpringSeep</Title>
                    <ogc:Filter>
                        <ogc:PropertyIsEqualTo>
                            <ogc:PropertyName>FType</ogc:PropertyName>
                            <ogc:Literal><![CDATA[458]]></ogc:Literal>
                        </ogc:PropertyIsEqualTo>
                    </ogc:Filter>
                    <MaxScaleDenominator>1000000</MaxScaleDenominator>
                    <PointSymbolizer>
                        <Graphic>
                            <Mark>
                                <WellKnownName>ttf://ESRI Default Marker#33</WellKnownName>
                                <Fill>
                                    <CssParameter name="fill">#004DA8</CssParameter>
                                </Fill>
                            </Mark>
                            <Opacity>1</Opacity>
                            <Size>12</Size>
                        </Graphic>
                    </PointSymbolizer>
                    <PointSymbolizer>
                        <Graphic>
                            <Mark>
                                <WellKnownName>ttf://ESRI Default Marker#40</WellKnownName>
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
                    <Name>SpringSeep</Name>
                    <Title>SpringSeep</Title>
                    <ogc:Filter>
                        <ogc:PropertyIsEqualTo>
                            <ogc:PropertyName>FType</ogc:PropertyName>
                            <ogc:Literal><![CDATA[458]]></ogc:Literal>
                        </ogc:PropertyIsEqualTo>
                    </ogc:Filter>
                    <MinScaleDenominator>1000000</MinScaleDenominator>
                    <PointSymbolizer>
                        <Graphic>
                            <Mark>
                                <WellKnownName>ttf://ESRI Default Marker#33</WellKnownName>
                                <Fill>
                                    <CssParameter name="fill">#004DA8</CssParameter>
                                </Fill>
                            </Mark>
                            <Opacity>1</Opacity>
                            <Size>6</Size>
                        </Graphic>
                    </PointSymbolizer>
                    <PointSymbolizer>
                        <Graphic>
                            <Mark>
                                <WellKnownName>ttf://ESRI Default Marker#40</WellKnownName>
                                <Fill>
                                    <CssParameter name="fill">#000000</CssParameter>
                                </Fill>
                            </Mark>
                            <Opacity>1</Opacity>
                            <Size>6</Size>
                        </Graphic>
                    </PointSymbolizer>
                </Rule>
                <Rule>
                    <Name>Water IntakeOutflow</Name>
                    <Title>Water IntakeOutflow</Title>
                    <ogc:Filter>
                        <ogc:PropertyIsEqualTo>
                            <ogc:PropertyName>FType</ogc:PropertyName>
                            <ogc:Literal><![CDATA[485]]></ogc:Literal>
                        </ogc:PropertyIsEqualTo>
                    </ogc:Filter>
                    <MaxScaleDenominator>1000000</MaxScaleDenominator>
                    <PointSymbolizer>
                        <Graphic>
                            <Mark>
                                <WellKnownName>circle</WellKnownName>
                                <Fill>
                                    <CssParameter name="fill">#22009C</CssParameter>
                                </Fill>
                                <Stroke>
                                    <CssParameter name="stroke">#000000</CssParameter>
                                    <CssParameter name="stroke-width">1</CssParameter>
                                </Stroke>
                            </Mark>
                            <Opacity>1</Opacity>
                            <Size>4</Size>
                        </Graphic>
                    </PointSymbolizer>
                </Rule>
                <Rule>
                    <Name>Water IntakeOutflow</Name>
                    <Title>Water IntakeOutflow</Title>
                    <ogc:Filter>
                        <ogc:PropertyIsEqualTo>
                            <ogc:PropertyName>FType</ogc:PropertyName>
                            <ogc:Literal><![CDATA[485]]></ogc:Literal>
                        </ogc:PropertyIsEqualTo>
                    </ogc:Filter>
                    <MinScaleDenominator>1000000</MinScaleDenominator>
                    <PointSymbolizer>
                        <Graphic>
                            <Mark>
                                <WellKnownName>circle</WellKnownName>
                                <Fill>
                                    <CssParameter name="fill">#22009C</CssParameter>
                                </Fill>
                                <Stroke>
                                    <CssParameter name="stroke">#000000</CssParameter>
                                    <CssParameter name="stroke-width">0.5</CssParameter>
                                </Stroke>
                            </Mark>
                            <Opacity>1</Opacity>
                            <Size>2</Size>
                        </Graphic>
                    </PointSymbolizer>
                </Rule>
                <Rule>
                    <Name>Waterfall</Name>
                    <Title>Waterfall</Title>
                    <ogc:Filter>
                        <ogc:PropertyIsEqualTo>
                            <ogc:PropertyName>FType</ogc:PropertyName>
                            <ogc:Literal><![CDATA[487]]></ogc:Literal>
                        </ogc:PropertyIsEqualTo>
                    </ogc:Filter>
                    <MaxScaleDenominator>1000000</MaxScaleDenominator>
                    <PointSymbolizer>
                        <Graphic>
                            <Mark>
                                <WellKnownName>circle</WellKnownName>
                                <Fill>
                                    <CssParameter name="fill">#0050A1</CssParameter>
                                </Fill>
                                <Stroke>
                                    <CssParameter name="stroke">#000000</CssParameter>
                                    <CssParameter name="stroke-width">1</CssParameter>
                                </Stroke>
                            </Mark>
                            <Opacity>1</Opacity>
                            <Size>4</Size>
                        </Graphic>
                    </PointSymbolizer>
                </Rule>
                <Rule>
                    <Name>Waterfall</Name>
                    <Title>Waterfall</Title>
                    <ogc:Filter>
                        <ogc:PropertyIsEqualTo>
                            <ogc:PropertyName>FType</ogc:PropertyName>
                            <ogc:Literal><![CDATA[487]]></ogc:Literal>
                        </ogc:PropertyIsEqualTo>
                    </ogc:Filter>
                    <MinScaleDenominator>1000000</MinScaleDenominator>
                    <PointSymbolizer>
                        <Graphic>
                            <Mark>
                                <WellKnownName>circle</WellKnownName>
                                <Fill>
                                    <CssParameter name="fill">#0050A1</CssParameter>
                                </Fill>
                                <Stroke>
                                    <CssParameter name="stroke">#000000</CssParameter>
                                    <CssParameter name="stroke-width">0.5</CssParameter>
                                </Stroke>
                            </Mark>
                            <Opacity>1</Opacity>
                            <Size>2</Size>
                        </Graphic>
                    </PointSymbolizer>
                </Rule>
                <Rule>
                    <Name>Well</Name>
                    <Title>Well</Title>
                    <ogc:Filter>
                        <ogc:PropertyIsEqualTo>
                            <ogc:PropertyName>FType</ogc:PropertyName>
                            <ogc:Literal><![CDATA[488]]></ogc:Literal>
                        </ogc:PropertyIsEqualTo>
                    </ogc:Filter>
                    <MaxScaleDenominator>1000000</MaxScaleDenominator>
                    <PointSymbolizer>
                        <Graphic>
                            <Mark>
                                <WellKnownName>ttf://ESRI Default Marker#40</WellKnownName>
                                <Fill>
                                    <CssParameter name="fill">#004DA8</CssParameter>
                                </Fill>
                            </Mark>
                            <Opacity>1</Opacity>
                            <Size>11</Size>
                        </Graphic>
                    </PointSymbolizer>
                </Rule>
                <Rule>
                    <Name>Well</Name>
                    <Title>Well</Title>
                    <ogc:Filter>
                        <ogc:PropertyIsEqualTo>
                            <ogc:PropertyName>FType</ogc:PropertyName>
                            <ogc:Literal><![CDATA[488]]></ogc:Literal>
                        </ogc:PropertyIsEqualTo>
                    </ogc:Filter>
                    <MinScaleDenominator>1000000</MinScaleDenominator>
                    <PointSymbolizer>
                        <Graphic>
                            <Mark>
                                <WellKnownName>ttf://ESRI Default Marker#40</WellKnownName>
                                <Fill>
                                    <CssParameter name="fill">#004DA8</CssParameter>
                                </Fill>
                            </Mark>
                            <Opacity>1</Opacity>
                            <Size>5.5</Size>
                        </Graphic>
                    </PointSymbolizer>
                </Rule>
                <Rule>
                    <Name>&lt;all other values&gt;</Name>
                    <Title>&lt;all other values&gt;</Title>
                    <ElseFilter/>
                    <PointSymbolizer>
                        <Graphic>
                            <Mark>
                                <WellKnownName>circle</WellKnownName>
                                <Fill>
                                    <CssParameter name="fill">#00A118</CssParameter>
                                </Fill>
                                <Stroke>
                                    <CssParameter name="stroke">#000000</CssParameter>
                                    <CssParameter name="stroke-width">1</CssParameter>
                                </Stroke>
                            </Mark>
                            <Opacity>1</Opacity>
                            <Size>4</Size>
                        </Graphic>
                    </PointSymbolizer>
                </Rule>
            </FeatureTypeStyle>
        </UserStyle>
    </NamedLayer>
</StyledLayerDescriptor>
