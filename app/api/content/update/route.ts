import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { updateSiteContent } from '@/lib/contentStore';
import { verifyAdminToken, COOKIE_NAME } from '@/lib/jwt';

export async function POST(req: NextRequest) {
  try {
    // 1. Verify admin JWT cookie
    const token = req.cookies.get(COOKIE_NAME)?.value;
    if (!token) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized: Admin authentication required' },
        { status: 401 }
      );
    }

    const payload = await verifyAdminToken(token);
    if (!payload) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized: Invalid or expired token' },
        { status: 401 }
      );
    }

    // 2. Parse request body
    const { key, content } = await req.json();

    if (!key || typeof content !== 'string') {
      return NextResponse.json(
        { success: false, error: 'Missing key or content string' },
        { status: 400 }
      );
    }

    // 3. Persist content (MongoDB upsert with resilient fallback)
    const updated = await updateSiteContent(key, content);

    // 4. Purge static cache for SEO
    try {
      revalidatePath('/');
    } catch {
      // Revalidate is Next.js specific runtime safe fallback
    }

    return NextResponse.json({
      success: true,
      key: updated.key,
      content: updated.content,
      updatedAt: updated.updatedAt,
      source: updated.source,
    });
  } catch (error) {
    console.error('Content update error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error saving content' },
      { status: 500 }
    );
  }
}
