'use client'

import { ShoppingCart } from 'lucide-react'
import { useAppDispatch } from '@/store/hooks'
import { addToCart } from '@/store/cartSlice'

interface Product {
  id: number
  name: string
  price: number
  discountPrice: number | null
  image: string
}

export default function AddToCartButton({ product }: { product: Product }) {
  const dispatch = useAppDispatch()

  const handleAddToCart = () => {
    dispatch(addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      discountPrice: product.discountPrice,
      image: product.image,
    }))
  }

  return (
    <button
      onClick={handleAddToCart}
      className="w-full bg-blue-600 text-white py-4 rounded-lg font-semibold text-lg hover:bg-blue-700 transition flex items-center justify-center gap-2"
    >
      <ShoppingCart className="w-5 h-5" />
      Ajouter au panier
    </button>
  )
}
