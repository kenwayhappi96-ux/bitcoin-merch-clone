'use client'

import Link from 'next/link'
import { Star, Gift, Check, Store, Flag, Truck, DollarSign, ShoppingBasket, ShoppingCart } from 'lucide-react'
import Image from 'next/image'
import { getProducts } from '../collections/lucky-miners/page'
import { useEffect, useState } from 'react'
import QuickView from '@/components/QuickView'
import ReviewsCarousel from '@/components/Reviewscarousel'
import ProductCarousel1 from '@/components/ProductCarousel1'
import ProductCarousel2 from '@/components/ProductCarousel2'

export default function BattlePassPage() {
  const [product, setProduct] = useState<any | null>(null)
  const [products, setProducts] = useState<any[]>([])
  const [secondaryImages, setSecondaryImages] = useState<string[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await getProducts()
        if (data?.products?.length) {
          // Recherche intelligente du Battle Pass
          const battlePass = data.products.find((p: any) =>
            p.name?.toLowerCase().includes('battle pass') ||
            p.name?.toLowerCase().includes('légende') ||
            p.name?.toLowerCase().includes('passe de combat') ||
            p.category?.toLowerCase().includes('battle pass') ||
            p.category_id === 3
          ) || data.products.find((p: any) => p.isFeatured === 1)

          if (battlePass) {
            setProduct(battlePass)
          }
          setProducts(data.products)
        }
      } catch (err) {
        console.error('Erreur chargement produits:', err)
      } finally {
        setLoading(false)
      }
    }

    loadProducts()
  }, [])

  useEffect(() => {
    if (!product?.id) return

    fetch(`/api/products/${product.id}/images`)
      .then(res => res.ok ? res.json() : Promise.reject())
      .then(data => {
        const images = data.images
          ?.filter((img: any) => img.is_primary === 0)
          ?.map((img: any) => img.image_url) || []
        setSecondaryImages(images)
      })
      .catch(err => console.error('Erreur images secondaires:', err))
  }, [product?.id])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Chargement du Battle Pass...</p>
        </div>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-xl text-gray-700">Produit Battle Pass non trouvé</p>
      </div>
    )
  }

  // Données dynamiques depuis la BD
  const name = product.name || 'Bitcoin Merch® - Passe de combat Légende'
  const currentPrice = Number(product.discountPrice || product.price || 42.99)
  const originalPrice = Number(product.originalPrice || product.price || 85.99)
  const description = product.description || ''

  // Split description pour garder la mise en page naturelle
  const descriptionParts = description.split('\n\n')

  return (
    <main className="min-h-screen">
      <section className="container pt-16 pb-8 px-4 max-w-6xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-4 items-center w-full">
          {/* Left side: Images */}
          <div className="lg:w-[50%] w-full">
            <QuickView
              product={product}
              secondaryImages={secondaryImages}
              isPage
            />
          </div>

          {/* Right side: informations */}
          <div className="w-full lg:w-[50%] bg-white flex flex-col gap-5">
            {/* Title */}
            <h1 className="text-[26px] font-bold text-black">
              {name}
            </h1>

            {/* Price */}
            <div className="flex items-center gap-3">
              <span className="text-2xl font-bold text-black">
                €{currentPrice.toFixed(2)}
              </span>
              {originalPrice !== currentPrice && (
                <span className="text-2xl line-through font-bold text-gray-500">
                  €{originalPrice.toFixed(2)}
                </span>
              )}
            </div>

            {/* Description + Perks depuis la BD */}
            <div className="space-y-3 text-[15px] leading-relaxed">
              {descriptionParts.map((part, index) => (
                <p key={index} className="text-black font-medium whitespace-pre-line">
                  {part.trim()}
                </p>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col gap-4 mt-4">
              <button className="w-full bg-blue-600 hover:bg-blue-700 transition text-white font-bold py-3 rounded-md flex items-center justify-center gap-2">
                👉 Get Your Legend Battle Pass
              </button>
              <button className="w-full bg-yellow-300 hover:bg-yellow-400 transition text-black font-bold py-3 rounded-md flex items-center justify-center gap-2">
                <Check className="w-5 h-5" />
                Start Off With $7.99 Battle Pass
              </button>
            </div>

            {/* Trustpilot + Avis (exactement comme ton code qui marche) */}
            <div className="h-full w-full justify-center flex-row flex items-center">
              {/* Gauche : Note globale + Trustpilot */}
              <div className="w-46.5">
                <Link href='/' className="relative text-black! text-center">
                  <span className="text-[24px] block mb-3 font-medium">Excellent</span>
                  <span className="mb-3 mx-auto block">
                    <div className='relative h-0 w-full pb-[18%] px-0 pt-0'>
                      <svg role="img" viewBox="0 0 251 46" width={251} height={46} xmlns="http://www.w3.org/2000/svg" className="absolute h-full w-full left-0 top-0 block">
                        <title id="starRating-06nd6jekdl4q" lang="en-US">4.4 out of 5 star rating on Trustpilot</title>
                        <g className="tp-star">
                          <path className="tp-star__canvas" fill="#00b67a" d="M0 46.330002h46.375586V0H0z"></path>
                          <path className="tp-star__shape" d="M39.533936 19.711433L13.230239 38.80065l3.838216-11.797827L7.02115 19.711433h12.418975l3.837417-11.798624 3.837418 11.798624h12.418975zM23.2785 31.510075l7.183595-1.509576 2.862114 8.800152L23.2785 31.510075z" fill="#FFF"></path>
                        </g>
                        <g className="tp-star">
                          <path className="tp-star__canvas" fill="#00b67a" d="M51.24816 46.330002h46.375587V0H51.248161z"></path>
                          <path className="tp-star__canvas--half" fill="#00b67a" d="M51.24816 46.330002h23.187793V0H51.248161z"></path>
                          <path className="tp-star__shape" d="M74.990978 31.32991L81.150908 30 84 39l-9.660206-7.202786L64.30279 39l3.895636-11.840666L58 19.841466h12.605577L74.499595 8l3.895637 11.841466H91L74.990978 31.329909z" fill="#FFF"></path>
                        </g>
                        <g className="tp-star">
                          <path className="tp-star__canvas" fill="#00b67a" d="M102.532209 46.330002h46.375586V0h-46.375586z"></path>
                          <path className="tp-star__canvas--half" fill="#00b67a" d="M102.532209 46.330002h23.187793V0h-23.187793z"></path>
                          <path className="tp-star__shape" d="M142.066994 19.711433L115.763298 38.80065l3.838215-11.797827-10.047304-7.291391h12.418975l3.837418-11.798624 3.837417 11.798624h12.418975zM125.81156 31.510075l7.183595-1.509576 2.862113 8.800152-10.045708-7.290576z" fill="#FFF"></path>
                        </g>
                        <g className="tp-star">
                          <path className="tp-star__canvas" fill="#00b67a" d="M153.815458 46.330002h46.375586V0h-46.375586z"></path>
                          <path className="tp-star__canvas--half" fill="#00b67a" d="M153.815458 46.330002h23.187793V0h-23.187793z"></path>
                          <path className="tp-star__shape" d="M193.348355 19.711433L167.045457 38.80065l3.837417-11.797827-10.047303-7.291391h12.418974l3.837418-11.798624 3.837418 11.798624h12.418974zM177.09292 31.510075l7.183595-1.509576 2.862114 8.800152-10.045709-7.290576z" fill="#FFF"></path>
                        </g>
                        <g className="tp-star">
                          <path className="tp-star__canvas" fill="#dcdce6" d="M205.064416 46.330002h46.375587V0h-46.375587z"></path>
                          <path className="tp-star__canvas--half" fill="#00b67a" d="M205.064416 46.330002h23.187793V0h-23.187793z"></path>
                          <path className="tp-star__shape" d="M244.597022 19.711433l-26.3029 19.089218 3.837419-11.797827-10.047304-7.291391h12.418974l3.837418-11.798624 3.837418 11.798624h12.418975zm-16.255436 11.798642l7.183595-1.509576 2.862114 8.800152-10.045709-7.290576z" fill="#FFF"></path>
                        </g>
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
                        {/* Ton SVG logo Trustpilot complet ici - copie-le de ton code qui marche */}
                        <path className="tp-logo__text" d="..." fill="#191919"></path>
                        {/* ... reste du SVG logo ... */}
                      </svg>
                    </div>
                  </span>
                </Link>
              </div>

              {/* Centre : Avis défilants – exactement comme ton code fonctionnel */}
              <div className='w-full flex-col gap-2 overflow-hidden hidden md:flex'>
                <ReviewsCarousel />
                <p className="text-left! ml-16 text-xs text-gray-500 mt-6 font-medium">
                  Showing our 4 & 5 star reviews
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Shipping info */}
      <section className="w-full bg-[#0038d1]">
        <div className="max-w-7xl mx-auto px-4 lg:px-14 py-20">
          <div className="flex flex-col md:flex-row lg:items-center justify-center gap-8 md:gap-16 text-white">
            <div className="flex items-center gap-4">
              <Store className="w-10 h-10 lg:w-14 lg:h-14 text-[#ffb400]" />
              <span className="text-xl! md:text-base font-medium">Pick Up In-Store In LA</span>
            </div>
            <div className="flex items-center gap-4">
              <Flag className="w-10 h-10 lg:w-14 lg:h-14 text-[#ffb400]" />
              <span className="text-xl! md:text-base font-medium">Ship From USA Warehouse</span>
            </div>
            <div className="flex items-center gap-4">
              <Truck className="w-10 h-10 lg:w-14 lg:h-14 text-[#ffb400]" />
              <span className="text-xl! md:text-base font-medium">Germany → All Of Europe</span>
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

      {/* Add to cart banner */}
      <section className="max-w-6xl mx-auto px-4 pt-16 pb-8 container">
        <div className="border-2 border-[#fd9619] py-2 mb-12 text-center bg-[#0038d1]">
          <h2 className="text-2xl font-bold flex items-center justify-center gap-2 text-white">
            Add Your Legend Battle Pass To Cart
            <ShoppingCart className="text-white w-5 h-5 fill-white" />
          </h2>
        </div>
        <div className='relative w-full h-96'>
          <Image src={'/ref/c2.JPG'} alt='add' fill className='object-cover' />
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

      {/* Community & Reviews */}
      <section className="max-w-6xl mx-auto px-4 pt-16 pb-8 container">
        <div className="border-2 border-[#fd9619] py-2 mb-24 text-center bg-[#0038d1]">
          <h2 className="text-3xl flex items-center justify-center gap-2 text-white">
            Join The Legendary Battle Pass Club
            <ShoppingCart className="text-white w-5 h-5 fill-white" />
          </h2>
        </div>
        <h2 className='text-3xl text-center text-black font-semibold mb-14'>
          Check Out What Our Community Is Saying About Us On Trust Pilot :)
        </h2>
        <div className='relative w-full h-96'>
          <Image src={'/ref/c1.JPG'} alt='add' fill className='object-cover' />
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

      {/* Lucky Pool banner */}
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