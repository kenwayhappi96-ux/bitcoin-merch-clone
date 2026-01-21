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
  const [quantity, setQuantity] = useState(1)
  const [secondaryImages, setSecondaryImages] = useState<string[]>([])

  useEffect(() => {
    const loadProducts = async () => {
      const data = await getProducts()

      if (data?.products?.length) {
        const featured =
          data.products.find((p: any) => p.isFeatured === 1) || null

        setProduct(featured)
        setProducts(data.products)
      }
    }

    loadProducts()
  }, [])

 useEffect(() => {
    if (!product?.id) return

    fetch(`/api/products/${product.id}/images`)
      .then(res => res.json())
      .then(data => {
        const images =
          data.images
            ?.filter((img: any) => img.is_primary === 0)
            .map((img: any) => img.image_url) || []

        setSecondaryImages(images)
      })
      .catch(err =>
        console.error('Error fetching images:', err)
      )
  }, [product?.id])

  if (!product) return null


  return (
    <main className="min-h-screen">
      <section className="container pt-16 pb-8 px-4 max-w-6xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-4 items-center w-full">
          {/* Left side: Images (thumbnails + main) */}
          <div className='lg:w-[50%] w-full'>
            <QuickView
              product={product}
              secondaryImages={secondaryImages}
              isPage
            />
          </div>

          {/**right side: informations */}
          <div className="w-full lg:w-[50%] bg-white flex flex-col gap-5">
            {/* Title */}
            <h1 className="text-[26px] font-bold text-black">
              Bitcoin Merch® - Legend Battle Pass
            </h1>

            {/* Price */}
            <div className="flex items-center gap-3">
              <span className="text-2xl font-bold text-black">$49.99</span>
              <span className="text-2xl line-through font-bold text-black">$100.00</span>
            </div>

            {/* Description */}
            <p className="leading-relaxed text-left! text-[15px] font-medium">
              Become a pioneer in the home mining community. Join the exclusive
              monthly membership.
            </p>

            {/* Perks */}
            <ul className="flex flex-col gap-3 text-[15px]">
              <li className="flex items-start gap-2 text-blue-600 font-bold">
                ⭐All Perks From Battle Pass
              </li>

              {[
                '15% Off Everything From Bitcoin Merch',
                'Up To 20% Off When You Buy 2 Or More Select Items',
                'Free Random Bitcoin Miner Shipped Every Month',
                'Free Gift On Every Product Order',
              ].map((perk, index) => (
                <li
                  key={index}
                  className="flex items-start gap-2 text-black"
                >
                  ⭐{perk}
                </li>
              ))}
            </ul>

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

            {/*Trupilot */}
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

      <section className="w-full bg-[#0038d1]">
        <div className="max-w-7xl mx-auto px-4 lg:px-14 py-20">
          <div className="flex flex-col md:flex-row lg:items-center justify-center gap-8 md:gap-16 text-white">

            {/* Item 1 */}
            <div className="flex items-center gap-4">
              <Store className="w-10 h-10 lg:w-14 lg:h-14 text-[#ffb400]" />
              <span className="text-xl! md:text-base font-medium">
                Pick Up In-Store In LA
              </span>
            </div>

            {/* Item 2 */}
            <div className="flex items-center gap-4">
              <Flag className="w-10 h-10 lg:w-14 lg:h-14 text-[#ffb400]" />
              <span className="text-xl! md:text-base font-medium">
                Ship From USA Warehouse
              </span>
            </div>

            {/* Item 3 */}
            <div className="flex items-center gap-4">
              <Truck className="w-10 h-10 lg:w-14 lg:h-14 text-[#ffb400]" />
              <span className="text-xl! md:text-base font-medium">
                Germany → All Of Europe
              </span>
            </div>

          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 pt-16 pb-8 container">
        {/* Title */}
        <div className="border-2 border-[#fd9619] py-6 mb-12 text-center shadow-xl">
          <h2 className="text-3xl md:text-5xl font-bold flex items-center justify-center gap-4 text-black">
            <Star className="text-[#fd9619] w-10 h-10 md:w-13 md:h-13 fill-[#fd9619]" />
            Legend Battle Pass Membership Perks
          </h2>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Card 1 */}
          <div className="border-2 border-blue-600 rounded-xl p-8 text-center">
            <DollarSign className="w-15 h-15 text-[#fd9619] mx-auto mb-2" />
            <h3 className="font-bold text-lg mb-4 text-black">15% Off Most Of Store</h3>
            <p className="text-lg! text-black leading-relaxed">
              15% Off Bitaxe Miners & Bitaxe Spare Parts / Upgrades – 
              All Bitcoin Merch Products under "Exclusive Lottery Miners", 
              In-Store Items & "Best Selling Merch" like tees, pillows & more.
            </p>
          </div>

          {/* Card 2 */}
          <div className="border-2 border-blue-600 rounded-xl p-8 text-center">
            <Gift className="w-15 h-15 text-[#fd9619] mx-auto mb-2" />
            <h3 className="font-bold text-lg mb-4 text-black">Free Miner Every Month</h3>
            <p className="text-lg! text-black leading-relaxed">
              When you make your first order as a Bitcoin Battle Pass member,
              we include a free random gift (Bitaxe, Gold Nugget, etc.).
              Free miner delivered every month.
            </p>
          </div>

          {/* Card 3 */}
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

      <section className="max-w-6xl mx-auto px-4 pt-16 pb-8 container">
        {/* Title */}
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

      <section className="max-w-6xl mx-auto px-4 pt-16 pb-8 container">
        {/* Title */}
        <div className="border-3 border-[#0038d1] py-2 mb-12 text-center bg-yellow-600">
          <h2 className="text-3xl font-bold flex items-center justify-center gap-2 text-black">
            Bitcoin & Lottery Miners Eligible For 15% Off With Battle Pass
          </h2>
        </div>
        <ProductCarousel1 products={products}/>
      </section>

      <section className="max-w-6xl mx-auto px-4 pt-16 pb-8 container">
        {/* Title */}
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
            
            {/* Left */}
            <div className="text-center md:text-left">
              <div className="flex justify-center md:justify-start gap-1 mb-2">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                ))}
              </div>
              <p className="text-gray-700">Be the first to write a review</p>
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

      {/**Carousel best products price */}
      <section className='max-w-6xl mx-auto px-4 pt-16 pb-8 container'>
        <p className='text-left! font-semibold text-xl text-black!'>You may also like</p>
        <ProductCarousel2 products={products}/>
      </section>

    </main>
  )
}