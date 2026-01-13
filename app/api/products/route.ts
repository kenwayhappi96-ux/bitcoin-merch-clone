import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';

interface Product {
  id: number;
  name: string;
  slug: string;
  description: string | null;
  price: number;
  discount_price: number | null;
  stock_quantity: number;
  is_featured: boolean;
  is_active: boolean;
  category_id: number;
  category_name: string;
  primary_image: string | null;
}

export async function GET() {
  try {
    const products = await query<Product[]>(`
      SELECT 
        p.id,
        p.name,
        p.slug,
        p.description,
        p.price,
        p.discount_price,
        p.stock,
        p.is_featured,
        p.is_active,
        p.category_id,
        c.name as category_name,
        pi.image_url as primary_image
      FROM products p
      LEFT JOIN categories c ON p.category_id = c.id
      LEFT JOIN product_images pi ON p.id = pi.product_id AND pi.is_primary = 1
      WHERE p.is_active = TRUE
      ORDER BY p.is_featured DESC, p.created_at DESC
    `);

    const formattedProducts = products.map(product => ({
      id: product.id,
      name: product.name,
      slug: product.slug,
      description: product.description || '',
      price: parseFloat(product.price.toString()),
      originalPrice: product.discount_price ? parseFloat(product.price.toString()) : null,
      discountPrice: product.discount_price ? parseFloat(product.discount_price.toString()) : null,
      image: product.primary_image || '/ref/logo.png',
      category: product.category_name,
      inStock: (product as any).stock > 0,
      isFeatured: product.is_featured,
    }));

    return NextResponse.json({
      success: true,
      products: formattedProducts,
      count: formattedProducts.length,
    });
  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json(
      { 
        success: false, 
        products: [],
        count: 0,
      },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
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

    if (!primary_image || primary_image.trim() === '') {
      return NextResponse.json(
        { success: false, error: 'L\'image principale est requise' },
        { status: 400 }
      );
    }

    const result = await query<any>(
      `INSERT INTO products (
        name, slug, description, category_id,
        price, discount_price, stock,
        is_active, is_featured
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [name, slug, description, category_id || null,
       price || 0, discount_price || null, stock || 0,
       is_active ? 1 : 0, is_featured ? 1 : 0]
    );

    const productId = result.insertId;

    // Ajouter l'image principale
    await query(
      `INSERT INTO product_images (product_id, image_url, display_order, is_primary)
       VALUES (?, ?, ?, ?)`,
      [productId, primary_image, 1, 1]
    );

    // Ajouter les images secondaires
    if (images && images.length > 0) {
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
      message: 'Produit créé avec succès',
      id: productId,
    });
  } catch (error: any) {
    console.error('Error creating product:', error);
    if (error.code === 'ER_DUP_ENTRY') {
      return NextResponse.json(
        { success: false, error: 'Un produit avec ce slug existe déjà' },
        { status: 409 }
      );
    }
    return NextResponse.json(
      { success: false, error: 'Erreur lors de la création du produit' },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      id, name, slug, description, short_description, category_id,
      price, discount_price, stock_quantity,
      is_active, is_featured, primary_image, images,
    } = body;

    if (!id) {
      return NextResponse.json(
        { success: false, error: 'ID du produit requis' },
        { status: 400 }
      );
    }

    await query(
      `UPDATE products SET
        name = ?, slug = ?, description = ?, short_description = ?, category_id = ?,
        price = ?, discount_price = ?, stock_quantity = ?,
        is_active = ?, is_featured = ?, primary_image = ?
      WHERE id = ?`,
      [name, slug, description, short_description || null, category_id || null,
       price || 0, discount_price || null, stock_quantity || 0,
       is_active ? 1 : 0, is_featured ? 1 : 0, primary_image, id]
    );

    await query(`DELETE FROM product_images WHERE product_id = ? AND is_primary = 0`, [id]);

    if (images && images.length > 0) {
      for (let i = 0; i < images.length; i++) {
        await query(
          `INSERT INTO product_images (product_id, image_url, display_order, is_primary)
           VALUES (?, ?, ?, ?)`,
          [id, images[i], i + 1, 0]
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

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { success: false, error: 'ID du produit requis' },
        { status: 400 }
      );
    }

    await query(`DELETE FROM products WHERE id = ?`, [id]);

    return NextResponse.json({
      success: true,
      message: 'Produit supprimé avec succès',
    });
  } catch (error) {
    console.error('Error deleting product:', error);
    return NextResponse.json(
      { success: false, error: 'Erreur lors de la suppression du produit' },
      { status: 500 }
    );
  }
}
