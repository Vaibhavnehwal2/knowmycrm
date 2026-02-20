import { NextRequest, NextResponse } from 'next/server';
import { getLinkedInPostsPage } from '@/lib/linkedin';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1', 10);
    const pageSize = parseInt(searchParams.get('pageSize') || '10', 10);

    // Validate params
    const validPage = Math.max(1, page);
    const validPageSize = Math.min(Math.max(1, pageSize), 50); // Max 50 per page

    const result = getLinkedInPostsPage(validPage, validPageSize);

    return NextResponse.json(result);
  } catch (error) {
    console.error('Error fetching LinkedIn posts:', error);
    return NextResponse.json(
      { error: 'Failed to fetch LinkedIn posts' },
      { status: 500 }
    );
  }
}
