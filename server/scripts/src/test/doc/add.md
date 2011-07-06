Placeholder for process doctests:

    js> var catalog = require("geoserver/catalog");
    js> var ns = catalog.namespaces;
    js> ns.length
    5
    js> catalog.addNamespace({uri: "http://foo.com/", alias: "foo"}, true);
    <Namespace alias: "foo" uri: "http://foo.com/">
    js> catalog.namespaces.length
    6
