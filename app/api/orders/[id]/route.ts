import { NextRequest, NextResponse } from 'next/server'
import { query } from '@/lib/db'

// GET /api/orders/[id] - Récupérer les détails d'une commande
export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params

    // Récupérer la commande
    const orders = await query<any[]>(
      'SELECT * FROM orders WHERE id = ?',
      [id]
    )

    if (!orders || orders.length === 0) {
      return NextResponse.json(
        { success: false, error: 'Commande non trouvée' },
        { status: 404 }
      )
    }

    const order = orders[0]

    // Récupérer les articles
    const items = await query(
      'SELECT * FROM order_items WHERE order_id = ?',
      [id]
    )

    return NextResponse.json({
      success: true,
      order: { ...order, items },
    })
  } catch (error) {
    console.error('Get order error:', error)
    return NextResponse.json(
      { success: false, error: 'Erreur lors de la récupération de la commande' },
      { status: 500 }
    )
  }
}

// PUT /api/orders/[id] - Mettre à jour le statut d'une commande
export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    const body = await request.json()
    const { orderStatus, paymentStatus, trackingNumber, notes } = body

    const updates: string[] = []
    const values: any[] = []

    if (orderStatus) {
      updates.push('status = ?')
      values.push(orderStatus)
    }

    if (paymentStatus) {
      updates.push('payment_status = ?')
      values.push(paymentStatus)
    }

    if (trackingNumber) {
      updates.push('tracking_number = ?')
      values.push(trackingNumber)
    }

    if (notes !== undefined) {
      updates.push('order_instructions = ?')
      values.push(notes)
    }

    if (updates.length === 0) {
      return NextResponse.json(
        { success: false, error: 'Aucune mise à jour fournie' },
        { status: 400 }
      )
    }

    updates.push('updated_at = NOW()')
    values.push(id)

    const sql = `UPDATE orders SET ${updates.join(', ')} WHERE id = ?`
    await query(sql, values)

    return NextResponse.json({
      success: true,
      message: 'Commande mise à jour avec succès',
    })
  } catch (error) {
    console.error('Update order error:', error)
    return NextResponse.json(
      { success: false, error: 'Erreur lors de la mise à jour' },
      { status: 500 }
    )
  }
}
