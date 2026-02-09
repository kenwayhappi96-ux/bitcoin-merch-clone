'use client'

import { useEffect, useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import Image from 'next/image'
import { winners } from '@/lib/constants'

export default function LuckyWinnersCarousel() {
  const [page, setPage] = useState(0)
  const [itemsPerView, setItemsPerView] = useState(4)

  // Detect responsive items per view
  useEffect(() => {
    const update = () => setItemsPerView(getItemsPerView())
    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [])

  const totalPages = Math.ceil(winners.length / itemsPerView)

  const next = () => {
    if (page < totalPages - 1) setPage(page + 1)
  }

  const prev = () => {
    if (page > 0) setPage(page - 1)
  }

  return (
    <section className="py-16 bg-white">
      <h2 className="text-4xl font-bold text-center mb-10 text-black">
        Recent Lucky <span className="text-[#f5a623]">Bitcoin</span> Winners
      </h2>

      <div className="relative max-w-7xl mx-auto px-6">
        {/* Carousel */}
        <div className="overflow-hidden">
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{
              transform: `translateX(-${page * 100}%)`,
            }}
          >
            {Array.from({ length: totalPages }).map((_, pageIndex) => (
              <div
                key={pageIndex}
                className="flex w-full shrink-0"
              >
                {winners
                  .slice(
                    pageIndex * itemsPerView,
                    pageIndex * itemsPerView + itemsPerView
                  )
                  .map((winner, i) => (
                    <div
                      key={i}
                      className="
                        w-1/2
                        md:w-1/3
                        lg:w-1/4
                        px-4
                      "
                    >
                      <Image
                        src={winner}
                        alt={`winner-${i}`}
                        width={120}
                        height={120}
                        className="w-full h-auto object-contain"
                      />
                    </div>
                  ))}
              </div>
            ))}
          </div>
        </div>

        {/* Controls */}
        <button
          onClick={prev}
          disabled={page === 0}
          className="absolute left-0 top-1/2 -translate-y-1/2
                     bg-gray-300 hover:bg-gray-400
                     p-2 rounded-full disabled:opacity-40"
        >
          <ChevronLeft />
        </button>

        <button
          onClick={next}
          disabled={page === totalPages - 1}
          className="absolute right-0 top-1/2 -translate-y-1/2
                     bg-gray-300 hover:bg-gray-400
                     p-2 rounded-full disabled:opacity-40"
        >
          <ChevronRight />
        </button>

        {/* Indicators */}
        <div className="flex justify-center gap-2 mt-6">
          {Array.from({ length: totalPages }).map((_, i) => (
            <button
              key={i}
              onClick={() => setPage(i)}
              className={`w-6 h-[6px] rounded transition ${
                i === page ? 'bg-gray-800' : 'bg-gray-400'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

/* Utils */
function getItemsPerView() {
  if (typeof window === 'undefined') return 4
  if (window.innerWidth < 640) return 2
  if (window.innerWidth < 1024) return 3
  return 4
}
