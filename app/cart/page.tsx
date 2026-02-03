'use client'

import { Minus, Plus, Trash2 } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { removeFromCart, updateQuantity } from '@/store/cartSlice'
import { useState } from 'react'

export default function CartPage() {
  const dispatch = useAppDispatch()
  const { items } = useAppSelector((state) => state.cart)

  const [shippingProtection, setShippingProtection] = useState(true)
  const [orderInstructions, setOrderInstructions] = useState('')

  const subtotal = items.reduce((sum, item) => sum + (item.discount_price || item.price) * item.quantity, 0)
  const originalTotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const saved = originalTotal - subtotal

  // Protection à 13.50 (en € pour cohérence avec le reste)
  const protectionFee = shippingProtection ? 13.50 : 0
  const total = subtotal + protectionFee

  // Debug optionnel : voir les changements
  // useEffect(() => {
  //   console.log('Protection active:', shippingProtection, '→ Fee:', protectionFee, 'Total:', total)
  // }, [shippingProtection, subtotal])

  return (
    <main className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">My cart</h1>

        {items.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-12 text-center">
            <p className="text-xl text-gray-600 mb-6">Your cart is empty</p>
            <Link
              href="/"
              className="inline-block bg-[#3b82f6] text-white px-8 py-3 rounded-lg font-semibold hover:bg-[#2563eb] transition"
            >
              Continue Shopping
            </Link>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Cart Items – inchangé */}
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="grid grid-cols-12 gap-4 p-4 bg-gray-100 font-semibold text-sm text-gray-700 border-b">
                  <div className="col-span-6">Product</div>
                  <div className="col-span-3 text-center">Quantity</div>
                  <div className="col-span-3 text-right">Total</div>
                </div>

                {items.map((item) => {
                  const itemTotal = (item.discount_price || item.price) * item.quantity
                  return (
                    <div
                      key={item.id}
                      className="grid grid-cols-12 gap-4 p-4 border-b last:border-b-0 items-center"
                    >
                      <div className="col-span-6 flex gap-4">
                        <Image
                          src={item.image || '/ref/logo.png'}
                          alt={item.name || 'Product'}
                          width={80}
                          height={80}
                          className="rounded object-cover"
                        />
                        <div>
                          <h3 className="font-semibold text-gray-800">{item.name}</h3>
                          <div className="flex items-center gap-2 mt-1">
                            {item.discount_price ? (
                              <>
                                <span className="text-[#3b82f6] font-bold">
                                  €{item.discount_price.toFixed(2)}
                                </span>
                                <span className="text-gray-500 line-through text-sm">
                                  €{item.price.toFixed(2)}
                                </span>
                              </>
                            ) : (
                              <span className="text-gray-800 font-bold">
                                €{item.price.toFixed(2)}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="col-span-3">
                        <div className="flex items-center justify-center gap-2">
                          <button
                            onClick={() =>
                              dispatch(updateQuantity({ id: item.id, quantity: Math.max(1, item.quantity - 1) }))
                            }
                            className="w-8 h-8 rounded border border-gray-300 flex items-center justify-center hover:bg-gray-100"
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          <span className="font-semibold w-8 text-center">{item.quantity}</span>
                          <button
                            onClick={() =>
                              dispatch(updateQuantity({ id: item.id, quantity: item.quantity + 1 }))
                            }
                            className="w-8 h-8 rounded border border-gray-300 flex items-center justify-center hover:bg-gray-100"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>
                        <button
                          onClick={() => dispatch(removeFromCart(item.id))}
                          className="flex items-center gap-1 text-red-500 hover:text-red-700 text-sm mt-2 mx-auto"
                        >
                          <Trash2 className="w-4 h-4" />
                          Remove
                        </button>
                      </div>

                      <div className="col-span-3 text-right font-bold text-gray-800">
                        €{itemTotal.toFixed(2)}
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Order Summary – partie modifiée */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-md p-6 space-y-6 sticky top-4">
                <h2 className="text-xl font-bold text-gray-800">Order Summary</h2>

                {/* Estimate shipping */}
                <div>
                  <h3 className="font-semibold text-gray-700 mb-2">Estimate shipping</h3>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3b82f6] focus:outline-none text-sm">
                    <option>United States</option>
                    <option>Canada</option>
                    <option>International</option>
                  </select>
                </div>

                {/* Total */}
                <div className="border-t pt-4">
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total</span>
                    <span className="text-[#3b82f6]">€{total.toFixed(2)}</span>
                  </div>
                  {saved > 0 && (
                    <p className="text-green-600 font-semibold text-sm mt-2">
                      You saved €{saved.toFixed(2)} !
                    </p>
                  )}
                </div>

                {/* Order instructions */}
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-semibold text-gray-700">Order instructions</h3>
                    <button className="text-[#3b82f6] text-sm hover:underline">Edit</button>
                  </div>
                  <textarea
                    value={orderInstructions}
                    onChange={(e) => setOrderInstructions(e.target.value)}
                    placeholder="Add special instructions..."
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3b82f6] focus:outline-none text-sm resize-none"
                    rows={3}
                  />
                </div>

                <p className="text-xs text-gray-500 italic">
                  Taxes and shipping calculated at checkout
                </p>

                {/* Navidium Shipping Protection – texte exact demandé */}
                <div className="border-t pt-4">
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={shippingProtection}
                      onChange={(e) => setShippingProtection(e.target.checked)}
                      className="mt-1 w-5 h-5 text-[#3b82f6] rounded"
                    />
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs bg-blue-100 text-blue-600 px-2 py-0.5 rounded font-semibold">
                          Navidium
                        </span>
                        <span className="font-semibold text-sm">Shipping Protection</span>
                      </div>
                      <p className="text-xs text-gray-600">
                        from Damage, Loss & Theft for $13.50
                      </p>
                      <p className="text-xs text-gray-700 mt-1">
                        Get peace of mind with Delivery Guarantee in the event your delivery is damaged, stolen, or lost during transit.
                      </p>
                    </div>
                  </label>
                </div>

                {/* Checkout Button */}
                <Link
                  href="/checkout"
                  className="block w-full bg-[#3b82f6] text-white py-3 rounded-lg font-semibold hover:bg-[#2563eb] transition text-center"
                >
                  Checkout
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  )
}