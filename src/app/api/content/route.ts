import { NextResponse } from 'next/server';
import { getPublishedCmsData } from '../../../lib/cms/storage';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const data = getPublishedCmsData();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching public content:', error);
    return NextResponse.json(
      { error: 'Failed to retrieve website content' },
      { status: 500 }
    );
  }
}
