'use client'

import Image from 'next/image'
import Link from 'next/link'
import ProductQuickView from './ProductQuickView'
import { useAppDispatch } from '@/store/hooks'
import { addToCart } from '@/store/cartSlice'
import type { Product } from '@/types'

interface ProductCardProps {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  const dispatch = useAppDispatch()

  const handleAddToCart = () => {
    dispatch(
      addToCart({
        id: product.id,
        name: product.name,
        price: product.price,
        discountPrice: product.discountPrice,
        image: product.image || '/ref/logo.png',
      })
    )
  }

  const mainImage = product.image || '/ref/logo.png'
  const discountedPrice = product.discountPrice || product.price

  return (
    <>
      <div className="flex flex-col gap-3 bg-white overflow-hidden">
        {/* IMAGE */}
        <Link
          href={`/products/${product.slug}`}
          className="block relative w-full aspect-square overflow-hidden"
        >
          <Image
            src={mainImage}
            alt={product.name}
            fill
            className="object-cover"
          />
        </Link>

        {/* TITLE */}
        <Link href={`/products/${product.slug}`} className="text-black">
          <h3 className="text-sm sm:text-base lg:text-[18px] line-clamp-2 font-[400]">
            Bitcoin Merch® - {product.name}
          </h3>
        </Link>

        {/* PRICE */}
        <div className="flex justify-center items-center gap-1">
          {product.discountPrice ? (
            <>
              <span className="text-[#FF8C00] text-sm sm:text-base">
                ${discountedPrice.toFixed(2)}
              </span>
              <span className="text-gray-500 line-through text-sm sm:text-base">
                ${product.price.toFixed(2)}
              </span>
            </>
          ) : (
            <span className="text-black text-sm sm:text-base">
              ${product.price.toFixed(2)}
            </span>
          )}
        </div>

        {/* ACTIONS */}
        <div className="flex flex-col gap-2">
          {/* ADD TO CART (visible partout) */}
          <button
            onClick={handleAddToCart}
            disabled={!product.inStock}
            className="w-full bg-[#fd9619] text-white uppercase text-xs sm:text-sm px-2 py-2 hover:bg-gray-500 transition disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            ADD TO CART
          </button>

          {/* QUICK VIEW (desktop seulement) */}
          <button
            onClick={() => setIsQuickViewOpen(true)}
            className="hidden lg:flex w-full bg-white text-black uppercase text-sm px-2 py-2 border border-black hover:bg-black hover:text-white transition items-center justify-center"
          >
            QUICK VIEW
          </button>
        </div>
      </div>

      {/* QUICK VIEW MODAL */}
      <ProductQuickView
        product={product}
        isOpen={isQuickViewOpen}
        onClose={() => setIsQuickViewOpen(false)}
      />
    </>
  )
}
