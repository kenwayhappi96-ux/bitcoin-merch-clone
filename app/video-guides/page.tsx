'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import Pagination from '@/components/Pagination'

const videoGuides = [
  // Page 1
  {
    id: 1,
    title: 'How To Set Up Your X Node Mini',
    date: '2025-11-05',
    description: '🧠 X Node Mini — Setup Guide Your personal Bitcoin Full Node, powered by UmbrelBuilt for privacy, sovereignty, and the true Bitcoin experience. 📦 W...',
    link: 'https://bitcoinmerch.com/en-eu/blogs/guides/how-to-set-up-your-x-node-mini',
    thumbnail: 'https://bitcoinmerch.com/cdn/shop/articles/Zyber_8S_Thumbnail_600x.png?v=1758673066',
  },
  {
    id: 2,
    title: 'Set Up Guide For The Gold Digger Nerd Miner',
    date: '2025-10-14',
    description: 'Bitcoin Merch® - Gold Digger Lottery NMMiner 1000KH/s Power the Gold Digger: Plug your Gold Nugget into a USB power brick or power source usin...',
    link: 'https://bitcoinmerch.com/en-eu/blogs/guides/set-up-guide-for-the-gold-digger-nerd-miner',
    thumbnail: 'https://bitcoinmerch.com/cdn/shop/articles/Golden_Nugget_Thumbnail_b52578f7-943e-4e20-84ba-19251d880827_600x.png?v=1761325510',
  },
  {
    id: 3,
    title: 'Setting Up The Zyber 8S & 8G',
    date: '2025-07-07',
    description: 'Here is the quick review and set-up video: As a first-time user, we understand that you might have some questions and concerns about how to proper...',
    link: 'https://bitcoinmerch.com/en-eu/blogs/guides/setting-up-the-zyber-8s',
    thumbnail: 'https://bitcoinmerch.com/cdn/shop/articles/SupraHex_Thumbnail_600x.png?v=1767046538',
  },
  {
    id: 4,
    title: 'Set Up Guide For The Gold Nugget Nerd Miner',
    date: '2025-06-27',
    description: 'Here is the quick review and set-up video: Bitcoin Merch® - Gold Nugget Lottery Nerd Miner NMMiner 350 KH/s Power the Gold Nugget: Plug your Go...',
    link: 'https://bitcoinmerch.com/en-eu/blogs/guides/set-up-guide-for-the-gold-nugget-nerd-miner',
    thumbnail: 'https://bitcoinmerch.com/cdn/shop/articles/NerdQaxe_Thumbnail_13f26452-cdd0-4c30-b718-0cf09977fa6b_600x.png?v=1767123289',
  },
  {
    id: 5,
    title: 'Set Up Guide For The Bitaxe SupraHex',
    date: '2025-06-27',
    description: 'Here is the quick review and set-up video: The Bitaxe SupraHex 701 4.2TH/s is a powerful, open-source Bitcoin solo home miner featuring 6 BM1368 AS...',
    link: 'https://bitcoinmerch.com/en-eu/blogs/guides/set-up-guide-for-the-bitaxe-suprahex',
    thumbnail: 'https://bitcoinmerch.com/cdn/shop/articles/Zyber_8S_Thumbnail_600x.png?v=1758673066',
  },
  {
    id: 6,
    title: 'Set Up Guide For The NerdQaxe++',
    date: '2025-06-09',
    description: 'Here is the quick review and set-up video: Just got your hands on the NerdQaxe++? Congrats! 🎉 You\'re now the proud owner of one of the most effici...',
    link: 'https://bitcoinmerch.com/en-eu/blogs/guides/set-up-guide-for-the-nerdqaxe',
    thumbnail: 'https://bitcoinmerch.com/cdn/shop/articles/Golden_Nugget_Thumbnail_b52578f7-943e-4e20-84ba-19251d880827_600x.png?v=1761325510',
  },

  // Page 2
  {
    id: 7,
    title: 'How to Set Up The Disruptor USB Solo Miner 300GH/s+',
    date: '2025-05-01',
    description: 'Here is the quick review and set-up video: Welcome to the future of Bitcoin mining! The Disruptor USB Solo Bitcoin Miner is designed to get you min...',
    link: 'https://bitcoinmerch.com/en-eu/blogs/guides/how-to-set-up-the-disruptor-usb-solo-miner-300gh-s-1',
    thumbnail: 'https://bitcoinmerch.com/cdn/shop/articles/Disruptor_Thumbnail_f53b5a80-0c27-46d9-8b50-fae76c300dfa_600x.png?v=1762535912',
  },
  {
    id: 8,
    title: 'How to Set Up Your Mein Coffee Silent USB-C Bitcoin Miner (600 GH/s)',
    date: '2025-04-29',
    description: 'Here is the quick review and set-up video: Welcome to your new favorite part of the morning: sipping coffee while mining Bitcoin silently from your...',
    link: 'https://bitcoinmerch.com/en-eu/blogs/guides/how-to-set-up-your-mein-coffee-silent-usb-c-bitcoin-miner-600-gh-s-8',
    thumbnail: 'https://bitcoinmerch.com/cdn/shop/articles/MeinCoffee_Thumbnail_600x.jpg?v=1746034223',
  },
  {
    id: 9,
    title: 'Set Up Guide For The Bitaxe HEX',
    date: '2025-03-07',
    description: 'Here is the quick review and set-up video: Are you ready to elevate your Bitcoin mining experience with the revolutionary Bitaxe Hex? This powerful...',
    link: 'https://bitcoinmerch.com/en-eu/blogs/guides/set-up-guide-for-the-bitaxe-hex',
    thumbnail: 'https://bitcoinmerch.com/cdn/shop/articles/HEX_Final_Stock_Image_600x.jpg?v=1741625284',
  },
  {
    id: 10,
    title: 'In Depth Set Up Guide For The Canaan Avalon Nano 3S',
    date: '2025-03-05',
    description: 'Welcome to our guide on unboxing and setting up the Avalon Nano 3S, a powerful and efficient Bitcoin miner. Whether you\'re new to cryptocurrency mi...',
    link: 'https://bitcoinmerch.com/en-eu/blogs/guides/in-depth-set-up-guide-for-the-canaan-avalon-nano-3s',
    thumbnail: 'https://bitcoinmerch.com/cdn/shop/articles/Avalaon_nano_3s_final_thumbnail_0fc7bad4-addc-4767-b713-98dedef1eb26_600x.jpg?v=1754509703',
  },
  {
    id: 11,
    title: 'Set Up Guide for the Canaan Avalon Mini 3',
    date: '2025-02-28',
    description: 'Here is the quick review and set-up video: Welcome to your new Canaan Avalon Mini 3, the innovative device that warms your home while mining Bitco...',
    link: 'https://bitcoinmerch.com/en-eu/blogs/guides/set-up-guide-for-the-canaan-avalon-mini-3',
    thumbnail: 'https://bitcoinmerch.com/cdn/shop/articles/Avalon_Mini_3_Thumbnail_Pic_78df81c8-b64c-4668-89bb-eabb88391872_600x.jpg?v=1741211447',
  },

  // Page 3
  {
    id: 12,
    title: 'Which Coins Can You Mine in 2025? Top Options for Profit in the Crypto Market',
    date: '2024-12-31',
    description: 'As we move into 2025, cryptocurrency mining remains a lucrative opportunity, especially for Proof of Work (PoW) coins. These coins rely on miners t...',
    link: 'https://bitcoinmerch.com/en-eu/blogs/guides/which-coins-can-you-mine-in-2025-top-options-for-profit-in-the-crypto-market',
    thumbnail: 'https://bitcoinmerch.com/cdn/shop/articles/Bitcoin_Merch_BITCOIN_WITH_BITCOIN_MINER_MACHINE_WITH_MONEY_f9d6b679-7112-46c7-857f-106202216ee9_600x.jpg?v=1735678846',
  },
  {
    id: 13,
    title: 'Master the Bitaxe Gamma: Your Complete Guide to Efficient and Effective Bitcoin Mining',
    date: '2024-10-09',
    description: 'Here is the quick review and set-up video:This guide walks you through each step to get your mining rig up and running quickly and effectively.',
    link: 'https://bitcoinmerch.com/en-eu/blogs/guides/master-the-bitaxe-gamma-your-complete-guide-to-efficient-and-effective-bitcoin-mining',
    thumbnail: 'https://bitcoinmerch.com/cdn/shop/articles/attractive_1_7001a188-3135-411f-9eb5-639219dafc0b_600x.jpg?v=1765228217',
  },
  {
    id: 14,
    title: 'Bank of America Outage: Why Cryptocurrency Payments with Bitcoin Merch Offer Stability and Control',
    date: '2024-10-02',
    description: 'Bank of America Outage: Why Cryptocurrency Payments with Bitcoin Merch Offer Stability and Control On what seems to be a disruptive day for million...',
    link: 'https://bitcoinmerch.com/en-eu/blogs/guides/bank-of-america-outage-why-cryptocurrency-payments-with-bitcoin-merch-offer-stability-and-control',
    thumbnail: 'https://bitcoinmerch.com/cdn/shop/articles/0317efff-5557-4956-8cf4-3e85b250aa9c_600x.webp?v=1727894780',
  },
  {
    id: 15,
    title: 'How to Set Up the $25 USB Nerd Miner',
    date: '2024-09-12',
    description: 'Bitcoin Merch® NerdMiner 2 - USB Solo Bitcoin Miner with WiFi Connect the USB Nerd Miner: Plug your Nerd Miner into a USB port on your computer...',
    link: 'https://bitcoinmerch.com/en-eu/blogs/guides/how-to-set-up-the-25-usb-nerd-miner',
    thumbnail: 'https://bitcoinmerch.com/cdn/shop/articles/thumbnail_5dd5ccf5-b652-42b3-88d3-47bc57c4e9b2_600x.jpg?v=1761263224',
  },
  {
    id: 16,
    title: 'How to Set Up the Canan Avalon Nano 3',
    date: '2024-08-13',
    description: 'Buy The Avalon Nano 3 Bitcoin Miner 4 TH/s + Power Supply 1. Unboxing and Initial Setup: Power Connection: Plug the power supply into an outlet....',
    link: 'https://bitcoinmerch.com/en-eu/blogs/guides/how-to-set-up-the-canan-avalon-nano-3',
    thumbnail: 'https://bitcoinmerch.com/cdn/shop/articles/Screenshot_2024-08-13_164033_600x.png?v=1723592533',
  },
  {
    id: 17,
    title: 'Major Mining Milestone: A Customer Hits the Block with Bitaxe Supra!',
    date: '2024-07-24',
    description: 'We’re thrilled to share an exciting update from our mining operations here at BitcoinMerch.com! One of our valued Bitaxe Supra customers has just h...',
    link: 'https://bitcoinmerch.com/en-eu/blogs/guides/%F0%9F%8E%89-major-mining-milestone-a-customer-hits-the-block-with-bitaxe-supra-%F0%9F%9A%80',
    thumbnail: 'https://bitcoinmerch.com/cdn/shop/articles/Untitled_design_600x.png?v=1721860294',
  },

  // Tu peux ajouter les pages 4 à 10 de la même façon (visite-les une par une et copie les infos)
  // Pour les anciennes pages, beaucoup n'ont pas de thumbnail ou pas de vidéo → tu peux laisser thumbnail vide ou utiliser un placeholder
] as const

