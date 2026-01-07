import Link from 'next/link';
import { siteConfig } from '@/config/site';
import { Container } from '@/components/ui/container';
import { Github } from 'lucide-react';

export function HeroSection() {
  if (!siteConfig.hero.enabled) return null;

  return (
    <section className="space-y-6 pb-8 pt-6 md:pb-12 md:pt-10 lg:py-32">
      <Container className="flex max-w-[64rem] flex-col items-center gap-4 text-center">
        {/* Optional: Add a small badge or "New" pill here in the future */}
        
        <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tighter text-balance">
          {siteConfig.hero.title}
        </h1>
        
        <p className="max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8 text-balance">
          {siteConfig.hero.subtitle}
        </p>
        
        {siteConfig.hero.ctaButton.enabled && (
            <div className="flex flex-wrap items-center justify-center gap-4 mt-4">
                <Link
                    href={siteConfig.hero.ctaButton.href}
                    className="inline-flex h-11 items-center justify-center rounded-full border border-input bg-background px-8 text-sm font-medium shadow-sm transition-all hover:bg-accent hover:text-accent-foreground hover:scale-[1.02] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                >
                    {siteConfig.hero.ctaButton.label}
                </Link>
                <Link
                    href={siteConfig.socials.find(s => s.platform === 'github')?.url || "#"}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex h-11 items-center justify-center rounded-full border border-input bg-background px-8 text-sm font-medium shadow-sm transition-all hover:bg-accent hover:text-accent-foreground hover:scale-[1.02] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                >
                    <Github className="mr-2 h-4 w-4" />
                    GitHub
                </Link>
            </div>
        )}
      </Container>
    </section>
  );
}