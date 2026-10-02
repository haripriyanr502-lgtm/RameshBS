import { NextRequest, NextResponse } from 'next/server';
import path from 'path';
import fs from 'fs';
import { getSessionFromRequest } from '../../../../../lib/auth';
import { saveMediaAsset } from '../../../../../lib/cms/storage';
import { MediaAsset } from '../../../../../lib/cms/types';
import { getSupabaseClient } from '../../../../../lib/supabase';

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  const session = getSessionFromRequest(request);
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized: Admin session required' }, { status: 401 });
  }

  try {
    const formData = await request.formData();
    const file = formData.get('file') as File | null;
    const rawCategory = (formData.get('category') as string) || 'General';
    const altText = (formData.get('altText') as string) || '';

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    // Validate mime type
    const validMimes = [
      'image/jpeg',
      'image/jpg',
      'image/png',
      'image/webp',
      'image/gif',
      'image/svg+xml',
    ];
    if (!validMimes.includes(file.type.toLowerCase())) {
      return NextResponse.json(
        { error: 'Only image files (JPEG, PNG, WEBP, GIF, SVG) are allowed' },
        { status: 400 }
      );
    }

    // Max 10MB
    const MAX_SIZE = 10 * 1024 * 1024;
    if (file.size > MAX_SIZE) {
      return NextResponse.json(
        { error: 'File size exceeds maximum allowable limit of 10MB' },
        { status: 400 }
      );
    }

    // Determine category folder
    const validCategories = [
      'Logo',
      'Hero',
      'Team',
      'Meetings',
      'Services',
      'Achievements',
      'Posters',
      'General',
    ];
    const category = validCategories.includes(rawCategory)
      ? (rawCategory as MediaAsset['category'])
      : 'General';

    const categorySubdir = category.toLowerCase();
    const uploadDir = path.join(process.cwd(), 'public', 'uploads', categorySubdir);

    const timestamp = Date.now();
    const cleanFileName = file.name
      .toLowerCase()
      .replace(/[^a-z0-9.]+/g, '-')
      .replace(/-+/g, '-');
    const safeFileName = `${timestamp}-${cleanFileName}`;
    const filePath = path.join(uploadDir, safeFileName);

    const buffer = Buffer.from(await file.arrayBuffer());
    let publicUrl = '';

    // 1. If Supabase is configured, upload directly to durable Supabase Storage bucket
    const supabase = getSupabaseClient();
    if (supabase) {
      const storagePath = `${categorySubdir}/${safeFileName}`;
      const { error: uploadError } = await supabase.storage
        .from('cms-media')
        .upload(storagePath, buffer, {
          contentType: file.type,
          upsert: true,
        });

      if (uploadError) {
        console.error('Supabase storage upload error:', uploadError.message);
        if (process.env.VERCEL) {
          return NextResponse.json(
            { error: `Media upload to durable storage failed: ${uploadError.message}` },
            { status: 500 }
          );
        }
      } else {
        const { data: urlData } = supabase.storage
          .from('cms-media')
          .getPublicUrl(storagePath);
        if (urlData && urlData.publicUrl) {
          publicUrl = urlData.publicUrl;
        }
      }
    } else if (process.env.VERCEL) {
      return NextResponse.json(
        { error: 'Durable Supabase storage is not configured in production' },
        { status: 500 }
      );
    }

    // 2. Local fallback if Supabase is not configured or upload did not complete in development
    if (!publicUrl) {
      try {
        if (!fs.existsSync(uploadDir)) {
          fs.mkdirSync(uploadDir, { recursive: true });
        }
        fs.writeFileSync(filePath, buffer);
        publicUrl = `/uploads/${categorySubdir}/${safeFileName}`;
      } catch {
        // In local environments without storage configured, fall back to Data URL
        publicUrl = `data:${file.type};base64,${buffer.toString('base64')}`;
      }
    }

    const newAsset: MediaAsset = {
      id: `med-${timestamp}`,
      fileName: cleanFileName,
      url: publicUrl,
      category,
      mimeType: file.type,
      sizeBytes: file.size,
      uploadedAt: new Date().toISOString(),
      altText: altText || cleanFileName,
    };

    await saveMediaAsset(newAsset);

    return NextResponse.json({
      success: true,
      message: 'Image uploaded successfully',
      asset: newAsset,
    });
  } catch (error) {
    const errorMsg = error instanceof Error ? error.message : 'An error occurred while uploading file';
    console.error('File upload error:', error);
    return NextResponse.json(
      { error: errorMsg },
      { status: 500 }
    );
  }
}
