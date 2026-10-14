import { NextRequest, NextResponse } from 'next/server';
import { getSiteContent } from '@/lib/contentStore';

export async function GET(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const key = url.searchParams.get('key') || undefined;

    const result = await getSiteContent(key);
    return NextResponse.json(result);
  } catch (error) {
    console.error('Failed to fetch site content:', error);
    return NextResponse.json(
      { success: true, content: {} },
      { status: 200 }
    );
  }
}
