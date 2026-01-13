'use client'

import { ShoppingCart, User, ChevronDown, Search, Menu, X, Pickaxe, Box, Trophy, Video, Star, Droplets, Headphones, Phone, Mail, Facebook, Twitter, Instagram, Youtube } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { openCart } from '@/store/cartSlice'

export default function Header() {
  const dispatch = useAppDispatch()
  const cartItems = useAppSelector((state) => state.cart.items)
  const [accountDropdown, setAccountDropdown] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [isSearching, setIsSearching] = useState(false)
  const [showMobileSearch, setShowMobileSearch] = useState(false)
  const [currency, setCurrency] = useState('EUR')
  const [language, setLanguage] = useState('English')
  const [settingsDropdown, setSettingsDropdown] = useState(false)

  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0)

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      setIsSearching(true)
      setTimeout(() => setIsSearching(false), 1000)
    }
  }

  return (
    <>
      {/* Top Section - Sticky (reste visible) */}
      <div className="sticky top-0 z-50 bg-[#3b82f6] text-white shadow-lg border-b border-white/20">
        <div className="w-full max-w-[90%] mx-auto px-5 py-4">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden hover:text-[#FF8C00] transition">
                {mobileMenuOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
              </button>
              
              <Link href="/" className="flex-shrink-0">
                <Image 
                  src="/ref/logo.png" 
                  alt="Bitcoin Merch" 
                  width={200}
                  height={60}
                  className="h-20 w-auto"
                />
              </Link>
            </div>

            <form onSubmit={handleSearch} className="flex-1 max-w-4xl mx-6 hidden md:block">
              <div className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search products..."
                  className="w-full pl-5 pr-14 py-3 bg-white text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#FF8C00] text-lg"
                />
                <button type="submit" className={`absolute right-2 top-1/2 -translate-y-1/2 bg-[#FF8C00] text-white p-2.5 hover:bg-[#ff9d1f] transition ${isSearching ? 'animate-spin' : ''}`}>
                  <Search className="w-5 h-5" />
                </button>
              </div>
            </form>

            <div className="flex items-center gap-4">
              <button onClick={() => setShowMobileSearch(!showMobileSearch)} className="md:hidden hover:text-[#FF8C00] transition">
                <Search className="w-6 h-6" />
              </button>

              <div className="relative hidden md:block">
                <div className="flex items-center gap-2">
                  <User className="w-6 h-6" />
                  <div className="flex flex-col items-start leading-tight">
                    <Link href="/login" target="_blank" className="text-gray-200 text-sm hover:text-[#FF8C00] transition">
                      Login / Signup
                    </Link>
                    <button onClick={() => setAccountDropdown(!accountDropdown)} className="font-semibold text-base hover:text-[#FF8C00] transition flex items-center gap-1">
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
                        <Link href="/login" target="_blank" className="block w-full bg-[#3b82f6] text-white py-2 rounded-lg font-semibold hover:bg-[#2563eb] transition text-center">
                          Login
                        </Link>
                      </div>
                      <div className="border-t pt-3">
                        <Link href="/login" target="_blank" className="text-sm text-[#3b82f6] hover:underline block mb-2">
                          New customer? Create your account
                        </Link>
                        <Link href="/login" target="_blank" className="text-sm text-gray-600 hover:underline block">
                          Lost password? Recover password
                        </Link>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div className="md:hidden relative">
                <button onClick={() => setAccountDropdown(!accountDropdown)} className="hover:text-[#FF8C00] transition">
                  <User className="w-6 h-6" />
                </button>

                {accountDropdown && (
                  <div className="absolute right-0 mt-2 w-64 bg-white text-gray-800 rounded-lg shadow-xl py-4 px-6">
                    <div className="space-y-3">
                      <div>
                        <p className="font-semibold mb-2">Login / Signup</p>
                        <p className="text-sm text-gray-600 mb-3">My account</p>
                        <Link href="/login" target="_blank" className="block w-full bg-[#3b82f6] text-white py-2 rounded-lg font-semibold hover:bg-[#2563eb] transition text-center">
                          Login
                        </Link>
                      </div>
                      <div className="border-t pt-3">
                        <Link href="/login" target="_blank" className="text-sm text-[#3b82f6] hover:underline block mb-2">
                          New customer? Create your account
                        </Link>
                        <Link href="/login" target="_blank" className="text-sm text-gray-600 hover:underline block">
                          Lost password? Recover password
                        </Link>
                      </div>
                    </div>
                  </div>
                )}
              </div>

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

          {showMobileSearch && (
            <form onSubmit={handleSearch} className="md:hidden mt-3">
              <div className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search products..."
                  className="w-full pl-4 pr-14 py-3 rounded-full bg-white text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#FF8C00]"
                />
                <button type="submit" className={`absolute right-2 top-1/2 -translate-y-1/2 bg-[#FF8C00] text-white p-2 rounded-full ${isSearching ? 'animate-spin' : ''}`}>
                  <Search className="w-5 h-5" />
                </button>
              </div>
            </form>
          )}
        </div>

        {/* Mobile Menu - À l'intérieur de la section sticky */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-white/20 bg-[#3b82f6]">
            <nav className="w-full max-w-[90%] mx-auto px-5 py-4 flex flex-col gap-3">
              <Link href="/collections/lucky-miners" className="text-base font-semibold hover:text-[#FF8C00] transition py-2">
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
              <Link href="/pool" className="text-base font-semibold hover:text-[#FF8C00] transition py-2">
                Pool
              </Link>
              <Link href="/support" className="text-base font-semibold hover:text-[#FF8C00] transition py-2">
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

              <div className="border-t border-white/20 pt-4 mt-2">
                <h3 className="text-white font-bold text-sm mb-3">Follow Us</h3>
                <div className="flex gap-3">
                  <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="bg-white/10 p-2 rounded hover:bg-[#FF8C00] transition">
                    <Facebook className="w-5 h-5" />
                  </a>
                  <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="bg-white/10 p-2 rounded hover:bg-[#FF8C00] transition">
                    <Twitter className="w-5 h-5" />
                  </a>
                  <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="bg-white/10 p-2 rounded hover:bg-[#FF8C00] transition">
                    <Instagram className="w-5 h-5" />
                  </a>
                  <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="bg-white/10 p-2 rounded hover:bg-[#FF8C00] transition">
                    <Youtube className="w-5 h-5" />
                  </a>
                  <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer" className="bg-white/10 p-2 rounded hover:bg-[#FF8C00] transition">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-1-.05A6.33 6.33 0 005 20.1a6.34 6.34 0 0010.86-4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1-.1z"/>
                    </svg>
                  </a>
                </div>
              </div>
            </nav>
          </div>
        )}
      </div>

      {/* Bottom Menu - Disparait au scroll */}
      <div className="bg-[#3b82f6] text-white border-t border-white/10 hidden md:block">
        <div className="w-full max-w-[90%] mx-auto px-5">
          <div className="flex items-center justify-between py-4">
            <nav className="flex items-center gap-10 flex-wrap">
              <Link href="/collections/lucky-miners" className="flex items-center gap-1.5 text-base font-semibold hover:text-[#FF8C00] transition">
                <Pickaxe className="w-5 h-5 flex-shrink-0" />
                <div className="flex flex-col leading-tight">
                  <span>Mineurs</span>
                  <span>chanceux</span>
                </div>
              </Link>
              <Link href="/collections/bitaxe-miners" className="flex items-center gap-1.5 text-base font-semibold hover:text-[#FF8C00] transition">
                <Box className="w-5 h-5 flex-shrink-0" />
                <div className="flex flex-col leading-tight">
                  <span>Mineurs de</span>
                  <span>Bitaxe</span>
                </div>
              </Link>
              <Link href="/battle-pass" className="flex items-center gap-1.5 text-base font-semibold hover:text-[#FF8C00] transition">
                <Trophy className="w-5 h-5 flex-shrink-0" />
                <div className="flex flex-col leading-tight">
                  <span>Passe de</span>
                  <span>combat</span>
                </div>
              </Link>
              <Link href="/video-guides" className="flex items-center gap-1.5 text-base font-semibold hover:text-[#FF8C00] transition">
                <Video className="w-5 h-5 flex-shrink-0" />
                <div className="flex flex-col leading-tight">
                  <span>Guides</span>
                  <span>vidéo</span>
                </div>
              </Link>
              <Link href="/reviews" className="flex items-center gap-1.5 text-base font-semibold hover:text-[#FF8C00] transition whitespace-nowrap">
                <Star className="w-5 h-5 flex-shrink-0" />
                Avis
              </Link>
              <Link href="/pool" className="flex items-center gap-1.5 text-base font-semibold hover:text-[#FF8C00] transition whitespace-nowrap">
                <Droplets className="w-5 h-5 flex-shrink-0" />
                Piscine
              </Link>
              <Link href="/support" className="flex items-center gap-1.5 text-base font-semibold hover:text-[#FF8C00] transition whitespace-nowrap">
                <Headphones className="w-5 h-5 flex-shrink-0" />
                Assistance
              </Link>
            </nav>

            <div className="flex items-center gap-2">
              <Image 
                src="https://flagcdn.com/w40/us.png" 
                alt="US" 
                width={24}
                height={16}
                className="rounded"
              />
              <a href="tel:8775000282" className="text-base font-semibold hover:text-[#FF8C00] transition whitespace-nowrap">
                (877) 500‑0282
              </a>

              {/* Currency & Language Selector - Combined */}
              <div className="relative hidden sm:block">
                <button 
                  onClick={() => setSettingsDropdown(!settingsDropdown)}
                  className="flex items-center gap-2 text-base font-semibold hover:text-[#FF8C00] transition px-3 py-2 rounded hover:bg-white/10"
                >
                  <span>{currency}</span>
                  <span className="text-base">|</span>
                  <span>{language}</span>
                  <Image 
                    src="https://flagcdn.com/w40/gb.png" 
                    alt="Language" 
                    width={24}
                    height={16}
                    className="rounded"
                  />
                  <ChevronDown className="w-4 h-4" />
                </button>
                
                {settingsDropdown && (
                  <div className="absolute right-0 mt-2 w-56 bg-white text-gray-800 rounded-lg shadow-xl py-4 z-50">
                    {/* Language Section */}
                    <div className="px-4 py-2 border-b">
                      <p className="text-sm font-semibold text-gray-600 mb-2">Language</p>
                      <button
                        onClick={() => {
                          setLanguage('English')
                        }}
                        className="w-full text-left px-3 py-2 hover:bg-[#3b82f6] hover:text-white transition flex items-center gap-2 rounded mb-1"
                      >
                        <Image 
                          src="https://flagcdn.com/w40/gb.png" 
                          alt="English" 
                          width={20}
                          height={14}
                          className="rounded"
                        />
                        English
                      </button>
                      <button
                        onClick={() => {
                          setLanguage('Français')
                        }}
                        className="w-full text-left px-3 py-2 hover:bg-[#3b82f6] hover:text-white transition flex items-center gap-2 rounded"
                      >
                        <Image 
                          src="https://flagcdn.com/w40/fr.png" 
                          alt="Français" 
                          width={20}
                          height={14}
                          className="rounded"
                        />
                        Français
                      </button>
                    </div>

                    {/* Currency Section */}
                    <div className="px-4 py-2">
                      <p className="text-sm font-semibold text-gray-600 mb-2">Currency</p>
                      <button
                        onClick={() => {
                          setCurrency('EUR')
                        }}
                        className="w-full text-left px-3 py-2 hover:bg-[#3b82f6] hover:text-white transition rounded mb-1"
                      >
                        <span className="font-semibold">€ EUR</span>
                      </button>
                      <button
                        onClick={() => {
                          setCurrency('USD')
                        }}
                        className="w-full text-left px-3 py-2 hover:bg-[#3b82f6] hover:text-white transition rounded"
                      >
                        <span className="font-semibold">$ USD</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
