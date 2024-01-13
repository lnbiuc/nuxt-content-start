---
navigation:
  title: 'Java SensitiveData Annotation'
  description: '基于注解实现Java接口返回数据数据自动脱敏'
  date: '2023-11-26'
  cover: 'https://r2-img.lnbiuc.com/blog/2023/11/8c77f212d294ed473fb8f30099205cb2.jpg'
  tags: ['java']
  views: '10'
---

# Annotation

```java
@Retention(RetentionPolicy.RUNTIME)
@Target(ElementType.FIELD)
@JacksonAnnotationsInside
@JsonSerialize(using = SensitiveSerialize.class)
public @interface SensitiveData
{
    /**
     * 脱敏数据类型
     */
    SensitiveTypeEnum type() default SensitiveTypeEnum.CUSTOMER;

    /**
     * 前置不需要打码的长度
     */
    int prefixNoMaskLen() default 0;

    /**
     * 后置不需要打码的长度
     */
    int suffixNoMaskLen() default 0;

    /**
     * 用什么打码
     */
    String symbol() default "*";
}
```

# SensitiveSerialize

```java
@NoArgsConstructor
@AllArgsConstructor
public class SensitiveSerialize extends JsonSerializer<String> implements ContextualSerializer
{

    /**
     * 脱敏类型
     */
    private SensitiveTypeEnum sensitiveTypeEnum;

    /**
     * 前几位不脱敏
     */
    private Integer prefixNoMaskLen;

    /**
     * 最后几位不脱敏
     */
    private Integer suffixNoMaskLen;

    /**
     * 用什么打码
     */
    private String symbol;

    @Override
    public void serialize(final String origin, final JsonGenerator jsonGenerator,
                          final SerializerProvider serializerProvider) throws IOException
    {
        switch (sensitiveTypeEnum) {
            case CUSTOMER:
                jsonGenerator.writeString(DesensitizedUtils.desValue(origin, prefixNoMaskLen, suffixNoMaskLen, symbol));
                break;
            case NAME:
                jsonGenerator.writeString(DesensitizedUtils.chineseName(origin));
                break;
            case ID_NUM:
                jsonGenerator.writeString(DesensitizedUtils.idCardNum(origin));
                break;
            case PHONE_NUM:
                jsonGenerator.writeString(DesensitizedUtils.mobilePhone(origin));
                break;
            case EMAIL:
                jsonGenerator.writeString(DesensitizedUtils.email(origin));
                break;
            default:
                throw new IllegalArgumentException("unknown sensitive type enum " + sensitiveTypeEnum);
        }
    }

    @Override
    public JsonSerializer<?> createContextual(final SerializerProvider serializerProvider,
                                              final BeanProperty beanProperty) throws JsonMappingException
    {
        if (beanProperty != null) {
            if (Objects.equals(beanProperty.getType().getRawClass(), String.class)) {
                SensitiveData sensitive = beanProperty.getAnnotation(SensitiveData.class);
                if (sensitive == null) {
                    sensitive = beanProperty.getContextAnnotation(SensitiveData.class);
                }
                if (sensitive != null) {
                    return new SensitiveSerialize(sensitive.type(), sensitive.prefixNoMaskLen(),
                            sensitive.suffixNoMaskLen(), sensitive.symbol());
                }
            }
            return serializerProvider.findValueSerializer(beanProperty.getType(), beanProperty);
        }
        return serializerProvider.findNullValueSerializer(null);
    }
}

```

# SensitiveTypeEnum

```java
package vin.vio.blognextapi.model.common;

public enum SensitiveTypeEnum {
    /**
     * 自定义
     */
    CUSTOMER,
    /**
     * 姓名
     */
    NAME,
    /**
     * 身份证
     */
    ID_NUM,
    /**
     * 手机号码
     */
    PHONE_NUM,

    /**
     * 邮箱
     */
    EMAIL;
}
```

# DesensitizedUtils

```java
public class DesensitizedUtils {

    /**
     * 对字符串进行脱敏操作
     *
     * @param origin          原始字符串
     * @param prefixNoMaskLen 左侧需要保留几位明文字段
     * @param suffixNoMaskLen 右侧需要保留几位明文字段
     * @param maskStr         用于遮罩的字符串, 如'*'
     * @return 脱敏后结果
     */
    public static String desValue(String origin, int prefixNoMaskLen, int suffixNoMaskLen, String maskStr) {
        if (origin == null) {
            return null;
        }

        StringBuilder sb = new StringBuilder();
        for (int i = 0, n = origin.length(); i < n; i++) {
            if (i < prefixNoMaskLen) {
                sb.append(origin.charAt(i));
                continue;
            }
            if (i > (n - suffixNoMaskLen - 1)) {
                sb.append(origin.charAt(i));
                continue;
            }
            sb.append(maskStr);
        }
        return sb.toString();
    }

    /**
     * 【中文姓名】只显示最后一个汉字，其他隐藏为星号，比如：**梦
     *
     * @param fullName 姓名
     * @return 结果
     */
    public static String chineseName(String fullName) {
        if (fullName == null) {
            return null;
        }
        return desValue(fullName, 1, 0, "*");
    }

    /**
     * 【身份证号】显示前4位, 后2位，其他隐藏。
     *
     * @param id 身份证号码
     * @return 结果
     */
    public static String idCardNum(String id) {
        return desValue(id, 4, 2, "*");
    }

    /**
     * 【手机号码】前三位，后四位，其他隐藏。
     *
     * @param num 手机号码
     * @return 结果
     */
    public static String mobilePhone(String num) {
        return desValue(num, 3, 4, "*");
    }

    public static String email(String email) {
        return desValue(email, 3, 4, "*");
    }
}

```
