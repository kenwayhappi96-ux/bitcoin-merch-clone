// app/products/[slug]/page.tsx
// Toujours Server Component (pas de 'use client' ici)

import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import {
  Store, Flag, Truck,
  Check, Star, Zap, Cpu, ShieldCheck,
  DollarSign, Gift, ShoppingBasket, ShoppingCart,
  ChevronDown // pour accordion
} from 'lucide-react'

import QuickView from '@/components/QuickView'
import ReviewsCarousel from '@/components/Reviewscarousel' // à adapter si tu veux Judge.me style
import ProductCarousel2 from '@/components/ProductCarousel2'
import { getProducts } from '@/app/collections/lucky-miners/page'

async function getProduct(slug: string) {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? "http://localhost:3000"
    const res = await fetch(`${baseUrl}/api/products`, { cache: "no-store" })
    if (!res.ok) return null
    const data = await res.json()
    if (!data?.products) return null
    return data.products.find((p: any) => p.slug === slug) ?? null
  } catch (err) {
    console.error(err)
    return null
  }
}

async function getProductImages(productId: number) {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"
    const res = await fetch(`${baseUrl}/api/products/${productId}/images`, { cache: "no-store" })
    if (!res.ok) return []
    const data = await res.json()
    return data.images?.filter((img: any) => img.is_primary === 0).map((img: any) => img.image_url) || []
  } catch (err) {
    console.error(err)
    return []
  }
}

