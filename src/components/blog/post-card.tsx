import Link from 'next/link';
import { format, parseISO } from 'date-fns';
import { PostMetadata } from '@/lib/mdx';

interface PostCardProps {
  post: PostMetadata;
}

export function PostCard({ post }: PostCardProps) {
  return (
    <article className="group relative flex flex-col justify-between h-full rounded-xl border border-border/50 bg-card p-6 shadow-sm transition-all hover:border-foreground/20 hover:shadow-md">
      <div>
        <div className="flex items-center gap-3 text-sm text-muted-foreground mb-3">
          <time dateTime={post.publishedAt} className="font-medium">
            {(() => {
              try {
                return format(parseISO(post.publishedAt), 'MMMM dd, yyyy');
              } catch {
                return 'Unknown Date';
              }
            })()}
          </time>
          {post.tags && post.tags.length > 0 && (
            <>
              <span className="text-muted-foreground/30">•</span>
              <div className="flex gap-2 relative z-10"> {/* z-10 ensures tags are clickable above the card link overlay if we had one covering full card, but here title is link */}
                {post.tags.slice(0, 2).map(tag => (
                    <Link 
                        key={tag} 
                        href={`/tags/${tag.toLowerCase()}`}
                        className="text-xs font-medium text-primary/80 hover:text-primary hover:underline"
                    >
                        #{tag}
                    </Link>
                ))}
              </div>
            </>
          )}
        </div>
        <h2 className="font-heading text-2xl font-bold tracking-tight text-foreground mb-3 transition-colors group-hover:text-primary">
          <Link href={`/blog/${post.slug}`}>
            <span className="absolute inset-0" aria-hidden="true" />
            {post.title}
          </Link>
        </h2>
        <p className="text-muted-foreground leading-relaxed line-clamp-3 h-[4.5rem]">
          {post.summary}
        </p>
      </div>
      <div className="mt-6 flex items-center text-sm font-medium text-primary opacity-0 transition-opacity group-hover:opacity-100">
        Read Article 
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-1 h-4 w-4"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
      </div>
    </article>
  );
}
