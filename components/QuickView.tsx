import { Product } from '@/types'
import Image from 'next/image'
import { useEffect, useState } from 'react'

interface ProductQuickViewProps {
  product: Product
  secondaryImages: any
  isPage?:boolean
}

function QuickView({product, secondaryImages, isPage}:ProductQuickViewProps) {
    const [selectedImage, setSelectedImage] = useState(product.image || '/ref/logo.png')
  
  const savings = product.discountPrice ? (product.price - product.discountPrice).toFixed(2) : 0
  // Get secondary images from product.images array (is_primary = false)
  const images = [product.image || '/ref/logo.png', ...secondaryImages]

  return (
    <div className={`flex gap-4 ${isPage?'flex-col': 'flex-row'} h-full`}>
        {/* Thumbnails */}
        <div className="flex flex-col gap-2 max-h-96 overflow-y-auto order-2 h-2/3">
            <div className={`flex ${isPage? 'flex-row':'flex-col'} gap-2`}>
                {images.map((img, idx) => (
                <div
                    key={idx}
                    onClick={() => setSelectedImage(img)}
                    className={`cursor-pointer border-2 rounded-lg overflow-hidden transition w-20 h-20 flex-shrink-0 ${
                    selectedImage === img ? 'border-[#FF8C00]' : 'border-gray-200'
                    }`}
                >
                    <div className="relative w-full h-full">
                    <Image
                        src={img}
                        alt={`${product.name} ${idx + 1}`}
                        fill
                        className="object-cover"
                    />
                    </div>
                </div>
                ))}
            </div>
        </div>

        {/* Main image */}
        <div className="flex items-start justify-center order-1 h-1/3">
            <div className="w-full h-full bg-gray-50 rounded-lg overflow-hidden">
                <Image
                src={selectedImage}
                alt={product.name}
                width={500}
                height={600}
                className="object-container w-full h-full"
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
            </div>
        </div>
    </div>
  )
}

export default QuickView