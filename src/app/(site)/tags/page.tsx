import Link from 'next/link';
import { getAllTags } from '@/lib/mdx';
import { Container } from '@/components/ui/container';

export const metadata = {
  title: 'Tags',
  description: 'Browse posts by tags.',
};

export default function TagsPage() {
  const tags = getAllTags();
  const sortedTags = Object.keys(tags).sort((a, b) => tags[b] - tags[a]); // Sort by count desc

  return (
    <Container className="py-10">
      <div className="flex flex-col items-start gap-4 md:flex-row md:justify-between md:gap-8 mb-10">
        <div className="flex-1 space-y-4">
          <h1 className="inline-block font-heading text-4xl tracking-tight lg:text-5xl font-bold">
            Tags
          </h1>
          <p className="text-xl text-muted-foreground">
            Explore topics I write about.
          </p>
        </div>
      </div>
      
      <div className="flex flex-wrap gap-4">
        {sortedTags.map((tag) => (
          <Link
            key={tag}
            href={`/tags/${tag.toLowerCase()}`} // Basic slugification
            className="group flex items-center justify-between rounded-lg border border-border bg-card p-4 transition-colors hover:bg-accent hover:text-accent-foreground min-w-[150px]"
          >
            <span className="font-medium capitalize">{tag}</span>
            <span className="ml-2 rounded-full bg-secondary px-2 py-0.5 text-xs font-semibold text-secondary-foreground">
              {tags[tag]}
            </span>
          </Link>
        ))}
        {sortedTags.length === 0 && (
             <p className="text-muted-foreground">No tags found.</p>
        )}
      </div>
    </Container>
  );
}
