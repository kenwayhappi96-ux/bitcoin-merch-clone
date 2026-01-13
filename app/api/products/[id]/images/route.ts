import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;

    if (!id) {
      return NextResponse.json(
        { success: false, error: 'Product ID is required' },
        { status: 400 }
      );
    }

    const images = await query(
      `SELECT id, product_id, image_url, alt_text, is_primary, display_order 
       FROM product_images 
       WHERE product_id = ? 
       ORDER BY display_order ASC`,
      [id]
    );

    return NextResponse.json({
      success: true,
      images: images || [],
    });
  } catch (error) {
    console.error('Error fetching product images:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch product images' },
      { status: 500 }
    );
  }
}
