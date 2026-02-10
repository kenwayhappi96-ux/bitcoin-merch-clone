'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { X, Minus, Plus } from 'lucide-react'
import { useAppDispatch } from '@/store/hooks'
import { addToCart } from '@/store/cartSlice'
import type { Product } from '@/types'

interface ProductQuickViewProps {
  product: Product
  isOpen: boolean
  onClose: () => void
}

export default function ProductQuickView({ product, isOpen, onClose }: ProductQuickViewProps) {
  const dispatch = useAppDispatch()
  const router = useRouter()
  const [quantity, setQuantity] = useState(1)
  const [selectedImage, setSelectedImage] = useState(product.image || '/ref/logo.png')
  const [secondaryImages, setSecondaryImages] = useState<string[]>([])

  // Fetch images secondaires
  useEffect(() => {
    if (isOpen && product.id) {
      fetch(`/api/products/${product.id}/images`)
        .then(res => res.json())
        .then(data => {
          const images = data.images
            ?.filter((img: any) => img.is_primary === 0)
            ?.map((img: any) => img.image_url || img.url) || []
          setSecondaryImages(images)
          // Si pas d'image secondaire, on garde la principale
          if (images.length > 0) setSelectedImage(images[0])
        })
        .catch(err => console.error('Error fetching secondary images:', err))
    }
  }, [isOpen, product.id])

  if (!isOpen) return null

  const mainImage = selectedImage || product.image || '/ref/logo.png'
  const displayPrice = product.discountPrice || product.price
  const savings = product.discountPrice ? (product.price - product.discountPrice).toFixed(2) : 0

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      dispatch(addToCart({
        id: product.id,
        name: product.name,
        price: product.price,
        discountPrice: product.discountPrice,
        image: mainImage,
      }))
    }
    setQuantity(1)
    onClose()
  }

  const handleBuyNow = () => {
    handleAddToCart()
    setTimeout(() => router.push('/checkout'), 150)
  }

  // Toutes les images pour thumbnails (principale + secondaires)
  const allImages = [product.image || '/ref/logo.png', ...secondaryImages].filter(Boolean)

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4 md:p-6">
      <div className="bg-white rounded-2xl w-full max-w-6xl max-h-[90vh] overflow-hidden shadow-2xl">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between z-10">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 line-clamp-1 pr-8">
            {product.name}
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition"
            aria-label="Fermer"
          >
            <X className="w-7 h-7 text-gray-700" />
          </button>
        </div>

        {/* Contenu principal */}
        <div className="p-6 md:p-8 overflow-y-auto max-h-[calc(90vh-80px)]">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {/* Colonne images */}
            <div className="space-y-6">
              {/* Image principale */}
              <div className="relative aspect-square rounded-xl overflow-hidden bg-gray-50 shadow-inner group">
                <Image
                  src={mainImage}
                  alt={product.name}
                  fill
                  className="object-contain transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  priority
                />
                {product.discountPrice && (
                  <div className="absolute top-4 left-4 bg-red-600 text-white px-4 py-1.5 rounded-full text-sm font-bold shadow-md">
                    -€{savings} ÉCONOMISÉ
                  </div>
                )}
              </div>

              {/* Thumbnails */}
              {allImages.length > 1 && (
                <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-gray-300">
                  {allImages.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedImage(img)}
                      className={`flex-shrink-0 w-20 h-20 md:w-24 md:h-24 rounded-lg overflow-hidden border-2 transition-all ${
                        selectedImage === img
                          ? 'border-orange-500 shadow-md'
                          : 'border-gray-200 hover:border-orange-300'
                      }`}
                    >
                      <Image
                        src={img}
                        alt={`${product.name} ${idx + 1}`}
                        width={96}
                        height={96}
                        className="object-cover w-full h-full"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Colonne infos */}
            <div className="flex flex-col gap-8">
              {/* Catégorie + Description */}
              <div>
                <span className="text-sm font-medium text-gray-500 uppercase tracking-wide">
                  {product.category || 'Catégorie'}
                </span>
                <p className="mt-3 text-gray-700 leading-relaxed">
                  {product.description || 'Aucune description disponible pour ce produit.'}
                </p>
              </div>

              {/* Prix */}
              <div className="flex flex-col gap-2">
                <div className="flex items-baseline gap-4">
                  <span className="text-4xl md:text-5xl font-bold text-orange-600">
                    €{displayPrice.toFixed(2)}
                  </span>
                  {product.discountPrice && (
                    <span className="text-xl text-gray-500 line-through">
                      €{product.price.toFixed(2)}
                    </span>
                  )}
                </div>
                {product.discountPrice && (
                  <span className="text-green-600 font-medium">
                    Économisez €{savings} • Offre limitée
                  </span>
                )}
              </div>

              {/* Stock */}
              <div>
                {product.inStock ? (
                  <span className="inline-flex items-center gap-2 text-green-700 font-semibold">
                    <span className="w-3 h-3 bg-green-500 rounded-full"></span> En stock
                  </span>
                ) : (
                  <span className="text-red-600 font-semibold">Rupture de stock</span>
                )}
              </div>

              {/* Quantité */}
              <div className="flex flex-col gap-3">
                <label className="text-sm font-semibold text-gray-700">Quantité</label>
                <div className="flex items-center border border-gray-300 rounded-lg w-fit overflow-hidden">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-5 py-3 text-gray-700 hover:bg-gray-100 transition"
                    disabled={quantity <= 1}
                  >
                    <Minus size={20} />
                  </button>
                  <span className="px-6 py-3 text-lg font-medium border-l border-r border-gray-300 min-w-[60px] text-center">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-5 py-3 text-gray-700 hover:bg-gray-100 transition"
                  >
                    <Plus size={20} />
                  </button>
                </div>
              </div>

              {/* Boutons d'action */}
              <div className="flex flex-col sm:flex-row gap-4 mt-4">
                <button
                  onClick={handleAddToCart}
                  disabled={!product.inStock}
                  className="flex-1 bg-orange-600 text-white font-bold uppercase py-4 rounded-lg hover:bg-orange-700 transition disabled:opacity-50 disabled:cursor-not-allowed shadow-md"
                >
                  Ajouter au panier
                </button>

                <button
                  onClick={handleBuyNow}
                  disabled={!product.inStock}
                  className="flex-1 bg-gray-900 text-white font-bold uppercase py-4 rounded-lg hover:bg-gray-800 transition disabled:opacity-50 disabled:cursor-not-allowed shadow-md"
                >
                  Acheter maintenant
                </button>
              </div>

              {/* Paiements / Trustpilot */}
              <div className="flex flex-col gap-3 text-center text-sm text-gray-500 mt-4">
                <p>Paiement sécurisé • PayPal, Carte, etc.</p>
                <p className="text-orange-600 font-medium">Livraison rapide depuis la Californie</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}