package org.opengeo.usgs;

import java.io.IOException;
import java.util.List;

import org.geoserver.catalog.Catalog;
import org.geoserver.catalog.LayerInfo;
import org.geotools.data.DataAccess;
import org.geotools.data.FeatureSource;
import org.geotools.data.FeatureStore;
import org.geotools.feature.FeatureIterator;
import org.geotools.feature.NameImpl;
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
        assertEquals(5,layers.size());        
        DataAccess<? extends FeatureType, ? extends Feature> dataStore = cat.getDataStoreByName("usgs","nhd").getDataStore(null);
        checkFeatures(dataStore, "NHDArea", 49);
//        checkFeatures(dataStore, "NHDFlowline", 8004);
//        checkFeatures(dataStore, "NHDLine", 38);
//        checkFeatures(dataStore, "NHDPoint", 47);
//        checkFeatures(dataStore, "NHDWaterbody", 1148);
        deleteFeatures(dataStore, "NHDArea");
    }
    
    /*
     * Do the same thing as testSanity1 - that way if one runs before the other
     * we know they both check the same thing - verify full postgis reload
     * before each test case.
     */
    public void testSanity2() throws Exception {
        Catalog cat = getCatalog();
        DataAccess<? extends FeatureType, ? extends Feature> dataStore = cat.getDataStoreByName("usgs","nhd").getDataStore(null);
        checkFeatures(dataStore, "NHDArea", 49);
        deleteFeatures(dataStore, "NHDArea");
    }
    
    private void deleteFeatures(DataAccess<? extends FeatureType, ? extends Feature> ds,String name) throws IOException {
        FeatureStore<?, ?> fs = (FeatureStore<?, ?>) ds.getFeatureSource(new NameImpl(name)).getDataStore().getFeatureSource(new NameImpl(name));
        FilterFactory ff = new FilterFactoryImpl();
        Filter g = ff.greater(ff.property("ComID"), ff.literal(0));
        fs.removeFeatures(g);        
        checkFeatures(ds, name, 0);
    }
    
    private void checkFeatures(DataAccess<? extends FeatureType, ? extends Feature> ds,String name,int count) throws IOException {
        FeatureSource<? extends FeatureType, ? extends Feature> fs = ds.getFeatureSource(new NameImpl(name));
        assertNotNull(fs);
        FeatureIterator<? extends Feature> features = fs.getFeatures().features();
        int cnt = 0;
        while (features.hasNext()) {
            features.next();
            cnt++;
        }
        assertEquals(cnt, count);
    }

}
