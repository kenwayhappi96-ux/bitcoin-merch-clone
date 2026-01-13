import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';

interface Category {
  id: number;
  name: string;
  slug: string;
  description: string | null;
  image: string | null;
  is_active: boolean;
  display_order: number;
}

// GET - Récupérer toutes les catégories
export async function GET() {
  try {
    const categories = await query<Category[]>(
      'SELECT * FROM categories ORDER BY display_order ASC, name ASC'
    );

    return NextResponse.json({
      success: true,
      categories,
      count: categories.length,
    });
  } catch (error) {
    console.error('Error fetching categories:', error);
    return NextResponse.json(
      { success: false, error: 'Erreur lors de la récupération des catégories' },
      { status: 500 }
    );
  }
}

// POST - Créer une nouvelle catégorie
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, slug, description, image, is_active, display_order } = body;

    if (!name || !slug) {
      return NextResponse.json(
        { error: 'Le nom et le slug sont requis' },
        { status: 400 }
      );
    }

    const result = await query(
      `INSERT INTO categories (name, slug, description, image, is_active, display_order) 
       VALUES (?, ?, ?, ?, ?, ?)`,
      [name, slug, description || null, image || null, is_active ?? true, display_order || 0]
    );

    return NextResponse.json({
      success: true,
      message: 'Catégorie créée avec succès',
      id: (result as any).insertId,
    });
  } catch (error: any) {
    console.error('Error creating category:', error);
    if (error.code === 'ER_DUP_ENTRY') {
      return NextResponse.json(
        { error: 'Une catégorie avec ce slug existe déjà' },
        { status: 409 }
      );
    }
    return NextResponse.json(
      { error: 'Erreur lors de la création de la catégorie' },
      { status: 500 }
    );
  }
}

// PUT - Mettre à jour une catégorie
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, name, slug, description, image, is_active, display_order } = body;

    if (!id) {
      return NextResponse.json(
        { error: 'L\'ID de la catégorie est requis' },
        { status: 400 }
      );
    }

    await query(
      `UPDATE categories 
       SET name = ?, slug = ?, description = ?, image = ?, is_active = ?, display_order = ?
       WHERE id = ?`,
      [name, slug, description || null, image || null, is_active ?? true, display_order || 0, id]
    );

    return NextResponse.json({
      success: true,
      message: 'Catégorie mise à jour avec succès',
    });
  } catch (error) {
    console.error('Error updating category:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la mise à jour de la catégorie' },
      { status: 500 }
    );
  }
}

// DELETE - Supprimer une catégorie
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { error: 'L\'ID de la catégorie est requis' },
        { status: 400 }
      );
    }

    // Vérifier si des produits utilisent cette catégorie
    const products = await query<any[]>(
      'SELECT COUNT(*) as count FROM products WHERE category_id = ?',
      [id]
    );

    if (products[0].count > 0) {
      return NextResponse.json(
        { error: `Impossible de supprimer : ${products[0].count} produit(s) utilisent cette catégorie` },
        { status: 409 }
      );
    }

    await query('DELETE FROM categories WHERE id = ?', [id]);

    return NextResponse.json({
      success: true,
      message: 'Catégorie supprimée avec succès',
    });
  } catch (error) {
    console.error('Error deleting category:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la suppression de la catégorie' },
      { status: 500 }
    );
  }
}
