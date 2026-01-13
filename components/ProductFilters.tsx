'use client'

import { useState } from 'react'
import { Grid, List } from 'lucide-react'

interface ProductFiltersProps {
  productCount: number
  onSortChange?: (sort: string) => void
  onViewChange?: (view: 'grid' | 'list') => void
}

export default function ProductFilters({ productCount, onSortChange, onViewChange }: ProductFiltersProps) {
  const [sortBy, setSortBy] = useState('featured')
  const [view, setView] = useState<'grid' | 'list'>('grid')

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value
    setSortBy(value)
    onSortChange?.(value)
  }

  const handleViewChange = (newView: 'grid' | 'list') => {
    setView(newView)
    onViewChange?.(newView)
  }

  return (
    <div className="flex items-center justify-between mb-8">
      <p className="text-gray-600">
        <span className="font-semibold">{productCount}</span> produit(s) disponible(s)
      </p>
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <label htmlFor="sort" className="text-gray-600 text-sm">Sort by:</label>
          <select
            id="sort"
            value={sortBy}
            onChange={handleSortChange}
            className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="featured">Featured</option>
            <option value="best-selling">Best selling</option>
            <option value="alpha-asc">Alphabetically, A-Z</option>
            <option value="alpha-desc">Alphabetically, Z-A</option>
            <option value="price-asc">Price, low to high</option>
            <option value="price-desc">Price, high to low</option>
            <option value="date-asc">Date, old to new</option>
            <option value="date-desc">Date, new to old</option>
          </select>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-gray-600 text-sm">View:</span>
          <button
            onClick={() => handleViewChange('grid')}
            className={`p-2 rounded-lg transition ${
              view === 'grid' 
                ? 'bg-blue-500 text-white' 
                : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
            }`}
            title="Grid view"
          >
            <Grid className="w-5 h-5" />
          </button>
          <button
            onClick={() => handleViewChange('list')}
            className={`p-2 rounded-lg transition ${
              view === 'list' 
                ? 'bg-blue-500 text-white' 
                : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
            }`}
            title="List view"
          >
            <List className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  )
}
