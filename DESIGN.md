# 个人博客系统设计文档 (Personal Blog System Design Doc)

## 1. 设计理念：配置驱动 (Configuration-Driven)

为了实现“后期可直接在页面配置”的目标，本系统将采用**数据与视图分离**的架构。所有的页面文案、布局开关、主题颜色、菜单导航等，都将由统一的**配置对象 (`SiteConfig`)** 控制，而不是硬编码在组件中。

**核心优势：**
*   **灵活性：** 修改配置文件即可改变网站外观和内容。
*   **可扩展性：** 未来开发“管理后台”时，只需开发一个表单来修改这个 JSON 配置对象即可实现可视化编辑。

## 2. 系统架构

*   **框架:** Next.js 16 (App Router)
*   **语言:** TypeScript
*   **样式:** Tailwind CSS v4 (配合 CSS Variables 实现动态主题)
*   **内容源:** 
    *   **文章:** MDX 文件 (本地文件系统)
    *   **配置:** TypeScript/JSON 配置文件 (作为 Mock 数据库)
*   **图标:** Lucide React

## 3. 数据模型设计

### 3.1 站点全局配置 (`SiteConfig`)

这是实现“页面配置模式”的核心数据结构。

```typescript
export interface SiteConfig {
  // 基础信息
  siteName: string;
  description: string;
  author: string;
  baseUrl: string;
  
  // 导航栏配置
  nav: {
    items: Array<{ label: string; href: string; newTab?: boolean }>;
    showSearch: boolean;
    showThemeToggle: boolean;
  };

  // 首页 Hero 区域配置
  hero: {
    enabled: boolean;
    title: string;
    subtitle: string;
    avatar?: string; // 头像/Logo图片路径
    backgroundImage?: string; // 背景图
    ctaButton: { // 行动号召按钮
      label: string;
      href: string;
      enabled: boolean;
    };
  };

  // 社交链接
  socials: Array<{ platform: 'github' | 'twitter' | 'linkedin' | 'mail'; url: string }>;

  // 底部配置
  footer: {
    copyright: string;
    links: Array<{ label: string; href: string }>;
  };
  
  // 主题配置 (CSS Variables 映射)
  theme: {
    primaryColor: string; // 主色调
    borderRadius: string; // 圆角风格
  };
}
```

### 3.2 文章元数据 (`PostMetadata`)

```typescript
export interface PostMetadata {
  title: string;
  publishedAt: string;
  summary: string;
  image?: string; // 封面图
  tags: string[];
  slug: string;
}
```

## 4. 组件架构 (Component Architecture)

组件将设计为“哑组件 (Dumb Components)”，只负责接收 Props 并渲染，不包含业务逻辑。

### 4.1 布局组件
*   `ThemeProvider`: 负责读取配置并将颜色变量注入到 CSS 变量中 (利用 Tailwind v4 特性)。
*   `Header`: 读取 `SiteConfig.nav` 渲染菜单。
*   `Footer`: 读取 `SiteConfig.footer` 渲染底部。

### 4.2 首页组件 (按区块划分，可开关)
*   `HeroSection`: 展示欢迎语、头像、CTA 按钮。通过 `SiteConfig.hero.enabled` 控制显示。
*   `FeaturedPosts`: 展示精选/最新文章。
*   `RecentPosts`: 文章列表。

### 4.3 博客组件
*   `PostCard`: 文章卡片组件。
*   `PostList`: 文章列表容器。
*   `PostHeader`: 文章详情页头部（标题、日期、标签）。
*   `MDXContent`: MDX 渲染器。

## 5. 样式与主题策略

使用 Tailwind CSS v4 的 CSS 变量支持来实现动态换肤。

**implementation:**
在 `globals.css` 中定义基础变量，但在 `ThemeProvider` (Client Component) 中根据配置动态修改这些变量的值。

```css
:root {
  --primary: 222.2 47.4% 11.2%; /* HSL values */
  --radius: 0.5rem;
}
```

未来如果有了管理后台，用户拖动颜色选择器，直接修改 `--primary` 的值即可实时预览。

## 6. 实施步骤

1.  **定义配置结构:** 创建 `src/config/site.ts` 并定义类型接口。
2.  **封装主题逻辑:** 创建 `src/components/common/theme-provider.tsx`。
3.  **开发基础 UI 组件:** Button, Card, Container (基于 Shadcn/ui 理念但简化版)。
4.  **开发布局组件:** 实现 Header 和 Footer，对接配置数据。
5.  **开发首页:** 实现 Hero 区域和文章列表区域。
6.  **开发文章页:** 集成 MDX 解析逻辑。
