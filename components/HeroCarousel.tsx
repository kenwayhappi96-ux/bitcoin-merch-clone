'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { ChevronLeft, ChevronRight } from 'lucide-react'

const slides = [
  {
    id: 1,
    image: '/ref/c1.JPG',
    title: 'Join the Battle Pass',
    subtitle: 'Exclusive rewards and mining benefits',
    link: '/battle-pass',
    buttonText: 'Shop Now'
  },
  {
    id: 2,
    image: '/ref/c2.JPG',
    title: 'Must Go Warehouse Miners',
    subtitle: 'Limited stock clearance on premium equipment',
    link: '/collections/lucky-miners',
    buttonText: 'Shop Now'
  },
  {
    id: 3,
    image: '/ref/c3.JPG',
    title: 'Free Shipping on Orders $400+',
    subtitle: 'Fast delivery on all mining equipment',
    link: '/collections/bitaxe-miners',
    buttonText: 'Shop Now'
  },
  {
    id: 4,
    image: '/ref/c4.JPG',
    title: 'Visit Our Store',
    subtitle: 'California warehouse - Open for pickup',
    link: '/support',
    buttonText: 'Learn More'
  },
  {
    id: 5,
    image: '/ref/c5.JPG',
    title: 'Pay with Crypto',
    subtitle: 'Bitcoin, Ethereum, and more accepted',
    link: '/',
    buttonText: 'Shop Now'
  }
]

export default function HeroCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length)
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)

  return (
    <div className="flex flex-col justify-center items-center bg-gray-100 py-4 md:py-8 px-4 md:px-0">
      <div className="relative w-full max-w-[85rem] h-[230px] md:h-[400px] overflow-hidden rounded-lg shadow-xl">
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-700 ${
            index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'
          }`}
        >
          <Image
            src={slide.image}
            alt={slide.title}
            fill
            className="object-cover"
            priority={index === 0}
          />
        </div>
      ))}

      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-white/80 hover:bg-white text-gray-800 p-3 rounded-full shadow-lg transition"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-white/80 hover:bg-white text-gray-800 p-3 rounded-full shadow-lg transition"
        aria-label="Next slide"
      >
        <ChevronRight className="w-6 h-6" />
      </button>
      </div>
      
      {/* Indicateurs en dessous du carousel */}
      <div className="flex gap-2 mt-4">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-8 h-2 rounded transition ${
              index === currentSlide ? 'bg-gray-800' : 'bg-gray-400'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}
