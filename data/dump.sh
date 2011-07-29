#!/bin/bash

[ "$#" == "0" ] && echo "dump.sh [dbname]" && exit 0

DBNAME=$1; shift;

# list tables from database
TABLES=$(psql -t -U opengeo -d $DBNAME -c "SELECT table_name FROM information_schema.tables WHERE table_schema = 'public';")

#TABLES=${TABLES/spatial_ref_sys/}
#TABLES=${TABLES/geometry_columns/}

# Create a list of table arguments for pg_dump, like this:
# -t "'table1'" -t "'table2'"
for t in $TABLES; do QTABLES="$QTABLES -t '\"$t\"'"; done;
# run script
echo $QTABLES
eval pg_dump -U opengeo -C -F c $QTABLES $DBNAME > $DBNAME.dump
