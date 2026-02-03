'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { slides } from '@/lib/constants'


export default function HeroCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0)

  // Auto slide
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 5000)

    return () => clearInterval(timer)
  }, [])

  const nextSlide = () =>
    setCurrentSlide((prev) => (prev + 1) % slides.length)

  const prevSlide = () =>
    setCurrentSlide((prev) =>
      prev === 0 ? slides.length - 1 : prev - 1
    )

  return (
    <div className="flex flex-col items-center bg-white py-4 md:py-8 px-4">
      <div className="relative w-full max-w-[85rem] h-[230px] md:h-[400px] overflow-hidden mb-4">

        {/* Slides container */}
        <div
          className="flex h-full transition-transform duration-700 ease-in-out"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {slides.map((slide) => (
            <div key={slide.id} className="relative w-full h-full flex-shrink-0">
              <Image
                src={slide.image}
                alt={slide.title}
                fill
                className="object-cover"
                priority={slide.id === 1}
              />
            </div>
          ))}
        </div>

        {/* Previous */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-20
                     bg-black/40 hover:bg-black/60 text-white
                     p-3 rounded-full transition"
          aria-label="Previous slide"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        {/* Next */}
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-20
                     bg-black/40 hover:bg-black/60 text-white
                     p-3 rounded-full transition"
          aria-label="Next slide"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>

      {/* Indicators */}
      <div className="flex gap-2 mt-4">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-5 h-[6px] transition ${
              index === currentSlide ? 'bg-gray-800' : 'bg-gray-400'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}
