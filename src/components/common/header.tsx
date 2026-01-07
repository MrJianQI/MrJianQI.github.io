import Link from 'next/link';
import { siteConfig } from '@/config/site';
import { Container } from '@/components/ui/container';
import { ThemeToggle } from '@/components/common/theme-toggle';

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <Container>
        <div className="flex h-16 items-center justify-between">
          <div className="flex gap-6 md:gap-10">
            <Link href="/" className="flex items-center space-x-2">
              <span className="inline-block font-bold text-xl tracking-tight">
                {siteConfig.siteName}
              </span>
            </Link>
            <nav className="hidden md:flex gap-6">
              {siteConfig.nav.items.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="flex items-center text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
                  target={item.newTab ? "_blank" : undefined}
                  rel={item.newTab ? "noreferrer" : undefined}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
          <div className="flex items-center gap-4">
             {siteConfig.nav.showThemeToggle && (
                 <ThemeToggle />
             )}
          </div>
        </div>
      </Container>
    </header>
  );
}
