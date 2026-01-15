'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import ProductQuickView from './ProductQuickView'
// icons removed per design: buttons now text-only
import { useAppDispatch } from '@/store/hooks'
import { addToCart } from '@/store/cartSlice'
import type { Product } from '@/types'
import { Star } from 'lucide-react'

interface ProductCardProps {
  product: Product,
  isRow?:boolean
}

export default function ProductCardOptions({ product, isRow }: ProductCardProps) {
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
    <div className={`relative flex ${isRow ? 'flex-row justify-center items-center': 'flex-col'} gap-4 border p-3 bg-white transition-shadow duration-300 overflow-hidden`}>
        <div className='absolute top-3 left-0 bg-red-600 z-10 px-2'>
            <span className='text-white text-sm'>Save ${product.price.toFixed(2)}</span>
        </div>
      <Link href={`/products/${product.slug}`} className={`block relative ${isRow ? 'w-[300px]': 'w-full'} h-[300px] md:h-[200px] lg:h-[300px] aspect-video overflow-hidden shrink-0`}>
        <Image
          src={mainImage}
          alt={product.name}
          width={400}
          height={500}
          className="h-full w-full object-cover"
        />
      </Link>
      <div className="flex flex-col gap-0.5 mb-1 w-full">
        <Link href={`/products/${product.slug}`} className="block text-black! review mb-8">
            <h3 className="text-[13px] line-clamp-1 whitespace-normal font-[400]!">
            Bitcoin Merch® - {product.name}
            </h3>
        </Link>
        {!product.discountPrice ? (
          <div>
            <div>
                <span className="lg:text-[20px] sm:text-[18px] text-base text-red-600">${Number(discountedPrice.toFixed(2))-0.01}</span>
                <span className="text-sm text-black line-through ml-4">${product.price.toFixed(2)}</span>
            </div>
            <div className='flex items-center gap-2'>
                <div className='flex gap-1'>
                    {[1,2,3,4,5].map((i)=>(
                        <Star className='text-yellow-400 h-4 w-4 fill-yellow-400'/>
                    ))}
                </div>
                <span className='text-sm text-black'>2 review(s)</span>
            </div>
          </div>
        ) : (
          <span className="lg:text-[20px] sm:text-[18px] text-base text-black">${product.price.toFixed(2)}</span>
        )}
      </div> 
      <div className='flex flex-col gap-2 w-full'>
        <button
            onClick={handleAddToCart}
            disabled={!product.inStock}
            className="relative w-full bg-blue-800 text-white uppercase text-sm px-2 py-2 hover:bg-gray-500 hover:-translate-y-2 transition-all duration-300 disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center justify-center"
        >
            Choose options
        </button>
        <button
            onClick={() => setIsQuickViewOpen(true)}
            disabled={!product.inStock}
            className="relative w-full text-[#fd9619] bg-white border border-gray-300! uppercase text-sm px-2 py-2 disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center justify-center"
        >
            Quick view
        </button>
      </div>

      <ProductQuickView
        product={product}
        isOpen={isQuickViewOpen}
        onClose={() => setIsQuickViewOpen(false)}
      />
    </div>
  )
}
