import { getPostsByTag, getAllTags } from '@/lib/mdx';
import { PostCard } from '@/components/blog/post-card';
import { Container } from '@/components/ui/container';
import Link from 'next/link';

interface PageProps {
  params: Promise<{ tag: string }>;
}

export async function generateStaticParams() {
  const tags = getAllTags();
  return Object.keys(tags).map((tag) => ({
    tag: tag.toLowerCase(),
  }));
}

export async function generateMetadata({ params }: PageProps) {
  const { tag } = await params;
  const decodedTag = decodeURIComponent(tag);
  return {
    title: `Posts tagged "${decodedTag}"`,
    description: `All posts tagged with ${decodedTag}.`,
  };
}

export default async function TagPage({ params }: PageProps) {
  const { tag } = await params;
  const decodedTag = decodeURIComponent(tag);
  const posts = getPostsByTag(decodedTag);

  return (
    <Container className="py-10">
      <div className="mb-8">
        <Link
            href="/tags"
            className="text-sm text-muted-foreground hover:underline mb-4 inline-block"
        >
            &larr; View all tags
        </Link>
        <h1 className="font-heading text-4xl font-bold tracking-tight lg:text-5xl capitalize">
          {decodedTag}
        </h1>
        <p className="mt-2 text-xl text-muted-foreground">
          {posts.length} post{posts.length !== 1 && 's'} found
        </p>
      </div>
      
      <div className="grid gap-6 sm:grid-cols-1 lg:grid-cols-2">
        {posts.map((post) => (
          <PostCard key={post.metadata.slug} post={post.metadata} />
        ))}
        {posts.length === 0 && (
            <p className="text-muted-foreground">No posts found with this tag.</p>
        )}
      </div>
    </Container>
  );
}
