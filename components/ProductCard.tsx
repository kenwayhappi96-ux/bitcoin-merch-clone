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
    <div className="group bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden">
      <Link href={`/products/${product.slug}`} className="block relative aspect-video overflow-hidden">
        <Image
          src={mainImage}
          alt={product.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {product.discountPrice && (
          <div className="absolute top-3 left-3 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">
            -{Math.round(((product.price - product.discountPrice) / product.price) * 100)}%
          </div>
        )}
        {!product.inStock && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <span className="text-white text-xl font-bold">Out of Stock</span>
          </div>
        )}
      </Link>

      <div className="p-1 sm:p-1.5">
        <Link href={`/products/${product.slug}`} className="block mb-0.5">
          <h3 className="text-xs font-semibold text-gray-800 hover:text-[#FF8C00] transition line-clamp-1">
            {product.name}
          </h3>
        </Link>

        <p className="text-xs text-gray-600 mb-1 line-clamp-1">{product.description}</p>

        <div className="mt-1">
          <div className="flex items-center gap-0.5 mb-1">
            {product.discountPrice ? (
              <>
                <span className="text-xs font-bold text-[#FF8C00]">${discountedPrice.toFixed(2)}</span>
                <span className="text-xs text-gray-500 line-through">${product.price.toFixed(2)}</span>
              </>
            ) : (
              <span className="text-xs font-bold text-gray-800">${product.price.toFixed(2)}</span>
            )}
          </div>

          <div className="flex flex-col gap-1">
            <button
              onClick={handleAddToCart}
              disabled={!product.inStock}
              className="w-full bg-[#3b82f6] text-white uppercase text-sm px-2 py-2 rounded-none border-0 font-semibold hover:bg-[#2563eb] transition disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center justify-center"
            >
              ADD TO CART
            </button>

            <button
              onClick={() => setIsQuickViewOpen(true)}
              className="w-full bg-white text-yellow-400 uppercase text-sm px-2 py-2 rounded-none border border-black font-semibold hover:bg-gray-200 hover:text-black transition flex items-center justify-center"
            >
              QUICK VIEW
            </button>
          </div>

          {product.inStock && (
            <p className="text-xs text-green-600 mt-0.5 font-semibold">In Stock</p>
          )}
        </div>
      </div>

      <ProductQuickView
        product={product}
        isOpen={isQuickViewOpen}
        onClose={() => setIsQuickViewOpen(false)}
      />
    </div>
  )
}
