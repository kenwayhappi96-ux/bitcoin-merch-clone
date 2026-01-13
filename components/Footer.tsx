'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Facebook, Twitter, Instagram, Youtube, Mail } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-gray-300 text-gray-800">
      {/* Main Footer */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-12 justify-between">
          {/* Our Mission Statement + Copyright */}
          <div className="lg:col-span-2 flex flex-col">
            <div className="flex-grow">
              <h3 className="text-gray-900 font-bold text-2xl mb-4">NOTRE ÉNONCÉ DE MISSION</h3>
              <p className="text-base leading-relaxed mb-6">
                BitcoinMerch.com a pour mission de rendre le minage de cryptomonnaies accessible à tous en proposant des équipements abordables et économes en énergie pour chaque foyer. Nous avons pour objectif d'informer les utilisateurs sur les technologies de minage et de relever les défis du secteur, tels que la pénurie de matériel et les coûts élevés, afin de permettre à un plus grand nombre de personnes de participer au minage de cryptomonnaies.
              </p>
            </div>
          </div>

          {/* Quick Links + Follow Us */}
          <div className="lg:col-span-1">
            <h3 className="text-gray-900 font-bold text-2xl mb-4">QUICK LINKS</h3>
            <ul className="space-y-2 text-base mb-6">
              <li><Link href="/guides" className="hover:text-gray-900 transition">Guides</Link></li>
              <li><Link href="/press" className="hover:text-gray-900 transition">Press</Link></li>
              <li><Link href="/search" className="hover:text-gray-900 transition">Search</Link></li>
              <li><Link href="/affiliate" className="hover:text-gray-900 transition">Join Affiliate Program</Link></li>
              <li><Link href="/about" className="hover:text-gray-900 transition">About Us</Link></li>
              <li><Link href="/contact" className="hover:text-gray-900 transition">Contact Us</Link></li>
              <li><Link href="/rewards" className="hover:text-gray-900 transition">Rewards</Link></li>
            </ul>
          </div>

          {/* Information + We Accept */}
          <div className="lg:col-span-1">
            <h3 className="text-gray-900 font-bold text-2xl mb-4">INFORMATION</h3>
            <ul className="space-y-2 text-base mb-6">
              <li><Link href="/privacy" className="hover:text-gray-900 transition">Privacy Policy</Link></li>
              <li><Link href="/refund" className="hover:text-gray-900 transition">Refund Policy</Link></li>
              <li><Link href="/terms" className="hover:text-gray-900 transition">Terms of Service</Link></li>
              <li><Link href="/refurbished" className="hover:text-gray-900 transition">Refurbished Mining Equipment</Link></li>
              <li><Link href="/partners" className="hover:text-gray-900 transition">Partners</Link></li>
              <li><Link href="/team" className="hover:text-gray-900 transition">Bitcoin Merch Team</Link></li>
              <li><Link href="/white-label" className="hover:text-gray-900 transition">Start Selling Lottery Miners</Link></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="lg:col-span-2">
            <h3 className="text-gray-900 font-bold text-2xl mb-4">NEWSLETTER</h3>
            <p className="text-base mb-4">Subscribe to receive updates, access to exclusive deals, and more.</p>
            <div className="space-y-3">
              <input
                type="email"
                placeholder="Your email"
                className="w-full px-4 py-3 rounded bg-gray-400 text-gray-900 placeholder-gray-700 focus:outline-none focus:ring-2 focus:ring-[#FF8C00]"
              />
              <button
                type="button"
                className="bg-[#FF8C00] text-white px-8 py-3 rounded font-semibold hover:bg-[#ff9d1f] transition"
              >
                SUBSCRIBE
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Section - Copyright, Follow Us, We Accept */}
        <div className="mt-12 pt-8">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-start gap-6">
            <p className="text-base text-gray-700">
              © 2026 Bitcoin Merch | 21620 Lassen St, Chatsworth, CA 91311, États-Unis
            </p>
            
            <div>
              <h4 className="text-gray-900 font-bold text-base mb-2">Suivez-nous</h4>
              <div className="flex gap-3">
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="bg-gray-400 p-2 rounded hover:bg-[#FF8C00] transition">
                  <Facebook className="w-5 h-5" />
                </a>
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="bg-gray-400 p-2 rounded hover:bg-[#FF8C00] transition">
                  <Twitter className="w-5 h-5" />
                </a>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="bg-gray-400 p-2 rounded hover:bg-[#FF8C00] transition">
                  <Instagram className="w-5 h-5" />
                </a>
                <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="bg-gray-400 p-2 rounded hover:bg-[#FF8C00] transition">
                  <Youtube className="w-5 h-5" />
                </a>
              </div>
            </div>

            <div>
              <h4 className="text-gray-900 font-bold text-base mb-2">Nous acceptons</h4>
              <div className="flex gap-2">
                <div className="bg-gray-400 px-3 py-1 rounded text-sm text-gray-900">Bitcoin</div>
                <div className="bg-gray-400 px-3 py-1 rounded text-sm text-gray-900">Ethereum</div>
                <div className="bg-gray-400 px-3 py-1 rounded text-sm text-gray-900">PayPal</div>
                <div className="bg-gray-400 px-3 py-1 rounded text-sm text-gray-900">Visa</div>
                <div className="bg-gray-400 px-3 py-1 rounded text-sm text-gray-900">Mastercard</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
