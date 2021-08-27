
-- DROP TABLE IF EXISTS recipes CASCADE;
-- DROP SEQUENCE IF EXISTS hibernate_sequence CASCADE;

-- CREATE TABLE recipes (
--     id int8 PRIMARY KEY,
--     ownerId int8 PRIMARY KEY,
--     name VARCHAR(256),
--     description VARCHAR(2048),
--     serveCount int8,
--     prepTimeMins int8,
--     totalTimeMins int8,
--     ingredients VARCHAR(2048),
--     directions VARCHAR(2048)
-- );

CREATE SEQUENCE IF NOT EXISTS hibernate_sequence start 1 increment 1;
CREATE TABLE IF NOT EXISTS recipes (
    id int8 not null,
    owner_id int8 not null,
    name varchar(128) not null,
    description varchar(2048),
    serve_count int4 check (serve_count>=1),
    prep_time_mins int4 check (prep_time_mins>=0),
    total_time_mins int4 check (total_time_mins>=0),
    ingredients varchar(8192),
    directions varchar(8192),
    primary key (id)
);
