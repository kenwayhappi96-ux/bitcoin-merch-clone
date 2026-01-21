'use client'

import { ShoppingCart, User, ChevronDown, Search, Menu, X, Pickaxe, Box, Trophy, Video, Star, Droplets, Headphones, Phone, Mail, Facebook, Twitter, Instagram, Youtube } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { openCart } from '@/store/cartSlice'
import { links, nav_link } from '@/lib/constants'

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
      <div className="sticky top-0 z-50 bg-[#0036cc] text-white shadow-lg border-b border-white/20">
        <div className="w-full max-w-[90%] mx-auto px-5 py-4">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="block lg:hidden transition cursor-pointer">
                {mobileMenuOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
              </button>
              
              <Link href="/" className="flex-shrink-0">
                <Image 
                  //src="/ref/logo.png" 
                  src="https://cdn.shopify.com/s/files/1/2609/9556/files/bitcoin-merch-logoeu_150x@2x.png?v=1767374567" 
                  alt="Bitcoin Merch" 
                  width={200}
                  height={60}
                  className="h-10 sm:h-12 md:h-14 lg:h-16 w-auto object-contain"
                />
              </Link>
            </div>

            <form
              onSubmit={handleSearch}
              className="flex-1 hidden md:block"
            >
              <div className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search..."
                  className="w-full pl-5 pr-16 py-3 bg-white text-black rounded-md focus:ring-2 focus:ring-[#FF8C00]"
                />
                <button
                  type="submit"
                  className="absolute right-0 top-0 h-full px-4 bg-[#FF8C00] rounded-r-md flex items-center justify-center"
                >
                  <Search className="w-5 h-5 text-white" />
                </button>
              </div>
            </form>

            <div className="flex items-center gap-4">
              <button onClick={() => setShowMobileSearch(!showMobileSearch)} className="md:hidden cursor-pointer">
                <Search className="w-6 h-6 text-[#0073e6]" />
              </button>

              <div className="relative hidden lg:flex items-center gap-2">
                <div>
                  <Link href="/login" className="text-sm text-white! hover:text-[#FF8C00]">
                    Login / Signup
                  </Link>

                  <button
                    onClick={() => setAccountDropdown(!accountDropdown)}
                    className="flex items-center gap-1 font-semibold"
                  >
                    My account
                    <ChevronDown className="w-4 h-4" />
                  </button>
                </div>

                {/* Dropdown */}
                <div
                  className={`absolute right-0 top-full mt-3 w-72 bg-white text-black rounded-lg shadow-xl transition-all duration-300 origin-top
                    ${accountDropdown ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"}
                  `}
                >
                  <div className="p-4 space-y-3">
                    <div className="w-full! bg-[#FF8C00] text-white! uppercase py-2 rounded text-center">
                      <Link href={'/login'} className="text-white!">
                        LOGIN
                      </Link>
                    </div>
                    <p className="text-sm">
                      New customer? <span className="text-[#FF8C00]">Create your account</span>
                    </p>
                    <p className="text-sm text-gray-500">
                      Lost password? <span className="text-[#FF8C00]">Recover password</span>
                    </p>
                  </div>
                </div>
              </div>


              <div className="lg:hidden relative">
                <button onClick={() => setAccountDropdown(!accountDropdown)} className="text-white">
                  <User className="w-7 h-7 text-white" />
                </button>

                <div
                  className={`absolute right-0 top-full mt-3 w-72 bg-white text-black rounded-lg shadow-xl transition-all duration-300 origin-top
                    ${accountDropdown ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"}
                  `}
                >
                  <div className="p-4 space-y-3">
                    <div className="w-full! bg-[#FF8C00] text-white! uppercase py-2 rounded text-center">
                      <Link href={'/login'} className="text-white!">
                        LOGIN
                      </Link>
                    </div>
                    <p className="text-sm">
                      New customer? <span className="text-[#FF8C00]">Create your account</span>
                    </p>
                    <p className="text-sm text-gray-500">
                      Lost password? <span className="text-[#FF8C00]">Recover password</span>
                    </p>
                  </div>
                </div>
              </div>

              <button onClick={() => dispatch(openCart())} className="flex items-center gap-2">
                <div className="relative">
                  <ShoppingCart className="w-7 h-7 text-white" />
                  {cartCount >= 0 && (
                    <span className="absolute -top-2 -right-2 bg-[#FF8C00] text-white text-sm font-bold rounded-full w-5 h-5 flex items-center justify-center">
                      {cartCount}
                    </span>
                  )}
                </div>
                <span className="hidden lg:block text-md text-white">Cart</span>
              </button>
            </div>
          </div>

          {showMobileSearch && (
             <form
              onSubmit={handleSearch}
              className="md:hidden mt-3"
            >
              <div className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search..."
                  className="w-full pl-5 pr-16 py-3 bg-white text-black rounded-md focus:ring-2 focus:ring-[#FF8C00]"
                />
                <button
                  type="submit"
                  className="absolute right-0 top-0 h-full px-4 bg-[#FF8C00] rounded-r-md flex items-center justify-center"
                >
                  <Search className="w-5 h-5 text-white" />
                </button>
              </div>
            </form>
          )}
        </div>

        {/* Mobile Menu - À l'intérieur de la section sticky */}
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
              <Link href="/pool" className="py-3 border-b border-white/10 text-sm font-medium hover:text-[#f18a1d] transition">
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
      </div>

      {/* Bottom Menu - Disparait au scroll */}
      <div className="bg-[#0036cc] text-white border-t border-white/10 hidden md:block">
        <div className="w-full max-w-[90%] mx-auto px-5">
          <div className="flex items-center justify-between py-4">
            <nav className="flex items-center gap-10 flex-wrap">
              <Link href="/collections/lucky-miners" className="flex items-center gap-1.5 text-base font-semibold hover:text-[#FF8C00] transition">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 640 512">
                    <path d="M274.9 34.3c-28.1-28.1-73.7-28.1-101.8 0L34.3 173.1c-28.1 28.1-28.1 73.7 0 101.8L173.1 413.7c28.1 28.1 73.7 28.1 101.8 0L413.7 274.9c28.1-28.1 28.1-73.7 0-101.8L274.9 34.3zM200 224a24 24 0 1 1 48 0 24 24 0 1 1 -48 0zM96 200a24 24 0 1 1 0 48 24 24 0 1 1 0-48zM224 376a24 24 0 1 1 0-48 24 24 0 1 1 0 48zM352 200a24 24 0 1 1 0 48 24 24 0 1 1 0-48zM224 120a24 24 0 1 1 0-48 24 24 0 1 1 0 48zm96 328c0 35.3 28.7 64 64 64H576c35.3 0 64-28.7 64-64V256c0-35.3-28.7-64-64-64H461.7c11.6 36 3.1 77-25.4 105.5L320 413.8V448zM480 328a24 24 0 1 1 0 48 24 24 0 1 1 0-48z"/>
                  </svg>
                <div className="flex flex-col leading-tight">
                  <span>Mineurs chanceux</span>
                </div>
              </Link>
              <Link href="/collections/bitaxe-miners" className="flex items-center gap-1.5 text-base font-semibold hover:text-[#FF8C00] transition">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 512 512">
                    <path d="M176 24c0-13.3-10.7-24-24-24s-24 10.7-24 24V64c-35.3 0-64 28.7-64 64H24c-13.3 0-24 10.7-24 24s10.7 24 24 24H64v56H24c-13.3 0-24 10.7-24 24s10.7 24 24 24H64v56H24c-13.3 0-24 10.7-24 24s10.7 24 24 24H64c0 35.3 28.7 64 64 64v40c0 13.3 10.7 24 24 24s24-10.7 24-24V448h56v40c0 13.3 10.7 24 24 24s24-10.7 24-24V448h56v40c0 13.3 10.7 24 24 24s24-10.7 24-24V448c35.3 0 64-28.7 64-64h40c13.3 0 24-10.7 24-24s-10.7-24-24-24H448V280h40c13.3 0 24-10.7 24-24s-10.7-24-24-24H448V176h40c13.3 0 24-10.7 24-24s-10.7-24-24-24H448c0-35.3-28.7-64-64-64V24c0-13.3-10.7-24-24-24s-24 10.7-24 24V64H280V24c0-13.3-10.7-24-24-24s-24 10.7-24 24V64H176V24zM160 128H352c17.7 0 32 14.3 32 32V352c0 17.7-14.3 32-32 32H160c-17.7 0-32-14.3-32-32V160c0-17.7 14.3-32 32-32zm192 32H160V352H352V160z"/>
                  </svg>
                <div className="flex flex-col leading-tight">
                  <span>Mineurs de Bitaxe</span>
                </div>
              </Link>
              <Link href="/battle-pass" className="flex items-center gap-1.5 text-base font-semibold hover:text-[#FF8C00] transition">
                <Trophy className="w-5 h-5 flex-shrink-0" />
                <div className="flex flex-col leading-tight">
                  <span>Passe de combat</span>
                </div>
              </Link>
              <Link href="/video-guides" className="flex items-center gap-1.5 text-base font-semibold hover:text-[#FF8C00] transition">
                <Video className="w-5 h-5 flex-shrink-0" />
                <div className="flex flex-col leading-tight">
                  <span>Guides vidéo</span>
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

            <a href="tel:8775000282" className="flex items-center gap-2 text-white! bg-black/10 rounded-2xl p-2 overflow-hidden">
              <Image 
                src="https://flagcdn.com/w40/us.png" 
                alt="US" 
                width={24}
                height={16}
                className="rounded"
              />
              <span  className="text-base font-semibold transition whitespace-nowrap">
                (877) 500‑0282
              </span>

              {/* Currency & Language Selector - Combined */}
              {/* <div className="relative hidden sm:block">
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
                    {/* Language Section 
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

                    {/* Currency Section 
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
              </div>*/}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
