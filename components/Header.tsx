'use client'

import {
  ShoppingCart,
  User,
  ChevronDown,
  Search,
  Menu,
  X,
  Trophy,
  Video,
  Star,
  Droplets,
  Headphones,
  Phone,
  Mail,
  Box,
} from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect, useRef } from 'react'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { openCart } from '@/store/cartSlice'
import { useRouter } from 'next/navigation'

interface SearchResult {
  id: number
  name: string
  slug: string
  price: string | number
  discount_price: string | number | null
  category_name: string
  image: string | null
}

export default function Header() {
  const dispatch = useAppDispatch()
  const router = useRouter()
  const cartItems = useAppSelector((state) => state.cart.items)

  const [accountDropdown, setAccountDropdown] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState<SearchResult[]>([])
  const [showResults, setShowResults] = useState(false)
  const [isSearching, setIsSearching] = useState(false)
  const [showMobileSearch, setShowMobileSearch] = useState(false)
  const [selectedIndex, setSelectedIndex] = useState(-1)

  const searchRef = useRef<HTMLDivElement>(null)
  const mobileSearchRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0)

  // Recherche live avec debounce
  useEffect(() => {
    const timer = setTimeout(async () => {
      if (searchQuery.trim().length < 1) {
        setSearchResults([])
        setShowResults(false)
        return
      }

      setIsSearching(true)
      try {
        const res = await fetch(`/api/search?q=${encodeURIComponent(searchQuery.trim())}`)
        if (!res.ok) throw new Error('Search failed')
        const data = await res.json()
        setSearchResults(Array.isArray(data) ? data : [])
        setShowResults(true)
        setSelectedIndex(-1)
      } catch (err) {
        console.error('Search error:', err)
        setSearchResults([])
      } finally {
        setIsSearching(false)
      }
    }, 300)

    return () => clearTimeout(timer)
  }, [searchQuery])

  // Fermeture au clic extérieur (desktop + mobile)
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node) &&
        mobileSearchRef.current &&
        !mobileSearchRef.current.contains(event.target as Node)
      ) {
        setShowResults(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    document.addEventListener('touchend', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('touchend', handleClickOutside)
    }
  }, [])

  // Navigation au clavier
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!showResults || searchResults.length === 0) return

    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setSelectedIndex((prev) => (prev < searchResults.length - 1 ? prev + 1 : prev))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setSelectedIndex((prev) => (prev > 0 ? prev - 1 : -1))
    } else if (e.key === 'Enter') {
      e.preventDefault()
      if (selectedIndex >= 0) {
        navigateToProduct(searchResults[selectedIndex])
      } else if (searchQuery.trim()) {
        navigateToSearchPage()
      }
    } else if (e.key === 'Escape') {
      setShowResults(false)
      setSelectedIndex(-1)
      inputRef.current?.blur()
    }
  }

  const navigateToProduct = (product: SearchResult) => {
    setShowResults(false)
    setShowMobileSearch(false)
    setSearchQuery('')
    setSelectedIndex(-1)

    setTimeout(() => {
      router.push(`/products/${product.slug}`)
    }, 80)
  }

  const navigateToSearchPage = () => {
    setShowResults(false)
    setShowMobileSearch(false)
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`)
    }
  }

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      navigateToSearchPage()
    }
  }

  const formatPrice = (price: string | number, discountPrice: string | number | null) => {
    const p = typeof price === 'string' ? parseFloat(price) : price
    const d = discountPrice ? (typeof discountPrice === 'string' ? parseFloat(discountPrice) : discountPrice) : null

    if (d !== null && d < p) {
      return (
        <div className="flex items-center gap-2">
          <span className="text-red-600 font-bold">€{d.toFixed(2)}</span>
          <span className="text-gray-400 line-through text-sm">€{p.toFixed(2)}</span>
        </div>
      )
    }
    return <span className="font-bold">€{p.toFixed(2)}</span>
  }

  return (
    <>
      {/* Barre supérieure sticky */}
      <div className="sticky top-0 z-50 bg-[#0036cc] text-white shadow-lg border-b border-white/20">
        <div className="w-full max-w-[90%] mx-auto px-5 py-4">
          <div className="flex items-center justify-between gap-4">
            {/* Logo + burger mobile */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden hover:text-[#FF8C00] transition"
              >
                {mobileMenuOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
              </button>

              <Link href="/" className="flex-shrink-0">
                <Image
                  src="https://cdn.shopify.com/s/files/1/2609/9556/files/bitcoin-merch-logoeu_150x@2x.png?v=1767374567"
                  alt="Bitcoin Merch"
                  width={200}
                  height={60}
                  className="h-10 sm:h-12 md:h-14 lg:h-16 w-auto object-contain"
                />
              </Link>
            </div>

            {/* Recherche desktop */}
            <div className="flex-1 hidden md:block relative" ref={searchRef}>
              <form onSubmit={handleSearchSubmit}>
                <div className="relative">
                  <input
                    ref={inputRef}
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyDown={handleKeyDown}
                    onFocus={() => searchResults.length > 0 && setShowResults(true)}
                    placeholder="Rechercher des produits..."
                    className="w-full pl-5 pr-16 py-3 bg-white text-black rounded-md focus:ring-2 focus:ring-[#FF8C00] focus:outline-none"
                  />
                  <button
                    type="submit"
                    className="absolute right-0 top-0 h-full px-4 bg-[#FF8C00] rounded-r-md flex items-center justify-center hover:bg-[#e67e00] transition"
                  >
                    <Search className={`w-5 h-5 text-white ${isSearching ? 'animate-spin' : ''}`} />
                  </button>
                </div>
              </form>

              {/* Résultats desktop */}
              {showResults && (
                <div
                  className="absolute top-full left-0 right-0 mt-2 bg-white text-gray-800 rounded-lg shadow-2xl max-h-[500px] overflow-y-auto z-[60]"
                  style={{ touchAction: 'manipulation' }}
                >
                  {isSearching ? (
                    <div className="p-6 text-center text-gray-500">Recherche en cours...</div>
                  ) : searchResults.length > 0 ? (
                    <>
                      {searchResults.map((product, index) => (
                        <div
                          key={product.id}
                          onClick={(e) => {
                            e.preventDefault()
                            e.stopPropagation()
                            navigateToProduct(product)
                          }}
                          className={`flex items-center gap-4 p-4 hover:bg-gray-50 active:bg-gray-100 transition border-b border-gray-100 last:border-b-0 cursor-pointer ${
                            selectedIndex === index ? 'bg-blue-50' : ''
                          }`}
                        >
                          <div className="w-16 h-16 flex-shrink-0 bg-gray-100 rounded overflow-hidden">
                            {product.image ? (
                              <Image
                                src={product.image}
                                alt={product.name}
                                width={64}
                                height={64}
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center text-gray-400">
                                <Box className="w-8 h-8" />
                              </div>
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="font-semibold text-sm line-clamp-2 mb-1">{product.name}</h4>
                            <p className="text-xs text-gray-500 mb-1">{product.category_name}</p>
                            <div className="text-sm">{formatPrice(product.price, product.discount_price)}</div>
                          </div>
                        </div>
                      ))}

                      <div
                        onClick={(e) => {
                          e.preventDefault()
                          e.stopPropagation()
                          navigateToSearchPage()
                        }}
                        className="p-4 text-center text-[#0036cc] hover:bg-gray-50 active:bg-gray-100 font-semibold text-sm border-t-2 border-gray-200 cursor-pointer"
                      >
                        Voir tous les résultats pour "{searchQuery}"
                      </div>
                    </>
                  ) : searchQuery.trim() ? (
                    <div className="p-6 text-center">
                      <Search className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                      <h3 className="font-bold text-lg mb-2">Aucun résultat trouvé</h3>
                      <p className="text-gray-600 mb-4">Aucun produit ne correspond à "{searchQuery}"</p>
                      <Link
                        href="/"
                        className="text-[#0036cc] hover:text-[#FF8C00] font-semibold"
                        onClick={() => setShowResults(false)}
                      >
                        Retour à l'accueil
                      </Link>
                    </div>
                  ) : null}
                </div>
              )}
            </div>

            {/* Icônes droite */}
            <div className="flex items-center gap-4">
              <button onClick={() => setShowMobileSearch(!showMobileSearch)} className="md:hidden hover:text-[#FF8C00] transition">
                <Search className="w-6 h-6" />
              </button>

              {/* Compte desktop */}
              <div className="relative hidden md:block">
                <div className="flex items-center gap-2">
                  <User className="w-6 h-6" />
                  <div className="flex flex-col items-start leading-tight">
                    <Link href="/login" className="text-gray-200 text-sm hover:text-[#FF8C00] transition">
                      Login / Signup
                    </Link>
                    <button
                      onClick={() => setAccountDropdown(!accountDropdown)}
                      className="font-semibold text-base hover:text-[#FF8C00] transition flex items-center gap-1"
                    >
                      My account
                      <ChevronDown className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {accountDropdown && (
                  <div className="absolute right-0 mt-2 w-64 bg-white text-gray-800 rounded-lg shadow-xl py-4 px-6 z-50">
                    <div className="space-y-3">
                      <div>
                        <p className="font-semibold mb-2">Login / Signup</p>
                        <p className="text-sm text-gray-600 mb-3">My account</p>
                        <Link
                          href="/login"
                          className="block w-full bg-[#3b82f6] text-white py-2 rounded-lg font-semibold hover:bg-[#2563eb] transition text-center"
                        >
                          Login
                        </Link>
                      </div>
                      <div className="border-t pt-3">
                        <Link href="/login" className="text-sm text-[#3b82f6] hover:underline block mb-2">
                          New customer? Create your account
                        </Link>
                        <Link href="/login" className="text-sm text-gray-600 hover:underline block">
                          Lost password? Recover password
                        </Link>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Compte mobile */}
              <div className="md:hidden relative">
                <button onClick={() => setAccountDropdown(!accountDropdown)} className="hover:text-[#FF8C00] transition">
                  <User className="w-6 h-6" />
                </button>

                {accountDropdown && (
                  <div className="absolute right-0 mt-2 w-64 bg-white text-gray-800 rounded-lg shadow-xl py-4 px-6 z-50">
                    <div className="space-y-3">
                      <div>
                        <p className="font-semibold mb-2">Login / Signup</p>
                        <p className="text-sm text-gray-600 mb-3">My account</p>
                        <Link
                          href="/login"
                          className="block w-full bg-[#3b82f6] text-white py-2 rounded-lg font-semibold hover:bg-[#2563eb] transition text-center"
                        >
                          Login
                        </Link>
                      </div>
                      <div className="border-t pt-3">
                        <Link href="/login" className="text-sm text-[#3b82f6] hover:underline block mb-2">
                          New customer? Create your account
                        </Link>
                        <Link href="/login" className="text-sm text-gray-600 hover:underline block">
                          Lost password? Recover password
                        </Link>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Panier */}
              <button onClick={() => dispatch(openCart())} className="flex items-center gap-2 hover:text-[#FF8C00] transition">
                <div className="relative">
                  <ShoppingCart className="w-8 h-8" />
                  {cartCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-[#FF8C00] text-white text-sm font-bold rounded-full w-6 h-6 flex items-center justify-center">
                      {cartCount}
                    </span>
                  )}
                </div>
                <span className="hidden sm:block font-semibold text-lg">Cart</span>
              </button>
            </div>
          </div>

          {/* Recherche mobile */}
          {showMobileSearch && (
            <div className="md:hidden mt-3 relative" ref={mobileSearchRef}>
              <form onSubmit={handleSearchSubmit}>
                <div className="relative">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyDown={handleKeyDown}
                    onFocus={() => searchResults.length > 0 && setShowResults(true)}
                    placeholder="Rechercher des produits..."
                    className="w-full pl-4 pr-14 py-3 rounded-full bg-white text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#FF8C00]"
                  />
                  <button
                    type="submit"
                    className="absolute right-2 top-1/2 -translate-y-1/2 bg-[#FF8C00] text-white p-2 rounded-full hover:bg-[#e67e00] transition"
                  >
                    <Search className={`w-5 h-5 ${isSearching ? 'animate-spin' : ''}`} />
                  </button>
                </div>
              </form>

              {/* Résultats mobile */}
              {showResults && (
                <div
                  className="absolute top-full left-0 right-0 mt-2 bg-white text-gray-800 rounded-lg shadow-2xl max-h-[400px] overflow-y-auto z-[60]"
                  style={{ touchAction: 'manipulation' }}
                >
                  {isSearching ? (
                    <div className="p-6 text-center text-gray-500">Recherche en cours...</div>
                  ) : searchResults.length > 0 ? (
                    <>
                      {searchResults.map((product, index) => (
                        <div
                          key={product.id}
                          onClick={(e) => {
                            e.preventDefault()
                            e.stopPropagation()
                            navigateToProduct(product)
                          }}
                          className={`flex items-center gap-3 p-3 hover:bg-gray-50 active:bg-gray-100 transition border-b border-gray-100 last:border-b-0 cursor-pointer ${
                            selectedIndex === index ? 'bg-blue-50' : ''
                          }`}
                        >
                          <div className="w-12 h-12 flex-shrink-0 bg-gray-100 rounded overflow-hidden">
                            {product.image ? (
                              <Image
                                src={product.image}
                                alt={product.name}
                                width={48}
                                height={48}
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center text-gray-400">
                                <Box className="w-6 h-6" />
                              </div>
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="font-semibold text-xs line-clamp-2 mb-1">{product.name}</h4>
                            <div className="text-xs">{formatPrice(product.price, product.discount_price)}</div>
                          </div>
                        </div>
                      ))}

                      <div
                        onClick={(e) => {
                          e.preventDefault()
                          e.stopPropagation()
                          navigateToSearchPage()
                        }}
                        className="p-3 text-center text-[#0036cc] hover:bg-gray-50 active:bg-gray-100 font-semibold text-xs border-t-2 border-gray-200 cursor-pointer"
                      >
                        Voir tous les résultats
                      </div>
                    </>
                  ) : searchQuery.trim() ? (
                    <div className="p-4 text-center">
                      <Search className="w-10 h-10 text-gray-300 mx-auto mb-2" />
                      <h3 className="font-bold text-sm mb-1">Aucun résultat</h3>
                      <p className="text-gray-600 text-xs mb-3">Aucun produit pour "{searchQuery}"</p>
                      <Link
                        href="/"
                        className="text-[#0036cc] hover:text-[#FF8C00] font-semibold text-xs"
                        onClick={() => {
                          setShowResults(false)
                          setShowMobileSearch(false)
                        }}
                      >
                        Retour à l'accueil
                      </Link>
                    </div>
                  ) : null}
                </div>
              )}
            </div>
          )}

          {/* Menu mobile */}
          {mobileMenuOpen && (
            <div className="md:hidden border-t border-white/20 bg-[#3b82f6]">
              <nav className="w-full max-w-[90%] mx-auto px-5 py-4 flex flex-col gap-3">
                <Link href="/collections/lucky-miners" className="py-3 border-b border-white/10 text-sm font-medium hover:text-[#f18a1d] transition">
                  Lucky Miners
                </Link>
                <Link href="/collections/bitaxe-miners" className="text-base font-semibold hover:text-[#FF8C00] transition py-2">
                  Bitaxe Miners
                </Link>
                <Link href="/battle-pass" className="text-base font-semibold hover:text-[#FF8C00] transition py-2">
                  Battle Pass
                </Link>
                <Link href="/video-guides" className="text-base font-semibold hover:text-[#FF8C00] transition py-2">
                  Video Guides
                </Link>
                <Link href="/reviews" className="text-base font-semibold hover:text-[#FF8C00] transition py-2">
                  Reviews
                </Link>
                <Link
                  href="https://pool.bitcoinmerch.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-3 border-b border-white/10 text-sm font-medium hover:text-[#f18a1d] transition"
                >
                  Pool
                </Link>
                <Link href="/support" className="py-3 border-b border-white/10 text-sm font-medium hover:text-[#f18a1d] transition">
                  Support
                </Link>

                <div className="border-t border-white/20 pt-4 mt-2">
                  <h3 className="text-white font-bold text-sm mb-3">Need help?</h3>
                  <a href="tel:8775000282" className="flex items-center gap-2 text-base hover:text-[#FF8C00] transition py-1">
                    <Phone className="w-4 h-4" />
                    8775000282
                  </a>
                  <a href="mailto:support@bitcoinmerch.com" className="flex items-center gap-2 text-base hover:text-[#FF8C00] transition py-1 mt-2">
                    <Mail className="w-4 h-4" />
                    support@bitcoinmerch.com
                  </a>
                </div>
              </nav>
            </div>
          )}
        </div>

        {/* Barre inférieure desktop */}
        <div className="bg-[#0036cc] text-white border-t border-white/10 hidden md:block">
          <div className="w-full max-w-[90%] mx-auto px-5">
            <div className="flex items-center justify-between py-4">
              <nav className="flex items-center gap-10 flex-wrap">
                <Link href="/collections/lucky-miners" className="flex items-center gap-1.5 text-base font-semibold hover:text-[#FF8C00] transition">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 640 512">
                    <path d="M274.9 34.3c-28.1-28.1-73.7-28.1-101.8 0L34.3 173.1c-28.1 28.1-28.1 73.7 0 101.8L173.1 413.7c28.1 28.1 73.7 28.1 101.8 0L413.7 274.9c28.1-28.1 28.1-73.7 0-101.8L274.9 34.3zM200 224a24 24 0 1 1 48 0 24 24 0 1 1 -48 0zM96 200a24 24 0 1 1 0 48 24 24 0 1 1 0-48zM224 376a24 24 0 1 1 0-48 24 24 0 1 1 0 48zM352 200a24 24 0 1 1 0 48 24 24 0 1 1 0-48zM224 120a24 24 0 1 1 0-48 24 24 0 1 1 0 48zm96 328c0 35.3 28.7 64 64 64H576c35.3 0 64-28.7 64-64V256c0-35.3-28.7-64-64-64H461.7c11.6 36 3.1 77-25.4 105.5L320 413.8V448zM480 328a24 24 0 1 1 0 48 24 24 0 1 1 0-48z"/>
                  </svg>
                  <span>Mineurs chanceux</span>
                </Link>
                <Link href="/collections/bitaxe-miners" className="flex items-center gap-1.5 text-base font-semibold hover:text-[#FF8C00] transition">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 512 512">
                    <path d="M176 24c0-13.3-10.7-24-24-24s-24 10.7-24 24V64c-35.3 0-64 28.7-64 64H24c-13.3 0-24 10.7-24 24s10.7 24 24 24H64v56H24c-13.3 0-24 10.7-24 24s10.7 24 24 24H64v56H24c-13.3 0-24 10.7-24 24s10.7 24 24 24H64c0 35.3 28.7 64 64 64v40c0 13.3 10.7 24 24 24s24-10.7 24-24V448h56v40c0 13.3 10.7 24 24 24s24-10.7 24-24V448h56v40c0 13.3 10.7 24 24 24s24-10.7 24-24V448c35.3 0 64-28.7 64-64h40c13.3 0 24-10.7 24-24s-10.7-24-24-24H448V280h40c13.3 0 24-10.7 24-24s-10.7-24-24-24H448V176h40c13.3 0 24-10.7 24-24s-10.7-24-24-24H448c0-35.3-28.7-64-64-64V24c0-13.3-10.7-24-24-24s-24 10.7-24 24V64H280V24c0-13.3-10.7-24-24-24s-24 10.7-24 24V64H176V24zM160 128H352c17.7 0 32 14.3 32 32V352c0 17.7-14.3 32-32 32H160c-17.7 0-32-14.3-32-32V160c0-17.7 14.3-32 32-32zm192 32H160V352H352V160z"/>
                  </svg>
                  <span>Mineurs de Bitaxe</span>
                </Link>
                <Link href="/battle-pass" className="flex items-center gap-1.5 text-base font-semibold hover:text-[#FF8C00] transition">
                  <Trophy className="w-5 h-5" />
                  <span>Passe de combat</span>
                </Link>
                <Link href="/video-guides" className="flex items-center gap-1.5 text-base font-semibold hover:text-[#FF8C00] transition">
                  <Video className="w-5 h-5" />
                  <span>Guides vidéo</span>
                </Link>
                <Link href="/reviews" className="flex items-center gap-1.5 text-base font-semibold hover:text-[#FF8C00] transition">
                  <Star className="w-5 h-5" />
                  Avis
                </Link>
                <Link
                  href="https://pool.bitcoinmerch.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-base font-semibold hover:text-[#FF8C00] transition"
                >
                  <Droplets className="w-5 h-5" />
                  Piscine
                </Link>
                <Link href="/support" className="flex items-center gap-1.5 text-base font-semibold hover:text-[#FF8C00] transition">
                  <Headphones className="w-5 h-5" />
                  Assistance
                </Link>
              </nav>

              <div className="flex items-center gap-2">
                <Image src="https://flagcdn.com/w40/us.png" alt="US" width={24} height={16} className="rounded" />
                <a href="tel:8775000282" className="text-base font-semibold hover:text-[#FF8C00] transition whitespace-nowrap">
                  (877) 500‑0282
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}