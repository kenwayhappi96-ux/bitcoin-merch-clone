import { Droplets, TrendingUp, Users, Zap } from 'lucide-react'

export default function PoolPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-[#10b981] to-[#059669] text-white py-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <div className="flex justify-center mb-6">
            <Droplets className="w-20 h-20" />
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-4">Bitcoin Merch Mining Pool</h1>
          <p className="text-2xl mb-8 text-green-100">
            Join our community pool with 0% fees for Battle Pass members
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-green-600 px-8 py-4 rounded-lg text-xl font-bold hover:bg-gray-100 transition shadow-lg">
              Connect Your Miner
            </button>
            <button className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-lg text-xl font-bold hover:bg-white/10 transition">
              View Stats
            </button>
          </div>
        </div>
      </div>

      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-6 mb-12">
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="text-3xl font-bold text-gray-800 mb-2">2.4 EH/s</div>
              <div className="text-gray-600">Total Hashrate</div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="text-3xl font-bold text-gray-800 mb-2">1,247</div>
              <div className="text-gray-600">Active Miners</div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="text-3xl font-bold text-gray-800 mb-2">47</div>
              <div className="text-gray-600">Blocks Found (30d)</div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="text-3xl font-bold text-gray-800 mb-2">99.8%</div>
              <div className="text-gray-600">Uptime</div>
            </div>
          </div>

          <h2 className="text-4xl font-bold text-center text-gray-800 mb-12">Pool Features</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            <div className="bg-white p-8 rounded-lg shadow-md">
              <div className="flex justify-center mb-4">
                <div className="bg-green-100 p-4 rounded-full">
                  <Zap className="w-10 h-10 text-green-600" />
                </div>
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-3 text-center">Low Fees</h3>
              <p className="text-gray-600 text-center">
                Only 1% pool fee for standard members. 0% fees for Battle Pass subscribers!
              </p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-md">
              <div className="flex justify-center mb-4">
                <div className="bg-blue-100 p-4 rounded-full">
                  <TrendingUp className="w-10 h-10 text-blue-600" />
                </div>
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-3 text-center">Daily Payouts</h3>
              <p className="text-gray-600 text-center">
                Automatic daily payouts with low minimum threshold of 0.001 BTC.
              </p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-md">
              <div className="flex justify-center mb-4">
                <div className="bg-purple-100 p-4 rounded-full">
                  <Users className="w-10 h-10 text-purple-600" />
                </div>
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-3 text-center">Community Pool</h3>
              <p className="text-gray-600 text-center">
                Join a friendly community of miners with 24/7 support and active Discord.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-gray-800 mb-8">How to Connect</h2>
          
          <div className="space-y-6">
            <div className="bg-gray-50 p-6 rounded-lg border-l-4 border-green-600">
              <h3 className="text-xl font-bold text-gray-800 mb-2">Step 1: Pool URL</h3>
              <code className="bg-gray-800 text-green-400 px-4 py-2 rounded block font-mono text-sm">
                stratum+tcp://pool.bitcoinmerch.com:3333
              </code>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg border-l-4 border-blue-600">
              <h3 className="text-xl font-bold text-gray-800 mb-2">Step 2: Username</h3>
              <p className="text-gray-700 mb-2">Use your Bitcoin address as username:</p>
              <code className="bg-gray-800 text-blue-400 px-4 py-2 rounded block font-mono text-sm">
                bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh
              </code>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg border-l-4 border-orange-600">
              <h3 className="text-xl font-bold text-gray-800 mb-2">Step 3: Password</h3>
              <p className="text-gray-700 mb-2">Use any password (commonly "x" or "worker1"):</p>
              <code className="bg-gray-800 text-orange-400 px-4 py-2 rounded block font-mono text-sm">
                x
              </code>
            </div>
          </div>

          <div className="mt-8 bg-gradient-to-r from-green-50 to-blue-50 p-8 rounded-lg">
            <h3 className="text-2xl font-bold text-gray-800 mb-4 text-center">Need Help Getting Started?</h3>
            <p className="text-gray-700 text-center mb-6">
              Check out our detailed setup guides or contact our support team for assistance
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-green-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-green-700 transition">
                View Setup Guide
              </button>
              <button className="bg-gray-800 text-white px-6 py-3 rounded-lg font-bold hover:bg-gray-700 transition">
                Contact Support
              </button>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
