-- SQLite
create table if not exists user
(
    id text primary key,
    username text not null,
    created_at integer
);

-- insert into user (id, username, created_at)
-- values ('2', 'pupa', datetime());

SELECT * from user;