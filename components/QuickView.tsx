'use client'

import { useState } from 'react'
import Image from 'next/image'

export function QuickView({
  product,
  secondaryImages = [],
}: ProductQuickViewProps) {
  const images = [
    product.image || '/ref/logo.png',
    ...secondaryImages,
  ]

  const [selectedImage, setSelectedImage] = useState(images[0])

  return (
    <div className="w-full flex flex-col gap-4">
      {/* Main image */}
      <div className="relative w-full aspect-square rounded-2xl overflow-hidden border border-gray-300 bg-white">
        <Image
          src={selectedImage}
          alt={product.name}
          fill
          priority
          className="object-contain"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      </div>

      {/* Thumbnails */}
      <div className="flex gap-3 justify-start">
        {images.map((img, idx) => (
          <button
            key={idx}
            onClick={() => setSelectedImage(img)}
            className={`relative w-16 h-16 rounded-lg overflow-hidden border-2 transition
              ${
                selectedImage === img
                  ? 'border-[#f5a623]'
                  : 'border-gray-300 hover:border-gray-400'
              }
            `}
          >
            <Image
              src={img}
              alt={`${product.name} ${idx + 1}`}
              fill
              className="object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  )
}
