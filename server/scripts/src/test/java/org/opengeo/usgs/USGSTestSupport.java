package org.opengeo.usgs;

//import java.util.HashMap;
//import java.util.Map;

//import org.custommonkey.xmlunit.SimpleNamespaceContext;
//import org.custommonkey.xmlunit.XMLUnit;
import org.geoserver.data.test.TestData;
import org.geoserver.platform.GeoServerExtensions;
import org.geoserver.test.GeoServerAbstractTestSupport;
import org.vfny.geoserver.global.GeoserverDataDirectory;

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

        // init xmlunit
//        Map<String, String> namespaces = new HashMap<String, String>();
//        namespaces.put("wps", "http://www.opengis.net/wps/1.0.0");
//        namespaces.put("ows", "http://www.opengis.net/ows/1.1");
//        namespaces.put("gml", "http://www.opengis.net/gml");
//        namespaces.put("wfs", "http://www.opengis.net/wfs");
//        namespaces.put("xlink", "http://www.w3.org/1999/xlink");
//        namespaces.put("xsi", "http://www.w3.org/2001/XMLSchema-instance");
//        namespaces.put("feature", "http://geoserver.sf.net"); 
//        
//        XMLUnit.setXpathNamespaceContext(new SimpleNamespaceContext(namespaces));

    }

    @Override
    protected boolean isMemoryCleanRequired() {
        return true;
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
}
