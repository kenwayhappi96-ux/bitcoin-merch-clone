import { Video, Play, Clock } from 'lucide-react'
import Image from 'next/image'

const videoGuides = [
  {
    id: 1,
    title: 'Setting Up Your Lucky Miner - Complete Guide',
    description: 'Learn how to unbox, connect, and configure your Lucky Miner for solo Bitcoin mining.',
    duration: '12:45',
    thumbnail: 'https://via.placeholder.com/640x360/3b82f6/ffffff?text=Lucky+Miner+Setup',
    category: 'Getting Started'
  },
  {
    id: 2,
    title: 'Bitaxe Configuration Tutorial',
    description: 'Step-by-step guide to setting up WiFi, connecting to pools, and monitoring your Bitaxe miner.',
    duration: '18:30',
    thumbnail: 'https://via.placeholder.com/640x360/ef4444/ffffff?text=Bitaxe+Config',
    category: 'Setup'
  },
  {
    id: 3,
    title: 'Understanding Bitcoin Mining Pools',
    description: 'Learn the difference between pool mining and solo mining, and which is right for you.',
    duration: '9:15',
    thumbnail: 'https://via.placeholder.com/640x360/10b981/ffffff?text=Mining+Pools',
    category: 'Education'
  },
  {
    id: 4,
    title: 'Optimizing Your Mining Setup for Maximum Efficiency',
    description: 'Tips and tricks to reduce power consumption and increase hashrate performance.',
    duration: '15:20',
    thumbnail: 'https://via.placeholder.com/640x360/FF8C00/ffffff?text=Optimization',
    category: 'Advanced'
  },
  {
    id: 5,
    title: 'Cooling Solutions for Home Mining',
    description: 'Best practices for keeping your miners cool and running efficiently.',
    duration: '10:55',
    thumbnail: 'https://via.placeholder.com/640x360/06b6d4/ffffff?text=Cooling',
    category: 'Maintenance'
  },
  {
    id: 6,
    title: 'Troubleshooting Common Mining Issues',
    description: 'How to diagnose and fix the most common problems miners face.',
    duration: '14:40',
    thumbnail: 'https://via.placeholder.com/640x360/8b5cf6/ffffff?text=Troubleshooting',
    category: 'Support'
  }
]

export default function VideoGuidesPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-[#3b82f6] to-[#2563eb] text-white py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-3 mb-4">
            <Video className="w-12 h-12" />
            <h1 className="text-4xl md:text-5xl font-bold">Video Guides</h1>
          </div>
          <p className="text-xl text-blue-100 max-w-3xl">
            Learn everything about Bitcoin mining with our comprehensive video tutorials. 
            From beginner basics to advanced optimization techniques.
          </p>
        </div>
      </div>

      <section className="py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Browse by Category</h2>
            <div className="flex flex-wrap gap-3">
              {['All', 'Getting Started', 'Setup', 'Education', 'Advanced', 'Maintenance', 'Support'].map((category) => (
                <button
                  key={category}
                  className="px-4 py-2 rounded-full bg-white text-gray-700 font-semibold hover:bg-[#3b82f6] hover:text-white transition shadow-sm"
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {videoGuides.map((video) => (
              <div key={video.id} className="bg-white rounded-lg shadow-md hover:shadow-xl transition overflow-hidden group cursor-pointer">
                <div className="relative aspect-video">
                  <Image
                    src={video.thumbnail}
                    alt={video.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center group-hover:bg-black/60 transition">
                    <div className="bg-white/90 rounded-full p-4 group-hover:scale-110 transition">
                      <Play className="w-8 h-8 text-[#3b82f6]" />
                    </div>
                  </div>
                  <div className="absolute bottom-2 right-2 bg-black/80 text-white px-2 py-1 rounded text-sm flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {video.duration}
                  </div>
                </div>
                <div className="p-4">
                  <div className="text-xs font-semibold text-[#3b82f6] mb-2">{video.category}</div>
                  <h3 className="text-lg font-bold text-gray-800 mb-2 line-clamp-2">{video.title}</h3>
                  <p className="text-gray-600 text-sm line-clamp-2">{video.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-4 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Need Personalized Help?</h2>
          <p className="text-lg text-gray-600 mb-8">
            Battle Pass members get exclusive access to live 1-on-1 video support sessions
          </p>
          <button className="bg-[#FF8C00] text-white px-8 py-4 rounded-lg text-lg font-bold hover:bg-[#ff9d1f] transition">
            Upgrade to Battle Pass
          </button>
        </div>
      </section>
    </main>
  )
}
