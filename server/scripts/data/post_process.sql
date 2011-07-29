
alter table "NHDPoint" drop constraint "enforce_srid_Shape";
alter table "NHDFlowline" drop constraint "enforce_srid_Shape";
alter table "NHDLine" drop constraint "enforce_srid_Shape";
alter table "NHDArea" drop constraint "enforce_srid_Shape";
alter table "NHDWaterbody" drop constraint "enforce_srid_Shape";
alter table "NHDAreaEventFC" drop constraint "enforce_srid_Shape";
alter table "NHDLineEventFC" drop constraint "enforce_srid_Shape";
alter table "NHDPointEventFC" drop constraint "enforce_srid_Shape";
alter table "HYDRO_NET_Junctions" drop constraint "enforce_srid_SHAPE";
alter table "WBD_HU10" drop constraint "enforce_srid_Shape";
alter table "WBD_HU12" drop constraint "enforce_srid_Shape";
alter table "WBD_HU14" drop constraint "enforce_srid_Shape";
alter table "WBD_HU16" drop constraint "enforce_srid_Shape";
alter table "WBD_HU2" drop constraint "enforce_srid_Shape";
alter table "WBD_HU4" drop constraint "enforce_srid_Shape";
alter table "WBD_HU6" drop constraint "enforce_srid_Shape";
alter table "WBD_HU8" drop constraint "enforce_srid_Shape";


drop index "NHDPoint_geom_idx";
drop index "NHDFlowline_geom_idx";
drop index "NHDLine_geom_idx";
drop index "NHDArea_geom_idx";
drop index "NHDWaterbody_geom_idx";
drop index "NHDAreaEventFC_geom_idx";
drop index "NHDLineEventFC_geom_idx";
drop index "NHDPointEventFC_geom_idx";
drop index "HYDRO_NET_Junctions_geom_idx";
drop index "WBD_HU10_geom_idx";
drop index "WBD_HU12_geom_idx";
drop index "WBD_HU14_geom_idx";
drop index "WBD_HU16_geom_idx";
drop index "WBD_HU2_geom_idx";
drop index "WBD_HU4_geom_idx";
drop index "WBD_HU6_geom_idx";
drop index "WBD_HU8_geom_idx";

update "NHDPoint" set "Shape" = st_transform("Shape", 900913);
update "NHDFlowline" set "Shape" = st_transform("Shape", 900913);
update "NHDLine" set "Shape" = st_transform("Shape", 900913);
update "NHDArea" set "Shape" = st_transform("Shape", 900913);
update "NHDWaterbody" set "Shape" = st_transform("Shape", 900913);
update "NHDAreaEventFC" set "Shape" = st_transform("Shape", 900913);
update "NHDLineEventFC" set "Shape" = st_transform("Shape", 900913);
update "NHDPointEventFC" set "Shape" = st_transform("Shape", 900913);
update "HYDRO_NET_Junctions" set "SHAPE" = st_transform("SHAPE", 900913);
update "WBD_HU10" set "Shape" = st_transform("Shape", 900913);
update "WBD_HU12" set "Shape" = st_transform("Shape", 900913);
update "WBD_HU14" set "Shape" = st_transform("Shape", 900913);
update "WBD_HU16" set "Shape" = st_transform("Shape", 900913);
update "WBD_HU2" set "Shape" = st_transform("Shape", 900913);
update "WBD_HU4" set "Shape" = st_transform("Shape", 900913);
update "WBD_HU6" set "Shape" = st_transform("Shape", 900913);
update "WBD_HU8" set "Shape" = st_transform("Shape", 900913);

