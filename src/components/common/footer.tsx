import Link from 'next/link';
import { siteConfig } from '@/config/site';
import { Container } from '@/components/ui/container';

export function Footer() {
  return (
    <footer className="border-t py-6 md:py-0 bg-background/50">
      <Container>
        <div className="flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
          <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
            <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
              {siteConfig.footer.copyright}
            </p>
          </div>
          <div className="flex gap-6">
             {siteConfig.footer.links.map((link) => (
                 <Link 
                    key={link.href} 
                    href={link.href} 
                    className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
                >
                     {link.label}
                 </Link>
             ))}
          </div>
        </div>
      </Container>
    </footer>
  );
}