package org.opengeo.usgs;

import java.util.List;

import org.geoserver.catalog.Catalog;
import org.geoserver.catalog.LayerInfo;

public class USGSTest extends USGSTestSupport {

    public void testSanity() throws Exception {
        Catalog cat = getCatalog();
        assertNotNull(cat);
        assertEquals("namespaces count", 1, cat.getNamespaces().size());
        List<LayerInfo> layers = cat.getLayers();
        for(LayerInfo l : layers){
            System.out.println(l);
        }
    }

}
