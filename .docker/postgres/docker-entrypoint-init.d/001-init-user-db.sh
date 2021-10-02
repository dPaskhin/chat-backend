#!/bin/bash

sed -i '/^host all all all trust/ s/trust/md5/' /var/lib/postgresql/data/pg_hba.conf
set -e

psql --username postgres <<-EOSQL
    CREATE USER ${DB_USER} WITH ENCRYPTED PASSWORD '${DB_PASSWORD}';
    CREATE DATABASE ${DB_NAME} OWNER ${DB_USER};
EOSQL
