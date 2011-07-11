package org.opengeo.usgs;

import java.io.File;
import java.io.IOException;
import java.net.URL;

import org.geoserver.data.test.TestData;
import org.geoserver.data.util.IOUtils;

public class USGSTestData implements TestData {

    /** 
     * Root of the data directory 
     */
    File dataRoot;

    public USGSTestData() throws IOException {
        dataRoot = IOUtils.createRandomDirectory("./target", "mock", "data");
        dataRoot.delete();
        dataRoot.mkdir();
        URL dataURL = getClass().getResource("data");
        IOUtils.deepCopy(new File(dataURL.getFile()), dataRoot);
    }
    
    public void setUp() throws Exception {
    }

    public void tearDown() throws Exception {
    }

    public File getDataDirectoryRoot() {
        return dataRoot;
    }

    public boolean isTestDataAvailable() {
        return true;
    }

}
