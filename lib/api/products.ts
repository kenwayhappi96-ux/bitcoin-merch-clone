// lib/api/products.ts
export async function getProducts() {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'
    const res = await fetch(`${baseUrl}/api/products`, {
      cache: 'no-store',
      next: { revalidate: 60 } // optionnel : ISR léger si tu veux
    })

    if (!res.ok) {
      console.error('Fetch products failed:', res.status)
      return []
    }

    const data = await res.json()
    return data.products || []
  } catch (error) {
    console.error('Erreur fetch products:', error)
    return []
  }
}