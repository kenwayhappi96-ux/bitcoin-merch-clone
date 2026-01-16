import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { Star, ChevronLeft } from 'lucide-react'
import AddToCartButton from './AddToCartButton'

interface Product {
  id: number
  name: string
  slug: string
  description: string
  price: number
  discountPrice: number | null
  image: string
  category: string
  inStock: boolean
  isFeatured: boolean
}

async function getProduct(slug: string): Promise<Product | null> {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'
    const res = await fetch(`${baseUrl}/api/products`, {
      cache: 'no-store'
    })
    
    if (!res.ok) return null
    
    const data = await res.json()
    if (!data.success) return null
    
    const product = data.products.find((p: any) => p.slug === slug)
    return product || null
  } catch (error) {
    console.error('Error fetching product:', error)
    return null
  }
}

export default async function ProductDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const {slug} = await params
  const product = await getProduct(slug)

  if (!product) {
    notFound()
  }

  const discountPercent = product.discountPrice 
    ? Math.round(((product.price - product.discountPrice) / product.price) * 100)
    : 0

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <Link href="/collections/lucky-miners" className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-6">
          <ChevronLeft className="w-4 h-4" />
          Retour aux produits
        </Link>

        {/* Product Header */}
        <div className="grid lg:grid-cols-2 gap-12 mb-12 bg-white rounded-lg shadow-md p-6">
          {/* Image */}
          <div>
            <div className="relative aspect-square overflow-hidden rounded-lg mb-4">
              {/* <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-cover w-full h-full"
                onError={(e) => {
                  e.currentTarget.src = '/ref/logo.png'
                }}
              /> */}
              {discountPercent > 0 && (
                <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                  -{discountPercent}%
                </div>
              )}
            </div>
            {!product.inStock && (
              <p className="text-center text-red-600 font-semibold">Rupture de stock</p>
            )}
          </div>

          {/* Product Info */}
          <div>
            <p className="text-sm text-gray-500 mb-2">{product.category}</p>
            <h1 className="text-3xl font-bold text-gray-800 mb-4">{product.name}</h1>
            
            {/* Price */}
            <div className="flex items-center gap-4 mb-6">
              {product.discountPrice ? (
                <>
                  <span className="text-4xl font-bold text-blue-600">${product.discountPrice.toFixed(2)}</span>
                  <span className="text-2xl text-gray-400 line-through">${product.price.toFixed(2)}</span>
                  <span className="text-green-600 font-semibold">
                    Économisez ${(product.price - product.discountPrice).toFixed(2)}
                  </span>
                </>
              ) : (
                <span className="text-4xl font-bold text-gray-800">${product.price.toFixed(2)}</span>
              )}
            </div>

            {/* Description */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-3">Description</h2>
              <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">{product.description}</p>
            </div>
            {/* Stock Status */}
            <div className="mb-6">
              {product.inStock ? (
                <p className="text-green-600 font-semibold flex items-center gap-2">
                  <span className="w-3 h-3 bg-green-600 rounded-full"></span>
                  En stock - Expédition rapide
                </p>
              ) : (
                <p className="text-red-600 font-semibold flex items-center gap-2">
                  <span className="w-3 h-3 bg-red-600 rounded-full"></span>
                  Rupture de stock
                </p>
              )}
            </div>

            {/* Add to Cart Button */}
            <AddToCartButton product={product} />

            {/* Info */}
            <div className="mt-6 pt-6 border-t space-y-3">
              <p className="text-sm text-gray-600">✅ Livraison gratuite à partir de $400</p>
              <p className="text-sm text-gray-600">🔒 Paiement sécurisé</p>
              <p className="text-sm text-gray-600">📦 Expédié depuis la Californie</p>
              {product.isFeatured && (
                <p className="text-sm text-orange-600 font-semibold">⭐ Produit vedette</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
