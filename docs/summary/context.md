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
