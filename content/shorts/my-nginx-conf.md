---
navigation:
  title: 'My nginx.conf'
  description: 'My nginx.conf'
  date: '2023-11-26'
  cover: 'https://r2-img.lnbiuc.com/blog/2023/11/bbf8b10006c6f68f301dea26c3746dd4.png'
  tags: ['nginx']
  views: '14'
---

```nginx
error_log /var/log/nginx/error.log;
pid /run/nginx.pid;

include /usr/share/nginx/modules/*.conf;

events {
    worker_connections 4096;
}

http {
    log_format  main  '$remote_addr - $remote_user [$time_local] "$request" '
                      '$status $body_bytes_sent "$http_referer" '
                      '"$http_user_agent" "$http_x_forwarded_for"';
    server_tokens off;
    access_log  /var/log/nginx/access.log  main buffer=32k flush=5s;
    sendfile            on;
    tcp_nopush          on;
    tcp_nodelay         on;
    keepalive_timeout   65;
    types_hash_max_size 2048;

    include             /etc/nginx/mime.types;
    default_type        application/octet-stream;
    include /etc/nginx/conf.d/*.conf;
    etag on;
    gzip on;
    gzip_static on;
    gzip_min_length 1k;
    gzip_comp_level 7;
    gzip_buffers 4 16k;
    gzip_http_version 1.1;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;
    gzip_vary on;

    server {
        listen *:80;
        listen [::]:80;
        server_name vio.vin;

        return 301 https://vio.vin$request_uri;
    }

    server {
        listen *:443 ssl http2;
        listen [::]:443  ssl http2;
        server_name vio.vin;
        ssl on;
        ssl_certificate vio.vin_bundle.crt;
        ssl_certificate_key vio.vin.key;
        ssl_session_timeout 5m;
        ssl_protocols TLSv1.2 TLSv1.3;
        ssl_ciphers 'ECDHE-RSA-AES128-GCM-SHA256:ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES256-GCM-SHA384:ECDHE-ECDSA-AES256-GCM-SHA384:DHE-RSA-AES128-GCM-SHA256:DHE-DSS-AES128-GCM-SHA256:kEDH+AESGCM:ECDHE-RSA-AES128-SHA256:ECDHE-ECDSA-AES128-SHA256:ECDHE-RSA-AES128-SHA:ECDHE-ECDSA-AES128-SHA:ECDHE-RSA-AES256-SHA384:ECDHE-ECDSA-AES256-SHA384:ECDHE-RSA-AES256-SHA:ECDHE-ECDSA-AES256-SHA:DHE-RSA-AES128-SHA256:DHE-RSA-AES128-SHA:DHE-DSS-AES128-SHA256:DHE-RSA-AES256-SHA256:DHE-DSS-AES256-SHA:DHE-RSA-AES256-SHA:ECDHE-RSA-DES-CBC3-SHA:ECDHE-ECDSA-DES-CBC3-SHA:AES128-GCM-SHA256:AES256-GCM-SHA384:AES128-SHA256:AES256-SHA256:AES128-SHA:AES256-SHA:AES:DES-CBC3-SHA:HIGH:!aNULL:!eNULL:!EXPORT:!DES:!RC4:!MD5:!PSK:!aECDH:!EDH-DSS-DES-CBC3-SHA:!EDH-RSA-DES-CBC3-SHA:!KRB5-DES-CBC3-SHA';

        ssl_prefer_server_ciphers on;

        ssl_session_cache   shared:SSL:10m;
        ssl_session_tickets on;
        ssl_stapling        on;
        ssl_stapling_verify on;
        add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;
        client_max_body_size 10m;
        keepalive_timeout   70;
        include /etc/nginx/default.d/*.conf;

        location / {
                root /usr/share/nginx/html;
                index index.html;
                try_files $uri $uri/ /index.html;
        }

        location ~ /api/ {
                proxy_pass http://blog-api:8888;
        }

        error_page 404 /404.html;
            location = /40x.html {
        }

        error_page 500 502 503 504 /50x.html;
            location = /50x.html {
        }
    }
}

```
