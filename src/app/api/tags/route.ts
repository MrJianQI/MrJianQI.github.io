import { NextResponse } from 'next/server';
import { getAllTags } from '@/lib/mdx';

export const dynamic = 'force-static';

export async function GET() {
  try {
    const tags = getAllTags();
    // getAllTags returns { [tag: string]: count }
    // We can return the keys sorted by count (most popular first)
    const sortedTags = Object.keys(tags).sort((a, b) => tags[b] - tags[a]);
    
    return NextResponse.json(sortedTags);
  } catch (error) {
    console.error('Failed to fetch tags:', error);
    return NextResponse.json({ error: 'Failed to fetch tags' }, { status: 500 });
  }
}
