---
navigation:
  title: 'Bos Plugin lifecycle'
  description: '金蝶Bos中各类插件执行顺序'
  date: '2023-11-28'
  tags: ['bos']
  views: '21'
---

# AbstractBillPlugIn

用于配置业务规则。（如值更新、按钮点击事件）

!!! abstract SDK
[https://dev.kingdee.com/sdk/Cosmic%20V6.0.1/index.html?nav=class&module=kd.bos.svc.watermark&package=kd.bos.form.plugin&name=AbstractFormPlugin](https://dev.kingdee.com/sdk/Cosmic%20V6.0.1/index.html?nav=class&module=kd.bos.svc.watermark&package=kd.bos.form.plugin&name=AbstractFormPlugin)
!!!

| 分类                     | 事件                   | 触发时机                                                                       |
| ------------------------ | ---------------------- | ------------------------------------------------------------------------------ |
| 界面显示前               | setPluginName          | 显示界面，准备构建界面显示配置formConfig前，构建插件时触发此事件，传入脚本名称 |
| 显示界面前               | preOpenForm            | 显示界面前，准备构建界面显示参数时，触发此事件                                 |
| 显示界面前               | loadCustomControlMetas | 显示界面前，构建界面显示参数时，触发事件                                       |
| 界面初始化               | setView                | 表单视图模型初始化，创建插件时调用此方法，向插件传入表单视图模型IFOrmView      |
| 界面初始化               | initialize             | 表单视图模型初始化，创建插件后，触发                                           |
| 界面初始化               | registerListener       | 于表单控件发生交互时触发                                                       |
| 界面初始化               | getEntityType          | 表单基于实体模型，创建数据包之前触发                                           |
| 页面初始化或刷新         | createNewData          | 页面初始化或刷新，开始新建数据包之前触发                                       |
| 页面初始化或刷新         | afterCreateNewData     | 页面初始化或刷新，新建数据包完成之后触发                                       |
| 界面数据包构建完成       | afterBindData          | 界面数据包构建完成，生成指令，刷新值，状态之后触发                             |
| 用户交互事件             | beforeItemClick        | 用户点击时，执行操作之前                                                       |
| 用户交互事件             | itemClick              | 用户点击时触发                                                                 |
| 用户交互事件             | beforeDoOperation      | 用户点击按钮，菜单，执行绑定操作前                                             |
| 用户交互事件             | afterDoOperation       | 用户点击按钮，菜单，执行绑定操作之后                                           |
| 用户交互事件             | confirmCallBack        | 前端交互提示确认后，通知插件后续处理                                           |
| 用户交互事件             | closedCallBack         | 子界面关闭时，父界面触发                                                       |
| 用户交互事件             | flexBeforeClosed       | 弹性域维护界面关闭时，触发父界面此事件                                         |
| 获取控件时               | onGetControl           | getControl时触发                                                               |
| 触发自定义控件的定制事件 | customEvent            | 触发自定义控件的定制事件                                                       |
| 定时触发                 | timerElapsed           | 定时触发                                                                       |
| 界面关闭                 | beforeClosed           | 界面关闭之后触发                                                               |
| 界面关闭                 | destory                | 界面关闭后，释放资源时触发                                                     |
| 界面关闭                 | pageRelease            | 界面关闭后，释放资源时触发                                                     |

# AbstractOperationServicePlugIn

!!! abstract SDK
[https://dev.kingdee.com/sdk/Cosmic%20V6.0.1/index.html?nav=class&module=kd.bos.kddm&package=kd.bos.entity.plugin&name=IOperationServicePlugIn](https://dev.kingdee.com/sdk/Cosmic%20V6.0.1/index.html?nav=class&module=kd.bos.kddm&package=kd.bos.entity.plugin&name=IOperationServicePlugIn)
!!!

| 事件                              | 触发时机                                                                                                                                       |
| --------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------- |
| onPreparePropertys                | 在单据列表上执行单据操作，系统需要先根据传入的单据内码，加载单据数据包；在加载单据数据包之前，触发此事件；插件需要在此事件，添加需要用到的字段 |
| onAddValidators                   | 系统预置的操作校验器加载完毕，执行校验之前，触发此事件                                                                                         |
| beforeExecuteOperationTransaction | 校验通过，开启事务之前触发，对数据进行预处理                                                                                                   |
| beginOperationTransaction         | 校验通过，事务开启之后，数据提交到数据库之前触发                                                                                               |
| rollbackOperation                 | 事务更新失败，回滚之后触发                                                                                                                     |
| endOperationTransaction           | 数据更新已提交，事务未提交之前触发                                                                                                             |
| afterExecuteOperationTransaction  | 操作执行之后，事务提交之后触发                                                                                                                 |
| onReturnOperation                 | 操作结束时触发此事件                                                                                                                           |

# AbstractFormPlugin

| 事件                  | 触发时机                             |
| --------------------- | ------------------------------------ |
| addClickListeners     | 监听控件的点击事件（如按钮点击）     |
| addItemClickListeners | 监听控件的的子项点击事件（如工具栏） |
| afterBindData         | 表单界面数据绑定完毕事件             |
| afterDoOperation      | 表单操作结束事件                     |
| beforeBindData        | 表单界面数据绑定前事件               |
| beforeClick           | 控件点击前事件                       |
| beforeClosed          | 关闭表单前事件                       |
| beforeDoOperation     | 表单操作前事件                       |
| click                 | 控件点击事件                         |
| closedCallBack        | 子界面关闭后的回调事件               |
| itemClick             | 控件子项点击事件                     |
