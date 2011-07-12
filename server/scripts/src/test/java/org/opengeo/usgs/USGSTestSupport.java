package org.opengeo.usgs;

import org.geoserver.data.test.TestData;
import org.geoserver.test.GeoServerAbstractTestSupport;

public abstract class USGSTestSupport extends GeoServerAbstractTestSupport {

    @Override
    protected TestData buildTestData() throws Exception {
        // create the dataRoot directory
        return new USGSTestData();
    }

    @Override
    protected boolean useLegacyDataDirectory() {
        return false;
    }

}
