<?xml version="1.0" encoding="UTF-8"?>
<StyledLayerDescriptor xmlns="http://www.opengis.net/sld" xmlns:ogc="http://www.opengis.net/ogc"
    xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
    xsi:schemaLocation="http://www.opengis.net/sld http://schemas.opengis.net/sld/1.0.0/StyledLayerDescriptor.xsd"
    version="1.0.0">
    <NamedLayer>
        <Name>NHDLine</Name>
        <UserStyle>
            <Name>NHDLine_style</Name>
            <FeatureTypeStyle>
                <Rule>
                    <Name>Bridge</Name>
                    <Title>Bridge</Title>
                    <ogc:Filter>
                        <ogc:PropertyIsEqualTo>
                            <ogc:PropertyName>FType</ogc:PropertyName>
                            <ogc:Literal><![CDATA[318]]></ogc:Literal>
                        </ogc:PropertyIsEqualTo>
                    </ogc:Filter>
                    <MaxScaleDenominator>1000000</MaxScaleDenominator>
                    <LineSymbolizer>
                        <Stroke>
                            <CssParameter name="stroke">#AD0051</CssParameter>
                            <CssParameter name="stroke-width">1</CssParameter>
                        </Stroke>
                    </LineSymbolizer>
                </Rule>
                <Rule>
                    <Name>Bridge</Name>
                    <Title>Bridge</Title>
                    <ogc:Filter>
                        <ogc:PropertyIsEqualTo>
                            <ogc:PropertyName>FType</ogc:PropertyName>
                            <ogc:Literal><![CDATA[318]]></ogc:Literal>
                        </ogc:PropertyIsEqualTo>
                    </ogc:Filter>
                    <MinScaleDenominator>1000000</MinScaleDenominator>
                    <LineSymbolizer>
                        <Stroke>
                            <CssParameter name="stroke">#AD0051</CssParameter>
                            <CssParameter name="stroke-width">0.5</CssParameter>
                        </Stroke>
                    </LineSymbolizer>
                </Rule>
                <Rule>
                    <Name>DamWeir</Name>
                    <Title>DamWeir</Title>
                    <ogc:Filter>
                        <ogc:PropertyIsEqualTo>
                            <ogc:PropertyName>FType</ogc:PropertyName>
                            <ogc:Literal><![CDATA[343]]></ogc:Literal>
                        </ogc:PropertyIsEqualTo>
                    </ogc:Filter>
                    <MaxScaleDenominator>1000000</MaxScaleDenominator>
                    <LineSymbolizer>
                        <Stroke>
                            <CssParameter name="stroke">#118200</CssParameter>
                            <CssParameter name="stroke-width">1</CssParameter>
                        </Stroke>
                    </LineSymbolizer>
                </Rule>
                <Rule>
                    <Name>DamWeir</Name>
                    <Title>DamWeir</Title>
                    <ogc:Filter>
                        <ogc:PropertyIsEqualTo>
                            <ogc:PropertyName>FType</ogc:PropertyName>
                            <ogc:Literal><![CDATA[343]]></ogc:Literal>
                        </ogc:PropertyIsEqualTo>
                    </ogc:Filter>
                    <MinScaleDenominator>1000000</MinScaleDenominator>
                    <LineSymbolizer>
                        <Stroke>
                            <CssParameter name="stroke">#118200</CssParameter>
                            <CssParameter name="stroke-width">0.5</CssParameter>
                        </Stroke>
                    </LineSymbolizer>
                </Rule>
                <Rule>
                    <Name>Flume</Name>
                    <Title>Flume</Title>
                    <ogc:Filter>
                        <ogc:PropertyIsEqualTo>
                            <ogc:PropertyName>FType</ogc:PropertyName>
                            <ogc:Literal><![CDATA[362]]></ogc:Literal>
                        </ogc:PropertyIsEqualTo>
                    </ogc:Filter>
                    <MaxScaleDenominator>1000000</MaxScaleDenominator>
                    <LineSymbolizer>
                        <Stroke>
                            <CssParameter name="stroke">#4A0082</CssParameter>
                            <CssParameter name="stroke-width">1</CssParameter>
                        </Stroke>
                    </LineSymbolizer>
                </Rule>
                <Rule>
                    <Name>Flume</Name>
                    <Title>Flume</Title>
                    <ogc:Filter>
                        <ogc:PropertyIsEqualTo>
                            <ogc:PropertyName>FType</ogc:PropertyName>
                            <ogc:Literal><![CDATA[362]]></ogc:Literal>
                        </ogc:PropertyIsEqualTo>
                    </ogc:Filter>
                    <MinScaleDenominator>1000000</MinScaleDenominator>
                    <LineSymbolizer>
                        <Stroke>
                            <CssParameter name="stroke">#4A0082</CssParameter>
                            <CssParameter name="stroke-width">0.5</CssParameter>
                        </Stroke>
                    </LineSymbolizer>
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
                    <LineSymbolizer>
                        <Stroke>
                            <CssParameter name="stroke">#009157</CssParameter>
                            <CssParameter name="stroke-width">1</CssParameter>
                        </Stroke>
                    </LineSymbolizer>
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
                    <LineSymbolizer>
                        <Stroke>
                            <CssParameter name="stroke">#009157</CssParameter>
                            <CssParameter name="stroke-width">0.5</CssParameter>
                        </Stroke>
                    </LineSymbolizer>
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
                    <LineSymbolizer>
                        <Stroke>
                            <CssParameter name="stroke">#008A25</CssParameter>
                            <CssParameter name="stroke-width">1</CssParameter>
                        </Stroke>
                    </LineSymbolizer>
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
                    <LineSymbolizer>
                        <Stroke>
                            <CssParameter name="stroke">#008A25</CssParameter>
                            <CssParameter name="stroke-width">0.5</CssParameter>
                        </Stroke>
                    </LineSymbolizer>
                </Rule>
                <Rule>
                    <Name>Nonearthen Shore</Name>
                    <Title>Nonearthen Shore</Title>
                    <ogc:Filter>
                        <ogc:PropertyIsEqualTo>
                            <ogc:PropertyName>FType</ogc:PropertyName>
                            <ogc:Literal><![CDATA[411]]></ogc:Literal>
                        </ogc:PropertyIsEqualTo>
                    </ogc:Filter>
                    <MaxScaleDenominator>1000000</MaxScaleDenominator>
                    <LineSymbolizer>
                        <Stroke>
                            <CssParameter name="stroke">#A87000</CssParameter>
                            <CssParameter name="stroke-width">3.4</CssParameter>
                        </Stroke>
                    </LineSymbolizer>
                </Rule>
                <Rule>
                    <Name>Nonearthen Shore</Name>
                    <Title>Nonearthen Shore</Title>
                    <ogc:Filter>
                        <ogc:PropertyIsEqualTo>
                            <ogc:PropertyName>FType</ogc:PropertyName>
                            <ogc:Literal><![CDATA[411]]></ogc:Literal>
                        </ogc:PropertyIsEqualTo>
                    </ogc:Filter>
                    <MinScaleDenominator>1000000</MinScaleDenominator>
                    <LineSymbolizer>
                        <Stroke>
                            <CssParameter name="stroke">#A87000</CssParameter>
                            <CssParameter name="stroke-width">1.7</CssParameter>
                        </Stroke>
                    </LineSymbolizer>
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
                    <LineSymbolizer>
                        <Stroke>
                            <CssParameter name="stroke">#A60048</CssParameter>
                            <CssParameter name="stroke-width">1</CssParameter>
                        </Stroke>
                    </LineSymbolizer>
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
                    <LineSymbolizer>
                        <Stroke>
                            <CssParameter name="stroke">#A60048</CssParameter>
                            <CssParameter name="stroke-width">0.5</CssParameter>
                        </Stroke>
                    </LineSymbolizer>
                </Rule>
                <Rule>
                    <Name>Reef</Name>
                    <Title>Reef</Title>
                    <ogc:Filter>
                        <ogc:PropertyIsEqualTo>
                            <ogc:PropertyName>FType</ogc:PropertyName>
                            <ogc:Literal><![CDATA[434]]></ogc:Literal>
                        </ogc:PropertyIsEqualTo>
                    </ogc:Filter>
                    <MaxScaleDenominator>1000000</MaxScaleDenominator>
                    <LineSymbolizer>
                        <Stroke>
                            <CssParameter name="stroke">#009E6F</CssParameter>
                            <CssParameter name="stroke-width">1</CssParameter>
                        </Stroke>
                    </LineSymbolizer>
                </Rule>
                <Rule>
                    <Name>Reef</Name>
                    <Title>Reef</Title>
                    <ogc:Filter>
                        <ogc:PropertyIsEqualTo>
                            <ogc:PropertyName>FType</ogc:PropertyName>
                            <ogc:Literal><![CDATA[434]]></ogc:Literal>
                        </ogc:PropertyIsEqualTo>
                    </ogc:Filter>
                    <MinScaleDenominator>1000000</MinScaleDenominator>
                    <LineSymbolizer>
                        <Stroke>
                            <CssParameter name="stroke">#009E6F</CssParameter>
                            <CssParameter name="stroke-width">0.5</CssParameter>
                        </Stroke>
                    </LineSymbolizer>
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
                    <LineSymbolizer>
                        <Stroke>
                            <CssParameter name="stroke">#17008A</CssParameter>
                            <CssParameter name="stroke-width">1</CssParameter>
                        </Stroke>
                    </LineSymbolizer>
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
                    <LineSymbolizer>
                        <Stroke>
                            <CssParameter name="stroke">#17008A</CssParameter>
                            <CssParameter name="stroke-width">0.5</CssParameter>
                        </Stroke>
                    </LineSymbolizer>
                </Rule>
                <Rule>
                    <Name>Sounding Datum Line</Name>
                    <Title>Sounding Datum Line</Title>
                    <ogc:Filter>
                        <ogc:PropertyIsEqualTo>
                            <ogc:PropertyName>FType</ogc:PropertyName>
                            <ogc:Literal><![CDATA[503]]></ogc:Literal>
                        </ogc:PropertyIsEqualTo>
                    </ogc:Filter>
                    <MaxScaleDenominator>1000000</MaxScaleDenominator>
                    <LineSymbolizer>
                        <Stroke>
                            <CssParameter name="stroke">#734C00</CssParameter>
                            <CssParameter name="stroke-width">1.5</CssParameter>
                            <CssParameter name="stroke-dasharray"> 4 3</CssParameter>
                        </Stroke>
                    </LineSymbolizer>
                </Rule>
                <Rule>
                    <Name>Sounding Datum Line</Name>
                    <Title>Sounding Datum Line</Title>
                    <ogc:Filter>
                        <ogc:PropertyIsEqualTo>
                            <ogc:PropertyName>FType</ogc:PropertyName>
                            <ogc:Literal><![CDATA[503]]></ogc:Literal>
                        </ogc:PropertyIsEqualTo>
                    </ogc:Filter>
                    <MinScaleDenominator>1000000</MinScaleDenominator>
                    <LineSymbolizer>
                        <Stroke>
                            <CssParameter name="stroke">#734C00</CssParameter>
                            <CssParameter name="stroke-width">0.75</CssParameter>
                            <CssParameter name="stroke-dasharray"> 4 3</CssParameter>
                        </Stroke>
                    </LineSymbolizer>
                </Rule>
                <Rule>
                    <Name>Special Use Zone Limit</Name>
                    <Title>Special Use Zone Limit</Title>
                    <ogc:Filter>
                        <ogc:PropertyIsEqualTo>
                            <ogc:PropertyName>FType</ogc:PropertyName>
                            <ogc:Literal><![CDATA[533]]></ogc:Literal>
                        </ogc:PropertyIsEqualTo>
                    </ogc:Filter>
                    <MaxScaleDenominator>1000000</MaxScaleDenominator>
                    <LineSymbolizer>
                        <Stroke>
                            <CssParameter name="stroke">#0020AD</CssParameter>
                            <CssParameter name="stroke-width">1</CssParameter>
                        </Stroke>
                    </LineSymbolizer>
                </Rule>
                <Rule>
                    <Name>Special Use Zone Limit</Name>
                    <Title>Special Use Zone Limit</Title>
                    <ogc:Filter>
                        <ogc:PropertyIsEqualTo>
                            <ogc:PropertyName>FType</ogc:PropertyName>
                            <ogc:Literal><![CDATA[533]]></ogc:Literal>
                        </ogc:PropertyIsEqualTo>
                    </ogc:Filter>
                    <MinScaleDenominator>1000000</MinScaleDenominator>
                    <LineSymbolizer>
                        <Stroke>
                            <CssParameter name="stroke">#0020AD</CssParameter>
                            <CssParameter name="stroke-width">0.5</CssParameter>
                        </Stroke>
                    </LineSymbolizer>
                </Rule>
                <Rule>
                    <Name>Tunnel</Name>
                    <Title>Tunnel</Title>
                    <ogc:Filter>
                        <ogc:PropertyIsEqualTo>
                            <ogc:PropertyName>FType</ogc:PropertyName>
                            <ogc:Literal><![CDATA[478]]></ogc:Literal>
                        </ogc:PropertyIsEqualTo>
                    </ogc:Filter>
                    <MaxScaleDenominator>1000000</MaxScaleDenominator>
                    <LineSymbolizer>
                        <Stroke>
                            <CssParameter name="stroke">#B00023</CssParameter>
                            <CssParameter name="stroke-width">1</CssParameter>
                        </Stroke>
                    </LineSymbolizer>
                </Rule>
                <Rule>
                    <Name>Tunnel</Name>
                    <Title>Tunnel</Title>
                    <ogc:Filter>
                        <ogc:PropertyIsEqualTo>
                            <ogc:PropertyName>FType</ogc:PropertyName>
                            <ogc:Literal><![CDATA[478]]></ogc:Literal>
                        </ogc:PropertyIsEqualTo>
                    </ogc:Filter>
                    <MinScaleDenominator>1000000</MinScaleDenominator>
                    <LineSymbolizer>
                        <Stroke>
                            <CssParameter name="stroke">#B00023</CssParameter>
                            <CssParameter name="stroke-width">0.5</CssParameter>
                        </Stroke>
                    </LineSymbolizer>
                </Rule>
                <Rule>
                    <Name>Wall</Name>
                    <Title>Wall</Title>
                    <ogc:Filter>
                        <ogc:PropertyIsEqualTo>
                            <ogc:PropertyName>FType</ogc:PropertyName>
                            <ogc:Literal><![CDATA[483]]></ogc:Literal>
                        </ogc:PropertyIsEqualTo>
                    </ogc:Filter>
                    <MaxScaleDenominator>1000000</MaxScaleDenominator>
                    <LineSymbolizer>
                        <Stroke>
                            <CssParameter name="stroke">#B04C00</CssParameter>
                            <CssParameter name="stroke-width">1</CssParameter>
                        </Stroke>
                    </LineSymbolizer>
                </Rule>
                <Rule>
                    <Name>Wall</Name>
                    <Title>Wall</Title>
                    <ogc:Filter>
                        <ogc:PropertyIsEqualTo>
                            <ogc:PropertyName>FType</ogc:PropertyName>
                            <ogc:Literal><![CDATA[483]]></ogc:Literal>
                        </ogc:PropertyIsEqualTo>
                    </ogc:Filter>
                    <MinScaleDenominator>1000000</MinScaleDenominator>
                    <LineSymbolizer>
                        <Stroke>
                            <CssParameter name="stroke">#B04C00</CssParameter>
                            <CssParameter name="stroke-width">0.5</CssParameter>
                        </Stroke>
                    </LineSymbolizer>
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
                    <LineSymbolizer>
                        <Stroke>
                            <CssParameter name="stroke">#54009E</CssParameter>
                            <CssParameter name="stroke-width">1</CssParameter>
                        </Stroke>
                    </LineSymbolizer>
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
                    <LineSymbolizer>
                        <Stroke>
                            <CssParameter name="stroke">#54009E</CssParameter>
                            <CssParameter name="stroke-width">0.5</CssParameter>
                        </Stroke>
                    </LineSymbolizer>
                </Rule>
                <Rule>
                    <Name>&lt;all other values&gt;</Name>
                    <Title>&lt;all other values&gt;</Title>
                    <ElseFilter/>
                    <LineSymbolizer>
                        <Stroke>
                            <CssParameter name="stroke">#A80B00</CssParameter>
                            <CssParameter name="stroke-width">1</CssParameter>
                        </Stroke>
                    </LineSymbolizer>
                </Rule>
            </FeatureTypeStyle>
        </UserStyle>
    </NamedLayer>
</StyledLayerDescriptor>
