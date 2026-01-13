import { NextRequest, NextResponse } from 'next/server'
import { query } from '@/lib/db'
import bcrypt from 'bcryptjs'

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()
    const { id, currentPassword, newPassword } = body

    if (!id || !currentPassword || !newPassword) {
      return NextResponse.json(
        { success: false, error: 'Tous les champs sont requis' },
        { status: 400 }
      )
    }

    // Récupérer l'admin
    const admins = await query<any[]>(
      'SELECT password FROM admins WHERE id = ?',
      [id]
    )

    if (admins.length === 0) {
      return NextResponse.json(
        { success: false, error: 'Admin non trouvé' },
        { status: 404 }
      )
    }

    // Vérifier le mot de passe actuel
    const isValid = await bcrypt.compare(currentPassword, admins[0].password)

    if (!isValid) {
      return NextResponse.json(
        { success: false, error: 'Mot de passe actuel incorrect' },
        { status: 401 }
      )
    }

    // Hasher le nouveau mot de passe
    const hashedPassword = await bcrypt.hash(newPassword, 10)

    // Mettre à jour le mot de passe
    await query(
      'UPDATE admins SET password = ? WHERE id = ?',
      [hashedPassword, id]
    )

    return NextResponse.json({
      success: true,
      message: 'Mot de passe mis à jour avec succès',
    })
  } catch (error) {
    console.error('Error updating password:', error)
    return NextResponse.json(
      { success: false, error: 'Erreur lors de la mise à jour du mot de passe' },
      { status: 500 }
    )
  }
}
