import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import { SiteContent } from '@/models/SiteContent';

export async function GET(req: NextRequest) {
  try {
    await connectToDatabase();
    const url = new URL(req.url);
    const key = url.searchParams.get('key');

    if (key) {
      const item = await SiteContent.findOne({ key });
      return NextResponse.json({
        success: true,
        content: item ? item.content : null,
      });
    }

    const allItems = await SiteContent.find({}).lean();
    const contentMap: Record<string, string> = {};
    for (const doc of allItems) {
      contentMap[doc.key] = doc.content;
    }

    return NextResponse.json({
      success: true,
      content: contentMap,
    });
  } catch (error) {
    console.error('Failed to fetch site content:', error);
    return NextResponse.json(
      { success: false, error: 'Database fetch error' },
      { status: 500 }
    );
  }
}
