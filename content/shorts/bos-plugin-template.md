---
navigation:
  title: 'Bos Plugin Template'
  description: 'Bos Plugin Template'
  date: '2023-12-04'
  tags: ['bos']
  views: '64'
---

# 批量新增行

```java
public class orderproreqbillFromEdit extends AbstractFormPlugin {

    @Override
    public void afterDoOperation(AfterDoOperationEventArgs args)
    {
        super.afterDoOperation(args);
        String operateKey = args.getOperateKey();
        OperationResult operationResult = args.getOperationResult();
        if ("batchcreate".equals(operateKey) && operationResult.isSuccess()) {
            this.getModel().batchCreateNewEntryRow("分录标识",10);
        }
    }
}
```

# 查询单据（一张）

```java
DynamicObject dynamicObject = BusinessDataServiceHelper.loadSingle("单据标识", "id,billno,billstatus,分录标识,分录标识.字段标识",
                new QFilter[]{new QFilter("字段", QCP.equals, "过滤值")});
        dynamicObject.set("标识","赋值");
        SaveServiceHelper.save(new DynamicObject[]{dynamicObject});
```

# 定时任务

!!! abstract 文档
[https://developer.kingdee.com/article/226086468627134208?productLineId=29](https://developer.kingdee.com/article/226086468627134208?productLineId=29)

!!!

```java
public class ResourceFilterTask extends AbstractTask
{
    @Override
    public void execute(RequestContext requestContext, Map<String, Object> map) throws KDException
    {

    }
}
```

# 查询一张单据

```java
DynamicObject resource = BusinessDataServiceHelper.loadSingle(dynamicObject.getLong("标识.id"),"标识");
```

# 查询多张单据

```java
DynamicObject[] basemodelib = BusinessDataServiceHelper.load("标识", "id", null);
```

# 代码执行操作（提交，审核，反审核）

```java
OperationServiceHelper.executeOperate("disable", resource.getDynamicObjectType().getName(), new DynamicObject[]{resource}, Utils.getOption());
```

# 服务插件获取子单据体

```java
for(DynamicObject entity: entities)
{
    // 收款单 收款明细
    DynamicObjectCollection collection = entity.getDynamicObjectCollection("标识");
    if(collection.isEmpty())
    {
        continue;
    }
    for(DynamicObject dynamicObject: collection)
    {
        // 认领明细（子单据体）
        DynamicObjectCollection subCollection = dynamicObject.getDynamicObjectCollection("标识");
        if(subCollection.isEmpty())
        {
            continue;
        }
    }
}
```

# 根据人员携带部门

```java
/**
 * 根据申请人携带所属部门
 */
private void bringDept()
{
    DynamicObject dataEntity = this.getModel().getDataEntity();
    long applyUser = dataEntity.getLong("标识.id");
    if(applyUser > 0)
    {
        DynamicObject mainUserdep = CommonUtils.getMainUserdep(applyUser);
        if(mainUserdep != null)
        {
            this.getModel().setValue("标识", mainUserdep.getLong("id"));
        }
        else
        {
            this.getModel().setValue("标识", null);
        }
    }
    else
    {
        this.getModel().setValue("标识", null);
    }
}
```

# 单据体行着色

```java
EntryGrid entryGrid = this.getControl("标识");
entryGrid.setRowBackcolor("rgba(251,35,35,0.1)", rows.stream().mapToInt(Integer::intValue).toArray());
```

# 代码设置字段必录

```java
FieldEdit control = this.getView().getControl("标识");
control.setMustInput(true);
```

# 单据体新增行

```java
IDataModel model = this.getModel();
int entryRow = model.createNewEntryRow("分录标识");
model.setValue("字段标识", "P", entryRow);
```

# 附件回填

## 表单插件

```java
public class AttachmentbackfillEdit extends AbstractBillPlugIn
{

    /**
     * order 1
     * 打开
     * 从单据中获取需要在动态表单显示的内容，将其以参数传入动态表单
     */
    @Override
    public void itemClick(ItemClickEvent evt)
    {
        super.itemClick(evt);
        String key = evt.getItemKey();
        // 判断是否为添加附件（回填）按钮
        if (StringUtils.equals("tpv_backfill", key)) {
            // 创建弹出动态表单页面对象
            FormShowParameter showParameter = new FormShowParameter();
            // 设置弹出页面的标识
            showParameter.setFormId("tpv_app_back_dialog");
            DynamicObject dataEntity = this.getModel().getDataEntity(true);
            Map<String, Object> map = new HashMap<>();
            // 获取申请人
            DynamicObject applier = dataEntity.getDynamicObject("tpv_applier");

            if (applier != null) {
                map.put("tpv_applier", applier.getLong("id"));
            } else {
                this.getView().showMessage("申请人不能为空");
                return;
            }
            // 获取申请单号
            String billno = dataEntity.getString("billno");
            if (billno != null) {
                map.put("tpv_billno", billno);
            } else {
                this.getView().showMessage("申请单号不能为空");
                return;
            }
            // 获取附件字段的值
            DynamicObjectCollection attachment = dataEntity.getDynamicObjectCollection("tpv_attachment");
            if (attachment != null && !attachment.isEmpty()) {
                // 获取源附件字段附件对象id集合
                List<Long> attachmentIdSet = new ArrayList<>();
                attachment.forEach(attach ->
                {
                    attachmentIdSet.add(attach.getDynamicObject("fbasedataId").getLong("id"));
                });
                // 判断附件数据是否为空
                if (!attachmentIdSet.isEmpty()) {
                    map.put("tpv_attachment", attachmentIdSet);
                }
            }

            // 存入获取到的动态表单数据
            showParameter.setCustomParams(map);
            // 状态
            showParameter.setStatus(OperationStatus.ADDNEW);
            // 设置页面关闭回调方法
            showParameter.setCloseCallBack(new CloseCallBack(this, "tpv_backfill"));
            // 设置弹出页面打开方式
            showParameter.getOpenStyle().setShowType(ShowType.Modal);
            // 打开动态表单
            this.getView().showForm(showParameter);
        }
    }

    /**
     * Order 4
     * 动态表单关闭回调事件
     */
    @Override
    public void closedCallBack(ClosedCallBackEvent e)
    {
        Object returnData = e.getReturnData();
        // 判断标识是否匹配，并验证返回值不为空，不验证返回值可能会报空指针
        if (StringUtils.equals(e.getActionId(), "tpv_backfill")
                && null != e.getReturnData()) {
            @SuppressWarnings("unchecked")
            HashMap<String, Object> values = (HashMap<String, Object>) returnData;
            this.setInwardInfo(values);
        }
    }

    /**
     * Order 5
     * 动态表单通过 returnDataToParent(map) 返回的数据设置到源单据中
     */
    private void setInwardInfo(Map<String, Object> map)
    {
        IDataModel model = this.getModel();
        if (map.containsKey("tpv_attachment") && map.get("tpv_attachment") != null) {
            @SuppressWarnings("unchecked")
            List<Long> attachIdSet = (List<Long>) map.get("tpv_attachment");
            if (!attachIdSet.isEmpty()) {
                model.setValue("tpv_attachment", attachIdSet.toArray());
            }
            // 设置附件数量
            model.setValue("tpv_attachmentcount", attachIdSet.size());
        } else {
            model.setValue("tpv_attachment", null);
            model.setValue("tpv_attachmentcount", 0);
        }
        this.getView().invokeOperation("save");
    }
}
```

## 动态表单插件

```java
public class DynamicFormEdit extends AbstractBillPlugIn
{
    // 监听页面按钮点击
    @Override
    public void registerListener(EventObject e)
    {
        super.registerListener(e);
        this.addClickListeners("btncancel", "btnok"); // 监听确认和取消按钮
    }

    /**
     * Order 2
     * 打开
     * 打开动态表单之后获取原单数据，并将其显示到动态表单上
     * 获取showParameter.setCustomParams(map);中设置的参数
     */
    @Override
    public void afterCreateNewData(EventObject e)
    {
        super.afterCreateNewData(e);
        FormShowParameter showParameter = this.getView().getFormShowParameter();
        Map<String, Object> maps = showParameter.getCustomParams();
        Long applier = (Long) maps.get("tpv_applier");//用户
        this.getModel().setValue("tpv_applier", applier);
        String billno = (String) maps.get("tpv_billno");//单据编号
        this.getModel().setValue("tpv_billno", billno);
        if (maps.containsKey("tpv_attachment") && maps.get("tpv_attachment") != null) {
            @SuppressWarnings("unchecked")
            List<Long> attachIdSet = (List<Long>) maps.get("tpv_attachment");
            if (!attachIdSet.isEmpty()) {
                this.getModel().setValue("tpv_attachment", attachIdSet.toArray());
            }
        }
    }

    /**
     * Order 3
     * 关闭，将动态表单上内容返回给源单据，通过returnDataToParent(map)
     * 点击动态表单上取消or确认按钮
     */
    @Override
    public void click(EventObject evt)
    {
        super.click(evt);
        // 获取被点击的控件对象
        Control source = (Control) evt.getSource();
        // 点击确认按钮
        if (StringUtils.equals(source.getKey(), "btnok")) {
            HashMap<String, Object> map = new HashMap<>();
            DynamicObject dateEntity = this.getModel().getDataEntity(true);
            DynamicObjectCollection attachment = (DynamicObjectCollection) dateEntity.get("tpv_attachment");
            if (attachment != null && !attachment.isEmpty()) {
                // 获取源附件字段附件对象id集合
                List<Long> attachmentIdSet = new ArrayList<>();
                attachment.forEach(attach ->
                {
                    attachmentIdSet.add(attach.getDynamicObject("fbasedataId").getLong("id"));
                });
                // 判断附件数据是否为空
                if (!attachmentIdSet.isEmpty()) {
                    map.put("tpv_attachment", attachmentIdSet);
                }
            }
            this.getView().returnDataToParent(map);
            this.getView().close();
        } else if (StringUtils.equals(source.getKey(), "btncancel")) {
            // 被点击控件为取消则设置返回值为空并关闭页面（在页面关闭回调方法中必须验证返回值不为空，否则会报空指针）
            this.getView().returnDataToParent(null);
            this.getView().close();
        }
    }
}
```

# 遍历Map

```java [id:Entry]
for (Map.Entry<String, Integer> entry : map.entrySet()) {
    System.out.println(entry.getKey() + ":" + entry.getValue());
}
```

```java [id:forEach]
map.forEach((k, v) -> System.out.println((k + ":" + v)));
```

```java [id:Stream]
map.entrySet().stream()
    .forEach(e -> System.out.println(e.getKey() + ":" + e.getValue()));
```

# 列表过滤

```java
public class listFilter extends AbstractListPlugin
{
    @Override
    public void setFilter(SetFilterEvent e)
    {
        List<QFilter> qFilterList = e.getQFilters();
        qFilterList.add(new QFilter("标识", QCP.equals, "B"));
    }
}

```

# 从附件面板获取附件

```java
AttachmentPanel panel = this.getControl("标识"))
List<Map<String, Object>> attachmentData = panel.getAttachmentData();
```

# 下推 单据转换插件

```java
public class ShippingDetailToTransferOrderConvert extends AbstractConvertPlugIn
{
    @Override
    public void afterConvert(AfterConvertEventArgs e)
    {
        super.afterConvert(e);
        // 目标单据
        String targetName = this.getTgtMainType().getName();
        // 来源单据
        String sourceName = this.getSrcMainType().getName();
        if (!"标识".equals(targetName) || !"标识".equals(sourceName)) {
            return;
        }
        ExtendedDataEntity[] findByEntityKeys = e.getTargetExtDataEntitySet().FindByEntityKey(targetName);
        for (ExtendedDataEntity findByEntityKey : findByEntityKeys) {
            // origin data
            DynamicObject dataEntity = findByEntityKey.getDataEntity();
            long sourcebillid = dataEntity.getLong("标识");
            DynamicObject sourceEntryData = BusinessDataServiceHelper.loadSingle(sourcebillid, sourceName);
            // 商品明细
            DynamicObjectCollection materialinfo = sourceEntryData.getDynamicObjectCollection("标识");

            // 出运汇总
            DynamicObjectCollection salesorderTotal = sourceEntryData.getDynamicObjectCollection("标识");

            Map<Long, DynamicObjectCollection> map = new LinkedHashMap<>();

            for (DynamicObject object : salesorderTotal) {

                // 明细行号ID
                long id = object.getLong("标识");

                for (DynamicObject materialinfoEntitiy : materialinfo) {
                    if (id == materialinfoEntitiy.getLong("id")) {
                        map.put(object.getLong("id"), materialinfoEntitiy.getDynamicObjectCollection("标识"));
                    }
                }
            }

            DynamicObjectCollection targetMaterialinfo = dataEntity.getDynamicObjectCollection("标识");
            for (DynamicObject object : targetMaterialinfo) {
                long sourceentryid = object.getLong("标识");
                if (map.containsKey(sourceentryid)) {
                    DynamicObjectCollection multiconfig = object.getDynamicObjectCollection("标识");
                    multiconfig.addAll(map.get(sourceentryid));
                }
            }
        }
    }
}
```

# 从附件面板获取附件

```java
AttachmentServiceHelper.getAttachments("单据标识", file.getPkValue().toString(), "附件面板标识");
```

# 代码赋值，但不触发值更新

```java
this.getModel().beginInit();
model.setValue("标识", calcedTotalWeight, index);
this.getView().updateView("标识");
this.getModel().endInit();
```

# 打开单据

```java
public static void OpenFrom(IFormView view, Object okid, String Formid)
{
    BillShowParameter parameter = new BillShowParameter(); //跳转指定单据
    parameter.setPkId(okid);
    parameter.getOpenStyle().setShowType(ShowType.MainNewTabPage);
    parameter.setFormId(Formid);
    parameter.setStatus(OperationStatus.EDIT);
    view.showForm(parameter);
}
```

# 附件回填

## 动态表单

```java
public class ContractResignEdit extends AbstractFormPlugin implements UploadListener
{
    private static final Log log = LogFactory.getLog(ContractResignEdit.class);

    @Override
    public void registerListener(EventObject e)
    {
        super.registerListener(e);

        AttachmentPanel attachmentPanel = this.getView().getControl("附件面板");
        attachmentPanel.addUploadListener(this);

        this.addClickListeners("btncancel", "btnok");
    }

    @Override
    public void beforeUpload(BeforeUploadEvent evt) {
        UploadListener.super.beforeUpload(evt);
        IPageCache pageCache = this.getView().getPageCache();
        pageCache.put("falg", null);
    }

    @Override
    public void afterUpload(UploadEvent evt) {
        this.addAttachmentContext(this.getModel(), this.getView());
        IPageCache pageCache = this.getView().getPageCache();
        pageCache.put("falg", null);
    }

    private void addAttachmentContext(IDataModel model, IFormView view) {
        IPageCache cache = this.getPageCache();
        List<Map<String, Object>> addAttachmentData = getCache(cache);

        cache.put("attach", addAttachmentData.toString());
        log.error("上传附件之后：" + addAttachmentData);
    }

    @Override
    public void upload(UploadEvent evt) {
        Object[] urls = evt.getUrls();
        IPageCache cache = this.getPageCache();
        List<Map<String, Object>> addAttachmentData = getCache(cache);
        for (Object url : urls) {
            @SuppressWarnings("unchecked")
            Map<String, Object> att = (Map<String, Object>) url;
            addAttachmentData.add(att);
            log.error("上传附件：" + addAttachmentData);
        }
        cache.put("attach", JSONObject.toJSONString(addAttachmentData));
    }

    @Override
    public void remove(UploadEvent evt) {
        this.removeAttachmentContext(this.getView(), this.getModel(), evt);
    }

    private void removeAttachmentContext(IFormView view, IDataModel model, UploadEvent evt) {
        IFormView parentView = view.getParentView();
        AttachmentPanel panel = parentView.getControl("附件面板");
        AttachmentPanel source = (AttachmentPanel) evt.getSource();

        IPageCache cache = this.getPageCache();
        List<Map<String, Object>> addAttachmentData = getCache(cache);

        Object[] urls = evt.getUrls();
        for (Object url : urls) {
            @SuppressWarnings("unchecked")
            Map<String, Object> att = (Map<String, Object>) url;
            panel.remove(att);

            for (int i = 0; i < addAttachmentData.size(); i++) {
                Map<String, Object> map = addAttachmentData.get(i);
                if (map.get("name").equals(att.get("name"))) {
                    addAttachmentData.remove(i);
                }
            }
        }
        cache.put("attach", JSONObject.toJSONString(addAttachmentData));
        log.error("删除附件：" + addAttachmentData);
        evt.setCancel(true);
        List<Map<String, Object>> attachmentData = panel.getAttachmentData();
        attachmentData.addAll(addAttachmentData);
        source.bindData(attachmentData);
        parentView.invokeOperation("refresh");
        view.sendFormAction(parentView);
    }

    @Override
    public void click(EventObject e)
    {
        super.click(e);
        Control source = (Control) e.getSource();
        String key = source.getKey();
        if ("btncancel".equals(key)) {
            this.getView().returnDataToParent(null);
            this.getView().close();
        }
        if ("btnok".equals(key)) {
            btnOk();
        }
    }

    private void btnOk() {
        DynamicObject dataEntity = this.getModel().getDataEntity();
        HashMap<String, Object> hashMap = new HashMap<>();
        IPageCache cache = this.getPageCache();
        List<Map<String, Object>> addAttachmentData = getCache(cache);
        hashMap.put("attach", addAttachmentData);
        long user = dataEntity.getLong("用户.id");
        Date date = dataEntity.getDate("日期");
        hashMap.put("user", user);
        hashMap.put("date", date);
        log.error("关闭界面之前：" + addAttachmentData);
        this.getView().returnDataToParent(hashMap);
        this.getView().close();
        addAttachmentData.clear();//关闭界面清空上传附件
        log.error("关闭界面：" + addAttachmentData);
    }

    @Override
    public void afterCreateNewData(EventObject e) {
        super.afterCreateNewData(e);
        this.creadteAttach(this.getView(), this.getModel(), e);
        IPageCache cache = this.getPageCache();
        List<Map<String, Object>> addAttachmentData = getCache(cache);
        log.error("刷新界面" + addAttachmentData);
    }

    private void creadteAttach(IFormView view, IDataModel model, EventObject e) {
        FormShowParameter showParameter = view.getFormShowParameter();
        List<String> filtername = new ArrayList<>();
        List<Map<String, Object>> attach = showParameter.getCustomParam("attach");
        if (attach != null && attach.size() > 0) {
            AttachmentPanel panel = view.getControl("附件面板");
            for (Map<String, Object> map : attach) {
                map.put("lastModified", new Date().getTime());
                filtername.add((String)map.get("name"));
            }
            panel.upload(attach);
            view.updateView("附件面板");

        }
    }

    /**
     * 从缓存中获取附件
     * @param cache
     * @return
     */
    private List<Map<String, Object>> getCache(IPageCache cache) {
        String attach = cache.get("attach");
        List<Map<String, Object>> addAttachmentData = null;
        if (attach != null) {
            addAttachmentData = getJson(attach) == null ? new ArrayList<>() : getJson(attach);
        }else {
            addAttachmentData = new ArrayList<>();
        }
        return addAttachmentData;
    }

    /**
     * 将从缓存中取到的附件转换成List<Map<String,Object>>
     * @param attach
     * @return
     */
    @SuppressWarnings("unchecked")
    private List<Map<String, Object>> getJson(String attach) {
        List<Object> parseArray = (List<Object>) JSONArray.parseObject(attach, List.class);
        List<Map<String, Object>> List = new ArrayList<>();
        for (Object parse : parseArray) {
            Map<String, Object> map = (Map<String, Object>) parse;
            List.add(map);
        }
        return List;
    }
}
```

## 单据

```java
@Override
public void beforeDoOperation(BeforeDoOperationEventArgs e)
{
    // 双签附件回填
    if("contractresigning".equals(operateKey))
    {
        String billstatus = dataEntity.getString("billstatus");
        if("C".equals(billstatus))
        {
            FormShowParameter parameter = new FormShowParameter();
            parameter.setStatus(OperationStatus.ADDNEW);
            parameter.getOpenStyle().setShowType(ShowType.Modal);
            parameter.setFormId("动态表单标识");
            parameter.setCloseCallBack(new CloseCallBack(this, "关闭标识"));
            view.showForm(parameter);
        }
        else
        {
            this.getView().showErrorNotification("当前合同还未审核，不允许回签！");
        }
    }
}

public void putAttachmentData(Map < String, Object > attachInfor, IDataModel modal, IFormView view)
{
    String entityId = view.getEntityId();
    view.invokeOperation("refresh");
    if(attachInfor != null)
    {
        List < Map < String, Object >> retData = (List < Map < String, Object >> ) attachInfor.get("attach");
        Long userId = (Long) attachInfor.get("user");
        Date date = (Date) attachInfor.get("date");
        DynamicObject dataEntity = modal.getDataEntity(true);
        // ...
        if(retData != null && !retData.isEmpty())
        {
            for(Map < String, Object > map: retData)
            {
                String url = (String) map.get("url");
                String name = (String) map.get("name");
                // 持久化附件到服务器
                url = SalesOrderUtils.uploadTempfile(url, name);
                map.put("url", url);
                map.put("creator", UserServiceHelper.getCurrentUserId());
                map.put("modifytime", new Date().getTime());
            }
            AttachmentServiceHelper.upload(entityId, dataEntity.getPkValue(), "yem_attachmentpanelap", retData);
        }
        SaveServiceHelper.save(new DynamicObject[]
        {
            dataEntity
        });
        view.invokeOperation("refresh");
    }
}

@Override
public void closedCallBack(ClosedCallBackEvent e)
{
    if("关闭标识".equals(actionId))
    {
        putAttachmentData((Map < String, Object > ) returnData, this.getModel(), this.getView());
    }
}

// 附件持久化
public static String uploadTempfile(String url, String name)
{
    TempFileCache cache = CacheFactory.getCommonCacheFactory().getTempFileCache();
    InputStream in = cache.getInputStream(url);
    FileService service = FileServiceFactory.getAttachmentFileService();
    RequestContext requestContext = RequestContext.get();
    String uuid = UUID.randomUUID().toString().replace("-", "");
    // 生成文件路径-上传附件时远程服务器需要存储文件的位置
    String pathParam = FileNameUtils.getAttachmentFileName(requestContext.getTenantId(), requestContext.getAccountId(), uuid, name);
    FileItem fileItem = new FileItem(name, pathParam, in );
    // 上传附件到文件服务器
    return service.upload(fileItem);
}
```

# 行政组织/业务单元通过上级组织

```java
List<Long> ids = new ArrayList<>();
long orgId = org.getLong("id");
ids.add(orgId);
QFilter qFilter = new QFilter("org.id", QCP.equals, orgId);
// 业务单元视图默认方案
qFilter.and(new QFilter("view.number", QCP.equals, "15"));
DynamicObject single = BusinessDataServiceHelper.loadSingle("bos_org_structure", qFilter.toArray());
if (single == null) return;
List<Long> allSubordinateOrgs = OrgUnitServiceHelper.getAllSubordinateOrgs(single.getString("parent.number"), ids, true);
QFilter qFilterA = new QFilter("id", QCP.in, allSubordinateOrgs);
e.addCustomQFilter(qFilterA);
```

# BigDecimal比较大小

```java
if (a.compareTo(b) == -1){
    System.out.println("a小于b");
}
if (a.compareTo(b) == 0){
    System.out.println("a等于b");
}
if (a.compareTo(b) == 1){
    System.out.println("a大于b");
}
if (a.compareTo(b) > -1){
    System.out.println("a大于等于b");
}
if (a.compareTo(b) < 1){
    System.out.println("a小于等于b");
}
```

# 多选基础资料取值

```java
DynamicObjectCollection shipports = dataEntity.getDynamicObjectCollection("shipports");
DynamicObject dynamicObject = shipports.getDynamicObject("fbasedataid");
dynamicObject.getString("namecn")
```
