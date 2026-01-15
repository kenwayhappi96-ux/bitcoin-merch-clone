'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import ProductQuickView from './ProductQuickView'
// icons removed per design: buttons now text-only
import { useAppDispatch } from '@/store/hooks'
import { addToCart } from '@/store/cartSlice'
import type { Product } from '@/types'

interface ProductCardProps {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  const dispatch = useAppDispatch()
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false)

  const handleAddToCart = () => {
    dispatch(addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      discountPrice: product.discountPrice,
      image: product.image || '/ref/logo.png'
    }))
  }

  const mainImage = product.image || '/ref/logo.png'
  const discountedPrice = product.discountPrice || product.price

  return (
    <div className="flex flex-col gap-4 bg-white transition-shadow duration-300 overflow-hidden">
      <Link href={`/products/${product.slug}`} className="block relative w-full h-[300px] md:h-[200px] lg:h-[300px] aspect-video overflow-hidden shrink-0">
        <Image
          src={mainImage}
          alt={product.name}
          width={400}
          height={500}
          className="h-full w-full object-cover"
        />
        {/* {product.discountPrice && (
          <div className="absolute top-3 left-3 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">
            -{Math.round(((product.price - product.discountPrice) / product.price) * 100)}%
          </div>
        )}
        {!product.inStock && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <span className="text-white text-xl font-bold">Out of Stock</span>
          </div>
        )} */}
      </Link>
      <Link href={`/products/${product.slug}`} className="block mb-0.5 text-black! review">
        <h3 className="lg:text-[20px] sm:text-[18px] text-base line-clamp-1 whitespace-normal font-[400]!">
          Bitcoin Merch® - {product.name}
        </h3>
      </Link>
      <div className="flex justify-center items-center gap-0.5 mb-1 w-full">
        {product.discountPrice ? (
          <>
            <span className="lg:text-[20px] sm:text-[18px] text-base text-[#FF8C00]">${discountedPrice.toFixed(2)}</span>
            <span className="lg:text-[20px] sm:text-[18px] text-base text-gray-500 line-through">${product.price.toFixed(2)}</span>
          </>
        ) : (
          <span className="lg:text-[20px] sm:text-[18px] text-base text-black">${product.price.toFixed(2)}</span>
        )}
      </div> 
      <button
        onClick={handleAddToCart}
        disabled={!product.inStock}
        className="relative w-full bg-[#fd9619] text-white uppercase text-sm px-2 py-2 hover:bg-gray-500 hover:-translate-y-2 transition-all duration-300 disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center justify-center"
      >
        ADD TO CART
      </button>

      <ProductQuickView
        product={product}
        isOpen={isQuickViewOpen}
        onClose={() => setIsQuickViewOpen(false)}
      />
    </div>
  )
}
