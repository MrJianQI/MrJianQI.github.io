export interface SiteConfig {
  siteName: string;
  description: string;
  author: string;
  baseUrl: string;
  
  nav: {
    items: Array<{ label: string; href: string; newTab?: boolean }>;
    showSearch: boolean;
    showThemeToggle: boolean;
  };

  hero: {
    enabled: boolean;
    title: string;
    subtitle: string;
    avatar?: string;
    ctaButton: {
      label: string;
      href: string;
      enabled: boolean;
    };
  };

  socials: Array<{ platform: 'github' | 'twitter' | 'linkedin' | 'mail'; url: string }>;

  footer: {
    copyright: string;
    links: Array<{ label: string; href: string }>;
  };
}

export const siteConfig: SiteConfig = {
  siteName: "My Tech Blog",
  description: "A personal blog about software engineering, design, and life.",
  author: "Developer",
  baseUrl: "https://example.com",
  
  nav: {
    items: [
      { label: "Blog", href: "/blog" },
      { label: "Tags", href: "/tags" },
      { label: "About", href: "/about" },
    ],
    showSearch: false,
    showThemeToggle: true,
  },

  hero: {
    enabled: true,
    title: "Hi, I'm a Developer.",
    subtitle: "I write code, design systems, and share my learning journey here.",
    ctaButton: {
      label: "Read my blog",
      href: "/blog",
      enabled: true,
    },
  },

  socials: [
    { platform: "github", url: "https://github.com" },
    { platform: "twitter", url: "https://twitter.com" },
  ],

  footer: {
    copyright: "© 2024 My Tech Blog. All rights reserved.",
    links: [
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms of Service", href: "/terms" },
    ],
  },
};
