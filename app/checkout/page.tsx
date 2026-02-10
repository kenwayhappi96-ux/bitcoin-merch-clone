'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useAppSelector } from '@/store/hooks'
import { ChevronDown, ChevronLeft, Lock, Info } from 'lucide-react'

export default function CheckoutPage() {
  const { items, shippingProtection, protectionFee } = useAppSelector((state: any) => state.cart)

  // Contact / shipping form
  const [email, setEmail] = useState('')
  const [emailNews, setEmailNews] = useState(false)
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [company, setCompany] = useState('')
  const [address, setAddress] = useState('')
  const [apartment, setApartment] = useState('')
  const [city, setCity] = useState('')
  const [country, setCountry] = useState('United States')
  const [region, setRegion] = useState('')
  const [zipCode, setZipCode] = useState('')
  const [phone, setPhone] = useState('')
  const [saveInfo, setSaveInfo] = useState(false)

  // Payment
  const [paymentMethod, setPaymentMethod] = useState<'credit' | 'paypal' | 'coinbase'>('credit')
  const [useSameAddress, setUseSameAddress] = useState(true)
  const [discountCode, setDiscountCode] = useState('')
  const [cardNumber, setCardNumber] = useState('')
  const [cardExpiry, setCardExpiry] = useState('')
  const [cardCvc, setCardCvc] = useState('')
  const [cardName, setCardName] = useState('')

  // Totals
  const subtotal = items.reduce((sum: number, item: any) => sum + (item.discount_price ?? item.price) * item.quantity, 0)
  const savings = items.reduce((sum: number, item: any) => {
    if (item.discount_price) return sum + (item.price - item.discount_price) * item.quantity
    return sum
  }, 0)

  // Shipping options
  const shippingOptions = [
    { id: 'usps_first_class', name: 'USPS First-Class Package International Service', eta: '7 to 21 business days', price: 31.35 },
    { id: 'fedex_connect_plus', name: 'FedEx International Connect Plus', eta: '—', price: 53.66 },
    { id: 'usps_priority', name: 'USPS Priority Mail International', eta: '6 to 10 business days', price: 99.23 },
    { id: 'ups_expedited', name: 'UPS Worldwide Expedited®', eta: '4 to 6 business days', price: 100.10 },
    { id: 'usps_express', name: 'USPS Priority Mail Express International', eta: '3 to 5 business days', price: 120.03 },
    { id: 'ups_saver', name: 'UPS Worldwide Saver®', eta: '4 to 6 business days', price: 121.08 },
    { id: 'dhl_express', name: 'DHL Express Worldwide', eta: '3 to 5 business days', price: 142.11 },
  ]

  const [selectedShippingId, setSelectedShippingId] = useState<string>(shippingOptions[0].id)
  const selectedShipping = shippingOptions.find((s) => s.id === selectedShippingId)
  const shipping = selectedShipping?.price ?? 0
  const protection = shippingProtection ? protectionFee : 0
  const total = subtotal + shipping + protection

  const format = (v: number) => v.toLocaleString('en-US', { style: 'currency', currency: 'USD' })

  const handleSelectShipping = (id: string) => {
    setSelectedShippingId(id)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) {
      alert('Please enter an email address.')
      return
    }
    if (items.length === 0) {
      alert('Your cart is empty.')
      return
    }

    const payload = {
      contact: { email, emailNews },
      shippingAddress: { firstName, lastName, company, address, apartment, city, region, zipCode, country, phone },
      shippingMethod: selectedShipping,
      paymentMethod,
      billingSameAsShipping: useSameAddress,
      items,
      shippingProtection,
      protectionFee: protection,
      totals: { subtotal, shipping, protection, total, savings },
      discountCode: discountCode || null,
    }

    console.log('Order payload:', payload)
    alert('Order prepared (demo). Integrate backend/payment gateway here.')
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header with logo */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-center">
            <Link href="/">
              <Image src="/ref/logo.png" alt="Bitcoin Merch" width={140} height={40} className="h-9 w-auto" />
            </Link>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Left Column - Checkout Form (lg:col-span-7) */}
          <div className="lg:col-span-7">
            {/* Breadcrumb */}
            <div className="mb-6">
              <Link href="/cart" className="inline-flex items-center text-sm text-blue-600 hover:text-blue-700">
                <ChevronLeft className="w-4 h-4 mr-1" />
                Show order summary
              </Link>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Express Checkout Options */}
              <div className="space-y-3">
                <h2 className="text-xl font-semibold text-gray-900">Express checkout</h2>
                <div className="grid grid-cols-3 gap-3">
                  <button type="button" className="h-12 flex items-center justify-center bg-[#5A31F4] hover:bg-[#4A21E4] text-white rounded font-medium transition">
                    Shop Pay
                  </button>
                  <button type="button" className="h-12 flex items-center justify-center bg-[#FFC439] hover:bg-[#EFB429] text-black rounded font-medium transition">
                    PayPal
                  </button>
                  <button type="button" className="h-12 flex items-center justify-center bg-black hover:bg-gray-900 text-white rounded font-medium transition">
                    G Pay
                  </button>
                </div>
                <div className="flex items-center gap-4 my-4">
                  <div className="flex-1 border-t border-gray-300"></div>
                  <span className="text-sm text-gray-500">OR</span>
                  <div className="flex-1 border-t border-gray-300"></div>
                </div>
              </div>

              {/* Contact Information */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-lg font-semibold text-gray-900">Contact</h3>
                  <Link href="/login" className="text-sm text-blue-600 hover:text-blue-700">
                    Log in
                  </Link>
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                />
                <label className="flex items-center gap-2 mt-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={emailNews}
                    onChange={(e) => setEmailNews(e.target.checked)}
                    className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-700">Email me with news and offers</span>
                </label>
              </div>

              {/* Delivery */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Delivery</h3>
                
                <div className="space-y-3">
                  {/* Country/Region */}
                  <div className="relative">
                    <select
                      value={country}
                      onChange={(e) => setCountry(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg appearance-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none bg-white transition"
                    >
                      <option>United States</option>
                      <option>Canada</option>
                      <option>United Kingdom</option>
                      <option>France</option>
                      <option>Germany</option>
                      <option>Australia</option>
                    </select>
                    <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                    <label className="absolute left-4 -top-2 px-1 bg-gray-50 text-xs text-gray-600">
                      Country/Region
                    </label>
                  </div>

                  {/* First Name & Last Name */}
                  <div className="grid grid-cols-2 gap-3">
                    <div className="relative">
                      <input
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        placeholder=" "
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none peer transition"
                      />
                      <label className="absolute left-4 top-3 text-gray-500 transition-all peer-focus:-top-2 peer-focus:text-xs peer-focus:bg-gray-50 peer-focus:px-1 peer-[:not(:placeholder-shown)]:-top-2 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:bg-gray-50 peer-[:not(:placeholder-shown)]:px-1">
                        First name
                      </label>
                    </div>
                    <div className="relative">
                      <input
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        placeholder=" "
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none peer transition"
                      />
                      <label className="absolute left-4 top-3 text-gray-500 transition-all peer-focus:-top-2 peer-focus:text-xs peer-focus:bg-gray-50 peer-focus:px-1 peer-[:not(:placeholder-shown)]:-top-2 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:bg-gray-50 peer-[:not(:placeholder-shown)]:px-1">
                        Last name
                      </label>
                    </div>
                  </div>

                  {/* Company */}
                  <div className="relative">
                    <input
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                      placeholder=" "
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none peer transition"
                    />
                    <label className="absolute left-4 top-3 text-gray-500 transition-all peer-focus:-top-2 peer-focus:text-xs peer-focus:bg-gray-50 peer-focus:px-1 peer-[:not(:placeholder-shown)]:-top-2 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:bg-gray-50 peer-[:not(:placeholder-shown)]:px-1">
                      Company (optional)
                    </label>
                  </div>

                  {/* Address */}
                  <div className="relative">
                    <input
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      placeholder=" "
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none peer transition"
                    />
                    <label className="absolute left-4 top-3 text-gray-500 transition-all peer-focus:-top-2 peer-focus:text-xs peer-focus:bg-gray-50 peer-focus:px-1 peer-[:not(:placeholder-shown)]:-top-2 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:bg-gray-50 peer-[:not(:placeholder-shown)]:px-1">
                      Address
                    </label>
                  </div>

                  {/* Apartment */}
                  <div className="relative">
                    <input
                      value={apartment}
                      onChange={(e) => setApartment(e.target.value)}
                      placeholder=" "
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none peer transition"
                    />
                    <label className="absolute left-4 top-3 text-gray-500 transition-all peer-focus:-top-2 peer-focus:text-xs peer-focus:bg-gray-50 peer-focus:px-1 peer-[:not(:placeholder-shown)]:-top-2 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:bg-gray-50 peer-[:not(:placeholder-shown)]:px-1">
                      Apartment, suite, etc. (optional)
                    </label>
                  </div>

                  {/* City, State, Zip */}
                  <div className="grid grid-cols-3 gap-3">
                    <div className="relative">
                      <input
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        placeholder=" "
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none peer transition"
                      />
                      <label className="absolute left-4 top-3 text-gray-500 transition-all peer-focus:-top-2 peer-focus:text-xs peer-focus:bg-gray-50 peer-focus:px-1 peer-[:not(:placeholder-shown)]:-top-2 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:bg-gray-50 peer-[:not(:placeholder-shown)]:px-1">
                        City
                      </label>
                    </div>
                    <div className="relative">
                      <select
                        value={region}
                        onChange={(e) => setRegion(e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg appearance-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none bg-white transition"
                      >
                        <option value="">State</option>
                        <option>California</option>
                        <option>New York</option>
                        <option>Texas</option>
                        <option>Florida</option>
                      </select>
                      <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                      <label className="absolute left-4 -top-2 px-1 bg-gray-50 text-xs text-gray-600">
                        State
                      </label>
                    </div>
                    <div className="relative">
                      <input
                        value={zipCode}
                        onChange={(e) => setZipCode(e.target.value)}
                        placeholder=" "
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none peer transition"
                      />
                      <label className="absolute left-4 top-3 text-gray-500 transition-all peer-focus:-top-2 peer-focus:text-xs peer-focus:bg-gray-50 peer-focus:px-1 peer-[:not(:placeholder-shown)]:-top-2 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:bg-gray-50 peer-[:not(:placeholder-shown)]:px-1">
                        ZIP code
                      </label>
                    </div>
                  </div>

                  {/* Phone */}
                  <div className="relative">
                    <input
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder=" "
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none peer transition"
                    />
                    <label className="absolute left-4 top-3 text-gray-500 transition-all peer-focus:-top-2 peer-focus:text-xs peer-focus:bg-gray-50 peer-focus:px-1 peer-[:not(:placeholder-shown)]:-top-2 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:bg-gray-50 peer-[:not(:placeholder-shown)]:px-1">
                      Phone
                    </label>
                  </div>

                  {/* Save info */}
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={saveInfo}
                      onChange={(e) => setSaveInfo(e.target.checked)}
                      className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="text-sm text-gray-700">Save this information for next time</span>
                  </label>
                </div>
              </div>

              {/* Shipping Method */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Shipping method</h3>
                <div className="border border-gray-300 rounded-lg divide-y divide-gray-200">
                  {shippingOptions.map((opt) => (
                    <label
                      key={opt.id}
                      className={`flex items-center justify-between p-4 cursor-pointer hover:bg-gray-50 transition ${
                        selectedShippingId === opt.id ? 'bg-blue-50' : ''
                      }`}
                      onClick={() => handleSelectShipping(opt.id)}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                          selectedShippingId === opt.id ? 'border-blue-600' : 'border-gray-300'
                        }`}>
                          {selectedShippingId === opt.id && (
                            <div className="w-3 h-3 rounded-full bg-blue-600" />
                          )}
                        </div>
                        <div>
                          <div className="text-sm font-medium text-gray-900">{opt.name}</div>
                          <div className="text-xs text-gray-500">{opt.eta}</div>
                        </div>
                      </div>
                      <div className="text-sm font-semibold text-gray-900">{format(opt.price)}</div>
                    </label>
                  ))}
                </div>
              </div>

              {/* Payment */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Payment</h3>
                <div className="text-sm text-gray-600 mb-4">All transactions are secure and encrypted.</div>

                <div className="border border-gray-300 rounded-lg overflow-hidden">
                  {/* Credit Card */}
                  <div className={`border-b border-gray-300 ${paymentMethod === 'credit' ? 'bg-blue-50' : 'bg-white'}`}>
                    <button
                      type="button"
                      onClick={() => setPaymentMethod('credit')}
                      className="w-full p-4 flex items-center justify-between text-left"
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                          paymentMethod === 'credit' ? 'border-blue-600' : 'border-gray-300'
                        }`}>
                          {paymentMethod === 'credit' && (
                            <div className="w-3 h-3 rounded-full bg-blue-600" />
                          )}
                        </div>
                        <span className="text-sm font-medium text-gray-900">Credit card</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Image src="/icons/visa.svg" alt="Visa" width={32} height={20} className="h-5 w-auto" onError={(e) => e.currentTarget.style.display = 'none'} />
                        <Image src="/icons/mastercard.svg" alt="Mastercard" width={32} height={20} className="h-5 w-auto" onError={(e) => e.currentTarget.style.display = 'none'} />
                        <Image src="/icons/amex.svg" alt="Amex" width={32} height={20} className="h-5 w-auto" onError={(e) => e.currentTarget.style.display = 'none'} />
                      </div>
                    </button>

                    {paymentMethod === 'credit' && (
                      <div className="px-4 pb-4 space-y-3 bg-white">
                        <div className="relative">
                          <input
                            value={cardNumber}
                            onChange={(e) => setCardNumber(e.target.value)}
                            placeholder=" "
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none peer transition"
                          />
                          <label className="absolute left-4 top-3 text-gray-500 transition-all peer-focus:-top-2 peer-focus:text-xs peer-focus:bg-white peer-focus:px-1 peer-[:not(:placeholder-shown)]:-top-2 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:bg-white peer-[:not(:placeholder-shown)]:px-1">
                            Card number
                          </label>
                        </div>
                        <div className="relative">
                          <input
                            value={cardName}
                            onChange={(e) => setCardName(e.target.value)}
                            placeholder=" "
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none peer transition"
                          />
                          <label className="absolute left-4 top-3 text-gray-500 transition-all peer-focus:-top-2 peer-focus:text-xs peer-focus:bg-white peer-focus:px-1 peer-[:not(:placeholder-shown)]:-top-2 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:bg-white peer-[:not(:placeholder-shown)]:px-1">
                            Name on card
                          </label>
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                          <div className="relative">
                            <input
                              value={cardExpiry}
                              onChange={(e) => setCardExpiry(e.target.value)}
                              placeholder=" "
                              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none peer transition"
                            />
                            <label className="absolute left-4 top-3 text-gray-500 transition-all peer-focus:-top-2 peer-focus:text-xs peer-focus:bg-white peer-focus:px-1 peer-[:not(:placeholder-shown)]:-top-2 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:bg-white peer-[:not(:placeholder-shown)]:px-1">
                              Expiration date (MM / YY)
                            </label>
                          </div>
                          <div className="relative">
                            <input
                              value={cardCvc}
                              onChange={(e) => setCardCvc(e.target.value)}
                              placeholder=" "
                              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none peer transition"
                            />
                            <label className="absolute left-4 top-3 text-gray-500 transition-all peer-focus:-top-2 peer-focus:text-xs peer-focus:bg-white peer-focus:px-1 peer-[:not(:placeholder-shown)]:-top-2 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:bg-white peer-[:not(:placeholder-shown)]:px-1">
                              Security code
                            </label>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* PayPal */}
                  <div className={`border-b border-gray-300 ${paymentMethod === 'paypal' ? 'bg-blue-50' : 'bg-white'}`}>
                    <button
                      type="button"
                      onClick={() => setPaymentMethod('paypal')}
                      className="w-full p-4 flex items-center justify-between text-left"
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                          paymentMethod === 'paypal' ? 'border-blue-600' : 'border-gray-300'
                        }`}>
                          {paymentMethod === 'paypal' && (
                            <div className="w-3 h-3 rounded-full bg-blue-600" />
                          )}
                        </div>
                        <span className="text-sm font-medium text-gray-900">PayPal</span>
                      </div>
                    </button>
                  </div>

                  {/* Coinbase */}
                  <div className={paymentMethod === 'coinbase' ? 'bg-blue-50' : 'bg-white'}>
                    <button
                      type="button"
                      onClick={() => setPaymentMethod('coinbase')}
                      className="w-full p-4 flex items-center justify-between text-left"
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                          paymentMethod === 'coinbase' ? 'border-blue-600' : 'border-gray-300'
                        }`}>
                          {paymentMethod === 'coinbase' && (
                            <div className="w-3 h-3 rounded-full bg-blue-600" />
                          )}
                        </div>
                        <span className="text-sm font-medium text-gray-900">Crypto (Coinbase Commerce)</span>
                      </div>
                    </button>
                  </div>
                </div>
              </div>

              {/* Billing Address */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Billing address</h3>
                <div className="border border-gray-300 rounded-lg divide-y divide-gray-200">
                  <label className={`flex items-center p-4 cursor-pointer hover:bg-gray-50 transition ${useSameAddress ? 'bg-blue-50' : ''}`}>
                    <input
                      type="radio"
                      checked={useSameAddress}
                      onChange={() => setUseSameAddress(true)}
                      className="w-5 h-5 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="ml-3 text-sm text-gray-900">Same as shipping address</span>
                  </label>
                  <label className={`flex items-center p-4 cursor-pointer hover:bg-gray-50 transition ${!useSameAddress ? 'bg-blue-50' : ''}`}>
                    <input
                      type="radio"
                      checked={!useSameAddress}
                      onChange={() => setUseSameAddress(false)}
                      className="w-5 h-5 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="ml-3 text-sm text-gray-900">Use a different billing address</span>
                  </label>
                </div>
              </div>

              {/* Pay Now Button */}
              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 px-6 rounded-lg transition text-lg"
              >
                Pay now
              </button>

              {/* Footer Links */}
              <div className="pt-6 border-t border-gray-200">
                <div className="flex items-center justify-center gap-4 text-xs text-gray-500">
                  <Link href="/refund-policy" className="hover:text-gray-700">Refund policy</Link>
                  <span>•</span>
                  <Link href="/privacy-policy" className="hover:text-gray-700">Privacy policy</Link>
                  <span>•</span>
                  <Link href="/terms-of-service" className="hover:text-gray-700">Terms of service</Link>
                </div>
              </div>
            </form>
          </div>

          {/* Right Column - Order Summary (lg:col-span-5) */}
          <aside className="lg:col-span-5">
            <div className="lg:sticky lg:top-6 bg-gray-50 border-l border-gray-200 lg:pl-8 lg:-mr-8 lg:pr-8 py-6">
              {/* Products */}
              <div className="space-y-4 mb-6">
                {items.length === 0 ? (
                  <div className="text-sm text-gray-500 text-center py-8">Your cart is empty</div>
                ) : (
                  items.map((item: any) => (
                    <div key={item.id} className="flex gap-4">
                      <div className="relative flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border border-gray-300 bg-white">
                        <Image
                          src={item.image || '/ref/logo.png'}
                          alt={item.name}
                          fill
                          sizes="64px"
                          className="object-cover"
                        />
                        <div className="absolute -top-2 -right-2 w-6 h-6 bg-gray-600 text-white text-xs rounded-full flex items-center justify-center font-semibold">
                          {item.quantity}
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-medium text-gray-900 mb-1">{item.name}</div>
                        {item.size && <div className="text-xs text-gray-500">Size: {item.size}</div>}
                      </div>
                      <div className="text-sm font-semibold text-gray-900">
                        {format((item.discount_price ?? item.price) * item.quantity)}
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Discount Code */}
              <div className="mb-6">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={discountCode}
                    onChange={(e) => setDiscountCode(e.target.value)}
                    placeholder="Discount code"
                    className="flex-1 px-4 py-3 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  />
                  <button
                    type="button"
                    className="px-5 py-3 bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium rounded-lg text-sm transition"
                  >
                    Apply
                  </button>
                </div>
              </div>

              {/* Totals */}
              <div className="space-y-3 pb-4 border-b border-gray-300">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium text-gray-900">{format(subtotal)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Shipping</span>
                  <span className="font-medium text-gray-900">
                    {selectedShipping ? format(selectedShipping.price) : '—'}
                  </span>
                </div>
                {shippingProtection && protection > 0 && (
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Shipping Protection</span>
                    <span className="font-medium text-gray-900">{format(protection)}</span>
                  </div>
                )}
              </div>

              {/* Total */}
              <div className="pt-4">
                <div className="flex justify-between items-baseline mb-1">
                  <span className="text-sm text-gray-600">Total</span>
                  <div className="text-right">
                    <div className="text-xs text-gray-500 mb-1">USD</div>
                    <div className="text-2xl font-bold text-gray-900">{format(total)}</div>
                  </div>
                </div>
              </div>

              {/* Savings Badge */}
              {savings > 0 && (
                <div className="mt-4 bg-green-50 border border-green-200 rounded-lg p-3">
                  <div className="text-sm font-medium text-green-800">
                    🎉 You're saving {format(savings)}!
                  </div>
                </div>
              )}
            </div>
          </aside>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-center gap-2 text-xs text-gray-500">
            <Lock className="w-3 h-3" />
            <span>All transactions are secure and encrypted</span>
          </div>
        </div>
      </footer>
    </div>
  )
}