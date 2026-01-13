'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useAppSelector } from '@/store/hooks'
import { ChevronDown } from 'lucide-react'

export default function CheckoutPage() {
  const { items } = useAppSelector((state) => state.cart)
  const [email, setEmail] = useState('')
  const [emailNews, setEmailNews] = useState(false)
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [company, setCompany] = useState('')
  const [address, setAddress] = useState('')
  const [apartment, setApartment] = useState('')
  const [city, setCity] = useState('')
  const [zipCode, setZipCode] = useState('')
  const [phone, setPhone] = useState('')
  const [saveInfo, setSaveInfo] = useState(false)
  const [textNews, setTextNews] = useState(false)
  const [deliveryMethod, setDeliveryMethod] = useState<'ship' | 'pickup'>('ship')
  const [paymentMethod, setPaymentMethod] = useState<'credit' | 'paypal' | 'coinbase' | 'afterpay' | 'cashapp'>('credit')
  const [useSameAddress, setUseSameAddress] = useState(true)
  const [discountCode, setDiscountCode] = useState('')

  const subtotal = items.reduce((sum, item) => sum + (item.discount_price || item.price) * item.quantity, 0)
  const savings = items.reduce((sum, item) => {
    if (item.discount_price) {
      return sum + (item.price - item.discount_price) * item.quantity
    }
    return sum
  }, 0)

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <Link href="/">
            <Image 
              src="/ref/logo.png" 
              alt="Bitcoin Merch" 
              width={200}
              height={60}
              className="h-16 w-auto mx-auto mb-4"
            />
          </Link>
          <h1 className="text-3xl font-bold text-gray-800">Bitcoin Merch Checkout</h1>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left Column - Forms */}
          <div className="bg-white rounded-lg shadow-lg p-6 space-y-6">
            {/* Express Checkout */}
            <div>
              <h2 className="text-xl font-bold mb-4">Express checkout</h2>
              <div className="grid grid-cols-3 gap-3">
                <button className="border-2 border-gray-300 rounded-lg py-3 hover:border-[#3b82f6] transition">
                  <span className="font-semibold">Shop Pay</span>
                </button>
                <button className="border-2 border-gray-300 rounded-lg py-3 hover:border-[#3b82f6] transition">
                  <span className="font-semibold">PayPal</span>
                </button>
                <button className="border-2 border-gray-300 rounded-lg py-3 hover:border-[#3b82f6] transition">
                  <span className="font-semibold">G Pay</span>
                </button>
              </div>
              <div className="text-center my-4 text-gray-500 font-semibold">OR</div>
            </div>

            {/* Contact */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold">Contact</h2>
                <Link href="/login" target="_blank" className="text-[#3b82f6] hover:underline text-sm">
                  Sign in
                </Link>
              </div>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3b82f6] focus:border-transparent outline-none"
              />
              <label className="flex items-center gap-2 mt-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={emailNews}
                  onChange={(e) => setEmailNews(e.target.checked)}
                  className="w-5 h-5"
                />
                <span className="text-sm text-gray-700">Email me with news and offers</span>
              </label>
            </div>

            {/* Delivery */}
            <div>
              <h2 className="text-xl font-bold mb-4">Delivery</h2>
              <p className="text-sm text-gray-600 mb-3">Choose a delivery method</p>
              <div className="flex gap-4 mb-4">
                <button
                  onClick={() => setDeliveryMethod('ship')}
                  className={`flex-1 py-3 rounded-lg font-semibold transition ${
                    deliveryMethod === 'ship'
                      ? 'bg-[#3b82f6] text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Ship
                </button>
                <button
                  onClick={() => setDeliveryMethod('pickup')}
                  className={`flex-1 py-3 rounded-lg font-semibold transition ${
                    deliveryMethod === 'pickup'
                      ? 'bg-[#3b82f6] text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Pick up
                </button>
              </div>

              <div className="relative mb-4">
                <select className="w-full px-4 py-3 border border-gray-300 rounded-lg appearance-none focus:ring-2 focus:ring-[#3b82f6] focus:border-transparent outline-none">
                  <option>United States</option>
                  <option>Canada</option>
                </select>
                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 pointer-events-none" />
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <input
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder="First name"
                  className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3b82f6] focus:border-transparent outline-none"
                />
                <input
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  placeholder="Last name"
                  className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3b82f6] focus:border-transparent outline-none"
                />
              </div>

              <input
                type="text"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                placeholder="Company (optional)"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3b82f6] focus:border-transparent outline-none mb-4"
              />

              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Address"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3b82f6] focus:border-transparent outline-none mb-4"
              />

              <input
                type="text"
                value={apartment}
                onChange={(e) => setApartment(e.target.value)}
                placeholder="Apartment, suite, etc. (optional)"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3b82f6] focus:border-transparent outline-none mb-4"
              />

              <div className="grid grid-cols-2 gap-4 mb-4">
                <input
                  type="text"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  placeholder="City"
                  className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3b82f6] focus:border-transparent outline-none"
                />
                <input
                  type="text"
                  value={zipCode}
                  onChange={(e) => setZipCode(e.target.value)}
                  placeholder="ZIP code"
                  className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3b82f6] focus:border-transparent outline-none"
                />
              </div>

              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Phone"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3b82f6] focus:border-transparent outline-none mb-3"
              />

              <label className="flex items-center gap-2 mb-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={saveInfo}
                  onChange={(e) => setSaveInfo(e.target.checked)}
                  className="w-5 h-5"
                />
                <span className="text-sm text-gray-700">Save this information for next time</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={textNews}
                  onChange={(e) => setTextNews(e.target.checked)}
                  className="w-5 h-5"
                />
                <span className="text-sm text-gray-700">Text me with news and offers</span>
              </label>
            </div>

            {/* Shipping Method */}
            <div>
              <h2 className="text-xl font-bold mb-4">Shipping method</h2>
              <p className="text-sm text-gray-600">Enter your shipping address to view available shipping methods.</p>
            </div>

            {/* Payment */}
            <div>
              <h2 className="text-xl font-bold mb-4">Payment</h2>
              <p className="text-sm text-gray-600 mb-4">All transactions are secure and encrypted.</p>

              <div className="space-y-3">
                <button
                  onClick={() => setPaymentMethod('credit')}
                  className={`w-full text-left p-4 border-2 rounded-lg transition ${
                    paymentMethod === 'credit' ? 'border-[#3b82f6] bg-blue-50' : 'border-gray-300'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-semibold">Credit card</span>
                    <div className="flex gap-2">
                      <span className="text-xs bg-gray-200 px-2 py-1 rounded">VISA</span>
                      <span className="text-xs bg-gray-200 px-2 py-1 rounded">MASTERCARD</span>
                      <span className="text-xs bg-gray-200 px-2 py-1 rounded">+3</span>
                    </div>
                  </div>
                </button>

                <label className="flex items-center gap-2 cursor-pointer text-sm text-gray-700 ml-4">
                  <input
                    type="checkbox"
                    checked={useSameAddress}
                    onChange={(e) => setUseSameAddress(e.target.checked)}
                    className="w-5 h-5"
                  />
                  Use shipping address as billing address
                </label>

                <button
                  onClick={() => setPaymentMethod('paypal')}
                  className={`w-full text-left p-4 border-2 rounded-lg transition ${
                    paymentMethod === 'paypal' ? 'border-[#3b82f6] bg-blue-50' : 'border-gray-300'
                  }`}
                >
                  <span className="font-semibold">PayPal</span>
                </button>

                <button
                  onClick={() => setPaymentMethod('coinbase')}
                  className={`w-full text-left p-4 border-2 rounded-lg transition ${
                    paymentMethod === 'coinbase' ? 'border-[#3b82f6] bg-blue-50' : 'border-gray-300'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-semibold">Coinbase Commerce</span>
                    <div className="flex gap-2">
                      <span className="text-xs bg-gray-200 px-2 py-1 rounded">bitcoin</span>
                      <span className="text-xs bg-gray-200 px-2 py-1 rounded">ethereum</span>
                      <span className="text-xs bg-gray-200 px-2 py-1 rounded">+4</span>
                    </div>
                  </div>
                </button>

                <button
                  onClick={() => setPaymentMethod('afterpay')}
                  className={`w-full text-left p-4 border-2 rounded-lg transition ${
                    paymentMethod === 'afterpay' ? 'border-[#3b82f6] bg-blue-50' : 'border-gray-300'
                  }`}
                >
                  <span className="font-semibold">Afterpay</span>
                </button>

                <button
                  onClick={() => setPaymentMethod('cashapp')}
                  className={`w-full text-left p-4 border-2 rounded-lg transition ${
                    paymentMethod === 'cashapp' ? 'border-[#3b82f6] bg-blue-50' : 'border-gray-300'
                  }`}
                >
                  <span className="font-semibold">Cash App Pay</span>
                </button>
              </div>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-3 gap-4 py-4 border-t">
              <div className="text-center">
                <p className="text-xs font-semibold text-gray-700">Secure Payments</p>
              </div>
              <div className="text-center">
                <p className="text-xs font-semibold text-gray-700">30-Day Money Back Guarantee</p>
              </div>
              <div className="text-center">
                <p className="text-xs font-semibold text-gray-700">Fast Shipping</p>
              </div>
            </div>

            <button className="w-full bg-[#3b82f6] text-white py-4 rounded-lg font-bold text-lg hover:bg-[#2563eb] transition">
              Submit
            </button>
          </div>

          {/* Right Column - Order Summary */}
          <div className="bg-white rounded-lg shadow-lg p-6 h-fit sticky top-4">
            <h2 className="text-2xl font-bold mb-6">Order summary</h2>
            <h3 className="text-lg font-semibold mb-4">Shopping cart</h3>

            {/* Cart Items */}
            <div className="space-y-4 mb-6">
              {items.map((item) => (
                <div key={item.id} className="flex gap-4">
                  <div className="relative">
                    <Image
                      src={item.image || '/ref/logo.png'}
                      alt={item.name}
                      width={80}
                      height={80}
                      className="rounded object-cover"
                    />
                    <span className="absolute -top-2 -right-2 bg-gray-600 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center">
                      {item.quantity}
                    </span>
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-sm">{item.name}</h4>
                    <div className="flex items-center gap-2 mt-1">
                      {item.discount_price ? (
                        <>
                          <span className="text-[#3b82f6] font-bold">${item.discount_price.toFixed(2)}</span>
                          <span className="text-gray-400 line-through text-sm">${item.price.toFixed(2)}</span>
                        </>
                      ) : (
                        <span className="text-[#3b82f6] font-bold">${item.price.toFixed(2)}</span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Discount Code */}
            <div className="mb-6">
              <h3 className="font-semibold mb-3">Discount code or gift card</h3>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={discountCode}
                  onChange={(e) => setDiscountCode(e.target.value)}
                  placeholder="Discount code or gift card"
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3b82f6] focus:border-transparent outline-none"
                />
                <button className="bg-gray-200 text-gray-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-300 transition">
                  Submit
                </button>
              </div>
            </div>

            {/* Cost Summary */}
            <div className="space-y-3 mb-6 pb-6 border-b">
              <div className="flex justify-between text-gray-700">
                <span>Subtotal</span>
                <span className="font-semibold">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-700">
                <span>Shipping</span>
                <span className="text-sm text-gray-500">Enter shipping address</span>
              </div>
            </div>

            <div className="flex justify-between items-center mb-2">
              <span className="text-xl font-bold">Total</span>
              <div className="text-right">
                <span className="text-sm text-gray-500 mr-2">USD</span>
                <span className="text-2xl font-bold">${subtotal.toFixed(2)}</span>
              </div>
            </div>

            {savings > 0 && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-3 mt-4">
                <p className="text-green-700 font-semibold text-center">
                  TOTAL SAVINGS ${savings.toFixed(2)}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
