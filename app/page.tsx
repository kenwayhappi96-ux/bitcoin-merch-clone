import HeroCarousel from '@/components/HeroCarousel'
import ProductCard from '@/components/ProductCard'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, RefreshCw, Phone, Truck, Zap, Shield, Headphones } from 'lucide-react'
import ReviewsCarousel from '@/components/Reviewscarousel'

async function getProducts() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/products`, {
      cache: 'no-store'
    })
    if (!res.ok) return []
    const data = await res.json()
    return data.products || []
  } catch (error) {
    console.error('Erreur fetch products:', error)
    return []
  }
}

export default async function Home() {
  const products = await getProducts()

  const luckyMiners = products.filter((p: any) =>
    p.category?.toLowerCase().includes('lucky') ||
    p.category?.toLowerCase().includes('lottery') ||
    p.name?.toLowerCase().includes('lottery')
  )

  const bitaxeMiners = products.filter((p: any) =>
    p.category?.toLowerCase().includes('bitaxe') ||
    p.name?.toLowerCase().includes('bitaxe') ||
    p.name?.toLowerCase().includes('nerdqaxe') ||
    p.name?.toLowerCase().includes('zyber')
  )

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Hero */}
      <HeroCarousel />

      {/* Trustpilot */}
      <section className="bg-gray-100 py-8 px-4 border-b border-gray-300">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16">
          <div className="text-center md:text-left">
            <div className="text-3xl font-bold text-green-600">Excellent</div>
            <div className="my-2">
              <span className="text-sm text-gray-600">4.4 out of 5 • Based on 900+ reviews</span>
            </div>
            <Link href="https://www.trustpilot.com/review/bitcoinmerch.com" target="_blank" className="text-black text-sm">
              Trustpilot
            </Link>
          </div>
          <div className="hidden md:block w-full max-w-2xl">
            <ReviewsCarousel />
            <p className="text-xs text-gray-500 mt-4 text-center md:text-left">
              Showing our 4 & 5 star reviews
            </p>
          </div>
        </div>
      </section>

      {/* Bannière Pool */}
      <section
        className="relative w-full py-12 px-6 bg-cover bg-center"
        style={{ backgroundImage: "url('/ref/dra.jpg')" }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-white/85 via-white/75 to-white/85" />
        <div className="relative max-w-7xl mx-auto text-center z-10">
          <h2 className="text-4xl md:text-5xl font-black uppercase text-[#f18a1d] mb-6 tracking-tight">
            Switch to BITCOIN MERCH LUCKY POOL
          </h2>
          <p className="text-2xl md:text-3xl font-bold mb-8">
            USA Hashrate : <span className="text-green-600">~1.7+ PH/s</span>
          </p>
          <Link
            href="/pool"
            className="inline-block bg-white text-[#f18a1d] px-12 py-4 rounded-full font-bold text-xl shadow-2xl hover:shadow-3xl transition-all hover:scale-105"
          >
            SWITCH NOW!
          </Link>
        </div>
      </section>

      {/* Avantages */}
      <section className="py-12 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div className="flex flex-col items-center gap-2">
              <Truck className="w-10 h-10 text-black" />
              <h3 className="font-bold uppercase text-sm">SHIPPED FROM CALIFORNIA</h3>
              <p className="text-sm text-gray-600">Direct from our warehouse</p>
            </div>
            <div className="flex flex-col items-center gap-2">
              <Zap className="w-10 h-10 text-black" />
              <h3 className="font-bold uppercase text-sm">FAST DELIVERY</h3>
              <p className="text-sm text-gray-600">5-7 business days</p>
            </div>
            <div className="flex flex-col items-center gap-2">
              <Shield className="w-10 h-10 text-black" />
              <h3 className="font-bold uppercase text-sm">BITCOIN MERCH WARRANTY</h3>
              <p className="text-sm text-gray-600">All products guaranteed</p>
            </div>
            <div className="flex flex-col items-center gap-2">
              <Headphones className="w-10 h-10 text-black" />
              <h3 className="font-bold uppercase text-sm">CUSTOMER SUPPORT</h3>
              <p className="text-sm text-gray-600">Email, chat & phone</p>
            </div>
          </div>
        </div>
      </section>

      {/* Lottery Miners */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-12">Bitcoin Merch Lottery Miners</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {luckyMiners.length > 0 ? (
              luckyMiners.slice(0, 8).map((product: any) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  showQuickView={false} // Pas de Quick View sur homepage
                />
              ))
            ) : (
              <div className="col-span-full text-center py-16 text-gray-500">
                No products available yet
              </div>
            )}
          </div>
          <div className="text-center mt-12">
            <Link href="/collections/lucky-miners" className="inline-block bg-black text-white px-10 py-4 rounded-full font-bold hover:bg-gray-800 transition">
              View All Lottery Miners <ArrowRight className="inline ml-2" size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* Bitaxe Miners */}
      <section className="py-16 px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-12">Bitaxe Series Miners</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {bitaxeMiners.length > 0 ? (
              bitaxeMiners.slice(0, 8).map((product: any) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  showQuickView={false} // Pas de Quick View sur homepage
                />
              ))
            ) : (
              <div className="col-span-full text-center py-16 text-gray-500">
                No Bitaxe products available yet
              </div>
            )}
          </div>
          <div className="text-center mt-12">
            <Link href="/collections/bitaxe-miners" className="inline-block bg-black text-white px-10 py-4 rounded-full font-bold hover:bg-gray-800 transition">
              View All Bitaxe Miners <ArrowRight className="inline ml-2" size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* Banner finale */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-[1400px] mx-auto rounded-2xl overflow-hidden shadow-2xl">
          <Image
            src="/ref/i1.jpg"
            alt="Bitcoin Merch Mission"
            width={1400}
            height={600}
            className="w-full h-auto object-cover"
          />
        </div>
      </section>
    </main>
  )
}