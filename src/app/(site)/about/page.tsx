import type { Metadata } from 'next';
import Link from 'next/link';
import { Container } from '@/components/ui/container';
import { siteConfig } from '@/config/site';
import { getAllTags } from '@/lib/mdx';
import { Github, Twitter, Mail, Globe, Layers, Cpu, Code2 } from 'lucide-react';

export const metadata: Metadata = {
  title: 'About Me',
  description: `About ${siteConfig.author} - ${siteConfig.description}`,
};

export default function AboutPage() {
  const tags = getAllTags();
  const sortedTags = Object.keys(tags).sort((a, b) => {
    // Sort by count descending, then by name ascending
    const diff = tags[b] - tags[a];
    if (diff !== 0) return diff;
    return a.localeCompare(b);
  });

  return (
    <Container className="py-10 md:py-14">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
        {/* Main Content - Left Column */}
        <div className="md:col-span-8 space-y-8">
          <div className="space-y-4">
            <h1 className="font-heading text-4xl font-bold tracking-tight lg:text-5xl">
              Hi, I&apos;m {siteConfig.author}.
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              {siteConfig.description}
            </p>
          </div>

          <div className="prose dark:prose-invert prose-lg max-w-none text-muted-foreground">
            <p>
              I&apos;m a passionate developer who loves building things for the web. 
              My journey started when I wrote my first line of code, and since then, 
              I&apos;ve been hooked on the endless possibilities of software engineering.
            </p>
            <p>
              I specialize in building scalable web applications using modern technologies 
              like React, Next.js, and TypeScript. I believe in clean code, user-centric design, 
              and continuous learning.
            </p>
            <h3>My Philosophy</h3>
            <p>
              Software is not just about writing code; it&apos;s about solving problems and 
              creating value. I approach every project with a mindset of curiosity and 
              pragmatism, always looking for the best tool for the job.
            </p>
            <h3>What I&apos;m working on</h3>
            <p>
              Currently, I&apos;m focused on deepening my knowledge of full-stack development 
              and exploring the potential of AI integration in everyday applications.
            </p>
          </div>
        </div>

        {/* Sidebar - Right Column */}
        <div className="md:col-span-4 space-y-8">
          
          {/* Avatar / Profile Image Placeholder */}
          <div className="aspect-square relative rounded-2xl overflow-hidden bg-muted border border-border flex items-center justify-center text-muted-foreground">
             {/* Replace this div with <Image /> when you have a real photo */}
             <div className="text-center p-6">
                <span className="block text-4xl mb-2">👋</span>
                <span className="text-sm">Add your photo in<br/>src/app/(site)/about/page.tsx</span>
             </div>
          </div>

          {/* Social Links */}
          <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
            <h3 className="font-semibold mb-4 flex items-center gap-2">
              <Globe className="w-4 h-4" /> Connect
            </h3>
            <div className="flex flex-col gap-3">
              {siteConfig.socials.map((social) => (
                <a
                  key={social.url}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-sm text-muted-foreground hover:text-primary transition-colors p-2 hover:bg-accent rounded-md"
                >
                  {social.platform === 'github' && <Github className="w-4 h-4" />}
                  {social.platform === 'twitter' && <Twitter className="w-4 h-4" />}
                  {social.platform === 'mail' && <Mail className="w-4 h-4" />}
                  <span className="capitalize">{social.platform}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Tech Stack / Tags */}
          <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
            <h3 className="font-semibold mb-4 flex items-center gap-2">
              <Layers className="w-4 h-4" /> Tech Stack / Topics
            </h3>
            <div className="flex flex-wrap gap-2">
              {sortedTags.length > 0 ? (
                sortedTags.map((tag) => (
                  <Link
                    key={tag}
                    href={`/tags/${tag.toLowerCase()}`}
                    className="inline-flex items-center rounded-md bg-secondary px-2.5 py-0.5 text-xs font-medium text-secondary-foreground hover:bg-secondary/80 transition-colors"
                  >
                    {tag} <span className="ml-1 opacity-60">({tags[tag]})</span>
                  </Link>
                ))
              ) : (
                <p className="text-sm text-muted-foreground">No topics yet.</p>
              )}
            </div>
          </div>

          {/* Current Status */}
           <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
            <h3 className="font-semibold mb-4 flex items-center gap-2">
              <Code2 className="w-4 h-4" /> Status
            </h3>
            <p className="text-sm text-muted-foreground">
              Open to freelance opportunities and interesting collaborations.
            </p>
          </div>

        </div>
      </div>
    </Container>
  );
}
