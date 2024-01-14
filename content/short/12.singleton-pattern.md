---
navigation:
  title: 'Singleton Pattern'
  description: 'Singleton Pattern Template'
  date: '2023-12-01'
  tags: ['codesnap']
  views: '26'
---

```java
public class DateUtils {
    private static DateUtils instance;

    private DateUtils() {
        // 私有构造函数，防止外部实例化
    }

    public static DateUtils getInstance() {
        if (instance == null) {
            synchronized (DateUtils.class) {
                if (instance == null) {
                    instance = new DateUtils();
                }
            }
        }
        return instance;
    }

    public int getYear(Date date) {
        Calendar calendar = Calendar.getInstance();
        calendar.setTime(date);
        return calendar.get(Calendar.YEAR);
    }
}
```