export default async function ProductDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const product = await getProduct(slug)
  if (!product) notFound()

  const secondaryImages = await getProductImages(product.id)
  const { products } = await getProducts() || { products: [] }

  const price = product.discountPrice || product.price
  const comparePrice = product.originalPrice || product.price
  const hasDiscount = price < comparePrice

  // Exemple de parsing description (adapte selon format réel de ta BD)
  const perks = product.description
    ?.split('\n')
    ?.filter((l: string) => l.trim().startsWith('✔️') || l.trim())
    ?.map((l: string) => l.replace('✔️', '').trim()) || []

  return (
    <main className="min-h-screen bg-white">
      {/* 1. Hero principal (image + prix + avantages + CTA) */}
      <section className="pt-12 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-start">
          {/* Colonne gauche : images / vidéo */}
          <div className="space-y-6">
            <div className="relative aspect-square rounded-2xl overflow-hidden shadow-2xl border border-gray-200">
              <QuickView product={product} secondaryImages={secondaryImages} isPage />
            </div>

            {/* Vidéo démo principale (comme sur le site) */}
            <video
              src="https://cdn.shopify.com/videos/c/o/v/7b4488231e114c728c165a578902c405.mp4" // remplace par la tienne
              autoPlay
              loop
              muted
              playsInline
              className="w-full rounded-2xl shadow-lg"
              controls
            />
          </div>

          {/* Colonne droite : titre, prix, avantages, CTA */}
          <div className="flex flex-col gap-6 lg:sticky lg:top-8">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
              {product.name}
            </h1>

            {/* Prix */}
            <div className="flex items-baseline gap-4">
              <span className="text-5xl md:text-6xl font-extrabold text-orange-600">
                ${price.toFixed(2)}
              </span>
              {hasDiscount && (
                <span className="text-3xl text-gray-500 line-through">
                  ${comparePrice.toFixed(2)}
                </span>
              )}
            </div>

            {/* Sous-titre accroche */}
            <p className="text-xl md:text-2xl font-medium text-gray-800">
              6x the machines - 6x the odds to mine a block!
            </p>

            {/* Liste avantages */}
            <ul className="space-y-4 text-lg text-gray-800">
              {perks.map((perk: string, i: number) => (
                <li key={i} className="flex items-start gap-3">
                  <Check className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                  <span>{perk}</span>
                </li>
              ))}
            </ul>

            {/* Promo Battle Pass */}
            <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-xl">
              <p className="text-lg font-bold text-center text-amber-800">
                ✅ Buy 2 Or More Get 5% Off <br />
                👑 15% Off With Battle Pass | 👑 20% Off With Legend Pass
              </p>
            </div>

            {/* CTA principaux */}
            <div className="mt-6 space-y-4">
              <button className="w-full bg-orange-600 hover:bg-orange-700 text-white font-bold text-xl py-5 rounded-xl shadow-lg transition-all transform hover:scale-[1.02]">
                👉 Start Mining Now
              </button>

              <Link
                href="/battle-pass"
                className="block w-full text-center bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 text-white font-bold text-xl py-5 rounded-xl shadow-lg transition-all transform hover:scale-[1.02]"
              >
                👑 Join Battle Pass Up To 20% Off 👑
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Section livraison (3 icônes) */}
      <section className="bg-[#0036cc] text-white py-16">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-10 text-center">
            <div className="flex flex-col items-center gap-4">
              <Store className="w-14 h-14 text-[#f5a623]" />
              <h3 className="text-2xl font-medium">Pick Up In-Store In LA</h3>
            </div>
            <div className="flex flex-col items-center gap-4">
              <Flag className="w-14 h-14 text-[#f5a623]" />
              <h3 className="text-2xl font-medium">Ship From USA Warehouse</h3>
            </div>
            <div className="flex flex-col items-center gap-4">
              <Truck className="w-14 h-14 text-[#f5a623]" />
              <h3 className="text-2xl font-medium">Germany → All Of Europe</h3>
            </div>

            {/* Divider */}
            <div className="hidden md:block w-px h-12 bg-gray-300" />

            {/* Button */}
            <button className="bg-orange-500 hover:bg-orange-600 transition text-white font-bold px-8 py-3 rounded">
              WRITE A REVIEW
            </button>
          </div>
        </div>
      </section>

      {/* 3. Sections Flip vidéo + texte (exemples) */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto bg-gradient-to-b from-gray-50 to-white">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <video
            src="https://cdn.shopify.com/videos/c/o/v/3911c99bc2674dfcb48ed1e1d96cae4d.mp4" // remplace
            autoPlay
            loop
            muted
            playsInline
            className="rounded-2xl shadow-2xl"
            controls
          />

          <div className="space-y-6">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
              All-year Bitcoin mining for just{' '}
              <span className="text-[#f5a623]">66 cents</span> of electricity a month
            </h2>
            <p className="text-xl text-gray-700 leading-relaxed">
              Scared of the heavy electricity bills often associated with typical BTC mining? Each device runs 24/7 at just 24 watts per day — only ~$0.66/month for 6 miners.
            </p>
            <p className="text-lg font-medium">✓ Zero overheating or fan noise.</p>
          </div>
        </div>
      </section>

      {/* Autres sections flip similaires... */}

      {/* 4. Carousel Winners (Recent Lucky Bitcoin Winners) */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-10">
            Recent Lucky <span className="text-[#f5a623]">Bitcoin</span> Winners
          </h2>
          {/* Carousel d'images winners – utilise ProductCarousel2 ou un vrai slider */}
          <ProductCarousel2 products={products.slice(0, 8)} /> {/* à adapter */}
        </div>
      </section>

      {/* 5. Pourquoi Bitcoin Merch (tableau comparatif) */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-12">
            Why shop with <span className="text-[#f5a623]">Bitcoin Merch</span>
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-[#f5a623] text-white">
                  <th className="p-6 text-left text-xl font-bold">Bitcoin Merch</th>
                  <th className="p-6 text-left text-xl font-bold">The Other Guys</th>
                </tr>
              </thead>
              <tbody className="text-lg">
                <tr className="border-b">
                  <td className="p-6">✅ Real US Company</td>
                  <td className="p-6">Based in Foreign Countries</td>
                </tr>
                <tr className="border-b bg-gray-50">
                  <td className="p-6">✅ 9 Years of Satisfying Customers</td>
                  <td className="p-6">Pop-Up Dropshipping Brands</td>
                </tr>
                <tr className="border-b">
                  <td className="p-6">✅ Sourced & Shipped from California</td>
                  <td className="p-6">Slow delivery from China</td>
                </tr>
                <tr className="border-b bg-gray-50">
                  <td className="p-6">✅ Lifetime Warranty & Live Support</td>
                  <td className="p-6">Limited Warranty, Limited Support</td>
                </tr>
                <tr>
                  <td className="p-6">✅ Trust Pilot Verified</td>
                  <td className="p-6">Fake Reviews</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="mt-12 text-center">
            <Link
              href="#"
              className="inline-block bg-orange-600 hover:bg-orange-700 text-white font-bold text-xl px-12 py-5 rounded-xl shadow-lg"
            >
              Order Yours Now
            </Link>
          </div>
        </div>
      </section>

      {/* 6. Lifetime Warranty */}
      <section className="py-16 bg-gradient-to-br from-blue-900 to-blue-700 text-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-8">
            Lifetime Warranty – Start Mining Instantly
          </h2>
          <p className="text-xl leading-relaxed max-w-3xl mx-auto">
            Experience Bitcoin mining with zero risk. Try for 90 days — if it doesn’t impress you, send it back. Every device is backed by a lifetime warranty.
          </p>
        </div>
      </section>

      {/* 7. FAQ Accordion */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-12">Frequently Asked Questions</h2>

          <div className="space-y-4">
            <details className="bg-gray-50 rounded-xl shadow-sm">
              <summary className="flex justify-between items-center p-6 cursor-pointer font-medium text-xl">
                How much can I make using a crypto miner from Bitcoin Merch?
                <ChevronDown className="w-7 h-7 transition-transform" />
              </summary>
              <div className="px-6 pb-6 text-gray-700 text-lg">
                Revenues vary depending on coin price, network difficulty and electricity cost. Use an online mining calculator for estimates.
              </div>
            </details>

            {/* Ajoute les autres questions de la même façon */}
          </div>
        </div>
      </section>

      {/* 8. Avis clients + CTA final */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-12">
            What our <span className="text-[#f5a623]">Customers</span> say.
          </h2>

          {/* Ton ReviewsCarousel ou widget Judge.me */}
          <ReviewsCarousel />

          <div className="mt-12 text-center">
            <Link
              href="#"
              className="inline-block bg-orange-600 hover:bg-orange-700 text-white font-bold text-xl px-16 py-6 rounded-xl shadow-2xl"
            >
              Order Yours Now
            </Link>
          </div>
        </div>
      </section>

      {/* 9. You may also like */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-10">You may also like</h2>
          <ProductCarousel2 products={products} />
        </div>
      </section>
    </main>
  )
}