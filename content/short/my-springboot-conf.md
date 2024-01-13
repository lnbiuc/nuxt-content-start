---
navigation:
  title: 'My SpringBoot Config'
  description: 'My SpringBoot Config'
  date: '2023-11-26'
  cover: 'https://r2-img.lnbiuc.com/blog/2023/11/d600c05160dcc48e3fc3473609f1b8a6.png'
  tags: ['springboot']
  views: '6'
---

# application.yaml

```yaml
spring:
  datasource:
    driver-class-name: com.mysql.cj.jdbc.Driver
    url: jdbc:mysql://localhost:3306/my_blog?useUnicode=true&useSSL=false&characterEncoding=utf8&serverTimezone=Asia/Shanghai
    username: root
    password: 123456
  redis:
    database: 0
    host: 127.0.0.1
    port: 6379
    password: test
    jedis:
      pool:
        min-idle: 0
        max-active: 8
        max-idle: 8
        max-wait: -1ms
    connect-timeout: 30000ms
  cache:
    type: redis
    redis:
      time-to-live: 24h
  servlet:
    multipart:
      max-file-size: 10MB
      max-request-size: 20MB
  mvc:
    static-path-pattern: /static/**
mybatis-plus:
  # configuration:
  # log-impl: org.apache.ibatis.logging.stdout.StdOutImpl
  global-config:
    db-config:
      cache-enabled: true
      table-prefix: blog_
      logic-delete-field: deleted
      logic-delete-value: 1
      logic-not-delete-value: 0
logging:
  file:
    path: log
  logback:
    rollingpolicy:
      clean-history-on-start: true
      max-file-size: 5MB
server:
  port: 8888
  servlet:
    context-path: /api
```

use mongodb

```yaml
spring:
  data:
    mongodb:
      host: 127.0.0.1
      port: 27017
      username: name
      password: pwd
      database: dbname
      authentication-database: admin
```

# Redis序列化配置

```java
@Configuration
@EnableCaching
public class RedisConfig extends CachingConfigurerSupport
{
    @Bean
    public CacheManager cacheManager(RedisConnectionFactory factory)
    {
        RedisSerializer<String> redisSerializer = new StringRedisSerializer();
        // 配置序列化（解决乱码的问题）
        RedisCacheConfiguration config = RedisCacheConfiguration.defaultCacheConfig()
                .entryTtl(Duration.ofHours(3))
                .serializeKeysWith(RedisSerializationContext.SerializationPair.fromSerializer(redisSerializer))
                .serializeValuesWith(RedisSerializationContext.SerializationPair.fromSerializer(serializer()))
                .disableCachingNullValues();

        return RedisCacheManager.builder(factory)
                .cacheDefaults(config)
                .build();
    }

    /**
     * RedisTemplate配置
     */
    @Bean
    public RedisTemplate<String, Object> redisTemplate(RedisConnectionFactory redisConnectionFactory)
    {
        RedisTemplate<String, Object> redisTemplate = new RedisTemplate<>();
        redisTemplate.setConnectionFactory(redisConnectionFactory);
        // 用Jackson2JsonRedisSerializer来序列化和反序列化redis的value值
        redisTemplate.setValueSerializer(serializer());

        StringRedisSerializer stringRedisSerializer = new StringRedisSerializer();
        // 使用StringRedisSerializer来序列化和反序列化redis的key值
        redisTemplate.setKeySerializer(stringRedisSerializer);

        // hash的key也采用String的序列化方式
        redisTemplate.setHashKeySerializer(stringRedisSerializer);
        // hash的value序列化方式采用jackson
        redisTemplate.setHashValueSerializer(serializer());
        redisTemplate.afterPropertiesSet();
        return redisTemplate;
    }

    private Jackson2JsonRedisSerializer<Object> serializer()
    {
        // 使用Jackson2JsonRedisSerializer来序列化和反序列化redis的value值
        Jackson2JsonRedisSerializer<Object> jackson2JsonRedisSerializer = new Jackson2JsonRedisSerializer<>(Object.class);
        ObjectMapper objectMapper = new ObjectMapper();

        // 指定要序列化的域，field,get和set,以及修饰符范围，ANY是都有包括private和public
        objectMapper.setVisibility(PropertyAccessor.ALL, JsonAutoDetect.Visibility.ANY);

        // 指定序列化输入的类型，类必须是非final修饰的，final修饰的类，比如String,Integer等会跑出异常
        objectMapper.activateDefaultTyping(LaissezFaireSubTypeValidator.instance, ObjectMapper.DefaultTyping.NON_FINAL);

        jackson2JsonRedisSerializer.setObjectMapper(objectMapper);
        return jackson2JsonRedisSerializer;
    }
}
```

# CORS配置

