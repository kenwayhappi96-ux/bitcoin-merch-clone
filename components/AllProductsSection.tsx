'use client'

import { useState } from 'react'
import ProductCard from './ProductCard'
import ProductListItem from './ProductListItem'
import ProductFilters from './ProductFilters'

interface Product {
  id: number
  name: string
  slug: string
  description: string
  price: number
  discountPrice: number | null
  image: string
  inStock: boolean
  category?: string
}

interface AllProductsSectionProps {
  initialProducts: Product[]
}

export default function AllProductsSection({ initialProducts }: AllProductsSectionProps) {
  const featured = initialProducts.filter((p) => (p as any).isFeatured)
  const [products, setProducts] = useState(featured.slice(0, 8))
  const [view, setView] = useState<'grid' | 'list'>('grid')

  const handleSortChange = (sortBy: string) => {
    let sorted = [...featured.slice(0, 8)]
    
    switch (sortBy) {
      case 'alpha-asc':
        sorted.sort((a, b) => a.name.localeCompare(b.name))
        break
      case 'alpha-desc':
        sorted.sort((a, b) => b.name.localeCompare(a.name))
        break
      case 'price-asc':
        sorted.sort((a, b) => (a.discountPrice || a.price) - (b.discountPrice || b.price))
        break
      case 'price-desc':
        sorted.sort((a, b) => (b.discountPrice || b.price) - (a.discountPrice || a.price))
        break
      case 'date-asc':
        sorted.sort((a, b) => a.id - b.id)
        break
      case 'date-desc':
        sorted.sort((a, b) => b.id - a.id)
        break
      default:
        sorted = featured.slice(0, 8)
    }
    
    setProducts(sorted)
  }

  const handleViewChange = (newView: 'grid' | 'list') => {
    setView(newView)
  }

  return (
    <section className="py-16 px-4 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800">Produits vedette</h2>
        </div>

        <ProductFilters 
          productCount={products.length}
          onSortChange={handleSortChange}
          onViewChange={handleViewChange}
        />

        <div className={
          view === 'grid' 
            ? 'grid grid-cols-4 sm:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 gap-1'
            : 'flex flex-col gap-3'
        }>
          {products.map((product) => (
            view === 'grid'
              ? <ProductCard key={product.id} product={product} />
              : <ProductListItem key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  )
}
