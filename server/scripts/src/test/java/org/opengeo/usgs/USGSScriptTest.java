package org.opengeo.usgs;

import org.geoserver.geoscript.javascript.JavaScriptModules;
import org.mozilla.javascript.Scriptable;

/**
 * Simple Scripts testing harness. These tests do not load the postgis data.
 * For tests that do require the postgis data, create a new test suite that does
 * not have setRunDBSetup(false) in the constructor.
 * 
 * @author Ian Schneider
 */
public class USGSScriptTest extends USGSScriptTestSupport {
    
    public USGSScriptTest() {
        // all tests in this class will not have access to postgis
        setRunDBSetup(false);
    }
    
    public void testSanity() {
        JavaScriptModules jsModules = (JavaScriptModules) applicationContext.getBean("JSModules");
        Scriptable exports = jsModules.require("usgs");
        assertNotNull(exports);
    }
}
