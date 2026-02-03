// app/api/search/route.ts
import { NextResponse } from 'next/server'
import db from '@/lib/db'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const query = searchParams.get('q')

  if (!query || query.trim().length < 1) {
    return NextResponse.json([])
  }

  try {
    const [products] = await db.query(
      `SELECT 
        p.id,
        p.name,
        p.slug,
        CAST(p.price AS DECIMAL(10,2)) as price,
        CAST(p.discount_price AS DECIMAL(10,2)) as discount_price,
        c.name as category_name,
        (SELECT image_url FROM product_images WHERE product_id = p.id AND is_primary = 1 LIMIT 1) as image
      FROM products p
      LEFT JOIN categories c ON p.category_id = c.id
      WHERE p.is_active = 1 
        AND (
          p.name LIKE ? 
          OR p.description LIKE ?
          OR p.slug LIKE ?
          OR c.name LIKE ?
        )
      ORDER BY 
        CASE 
          WHEN p.slug = ? THEN 0
          WHEN p.name LIKE ? THEN 1
          WHEN p.name LIKE ? THEN 2
          ELSE 3
        END,
        p.sales_count DESC
      LIMIT 10`,
      [
        `%${query}%`,
        `%${query}%`,
        `%${query}%`,
        `%${query}%`,
        query.toLowerCase(),
        `${query}%`,
        `%${query}%`
      ]
    )

    return NextResponse.json(products)
  } catch (error) {
    console.error('Search error:', error)
    return NextResponse.json({ error: 'Search failed' }, { status: 500 })
  }
}