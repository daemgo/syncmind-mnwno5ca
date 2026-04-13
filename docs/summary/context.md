# 项目上下文

---
### 2026-04-13
**Skills**: init-app
**变更**: 生成产品展示网站 Demo

- 系统类型：产品展示网站
- 模块：Dashboard 首页 + 产品管理（列表+详情）
- 数据来源：用户对话

**项目结构**:
- 预置组件：src/components/layout/（app-shell、sidebar）、src/components/biz/（data-table、data-filter、form-dialog）
- 根布局：src/routes/__root.tsx（AppShell + 菜单配置）
- 字典数据：src/lib/dict-data.ts
- Dashboard：src/routes/index.tsx
- 模块路由：src/routes/products/（index.tsx 列表页 + $id.tsx 详情页）
- Mock 数据：src/mock/product.ts
- 类型定义：src/types/product.ts

---
### 2026-04-13
**Skills**: requirements
**变更**: docs/customer/requirements.json

- 为国彩真空生成冷启动版需求文档（v0.1）
- 推演 11 条需求（5条业务 + 3条功能 + 2条技术），全部 confidence=low，source.type=profile-inference
- 推演 4 个用户角色：生产主管、质检员、跟单员、老板（李进汉）
- 生成 10 个待验证问题（必问5 + 选问5），覆盖业务/预算/时间/决策链
- 完成度 22%，3 个 must 级别 blocker 待首访验证
- 方案建议分三期：一期订单与追溯、二期生产与设备、三期客户与扩展

**待跟进**: 首访后补充验证需求，推演版本升至 v0.2

---
### 2026-04-13（下午）
**Skills**: requirements
**变更**: docs/customer/requirements.json（更新）

- 为国彩真空（温州市国彩真空科技有限公司）补充完整需求文档
- 推演 11 条需求（must 6 / should 4 / could 1），全部 confidence=low
- 用户角色：生产主管、质检员、跟单员、老板李进汉
- 生成 10 个待验证问题（5 必问 + 5 选问）
- 完成度 22%，3 个 must 级别 blocker 待首访验证

**待跟进**: 运行 /sales-guide 生成销售作战指南，准备首次拜访
