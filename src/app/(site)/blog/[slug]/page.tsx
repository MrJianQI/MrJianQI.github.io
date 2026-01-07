import { getPostBySlug, getPostSlugs } from '@/lib/mdx';
import { Container } from '@/components/ui/container';
import { format, parseISO } from 'date-fns';
import { MDXRemote } from 'next-mdx-remote/rsc';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import rehypePrettyCode from 'rehype-pretty-code';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import remarkGfm from 'remark-gfm';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const posts = getPostSlugs();
  return posts.map((file) => ({
    slug: file.replace(/\.mdx$/, ''),
  }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  try {
    const decodedSlug = decodeURIComponent(slug);
    const post = getPostBySlug(decodedSlug);
    return {
      title: post.metadata.title,
      description: post.metadata.summary,
    };
  } catch {
    return {
      title: 'Post Not Found',
    };
  }
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  let post;
  
  try {
    const decodedSlug = decodeURIComponent(slug);
    post = getPostBySlug(decodedSlug);
  } catch (e) {
    notFound();
  }

  const mdxOptions = {
    mdxOptions: {
      remarkPlugins: [remarkGfm],
      rehypePlugins: [
        rehypeSlug,
        [
          rehypeAutolinkHeadings,
          {
            properties: {
              className: ['subheading-anchor'],
              ariaLabel: 'Link to section',
            },
          },
        ],
        [
          rehypePrettyCode,
          {
            theme: {
              dark: 'github-dark',
              light: 'github-light',
            },
            keepBackground: false,
          },
        ],
      ] as any, // Cast to any to fix type mismatch with SerializeOptions
    },
  };

  return (
    <Container className="py-10">
      <Link
        href="/blog"
        className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-9 px-4 py-2 mb-8 -ml-4"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="mr-2 h-4 w-4"
        >
          <path d="m15 18-6-6 6-6" />
        </svg>
        Back to Blog
      </Link>
      
      <article className="prose dark:prose-invert max-w-none">
        <div className="space-y-4 mb-8 border-b pb-8 not-prose">
          <h1 className="font-heading text-4xl font-bold tracking-tight lg:text-5xl mb-2">
            {post.metadata.title}
          </h1>
          <div className="flex items-center gap-4 text-muted-foreground">
            <time dateTime={post.metadata.publishedAt}>
              {format(parseISO(post.metadata.publishedAt), 'MMMM dd, yyyy')}
            </time>
             {post.metadata.tags && (
                <div className="flex gap-2">
                    {post.metadata.tags.map(tag => (
                        <Link 
                            key={tag} 
                            href={`/tags/${tag.toLowerCase()}`}
                            className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80 transition-colors"
                        >
                            {tag}
                        </Link>
                    ))}
                </div>
            )}
          </div>
        </div>
        
        <MDXRemote 
          source={post.content} 
          options={mdxOptions} 
          components={{
            img: (props) => (
              <figure className="my-8">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img {...props} className="rounded-lg mx-auto" />
                {props.alt && (
                  <figcaption className="text-center text-sm text-muted-foreground mt-3 italic">
                    {props.alt}
                  </figcaption>
                )}
              </figure>
            ),
          }}
        />
      </article>
    </Container>
  );
}
