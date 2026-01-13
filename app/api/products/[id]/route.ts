import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    // Récupérer le produit avec son image principale
    const products = await query<any[]>(
      `SELECT 
        p.*,
        c.name as category_name,
        c.slug as category_slug,
        pi.image_url as primary_image
      FROM products p
      LEFT JOIN categories c ON p.category_id = c.id
      LEFT JOIN product_images pi ON p.id = pi.product_id AND pi.is_primary = 1
      WHERE p.id = ?`,
      [id]
    );

    if (products.length === 0) {
      return NextResponse.json(
        { success: false, error: 'Produit non trouvé' },
        { status: 404 }
      );
    }

    const product = products[0];

    // Récupérer les images supplémentaires
    const images = await query<any[]>(
      `SELECT image_url FROM product_images 
       WHERE product_id = ? AND is_primary = 0
       ORDER BY display_order`,
      [id]
    );

    return NextResponse.json({
      success: true,
      product: {
        ...product,
        primary_image: product.primary_image || '/ref/logo.png',
        images: images.map((img: any) => img.image_url),
      },
    });
  } catch (error) {
    console.error('Error fetching product:', error);
    return NextResponse.json(
      { success: false, error: 'Erreur lors de la récupération du produit' },
      { status: 500 }
    );
  }
}

// PUT /api/products/[id] - Mettre à jour un produit
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const productId = parseInt(id);

    if (isNaN(productId)) {
      return NextResponse.json(
        { success: false, error: 'ID invalide' },
        { status: 400 }
      );
    }

    const body = await request.json();
    const {
      name, slug, description, category_id,
      price, discount_price, stock,
      is_active, is_featured, primary_image, images,
    } = body;

    // Validation
    if (!name || !slug || !description) {
      return NextResponse.json(
        { success: false, error: 'Les champs nom, slug et description sont requis' },
        { status: 400 }
      );
    }

    // Mettre à jour le produit
    await query(
      `UPDATE products SET
        name = ?,
        slug = ?,
        description = ?,
        category_id = ?,
        price = ?,
        discount_price = ?,
        stock = ?,
        is_active = ?,
        is_featured = ?
      WHERE id = ?`,
      [
        name,
        slug,
        description,
        category_id || null,
        price || 0,
        discount_price || null,
        stock || 0,
        is_active ? 1 : 0,
        is_featured ? 1 : 0,
        productId
      ]
    );

    // Mettre à jour l'image principale
    if (primary_image) {
      // Supprimer l'ancienne image principale
      await query(
        `DELETE FROM product_images WHERE product_id = ? AND is_primary = 1`,
        [productId]
      );

      // Ajouter la nouvelle image principale
      await query(
        `INSERT INTO product_images (product_id, image_url, display_order, is_primary)
         VALUES (?, ?, ?, ?)`,
        [productId, primary_image, 1, 1]
      );
    }

    // Mettre à jour les images secondaires
    if (images && Array.isArray(images)) {
      // Supprimer les anciennes images secondaires
      await query(
        `DELETE FROM product_images WHERE product_id = ? AND is_primary = 0`,
        [productId]
      );

      // Ajouter les nouvelles images
      for (let i = 0; i < images.length; i++) {
        await query(
          `INSERT INTO product_images (product_id, image_url, display_order, is_primary)
           VALUES (?, ?, ?, ?)`,
          [productId, images[i], i + 2, 0]
        );
      }
    }

    return NextResponse.json({
      success: true,
      message: 'Produit mis à jour avec succès',
    });
  } catch (error: any) {
    console.error('Error updating product:', error);
    if (error.code === 'ER_DUP_ENTRY') {
      return NextResponse.json(
        { success: false, error: 'Un produit avec ce slug existe déjà' },
        { status: 409 }
      );
    }
    return NextResponse.json(
      { success: false, error: 'Erreur lors de la mise à jour du produit' },
      { status: 500 }
    );
  }
}
