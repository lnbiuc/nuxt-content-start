---
navigation:
  title: 'Blog BUG Track'
  description: '记录目前Blog存在的bug和修复计划'
  date: '2023-12-03'
  tags: ['bug']
  views: '27'
---

# Bug

- [x] 🔍 搜索功能响应数据为空
- [ ] 🔍 搜索功能优化（接入第三方搜索）
- [ ] admin自动保存只有在有更改之后才开启
- [x] twitter卡片不显示
- [ ] md-ediitor-v3 theme亮色时显示错误
- [ ] 修改自动保存逻辑，文字编辑过之后固定15秒更新，`ctrl` + `s`立即更新

# Feat

- [x] 主页添加feated article、short、project
- [ ] 文章底部添加上一篇和下一篇卡片
- [ ] 无限滚动
- [ ] 点赞功能
- [ ] AI生成摘要功能
- [ ] 路由切换时，保留已请求的数据（将请求数据缓存到pinia中）
- [x] 响应的数据中包含类型信息（article、short、project）
- [ ] project页面重绘
- [ ] ~~自动隐藏，显示的header~~
- [x] 写一篇完整的about
- [x] 返回顶部按钮
- [ ] 手机端响应式header
- [x] 首页字体
- [ ] 获取GitHub贡献图，在首页显示
- [ ] Java根据文章内容生成twitter卡片图（参考Github图）
- [x] 缓存，缓存更新
- [x] redis统计文章阅读数，定时写入mongo
- [ ] RSS
- [ ] read later，从telegram接收消息，写入read later列表
- [ ] 文章如果有更新，定时以文件形式提交到GitHub，文件头中写入发布时间、更新时间、分类、标签信息
- [ ] project卡片左上角添加吵右上角的新标签页打开提示
- [ ] 鼠标悬停在link上时，显示连接对应网页画面
- [x] header中颜色动态变化
