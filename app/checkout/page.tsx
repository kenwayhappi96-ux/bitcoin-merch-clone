'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useAppSelector } from '@/store/hooks'
import { ChevronDown, Truck, Shield } from 'lucide-react'

export default function CheckoutPage() {
  const { items } = useAppSelector((state: any) => state.cart)

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

  // Totals (from store / DB)
  const subtotal = items.reduce((sum: number, item: any) => sum + (item.discount_price ?? item.price) * item.quantity, 0)
  const savings = items.reduce((sum: number, item: any) => {
    if (item.discount_price) return sum + (item.price - item.discount_price) * item.quantity
    return sum
  }, 0)

  // Shipping options (French labels)
  const shippingOptions = [
    { id: 'usps_first_class', name: 'Colis international de première classe USPS', eta: '7 à 21 jours ouvrables', price: 31.35 },
    { id: 'fedex_connect_plus', name: 'FedEx International Connect Plus', eta: '—', price: 53.66 },
    { id: 'usps_priority', name: 'Courrier prioritaire international USPS', eta: '6 à 10 jours ouvrables', price: 99.23 },
    { id: 'ups_expedited', name: 'UPS Worldwide Expedited®', eta: '4 à 6 jours ouvrables', price: 100.10 },
    { id: 'usps_express', name: "Courrier prioritaire express international de l'USPS", eta: '3 à 5 jours ouvrables', price: 120.03 },
    { id: 'ups_saver', name: 'UPS Worldwide Saver®', eta: '4 à 6 jours ouvrables', price: 121.08 },
    { id: 'dhl_express', name: 'DHL Express Monde entier', eta: '3 à 5 jours ouvrables', price: 142.11 },
    { id: 'fedex_economy', name: 'FedEx International Economy®', eta: '—', price: 442.88 },
    { id: 'fedex_priority', name: 'FedEx International Priority®', eta: '—', price: 600.66 },
  ]

  // Selected shipping (default first)
  const [selectedShippingId, setSelectedShippingId] = useState<string>(shippingOptions[0].id)
  const selectedShipping = shippingOptions.find((s) => s.id === selectedShippingId)
  const shipping = selectedShipping?.price ?? 0
  const total = subtotal + shipping

  const format = (v: number) => v.toLocaleString('en-US', { style: 'currency', currency: 'USD' })

  const handleSelectShipping = (id: string) => {
    setSelectedShippingId(id)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) {
      alert('Veuillez renseigner un e‑mail.')
      return
    }
    if (items.length === 0) {
      alert('Votre panier est vide.')
      return
    }

    const payload = {
      contact: { email, emailNews },
      shippingAddress: { firstName, lastName, company, address, apartment, city, region, zipCode, country, phone },
      shippingMethod: selectedShipping,
      paymentMethod,
      billingSameAsShipping: useSameAddress,
      items,
      totals: { subtotal, shipping, total, savings },
      discountCode: discountCode || null,
    }

    console.log('Order payload (demo):', payload)
    alert('Commande préparée (demo). Intégrer l’appel à votre backend/payment gateway ici.')
  }

  return (
    <div className="min-h-screen bg-white w-full">
      {/* NO global header / footer — this page is standalone and full-width */}
      <div className="w-full px-6 lg:px-16 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Left: Checkout form (takes left half) */}
          <div className="space-y-8">
            <div className="flex items-center gap-4">
              <Link href="/">
                <Image src="/ref/logo.png" alt="Bitcoin Merch" width={160} height={48} className="h-10 w-auto" />
              </Link>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl">
              {/* Contact */}
              <section className="bg-white border border-gray-200 rounded-lg p-6">
                <div className="flex items-center justify-between mb-3">
                  <h2 className="text-lg font-semibold">Contact</h2>
                </div>

                <div className="space-y-3">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={emailNews}
                      onChange={(e) => setEmailNews(e.target.checked)}
                      className="mt-1 w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="text-sm text-gray-700 leading-tight">M'envoyer des offres et des nouveautés par e‑mail</span>
                  </label>
                </div>
              </section>

              {/* Shipping address */}
              <section className="bg-white border border-gray-200 rounded-lg p-6">
                <h2 className="text-lg font-semibold mb-3">Adresse de livraison</h2>

                <div className="space-y-3">
                  <div className="relative">
                    <select
                      value={country}
                      onChange={(e) => setCountry(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-md appearance-none focus:ring-2 focus:ring-blue-500 outline-none bg-white"
                    >
                      <option>United States</option>
                      <option>Canada</option>
                      <option>United Kingdom</option>
                      <option>Australia</option>
                    </select>
                    <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <input value={firstName} onChange={(e) => setFirstName(e.target.value)} placeholder="Prénom" className="px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none" />
                    <input value={lastName} onChange={(e) => setLastName(e.target.value)} placeholder="Nom" className="px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none" />
                  </div>

                  <input value={company} onChange={(e) => setCompany(e.target.value)} placeholder="Société (optionnel)" className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none" />
                  <input value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Adresse" className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none" />
                  <input value={apartment} onChange={(e) => setApartment(e.target.value)} placeholder="Appartement, suite, etc. (optionnel)" className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none" />

                  <div className="grid grid-cols-3 gap-3">
                    <input value={city} onChange={(e) => setCity(e.target.value)} placeholder="Ville" className="px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none" />
                    <div className="relative">
                      <select value={region} onChange={(e) => setRegion(e.target.value)} className="w-full px-4 py-3 border border-gray-300 rounded-md appearance-none focus:ring-2 focus:ring-blue-500 outline-none bg-white">
                        <option value="">État</option>
                        <option>California</option>
                        <option>New York</option>
                        <option>Texas</option>
                      </select>
                      <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                    </div>
                    <input value={zipCode} onChange={(e) => setZipCode(e.target.value)} placeholder="Code postal" className="px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none" />
                  </div>

                  <input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Téléphone" className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none" />

                  <label className="flex items-start gap-3 cursor-pointer">
                    <input type="checkbox" checked={saveInfo} onChange={(e) => setSaveInfo(e.target.checked)} className="mt-1 w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                    <span className="text-sm text-gray-700 leading-tight">Sauvegarder ces informations pour la prochaine fois</span>
                  </label>
                </div>
              </section>

              {/* Shipping methods */}
              <section className="bg-white border border-gray-200 rounded-lg p-6">
                <h2 className="text-lg font-semibold mb-1">Méthode d'expédition</h2>
                <p className="text-sm text-gray-600 mb-3">Choisissez un mode de livraison</p>

                <div className="space-y-3">
                  {shippingOptions.map((opt) => (
                    <label
                      key={opt.id}
                      className={`group flex items-center justify-between p-4 rounded-md border transition cursor-pointer ${
                        selectedShippingId === opt.id ? 'border-blue-600 bg-blue-50' : 'border-gray-200 bg-white hover:shadow-sm'
                      }`}
                    >
                      <div className="flex items-start gap-3" onClick={() => handleSelectShipping(opt.id)}>
                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center mt-0.5 ${selectedShippingId === opt.id ? 'border-blue-600' : 'border-gray-300'}`}>
                          {selectedShippingId === opt.id && <div className="w-3 h-3 rounded-full bg-blue-600" />}
                        </div>
                        <div>
                          <div className="font-medium text-sm">{opt.name}</div>
                          <div className="text-xs text-gray-500 mt-1">{opt.eta}</div>
                        </div>
                      </div>

                      <div className="text-right" onClick={() => handleSelectShipping(opt.id)}>
                        <div className="font-semibold">{format(opt.price)}</div>
                        <div className="text-xs text-gray-400">Sélectionner</div>
                      </div>
                    </label>
                  ))}
                </div>
              </section>

              {/* Payment */}
              <section className="bg-white border border-gray-200 rounded-lg p-6">
                <h2 className="text-lg font-semibold mb-2">Paiement</h2>
                <p className="text-sm text-gray-600 mb-4">Toutes les transactions sont sécurisées et chiffrées.</p>

                <div className="space-y-3">
                  <div className={`p-4 rounded-md border ${paymentMethod === 'credit' ? 'ring-1 ring-blue-300 bg-white' : 'bg-gray-50 border-gray-200'}`}>
                    <button type="button" onClick={() => setPaymentMethod('credit')} className="w-full text-left">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-medium">Carte de crédit</div>
                          <div className="text-xs text-gray-500">Visa, Mastercard, Amex</div>
                        </div>
                        <div className="text-xs text-gray-500">{paymentMethod === 'credit' ? 'Sélectionné' : ''}</div>
                      </div>
                    </button>

                    {paymentMethod === 'credit' && (
                      <div className="mt-4 space-y-3">
                        <input value={cardNumber} onChange={(e) => setCardNumber(e.target.value)} placeholder="Numéro de carte" className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none" />
                        <input value={cardName} onChange={(e) => setCardName(e.target.value)} placeholder="Nom sur la carte" className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none" />
                        <div className="grid grid-cols-2 gap-3">
                          <input value={cardExpiry} onChange={(e) => setCardExpiry(e.target.value)} placeholder="Expiration (MM/YY)" className="px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none" />
                          <input value={cardCvc} onChange={(e) => setCardCvc(e.target.value)} placeholder="CVC" className="px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none" />
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <button type="button" onClick={() => setPaymentMethod('paypal')} className={`px-3 py-3 rounded-md border text-left ${paymentMethod === 'paypal' ? 'border-blue-600 bg-blue-50' : 'border-gray-200 bg-white'}`}>PayPal</button>
                    <button type="button" onClick={() => setPaymentMethod('coinbase')} className={`px-3 py-3 rounded-md border text-left ${paymentMethod === 'coinbase' ? 'border-blue-600 bg-blue-50' : 'border-gray-200 bg-white'}`}>Crypto (Coinbase)</button>
                  </div>

                  <label className="flex items-start gap-3 cursor-pointer mt-2">
                    <input type="checkbox" checked={useSameAddress} onChange={(e) => setUseSameAddress(e.target.checked)} className="mt-1 w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                    <span className="text-sm text-gray-700 leading-tight">Utiliser l'adresse de livraison comme adresse de facturation</span>
                  </label>
                </div>
              </section>

              <div className="flex items-center justify-between gap-4">
                <div className="text-sm text-gray-600 flex items-center gap-2"><Shield className="w-4 h-4 text-gray-400" />Paiement sécurisé • Retours 30 jours</div>
                <div>
                  <button type="submit" className="px-6 py-3 rounded-md bg-blue-600 text-white font-semibold hover:bg-blue-700 transition">
                    Payer {format(total)}
                  </button>
                </div>
              </div>
            </form>
          </div>

          {/* Right: Order summary (sticky on lg screens) */}
          <aside className="lg:pl-8">
            <div className="lg:sticky lg:top-6 bg-white border border-gray-200 rounded-lg p-6 space-y-6">
              <h3 className="text-lg font-semibold">Résumé de la commande</h3>

              <div className="space-y-4">
                {items.length === 0 ? (
                  <div className="text-sm text-gray-500">Votre panier est vide</div>
                ) : (
                  items.map((item: any) => (
                    <div key={item.id} className="flex gap-4">
                      <div className="relative flex-shrink-0 w-16 h-16 rounded overflow-hidden border border-gray-200">
                        <Image src={item.image || '/ref/logo.png'} alt={item.name} fill sizes="64px" className="object-cover" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between">
                          <div>
                            <div className="text-sm font-medium text-gray-900 truncate">{item.name}</div>
                            {item.size && <div className="text-xs text-gray-500">Taille: {item.size}</div>}
                          </div>
                          <div className="text-sm font-semibold text-gray-900">{format((item.discount_price ?? item.price) * item.quantity)}</div>
                        </div>
                        <div className="text-xs text-gray-400 mt-1">x{item.quantity}</div>
                      </div>
                    </div>
                  ))
                )}
              </div>

              <div className="pt-4 border-t border-gray-200">
                <div className="flex gap-2">
                  <input type="text" value={discountCode} onChange={(e) => setDiscountCode(e.target.value)} placeholder="Code promo" className="flex-1 px-3 py-2 border border-gray-300 rounded-md text-sm outline-none" />
                  <button className="px-4 py-2 bg-gray-100 rounded-md text-sm font-medium">Appliquer</button>
                </div>
              </div>

              <div className="space-y-3 pt-4 border-t border-gray-200">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Sous-total</span>
                  <span className="font-medium text-gray-900">{format(subtotal)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Expédition</span>
                  <span className="font-medium text-gray-900">{selectedShipping ? format(selectedShipping.price) : '—'}</span>
                </div>
                {savings > 0 && (
                  <div className="mt-2 bg-green-50 border border-green-100 rounded-md p-2 text-sm text-green-700">Vous avez économisé {format(savings)}</div>
                )}
              </div>

              <div className="pt-4 border-t border-gray-200">
                <div className="flex items-baseline justify-between">
                  <div className="text-sm text-gray-600">Total</div>
                  <div className="text-2xl font-bold">{format(total)}</div>
                </div>
                <div className="text-xs text-gray-500 mt-1">USD — Taxes calculées à la livraison</div>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-4">
                <div className="flex items-start gap-3">
                  <Shield className="w-5 h-5 text-gray-400 mt-0.5" />
                  <div>
                    <div className="text-xs font-semibold text-gray-700">Paiement sécurisé</div>
                    <div className="text-xs text-gray-500">SSL chiffré</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Truck className="w-5 h-5 text-gray-400 mt-0.5" />
                  <div>
                    <div className="text-xs font-semibold text-gray-700">Livraison rapide</div>
                    <div className="text-xs text-gray-500">2-10 jours ouvrables</div>
                  </div>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  )
}