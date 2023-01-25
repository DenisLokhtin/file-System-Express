DROP DATABASE IF EXISTS file_system_test;

CREATE DATABASE file_system_test;

\c file_system_test;

DROP TABLE IF EXISTS file;

CREATE TABLE file
(
    id               serial
        constraint "PK_36b46d232307066b3a2c9ea3a1d"
            primary key,
    "createDateTime" timestamp with time zone default now() not null,
    path             varchar                                not null,
    name             varchar                unique          not null,
    mimetype         varchar                                not null,
    size             integer                                not null
);

ALTER TABLE file
    owner to postgres;
