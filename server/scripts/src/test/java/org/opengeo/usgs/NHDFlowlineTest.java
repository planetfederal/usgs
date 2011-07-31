package org.opengeo.usgs;

import java.util.Arrays;
import java.util.List;

import org.json.simple.JSONObject;
import org.w3c.dom.Document;

public class NHDFlowlineTest extends USGSTestSupport {

    public NHDFlowlineTest() {
        // load test pg data
        setRunDBSetup(true);
    }
    
    public void testInsertsFail() throws Exception {
        
        // nhdflowline MustNotCross rules
        List<String> files = (List<String>) Arrays.asList(
                "xml/nhdflowline-insert-pipeline-fail-flowline.xml",
                "xml/nhdflowline-insert-pipeline-fail-waterbody.xml");
        
        for (String file : files) {
            Document dom = postRequest(file);
            assertNotNull(dom);

            assertEquals("ExceptionReport", dom.getDocumentElement().getLocalName());

            String locator = xpath.evaluate("//ows:Exception/@locator", dom);
            assertEquals(file, "js:MustNotCross", locator);
            
            JSONObject result = extractJSONException(dom);
            assertEquals(file, "MustNotCross", result.get("name"));
            assertEquals(file, "nhdflowline", result.get("subjectLayer"));
        }

    }

}
