import { NextRequest, NextResponse } from 'next/server';
import { getSessionFromRequest } from '../../../../lib/auth';
import { getMediaAssets, deleteMediaAsset } from '../../../../lib/cms/storage';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  const session = getSessionFromRequest(request);
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized: Admin session required' }, { status: 401 });
  }

  try {
    const assets = getMediaAssets();
    return NextResponse.json(assets);
  } catch (error) {
    console.error('Error fetching media assets:', error);
    return NextResponse.json({ error: 'Failed to fetch media assets' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  const session = getSessionFromRequest(request);
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized: Admin session required' }, { status: 401 });
  }

  try {
    const { id } = await request.json();
    if (!id) {
      return NextResponse.json({ error: 'Media asset ID is required' }, { status: 400 });
    }

    const success = deleteMediaAsset(id);
    if (!success) {
      return NextResponse.json({ error: 'Media asset not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: 'Media asset deleted successfully' });
  } catch (error) {
    console.error('Error deleting media asset:', error);
    return NextResponse.json({ error: 'Failed to delete media asset' }, { status: 500 });
  }
}
