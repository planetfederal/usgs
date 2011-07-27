package org.opengeo.usgs;

//import static org.custommonkey.xmlunit.XMLAssert.assertXpathExists;


import org.json.simple.JSONObject;
import org.w3c.dom.Document;

public class NHDPointTest extends USGSScriptTestSupport {

    public NHDPointTest() {
        // load test pg data
        setRunDBSetup(true);
    }
    
    public void testInsertsFail() throws Exception {
        Document dom = postRequest("xml/nhdpoint-insert-waterfall-fail.xml");
        assertNotNull(dom);

        String locator = xpath.evaluate("//ows:Exception/@locator", dom);
        assertEquals("js:intersects", locator);
        
        JSONObject result = extractJSONException(dom);
        assertEquals("Intersection Test Failed", result.get("message"));

        JSONObject rule = (JSONObject) result.get("rule");
        assertEquals("intersects", rule.get("name"));
    }
    
    public void testInsertsQueue() throws Exception {
        assertEquals("no exceptions initially", 0, countFeatures("NHDExceptions"));

        Document dom = postRequest("xml/nhdpoint-insert-waterfall-queue.xml");
        assertNotNull(dom);

        String handle = xpath.evaluate("//wfs:InsertResults/wfs:Feature/@handle", dom);
        assertEquals("nhdmetadata.15", handle);

        assertEquals("one exception", 1, countFeatures("NHDExceptions"));
    }

}
