import ProductCard from '@/components/ProductCard'
import ProductGrid from '@/components/ProductGrid'
import { Pickaxe } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

export async function getProducts() {
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

export default async function LuckyMinersPage() {
  const data = await getProducts()
  const allProducts = data.products || []
  
  // Filtrer les produits de la catégorie Lucky Miners
  const luckyMinersProducts = allProducts.filter((p: any) => 
    p.category === 'Lucky Miners'
  )

  return (
    <main className="min-h-screen bg-white">
      <section className="py-12 px-4">
        <div className="max-w-7xl mx-auto">
          {luckyMinersProducts.length > 0 ? (
            <ProductGrid initialProducts={luckyMinersProducts} />
          ) : (
            <div className="text-center py-16 bg-white rounded-xl shadow-sm">
              <Pickaxe className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Aucun produit Lucky Miners disponible
              </h3>
              <p className="text-gray-600 mb-6">
                Les produits de cette collection seront bientôt disponibles.
              </p>
            </div>
          )}
        </div>
      </section>

      <section className="py-8 px-4 bg-white">
        <div className="flex flex-col justify-center items-center">
          <div className="relative w-full max-w-[85rem] h-[300px] md:h-[500px] overflow-hidden rounded-lg shadow-xl">
            <Image
              src="/ref/i1.jpg"
              alt="Mission Image"
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>
      </section>

      {/* Bannière Pool - Full width avec image de fond */}
      <section 
        className="relative w-full py-4 px-6 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/ref/dra.jpg')" }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-white/90 via-white/80 to-white/90" />
        
        <div className="relative max-w-7xl mx-auto flex flex-col items-center gap-4 text-center md:text-left z-10">
          <h2 className="uppercase text-3xl md:text-4xl font-[670] text-[#f18a1d] mb-8">
            Switch to BITCOIN Merch LUCKY POOL
          </h2>
          <p className="text-xl md:text-2xl font-bold">
            USA Hashrate : <span className="text-[#00b67a]">1,50 PH/s</span>
          </p>
          <Link
            href="/pool"
            className="bg-white review text-[#f18a1d]! px-10 py-2 rounded-full font-bold text-xl shadow-2xl transition-all duration-300 whitespace-nowrap"
          >
            SWITCH NOW!
          </Link>
        </div>
      </section>
    </main>
  )
}
