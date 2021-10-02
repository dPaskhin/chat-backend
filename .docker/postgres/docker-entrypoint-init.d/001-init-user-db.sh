#!/bin/bash

sed -i '/^host all all all trust/ s/trust/md5/' /var/lib/postgresql/data/pg_hba.conf
set -e

psql --username postgres <<-EOSQL
    CREATE USER ${POSTGRES_USER} WITH ENCRYPTED PASSWORD '${POSTGRES_PASSWORD}';
    CREATE DATABASE ${POSTGRES_DB} OWNER ${POSTGRES_USER};
EOSQL
