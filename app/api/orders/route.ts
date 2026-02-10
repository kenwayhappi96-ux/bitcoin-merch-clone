import { NextRequest, NextResponse } from 'next/server'
import { query } from '@/lib/db'

// GET /api/orders - Lister toutes les commandes
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const limit = parseInt(searchParams.get('limit') || '50', 10)
    const offset = parseInt(searchParams.get('offset') || '0', 10)
    const status = searchParams.get('status')

    let sql = 'SELECT * FROM orders'
    const params: any[] = []

    if (status && status !== 'all') {
      sql += ' WHERE status = ?'
      params.push(status)
    }

    // Insérer LIMIT et OFFSET directement (pas comme paramètres)
    sql += ` ORDER BY created_at DESC LIMIT ${limit} OFFSET ${offset}`

    const orders = await query<any[]>(sql, params)

    return NextResponse.json({ success: true, orders })
  } catch (error) {
    console.error('Get orders error:', error)
    return NextResponse.json(
      { success: false, error: 'Erreur lors de la récupération des commandes' },
      { status: 500 }
    )
  }
}

// POST /api/orders - Créer une nouvelle commande
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Valider les données requises
    const {
      email,
      firstName,
      lastName,
      address,
      apartment,
      city,
      region,
      zipCode,
      country,
      phone,
      company,
      shippingMethod,
      shippingCost,
      protectionEnabled,
      protectionFee,
      items,
      subtotal,
      total,
      notes,
      paymentMethod,
    } = body

    if (!email || !firstName || !lastName || !address || !city || !country) {
      return NextResponse.json(
        { success: false, error: 'Informations de livraison incomplètes' },
        { status: 400 }
      )
    }

    // ZIP code only required for specific countries
    const countriesRequiringZip = ['United States', 'Canada', 'Germany', 'France']
    if (countriesRequiringZip.includes(country) && !zipCode) {
      return NextResponse.json(
        { success: false, error: 'ZIP code is required for your country.' },
        { status: 400 }
      )
    }

    if (!items || items.length === 0) {
      return NextResponse.json(
        { success: false, error: 'Aucun article dans la commande' },
        { status: 400 }
      )
    }

    // Générer un numéro de commande
    const orderNumber = `ORD-${Date.now()}`
    const customerName = `${firstName} ${lastName}`
    
    // Construire l'adresse complète
    let fullAddress = address
    if (apartment) fullAddress += `, ${apartment}`

    // Insérer la commande
    const orderResult = await query(
      `INSERT INTO orders (
        order_number, customer_name, customer_email, customer_phone, 
        shipping_address, shipping_city, shipping_zip, shipping_country,
        subtotal, shipping_cost, total, status, payment_method, payment_status,
        shipping_protection, order_instructions, created_at, updated_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW())`,
      [
        orderNumber,
        customerName,
        email,
        phone,
        fullAddress,
        city,
        zipCode,
        country,
        subtotal,
        shippingCost,
        total,
        'pending',
        paymentMethod,
        'pending',
        protectionEnabled ? 1 : 0,
        notes || null,
      ]
    )

    // @ts-ignore - mysql2 retourne insertId
    const orderId = orderResult.insertId || orderResult[0].insertId

    // Insérer les articles de la commande
    for (const item of items) {
      const itemTotal = (item.discount_price || item.price) * item.quantity
      await query(
        `INSERT INTO order_items (order_id, product_id, product_name, price, quantity, total)
         VALUES (?, ?, ?, ?, ?, ?)`,
        [
          orderId,
          item.id,
          item.name,
          item.discount_price || item.price,
          item.quantity,
          itemTotal,
        ]
      )
    }

    return NextResponse.json({
      success: true,
      orderId,
      orderNumber,
      message: 'Commande créée avec succès',
    })
  } catch (error) {
    console.error('Create order error:', error)
    return NextResponse.json(
      { success: false, error: 'Erreur lors de la création de la commande' },
      { status: 500 }
    )
  }
}
