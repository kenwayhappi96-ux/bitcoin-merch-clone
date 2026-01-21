'use client'

import Image from 'next/image'
import Link from 'next/link'
// icons removed per design: buttons now text-only
import { useAppDispatch } from '@/store/hooks'
import { addToCart } from '@/store/cartSlice'
import type { Product } from '@/types'

interface ProductCardProps {
  product: Product
}

export default function ProductCard2({ product }: ProductCardProps) {
  const dispatch = useAppDispatch()

  const handleAddToCart = () => {
    dispatch(addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      discountPrice: product.discountPrice,
      image: product.image || "/ref/logo.png",
    }))
  }

  return (
    <div className="flex flex-col h-full">
      
      {/* IMAGE */}
      <Link
        href={`/products/${product.slug}`}
        className="relative w-full aspect-[4/5] overflow-hidden rounded-md mb-3"
      >
        <Image
          src={product.image || "/ref/logo.png"}
          alt={product.name}
          fill
          className="object-cover"
        />
      </Link>

      {/* TITLE */}
      <h3 className="text-sm font-medium mb-2 line-clamp-2 text-black text-center">
        Bitcoin Merch® - {product.name}
      </h3>

      {/* PRICE */}
      <div className="mb-3 text-center">
        {product.discountPrice ? (
          <>
            <span className="text-orange-500 font-semibold mr-2">
              ${product.discountPrice.toFixed(2)}
            </span>
            <span className="line-through text-gray-400 text-sm">
              ${product.price.toFixed(2)}
            </span>
          </>
        ) : (
          <span className="font-semibold text-black!">${product.price.toFixed(2)}</span>
        )}
      </div>

      {/* CTA */}
      <button
        onClick={handleAddToCart}
        className="mt-auto bg-blue-700 hover:bg-blue-800 text-white py-2 text-sm rounded"
      >
        Add To Cart
      </button>
    </div>
  )
}