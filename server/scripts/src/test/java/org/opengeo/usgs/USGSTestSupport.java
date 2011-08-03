package org.opengeo.usgs;

import java.io.File;
import java.net.URL;
import java.util.HashMap;
import java.util.Map;

import javax.xml.xpath.XPath;
import javax.xml.xpath.XPathFactory;

import org.apache.commons.io.FileUtils;
import org.geoserver.data.test.LiveData;
import org.geoserver.data.test.TestData;
import org.geoserver.data.util.IOUtils;
import org.geoserver.platform.GeoServerExtensions;
import org.geoserver.test.GeoServerAbstractTestSupport;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.springframework.util.xml.SimpleNamespaceContext;
import org.vfny.geoserver.global.GeoserverDataDirectory;
import org.w3c.dom.Document;

/**
 * 
 * While supporting the one time setup of the superclass, 
 * this class allow for optionally disabling the loading of this postgis
 * data.
 * 
 * @author Ian Schneider
 */
public abstract class USGSTestSupport extends GeoServerAbstractTestSupport {

    // we're tracking this here to subvert the superclass
    static boolean runOnce = false;
    private boolean runDBSetup = true;

    protected XPath xpath;

    @Override
    protected String getLogConfiguration() {
        return "/DEFAULT_LOGGING.properties";
    }

    /**
     * Allow disabling of DB teardown/setup before each test
     * @param runDBSetup 
     */
    protected void setRunDBSetup(boolean runDBSetup) {
        this.runDBSetup = runDBSetup;
    }

    @Override
    protected TestData buildTestData() throws Exception {
        // create the dataRoot directory
        USGSTestData data = new USGSTestData();
        data.setRunDBSetup(runDBSetup);
        return data;
    }

    @Override
    protected boolean useLegacyDataDirectory() {
        return false;
    }

    @Override
    protected void setUpInternal() throws Exception {
        super.setUpInternal();
        if (runOnce && runDBSetup) {
            // if we've already run once, do it again (since the first setup will do it once)
            oneTimeSetUp();
        }
        runOnce = true;

    }

    @Override
    protected boolean isMemoryCleanRequired() {
        return true;
    }

    @Override
    protected void oneTimeSetUp() throws Exception {
        super.oneTimeSetUp();
        
        File base = new File("data/scripts");
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

    @Override
    protected void oneTimeTearDown() throws Exception {
        if (getTestData() != null) {
            // this cleans up the data directory static loader, if we don't the next test
            // will keep on running on the current data dir
            GeoserverDataDirectory.destroy();
            getTestData().tearDown();
        }
    }

    @Override
    protected void tearDownInternal() throws Exception {
        super.tearDownInternal();
        if (runDBSetup) {
            // kill the context
            applicationContext.destroy();
            // kill static caches
            new GeoServerExtensions().setApplicationContext(null);

            // some tests do need a kick on the GC to fully clean up
            if (isMemoryCleanRequired()) {
                System.gc();
                System.runFinalization();
            }
        }
    }

    /**
     * Post the contents of the resource specified to the WFS.
     * @param resource the resource path
     * @return Document non-null result
     * @throws Exception if an error occurs
     */
    protected final Document postRequest(String resource) throws Exception {
        URL resourceURL = getClass().getResource(resource);
        assertNotNull(resourceURL);
        File file = new File(resourceURL.getFile());
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

    /**
     * Make assertions to confirm that a transaction violates a specific rule.
     * @param path relative path of transaction XML
     * @param code the rule code that should be violated
     * @param process the corresponding process id for the rule
     * @throws Exception
     */
    protected void assertViolatesRule(String path, String code, String process) throws Exception {
        Document dom = postRequest(path);
        assertNotNull(dom);
        print(dom);

        assertEquals("ExceptionReport", dom.getDocumentElement().getLocalName());

        String locator = xpath.evaluate("//ows:Exception/@locator", dom);
        assertEquals(path, process, locator);

        assertEquals(path, code, xpath.evaluate("//ows:Exception/@exceptionCode", dom));

        JSONObject result = extractJSONException(dom);
        assertEquals(path, process, result.get("process"));
        assertEquals(path, code, result.get("code"));
    }
    

}
