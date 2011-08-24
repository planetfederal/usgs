alter table "Struct_Point" drop constraint "enforce_srid_Shape";
alter table "Trans_AirportPoint" drop constraint "enforce_srid_Shape";
alter table "Trans_AirportRunway" drop constraint "enforce_srid_SHAPE";
alter table "Trans_RailFeature" drop constraint "enforce_srid_Shape";
alter table "Trans_RoadSegment" drop constraint "enforce_srid_Shape";

drop index "Struct_Point_geom_idx";
drop index "Trans_AirportPoint_geom_idx";
drop index "Trans_AirportRunway_geom_idx";
drop index "Trans_RailFeature_geom_idx";
drop index "Trans_RoadSegment_geom_idx";

update "Struct_Point" set "Shape" = st_transform("Shape", 900913);
update "Trans_AirportPoint" set "Shape" = st_transform("Shape", 900913);
update "Trans_AirportRunway" set "SHAPE" = st_transform("SHAPE", 900913);
update "Trans_RailFeature" set "Shape" = st_transform("Shape", 900913);
update "Trans_RoadSegment" set "Shape" = st_transform("Shape", 900913);

alter table "Struct_Point" add constraint "enforce_srid_Shape" check (SRID("Shape")=900913);
alter table "Trans_AirportPoint" add constraint "enforce_srid_Shape" check (SRID("Shape")=900913);
alter table "Trans_AirportRunway" add constraint "enforce_srid_SHAPE" check (SRID("SHAPE")=900913);
alter table "Trans_RailFeature" add constraint "enforce_srid_Shape" check (SRID("Shape")=900913);
alter table "Trans_RoadSegment" add constraint "enforce_srid_Shape" check (SRID("Shape")=900913);

select populate_geometry_columns();

create index "Struct_Point_geom_idx" on "Struct_Point" using GIST ("Shape");
create index "Trans_AirportPoint_geom_idx" on "Trans_AirportPoint" using GIST ("Shape");
create index "Trans_AirportRunway_geom_idx" on "Trans_AirportRunway" using GIST ("SHAPE");
create index "Trans_RailFeature_geom_idx" on "Trans_RailFeature" using GIST ("Shape");
create index "Trans_RoadSegment_geom_idx" on "Trans_RoadSegment" using GIST ("Shape");
