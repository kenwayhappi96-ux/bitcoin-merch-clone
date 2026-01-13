import { NextRequest, NextResponse } from 'next/server'
import { query } from '@/lib/db'

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()
    const { id, name, email } = body

    if (!id || !name || !email) {
      return NextResponse.json(
        { success: false, error: 'Tous les champs sont requis' },
        { status: 400 }
      )
    }

    // Vérifier si l'email existe déjà (sauf pour cet admin)
    const existing = await query<any[]>(
      'SELECT id FROM admins WHERE email = ? AND id != ?',
      [email, id]
    )

    if (existing.length > 0) {
      return NextResponse.json(
        { success: false, error: 'Cet email est déjà utilisé' },
        { status: 409 }
      )
    }

    // Mettre à jour le profil
    await query(
      'UPDATE admins SET name = ?, email = ? WHERE id = ?',
      [name, email, id]
    )

    return NextResponse.json({
      success: true,
      message: 'Profil mis à jour avec succès',
    })
  } catch (error) {
    console.error('Error updating profile:', error)
    return NextResponse.json(
      { success: false, error: 'Erreur lors de la mise à jour du profil' },
      { status: 500 }
    )
  }
}
