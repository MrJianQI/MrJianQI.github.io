import { NextRequest, NextResponse } from 'next/server';
import { writeFile } from 'fs/promises';
import path from 'path';
import fs from 'fs';
import matter from 'gray-matter';

// Helper function to create a slug from title
function generateSlug(title: string): string {
  let slug = title
    .trim()
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    // Remove unsafe file characters: / \ : * ? " < > |
    // Also remove control characters
    .replace(/[\/\\:*?"<>|]/g, '')
    // Remove leading/trailing hyphens
    .replace(/^-+|-+$/g, '');

  // If the result is empty after sanitization, fallback to timestamp
  if (!slug) {
    slug = `post-${Date.now()}`;
  }
  
  return slug;
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as unknown as File;
    const title = formData.get('title') as string;
    const publishedAt = formData.get('publishedAt') as string;
    const summary = formData.get('summary') as string;
    const tagsString = formData.get('tags') as string;

    if (!file || !title) {
      return NextResponse.json({ success: false, message: 'Missing file or title' }, { status: 400 });
    }

    // Process tags
    const tags = tagsString 
      ? tagsString.split(',').map(tag => tag.trim()).filter(tag => tag.length > 0)
      : [];

    // Read file content
    const bytes = await file.arrayBuffer();
    const content = Buffer.from(bytes).toString('utf-8');

    // Create Frontmatter data
    const frontmatterData = {
      title,
      publishedAt,
      summary,
      tags,
    };

    // Combine Frontmatter and Content using gray-matter
    // Note: matter.stringify(content, data) returns the combined string
    const fileContent = matter.stringify(content, frontmatterData);

    // Ensure content directory exists
    const contentDir = path.join(process.cwd(), 'content');
    if (!fs.existsSync(contentDir)) {
      fs.mkdirSync(contentDir, { recursive: true });
    }

    // Use MD5 hash of the content as the filename
    const crypto = await import('crypto');
    const hash = crypto.createHash('md5').update(fileContent).digest('hex');
    const filename = `${hash}.mdx`;
    const filepath = path.join(contentDir, filename);

    // Save file
    await writeFile(filepath, fileContent);

    console.log(`Saved post to ${filepath}`);

    return NextResponse.json({ success: true, filename });
  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json({ success: false, message: 'Upload failed' }, { status: 500 });
  }
}