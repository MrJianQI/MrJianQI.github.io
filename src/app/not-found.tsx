import Link from 'next/link';
import { Container } from '@/components/ui/container';
import { FileQuestion, Home, BookOpen, Hash } from 'lucide-react';

export default function NotFound() {
  return (
    <Container className="py-20 md:py-32 flex flex-col items-center text-center">
      <div className="space-y-8 max-w-2xl">
        <div className="space-y-4">
          <div className="inline-flex items-center justify-center p-3 rounded-xl bg-destructive/10 text-destructive mb-4">
            <FileQuestion className="w-12 h-12" />
          </div>
          <h1 className="font-heading text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
            Page Not Found
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed">
            Sorry, we couldn&apos;t find the page you&apos;re looking for. It might have been moved, deleted, or never existed.
          </p>
        </div>
        
        <div className="pt-4">
          <Link
            href="/"
            className="inline-flex h-11 items-center justify-center rounded-full bg-primary text-primary-foreground px-10 text-sm font-medium shadow-lg transition-all hover:bg-primary/90 hover:scale-[1.02] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </Container>
  );
}