export NODE_OPTIONS=--openssl-legacy-provider
$env:NODE_OPTIONS = "--openssl-legacy-provider"
pm2 start npm --name "bqs music" -- start