package org.opengeo.usgs;

//import static org.custommonkey.xmlunit.XMLAssert.assertXpathExists;


import org.json.simple.JSONObject;
import org.w3c.dom.Document;

public class NHDPointTest extends USGSScriptTestSupport {

    public NHDPointTest() {
        // load test pg data
        setRunDBSetup(true);
    }
    
    public void testBogusInserts() throws Exception {
        Document dom = postRequest("xml/nhdpoint-insert-waterfall-fail.xml");
        JSONObject result = extractJSONException(dom);
        assertEquals("Intersection Test Failed", result.get("message"));
        JSONObject rule = (JSONObject) result.get("rule");
        assertEquals("intersects",rule.get("name"));
        // don't know how deep this should go, an alternative could be by JSON
        // string comparison, but encoding gets painful
        
        // alternatively, if the JSON format is stable, some type of shortcut
        // assertion method might be applicable
    }
    
}
