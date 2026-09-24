import { NextRequest, NextResponse } from 'next/server';
import { getSessionFromRequest } from '../../../../lib/auth';
import { ensureCmsDatabase, saveCmsDatabase } from '../../../../lib/cms/storage';
import { FullCmsDatabase } from '../../../../lib/cms/types';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  const session = getSessionFromRequest(request);
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized: Admin session required' }, { status: 401 });
  }

  try {
    const data = ensureCmsDatabase();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching admin CMS data:', error);
    return NextResponse.json({ error: 'Failed to fetch CMS data' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  const session = getSessionFromRequest(request);
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized: Admin session required' }, { status: 401 });
  }

  try {
    const body = (await request.json()) as FullCmsDatabase;

    if (!body || !body.settings || !body.home) {
      return NextResponse.json({ error: 'Invalid content payload' }, { status: 400 });
    }

    saveCmsDatabase(body);
    return NextResponse.json({
      success: true,
      message: 'Website content updated and published successfully',
      version: body.version,
      lastPublishedAt: body.lastPublishedAt,
    });
  } catch (error) {
    console.error('Error saving CMS data:', error);
    return NextResponse.json({ error: 'Failed to save CMS data' }, { status: 500 });
  }
}
