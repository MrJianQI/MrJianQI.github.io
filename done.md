1. [x] 根据 TODO.md 创建了项目的基本目录结构 (src/app, src/components, src/lib, content 等) 及基础文件 (mdx.ts, utils.ts, globals.css)
2. [x] 初始化 Next.js 项目环境：安装依赖 (next, react, tailwindcss 等)，配置 tsconfig.json, tailwind.config.ts, postcss.config.js, next.config.mjs，并创建基础页面 (layout.tsx, page.tsx, globals.css)
3. [x] 修复 Tailwind CSS v4 与 PostCSS 的集成问题：安装 `@tailwindcss/postcss` 并更新 `postcss.config.js` 配置
4. [x] 编写 `DESIGN.md` 设计文档，确立配置驱动 (Configuration-Driven) 的开发架构
5. [x] 实现基础配置架构：创建 `src/config/site.ts` 并定义 `SiteConfig` 接口及默认配置
6. [x] 开发基础 UI 组件：实现 `Container`, `Header`, `Footer` 组件并集成 `siteConfig`
7. [x] 开发首页 Hero 区域：实现 `HeroSection` 组件并支持通过配置开关及文案修改
8. [x] 集成布局：更新 `layout.tsx` 和 `page.tsx`，组装 Header, Footer 和 HeroSection
9. [x] 视觉风格升级：引入 Shadcn UI 风格的色彩系统和排版变量，全面优化 Header、Hero 和 Footer 的视觉质感
10. [x] 修复构建报错：移除 `globals.css` 中引发 Tailwind v4 解析错误的 `@apply` 自定义类，彻底解决构建问题
11. [x] 实现博客核心功能：
    - 集成 `gray-matter` 和 `next-mdx-remote` 处理 MDX 内容
    - 实现文章列表页 (`/blog`) 和详情页 (`/blog/[slug]`)
    - 开发 `PostCard` 和 `RecentPosts` 组件
    - 引入 `@tailwindcss/typography` 优化文章排版
12. [x] 彻底解决样式丢失：迁移 `globals.css` 到 Tailwind v4 标准语法，通过清理缓存和优化 CSS变量定义确保样式正常加载
13. [x] 实现代码高亮：集成 `rehype-pretty-code` 和 `shiki`，配置 GitHub Dark/Light 双主题，并创建测试文章
14. [x] 实现暗黑模式：集成 `next-themes`，开发 `ThemeToggle` 组件，并支持一键切换系统主题
15. [x] 优化样式兼容性：修复 Tailwind v4 下暗黑模式变体失效的问题，并解决代码块在日间模式下的对比度缺陷
16. [x] 实现标签系统：扩展 MDX 工具函数支持标签查询，开发 `/tags` 索引页和 `/tags/[tag]` 详情页，并实现标签全链路跳转
17. [x] 集成 CMS 后台：引入 Keystatic，重构路由为 `(site)` 和 `keystatic` 分离架构，实现 `/keystatic` 可视化内容管理
18. [x] 重构内容管理系统：
    - 移除 Keystatic 及其依赖，解决兼容性问题
    - 实现自定义 Markdown 上传 API (`/api/upload`)，支持自动生成 Frontmatter
    - 开发 `UploadForm` 组件，支持在前端填写元数据并上传 Markdown 正文
    - 将上传功能直接集成到博客列表页 (`/blog`)，采用可折叠式设计，优化用户体验
    - 优化 `src/lib/mdx.ts` 数据处理层，增强日期格式的容错性
    - 解决博客列表页缓存问题：在 `/blog` 页面强制启用动态渲染 (`force-dynamic`)，确保新上传的文章能够立即显示
19. [x] 细节体验优化：
    - 修复上传接口的文件名生成逻辑：增强 `generateSlug` 函数对非 ASCII 字符（如中文标题）的支持，防止生成空白文件名
    - 实现 `PostCard` 全卡片点击：通过 CSS 技巧使整个文章卡片区域可点击，提升导航便利性
    - 优化文章排序逻辑：在 `src/lib/mdx.ts` 中确保所有博客列表（包括首页和列表页）均按照发布时间降序排列（最新文章在前）
    - 优化 404 页面：将内容移至全站统一的根布局（包含 Header/Footer），采用简洁居中的设计风格，并引导用户快速返回首页
    - 增强 About 页面：将静态的 "Tech Stack" 卡片升级为动态的 "Topics" 统计模块，自动聚合所有文章标签并按热度排序展示20. [x] 优化导航栏：从头部菜单中移除冗余的 'Home' 链接，并新增 'Tags' 入口，提升标签系统的可访问性
21. [x] 初始化静态资源结构：创建 'public/images/posts' 目录，用于统一管理博客文章的图片及其他静态资源
22. [x] 优化图片展示：实现 MDX 自定义图片组件，自动将 Markdown 图片的 Alt 文本渲染为下方的居中图注 (Caption)，提升阅读体验
23. [x] 优化文件存储安全与隐私：将上传文件的命名策略改为基于内容的 MD5 哈希码，实现了 URL 与元数据的彻底解耦，并自动解决了标题冲突问题
24. [x] 增强 Markdown 渲染能力：集成 'remark-gfm' 插件，支持删除线、表格、任务列表等 GitHub Flavored Markdown 扩展语法
25. [x] 优化标签选择体验：在上传表单中实现交互式标签组件，支持自动加载现有热门标签、点击添加、回车创建新标签以及可视化删除功能
26. [x] 增强数据层健壮性：在 MDX 解析阶段强制转换 'title' 和 'summary' 为字符串，防止因纯数字标题导致的系统崩溃
27. [x] 全站 UI 架构一致性优化：将 Header、Footer 及 ThemeProvider 迁移至根布局 (Root Layout)，确保包括 404 页面在内的所有路径均拥有统一的视觉框架
28. [x] 极致上传交互优化：为 'UploadForm' 引入平滑动画、成功后自动收起、以及外置定时消失的反馈消息
29. [x] 适配静态部署：在 'UploadForm' 组件中增加环境检查，在生产环境 () 下自动隐藏上传功能，确保项目可安全部署至 GitHub Pages 等静态托管平台
29. [x] 适配静态部署：在 UploadForm 组件中增加环境检查，在生产环境下自动隐藏上传功能，确保项目可安全部署至 GitHub Pages
30. [x] 适配静态导出：在 next.config.mjs 中配置 output: "export" 并禁用图片优化 (unoptimized: true)，使项目能够构建为纯静态 HTML 文件，满足 GitHub Pages 的托管要求
31. [x] 修复构建编译错误：移除冗余的 TypeScript 忽略指令，并优化 MDX 插件的类型兼容性，确保打包流程顺畅
32. [x] 完善静态导出架构：将标签 API 标记为 'force-static' 以支持静态数据持久化，并暂时屏蔽本地开发专用的上传 API 路径，彻底解决 GitHub Pages 部署前的构建冲突
33. [x] 优化博客列表性能：实现 PostList 客户端组件，增加“加载更多”分页功能，并修复因组件缺失导致的构建错误
34. [x] 适配静态导出：移除博客列表页的 force-dynamic 配置，确保全站兼容 output: export 模式
35. [!] 重要开发提示：当前上传功能接口存放在 'src/app/api/_upload'。本地开发如需使用上传功能，请暂时去掉下划线重命名为 'upload'；执行 'npm run build' 静态构建前，务必确保其带有下划线前缀以避免构建错误
36. [x] 实现自动化部署流水线：创建 GitHub Actions 工作流配置文件，支持将全站源代码托管于 GitHub 的同时，自动构建并发布至 GitHub Pages，简化发布流程并确保源码安全
