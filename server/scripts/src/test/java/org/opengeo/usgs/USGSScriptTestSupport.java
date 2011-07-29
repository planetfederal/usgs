/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package org.opengeo.usgs;

import java.io.File;
import java.util.HashMap;
import java.util.Map;

import javax.xml.xpath.XPath;
import javax.xml.xpath.XPathFactory;

import org.apache.commons.io.FileUtils;
import org.geoserver.data.test.LiveData;
import org.geoserver.data.util.IOUtils;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.springframework.util.xml.SimpleNamespaceContext;
import org.w3c.dom.Document;

/**
 * Support for javascript tests. Provisions data directory with scripts.
 * @author Ian Schneider
 */
public class USGSScriptTestSupport extends USGSTestSupport {
    
    protected XPath xpath;

    @Override
    protected void oneTimeSetUp() throws Exception {
        super.oneTimeSetUp();
        
        File base = new File("../../data/scripts");
        File datadir = ((LiveData)getTestData()).getDataDirectoryRoot();
        File scripts = new File(datadir,"scripts");
        
        IOUtils.deepCopy(base, scripts);
        
        // initialize an xpath object with expected prefix -> URI mappings
        xpath = XPathFactory.newInstance().newXPath();
        SimpleNamespaceContext ctx = new SimpleNamespaceContext();
        Map<String, String> namespaces = new HashMap<String, String>();
        namespaces.put("wps", "http://www.opengis.net/wps/1.0.0");
        namespaces.put("ows", "http://www.opengis.net/ows");
        namespaces.put("gml", "http://www.opengis.net/gml");
        namespaces.put("wfs", "http://www.opengis.net/wfs");
        namespaces.put("xlink", "http://www.w3.org/1999/xlink");
        namespaces.put("xsi", "http://www.w3.org/2001/XMLSchema-instance");
        namespaces.put("feature", "http://geoserver.sf.net"); 
        ctx.setBindings(namespaces);
        xpath.setNamespaceContext(ctx);
    }
    
    /**
     * Post the contents of the resource specified to the WFS.
     * @param resource the resource path
     * @return Document non-null result
     * @throws Exception if an error occurs
     */
    protected final Document postRequest(String resource) throws Exception {
        File file = new File(getClass().getResource(resource).getFile());
        String xml = FileUtils.readFileToString(file, "UTF-8");
        Document dom = postAsDOM("wfs", xml);
        assertNotNull(dom);
        return dom;
    }
    
    /**
     * Extract a JSON exception object from the WFS response Document.
     * @param dom 
     * @return JSONObject
     * @throws Exception if an error occurs
     */
    protected final JSONObject extractJSONException(Document dom) throws Exception {
        return extractJSON(dom,"//ows:ExceptionText");
    }
    
    /**
     * Extract a JSON object from the WFS response Document at the specified xpath.
     * @param dom 
     * @return JSONObject
     * @throws Exception if an error occurs
     */
    protected final JSONObject extractJSON(Document dom,String path) throws Exception {
        String result = xpath.evaluate(path, dom);
        if (result == null || result.length() == 0) {
            System.out.println("could not locate xpath " + path);
            System.out.println("dom is:");
            print(dom);
            fail("expected non null result from xpath expression, see output");
        }
        return (JSONObject) new JSONParser().parse(result);
    }

}
