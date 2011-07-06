# Reload Postgres data from *.sql files in same dir
# Example use (include --host or others if different than defaults):
#     ./reload_data.sh -U opengeo -d usgs

PSQL="psql $@"

for TABLE in nhdwaterbody nhdpoint nhdline nhdflowline nhdarea; do
    echo "DROP TABLE IF EXISTS ${TABLE};" | ${PSQL}
    if [ $? -gt 0 ]; then
        exit 1
    fi
    ${PSQL} -f ${TABLE}.sql
    if [ $? -gt 0 ]; then
        exit 1
    fi
    echo "alter table ${TABLE} drop constraint enforce_dims_the_geom;" | ${PSQL}
    if [ $? -gt 0 ]; then
        exit 1
    fi
done