alter table "NHDPoint" add constraint "enforce_srid_Shape" check (SRID("Shape")=900913);
alter table "NHDFlowline" add constraint "enforce_srid_Shape" check (SRID("Shape")=900913);
alter table "NHDLine" add constraint "enforce_srid_Shape" check (SRID("Shape")=900913);
alter table "NHDArea" add constraint "enforce_srid_Shape" check (SRID("Shape")=900913);
alter table "NHDWaterbody" add constraint "enforce_srid_Shape" check (SRID("Shape")=900913);
alter table "NHDAreaEventFC" add constraint "enforce_srid_Shape" check (SRID("Shape")=900913);
alter table "NHDLineEventFC" add constraint "enforce_srid_Shape" check (SRID("Shape")=900913);
alter table "NHDPointEventFC" add constraint "enforce_srid_Shape" check (SRID("Shape")=900913);
alter table "HYDRO_NET_Junctions" add constraint "enforce_srid_SHAPE" check (SRID("SHAPE")=900913);
alter table "WBD_HU2" add constraint "enforce_srid_Shape" check (SRID("Shape")=900913);
alter table "WBD_HU4" add constraint "enforce_srid_Shape" check (SRID("Shape")=900913);
alter table "WBD_HU6" add constraint "enforce_srid_Shape" check (SRID("Shape")=900913);
alter table "WBD_HU8" add constraint "enforce_srid_Shape" check (SRID("Shape")=900913);
alter table "WBD_HU10" add constraint "enforce_srid_Shape" check (SRID("Shape")=900913);
alter table "WBD_HU12" add constraint "enforce_srid_Shape" check (SRID("Shape")=900913);
alter table "WBD_HU14" add constraint "enforce_srid_Shape" check (SRID("Shape")=900913);
alter table "WBD_HU16" add constraint "enforce_srid_Shape" check (SRID("Shape")=900913);

CREATE TABLE "NHDExceptions" (
    exceptionid integer PRIMARY KEY,
    metadataid varchar(255),
    namespace varchar(255),
    featuretype varchar(255),
    featureid varchar(255),
    processid varchar(255),
    exceptionmessage varchar
);

select populate_geometry_columns();

create index "NHDPoint_geom_idx" on "NHDPoint" using GIST ("Shape");
create index "NHDFlowline_geom_idx" on "NHDFlowline" using GIST ("Shape");
create index "NHDLine_geom_idx" on "NHDLine" using GIST ("Shape");
create index "NHDArea_geom_idx" on "NHDArea" using GIST ("Shape");
create index "NHDWaterbody_geom_idx" on "NHDWaterbody" using GIST ("Shape");
create index "NHDAreaEventFC_geom_idx" on "NHDAreaEventFC" using GIST ("Shape");
create index "NHDLineEventFC_geom_idx" on "NHDLineEventFC" using GIST ("Shape");
create index "NHDPointEventFC_geom_idx" on "NHDPointEventFC" using GIST ("Shape");
create index "HYDRO_NET_Junctions_geom_idx" on "HYDRO_NET_Junctions" using GIST ("SHAPE");
create index "WBD_HU10_geom_idx" on "WBD_HU10" using GIST ("Shape");
create index "WBD_HU12_geom_idx" on "WBD_HU12" using GIST ("Shape");
create index "WBD_HU14_geom_idx" on "WBD_HU14" using GIST ("Shape");
create index "WBD_HU16_geom_idx" on "WBD_HU16" using GIST ("Shape");
create index "WBD_HU2_geom_idx" on "WBD_HU2" using GIST ("Shape");
create index "WBD_HU4_geom_idx" on "WBD_HU4" using GIST ("Shape");
create index "WBD_HU6_geom_idx" on "WBD_HU6" using GIST ("Shape");
create index "WBD_HU8_geom_idx" on "WBD_HU8" using GIST ("Shape");

alter table "NHDPoint" drop constraint "enforce_dims_Shape";
alter table "NHDFlowline" drop constraint "enforce_dims_Shape";
alter table "NHDLine" drop constraint "enforce_dims_Shape";
alter table "NHDArea" drop constraint "enforce_dims_Shape";
alter table "NHDWaterbody" drop constraint "enforce_dims_Shape";
alter table "NHDAreaEventFC" drop constraint "enforce_dims_Shape";
alter table "NHDLineEventFC" drop constraint "enforce_dims_Shape";
alter table "NHDPointEventFC" drop constraint "enforce_dims_Shape";
alter table "HYDRO_NET_Junctions" drop constraint "enforce_dims_SHAPE";
alter table "WBD_HU10" drop constraint "enforce_dims_Shape";
alter table "WBD_HU12" drop constraint "enforce_dims_Shape";
alter table "WBD_HU14" drop constraint "enforce_dims_Shape";
alter table "WBD_HU16" drop constraint "enforce_dims_Shape";
alter table "WBD_HU2" drop constraint "enforce_dims_Shape";
alter table "WBD_HU4" drop constraint "enforce_dims_Shape";
alter table "WBD_HU6" drop constraint "enforce_dims_Shape";
alter table "WBD_HU8" drop constraint "enforce_dims_Shape";

vacuum full;
