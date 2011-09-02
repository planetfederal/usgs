package org.opengeo.usgs;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.URL;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Properties;

import org.apache.commons.io.FileUtils;
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
    
    private static File testDataDir;
    
    // Cobble together a minimal test data directory using production config
    static {
        File sourceDir = new File("data");
        File sourceWorkspaces = new File(sourceDir, "workspaces");
        File sourceScripts = new File(sourceDir, "workspaces");
        try {
            testDataDir = IOUtils.createRandomDirectory("./target", "usgs", "data");
            File destWorkspaces = new File(testDataDir, "workspaces");
            File destScripts = new File(testDataDir, "scripts");
            IOUtils.deepCopy(sourceWorkspaces, destWorkspaces);
            IOUtils.deepCopy(sourceScripts, destScripts);
            // copy usgs datastore template - values to be replaced by usgs.properties file
            URL resource = USGSTestData.class.getResource("data/usgs/datastore.xml");
            File template = new File(resource.getFile());
            FileUtils.copyFileToDirectory(
                    template, new File(destWorkspaces, "usgs/usgs"));
            // copy usgs_bp datastore template - values to be replaced by usgs.properties file
            resource = USGSTestData.class.getResource("data/usgs_bp/datastore.xml");
            template = new File(resource.getFile());
            FileUtils.copyFileToDirectory(
                    template, new File(destWorkspaces, "usgs/usgs_bp"));
        } catch (IOException e) {
            throw new RuntimeException("Trouble creating test data dir", e);
        }
        
    }

    public USGSTestData() {
        // the usgs-script.sql is bogus just to trick super class
        super(testDataDir, "usgs", new File("usgs-script.sql"));
        filteredPaths = new ArrayList<String>(Arrays.asList("workspaces/usgs/usgs/datastore.xml", "workspaces/usgs/usgs_bp/datastore.xml"));
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
        sqlScript = new File("data/usgs_test.dump");
        if (!sqlScript.exists()) {
            throw new IOException("run 'ant init-tests' to download local fixture data");
        }
        
        Properties props = new Properties();
        props.load(new FileInputStream(fixture));
        
        String pg_restore = props.getProperty("pg_restore","pg_restore");
        ProcessBuilder pb = new ProcessBuilder(pg_restore,"--help");
        Process start = pb.start();
        int retval = start.waitFor();
        if (retval != 0) {
            throw new IOException("could not locate pg_restore executable, please specify in " + fixture.getAbsolutePath() + " as pg_restore");
        }
        
        System.err.println("loading fixture data from SQL");
        int retVal = runRestore(props,false);
        if (retVal != 0) {
            // try again - initial restore to empty database will yield warnings
            // and return code will not be 0
            retVal = runRestore(props,true);
        }
        System.err.println("success!");
    }

    private int runRestore(Properties props,boolean failOnError) throws Exception {        
        // load properties and assign defaults
        String host = props.getProperty("host","localhost");
        String port = props.getProperty("port","5432");
        String pg_restore = props.getProperty("pg_restore","pg_restore");
        String user = props.getProperty("user","opengeo");
        String database = props.getProperty("database","usgs_test");
        String password = props.getProperty("passwd"); 
        // this will lock if any connections remain open on the database
        String[] args = {
            pg_restore,
            "-c",
            "-h",host,
            "-p",port,
            "-U",user,
            "-d",database,
            sqlScript.getAbsolutePath()
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
        int retVal = start.waitFor();
        if (retVal != 0 && failOnError) {
            for (String line: output) {
                System.err.println(line);
            }
            throw new IOException("Error running load script, check messages before this one");
        }
        return retVal;
    }
    
}
