package org.opengeo.usgs;

import java.io.IOException;
import java.util.List;

import org.geoserver.catalog.Catalog;
import org.geoserver.catalog.LayerInfo;
import org.geotools.data.DataAccess;
import org.geotools.data.FeatureStore;
import org.geotools.feature.NameImpl;
import org.geotools.filter.FilterFactoryImpl;
import org.opengis.feature.Feature;
import org.opengis.feature.type.FeatureType;
import org.opengis.filter.Filter;
import org.opengis.filter.FilterFactory;

public class USGSTest extends USGSTestSupport {

    DataAccess<? extends FeatureType, ? extends Feature> dataStore;
    
    @Override
    protected void setUpInternal() throws Exception {
        super.setUpInternal();
        dataStore = getCatalog().getDataStoreByName("usgs","nhd").getDataStore(null);
    }

    @Override
    protected void tearDownInternal() throws Exception {
        super.tearDownInternal();
        dataStore.dispose();
    }

    public void testSanity() throws Exception {
        Catalog cat = getCatalog();
        assertNotNull(cat);
        assertEquals("namespaces count", 1, cat.getNamespaces().size());
        List<LayerInfo> layers = cat.getLayers();
        assertEquals(5,layers.size());        
        
        checkFeatures(dataStore, "NHDArea", 49);
        deleteFeatures(dataStore, "NHDArea");
    }
    
    /*
     * Do the same thing as testSanity1 - that way if one runs before the other
     * we know they both check the same thing - verify full postgis reload
     * before each test case.
     */
    public void testSanity2() throws Exception {
        checkFeatures(dataStore, "NHDArea", 49);
        deleteFeatures(dataStore, "NHDArea");        
        dataStore.dispose();
    }
    
    private void deleteFeatures(DataAccess<? extends FeatureType, ? extends Feature> ds,String name) throws IOException {
        DataAccess<? extends FeatureType, ? extends Feature> da = ds.getFeatureSource(new NameImpl(name)).getDataStore();
        FeatureStore<?, ?> fs = (FeatureStore<?, ?>) da.getFeatureSource(new NameImpl(name));
        FilterFactory ff = new FilterFactoryImpl();
        Filter g = ff.greater(ff.property("ComID"), ff.literal(0));
        fs.removeFeatures(g);        
        checkFeatures(ds, name, 0);
    }
    
    private void checkFeatures(DataAccess<? extends FeatureType, ? extends Feature> ds,String name,int count) throws IOException {
        DataAccess<? extends FeatureType, ? extends Feature> da = ds.getFeatureSource(new NameImpl(name)).getDataStore();
        FeatureStore<?, ?> fs = (FeatureStore<?, ?>) da.getFeatureSource(new NameImpl(name));
        assertNotNull(fs);
        assertEquals(count, fs.getFeatures().size());
    }

}
