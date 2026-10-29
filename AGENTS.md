# AGENTS.md · AI 开发规范

本文件是 AI 辅助开发本项目的**行为准则**，每次开发会话开始前必须阅读。项目需求以 `docs/PRD.md`、技术方案以 `docs/技术设计文档.md` 为准。

## 1. 项目底线（不可违反）

- 前端技术栈：**Vue 3 + Vite**，单页应用（SPA），组件化开发
- 后端技术栈：**Node.js + Express + MySQL**，提供 RESTful API
- 数据库：**MySQL**（本地用 Navicat 管理），4 张表（profile/tags/works/journey）
- 样式集中在 `src/styles/style.css`，使用 `:root` CSS 变量管理配色
- 设计风格必须为**复古杂志风**（配色与字体以技术设计文档第 3.3 节为准），不得照搬通用模板
- 前端构建产物在 `dist/`，后端在 `server/`，部署时分别处理

## 2. 开发流程

1. 先读 `docs/PRD.md` 确认本次要做的功能编号（F1~F7），只做计划内功能，不擅自加需求
2. **小步提交**：每完成一个功能块（如 Hero 区、作品卡片）立即本地验证 + Git 提交一次，提交信息格式：`feat: 完成XX板块` / `fix: 修复XX问题`
3. 修改样式时优先改动 CSS 变量与对应板块的选择器，**一次只改一处**，出问题便于回退
4. 每个功能完成后自查：控制台无报错、手机端 375px 无横向滚动

## 3. 代码规范

### 前端
- 每个板块一个 Vue 单文件组件，放在 `src/components/`，命名 PascalCase
- 所有样式集中在 `src/styles/style.css`，不写内联样式（scoped 样式除外）
- 颜色/字体一律使用 `:root` 中的 CSS 变量，禁止散落硬编码色值
- 数据通过 `src/api/` 封装的 axios 从后端获取，不硬编码在组件里
- 代码注释用中文，只注释不直观的逻辑

### 后端
- 路由放在 `server/routes/`，按资源分文件（profile/tags/works/journey）
- 数据库连接池在 `server/db.js`，路由中通过 `pool` 操作数据库
- 需要鉴权的接口使用 `requireAdmin` 中间件，校验 `x-admin-password` 请求头
- 数据库连接信息放在 `server/.env`，不硬编码

## 4. 遇到 Bug 时

1. 先 F12 看控制台与网络面板定位前后端归属（本项目纯前端，多为样式/脚本问题）
2. 不确定原因时用二分法注释代码缩小范围
3. AI 连续两次修改无效 → `git checkout -- <文件>` 回退，整理更多上下文后重新提问
4. Bug 修复后立即验证相关板块无回归

## 5. 完成定义（Done）

- [ ] 功能在 PC 与手机端均正常显示
- [ ] 控制台无报错、无 404
- [ ] 已 Git 提交
- [ ] 全部功能完成后：`npm run build` 通过，部署 Cloudflare Pages，无痕窗口验证域名可访问
