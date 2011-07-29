package org.opengeo.usgs;

//import static org.custommonkey.xmlunit.XMLAssert.assertXpathExists;


import java.util.Arrays;
import java.util.List;

import org.json.simple.JSONObject;
import org.w3c.dom.Document;

public class NHDPointTest extends USGSScriptTestSupport {

    public NHDPointTest() {
        // load test pg data
        setRunDBSetup(true);
    }
    
    public void testInsertsFail() throws Exception {
        
        // nhdpoint intersects rules
        List<String> files = (List<String>) Arrays.asList(
                "xml/nhdpoint-insert-waterfall-fail.xml",
                "xml/nhdpoint-insert-rapid-fail.xml",
                "xml/nhdpoint-insert-gate-fail.xml");
        
        for (String file : files) {
            Document dom = postRequest(file);
            assertNotNull(dom);

            String locator = xpath.evaluate("//ows:Exception/@locator", dom);
            assertEquals(file, "js:MustIntersect", locator);
            
            JSONObject result = extractJSONException(dom);
            assertEquals(file, "MustIntersect", result.get("name"));
            assertEquals(file, "nhdpoint", result.get("subjectLayer"));
        }

        // nhdpoint intersectsEndpoint rules
        files = (List<String>) Arrays.asList(
                "xml/nhdpoint-insert-sinkrise-fail.xml");
        
        for (String file : files) {
            Document dom = postRequest(file);
            assertNotNull(dom);

            String locator = xpath.evaluate("//ows:Exception/@locator", dom);
            assertEquals(file, "js:MustIntersectEndpoint", locator);
            
            JSONObject result = extractJSONException(dom);
            assertEquals(file, "MustIntersectEndpoint", result.get("name"));
            assertEquals(file, "nhdpoint", result.get("subjectLayer"));
        }

        
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
