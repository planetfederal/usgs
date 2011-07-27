package org.opengeo.usgs;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.List;
import java.util.Properties;
import java.util.zip.ZipEntry;
import java.util.zip.ZipFile;

import org.geoserver.data.test.LiveDbmsData;
import org.geoserver.data.util.IOUtils;

/**
 * We are very much abusing the original intension of this class. Instead of
 * providing a real SQL script to run, we use psql directly, but take advantage
 * of the other aspects of this class - checking for properties file and setting
 * up the data dir.
 * @author Ian Schneider
 */
public class USGSTestData extends LiveDbmsData {
    
    private boolean runDBSetup = true;

    public USGSTestData() {
        // the usgs-script.sql is bogus just to trick super class
        super(new File(USGSTestData.class.getResource("data").getFile()), "usgs", new File("usgs-script.sql"));
        filteredPaths.clear();
    }
    
    protected void setRunDBSetup(boolean runDBSetup) {
        this.runDBSetup = runDBSetup;
    }
    
    public void setUp() throws Exception {
        if (runDBSetup) {
            setupDB();
        }        
        // set this to null since superclass will try to execute script
        sqlScript = null;
        super.setUp();
    }

    private void setupDB() throws Exception {
        // load properties and assign defaults
        Properties p = new Properties();
        p.load(new FileInputStream(fixture));
        String host = p.getProperty("host","localhost");
        String port = p.getProperty("port","5432");
        String psql = p.getProperty("psql","psql");
        String user = p.getProperty("user","opengeo");
        String database = p.getProperty("database","usgs_test");
        String password = p.getProperty("passwd"); 
        
        // have to extract script temporarily
        File scriptSource = new File("../../data/test_nhd.sql.zip");
        ZipFile zip = new ZipFile(scriptSource);
        ZipEntry ze = zip.getEntry("test_nhd.sql");
        InputStream inputStream = zip.getInputStream(ze);
        IOUtils.copy(inputStream, sqlScript);
        
        System.out.println("loading fixture data from SQL");
        // this will lock if any connections remain open on the database
        String[] args = {
            psql,
            "-h",host,
            "-p",port,
            "-U",user,
            "-f",sqlScript.getAbsolutePath(),
            database
        };
        ProcessBuilder pb = new ProcessBuilder(args);
        if (password != null) {
            pb.environment().put("PGPASSWORD", password); 
        }
        // read output in separate thread and build a list of lines
        pb.redirectErrorStream(true);
        Process start = pb.start();
        final List<String> output = new ArrayList<String>();
        final BufferedReader br = new BufferedReader(new InputStreamReader(start.getInputStream()));
        new Thread() {

            @Override
            public void run() {
                
                while ( true ){
                    try {
                        String line = br.readLine();
                        // if you want enable this:
                        //System.out.println("script : " + line);
                        if (line == null) break;
                        output.add(line);
                    } catch (IOException ex) {
                        throw new RuntimeException(ex);
                    }
                }
            }
            
        }.start();
        // wait, cleanup and dump if errors
        int retval = start.waitFor();
        sqlScript.delete();
        if (retval != 0) {
            for (String line: output) {
                System.err.println(line);
            }
            throw new IOException("Error running load script, check messages before this one");
        }
        System.out.println("success!");
    }
    
}
