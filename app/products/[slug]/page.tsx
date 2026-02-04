// app/products/[slug]/page.tsx
// Toujours un Server Component → pas de 'use client' ici

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
} from 'lucide-react'

import QuickView from '@/components/QuickView'
import ReviewsCarousel from '@/components/Reviewscarousel'
import ProductCarousel2 from '@/components/ProductCarousel2'
import { getProducts, getProductBySlug } from '@/lib/api/products'
import LuckyWinnersCarousel from '@/components/LuckyWinnersCarousel'

// Typage minimal (adapte selon ton type Product réel)
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

  // Récupération du produit principal
  const product = await getProductBySlug(slug)
  if (!product) {
    notFound()
  }

  // Récupération des images secondaires
  const secondaryImages = await getProductImages(product.id)

  // Récupération de TOUS les produits (pour carousel "winners" et "you may also like")
  const allProductsData = await getProducts()
  const products: Product[] = Array.isArray(allProductsData)
    ? allProductsData
    : allProductsData?.products ?? [] // gestion robuste si API renvoie { products: [...] }

  // Prix et promo
  const price = product.discountPrice ?? product.price
  const comparePrice = product.originalPrice ?? product.price
  const hasDiscount = price < comparePrice

  // Parsing perks depuis description (adapte selon format réel)
  const perks =
    product.description
      ?.split('\n')
      ?.filter((line) => line.trim().startsWith('✔️') || line.trim())
      ?.map((line) => line.replace('✔️', '').trim()) ?? []

  // Produits recommandés (8 premiers, ou vide si aucun)
  const recommendedProducts = products.length > 0 ? products.slice(0, 8) : []

  return (
    <main className="min-h-screen bg-white">
      {/* 1. Hero principal */}
      <section className="pt-12 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-start">
          {/* Images / Vidéo */}
          <div className="space-y-6">
            <div className="lg:sticky lg:top-8 aspect-square rounded-2xl overflow-hidden">
              <QuickView product={product} secondaryImages={secondaryImages} isPage />
            </div>
          </div>

          {/* Infos produit + CTA */}
          <div className="flex flex-col gap-6 overflow-hidden">
            <div className="w-full flex flex-col md:flex-row items-center justify-center gap-6">
              <div className="text-center md:text-left">
                <div className="text-3xl font-bold text-green-600">Excellent</div>
                <div className="my-2">
                  <span className="text-sm text-gray-600">4.4 out of 5 • Based on 900+ reviews</span>
                </div>
                <Link href="https://www.trustpilot.com/review/bitcoinmerch.com" target="_blank" className="text-black text-sm">
                  Trustpilot
                </Link>
              </div>
              <div className="hidden lg:block w-full">
                <ReviewsCarousel />
                <p className="text-xs text-gray-500 mt-4 text-center md:text-left">
                  Showing our 4 & 5 star reviews
                </p>
              </div>
            </div>
            <h1 className="text-[30px] font-bold text-black leading-tight">
              {product.name}
            </h1>

            {/* Prix */}
            <div className="flex items-baseline gap-4">
              <span className="text-[28px] font-bold text-[#f5a623]">
                ${price.toFixed(2)}
              </span>
              {hasDiscount && (
                <span className="text-[28px] text-black line-through">
                  ${comparePrice.toFixed(2)}
                </span>
              )}
            </div>

            <p className="text-[16px] font-medium text-gray-800">
              6x the machines - 6x the odds to mine a block!
            </p>

            {/* Avantages */}
            <ul className="space-y-4 text-[16px] text-gray-800">
              {perks.map((perk, i) => (
                <li key={i} className="flex items-start gap-3">
                  <Check className="w-4 h-4 text-green-600 shrink-0 mt-1" />
                  <span>{perk}</span>
                </li>
              ))}
            </ul>

            {/* Promo Battle Pass */}
            <div className="mt-4 p-4 rounded-xl">
              <p className="text-lg font-bold text-center text-black">
                ✅ Buy 2 Or More Get 5% Off <br />
                👑 15% Off With Battle Pass | 👑 20% Off With Legend Pass
              </p>
            </div>

            <div className="mt-4 rounded-xl">
              <select className='w-full text-black border border-black p-3 rounded' name="products-price" id="">
                <option>Black - $59.99</option>
                <option>Gray - $79.99</option>
                <option>Black - $69.99</option>
              </select>
            </div>

            {/* CTA */}
            <div className="mt-2 space-y-4">
              <button className="w-full bg-gradient-to-r from-amber-500 to-yellow-500 text-black text-lg py-3 rounded-xl transform]">
                👉 Start Mining Now
              </button>

              <Link
                href="/battle-pass"
                className="block w-full text-center bg-blue-600 text-white text-lg py-3 rounded-xl transform"
              >
                👑 Join Battle Pass Up To 20% Off 👑
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Section livraison */}
      <section className="bg-[#0036cc] text-white py-16">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-10 text-center">
            <div className="flex items-center gap-4">
              <Store className="w-14 h-14 text-[#f5a623]" />
              <h3 className="text-xl font-medium">Pick Up In-Store In LA</h3>
            </div>
            <div className="flex items-center gap-4">
              <Flag className="w-14 h-14 text-[#f5a623]" />
              <h3 className="text-xl font-medium">Ship From USA Warehouse</h3>
            </div>
            <div className="flex items-center gap-4">
              <Truck className="w-14 h-14 text-[#f5a623]" />
              <h3 className="text-xl font-medium">Germany → All Of Europe</h3>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Flip vidéo + texte */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-14 items-start">
          
          {/* Media */}
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

          {/* Content */}
          <div className="space-y-6">
            <div className='lg:sticky lg:top-24 self-start'>
              <h2 className="text-[30px] font-bold text-[#f5a623] leading-relaxed mb-8">
                Unlock 144 chances of mining 3.125 Bitcoin EVERY SINGLE DAY!
              </h2>

              <p className="text-[22px] text-gray-800 leading-loose max-w-xl mb-[31px] font-[400] [word-break:break-word;]">
                The Gold Digger Lottery Miner is a convenient, zero-effort BTC mining device
                that lets you generate fresh “lottery tickets” every 10 minutes for the full
                Bitcoin block reward (3.125 BTC, worth ~$350,000 at today’s prices).
                It runs automatically, 24/7, with no setup and no effort required.Unlike actual lottery tickets, this is not a one-time gamble - the Gold Digger Miner is your long-term companion in the race. The longer it runs, the more entries you stack.
              </p>

              <p className="flex items-center gap-2 text-[22px] font-semibold text-gray-900">
                <span className="text-green-600">✓</span>
                Uses less power than a nightlight
              </p>
            </div>
          </div>
        </div>
      </section>


      <section className="py-24 px-6 bg-[#4b4b4b]">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-14 items-center lg:items-start">
          
          {/* Content */}
          <div className="space-y-6">
            <div className='lg:sticky'>
              <h2 className="text-[30px] font-bold text-white leading-relaxed mb-8">
                All-year Bitcoin mining for just{" "}
                <span className="text-[#f5a623]">11 cents{" "}
                of electricity a month</span>
              </h2>

              <p className="text-[22px] text-gray-100 leading-loose max-w-xl mb-[31px] font-[400] [word-break:break-word;]">
                <strong>Scared of the heavy electricity bills often associated
                with typical BTC mining?</strong> The Gold Digger Miner is built to run 24/7
                at just 24 watts per day, which equals only about 0.72 kWh a month(∼11 cents per month) to run nonstop.
              </p>

              <p className="text-[22px] text-gray-100 leading-loose max-w-xl mb-[31px] font-[400] [word-break:break-word;]">
                For less than the price of a gumball, you’ll have a device silently,
                yet rapidly stacking chances at the 3.125 BTC block reward, day and night.
              </p>

              <p className="text-[22px] font-normal text-white">
                ✓ Zero overheating or fan noise
              </p>

            </div>
          </div>

          {/* Media */}
          <div className="rounded-3xl overflow-hidden h-0 pb-[100%] relative">
            <video
              src="https://cdn.shopify.com/videos/c/o/v/3911c99bc2674dfcb48ed1e1d96cae4d.mp4"
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-auto object-cover"
              controls={false}
            />
          </div>
        </div>

        {/* CTA */}
        <div className="max-w-7xl mx-auto mt-14">
          <button className="w-full py-4 text-lg font-bold text-white bg-[#f5a623] rounded-xl hover:opacity-90 transition">
            Order Yours Now
          </button>
        </div>
      </section>


      {/* 4. Carousel Recent Lucky Winners */}
      <LuckyWinnersCarousel/>

      {/* Product */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-14 items-start">
          
          {/* Media */}
          <div className="rounded-3xl overflow-hidden h-0 pb-[100%] relative">
            <Image
              src={product.image||'/ref/logo.png'}
              alt={product.name}
              fill
              className="w-full h-auto object-cover"
            />
          </div>

          {/* Content */}
          <div className="space-y-6">
            <div className='lg:sticky lg:top-24 self-start'>
              <h2 className="text-[30px] font-bold text-[#f5a623] leading-relaxed mb-8">
                3000% more chances with our
                <br/>
                <span className='italic underline'>Next-Gen AI Chip</span>
              </h2>

              <p className="text-[22px] text-gray-800 leading-loose max-w-xl mb-[31px] font-[400] [word-break:break-word;]">
                Powered by the new ESP32-D0 AI chip, the 2025 Gold Digger miner delivers up to 30x more computational power than earlier NerdMiner or Gold Digger versions.
              </p>
              <p className="text-[22px] text-gray-800 leading-loose max-w-xl mb-[31px] font-[400] [word-break:break-word;]">
                <span className='underline'>The 2025 Gold Digger comes with faster hashing, smarter energy use, and increases odds of landing a Bitcoin block</span> - whilst still consuming just pennies in electricity.
              </p>

              <p className="flex items-center gap-2 text-[22px] font-semibold text-gray-900">
                <span className="text-green-600">✓</span>
                No tech knowledge required.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Pourquoi Bitcoin Merch (tableau comparatif) */}
      <section className="py-20">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-[46px] font-bold text-center text-black mb-12 [font-family:Poppins;] leading-relaxed">
            Why shop with <br/><span className="text-[#f5a623] italic">Bitcoin Merch</span>
          </h2>

          <div className="overflow-x-auto text-center p-2.5 text-[20px]! border border-[#22242626]">
            <table className="w-full text-black [border-spacing:0;]">
              <thead className='bg-[#f9fafb] text-center font-bold'>
                <tr>
                  <th className="px-4 py-2.5 text-[#f5a623]">Bitcoin Merch</th>
                  <th className="px-4 py-2.5">The Other Guys</th>
                </tr>
              </thead>
              <tbody className="">
                <tr className="border-b border-[#22242626] hover:bg-[#22242626]">
                  <td className="px-4 py-2.5">✅ Real US Company</td>
                  <td className="px-4 py-2.5">Based in Foreign Countries</td>
                </tr>
                <tr className="border-b border-[#22242626] hover:bg-[#22242626]">
                  <td className="px-4 py-2.5">✅ 9 Years of Satisfying Customers</td>
                  <td className="px-4 py-2.5">Pop-Up Dropshipping Brands</td>
                </tr>
                <tr className="border-b border-[#22242626] hover:bg-[#22242626]">
                  <td className="px-4 py-2.5">✅ Sourced & Shipped from California</td>
                  <td className="px-4 py-2.5">Slow delivery from China</td>
                </tr>
                <tr className="border-b border-[#22242626] hover:bg-[#22242626]">
                  <td className="px-4 py-2.5">✅ Lifetime Warranty & Live Support</td>
                  <td className="px-4 py-2.5">Limited Warranty, Limited Support</td>
                </tr>
                <tr className='hover:bg-[#22242626]'>
                  <td className="px-4 py-2.5">✅ Trust Pilot Verified</td>
                  <td className="px-4 py-2.5">Fake Reviews</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-14">
          <button className="w-full py-4 text-lg font-bold text-white bg-[#f5a623] rounded-xl hover:opacity-90 transition">
            Order Yours Now
          </button>
        </div>
      </section>

      {/* 6. Lifetime Warranty */}
      <section className="py-16 bg-[#4b4b4b] text-white">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-[46px] md:text-5xl font-bold mb-3">
            Lifetime Warranty – <span className='text-[#f5a623] italic'>Start Mining Instantly</span>
          </h2>
          <p className="text-[22px] leading-loose w-full mx-auto">
            Experience Bitcoin mining with zero risk. Try for 90 days — if it doesn’t impress you, send it back. Every device is backed by a lifetime warranty.
          </p>
        </div>
      </section>

      {/* 7. FAQ Accordion */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 text-black">
          <h2 className="text-[46px] text-center mb-12">Frequently Asked Questions</h2>

          <div className="">
            <details>
              <summary className="flex justify-between items-center p-6 cursor-pointer font-bold text-sm border-b border-black">
                How much can I make using a crypto miner from Bitcoin Merch?
                <ChevronDown className="w-7 h-7 transition-transform" />
              </summary>
              <div className="px-6 pt-6 text-black text-md">
                Revenues vary and depend on factors such as current coin price, network difficulty, and cost of electricity. We recommend using an online mining calculator (for example, CryptoCompare’s Mining Calculator) to estimate potential earnings.
              </div>
            </details>

            <details>
              <summary className="flex justify-between items-center p-6 cursor-pointer font-bold text-sm border-b border-black">
                When will my order ship?
                <ChevronDown className="w-7 h-7 transition-transform" />
              </summary>
              <div className="px-6 pt-6 text-black text-md">
                We typically ship orders placed on weekdays the same day if ordered before 2 PM PST. Custom-build orders may take longer.
              </div>
            </details>

            <details>
              <summary className="flex justify-between items-center p-6 cursor-pointer font-bold text-sm border-b border-black">
                Do you ship internationally?
                <ChevronDown className="w-7 h-7 transition-transform" />
              </summary>
              <div className="px-6 pt-6 text-black text-md">
                Yes — we ship to almost any country around the globe. You can add items to your cart and checkout to see shipping options and estimates for your region.
              </div>
            </details>

            <details>
              <summary className="flex justify-between items-center p-6 cursor-pointer font-bold text-sm border-b border-black">
                Do you provide one-on-one or custom assembly services?
                <ChevronDown className="w-7 h-7 transition-transform" />
              </summary>
              <div className="px-6 pt-6 text-black text-md">
                Yes — we offer professional consultation for mining setups and custom assembly services. Whether you’re building your own rig or want support optimizing one, we can help.
              </div>
            </details>

            <details>
              <summary className="flex justify-between items-center p-6 cursor-pointer font-bold text-sm border-b border-black">
                Why should I shop at bitcoin Merch instead of elsewhere?
                <ChevronDown className="w-7 h-7 transition-transform" />
              </summary>
              <div className="px-6 pt-6 text-black text-md">
                Because we not only sell equipment, we guide you through the Bitcoin ecosystem. With 9+ years in business and technical know-how, we aim to make crypto mining accessible, and we back our products and services with support.
              </div>
            </details>

          </div>
        </div>
         <div className="max-w-7xl mx-auto mt-14">
          <button className="w-full py-4 text-lg font-bold text-white bg-[#f5a623] rounded-xl hover:opacity-90 transition">
            Order Yours Now
          </button>
        </div>
      </section>

      {/* 8. Avis clients */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-[46px] text-black font-bold text-center mb-12">
            What our <span className="text-[#f5a623] italic">Customers</span> say.
          </h2>

        </div>

        <div className="max-w-7xl mx-auto mt-14">
          <button className="w-full py-4 text-lg font-bold text-white bg-[#f5a623] rounded-xl hover:opacity-90 transition">
            Order Yours Now
          </button>
        </div>
      </section>

      <section
        className="relative w-full py-12 px-6 bg-cover bg-center"
        style={{ backgroundImage: "url('/ref/dra.jpg')" }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-white/85 via-white/75 to-white/85" />
        <div className="relative max-w-7xl mx-auto text-center z-10">
          <h2 className="text-[41px] font-medium uppercase text-[#f18a1d] mb-6 tracking-tight">
            Switch to BITCOIN MERCH LUCKY POOL
          </h2>
          <p className="text-black font-bold mb-8">
            <span className='text-[24px]'>USA Hashrate : </span><span className="text-green-600 text-5xl">2.05 PH/s</span>
          </p>
          <Link
            href="/pool"
            className="inline-block bg-transparent border-4 border-white text-[#f18a1d] px-12 py-4 rounded-full font-bold text-xl shadow-2xl"
          >
            SWITCH NOW!
          </Link>
        </div>
      </section>

      <section className="py-16 px-6 bg-white">
        <div className="max-w-7xl mx-auto overflow-hidden">
          <Image
            src="https://cdn.shopify.com/s/files/1/2609/9556/files/NEW_Battle_Pass_Banner_Storewide_0a8ff50e-7c04-499a-927d-605078cf1c19.svg"
            alt="Bitcoin Merch Mission"
            width={1400}
            height={600}
            className="w-full h-auto object-cover"
          />
        </div>
      </section>

      {/* 9. You may also like */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-lg text-black font-bold text-left mb-4">You may also like</h2>

          {recommendedProducts.length > 0 ? (
            <ProductCarousel2 products={recommendedProducts} />
          ) : (
            <p className="text-center text-gray-500 py-8">
              Aucun produit similaire disponible pour le moment
            </p>
          )}
        </div>
      </section>
    </main>
  )
}

// Fonctions helpers (peux les déplacer dans lib/api/products.ts si tu veux)
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