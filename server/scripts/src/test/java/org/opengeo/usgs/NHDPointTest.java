package org.opengeo.usgs;

import java.util.Arrays;
import java.util.List;

import javax.xml.namespace.QName;

import org.geotools.data.simple.SimpleFeatureCollection;
import org.geotools.data.simple.SimpleFeatureIterator;
import org.geotools.data.simple.SimpleFeatureSource;
import org.json.simple.JSONObject;
import org.opengis.feature.simple.SimpleFeature;
import org.w3c.dom.Document;

public class NHDPointTest extends USGSTestSupport {

    public NHDPointTest() {
        // load test pg data
        setRunDBSetup(true);
    }
    
    public void testInsertsFail() throws Exception {
        
        // nhdpoint MustIntersect rules
        List<String> files = (List<String>) Arrays.asList(
                "xml/nhdpoint-insert-waterfall-fail.xml",
                "xml/nhdpoint-insert-rapid-fail.xml",
                "xml/nhdpoint-insert-gate-fail.xml");
        
        for (String file : files) {
            Document dom = postRequest(file);
            assertNotNull(dom);

            assertEquals("ExceptionReport", dom.getDocumentElement().getLocalName());

            String locator = xpath.evaluate("//ows:Exception/@locator", dom);
            assertEquals(file, "js:MustIntersect", locator);
            
            JSONObject result = extractJSONException(dom);
            assertEquals(file, "MustIntersect", result.get("name"));
            assertEquals(file, "nhdpoint", result.get("subjectLayer"));
        }

        // nhdpoint MustIntersectEndpoint rules
        files = (List<String>) Arrays.asList(
                "xml/nhdpoint-insert-sinkrise-fail.xml");
        
        for (String file : files) {
            Document dom = postRequest(file);
            assertNotNull(dom);
            
            assertEquals("ExceptionReport", dom.getDocumentElement().getLocalName());

            String locator = xpath.evaluate("//ows:Exception/@locator", dom);
            assertEquals(file, "js:MustIntersectEndpoint", locator);
            
            JSONObject result = extractJSONException(dom);
            assertEquals(file, "MustIntersectEndpoint", result.get("name"));
            assertEquals(file, "nhdpoint", result.get("subjectLayer"));
        }

        
    }
    
    public void testInsertsQueue() throws Exception {
        SimpleFeatureSource exceptions = getFeatureSource(new QName("nhdexceptions"));
        assertEquals("no exceptions initially", 0, exceptions.getFeatures().size());

        Document dom = postRequest("xml/nhdpoint-insert-waterfall-queue.xml");
        assertNotNull(dom);

        String handle = xpath.evaluate("//wfs:InsertResults/wfs:Feature/@handle", dom);
        assertEquals("nhdmetadata.15", handle);

        SimpleFeatureCollection fc = exceptions.getFeatures();
        assertEquals("one exception", 1, fc.size());

        SimpleFeatureIterator it = fc.features();
        SimpleFeature feature = it.next();
        String id = (String) feature.getAttribute("metadataid");
        id = id.trim();  // TODO update test dump to use varchar in NHDExceptions 
        assertEquals("correct metadataid", "nhdmetadata.15", id);
    }

    public void testInsertsPass() throws Exception {
        
        // transactions that pass MustIntersect
        List<String> files = (List<String>) Arrays.asList(
                "xml/nhdpoint-insert-sinkrise-pass.xml",
                "xml/nhdpoint-insert-waterfall-pass.xml");
        
        for (String file : files) {
            Document dom = postRequest(file);
            assertNotNull(dom);
            
            String inserted = xpath.evaluate("//wfs:totalInserted/text()", dom);
            assertEquals(file, "1", inserted);
            
        }

        
    }
    

}
