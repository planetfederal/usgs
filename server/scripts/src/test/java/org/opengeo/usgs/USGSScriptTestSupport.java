/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package org.opengeo.usgs;

import java.io.File;
import java.util.Arrays;
import org.geoserver.data.test.LiveData;
import org.geoserver.data.util.IOUtils;

/**
 * Support for javascript tests. Provisions data directory with scripts.
 * @author Ian Schneider
 */
public class USGSScriptTestSupport extends USGSTestSupport {
    
    @Override
    protected void oneTimeSetUp() throws Exception {
        super.oneTimeSetUp();
        
        File base = new File("../../data/scripts");        
        File datadir = ((LiveData)getTestData()).getDataDirectoryRoot();
        File scripts = new File(datadir,"scripts");
        
        IOUtils.deepCopy(base, scripts);
    }
    
}
