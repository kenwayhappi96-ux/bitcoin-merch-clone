import { NextResponse } from 'next/server'
import { query } from '@/lib/db'

export async function GET() {
  try {
    const orders = await query<any[]>(`
      SELECT 
        o.id,
        o.customer_name,
        o.customer_email,
        o.total_amount,
        o.status,
        o.created_at,
        COUNT(oi.id) as items_count
      FROM orders o
      LEFT JOIN order_items oi ON o.id = oi.order_id
      GROUP BY o.id
      ORDER BY o.created_at DESC
    `)

    return NextResponse.json({
      success: true,
      orders,
      count: orders.length,
    })
  } catch (error) {
    console.error('Error fetching orders:', error)
    return NextResponse.json(
      { success: false, orders: [], count: 0 },
      { status: 500 }
    )
  }
}
