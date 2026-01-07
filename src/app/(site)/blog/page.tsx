import { getAllPosts } from '@/lib/mdx';
import { Container } from '@/components/ui/container';
import { UploadForm } from '@/components/blog/upload-form';
import { PostList } from '@/components/blog/post-list';

export const metadata = {
  title: 'Blog',
  description: 'Read my latest thoughts and tutorials.',
};

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <Container className="py-10">
      <div className="flex flex-col items-start gap-4 md:flex-row md:justify-between md:gap-8 mb-10">
        <div className="flex-1 space-y-4">
          <h1 className="inline-block font-heading text-4xl tracking-tight lg:text-5xl font-bold">
            Blog
          </h1>
          <p className="text-xl text-muted-foreground">
            A collection of thoughts, tutorials, and guides.
          </p>
        </div>
      </div>
      
      <UploadForm />

      <PostList initialPosts={posts.map(p => p.metadata)} />
    </Container>
  );
}
