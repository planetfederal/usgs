# script to drop empty tables from a database
[ "$#" == "0" ] && echo "Usage: $0 DBNAME" && exit 0

DBNAME=$1; shift;

TABLES=$(psql -t -U opengeo -d $DBNAME -c "SELECT table_name FROM information_schema.tables WHERE table_schema = 'public';")

for TABLE in $TABLES; do
    COUNT=$(psql -t -U opengeo -d $DBNAME -c "SELECT count(*) FROM \"$TABLE\";")
    if [ $COUNT != "0" ]; then
        echo "Dropping $TABLE..."
        psql -t -U opengeo -d $DBNAME -c "DROP TABLE \"$TABLE\";"
    fi
done
