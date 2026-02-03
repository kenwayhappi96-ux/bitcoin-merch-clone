'use client'

import { Droplets, TrendingUp, Users, Zap, Cpu, AlertCircle } from 'lucide-react'

export default function PoolPage() {
  return (
    <main className="min-h-screen bg-[#121212] text-white">
      {/* Bannière principale - dégradé vert comme le site officiel */}
      <div className="bg-gradient-to-r from-[#10b981] to-[#059669] py-24 px-4 md:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex justify-center mb-8">
            <Droplets className="w-24 h-24 text-white opacity-90" />
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold mb-6 tracking-tight">
            Bitcoin Merch Lucky Pool
          </h1>
          <p className="text-2xl md:text-3xl mb-10 text-green-100 font-medium">
            Join the community pool with <span className="font-bold">0% fees</span> for Battle Pass members
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <button className="bg-white text-[#059669] px-10 py-5 rounded-xl text-xl font-bold hover:bg-gray-100 transition shadow-2xl transform hover:scale-105">
              Connect Your Miner
            </button>
            <button className="border-2 border-white text-white px-10 py-5 rounded-xl text-xl font-bold hover:bg-white/10 transition">
              View Pool Stats
            </button>
          </div>
        </div>
      </div>

      {/* Stats - mode sombre */}
      <section className="py-20 px-4 md:px-8 bg-[#1e1e1e]">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-[#2a2a2a] p-8 rounded-xl text-center border border-[#333]">
              <div className="text-4xl font-bold text-[#10b981] mb-3">2.4 EH/s</div>
              <div className="text-gray-400 text-lg">Total Hashrate</div>
            </div>
            <div className="bg-[#2a2a2a] p-8 rounded-xl text-center border border-[#333]">
              <div className="text-4xl font-bold text-[#10b981] mb-3">1,247</div>
              <div className="text-gray-400 text-lg">Active Miners</div>
            </div>
            <div className="bg-[#2a2a2a] p-8 rounded-xl text-center border border-[#333]">
              <div className="text-4xl font-bold text-[#10b981] mb-3">47</div>
              <div className="text-gray-400 text-lg">Blocks Found (30d)</div>
            </div>
            <div className="bg-[#2a2a2a] p-8 rounded-xl text-center border border-[#333]">
              <div className="text-4xl font-bold text-[#10b981] mb-3">99.8%</div>
              <div className="text-gray-400 text-lg">Uptime</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features - cartes sombres */}
      <section className="py-20 px-4 md:px-8 bg-[#121212]">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-5xl font-bold text-center mb-16">Pool Features</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-[#1e1e1e] p-10 rounded-2xl border border-[#333] hover:border-[#10b981] transition-all duration-300">
              <div className="flex justify-center mb-6">
                <div className="bg-[#10b981]/20 p-5 rounded-full">
                  <Zap className="w-12 h-12 text-[#10b981]" />
                </div>
              </div>
              <h3 className="text-3xl font-bold text-center mb-4">Low Fees</h3>
              <p className="text-gray-300 text-center text-lg">
                Only 1% pool fee for standard members.<br />
                <strong className="text-[#10b981]">0% fees</strong> for Battle Pass subscribers!
              </p>
            </div>

            <div className="bg-[#1e1e1e] p-10 rounded-2xl border border-[#333] hover:border-[#10b981] transition-all duration-300">
              <div className="flex justify-center mb-6">
                <div className="bg-[#10b981]/20 p-5 rounded-full">
                  <TrendingUp className="w-12 h-12 text-[#10b981]" />
                </div>
              </div>
              <h3 className="text-3xl font-bold text-center mb-4">Daily Payouts</h3>
              <p className="text-gray-300 text-center text-lg">
                Automatic daily payouts with low minimum threshold of 0.001 BTC.
              </p>
            </div>

            <div className="bg-[#1e1e1e] p-10 rounded-2xl border border-[#333] hover:border-[#10b981] transition-all duration-300">
              <div className="flex justify-center mb-6">
                <div className="bg-[#10b981]/20 p-5 rounded-full">
                  <Users className="w-12 h-12 text-[#10b981]" />
                </div>
              </div>
              <h3 className="text-3xl font-bold text-center mb-4">Community Pool</h3>
              <p className="text-gray-300 text-center text-lg">
                Join a friendly community of miners with 24/7 support and active Discord.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How to Connect */}
      <section className="py-20 px-4 md:px-8 bg-[#1e1e1e]">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-5xl font-bold text-center mb-16">How to Connect</h2>

          <div className="space-y-10">
            <div className="bg-[#2a2a2a] p-8 rounded-2xl border-l-8 border-[#10b981]">
              <h3 className="text-3xl font-bold mb-4 flex items-center gap-4">
                <Zap className="w-10 h-10 text-[#10b981]" /> Step 1: Pool URL
              </h3>
              <code className="bg-[#1e1e1e] text-[#10b981] px-6 py-4 rounded-xl block font-mono text-xl">
                stratum+tcp://pool.bitcoinmerch.com:3333
              </code>
            </div>

            <div className="bg-[#2a2a2a] p-8 rounded-2xl border-l-8 border-[#10b981]">
              <h3 className="text-3xl font-bold mb-4 flex items-center gap-4">
                <Cpu className="w-10 h-10 text-[#10b981]" /> Step 2: Username
              </h3>
              <p className="text-gray-300 mb-3 text-lg">Use your Bitcoin address as username:</p>
              <code className="bg-[#1e1e1e] text-[#10b981] px-6 py-4 rounded-xl block font-mono text-xl break-all">
                bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh
              </code>
            </div>

            <div className="bg-[#2a2a2a] p-8 rounded-2xl border-l-8 border-[#10b981]">
              <h3 className="text-3xl font-bold mb-4 flex items-center gap-4">
                <AlertCircle className="w-10 h-10 text-[#10b981]" /> Step 3: Password
              </h3>
              <p className="text-gray-300 mb-3 text-lg">Use any password (commonly "x" or "worker1"):</p>
              <code className="bg-[#1e1e1e] text-[#10b981] px-6 py-4 rounded-xl block font-mono text-xl">
                x
              </code>
            </div>
          </div>

          <div className="mt-16 bg-gradient-to-r from-[#10b981]/20 to-[#059669]/20 p-10 rounded-2xl text-center">
            <h3 className="text-4xl font-bold mb-6">Need Help Getting Started?</h3>
            <p className="text-xl text-gray-300 mb-8">
              Check out our detailed setup guides or contact our support team for assistance
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <button className="bg-[#10b981] text-black px-10 py-5 rounded-xl text-xl font-bold hover:bg-[#059669] transition shadow-lg">
                View Setup Guide
              </button>
              <button className="bg-transparent border-2 border-[#10b981] text-[#10b981] px-10 py-5 rounded-xl text-xl font-bold hover:bg-[#10b981]/10 transition">
                Contact Support
              </button>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}