import Link from 'next/link'
import { Trophy, Star, Zap, Gift, Users, TrendingUp } from 'lucide-react'

export default function BattlePassPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-[#FF8C00] to-[#ff9d1f] text-white py-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <div className="flex justify-center mb-6">
            <Trophy className="w-20 h-20" />
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-4">Bitcoin Merch Battle Pass</h1>
          <p className="text-2xl mb-8 text-orange-100">
            Unlock exclusive rewards, discounts, and mining benefits
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-[#FF8C00] px-8 py-4 rounded-lg text-xl font-bold hover:bg-gray-100 transition shadow-lg">
              Join Now - $29.99/month
            </button>
            <button className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-lg text-xl font-bold hover:bg-white/10 transition">
              Learn More
            </button>
          </div>
        </div>
      </div>

      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-gray-800 mb-12">Battle Pass Benefits</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-xl transition">
              <div className="flex justify-center mb-4">
                <div className="bg-blue-100 p-4 rounded-full">
                  <Star className="w-10 h-10 text-[#3b82f6]" />
                </div>
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-3 text-center">Exclusive Discounts</h3>
              <p className="text-gray-600 text-center">
                Get 15% off all miners, 20% off accessories, and early access to new product launches.
              </p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-xl transition">
              <div className="flex justify-center mb-4">
                <div className="bg-orange-100 p-4 rounded-full">
                  <Zap className="w-10 h-10 text-[#FF8C00]" />
                </div>
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-3 text-center">Priority Support</h3>
              <p className="text-gray-600 text-center">
                24/7 dedicated support line, faster response times, and direct access to our technical team.
              </p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-xl transition">
              <div className="flex justify-center mb-4">
                <div className="bg-green-100 p-4 rounded-full">
                  <Gift className="w-10 h-10 text-green-600" />
                </div>
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-3 text-center">Monthly Rewards</h3>
              <p className="text-gray-600 text-center">
                Earn points with every purchase and unlock free accessories, gift cards, and special perks.
              </p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-xl transition">
              <div className="flex justify-center mb-4">
                <div className="bg-purple-100 p-4 rounded-full">
                  <Users className="w-10 h-10 text-purple-600" />
                </div>
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-3 text-center">Community Access</h3>
              <p className="text-gray-600 text-center">
                Join our private Discord server with expert miners, exclusive AMAs, and live mining tutorials.
              </p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-xl transition">
              <div className="flex justify-center mb-4">
                <div className="bg-red-100 p-4 rounded-full">
                  <TrendingUp className="w-10 h-10 text-red-600" />
                </div>
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-3 text-center">Pool Benefits</h3>
              <p className="text-gray-600 text-center">
                0% pool fees for Battle Pass members on our official mining pool with enhanced payouts.
              </p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-xl transition">
              <div className="flex justify-center mb-4">
                <div className="bg-yellow-100 p-4 rounded-full">
                  <Trophy className="w-10 h-10 text-yellow-600" />
                </div>
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-3 text-center">Exclusive Merchandise</h3>
              <p className="text-gray-600 text-center">
                Limited edition t-shirts, stickers, and mining gear only available to Battle Pass members.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-gray-800 mb-12">Pricing Plans</h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="border-2 border-gray-200 rounded-xl p-8 hover:border-[#3b82f6] transition">
              <h3 className="text-2xl font-bold text-gray-800 mb-2">Monthly Pass</h3>
              <div className="text-5xl font-bold text-gray-800 mb-6">
                $29<span className="text-2xl text-gray-600">.99/mo</span>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start gap-2">
                  <Star className="w-5 h-5 text-[#FF8C00] flex-shrink-0 mt-1" />
                  <span className="text-gray-700">All Battle Pass benefits</span>
                </li>
                <li className="flex items-start gap-2">
                  <Star className="w-5 h-5 text-[#FF8C00] flex-shrink-0 mt-1" />
                  <span className="text-gray-700">15% discount on all products</span>
                </li>
                <li className="flex items-start gap-2">
                  <Star className="w-5 h-5 text-[#FF8C00] flex-shrink-0 mt-1" />
                  <span className="text-gray-700">Monthly reward points</span>
                </li>
                <li className="flex items-start gap-2">
                  <Star className="w-5 h-5 text-[#FF8C00] flex-shrink-0 mt-1" />
                  <span className="text-gray-700">Cancel anytime</span>
                </li>
              </ul>
              <button className="w-full bg-[#3b82f6] text-white py-4 rounded-lg font-bold text-lg hover:bg-[#2563eb] transition">
                Subscribe Monthly
              </button>
            </div>

            <div className="border-4 border-[#FF8C00] rounded-xl p-8 relative bg-gradient-to-br from-orange-50 to-white">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#FF8C00] text-white px-4 py-1 rounded-full font-bold">
                BEST VALUE
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">Annual Pass</h3>
              <div className="text-5xl font-bold text-gray-800 mb-2">
                $299<span className="text-2xl text-gray-600">.99/yr</span>
              </div>
              <p className="text-green-600 font-semibold mb-6">Save $60 per year!</p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start gap-2">
                  <Star className="w-5 h-5 text-[#FF8C00] flex-shrink-0 mt-1" />
                  <span className="text-gray-700">All Monthly Pass benefits</span>
                </li>
                <li className="flex items-start gap-2">
                  <Star className="w-5 h-5 text-[#FF8C00] flex-shrink-0 mt-1" />
                  <span className="text-gray-700">20% discount on all products</span>
                </li>
                <li className="flex items-start gap-2">
                  <Star className="w-5 h-5 text-[#FF8C00] flex-shrink-0 mt-1" />
                  <span className="text-gray-700">2x reward points multiplier</span>
                </li>
                <li className="flex items-start gap-2">
                  <Star className="w-5 h-5 text-[#FF8C00] flex-shrink-0 mt-1" />
                  <span className="text-gray-700">Free exclusive merchandise pack</span>
                </li>
              </ul>
              <button className="w-full bg-[#FF8C00] text-white py-4 rounded-lg font-bold text-lg hover:bg-[#ff9d1f] transition shadow-lg">
                Subscribe Annually
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 px-4 bg-gradient-to-r from-[#3b82f6] to-[#2563eb] text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Level Up Your Mining?</h2>
          <p className="text-xl mb-8 text-blue-100">
            Join thousands of miners already enjoying Battle Pass benefits
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-[#FF8C00] text-white px-8 py-4 rounded-lg text-lg font-bold hover:bg-[#ff9d1f] transition">
              Start Your Free Trial
            </button>
            <Link href="/support" className="bg-white text-[#3b82f6] px-8 py-4 rounded-lg text-lg font-bold hover:bg-gray-100 transition">
              Contact Sales
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