const ITEMS_PER_PAGE = 4

export default function VideoGuidesPage() {
  const [currentPage, setCurrentPage] = useState(1)

  const totalPages = Math.ceil(videoGuides.length / ITEMS_PER_PAGE)
  const paginatedVideos = videoGuides.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  )

  return (
    <main className="min-h-screen bg-white py-12 px-6 sm:px-10 w-full overflow-hidden">
      <div className="flex flex-col gap-8 max-w-6xl mx-auto">
        <span className="text-3xl md:text-4xl font-bold text-black review">
          Guides
        </span>

        <div className="flex flex-col gap-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {paginatedVideos.map((video) => (
              <Link
                href={video.link}
                target="_blank"
                rel="noopener noreferrer"
                key={video.id}
                className="bg-white overflow-hidden cursor-pointer review group border border-gray-200 hover:border-[#fd9619]/50 transition-all duration-200"
              >
                <div className="p-4 mb-3">
                  <div className="flex flex-col gap-1 mb-3">
                    <h3 className="text-lg font-bold text-gray-800 line-clamp-2 group-hover:text-[#fd9619] transition-colors">
                      {video.title}
                    </h3>
                    <span className="text-xs text-gray-600">
                      {new Date(video.date).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                      })}
                    </span>
                  </div>
                  <p className="text-gray-600 text-sm line-clamp-3">
                    {video.description}
                  </p>
                </div>

                {video.thumbnail ? (
                  <div className="relative aspect-video overflow-hidden bg-gray-50">
                    <Image
                      src={video.thumbnail}
                      alt={video.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                      sizes="(max-width: 640px) 100vw, 50vw"
                    />
                  </div>
                ) : (
                  <div className="relative aspect-video bg-gray-200 flex items-center justify-center text-gray-500 text-sm">
                    No preview
                  </div>
                )}
              </Link>
            ))}
          </div>

          {totalPages > 1 && (
            <div className="mt-10 flex justify-center">
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
              />
            </div>
          )}
        </div>
      </div>
    </main>
  )
}