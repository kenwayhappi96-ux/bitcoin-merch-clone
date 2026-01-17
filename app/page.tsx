import HeroCarousel from '@/components/HeroCarousel'
import ProductCard from '@/components/ProductCard'
import AllProductsSection from '@/components/AllProductsSection'
import Link from 'next/link'
import Image from 'next/image'
import { 
  ArrowRight, 
  RefreshCw, 
  Phone, 
  Truck, 
  Zap, 
  Shield, 
  Headphones 
} from 'lucide-react'

// Fonction pour récupérer les produits depuis l'API
async function getProducts() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/products`, {
      cache: 'no-store'
    })
   
    if (!res.ok) {
      return []
    }
   
    const data = await res.json()
    return data.products || []
  } catch (error) {
    console.error('Erreur fetch products:', error)
    return []
  }
}

export default async function Home() {
  const products = await getProducts()
 
  // Séparer les produits par catégorie
  const luckyMiners = products.filter((p: any) => p.category === 'Lucky Miners')
  const bitaxeMiners = products.filter((p: any) => p.category === 'Bitaxe Miners')

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Hero Carousel */}
      <HeroCarousel />

      {/* Trustpilot Reviews - Full width */}
      <section className="bg-white py-8 px-4 w-full border-b border-gray-200">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
            {/* Gauche : Note globale + Trustpilot */}
            <div className="flex items-center gap-6 min-w-[280px]">
              <div className="flex flex-col items-center">
                <div className="text-5xl font-extrabold text-green-600">Excellent</div>
                <div className="flex mt-2">
                  {Array(5).fill(0).map((_, i) => (
                    <svg key={i} className="w-7 h-7 text-green-600 fill-current" viewBox="0 0 20 20">
                      <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                    </svg>
                  ))}
                </div>
                <div className="text-sm text-gray-600 mt-2 font-medium">Basé sur 933 avis</div>
              </div>

              <div className="flex items-center gap-3">
                <Image 
                  src="/ref/trustpilot-logo.png" 
                  alt="Trustpilot" 
                  width={120} 
                  height={40} 
                  className="object-contain" 
                />
              </div>
            </div>

            {/* Centre : Avis défilants (simulation carousel) */}
            <div className="flex-1 overflow-x-auto pb-4 scrollbar-thin scrollbar-thumb-gray-300">
              <div className="flex gap-6 min-w-max">
                {[
                  { text: "Very good communication thank you Chris. One of the tech support!", author: "Raymi Polanco, January 1" },
                  { text: "Was a fast deliver and item is working perfectly.", author: "Paulo Santos, December 27" },
                  { text: "It's a nice service, good incentives with all the discounts...", author: "Mike Spaeth, December 27" },
                  { text: "The order came in about 10 days and it was exactly what I ordered.", author: "John, December 27" },
                ].map((review, idx) => (
                  <div 
                    key={idx} 
                    className="min-w-[320px] bg-white p-5 rounded-xl shadow-md border border-gray-200 flex-shrink-0"
                  >
                    <div className="flex items-center gap-1 mb-3">
                      {Array(5).fill(0).map((_, i) => (
                        <svg key={i} className="w-5 h-5 text-green-600 fill-current" viewBox="0 0 20 20">
                          <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                        </svg>
                      ))}
                      {idx === 0 && (
                        <span className="ml-3 text-xs font-medium text-green-700 bg-green-50 px-2.5 py-1 rounded-full">Verified</span>
                      )}
                    </div>
                    <p className="text-gray-800 text-base leading-relaxed mb-3">{review.text}</p>
                    <p className="text-sm text-gray-500">{review.author}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Droite : Boutons navigation + lien */}
            <div className="hidden lg:flex items-center gap-4">
              <button className="p-3 rounded-full bg-gray-100 hover:bg-gray-200 transition">
                <ArrowRight className="w-6 h-6 rotate-180" />
              </button>
              <button className="p-3 rounded-full bg-gray-100 hover:bg-gray-200 transition">
                <ArrowRight className="w-6 h-6" />
              </button>
            </div>
          </div>

          <p className="text-center text-sm text-gray-500 mt-6 font-medium">
            Nous affichons uniquement nos avis 4 et 5 étoiles
          </p>
        </div>
      </section>

      {/* Bannière Pool - Full width avec image de fond */}
      <section 
        className="relative w-full py-16 px-6 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/ref/dra.jpg')" }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-pink-200/70 via-purple-200/60 to-blue-200/70" />
        
        <div className="relative max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left z-10">
          <div>
            <h2 className="text-3xl md:text-5xl font-black text-white tracking-wide uppercase drop-shadow-lg mb-4">
              PASSEZ AUX PRODUITS DÉRIVÉS BITCOIN LUCKY POOL
            </h2>
            <p className="text-xl md:text-2xl font-bold text-white drop-shadow-md">
              Taux de hachage aux États-Unis : <span className="text-yellow-300">1,47 PH/s</span>
            </p>
          </div>

          <Link
            href="/pool"
            className="bg-white text-red-600 px-10 py-5 rounded-full font-bold text-xl shadow-2xl hover:shadow-3xl hover:scale-105 transition-all duration-300 whitespace-nowrap"
          >
            SWITCH NOW!
          </Link>
        </div>
      </section>

      {/* Section avantages - style identique à ton image (inchangée, mais ajustée pour fluidité) */}
      <section className="py-10 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* 1. Expédié depuis la Californie */}
            <div className="flex items-start gap-4">
              <Truck className="w-9 h-9 text-black flex-shrink-0 mt-1" strokeWidth={1.7} />
              <div>
                <h3 className="font-bold text-sm uppercase tracking-wider mb-1">
                  SHIPPED FROM CALIFORNIA
                </h3>
                <p className="text-gray-700 text-sm leading-snug">
                  We ship all orders directly from our warehouse to your home.
                </p>
              </div>
            </div>

            {/* 2. Livraison rapide */}
            <div className="flex items-start gap-4">
              <Truck className="w-9 h-9 text-black flex-shrink-0 mt-1" strokeWidth={1.7} />
              <div>
                <h3 className="font-bold text-sm uppercase tracking-wider mb-1">
                  FAST DELIVERY
                </h3>
                <p className="text-gray-700 text-sm leading-snug">
                  Most orders ship within 7 business days.
                </p>
              </div>
            </div>

            {/* 3. Garantie */}
            <div className="flex items-start gap-4">
              <RefreshCw className="w-9 h-9 text-black flex-shrink-0 mt-1" strokeWidth={1.7} />
              <div>
                <h3 className="font-bold text-sm uppercase tracking-wider mb-1">
                  BITCOIN MERCH WARRANTY
                </h3>
                <p className="text-gray-700 text-sm leading-snug">
                  All our products are guaranteed.
                </p>
              </div>
            </div>

            {/* 4. Service client */}
            <div className="flex items-start gap-4">
              <Phone className="w-9 h-9 text-black flex-shrink-0 mt-1" strokeWidth={1.7} />
              <div>
                <h3 className="font-bold text-sm uppercase tracking-wider mb-1">
                  CUSTOMER SERVICE
                </h3>
                <p className="text-gray-700 text-sm leading-snug">
                  First-class email, chat, and phone support.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* All Products Section */}
      <AllProductsSection initialProducts={products} />

      {/* Lucky Miners Section (inchangée) */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">Lucky Miners Collection</h2>
              <p className="text-gray-600 text-lg">Lottery mining made simple and profitable</p>
            </div>
            <Link href="/collections/lucky-miners" className="hidden md:flex items-center gap-2 text-[#3b82f6] font-semibold hover:text-[#2563eb] transition">
              View All
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {luckyMiners.length > 0 ? (
              luckyMiners.slice(0, 4).map((product: any) => (
                <ProductCard 
                  key={product.id} 
                  product={{
                    ...product,
                    images: [{ id: 0, product_id: product.id, url: product.image, is_primary: true, display_order: 1 }],
                    category_id: 1,
                    created_at: new Date()
                  }} 
                />
              ))
            ) : (
              <div className="col-span-4 text-center py-12">
                <p className="text-gray-600 text-lg">Aucun produit disponible pour le moment</p>
                <p className="text-gray-500 text-sm mt-2">Ajoutez des produits via le dashboard admin</p>
              </div>
            )}
          </div>

          <Link href="/collections/lucky-miners" className="md:hidden flex items-center justify-center gap-2 text-[#3b82f6] font-semibold hover:text-[#2563eb] transition mt-6">
            View All Lucky Miners
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* Bitaxe Miners Section (inchangée) */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">Bitaxe Miners</h2>
              <p className="text-gray-600 text-lg">Open-source mining hardware for enthusiasts</p>
            </div>
            <Link href="/collections/bitaxe-miners" className="hidden md:flex items-center gap-2 text-[#3b82f6] font-semibold hover:text-[#2563eb] transition">
              View All
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {bitaxeMiners.length > 0 ? (
              bitaxeMiners.slice(0, 4).map((product: any) => (
                <ProductCard 
                  key={product.id} 
                  product={{
                    ...product,
                    images: [{ id: 0, product_id: product.id, url: product.image, is_primary: true, display_order: 1 }],
                    category_id: 2,
                    created_at: new Date()
                  }} 
                />
              ))
            ) : (
              <div className="col-span-4 text-center py-12">
                <p className="text-gray-600 text-lg">Aucun produit disponible pour le moment</p>
                <p className="text-gray-500 text-sm mt-2">Ajoutez des produits via le dashboard admin</p>
              </div>
            )}
          </div>

          <Link href="/collections/bitaxe-miners" className="md:hidden flex items-center justify-center gap-2 text-[#3b82f6] font-semibold hover:text-[#2563eb] transition mt-6">
            View All Bitaxe Miners
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* Mission Statement Section - Now Image (inchangée) */}
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
    </main>
  )
}