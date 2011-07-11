package org.opengeo.usgs;

import org.geoserver.catalog.Catalog;

public class USGSTest extends USGSTestSupport {

    public void testSanity() throws Exception {
        Catalog cat = getCatalog();
//        assertEquals("namespaces count", 1, cat.getNamespaces().size());
    }

}
