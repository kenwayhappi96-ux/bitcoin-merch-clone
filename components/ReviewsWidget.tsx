'use client'

import { Star, X } from 'lucide-react'
import { useState } from 'react'
import Image from 'next/image'

const reviews = [
  {
    id: 1,
    author: 'Tim J',
    rating: 4,
    date: '01/04/2026',
    product: 'Bitcoin Merch® - X Node Mini - 2TB Full Node',
    title: 'Great if it Didn\'t Constantly Freeze Up',
    content: 'Wish I would have researched Umbrel before going with a node based on it. Numerous users seem to have the same issue of their nodes freezing up and the browser unable to open it. The only solution is to unplug it and restart, but it\'s not long before it freezes up again. May have to try and flash it or reset everything. I just don\'t want to lose the block chain that took forever to download. Other than that it\'s a nice little product.',
    avatar: 'https://via.placeholder.com/60x60/3b82f6/ffffff?text=TJ'
  },
  {
    id: 2,
    author: 'Trips to Slovenia',
    rating: 5,
    date: '12/22/2025',
    product: 'Bitcoin Merch® - NerdMiner V2 Lottery Miner',
    title: 'Trips to crypto',
    content: 'I m impressed by this little magic staff\'s on this website. Incredible things it\'s that how little gadgets it can be a lot. Amazing right',
    avatar: 'https://via.placeholder.com/60x60/10b981/ffffff?text=TS'
  },
  {
    id: 3,
    author: 'Joel Wheaton',
    rating: 5,
    date: '12/11/2025',
    product: 'Bitcoin Merch® - NerdOCTaxe 9.6TH/s BTC Miner w/ Power Supply',
    title: 'Nice',
    content: 'Great product, works perfectly. Very happy with my purchase!',
    avatar: 'https://via.placeholder.com/60x60/FF8C00/ffffff?text=JW'
  }
]

export default function ReviewsWidget() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed right-0 top-1/2 -translate-y-1/2 z-40 bg-black text-white py-2 px-3 rounded-l-lg shadow-lg hover:bg-gray-800 transition-all hover:px-4"
        style={{ writingMode: 'vertical-rl' }}
      >
        <Star className="w-5 h-5 mb-2 inline-block" style={{ writingMode: 'horizontal-tb' }} />
        <span className="font-bold text-base">Reviews</span>
      </button>

      {/* Modal */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
          onClick={() => setIsOpen(false)}
        >
          <div className="w-full max-w-2xl max-h-[90vh] bg-white rounded-lg overflow-y-auto shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-center justify-between z-10">
              <div>
                <h2 className="text-2xl font-bold text-gray-800">Let customers speak for us</h2>
                <div className="flex items-center gap-3 mt-2">
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star key={star} className="w-5 h-5 fill-[#FF8C00] text-[#FF8C00]" />
                    ))}
                  </div>
                  <span className="text-lg font-bold text-gray-800">4.8</span>
                  <span className="text-gray-600">Based on 645 reviews</span>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="text-gray-500 hover:text-gray-800 transition"
              >
                <X className="w-8 h-8" />
              </button>
            </div>

            <div className="p-6">
              {/* Rating Bars */}
              <div className="mb-8 space-y-2">
                {[5, 4, 3, 2, 1].map((rating) => (
                  <div key={rating} className="flex items-center gap-3">
                    <span className="text-sm font-medium text-gray-700 w-8">{rating} ★</span>
                    <div className="flex-1 bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-[#FF8C00] h-2 rounded-full"
                        style={{ 
                          width: rating === 5 ? '90%' : rating === 4 ? '8%' : rating === 3 ? '2%' : '0%' 
                        }}
                      />
                    </div>
                    <span className="text-sm text-gray-600 w-12">
                      {rating === 5 ? '578' : rating === 4 ? '51' : rating === 3 ? '15' : rating === 2 ? '0' : '1'}
                    </span>
                  </div>
                ))}
              </div>

              <button className="w-full bg-[#3b82f6] text-white py-3 rounded-lg font-semibold hover:bg-[#2563eb] transition mb-8">
                Write a Store Review
              </button>

              {/* Reviews List */}
              <div className="space-y-6">
                <h3 className="text-xl font-bold text-gray-800 mb-4">Product Reviews (607)</h3>
                
                {reviews.map((review) => (
                  <div key={review.id} className="border-b border-gray-200 pb-6">
                    <div className="flex items-start gap-4">
                      <Image
                        src={review.avatar}
                        alt={review.author}
                        width={60}
                        height={60}
                        className="rounded-full"
                      />
                      
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-bold text-gray-800">{review.author}</h4>
                        </div>
                        
                        <div className="flex mb-2">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star
                              key={star}
                              className={`w-4 h-4 ${star <= review.rating ? 'fill-[#FF8C00] text-[#FF8C00]' : 'text-gray-300'}`}
                            />
                          ))}
                        </div>

                        <p className="text-xs text-gray-500 mb-2">{review.date}</p>
                        <p className="text-sm font-semibold text-[#3b82f6] mb-2">{review.product}</p>
                        <h5 className="font-bold text-gray-800 mb-2">{review.title}</h5>
                        <p className="text-gray-700 text-sm leading-relaxed">{review.content}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="text-center mt-8">
                <button className="text-[#3b82f6] font-semibold hover:underline">
                  Load More Reviews
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
