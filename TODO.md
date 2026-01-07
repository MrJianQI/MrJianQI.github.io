# 个人博客项目实施计划

本文档概述了构建高性能、可扩展且现代化的博客前端路线图。

## 🛠 技术栈选择 (推荐)
- **框架:** Next.js 14+ (App Router)
- **语言:** TypeScript
- **样式:** Tailwind CSS
- **UI 组件库:** Shadcn UI / Radix UI (无样式、易访问的组件)
- **内容管理:** MDX (本地优先，后续易于迁移至 CMS)
- **图标:** Lucide React

---

## 📅 第一阶段：基础搭建与项目初始化
- [ ] **项目初始化**
    - [ ] 初始化 Next.js，配置 TypeScript, Tailwind 和 ESLint。
    - [ ] 配置路径别名 (`@/*` 映射至 `src/*`)。
- [ ] **代码清理**
    - [ ] 移除 Next.js 默认生成的样板代码。
    - [ ] 设置全局样式文件 `globals.css`，配置用于主题切换的 CSS 变量（亮色/暗色模式）。

---

## 📂 第二阶段：可扩展的目录结构
*为整洁、模块化的代码库构建骨架。*

- [ ] **`src/app/`**: 路由段与页面布局。
- [ ] **`src/components/`**: 
    - `ui/`: 可复用的基础原子组件 (Button, Input, Card)。
    - `common/`: 共享的布局组件 (Header, Footer, Navigation)。
    - `blog/`: 博客专属组件 (PostCard, PostContent, TableOfContents)。
- [ ] **`src/lib/`**: 核心逻辑、API 封装和工具函数 (例如：`mdx.ts`, `utils.ts`)。
- [ ] **`src/hooks/`**: 自定义 React Hooks，用于共享逻辑。
- [ ] **`src/types/`**: 全局 TypeScript 接口与类型定义。
- [ ] **`src/styles/`**: 额外的全局样式或 Tailwind 插件。
- [ ] **`content/`**: (位于 src 之外) 存放 `.mdx` 文件 (文章、片段)。

---

## 🚀 第三阶段：核心功能 (开发计划)
- [ ] **博客逻辑**
    - [ ] MDX 文件处理逻辑 (读取文件、解析 frontmatter)。
    - [ ] 实现静态网站生成 (SSG) 以确保极速加载。
- [ ] **SEO 与 元数据**
    - [ ] 为每篇文章动态生成 Metadata。
    - [ ] 生成 Sitemap (站点地图) 和 RSS 订阅源。
- [ ] **UI/UX 增强**
    - [ ] 响应式设计 (移动端优先)。
    - [ ] 通过 `next-themes` 支持深色模式。
    - [ ] 为代码块添加语法高亮。

---

## 🛠 第四阶段：后续可扩展性考虑
- [ ] **CMS 就绪:** 在 `lib/` 中抽象数据获取逻辑，以便日后将 MDX 替换为 Contentful/Strapi。
- [ ] **搜索功能:** 集成本地搜索或 Algolia 支持。
- [ ] **订阅服务:** 集成邮件订阅组件/服务。
- [ ] **评论系统:** 支持 Giscus 或 Commento。