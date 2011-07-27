package org.opengeo.usgs;

//import static org.custommonkey.xmlunit.XMLAssert.assertXpathExists;

import java.io.File;

import org.apache.commons.io.FileUtils;
import org.w3c.dom.Document;

public class NHDPointTest extends USGSScriptTestSupport {

    public NHDPointTest() {
        // load test pg data
        setRunDBSetup(true);
    }
    
    public void testBogusInserts() throws Exception {
        File file = new File(getClass().getResource("xml/nhdpoint-insert-waterfall-fail.xml").getFile());
        String xml = FileUtils.readFileToString(file, "UTF-8");
        Document dom = postAsDOM("wfs", xml);

        assertNotNull(dom); 
        print(dom);
        
        //assertXpathExists( "ows:ExceptionReport/ows:Exception/ows:ExceptionText", dom);

    }
    
}
