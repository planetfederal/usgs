package org.opengeo.usgs;

import java.util.Arrays;
import java.util.List;

import javax.xml.namespace.QName;

import org.geotools.data.simple.SimpleFeatureCollection;
import org.geotools.data.simple.SimpleFeatureIterator;
import org.geotools.data.simple.SimpleFeatureSource;
import org.opengis.feature.simple.SimpleFeature;
import org.w3c.dom.Document;

public class NHDFlowlineTest extends USGSTestSupport {

    public NHDFlowlineTest() {
        // load test pg data
        setRunDBSetup(true);
    }
    
    public void testInsertsFail() throws Exception {
        
        // MustNotCross rules
        List<String> files = Arrays.asList("xml/rule-7-fail.xml");
        
        for (String file : files) {
            String code = file.split("-")[1];
            assertViolatesRule(file, code, "js:MustNotCross");
        }

        // MustHaveVerticalRelationship rules
        files = Arrays.asList("xml/rule-6-fail.xml");
        
        for (String file : files) {
            String code = file.split("-")[1];
            assertViolatesRule(file, code, "js:MustHaveVerticalRelationship");
        }

    }

    public void testInsertPipelineAutoCorrect() throws Exception {

        SimpleFeatureSource relationships = getFeatureSource(new QName("NHDVerticalRelationship"));
        assertNotNull(relationships);
        assertEquals("no relationships initially", 0, relationships.getFeatures().size());
        
        Document dom = postRequest("xml/rule-6-correct.xml");
        assertNotNull(dom);
        
        String inserted = xpath.evaluate("//wfs:totalInserted/text()", dom);
        assertEquals("pipeline inserted", "1", inserted);
        
        SimpleFeatureCollection fc = relationships.getFeatures();
        assertEquals("one relationship", 1, fc.size());

        SimpleFeatureIterator it = fc.features();
        SimpleFeature feature = it.next();
        it.close();

        assertEquals("above", "NHDFlowline.374", feature.getAttribute("Above_Permanent_Identifier"));
        assertEquals("below", "NHDFlowline.223", feature.getAttribute("Below_Permanent_Identifier"));
    }
    
    public void testInsertFlowlineAutoCorrect() throws Exception {
        
        SimpleFeatureSource flowlines = getFeatureSource(new QName("NHDFlowline"));
        assertNotNull(flowlines);
        int count = flowlines.getFeatures().size();

        Document dom = postRequest("xml/rule-7-correct.xml");
        assertNotNull(dom);

        String inserted = xpath.evaluate("//wfs:totalInserted/text()", dom);
        assertEquals("pipeline inserted", "1", inserted);
        
        assertEquals("five features more", count + 5, flowlines.getFeatures().size());
        
    }

    public void testInsertsPass() throws Exception {
        
        String[] files = {
                "xml/rule-8-pass.xml",
                "xml/rule-9-pass.xml"};
        
        for (String file : files) {
            Document dom = postRequest(file);
            assertNotNull(dom);
            
            String inserted = xpath.evaluate("//wfs:totalInserted/text()", dom);
            assertEquals(file, "1", inserted);
            
        }

    }

}
