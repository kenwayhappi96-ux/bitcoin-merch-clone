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
  User,
} from 'lucide-react'

import ReviewsCarousel from '@/components/Reviewscarousel'
import ProductCarousel2 from '@/components/ProductCarousel2'
import { getProducts, getProductBySlug } from '@/lib/api/products'
import LuckyWinnersCarousel from '@/components/LuckyWinnersCarousel'
import { ratingDistribution, reviewss } from '@/lib/constants'
import { QuickView } from '@/components/QuickView'

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
        <div className="grid lg:grid-cols-2 gap-10 md:gap-16 items-start">
          {/* Images / Vidéo */}
          <div className="lg:sticky lg:top-8">
            <QuickView
              product={product}
              secondaryImages={secondaryImages}
            />
          </div>


          {/* Infos produit + CTA */}
          <div className="flex flex-col gap-6">
            <div className="max-w-7xl mx-auto">
              <div className="h-full max-w-full min-h-[150px] min-w-[300px] justify-center will-change-transform relative mx-auto my-0 flex-row items-center flex">
                {/* Gauche : Note globale + Trustpilot */}
                <div className="w-36.5 md:w-80">
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
                            <path className="tp-logo__text" d="M33.074774 11.07005H45.81806v2.364196h-5.010656v13.290316h-2.755306V13.434246h-4.988435V11.07005h.01111zm12.198892 4.319629h2.355341v2.187433h.04444c.077771-.309334.222203-.60762.433295-.894859.211092-.287239.466624-.56343.766597-.79543.299972-.243048.633276-.430858.999909-.585525.366633-.14362.744377-.220953 1.12212-.220953.288863 0 .499955.011047.611056.022095.1111.011048.222202.033143.344413.04419v2.408387c-.177762-.033143-.355523-.055238-.544395-.077333-.188872-.022096-.366633-.033143-.544395-.033143-.422184 0-.822148.08838-1.199891.254096-.377744.165714-.699936.41981-.977689.740192-.277753.331429-.499955.729144-.666606 1.21524-.166652.486097-.244422 1.03848-.244422 1.668195v5.39125h-2.510883V15.38968h.01111zm18.220567 11.334883H61.02779v-1.579813h-.04444c-.311083.574477-.766597 1.02743-1.377653 1.369908-.611055.342477-1.233221.51924-1.866497.51924-1.499864 0-2.588654-.364573-3.25526-1.104765-.666606-.740193-.999909-1.856005-.999909-3.347437V15.38968h2.510883v6.948968c0 .994288.188872 1.701337.577725 2.1101.377744.408763.922139.618668 1.610965.618668.533285 0 .96658-.077333 1.322102-.243048.355524-.165714.644386-.37562.855478-.65181.222202-.265144.377744-.596574.477735-.972194.09999-.37562.144431-.784382.144431-1.226288v-6.573349h2.510883v11.323836zm4.27739-3.634675c.07777.729144.355522 1.237336.833257 1.535623.488844.287238 1.06657.441905 1.744286.441905.233312 0 .499954-.022095.799927-.055238.299973-.033143.588836-.110476.844368-.209905.266642-.099429.477734-.254096.655496-.452954.166652-.198857.244422-.452953.233312-.773335-.01111-.320381-.133321-.585525-.355523-.784382-.222202-.209906-.499955-.364573-.844368-.497144-.344413-.121525-.733267-.232-1.17767-.320382-.444405-.088381-.888809-.18781-1.344323-.287239-.466624-.099429-.922138-.232-1.355432-.37562-.433294-.14362-.822148-.342477-1.166561-.596573-.344413-.243048-.622166-.56343-.822148-.950097-.211092-.386668-.311083-.861716-.311083-1.436194 0-.618668.155542-1.12686.455515-1.54667.299972-.41981.688826-.75124 1.14434-1.005336.466624-.254095.97769-.430858 1.544304-.541334.566615-.099429 1.11101-.154667 1.622075-.154667.588836 0 1.15545.066286 1.688736.18781.533285.121524 1.02213.320381 1.455423.60762.433294.276191.788817.640764 1.07768 1.08267.288863.441905.466624.98324.544395 1.612955h-2.621984c-.122211-.596572-.388854-1.005335-.822148-1.204193-.433294-.209905-.933248-.309334-1.488753-.309334-.177762 0-.388854.011048-.633276.04419-.244422.033144-.466624.088382-.688826.165715-.211092.077334-.388854.198858-.544395.353525-.144432.154667-.222203.353525-.222203.60762 0 .309335.111101.552383.322193.740193.211092.18781.488845.342477.833258.475048.344413.121524.733267.232 1.177671.320382.444404.088381.899918.18781 1.366542.287239.455515.099429.899919.232 1.344323.37562.444404.14362.833257.342477 1.17767.596573.344414.254095.622166.56343.833258.93905.211092.37562.322193.850668.322193 1.40305 0 .673906-.155541 1.237336-.466624 1.712385-.311083.464001-.711047.850669-1.199891 1.137907-.488845.28724-1.04435.508192-1.644295.640764-.599946.132572-1.199891.198857-1.788727.198857-.722156 0-1.388762-.077333-1.999818-.243048-.611056-.165714-1.14434-.408763-1.588745-.729144-.444404-.33143-.799927-.740192-1.05546-1.226289-.255532-.486096-.388853-1.071621-.411073-1.745528h2.533103v-.022095zm8.288135-7.700208h1.899828v-3.402675h2.510883v3.402675h2.26646v1.867052h-2.26646v6.054109c0 .265143.01111.486096.03333.684954.02222.18781.07777.353524.155542.486096.07777.132572.199981.232.366633.298287.166651.066285.377743.099428.666606.099428.177762 0 .355523 0 .533285-.011047.177762-.011048.355523-.033143.533285-.077334v1.933338c-.277753.033143-.555505.055238-.811038.088381-.266642.033143-.533285.04419-.811037.04419-.666606 0-1.199891-.066285-1.599855-.18781-.399963-.121523-.722156-.309333-.944358-.552381-.233313-.243049-.377744-.541335-.466625-.905907-.07777-.364573-.13332-.784383-.144431-1.248384v-6.683825h-1.899827v-1.889147h-.02222zm8.454788 0h2.377562V16.9253h.04444c.355523-.662858.844368-1.12686 1.477644-1.414098.633276-.287239 1.310992-.430858 2.055369-.430858.899918 0 1.677625.154667 2.344231.475048.666606.309335 1.222111.740193 1.666515 1.292575.444405.552382.766597 1.193145.9888 1.92229.222202.729145.333303 1.513527.333303 2.3421 0 .762288-.099991 1.50248-.299973 2.20953-.199982.718096-.499955 1.347812-.899918 1.900194-.399964.552383-.911029.98324-1.533194 1.31467-.622166.33143-1.344323.497144-2.18869.497144-.366634 0-.733267-.033143-1.0999-.099429-.366634-.066286-.722157-.176762-1.05546-.320381-.333303-.14362-.655496-.33143-.933249-.56343-.288863-.232-.522175-.497144-.722157-.79543h-.04444v5.656393h-2.510883V15.38968zm8.77698 5.67849c0-.508193-.06666-1.005337-.199981-1.491433-.133321-.486096-.333303-.905907-.599946-1.281527-.266642-.37562-.599945-.673906-.988799-.894859-.399963-.220953-.855478-.342477-1.366542-.342477-1.05546 0-1.855387.364572-2.388672 1.093717-.533285.729144-.799928 1.701337-.799928 2.916578 0 .574478.066661 1.104764.211092 1.59086.144432.486097.344414.905908.633276 1.259432.277753.353525.611056.629716.99991.828574.388853.209905.844367.309334 1.355432.309334.577725 0 1.05546-.121524 1.455423-.353525.399964-.232.722157-.541335.97769-.905907.255531-.37562.444403-.79543.555504-1.270479.099991-.475049.155542-.961145.155542-1.458289zm4.432931-9.99812h2.510883v2.364197h-2.510883V11.07005zm0 4.31963h2.510883v11.334883h-2.510883V15.389679zm4.755124-4.31963h2.510883v15.654513h-2.510883V11.07005zm10.210184 15.963847c-.911029 0-1.722066-.154667-2.433113-.452953-.711046-.298287-1.310992-.718097-1.810946-1.237337-.488845-.530287-.866588-1.160002-1.12212-1.889147-.255533-.729144-.388854-1.535622-.388854-2.408386 0-.861716.133321-1.657147.388853-2.386291.255533-.729145.633276-1.35886 1.12212-1.889148.488845-.530287 1.0999-.93905 1.810947-1.237336.711047-.298286 1.522084-.452953 2.433113-.452953.911028 0 1.722066.154667 2.433112.452953.711047.298287 1.310992.718097 1.810947 1.237336.488844.530287.866588 1.160003 1.12212 1.889148.255532.729144.388854 1.524575.388854 2.38629 0 .872765-.133322 1.679243-.388854 2.408387-.255532.729145-.633276 1.35886-1.12212 1.889147-.488845.530287-1.0999.93905-1.810947 1.237337-.711046.298286-1.522084.452953-2.433112.452953zm0-1.977528c.555505 0 1.04435-.121524 1.455423-.353525.411074-.232.744377-.541335 1.01102-.916954.266642-.37562.455513-.806478.588835-1.281527.12221-.475049.188872-.961145.188872-1.45829 0-.486096-.066661-.961144-.188872-1.44724-.122211-.486097-.322193-.905907-.588836-1.281527-.266642-.37562-.599945-.673907-1.011019-.905907-.411074-.232-.899918-.353525-1.455423-.353525-.555505 0-1.04435.121524-1.455424.353525-.411073.232-.744376.541334-1.011019.905907-.266642.37562-.455514.79543-.588835 1.281526-.122211.486097-.188872.961145-.188872 1.447242 0 .497144.06666.98324.188872 1.458289.12221.475049.322193.905907.588835 1.281527.266643.37562.599946.684954 1.01102.916954.411073.243048.899918.353525 1.455423.353525zm6.4883-9.66669h1.899827v-3.402674h2.510883v3.402675h2.26646v1.867052h-2.26646v6.054109c0 .265143.01111.486096.03333.684954.02222.18781.07777.353524.155541.486096.077771.132572.199982.232.366634.298287.166651.066285.377743.099428.666606.099428.177762 0 .355523 0 .533285-.011047.177762-.011048.355523-.033143.533285-.077334v1.933338c-.277753.033143-.555505.055238-.811038.088381-.266642.033143-.533285.04419-.811037.04419-.666606 0-1.199891-.066285-1.599855-.18781-.399963-.121523-.722156-.309333-.944358-.552381-.233313-.243049-.377744-.541335-.466625-.905907-.07777-.364573-.133321-.784383-.144431-1.248384v-6.683825h-1.899827v-1.889147h-.02222z" fill="#191919">
                            </path>
                            <path className="tp-logo__star" fill="#00B67A" d="M30.141707 11.07005H18.63164L15.076408.177071l-3.566342 10.892977L0 11.059002l9.321376 6.739063-3.566343 10.88193 9.321375-6.728016 9.310266 6.728016-3.555233-10.88193 9.310266-6.728016z"></path>
                            <path className="tp-logo__star-notch" fill="#005128" d="M21.631369 20.26169l-.799928-2.463625-5.755033 4.153914z"></path>
                          </svg>
                      </div>
                    </span>
                  </Link>
                </div>

                {/* Centre : Avis défilants (simulation carousel) */}
                <div className='wrapper-right w-700 hidden md:flex flex-col gap-2 px-10 py-0 overflow-hidden'>
                  <ReviewsCarousel/>
                  <p className="text-left! ml-16 text-xs text-gray-500 mt-6 font-medium">
                    Showing our 4 & 5 star reviews
                  </p>
                </div>
                
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

            <p className="text-[16px] text-left! font-medium text-gray-800">
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
            <div className='lg:sticky lg:top-8'>
              <h2 className="text-[30px] font-bold text-[#f5a623] text-left! leading-relaxed mb-8">
                Unlock 144 chances of mining 3.125 Bitcoin EVERY SINGLE DAY!
              </h2>

              <p className="text-[22px]! text-left! text-gray-800 leading-loose max-w-xl mb-[31px] font-[400] [word-break:break-word;]">
                The Gold Digger Lottery Miner is a convenient, zero-effort BTC mining device
                that lets you generate fresh “lottery tickets” every 10 minutes for the full
                Bitcoin block reward (3.125 BTC, worth ~$350,000 at today’s prices).
                It runs automatically, 24/7, with no setup and no effort required.Unlike actual lottery tickets, this is not a one-time gamble - the Gold Digger Miner is your long-term companion in the race. The longer it runs, the more entries you stack.
              </p>

              <p className="flex items-center gap-2 text-[22px] font-semibold text-left! text-gray-900">
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
              <h2 className="text-[30px] font-bold text-left! text-white! leading-relaxed mb-8">
                All-year Bitcoin mining for just{" "}
                <span className="text-[#f5a623]">11 cents{" "}
                of electricity a month</span>
              </h2>

              <p className="text-[22px]! text-left! text-white! leading-loose max-w-xl mb-[31px] font-[400] [word-break:break-word;]">
                <strong>Scared of the heavy electricity bills often associated
                with typical BTC mining?</strong> The Gold Digger Miner is built to run 24/7
                at just 24 watts per day, which equals only about 0.72 kWh a month(∼11 cents per month) to run nonstop.
              </p>

              <p className="text-[22px]! text-left! text-white! leading-loose max-w-xl mb-[31px] font-[400] [word-break:break-word;]">
                For less than the price of a gumball, you’ll have a device silently,
                yet rapidly stacking chances at the 3.125 BTC block reward, day and night.
              </p>

              <p className="text-[22px]! text-left! font-normal text-white!">
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

              <p className="text-[22px]! text-left! text-gray-800 leading-loose max-w-xl mb-[31px] font-[400] [word-break:break-word;]">
                Powered by the new ESP32-D0 AI chip, the 2025 Gold Digger miner delivers up to 30x more computational power than earlier NerdMiner or Gold Digger versions.
              </p>
              <p className="text-[22px]! text-left! text-gray-800 leading-loose max-w-xl mb-[31px] font-[400] [word-break:break-word;]">
                <span className='underline'>The 2025 Gold Digger comes with faster hashing, smarter energy use, and increases odds of landing a Bitcoin block</span> - whilst still consuming just pennies in electricity.
              </p>

              <p className="flex items-center gap-2 text-[22px]! text-left! font-semibold text-gray-900">
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
          <h2 className="text-[46px]! md:text-5xl font-bold mb-3">
            Lifetime Warranty – <span className='text-[#f5a623] italic'>Start Mining Instantly</span>
          </h2>
          <p className="text-[22px] leading-loose w-full mx-auto text-white!">
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
      <section className="bg-white py-20 px-6 max-w-7xl mx-auto">
        {/* Title */}
        <h2 className="text-4xl font-bold text-center mb-12 text-black">
          What our <span className="text-[#f5a623] italic">Customers</span> say.
        </h2>

        {/* Summary */}
        <div className="grid md:grid-cols-3 gap-10 items-center border-b pb-10">
          {/* Average */}
          <div className="text-center">
            <div className="flex justify-center mb-2">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
              ))}
            </div>
            <p className="text-lg font-semibold text-black">4.78 out of 5</p>
            <p className="text-sm text-gray-500">Based on 9 reviews</p>
          </div>

          {/* Distribution */}
          <div className="space-y-2">
            {ratingDistribution.map((r) => (
              <div key={r.stars} className="flex items-center gap-3">
                <div className="flex w-20">
                  {Array.from({ length: r.stars }).map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 fill-yellow-400 text-yellow-400"
                    />
                  ))}
                </div>

                <div className="flex-1 bg-gray-200 h-3">
                  <div
                    className="bg-emerald-700 h-3"
                    style={{ width: `${(r.count / 9) * 100}%` }}
                  />
                </div>

                <span className="text-sm text-gray-500 w-6 text-right">
                  {r.count}
                </span>
              </div>
            ))}
          </div>

          {/* Button */}
          <div className="text-center md:text-right">
            <button className="bg-[#f7931a] text-white font-semibold px-8 py-3 hover:opacity-90">
              WRITE A REVIEW
            </button>
          </div>
        </div>

        {/* Reviews list */}
        <div className="mt-10 space-y-12">
          {reviewss.map((r, i) => (
            <div key={i} className="border-b pb-10">
              <div className="flex items-center justify-between mb-2">
                <div className="flex gap-1">
                  {Array.from({ length: r.rating }).map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 fill-yellow-400 text-yellow-400"
                    />
                  ))}
                </div>
                <span className="text-sm text-gray-400">{r.date}</span>
              </div>

              <div className="flex gap-3">
                <div className='w-8 h-8 bg-gray-400 p-2 flex justify-center items-center'>
                  <User className=' text-green-800'/>
                </div>
                <span className='font-semibold text-green-800! text-left!'>{r.name}</span>
              </div>
              <p className="font-bold mt-2 text-left!">{r.title}</p>
              <p className="text-gray-700 mt-2 leading-relaxed max-w-4xl text-left!">
                {r.text}
              </p>
            </div>
          ))}
        </div>
        <div className="mt-14">
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