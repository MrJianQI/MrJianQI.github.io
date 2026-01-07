'use client';

import { useState } from 'react';
import { PostCard } from '@/components/blog/post-card';
import { PostMetadata } from '@/lib/mdx';

interface PostListProps {
  initialPosts: PostMetadata[];
}

export function PostList({ initialPosts }: PostListProps) {
  const [displayCount, setDisplayCount] = useState(6);
  
  const hasMore = initialPosts.length > displayCount;
  const visiblePosts = initialPosts.slice(0, displayCount);

  return (
    <div className="space-y-10">
      <div className="grid gap-6 sm:grid-cols-1 lg:grid-cols-2">
        {visiblePosts.map((post) => (
          <PostCard key={post.slug} post={post} />
        ))}
      </div>

      {visiblePosts.length === 0 && (
        <p className="text-muted-foreground text-center py-10">No posts found.</p>
      )}

      {hasMore && (
        <div className="flex justify-center pt-4">
          <button
            onClick={() => setDisplayCount(prev => prev + 6)}
            className="inline-flex items-center justify-center rounded-full border border-input bg-background px-8 py-2 text-sm font-medium shadow-sm transition-all hover:bg-accent hover:text-accent-foreground"
          >
            Load More Posts
          </button>
        </div>
      )}
    </div>
  );
}