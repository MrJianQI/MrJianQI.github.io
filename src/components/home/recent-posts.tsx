import Link from 'next/link';
import { getAllPosts } from '@/lib/mdx';
import { PostCard } from '@/components/blog/post-card';
import { Container } from '@/components/ui/container';

export function RecentPosts() {
  const posts = getAllPosts().slice(0, 3); // Get latest 3 posts

  return (
    <section className="py-12 md:py-16 lg:py-24 border-t bg-muted/30">
      <Container>
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold tracking-tight">Recent Posts</h2>
          <Link href="/blog" className="text-sm font-medium text-primary hover:underline">
            View all posts &rarr;
          </Link>
        </div>
        <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <PostCard key={post.metadata.slug} post={post.metadata} />
          ))}
          {posts.length === 0 && (
             <p className="text-muted-foreground col-span-full text-center py-12">
                No posts yet. Stay tuned!
             </p>
          )}
        </div>
      </Container>
    </section>
  );
}
