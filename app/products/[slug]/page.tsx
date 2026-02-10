// app/products/[slug]/page.tsx

import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import {
  Store,
  Flag,
  Truck,
  Check,
  Star,
  ChevronDown,
  User,
} from 'lucide-react'

import ReviewsCarousel from '@/components/Reviewscarousel'
import ProductCarousel2 from '@/components/ProductCarousel2'
import { getProducts, getProductBySlug } from '@/lib/api/products'
import LuckyWinnersCarousel from '@/components/LuckyWinnersCarousel'
import { ratingDistribution, reviewss } from '@/lib/constants'
import { QuickView } from '@/components/QuickView'

// Typage minimal du produit (adapte selon ton type réel si besoin)
type Product = {
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
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params

  // Récupération du produit
  const product = await getProductBySlug(slug)
  if (!product) {
    notFound()
  }

  // Images secondaires
  const secondaryImages = await getProductImages(product.id)

  // Tous les produits pour carrousels
  const allProductsData = await getProducts()
  const products: Product[] = Array.isArray(allProductsData)
    ? allProductsData
    : allProductsData?.products ?? []

  // Gestion prix
  const price = product.discountPrice ?? product.price
  const comparePrice = product.originalPrice ?? product.price
  const hasDiscount = price < comparePrice

  // Extraction des perks depuis description
  const perks =
    product.description
      ?.split('\n')
      ?.filter((line) => line.trim().startsWith('✔️') || line.trim())
      ?.map((line) => line.replace('✔️', '').trim()) ?? []

  // Produits recommandés
  const recommendedProducts = products.length > 0 ? products.slice(0, 8) : []

  return (
    <main className="min-h-screen bg-white">
      {/* Hero principal – images + infos produit */}
      <section className="pt-12 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-10 md:gap-16 items-start">
          {/* Colonne gauche : images */}
          <div className="lg:sticky lg:top-8">
            <QuickView product={product} secondaryImages={secondaryImages} />
          </div>

          {/* Colonne droite : infos + prix + CTA + avis */}
          <div className="flex flex-col gap-6">
            {/* Nom du produit */}
            <h1 className="text-3xl md:text-4xl font-bold text-black leading-tight">
              {product.name}
            </h1>

            {/* Prix */}
            <div className="flex items-baseline gap-4">
              <span className="text-3xl md:text-4xl font-bold text-[#f5a623]">
                ${price.toFixed(2)}
              </span>
              {hasDiscount && (
                <span className="text-2xl md:text-3xl text-gray-600 line-through">
                  ${comparePrice.toFixed(2)}
                </span>
              )}
            </div>

            <p className="text-lg text-gray-800 font-medium">
              6x the machines - 6x the odds to mine a block!
            </p>

            {/* Liste des avantages */}
            <ul className="space-y-3 text-base text-gray-800">
              {perks.map((perk, i) => (
                <li key={i} className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-green-600 shrink-0 mt-1" />
                  <span>{perk}</span>
                </li>
              ))}
            </ul>

            {/* Bloc promo Battle Pass */}
            <div className="mt-4 p-5 bg-amber-50 rounded-xl border border-amber-200">
              <p className="text-lg font-bold text-center text-black">
                ✅ Buy 2 Or More Get 5% Off <br />
                👑 15% Off With Battle Pass | 👑 20% Off With Legend Pass
              </p>
            </div>

            {/* Sélecteur variantes */}
            <div className="mt-3">
              <select
                className="w-full text-black border border-black p-4 rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-amber-500"
                name="products-price"
                id=""
              >
                <option>Black - $59.99</option>
                <option>Gray - $79.99</option>
                <option>Black - $69.99</option>
              </select>
            </div>

            {/* Boutons CTA */}
            <div className="mt-4 space-y-4">
              <button className="w-full bg-gradient-to-r from-amber-500 to-yellow-500 text-black text-lg font-bold py-4 rounded-xl hover:opacity-90 transition">
                👉 Start Mining Now
              </button>

              <Link
                href="/battle-pass"
                className="block w-full text-center bg-blue-600 text-white text-lg font-bold py-4 rounded-xl hover:opacity-90 transition"
              >
                👑 Join Battle Pass Up To 20% Off 👑
              </Link>
            </div>

            {/* Trustpilot + Carousel des avis – placé exactement là où tu veux */}
            <div className="mt-10 pt-8 border-t border-gray-200">
              <div className="flex flex-col md:flex-row items-center md:items-start gap-6 md:gap-12">
                {/* Résumé Trustpilot */}
                <div className="text-center md:text-left min-w-[180px]">
                  <div className="text-3xl font-bold text-green-600">Excellent</div>
                  <div className="my-2">
                    <span className="text-sm text-gray-600">
                      4.4 out of 5 • Based on 937 reviews
                    </span>
                  </div>
                  <Link
                    href="https://www.trustpilot.com/review/bitcoinmerch.com"
                    target="_blank"
                    className="text-sm text-black hover:underline"
                  >
                    Trustpilot
                  </Link>
                </div>

                {/* Carousel des avis – responsive */}
                <div className="w-full max-w-3xl">
                  <ReviewsCarousel />
                  <p className="text-xs text-gray-500 mt-4 text-center md:text-left">
                    Showing our 4 & 5 star reviews
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section livraison */}
      <section className="bg-[#0036cc] text-white py-16">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-10 text-center">
            <div className="flex items-center justify-center gap-4">
              <Store className="w-14 h-14 text-[#f5a623]" />
              <h3 className="text-xl font-medium">Pick Up In-Store In LA</h3>
            </div>
            <div className="flex items-center justify-center gap-4">
              <Flag className="w-14 h-14 text-[#f5a623]" />
              <h3 className="text-xl font-medium">Ship From USA Warehouse</h3>
            </div>
            <div className="flex items-center justify-center gap-4">
              <Truck className="w-14 h-14 text-[#f5a623]" />
              <h3 className="text-xl font-medium">Germany → All Of Europe</h3>
            </div>
          </div>
        </div>
      </section>

      {/* Flip vidéo + texte */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-14 items-start">
          <div className="rounded-3xl overflow-hidden h-0 pb-[100%] relative">
            <video
              src="https://cdn.shopify.com/videos/c/o/v/73c163970a974f6f8c4756ad2921617d.mp4"
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-auto object-cover"
              controls={false}
            />
          </div>

          <div className="space-y-6">
            <div className="lg:sticky lg:top-8">
              <h2 className="text-[30px] font-bold text-[#f5a623] text-left leading-relaxed mb-8">
                Unlock 144 chances of mining 3.125 Bitcoin EVERY SINGLE DAY!
              </h2>

              <p className="text-[22px] text-left text-gray-800 leading-loose max-w-xl mb-[31px] font-[400]">
                The Gold Digger Lottery Miner is a convenient, zero-effort BTC mining device
                that lets you generate fresh “lottery tickets” every 10 minutes for the full
                Bitcoin block reward (3.125 BTC, worth ~$350,000 at today’s prices).
                It runs automatically, 24/7, with no setup and no effort required.
              </p>

              <p className="text-[22px] text-left text-gray-800 leading-loose max-w-xl mb-[31px] font-[400]">
                Unlike actual lottery tickets, this is not a one-time gamble - the Gold Digger Miner is your long-term companion in the race. The longer it runs, the more entries you stack.
              </p>

              <p className="flex items-center gap-2 text-[22px] font-semibold text-left text-gray-900">
                <span className="text-green-600">✓</span>
                Uses less power than a nightlight
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Carousel Lucky Winners */}
      <LuckyWinnersCarousel />

      {/* Section AI Chip */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-14 items-start">
          <div className="rounded-3xl overflow-hidden h-0 pb-[100%] relative">
            <Image
              src={product.image || '/ref/logo.png'}
              alt={product.name}
              fill
              className="w-full h-auto object-cover"
            />
          </div>

          <div className="space-y-6">
            <div className="lg:sticky lg:top-24 self-start">
              <h2 className="text-[30px] font-bold text-[#f5a623] leading-relaxed mb-8">
                3000% more chances with our
                <br />
                <span className="italic underline">Next-Gen AI Chip</span>
              </h2>

              <p className="text-[22px] text-left text-gray-800 leading-loose max-w-xl mb-[31px] font-[400]">
                Powered by the new ESP32-D0 AI chip, the 2025 Gold Digger miner delivers up to 30x more computational power than earlier NerdMiner or Gold Digger versions.
              </p>

              <p className="text-[22px] text-left text-gray-800 leading-loose max-w-xl mb-[31px] font-[400]">
                <span className="underline">The 2025 Gold Digger comes with faster hashing, smarter energy use, and increases odds of landing a Bitcoin block</span> - whilst still consuming just pennies in electricity.
              </p>

              <p className="flex items-center gap-2 text-[22px] font-semibold text-left text-gray-900">
                <span className="text-green-600">✓</span>
                No tech knowledge required.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pourquoi Bitcoin Merch – tableau comparatif */}
      <section className="py-20">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-[46px] font-bold text-center text-black mb-12 leading-relaxed">
            Why shop with <br />
            <span className="text-[#f5a623] italic">Bitcoin Merch</span>
          </h2>

          <div className="overflow-x-auto text-center p-2.5 text-[20px] border border-[#22242626]">
            <table className="w-full text-black border-collapse">
              <thead className="bg-[#f9fafb] text-center font-bold">
                <tr>
                  <th className="px-4 py-3 text-[#f5a623]">Bitcoin Merch</th>
                  <th className="px-4 py-3">The Other Guys</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-[#22242626] hover:bg-[#22242626]">
                  <td className="px-4 py-3">✅ Real US Company</td>
                  <td className="px-4 py-3">Based in Foreign Countries</td>
                </tr>
                <tr className="border-b border-[#22242626] hover:bg-[#22242626]">
                  <td className="px-4 py-3">✅ 9 Years of Satisfying Customers</td>
                  <td className="px-4 py-3">Pop-Up Dropshipping Brands</td>
                </tr>
                <tr className="border-b border-[#22242626] hover:bg-[#22242626]">
                  <td className="px-4 py-3">✅ Sourced & Shipped from California</td>
                  <td className="px-4 py-3">Slow delivery from China</td>
                </tr>
                <tr className="border-b border-[#22242626] hover:bg-[#22242626]">
                  <td className="px-4 py-3">✅ Lifetime Warranty & Live Support</td>
                  <td className="px-4 py-3">Limited Warranty, Limited Support</td>
                </tr>
                <tr className="hover:bg-[#22242626]">
                  <td className="px-4 py-3">✅ Trust Pilot Verified</td>
                  <td className="px-4 py-3">Fake Reviews</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="max-w-7xl mx-auto mt-10 px-6">
          <button className="w-full py-4 text-lg font-bold text-white bg-[#f5a623] rounded-xl hover:opacity-90 transition">
            Order Yours Now
          </button>
        </div>
      </section>

      {/* Lifetime Warranty */}
      <section className="py-16 bg-[#4b4b4b] text-white">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Lifetime Warranty – <span className="text-[#f5a623] italic">Start Mining Instantly</span>
          </h2>
          <p className="text-xl md:text-2xl leading-relaxed max-w-4xl mx-auto">
            Experience Bitcoin mining with zero risk. Try for 90 days — if it doesn’t impress you, send it back. Every device is backed by a lifetime warranty.
          </p>
        </div>
      </section>

      {/* FAQ Accordion */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 text-black">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-12">
            Frequently Asked Questions
          </h2>

          <div className="max-w-4xl mx-auto">
            <details className="mb-4 border border-gray-300 rounded-lg">
              <summary className="flex justify-between items-center p-5 cursor-pointer font-bold text-lg">
                How much can I make using a crypto miner from Bitcoin Merch?
                <ChevronDown className="w-6 h-6 transition-transform" />
              </summary>
              <div className="px-5 pb-5 text-gray-700">
                Revenues vary and depend on factors such as current coin price, network difficulty, and cost of electricity. We recommend using an online mining calculator (for example, CryptoCompare’s Mining Calculator) to estimate potential earnings.
              </div>
            </details>

            <details className="mb-4 border border-gray-300 rounded-lg">
              <summary className="flex justify-between items-center p-5 cursor-pointer font-bold text-lg">
                When will my order ship?
                <ChevronDown className="w-6 h-6 transition-transform" />
              </summary>
              <div className="px-5 pb-5 text-gray-700">
                We typically ship orders placed on weekdays the same day if ordered before 2 PM PST. Custom-build orders may take longer.
              </div>
            </details>

            <details className="mb-4 border border-gray-300 rounded-lg">
              <summary className="flex justify-between items-center p-5 cursor-pointer font-bold text-lg">
                Do you ship internationally?
                <ChevronDown className="w-6 h-6 transition-transform" />
              </summary>
              <div className="px-5 pb-5 text-gray-700">
                Yes — we ship to almost any country around the globe. You can add items to your cart and checkout to see shipping options and estimates for your region.
              </div>
            </details>

            {/* Ajoute les autres questions FAQ ici si besoin */}
          </div>
        </div>

        <div className="max-w-7xl mx-auto mt-12 px-6">
          <button className="w-full py-4 text-lg font-bold text-white bg-[#f5a623] rounded-xl hover:opacity-90 transition">
            Order Yours Now
          </button>
        </div>
      </section>

      {/* Avis clients */}
      <section className="bg-white py-20 px-6 max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-12 text-black">
          What our <span className="text-[#f5a623] italic">Customers</span> say.
        </h2>

        <div className="grid md:grid-cols-3 gap-10 items-center border-b pb-10">
          <div className="text-center">
            <div className="flex justify-center mb-2">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="w-6 h-6 fill-yellow-400 text-yellow-400" />
              ))}
            </div>
            <p className="text-xl font-semibold text-black">4.78 out of 5</p>
            <p className="text-sm text-gray-500">Based on 9 reviews</p>
          </div>

          <div className="space-y-2">
            {ratingDistribution.map((r) => (
              <div key={r.stars} className="flex items-center gap-3">
                <div className="flex w-20">
                  {Array.from({ length: r.stars }).map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <div className="flex-1 bg-gray-200 h-3 rounded-full overflow-hidden">
                  <div
                    className="bg-emerald-700 h-3"
                    style={{ width: `${(r.count / 9) * 100}%` }}
                  />
                </div>
                <span className="text-sm text-gray-500 w-6 text-right">{r.count}</span>
              </div>
            ))}
          </div>

          <div className="text-center md:text-right">
            <button className="bg-[#f7931a] text-white font-semibold px-8 py-3 rounded hover:opacity-90 transition">
              WRITE A REVIEW
            </button>
          </div>
        </div>

        <div className="mt-12 space-y-12">
          {reviewss.map((r, i) => (
            <div key={i} className="border-b pb-10 last:border-b-0">
              <div className="flex items-center justify-between mb-3">
                <div className="flex gap-1">
                  {Array.from({ length: r.rating }).map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <span className="text-sm text-gray-400">{r.date}</span>
              </div>

              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
                  <User className="text-green-800 w-6 h-6" />
                </div>
                <span className="font-semibold text-green-800">{r.name}</span>
              </div>

              <p className="font-bold text-lg mt-1">{r.title}</p>
              <p className="text-gray-700 mt-3 leading-relaxed">{r.text}</p>
            </div>
          ))}
        </div>

        <div className="mt-16">
          <button className="w-full py-4 text-lg font-bold text-white bg-[#f5a623] rounded-xl hover:opacity-90 transition">
            Order Yours Now
          </button>
        </div>
      </section>

      {/* Bannière Switch to Pool */}
      <section
        className="relative w-full py-16 px-6 bg-cover bg-center"
        style={{ backgroundImage: "url('/ref/dra.jpg')" }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-white/85 via-white/75 to-white/85" />
        <div className="relative max-w-7xl mx-auto text-center z-10">
          <h2 className="text-4xl md:text-5xl font-black uppercase text-[#f18a1d] mb-6 tracking-tight">
            Switch to BITCOIN MERCH LUCKY POOL
          </h2>
          <p className="text-2xl md:text-3xl font-bold mb-8">
            USA Hashrate : <span className="text-green-600">2.05 PH/s</span>
          </p>
          <Link
            href="/pool"
            className="inline-block bg-transparent border-4 border-white text-[#f18a1d] px-12 py-5 rounded-full font-bold text-xl shadow-2xl hover:bg-white hover:text-black transition"
          >
            SWITCH NOW!
          </Link>
        </div>
      </section>

      {/* Bannière Battle Pass */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-[1400px] mx-auto rounded-2xl overflow-hidden shadow-2xl">
          <Image
            src="/ref/1.svg"
            alt="Bitcoin Merch Mission"
            width={1400}
            height={600}
            className="w-full h-auto object-cover"
          />
        </div>
      </section>

      {/* You may also like */}
      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-xl md:text-2xl font-bold text-left mb-8">You may also like</h2>

          {recommendedProducts.length > 0 ? (
            <ProductCarousel2 products={recommendedProducts} />
          ) : (
            <p className="text-center text-gray-500 py-12">
              Aucun produit similaire disponible pour le moment
            </p>
          )}
        </div>
      </section>
    </main>
  )
}

// Helper pour images (inchangé)
async function getProductImages(productId: number) {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'
    const res = await fetch(`${baseUrl}/api/products/${productId}/images`, {
      cache: 'no-store',
    })
    if (!res.ok) return []
    const data = await res.json()
    return data.images?.filter((img: any) => img.is_primary === 0).map((img: any) => img.image_url) || []
  } catch (err) {
    console.error('Erreur images:', err)
    return []
  }
}