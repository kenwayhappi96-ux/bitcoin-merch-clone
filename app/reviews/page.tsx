import { Star, User, ThumbsUp } from 'lucide-react'
import Image from 'next/image'

const reviews = [
  {
    id: 1,
    author: 'Michael Chen',
    avatar: 'https://via.placeholder.com/80x80/3b82f6/ffffff?text=MC',
    rating: 5,
    date: 'December 28, 2025',
    product: 'Lucky Miner LV07',
    title: 'Amazing Solo Mining Experience!',
    content: 'I\'ve been running my LV07 for 3 months now. Setup was super easy and it runs quietly in my home office. Haven\'t hit a block yet but the experience has been great for learning about Bitcoin mining.',
    helpful: 24,
    verified: true
  },
  {
    id: 2,
    author: 'Sarah Johnson',
    avatar: 'https://via.placeholder.com/80x80/10b981/ffffff?text=SJ',
    rating: 5,
    date: 'December 25, 2025',
    product: 'Bitaxe Ultra',
    title: 'Perfect for Developers',
    content: 'The open-source nature of Bitaxe is incredible. I\'ve been tinkering with the firmware and learned so much. The WiFi connectivity and web interface are top-notch. Highly recommend for anyone interested in the technical side.',
    helpful: 18,
    verified: true
  },
  {
    id: 3,
    author: 'David Martinez',
    avatar: 'https://via.placeholder.com/80x80/FF8C00/ffffff?text=DM',
    rating: 4,
    date: 'December 20, 2025',
    product: 'Lucky Miner Bundle Pack',
    title: 'Great Value Bundle',
    content: 'Bought the 3-pack bundle and saved a lot. All three miners arrived well-packaged and working perfectly. Only reason for 4 stars instead of 5 is I wish it came with extra USB cables.',
    helpful: 15,
    verified: true
  },
  {
    id: 4,
    author: 'Emily Rodriguez',
    avatar: 'https://via.placeholder.com/80x80/ef4444/ffffff?text=ER',
    rating: 5,
    date: 'December 15, 2025',
    product: 'Bitaxe Supra',
    title: 'Excellent Customer Service',
    content: 'Had a question about pool configuration and the support team was incredibly helpful. The miner itself works great and the power efficiency is better than expected.',
    helpful: 12,
    verified: true
  },
  {
    id: 5,
    author: 'James Wilson',
    avatar: 'https://via.placeholder.com/80x80/8b5cf6/ffffff?text=JW',
    rating: 5,
    date: 'December 10, 2025',
    product: 'Battle Pass Membership',
    title: 'Battle Pass is Worth Every Penny',
    content: 'The discounts alone pay for the membership. Plus the private Discord community is amazing - so much knowledge sharing and the monthly rewards are a nice bonus.',
    helpful: 31,
    verified: true
  },
  {
    id: 6,
    author: 'Lisa Thompson',
    avatar: 'https://via.placeholder.com/80x80/06b6d4/ffffff?text=LT',
    rating: 4,
    date: 'December 5, 2025',
    product: 'Lucky Miner LV08 Pro',
    title: 'Powerful but Runs Hot',
    content: 'Great hashrate and build quality. It does run warmer than I expected, so make sure you have good ventilation. Otherwise, very happy with the purchase.',
    helpful: 9,
    verified: true
  }
]

export default function ReviewsPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-[#FF8C00] to-[#ff9d1f] text-white py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-3 mb-4">
            <Star className="w-12 h-12" />
            <h1 className="text-4xl md:text-5xl font-bold">Customer Reviews</h1>
          </div>
          <p className="text-xl text-orange-100 max-w-3xl">
            See what our mining community has to say about their Bitcoin Merch experience
          </p>
        </div>
      </div>

      <section className="py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="bg-white rounded-lg shadow-md p-8 mb-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="text-center md:text-left">
                <div className="flex items-center gap-2 justify-center md:justify-start mb-2">
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star key={star} className="w-6 h-6 fill-[#FF8C00] text-[#FF8C00]" />
                    ))}
                  </div>
                  <span className="text-3xl font-bold text-gray-800">4.8</span>
                </div>
                <p className="text-gray-600">Based on 247 reviews</p>
              </div>
              
              <div className="flex flex-col gap-2 flex-1 max-w-md">
                {[5, 4, 3, 2, 1].map((rating) => (
                  <div key={rating} className="flex items-center gap-3">
                    <span className="text-sm font-medium text-gray-700 w-8">{rating} ★</span>
                    <div className="flex-1 bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-[#FF8C00] h-2 rounded-full"
                        style={{ width: rating === 5 ? '75%' : rating === 4 ? '18%' : rating === 3 ? '4%' : rating === 2 ? '2%' : '1%' }}
                      />
                    </div>
                    <span className="text-sm text-gray-600 w-12">{rating === 5 ? '185' : rating === 4 ? '44' : rating === 3 ? '10' : rating === 2 ? '5' : '3'}</span>
                  </div>
                ))}
              </div>

              <button className="bg-[#3b82f6] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#2563eb] transition whitespace-nowrap">
                Write a Review
              </button>
            </div>
          </div>

          <div className="mb-6 flex flex-wrap gap-3">
            <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3b82f6] focus:outline-none">
              <option>All Products</option>
              <option>Lucky Miners</option>
              <option>Bitaxe Miners</option>
              <option>Accessories</option>
              <option>Battle Pass</option>
            </select>
            <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3b82f6] focus:outline-none">
              <option>Most Recent</option>
              <option>Highest Rated</option>
              <option>Lowest Rated</option>
              <option>Most Helpful</option>
            </select>
          </div>

          <div className="space-y-6">
            {reviews.map((review) => (
              <div key={review.id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition">
                <div className="flex items-start gap-4">
                  <Image
                    src={review.avatar}
                    alt={review.author}
                    width={60}
                    height={60}
                    className="rounded-full"
                  />
                  
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-bold text-gray-800">{review.author}</h3>
                          {review.verified && (
                            <span className="bg-green-100 text-green-700 text-xs px-2 py-0.5 rounded-full font-semibold">
                              Verified Purchase
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-gray-500">{review.date}</p>
                      </div>
                      <div className="flex">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star
                            key={star}
                            className={`w-5 h-5 ${star <= review.rating ? 'fill-[#FF8C00] text-[#FF8C00]' : 'text-gray-300'}`}
                          />
                        ))}
                      </div>
                    </div>

                    <p className="text-sm font-semibold text-[#3b82f6] mb-2">{review.product}</p>
                    <h4 className="font-bold text-lg text-gray-800 mb-2">{review.title}</h4>
                    <p className="text-gray-700 mb-4 leading-relaxed">{review.content}</p>

                    <div className="flex items-center gap-4">
                      <button className="flex items-center gap-2 text-gray-600 hover:text-[#3b82f6] transition">
                        <ThumbsUp className="w-4 h-4" />
                        <span className="text-sm font-medium">Helpful ({review.helpful})</span>
                      </button>
                      <button className="text-sm text-gray-600 hover:text-[#3b82f6] transition font-medium">
                        Report
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
