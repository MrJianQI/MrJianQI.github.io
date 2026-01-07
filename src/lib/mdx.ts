import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const postsDirectory = path.join(process.cwd(), 'content');

export interface PostMetadata {
  title: string;
  publishedAt: string;
  summary: string;
  image?: string;
  tags?: string[];
  slug: string;
}

export type Post = {
  metadata: PostMetadata;
  content: string;
};

export function getPostSlugs() {
  if (!fs.existsSync(postsDirectory)) {
    return [];
  }
  return fs.readdirSync(postsDirectory).filter((file) => path.extname(file) === '.mdx');
}

export function getPostBySlug(slug: string): Post {
  const realSlug = slug.replace(/\.mdx$/, '');
  const fullPath = path.join(postsDirectory, `${realSlug}.mdx`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);

  // gray-matter parses dates as Date objects by default.
  // We need to ensure it's a string for serialization and component usage.
  let publishedAt = data.publishedAt;
  if (publishedAt instanceof Date) {
    publishedAt = publishedAt.toISOString();
  } else if (!publishedAt) {
    // Fallback for missing date
    publishedAt = new Date().toISOString();
  }

  return {
    metadata: {
      ...data,
      title: String(data.title || ''),
      summary: String(data.summary || ''),
      publishedAt,
      slug: realSlug,
    } as PostMetadata,
    content,
  };
}

export function getAllPosts(): Post[] {
  const slugs = getPostSlugs();
  const posts = slugs
    .map((slug) => getPostBySlug(slug))
    // Sort posts by date in descending order
    .sort((post1, post2) => {
      const date1 = new Date(post1.metadata.publishedAt);
      const date2 = new Date(post2.metadata.publishedAt);
      return date2.getTime() - date1.getTime();
    });
  return posts;
}

// Tag System Extensions

export function getAllTags(): Record<string, number> {
  const posts = getAllPosts();
  const tags: Record<string, number> = {};

  posts.forEach((post) => {
    if (post.metadata.tags) {
      post.metadata.tags.forEach((tag) => {
        if (tag in tags) {
          tags[tag] += 1;
        } else {
          tags[tag] = 1;
        }
      });
    }
  });

  return tags;
}

export function getPostsByTag(tag: string): Post[] {
  const posts = getAllPosts();
  // Simple case-insensitive matching, handling potential spaces/hyphens is better done via slugify usually,
  // but here we stick to the exact tag string stored in frontmatter for simplicity, 
  // or a basic normalized comparison.
  return posts.filter((post) => 
    post.metadata.tags?.some(t => t.toLowerCase() === tag.toLowerCase())
  );
}