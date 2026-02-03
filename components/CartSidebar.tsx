'use client'

import { X, Minus, Plus, ShoppingBag } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { closeCart, removeFromCart, updateQuantity } from '@/store/cartSlice'
import { useState } from 'react'

export default function CartSidebar() {
  const dispatch = useAppDispatch()
  const { items, isOpen } = useAppSelector((state) => state.cart)
  const [shippingProtection, setShippingProtection] = useState(true)

  const subtotal = items.reduce((sum, item) => sum + (item.discount_price || item.price) * item.quantity, 0)
  const protectionFee = shippingProtection ? 1.50 : 0
  const total = subtotal + protectionFee

  if (!isOpen) return null

  return (
    <>
      {/* Overlay */}
      <div 
        className="fixed inset-0 bg-black/50 z-40 transition-opacity"
        onClick={() => dispatch(closeCart())}
      />

      {/* Sidebar */}
      <div className="fixed top-0 right-0 h-full w-full max-w-md bg-white shadow-2xl z-50 flex flex-col">
        {/* Header - Fixe en haut */}
        <div className="flex items-center justify-between p-6 border-b bg-white flex-shrink-0">
          <h2 className="text-xl font-bold text-black inline-flex gap-3 items-center">
            Cart 
            <span className='text-[#f18a1d] text-sm'>{items.length}</span>
          </h2>
          <button
            onClick={() => dispatch(closeCart())}
            className="text-black bg-[#f8f8f8] p-2 rounded hover:bg-gray-200 transition"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Zone scrollable - UNIQUEMENT les produits */}
        <div className="flex-1 overflow-y-auto">
          <div className="p-6">
            {items.length === 0 ? (
              <div className="text-center flex items-center justify-center flex-col gap-4 h-full min-h-[400px]">
                <img 
                  src="https://navidium-static-assets.s3.amazonaws.com/dynamatic-cart/cart-empty.png" 
                  alt="Empty cart" 
                  className="w-32 h-auto"
                />
                <h3 className="text-black text-base font-semibold">No products in cart.</h3>
                <Link href='/collections/all' className='cart-nav'>
                  <button
                    onClick={() => dispatch(closeCart())}
                    className="cursor-pointer hover:text-white text-black font-semibold py-2 px-4 rounded-md hover:underline border border-blue-400 bg-gray-300 hover:bg-blue-400 transition"
                  >
                    Continue Shopping
                  </button>
                </Link>
              </div>
            ) : (
              <div className="space-y-6">
                {items.map((item) => (
                  <div key={item.id} className="flex gap-4 pb-6 border-b border-gray-200 last:border-b-0">
                    <div className="flex-shrink-0">
                      <Image
                        src={item.image || '/ref/logo.png'}
                        alt={item.name || 'Product'}
                        width={80}
                        height={80}
                        className="rounded object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <h3 className="font-semibold text-gray-800 text-sm leading-tight pr-2">
                          {item.name}
                        </h3>
                        <button
                          onClick={() => dispatch(removeFromCart(item.id))}
                          className="text-red-500 hover:text-red-700 flex-shrink-0"
                        >
                          <X className="w-5 h-5" />
                        </button>
                      </div>
                      
                      <p className="text-[#3b82f6] font-bold mt-1">
                        ${(item.discount_price || item.price).toFixed(2)}
                      </p>
                      
                      <div className="flex items-center gap-3 mt-3">
                        <button
                          onClick={() => dispatch(updateQuantity({ id: item.id, quantity: Math.max(1, item.quantity - 1) }))}
                          className="w-8 h-8 rounded border border-gray-300 flex items-center justify-center hover:bg-gray-100 transition"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="font-semibold min-w-[2rem] text-center">{item.quantity}</span>
                        <button
                          onClick={() => dispatch(updateQuantity({ id: item.id, quantity: item.quantity + 1 }))}
                          className="w-8 h-8 rounded border border-gray-300 flex items-center justify-center hover:bg-gray-100 transition"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Footer - TOUJOURS VISIBLE EN BAS (Shipping Protection + Totaux + Boutons) */}
        {items.length > 0 && (
          <div className="border-t bg-white flex-shrink-0">
            {/* Shipping Protection */}
            <div className="px-6 pt-4 pb-3 border-b border-gray-100">
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={shippingProtection}
                  onChange={(e) => setShippingProtection(e.target.checked)}
                  className="mt-1 w-5 h-5 text-[#3b82f6] rounded focus:ring-2 focus:ring-blue-500"
                />
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs bg-blue-100 text-blue-600 px-2 py-0.5 rounded font-semibold">
                      Navidium
                    </span>
                    <span className="font-semibold text-sm">Shipping Protection</span>
                  </div>
                  <p className="text-xs text-gray-600">
                    from Damage, Loss & Theft for $1.50
                  </p>
                  <p className="text-xs text-red-600 mt-1 italic">
                    By Deselecting Shipping Protection, we will not be liable for lost or stolen packages.
                  </p>
                </div>
              </label>
            </div>

            {/* Totaux et Boutons */}
            <div className="p-6 space-y-4">
              <div className="flex justify-between items-center">
                <span className="font-semibold text-base">
                  Subtotal ({items.reduce((sum, item) => sum + item.quantity, 0)} item{items.reduce((sum, item) => sum + item.quantity, 0) > 1 ? 's' : ''})
                </span>
                <span className="font-bold text-xl">${total.toFixed(2)}</span>
              </div>
              
              <Link
                href="/cart"
                onClick={() => dispatch(closeCart())}
                className="block w-full bg-[#3b82f6] text-white py-3 rounded-lg text-center font-semibold hover:bg-[#2563eb] transition"
              >
                Checkout
              </Link>
              
              <button
                onClick={() => dispatch(closeCart())}
                className="w-full text-[#3b82f6] font-semibold hover:underline transition"
              >
                Continue Shopping
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  )
}