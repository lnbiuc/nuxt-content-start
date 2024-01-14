---
navigation:
  title: 'DruidDataSource Config'
  description: 'DruidDataSource Config'
  date: '2023-11-26'
  cover: 'https://r2-img.lnbiuc.com/blog/2023/11/6afab03f0daeb37aabb6bd9ab5cac4e8.png'
  tags: ['druid', 'springboot']
  views: '12'
---

```yaml
spring:
  datasource:
    type: com.alibaba.druid.pool.DruidDataSource
    driver-class-name: com.mysql.cj.jdbc.Driver
    url: jdbc:mysql://d-mysql:3306/share?useUnicode=true&useSSL=false&characterEncoding=utf8&serverTimezone=Asia/Shanghai
    username: root
    password: mysqlforserver@date0913
    druid:
      initial-size: 50
      min-idle: 20
      max-active: 100
      max-wait: 60000
      time-between-eviction-runs-millis: 60000
      min-evictable-idle-time-millis: 300000
      validation-query: SELECT 1 FROM DUAL
      test-while-idle: true
      test-on-borrow: false
      test-on-return: false
      filter:
        stat:
          db-type: mysql
          enabled: true
          log-slow-sql: true
          slow-sql-millis: 2000
        slf4j:
          enabled: true
          statement-log-enabled: true
          statement-create-after-log-enabled: false
          connection-close-after-log-enabled: false
          result-set-open-after-log-enabled: false
          result-set-close-after-log-enabled: false
      stat-view-servlet:
        enabled: true
        url-pattern: /druid/*
        reset-enable: false
        login-username: root
        login-password: Dd112211
        allow: 0.0.0.0/0
```
