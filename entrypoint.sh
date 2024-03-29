#!/usr/bin/env sh
set -eu

# apply environment variables to default.conf
envsubst '$ADMIN_DOMAIN, $API_DOMAIN' < /etc/nginx/conf.d/app.conf.template > /etc/nginx/conf.d/default.conf

############### CONFIG /ETC/NGINX/NGINX.CONF ##################
sed -i 's/.*worker_connections.*/worker_connections 50000;/g' /etc/nginx/nginx.conf
############### END CONFIG /ETCNGINX/NGINX.CONF ###############

exec nginx -g "daemon off;"

exec "$@"