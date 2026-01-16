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
              <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden transition cursor-pointer">
                {mobileMenuOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
              </button>
              
              <Link href="/" className="shrink-0">
                <Image
                  src="/ref/logo.png"
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

              <div className="relative hidden md:flex items-center gap-2">
                <div>
                  <Link href="/login" className="text-sm opacity-80 hover:text-[#FF8C00]">
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
                    <button className="w-full bg-[#FF8C00] text-white py-2 rounded">
                      LOGIN
                    </button>
                    <p className="text-sm">
                      New customer? <span className="text-[#FF8C00]">Create your account</span>
                    </p>
                    <p className="text-sm text-gray-500">
                      Lost password? <span className="text-[#FF8C00]">Recover password</span>
                    </p>
                  </div>
                </div>
              </div>


              <div className="md:hidden relative">
                <button onClick={() => setAccountDropdown(!accountDropdown)} className="opacity-80">
                  <User className="w-6 h-6 text-[#0073e6]" />
                </button>

                <div
                  className={`absolute right-0 top-full mt-3 w-72 bg-white text-black rounded-lg shadow-xl transition-all duration-300 origin-top
                    ${accountDropdown ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"}
                  `}
                >
                  <div className="p-4 space-y-3">
                    <button className="w-full bg-[#FF8C00] text-white py-2 rounded">
                      LOGIN
                    </button>
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
                  <ShoppingCart className="w-6 h-6 text-[#0073e6]" />
                  {cartCount >= 0 && (
                    <span className="absolute -top-2 -right-2 bg-[#FF8C00] text-white text-sm font-bold rounded-full w-6 h-6 flex items-center justify-center">
                      {cartCount}
                    </span>
                  )}
                </div>
                <span className="hidden lg:block font-semibold text-lg text-[#0073e6]">Cart</span>
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
          <div className={`md:hidden mobile-menu`} aria-hidden={!mobileMenuOpen}>
            <div className="mobile-menu__inner">
              <div className="mobile-menu__panel">
                <nav className="px-6 py-6 space-y-6 text-[#0036cc]">
                  {[
                    "Lucky Miners",
                    "Bitaxe Miners",
                    "Battle Pass",
                    "Video Guides",
                    "Reviews",
                    "Pool",
                    "Support",
                  ].map((item) => (
                    <Link key={item} href="#" className="block">
                      {item}
                    </Link>
                  ))}

                  <div className="pt-6 border-t border-t-gray-300">
                    <h3 className="font-bold text-black mb-3 text-center">NEED HELP?</h3>
                    <div className='flex items-center'>
                      <svg focusable="false" className="icon icon--bi-phone " viewBox="0 0 24 24" role="presentation">
                        <g stroke-width="2" fill="none" fill-rule="evenodd" stroke-linecap="square">
                          <path d="M17 15l-3 3-8-8 3-3-5-5-3 3c0 9.941 8.059 18 18 18l3-3-5-5z" stroke="#000000"></path>
                          <path d="M14 1c4.971 0 9 4.029 9 9m-9-5c2.761 0 5 2.239 5 5" stroke="#f18a1d"></path>
                        </g>
                      </svg>
                      <span className='text-black!'>8775000282</span>
                    </div>
                    <div className='flex items-center'>
                      <svg focusable="false" className="icon icon--bi-email " viewBox="0 0 22 22" role="presentation">
                        <g fill="none" fill-rule="evenodd">
                          <path stroke="#f18a1d" d="M.916667 10.08333367l3.66666667-2.65833334v4.65849997zm20.1666667 0L17.416667 7.42500033v4.65849997z"></path>
                          <path stroke="#000000" stroke-width="2" d="M4.58333367 7.42500033L.916667 10.08333367V21.0833337h20.1666667V10.08333367L17.416667 7.42500033"></path>
                          <path stroke="#000000" stroke-width="2" d="M4.58333367 12.1000003V.916667H17.416667v11.1833333m-16.5-2.01666663L21.0833337 21.0833337m0-11.00000003L11.0000003 15.5833337"></path>
                          <path d="M8.25000033 5.50000033h5.49999997M8.25000033 9.166667h5.49999997" stroke="#f18a1d" stroke-width="2" stroke-linecap="square"></path>
                        </g>
                      </svg>
                      <a href="mailto:support@bitcoinmerch.com" target="_blank" rel="noopener" aria-describedby="a11y-new-window-message">support@bitcoinmerch.com</a>
                    </div>
                  </div>

                  <div className="pt-6 border-t border-t-gray-300 mb-4">
                    <h3 className="font-bold text-black mb-3 text-center">FOLLOW US</h3>
                    <div className="flex flex-col gap-4">
                      {
                        links.map((item)=>(
                          <Link key={item.name} href={item.link} className='flex gap-2 items-center'>
                            <item.icon/>
                            <span>{item.name}</span>
                          </Link>
                        ))
                      }
                    </div>
                  </div>
                </nav>
              </div>
            </div>
          </div>
      </div>

      {/* Bottom Menu - Disparait au scroll */}
      <div className="bg-[#0036cc] text-white border-t border-white/10 hidden md:block">
        <div className="w-full max-w-[90%] mx-auto px-5">
          <div className="flex items-center justify-between py-4">
            <nav className="flex items-center gap-10 flex-wrap">
              <Link href="/collections/lucky-miners" className="flex items-center gap-1.5 text-base font-semibold hover:text-[#FF8C00] transition">
                <Pickaxe className="w-5 h-5 flex-shrink-0" />
                <div className="flex flex-col leading-tight">
                  <span>Mineurs chanceux</span>
                </div>
              </Link>
              <Link href="/collections/bitaxe-miners" className="flex items-center gap-1.5 text-base font-semibold hover:text-[#FF8C00] transition">
                <Box className="w-5 h-5 flex-shrink-0" />
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
