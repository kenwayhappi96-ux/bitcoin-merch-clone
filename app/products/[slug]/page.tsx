// app/products/[slug]/page.tsx
// PAS DE 'use client' → c'est un Server Component

import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'

// Import de TOUTES les icônes utilisées dans la page (c'est la clé !)
import { 
  Star, Trophy, Check, ChevronLeft, 
  Store, Flag, Truck, 
  DollarSign, Gift, ShoppingBasket, 
  ShoppingCart 
} from 'lucide-react'

import AddToCartButton from './AddToCartButton'
import QuickView from '@/components/QuickView'
import ReviewsCarousel from '@/components/Reviewscarousel'
import ProductCarousel1 from '@/components/ProductCarousel1'
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
  } catch (error) {
    console.error("Error fetching product:", error)
    return null
  }
}

async function getProductImages(productId: number) {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"
    const res = await fetch(`${baseUrl}/api/products/${productId}/images`, {
      cache: "no-store",
    })

    if (!res.ok) return []

    const data = await res.json()
    return data.images
      ?.filter((img: any) => img.is_primary === 0)
      .map((img: any) => img.image_url) || []
  } catch (error) {
    console.error("Error fetching product images:", error)
    return []
  }
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params

  const product = await getProduct(slug)

  if (!product) {
    notFound()
  }

  const secondaryImages = await getProductImages(product.id)
  const allProductsData = await getProducts()
  const products = allProductsData.products || []

  const discountPercent = product.discountPrice
    ? Math.round(((product.price - product.discountPrice) / product.price) * 100)
    : 0

  return (
    <main className="min-h-screen">
      <section className="container pt-16 pb-8 px-4 max-w-6xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-4 items-center w-full">
          {/* Left side: Images */}
          <div className='lg:w-[50%] w-full'>
            <QuickView
              product={product}
              secondaryImages={secondaryImages}
              isPage
            />
          </div>

          {/* Right side: informations */}
          <div className="w-full lg:w-[50%] bg-white flex flex-col gap-5">
            <h1 className="text-[26px] font-bold text-black">
              Bitcoin Merch® - {product.name}
            </h1>

            <div className="flex items-center gap-3">
              {product.discountPrice ? (
                <>
                  <span className="text-2xl font-bold text-black">
                    €{product.discountPrice.toFixed(2)}
                  </span>
                  <span className="text-2xl line-through font-bold text-black">
                    €{product.price.toFixed(2)}
                  </span>
                </>
              ) : (
                <span className="text-2xl font-bold text-black">
                  €{product.price.toFixed(2)}
                </span>
              )}
            </div>

            <p className="leading-relaxed text-left text-[15px] font-medium">
              {product.description}
            </p>

            <ul className="flex flex-col gap-3 text-[15px]">
              {[
                '10% Off Everything From Bitcoin Merch',
                'Stackable Discount Up To 15% Off',
                'Free Gift In Your 1st Order',
                'Extended Warranty On Items Bought During Duration Of Membership',
                'Priority Order Processing & Dedicated Customer Support',
                'Full Access To Active Telegram Mining Posse',
                'Access to our White Label Program, start selling lucky miners',
              ].map((perk, index) => (
                <li key={index} className="flex items-start gap-2 text-black">
                  ⭐{perk}
                </li>
              ))}
            </ul>

            <div className="flex flex-col gap-4 mt-4">
              <button className="w-full bg-blue-600 hover:bg-blue-700 transition text-white font-bold py-3 rounded-md flex items-center justify-center gap-2">
                👉 Get Your Legend Battle Pass
              </button>

              <button className="w-full bg-yellow-300 hover:bg-yellow-400 transition text-black font-bold py-3 rounded-md flex items-center justify-center gap-2">
                <Trophy className="w-5 h-5 text-black fill-black" />
                Get Up To 20% Off With Legend Battle Pass
              </button>

              <button className="w-full bg-orange-300 hover:bg-orange-400 transition text-black font-bold py-3 rounded-md flex items-center justify-center gap-2">
                <Check className="w-5 h-5 text-black fill-black" />
                Start Off With $7.99 Battle Pass
              </button>
            </div>

            <div className="h-full w-full justify-center flex-row flex items-center">
              <div className="w-46.5">
                <Link href='/' className="relative text-black! text-center">
                  <span className="text-[24px] block mb-3 font-medium">Excellent</span>
                  <span className="mb-3 mx-auto block">
                    <div className='relative h-0 w-full pb-[18%] px-0 pt-0'>
                      <svg role="img" viewBox="0 0 251 46" width={251} height={46} xmlns="http://www.w3.org/2000/svg" className="absolute h-full w-full left-0 top-0 block">
                        {/* Ton SVG étoiles Trustpilot complet */}
                        <title id="starRating-06nd6jekdl4q" lang="en-US">4.4 out of 5 star rating on Trustpilot</title>
                        {/* ... colle ici tout le contenu SVG des étoiles que tu avais ... */}
                      </svg>
                    </div>
                  </span>
                  <span className="text-[13px] mb-4 mx-0 mt-0 [line-height: 16px] block">
                    Based on <span className='underline'>937 views</span>
                  </span>
                  <span className="block w-26.5 mx-auto my-0">
                    <div className='relative h-0 w-full pb-[24%] px-0 pt-0'>
                      <svg role="img" viewBox="0 0 126 31" width={126} height={31} xmlns="http://www.w3.org/2000/svg" className="absolute h-full w-full left-0 top-0 block">
                        <title id="trustpilotLogo-30968frkwfr">Trustpilot</title>
                        {/* ... colle ici tout le contenu SVG du logo que tu avais ... */}
                      </svg>
                    </div>
                  </span>
                </Link>
              </div>

              <div className='w-full flex-col gap-2 overflow-hidden hidden md:flex'>
                <ReviewsCarousel/>
                <p className="text-left! ml-16 text-xs text-gray-500 mt-6 font-medium">
                  Showing our 4 & 5 star reviews
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Shipping */}
      <section className="w-full bg-[#0038d1]">
        <div className="max-w-7xl mx-auto px-4 lg:px-14 py-20">
          <div className="flex flex-col md:flex-row lg:items-center justify-center gap-8 md:gap-16 text-white">
            <div className="flex items-center gap-4">
              <Store className="w-10 h-10 lg:w-14 lg:h-14 text-[#ffb400]" />
              <span className="text-xl! md:text-base font-medium">
                Pick Up In-Store In LA
              </span>
            </div>
            <div className="flex items-center gap-4">
              <Flag className="w-10 h-10 lg:w-14 lg:h-14 text-[#ffb400]" />
              <span className="text-xl! md:text-base font-medium">
                Ship From USA Warehouse
              </span>
            </div>
            <div className="flex items-center gap-4">
              <Truck className="w-10 h-10 lg:w-14 lg:h-14 text-[#ffb400]" />
              <span className="text-xl! md:text-base font-medium">
                Germany → All Of Europe
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Perks */}
      <section className="max-w-6xl mx-auto px-4 pt-16 pb-8 container">
        <div className="border-2 border-[#fd9619] py-6 mb-12 text-center shadow-xl">
          <h2 className="text-3xl md:text-5xl font-bold flex items-center justify-center gap-4 text-black">
            <Star className="text-[#fd9619] w-10 h-10 md:w-13 md:h-13 fill-[#fd9619]" />
            Legend Battle Pass Membership Perks
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="border-2 border-blue-600 rounded-xl p-8 text-center">
            <DollarSign className="w-15 h-15 text-[#fd9619] mx-auto mb-2" />
            <h3 className="font-bold text-lg mb-4 text-black">15% Off Most Of Store</h3>
            <p className="text-lg! text-black leading-relaxed">
              15% Off Bitaxe Miners & Bitaxe Spare Parts / Upgrades –
              All Bitcoin Merch Products under "Exclusive Lottery Miners",
              In-Store Items & "Best Selling Merch" like tees, pillows & more.
            </p>
          </div>

          <div className="border-2 border-blue-600 rounded-xl p-8 text-center">
            <Gift className="w-15 h-15 text-[#fd9619] mx-auto mb-2" />
            <h3 className="font-bold text-lg mb-4 text-black">Free Miner Every Month</h3>
            <p className="text-lg! text-black leading-relaxed">
              When you make your first order as a Bitcoin Battle Pass member,
              we include a free random gift (Bitaxe, Gold Nugget, etc.).
              Free miner delivered every month.
            </p>
          </div>

          <div className="border-2 border-blue-600 rounded-xl p-8 text-center">
            <ShoppingBasket className="w-15 h-15 text-[#fd9619] mx-auto mb-2" />
            <h3 className="font-bold text-lg mb-4 text-black">Stackable Discount</h3>
            <p className="text-lg! text-black leading-relaxed">
              Unlimited stackable discount. 20% off select products when you buy
              2 or more. Stackable discounts apply storewide including holidays.
            </p>
          </div>
        </div>
      </section>

      {/* Add to cart */}
      <section className="max-w-6xl mx-auto px-4 pt-16 pb-8 container">
        <div className="border-2 border-[#fd9619] py-2 mb-12 text-center bg-[#0038d1]">
          <h2 className="text-2xl font-bold flex items-center justify-center gap-2 text-white">
            Add Your Legend Battle Pass To Cart
            <ShoppingCart className="text-white w-5 h-5 fill-white" />
          </h2>
        </div>
        <div className='relative w-full h-96'>
          <Image
            src={'/ref/c2.JPG'}
            alt='add'
            fill
            className='object-cover'
          />
        </div>
      </section>

      {/* Carousel Bitcoin & Lottery */}
      <section className="max-w-6xl mx-auto px-4 pt-16 pb-8 container">
        <div className="border-3 border-[#0038d1] py-2 mb-12 text-center bg-yellow-600">
          <h2 className="text-3xl font-bold flex items-center justify-center gap-2 text-black">
            Bitcoin & Lottery Miners Eligible For 15% Off With Battle Pass
          </h2>
        </div>
        <ProductCarousel1 products={products}/>
      </section>

      {/* Community */}
      <section className="max-w-6xl mx-auto px-4 pt-16 pb-8 container">
        <div className="border-2 border-[#fd9619] py-2 mb-24 text-center bg-[#0038d1]">
          <h2 className="text-3xl flex items-center justify-center gap-2 text-white">
            Join The Legendary Battle Pass Club
            <ShoppingCart className="text-white w-5 h-5 fill-white" />
          </h2>
        </div>
        <h2 className='text-3xl text-center text-black font-semibold mb-14'>Check Out What Our Community Is Saying About Us On Trust Pilot :)</h2>
        <div className='relative w-full h-96'>
          <Image
            src={'/ref/c1.JPG'}
            alt='add'
            fill
            className='object-cover'
          />
        </div>
        <div className="px-4 py-12">
          <h2 className="text-2xl font-bold text-center mb-8 text-black">
            Customer Reviews
          </h2>
          <div className="flex flex-col md:flex-row items-center justify-center gap-6">
            <div className="text-center md:text-left">
              <div className="flex justify-center md:justify-start gap-1 mb-2">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                ))}
              </div>
              <p className="text-gray-700">Be the first to write a review</p>
            </div>
            <div className="hidden md:block w-px h-12 bg-gray-300" />
            <button className="bg-orange-500 hover:bg-orange-600 transition text-white font-bold px-8 py-3 rounded">
              WRITE A REVIEW
            </button>
          </div>
        </div>
      </section>

      {/* Lucky Pool */}
      <section
        className="relative w-full py-4 px-6 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/ref/dra.jpg')" }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-white/90 via-white/80 to-white/90" />
        <div className="relative max-w-7xl mx-auto flex flex-col items-center gap-4 text-center md:text-left z-10">
          <h2 className="uppercase text-3xl md:text-4xl font-[670] text-[#f18a1d] mb-8">
            Switch to BITCOIN Merch LUCKY POOL
          </h2>
          <p className="text-xl md:text-2xl font-bold">
            USA Hashrate : <span className="text-[#00b67a]">1,57 PH/s</span>
          </p>
          <Link
            href="/pool"
            className="bg-white review text-[#f18a1d]! px-10 py-2 rounded-full font-bold text-xl shadow-2xl transition-all duration-300 whitespace-nowrap"
          >
            SWITCH NOW!
          </Link>
        </div>
      </section>

      {/* You may also like */}
      <section className='max-w-6xl mx-auto px-4 pt-16 pb-8 container'>
        <p className='text-left! font-semibold text-xl text-black!'>You may also like</p>
        <ProductCarousel2 products={products}/>
      </section>
    </main>
  )
}