#!/bin/bash

host="$1"
port="$2"
shift 2
cmd="$@"

until PGPASSWORD=$POSTGRES_PASSWORD psql -h "$host" -p "$port" -U "$POSTGRES_USER" -d "$POSTGRES_DB" -c '\q'; do
    echo >&2 "La base de datos no está disponible todavía - esperando..."
    sleep 1
done

echo >&2 "La base de datos está disponible, continuando..."
exec $cmd
