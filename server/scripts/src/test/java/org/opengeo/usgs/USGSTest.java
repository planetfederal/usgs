package org.opengeo.usgs;

import java.io.IOException;
import java.util.List;

import javax.xml.namespace.QName;

import org.geoserver.catalog.Catalog;
import org.geoserver.catalog.DataStoreInfo;
import org.geoserver.catalog.LayerInfo;
import org.geotools.data.FeatureSource;
import org.geotools.data.FeatureStore;
import org.geotools.filter.FilterFactoryImpl;
import org.opengis.feature.Feature;
import org.opengis.feature.type.FeatureType;
import org.opengis.filter.Filter;
import org.opengis.filter.FilterFactory;

public class USGSTest extends USGSTestSupport {

    public void testSanity() throws Exception {
        Catalog cat = getCatalog();
        assertNotNull(cat);
        assertEquals("namespaces count", 1, cat.getNamespaces().size());
        List<LayerInfo> layers = cat.getLayers();
        assertEquals(8, layers.size());
        List<DataStoreInfo> dataStores = cat.getDataStores();
        for (DataStoreInfo dsi: dataStores) {
            System.out.println(dsi.getDataStore(null).getNames());
        }
        
        checkFeatures(new QName("nhdarea"), 5);
        deleteFeatures(new QName("nhdarea"));
    }
    
    /*
     * Do the same thing as testSanity1 - that way if one runs before the other
     * we know they both check the same thing - verify full postgis reload
     * before each test case.
     */
    public void testSanity2() throws Exception {
        checkFeatures(new QName("nhdarea"), 5);
        deleteFeatures(new QName("nhdarea"));
    }
    
    private void deleteFeatures(QName name) throws IOException {
        FeatureStore<?, ?> fs = (FeatureStore<?, ?>) getFeatureSource(name);
        assertNotNull(fs);
        FilterFactory ff = new FilterFactoryImpl();
        Filter g = ff.greater(ff.property("ComID"), ff.literal(0));
        fs.removeFeatures(g);
        checkFeatures(name, 0);
    }
    
    private void checkFeatures(QName name, int count) throws IOException {
        FeatureSource<? extends FeatureType, ? extends Feature> fs = getFeatureSource(name);
        assertNotNull(fs);
        assertEquals(count, fs.getFeatures().size());
    }

}
