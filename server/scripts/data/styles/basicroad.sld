<?xml version="1.0" encoding="ISO-8859-1"?>
<StyledLayerDescriptor version="1.0.0"
    xsi:schemaLocation="http://www.opengis.net/sld http://schemas.opengis.net/sld/1.0.0/StyledLayerDescriptor.xsd"
    xmlns="http://www.opengis.net/sld"
    xmlns:ogc="http://www.opengis.net/ogc"
    xmlns:xlink="http://www.w3.org/1999/xlink"
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">
    <NamedLayer>
        <Name>Line with border</Name>
        <UserStyle>
            <Title>SLD Cook Book: Line w2th border</Title>
            <FeatureTypeStyle>
                <Rule>
                    <ogc:Filter>
                        <ogc:PropertyIsEqualTo>
                            <ogc:PropertyName>Road_Class</ogc:PropertyName>
                            <ogc:Literal><![CDATA[10002]]></ogc:Literal>
                        </ogc:PropertyIsEqualTo>
                    </ogc:Filter> 
                    <MinScaleDenominator>500000</MinScaleDenominator>
                    <LineSymbolizer>
                        <Stroke>
                            <CssParameter name="stroke">#333333</CssParameter>                           
                            <CssParameter name="stroke-width">1.5</CssParameter>    
                            <CssParameter name="stroke-linecap">round</CssParameter>    
                        </Stroke>
                    </LineSymbolizer>
                </Rule>
                <Rule>
                    <MaxScaleDenominator>500000</MaxScaleDenominator>
                    <LineSymbolizer>
                        <Stroke>
                            <CssParameter name="stroke">#333333</CssParameter>                           
                            <CssParameter name="stroke-width">1.5</CssParameter>    
                            <CssParameter name="stroke-linecap">round</CssParameter>    
                        </Stroke>
                    </LineSymbolizer>
                </Rule>
            </FeatureTypeStyle>
            <FeatureTypeStyle>
                <Rule>
                    <ogc:Filter>
                        <ogc:PropertyIsEqualTo>
                            <ogc:PropertyName>Road_Class</ogc:PropertyName>
                            <ogc:Literal><![CDATA[10002]]></ogc:Literal>
                        </ogc:PropertyIsEqualTo>
                    </ogc:Filter>
                    <MinScaleDenominator>500000</MinScaleDenominator>
                    <LineSymbolizer>
                        <Stroke>
                            <CssParameter name="stroke">#EEEEEE</CssParameter>                           
                            <CssParameter name="stroke-width">0.5</CssParameter>
                            <CssParameter name="stroke-linecap">round</CssParameter>  
                        </Stroke>
                    </LineSymbolizer>                                          
                </Rule>
                <Rule>
                    <MaxScaleDenominator>500000</MaxScaleDenominator>
                    <LineSymbolizer>
                        <Stroke>
                            <CssParameter name="stroke">#EEEEEE</CssParameter>                           
                            <CssParameter name="stroke-width">0.5</CssParameter>
                            <CssParameter name="stroke-linecap">round</CssParameter>  
                        </Stroke>
                    </LineSymbolizer>                                          
                </Rule>
            </FeatureTypeStyle>
        </UserStyle>
    </NamedLayer>
</StyledLayerDescriptor>
