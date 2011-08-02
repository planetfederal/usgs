#!/bin/bash

[ "$#" == "0" ] && echo "restore.sh [dbname] [dumpfile]" && exit 0

DBNAME=$1; shift;
DUMPFILE=$1; shift;

# list tables from database
TABLES=$(psql -t -U opengeo -d $DBNAME -c "SELECT table_name FROM information_schema.tables WHERE table_schema = 'public';")

# Create a list of table arguments for pg_restore, like this:
# -t table1 -t table2
for t in $TABLES; do QTABLES="$QTABLES -t $t"; done;
# run script
eval "pg_restore -U opengeo -c $QTABLES -d $DBNAME $DUMPFILE"
