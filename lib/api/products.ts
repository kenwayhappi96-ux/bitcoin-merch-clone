// lib/api/products.ts
// Fichier central pour toutes les requêtes produits

export type Product = {
  id: number
  slug: string
  name: string
  price: number
  discountPrice?: number
  originalPrice?: number
  image?: string
  description?: string
  category?: string
  inStock?: boolean
  // ajoute d'autres champs si besoin
}

export async function getProducts(): Promise<Product[]> {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'
    const res = await fetch(`${baseUrl}/api/products`, {
      cache: 'no-store',
      next: { revalidate: 60 }, // ISR léger (60 secondes)
    })

    if (!res.ok) {
      console.error('Fetch products failed:', res.status, res.statusText)
      return []
    }

    const data = await res.json()
    return Array.isArray(data) ? data : data?.products ?? []
  } catch (error) {
    console.error('Erreur lors de la récupération des produits:', error)
    return []
  }
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  try {
    const products = await getProducts()

    if (!Array.isArray(products) || products.length === 0) {
      return null
    }

    // Recherche par slug (insensible à la casse si tu veux)
    const product = products.find(
      (p: Product) => p.slug.toLowerCase() === slug.toLowerCase()
    )

    return product ?? null
  } catch (error) {
    console.error(`Erreur lors de la recherche du produit ${slug}:`, error)
    return null
  }
}

// Bonus : fonction pour les images (si tu l'utilises dans la page)
export async function getProductImages(productId: number): Promise<string[]> {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'
    const res = await fetch(`${baseUrl}/api/products/${productId}/images`, {
      cache: 'no-store',
    })

    if (!res.ok) {
      console.error('Fetch product images failed:', res.status)
      return []
    }

    const data = await res.json()
    return data.images
      ?.filter((img: any) => img.is_primary === 0)
      ?.map((img: any) => img.image_url || img.url) ?? []
  } catch (error) {
    console.error('Erreur images produit:', error)
    return []
  }
}