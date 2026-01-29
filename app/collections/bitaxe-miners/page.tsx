import ProductCard from '@/components/ProductCard'
import ProductGrid from '@/components/ProductGrid'
import { Cpu } from 'lucide-react'

async function getProducts() {
  try {
    const res = await fetch('http://localhost:3000/api/products', {
      cache: 'no-store'
    })
    
    if (!res.ok) {
      return { success: false, products: [] }
    }
    
    return await res.json()
  } catch (error) {
    console.error('Error fetching products:', error)
    return { success: false, products: [] }
  }
}

export default async function BitaxeMinersPage() {
  const data = await getProducts()
  const allProducts = data.products || []
  
  // Filtrer les produits de la catégorie Bitaxe Miners
  const bitaxeProducts = allProducts.filter((p: any) => 
    p.category === 'Bitaxe Miners'
  )

  return (
    <main className="min-h-screen bg-white">
      <section className="py-12 px-4">
        <div className="max-w-7xl mx-auto">
          {bitaxeProducts.length > 0 ? (
            <ProductGrid initialProducts={bitaxeProducts} />
          ) : (
            <div className="text-center py-16 bg-white rounded-xl shadow-sm">
              <Cpu className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Aucun produit Bitaxe disponible
              </h3>
              <p className="text-gray-600 mb-6">
                Les produits de cette collection seront bientôt disponibles.
              </p>
            </div>
          )}
        </div>
      </section>
    </main>
  )
}