```java
@Component
@Slf4j
public class CORSFilter implements Filter
{
    @Override
    public void doFilter(ServletRequest servletRequest, ServletResponse servletResponse, FilterChain filterChain)
            throws IOException, ServletException
    {
        HttpServletResponse response = (HttpServletResponse) servletResponse;
        HttpServletRequest request = (HttpServletRequest) servletRequest;
        //放行所有,类似*,这里*无效
        response.setHeader("Access-Control-Allow-Origin", request.getHeader("Origin"));
        response.setHeader("Access-Control-Allow-Credentials", "true");
        //允许请求方式
        response.setHeader("Access-Control-Allow-Methods", "POST,PUT, GET, OPTIONS, DELETE");
        response.setHeader("Access-Control-Max-Age", "3600");
        //需要放行header头部字段 如需鉴权字段，自行添加，如Authorization
        response.setHeader("Access-Control-Allow-Headers",
                "content-type,x-requested-with,token,Authorization,authorization");
        try
        {
            filterChain.doFilter(request, response);
        } catch (Exception e)
        {
            log.error("CORS过滤器放行异常:", e);
        }
    }

    @Override
    public void init(FilterConfig filterConfig)
    {

    }

    @Override
    public void destroy()
    {
        Filter.super.destroy();
    }
}
```

# 授权过滤器

```java
@Configuration
public class AuthFilter implements WebMvcConfigurer
{
    private final AuthInterceptor authInterceptor;

    public AuthFilter(AuthInterceptor authInterceptor)
    {
        this.authInterceptor = authInterceptor;
    }

    @Override
    public void addInterceptors(InterceptorRegistry registry)
    {
        registry.addInterceptor(authInterceptor).addPathPatterns("/v1/auth").order(2);
        WebMvcConfigurer.super.addInterceptors(registry);
    }
}

@Configuration
@Slf4j
public class AuthInterceptor implements HandlerInterceptor
{
    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception
    {
        String token = request.getHeader("Authorization");
        if (token == null)
        {
            response.setStatus(401);
            return false;
        }
        JWT jwt = TokenUtils.parseToken(token);
        JSONObject payloads = jwt.getPayloads();
        Long userId = payloads.getLong("userId");
        String userName = payloads.getStr("userName");
        if (userId != null && userName != null)
        {
            log.info("=============AUTHED-start=================");
            log.info("请求方式:{}", request.getMethod());
            log.info("请求参数:{}", JSON.toJSONString(request.getParameterMap()));
            log.info("IP地址:{}", request.getRemoteAddr());
            log.info("用户{}({})请求接口{}", userName, userId, request.getRequestURI());
            log.info("=============AUTHED-end===================");
            return true;
        } else
        {
            response.setStatus(401);
            return false;
        }
    }

    @Override
    public void postHandle(HttpServletRequest request, HttpServletResponse response, Object handler, ModelAndView modelAndView) throws Exception
    {
        HandlerInterceptor.super.postHandle(request, response, handler, modelAndView);
    }

    @Override
    public void afterCompletion(HttpServletRequest request, HttpServletResponse response, Object handler, Exception ex) throws Exception
    {
        HandlerInterceptor.super.afterCompletion(request, response, handler, ex);
    }
}
```

# CommonResponse

```java
@Data
@Builder
public class RespData<T>
{
    /*
    状态码
     */
    private Integer code;

    /*
    返回消息
     */
    private String message;

    /*
    时间标签
     */
    private Date timestamp;

    /*
    返回数据
     */
    private T data;

    /**
     * 请求成功无返回数据
     * @return null
     * @param <T> RespData.type
     */
    public static <T> RespData<T> success()
    {
        return success(null);
    }

    /**
     * 请求成功 返回数据
     * @param data 需要返回的数据
     * @return RespData
     * @param <T> RespData.type
     */
    public static <T> RespData<T> success(T data)
    {
        return RespData.<T>builder().data(data)
                .code(RespStatus.SUCCESS.getStatusCode())
                .message(RespStatus.SUCCESS.getDescription())
                .timestamp(new Date())
                .data(data)
                .build();

    }

    /**
     * 请求失败
     * @param message 需要返回失败消息
     * @return 返回失败消息
     * @param <T> RespData.type
     */
    public static <T extends Serializable> RespData<T> fail(String message)
    {
        return fail(null,message);
    }

    /**
     * 请求失败，返回数据
     * @param data 需要返回的数据
     * @param message 失败信息
     * @return 返回失败消息 + 数据
     * @param <T> RespData.type
     */
    public static <T> RespData<T> fail(T data,String message)
    {
        return RespData.<T>builder()
                .code(RespStatus.FAIL.getStatusCode())
                .message(message)
                .timestamp(new Date())
                .data(data)
                .build();
    }
}
```

# 线程池配置

```java
@Configuration
//开启多线程
@EnableAsync
public class ThreadPoolConfig
{
    @Bean("taskExecutor")
    public Executor asyncServiceExecutor()
    {
        ThreadPoolTaskExecutor executor = new ThreadPoolTaskExecutor();
        //核心线程数
        executor.setCorePoolSize(5);
        //最大线程数
        executor.setMaxPoolSize(20);
        //队列大小
        executor.setQueueCapacity(Integer.MAX_VALUE);
        //线程活跃时间（秒）
        executor.setKeepAliveSeconds(120);
        //默认线程名
        executor.setThreadNamePrefix("viewCountAsyncExecutor");
        //所有任务结束再关闭线程池 true
        executor.setWaitForTasksToCompleteOnShutdown(true);
        //执行初始化
        executor.initialize();
        return executor;
    }
}
```
