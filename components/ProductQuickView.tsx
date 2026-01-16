'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { X } from 'lucide-react'
import { useAppDispatch } from '@/store/hooks'
import { addToCart } from '@/store/cartSlice'
import type { Product } from '@/types'
import QuickView from './QuickView'

interface ProductQuickViewProps {
  product: Product
  isOpen: boolean
  onClose: () => void
}

export default function ProductQuickView({ product, isOpen, onClose }: ProductQuickViewProps) {
  const dispatch = useAppDispatch()
  const router = useRouter()
  const [quantity, setQuantity] = useState(1)
  const [secondaryImages, setSecondaryImages] = useState<string[]>([])

  useEffect(() => {
    if (isOpen && product.id) {
      // Fetch product images from API
      fetch(`/api/products/${product.id}/images`)
        .then(res => res.json())
        .then(data => {
          const images = data.images?.filter((img: any) => img.is_primary === 0).map((img: any) => img.image_url) || []
          setSecondaryImages(images)
        })
        .catch(err => console.error('Error fetching images:', err))
    }
  }, [isOpen, product.id])

  if (!isOpen) return null

  const discountedPrice = product.discountPrice || product.price

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      dispatch(addToCart({
        id: product.id,
        name: product.name,
        price: product.price,
        discountPrice: product.discountPrice,
        image: product.image || '/ref/logo.png'
      }))
    }
    setQuantity(1)
    onClose()
  }

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg w-full max-w-7xl max-h-[80vh] overflow-auto">
        {/* Header with close button */}
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-800">{product.name}</h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded-lg transition"
          >
            <X className="w-6 h-6 text-gray-600" />
          </button>
        </div>

        {/* Main content */}
        <div className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-8">
            {/* Left side: Images (thumbnails + main) */}
            <QuickView
              product={product}
              secondaryImages={secondaryImages}
            />

            {/* Right side: Product info */}
            <div className="flex flex-col gap-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-600 mb-2">{product.category || 'Product'}</h3>
                <p className="text-sm text-gray-600 mb-4">{product.description}</p>
              </div>

              {/* Price */}
              <div>
                <div className="flex items-baseline gap-3 mb-2">
                  {product.discountPrice ? (
                    <>
                      <span className="text-3xl font-bold text-[#FF8C00]">€{discountedPrice.toFixed(2)}</span>
                      <span className="text-lg text-gray-500 line-through">€{product.price.toFixed(2)}</span>
                    </>
                  ) : (
                    <span className="text-3xl font-bold text-gray-800">€{product.price.toFixed(2)}</span>
                  )}
                </div>
                {product.discountPrice && (
                  <p className="text-orange-600 font-semibold mb-2">👑 As Low As €{(discountedPrice * 0.8).toFixed(2)}</p>
                )}
              </div>

              {/* Stock status */}
              {product.inStock && (
                <p className="text-green-600 font-semibold">In Stock</p>
              )}

              {/* Quantity */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Quantity:</label>
                <div className="flex items-center border border-gray-300 rounded-lg w-fit">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-4 py-2 text-gray-600 hover:bg-gray-100 transition"
                  >
                    −
                  </button>
                  <input
                    type="number"
                    value={quantity}
                    onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                    className="w-12 text-center border-l border-r border-gray-300 py-2 focus:outline-none"
                  />
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-4 py-2 text-gray-600 hover:bg-gray-100 transition"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Buttons grid: Add to Cart + Trustpilot | Play with Paypal + More payment options */}
              <div className="grid grid-cols-2 gap-3">
                <div className="flex flex-col gap-3">
                  <button
                    onClick={handleAddToCart}
                    disabled={!product.inStock}
                    className="w-full bg-orange-700 text-white uppercase py-3 rounded-none border-0 font-semibold hover:bg-orange-800 transition disabled:bg-gray-300 disabled:cursor-not-allowed"
                  >
                    Add to Cart
                  </button>

                  {/* Trustpilot */}
                  <div className="text-center">
                    <p className="text-sm text-gray-600">Trustpilot</p>
                  </div>
                </div>

                <div className="flex flex-col gap-3">
                  <button
                    className="w-full bg-orange-400 text-white uppercase py-3 rounded-none border-0 font-semibold hover:bg-orange-500 transition"
                  >
                    Play with Paypal
                  </button>

                  {/* More payment options link */}
                  <div className="text-center">
                    <button
                      onClick={() => {
                        for (let i = 0; i < quantity; i++) {
                          dispatch(addToCart({
                            id: product.id,
                            name: product.name,
                            price: product.price,
                            discountPrice: product.discountPrice,
                            image: product.image || '/ref/logo.png'
                          }))
                        }
                        setQuantity(1)
                        onClose()
                        setTimeout(() => {
                          router.push('/checkout')
                        }, 100)
                      }}
                      className="text-sm text-blue-600 underline hover:text-blue-800 transition cursor-pointer"
                    >
                      More payment options
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
