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

interface ProductGridProps {
  initialProducts: Product[]
}

export default function ProductGrid({ initialProducts }: ProductGridProps) {
  const [products, setProducts] = useState(initialProducts)
  const [view, setView] = useState<'grid' | 'list'>('grid')

  const handleSortChange = (sortBy: string) => {
    let sorted = [...products]
    
    switch (sortBy) {
      case 'best-selling':
        // Garder l'ordre actuel (ou ajouter logique de ventes)
        break
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
      default: // featured
        sorted = initialProducts
    }
    
    setProducts(sorted)
  }

  const handleViewChange = (newView: 'grid' | 'list') => {
    setView(newView)
  }

  return (
    <>
      <ProductFilters 
        productCount={products.length}
        onSortChange={handleSortChange}
        onViewChange={handleViewChange}
      />

      <div className={
        view === 'grid' 
          ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'
          : 'flex flex-col gap-6'
      }>
        {products.map((product) => (
          view === 'grid' 
            ? <ProductCard key={product.id} product={product} />
            : <ProductListItem key={product.id} product={product} />
        ))}
      </div>
    </>
  )
}
