'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import ProductQuickView from './ProductQuickView'
import { useAppDispatch } from '@/store/hooks'
import { addToCart } from '@/store/cartSlice'
import type { Product } from '@/types'

interface ProductCardProps {
  product: Product
  showQuickView?: boolean  // true par défaut → activé sur collections, false sur homepage
}

export default function ProductCard({
  product,
  showQuickView = true,
}: ProductCardProps) {
  const dispatch = useAppDispatch()
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false)

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
  const displayPrice = product.discountPrice || product.price

  return (
    <>
      <div className="group flex flex-col bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
        {/* Image */}
        <Link
          href={`/products/${product.slug}`}
          className="relative w-full aspect-square overflow-hidden"
        >
          <Image
            src={mainImage}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
        </Link>

        {/* Infos */}
        <div className="p-4 flex flex-col flex-grow text-center">
          <Link href={`/products/${product.slug}`}>
            <h3 className="text-base font-medium text-gray-900 line-clamp-2 mb-3 min-h-[2.5rem]">
              Bitcoin Merch® - {product.name}
            </h3>
          </Link>

          {/* Prix */}
          <div className="mb-4">
            {product.discountPrice ? (
              <div className="flex items-center justify-center gap-3">
                <span className="text-xl font-bold text-[#FF8C00]">
                  ${displayPrice.toFixed(2)}
                </span>
                <span className="text-sm text-gray-500 line-through">
                  ${product.price.toFixed(2)}
                </span>
              </div>
            ) : (
              <span className="text-xl font-bold text-gray-900">
                ${product.price.toFixed(2)}
              </span>
            )}
          </div>

          {/* Boutons */}
          <div className="mt-auto space-y-2">
            <button
              onClick={handleAddToCart}
              disabled={!product.inStock}
              className="w-full bg-[#fd9619] text-white font-medium uppercase text-sm py-3 rounded-md hover:bg-[#e08516] transition disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              ADD TO CART
            </button>

            {showQuickView && (
              <button
                onClick={() => setIsQuickViewOpen(true)}
                className="w-full bg-white text-gray-900 font-medium uppercase text-sm py-3 rounded-md border border-gray-900 hover:bg-gray-900 hover:text-white transition"
              >
                QUICK VIEW
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Modal Quick View */}
      {showQuickView && (
        <ProductQuickView
          product={product}
          isOpen={isQuickViewOpen}
          onClose={() => setIsQuickViewOpen(false)}
        />
      )}
    </>
  )
}