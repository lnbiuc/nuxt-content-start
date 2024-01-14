---
navigation:
  title: 'My Docker run Script'
  description: 'My Docker run Script'
  date: '2023-11-26'
  cover: 'https://r2-img.lnbiuc.com/blog/2023/11/8d145e155e2bf2c1b69c235fe81200b6.jpg'
  tags: ['docker']
  views: '13'
---

## Network

```shell
docker network create --subnet 192.168.0.0/16 --gateway 192.168.0.1 docker-net
```

> 192.168.0.0/16：子网范围
>
> 192.168.0.1：网关地址
>
> docker-net：子网名称

### 加入网络

!!! attention Network

- 在docker启动参数中加入`--net docker-net`

- 容器启动之后，使用命令`docker network connect docker-net <容器ID/NAME>`
  !!!

## Redis

```shell
docker run -d --name d-redis \
-p 6379:6379 \
-v /data/redis/config:/usr/local/etc/redis \
-v /data/redis/data:/data \
--restart always \
--memory="500m" \
--network docker-net \
--ip 192.168.0.2 \
-e REDIS_MAXMEMORY=500mb \
-e REDIS_MAXMEMORY_POLICY=allkeys-lru \
redis redis-server /usr/local/etc/redis/redis.conf
```

### Config

```shell
vi redis.conf

requirepass <pwd>
```

## MySQL

```shell
docker run -d \
  --name d-mysql \
  -p 3306:3306 \
  -v /data/mysql/conf:/etc/mysql \
  -v /data/mysql/data:/var/lib/mysql \
  -v /data/mysql/log:/var/log/mysql \
  --restart always \
  --memory 1G \
  --net docker-net \
  --ip 192.168.0.3 \
  -e MYSQL_ROOT_PASSWORD=pwd \
  mysql:8.0.25
```

### Config

!!! abstract 启动参数

- -e MYSQL_ROOT_PASSWORD=mysqlpwd

- -e MYSQL_USER=username：容器启动时创建一个用户

- -e MYSQL_PASSWORD=pwa：该用户的密码

!!!
!!! abstract 开启远程访问

```shell
docker exec -it d-mysql /bin/bash
```

```shell
mysql -uroot -p

grant all privileges on *.* to 'root'@'%';

FLUSH PRIVILEGES;

exit
```

!!!

!!! abstract 数据导出

```shell
mysqldump -uroot -p --databases <database name> >/data/mysql/data-backup.sql
```

sql文件复制到容器外

```shell
docker cp /data/mysql/data-backup.sql mysql:/home/
```

使用sql文件

```shell
# 将文件复制到容器内，连接到mysql后执行
source data-backup.sql
```

!!!

## NO Config

```shell
docker run -d \
  --name d-mysql \
  -p 3306:3306 \
  --restart always \
  --memory 1G \
  --net docker-net \
  --ip 192.168.0.3 \
  -e MYSQL_ROOT_PASSWORD=pwd \
  mysql:8.0.25
```

## Nginx

```shell
docker run -d \
  --name nginx \
  -p 80:80 \
  -p 443:443 \
  --network docker-net \
  --ip 192.168.0.6 \
  -v /data/nginx/html:/usr/share/nginx/html \
  -v /data/nginx/nginx:/etc/nginx \
  -v /data/nginx/log:/var/log/nginx \
  -v /etc/localtime:/etc/localtime:ro \
  --restart always \
  --memory 200m \
  nginx

```

# Mongod

```shell
docker run -d \
  --name mongodb \
  -p 27017:27017 \
  -v /data/mongo/data:/data/db \
  -v /data/mongo/config:/data/configdb \
  -v /data/mongo/logs:/var/log/mongodb \
  -e MONGO_INITDB_ROOT_USERNAME=root \
  -e MONGO_INITDB_ROOT_PASSWORD=root \
  --restart always \
  --memory 200m \
  --network docker-net \
  mongo
```

## Build SpringBoot Image

- src下创建Dockerfile

```Dockerfile
FROM openjdk:8
LABEL maintainer=lnbiuc
COPY ./*.jar /app.jar
ENTRYPOINT ["java","-jar","/app.jar"]
```

- Build

```shell
docker build -t <imageNname>:<version> .
```
