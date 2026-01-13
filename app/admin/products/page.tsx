'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Plus, Edit, Trash2, Save, X, Image as ImageIcon } from 'lucide-react'

interface Category {
  id: number
  name: string
  slug: string
}

interface Product {
  id?: number
  name: string
  slug: string
  description: string
  category_id: number | null
  price: number
  discount_price: number | null
  stock: number
  is_active: boolean
  is_featured: boolean
  primary_image: string
  images: string[]
}

export default function ProductsPage() {
  const [products, setProducts] = useState<any[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const [uploading, setUploading] = useState(false)
  const [editing, setEditing] = useState<number | null>(null)
  const [creating, setCreating] = useState(false)
  const [formData, setFormData] = useState<Product>({
    name: '',
    slug: '',
    description: '',
    category_id: null,
    price: 0,
    discount_price: null,
    stock: 0,
    is_active: true,
    is_featured: false,
    primary_image: '',
    images: [],
  })

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    try {
      const [productsRes, categoriesRes] = await Promise.all([
        fetch('/api/products'),
        fetch('/api/categories'),
      ])

      const productsData = await productsRes.json()
      const categoriesData = await categoriesRes.json()

      if (productsData.success) {
        setProducts(productsData.products)
      }

      if (categoriesData.success) {
        setCategories(categoriesData.categories)
      }
    } catch (error) {
      console.error('Error loading data:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleCreate = () => {
    setCreating(true)
    setFormData({
      name: '',
      slug: '',
      description: '',
      category_id: categories[0]?.id || null,
      price: 0,
      discount_price: null,
      stock: 0,
      is_active: true,
      is_featured: false,
      primary_image: '',
      images: [],
    })
  }

  const handleCancel = () => {
    setCreating(false)
    setEditing(null)
  }

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>, isPrimary: boolean = true) => {
    const file = e.target.files?.[0]
    if (!file) return

    setUploading(true)
    try {
      const formData = new FormData()
      formData.append('file', file)

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      })

      const data = await response.json()

      if (data.success) {
        if (isPrimary) {
          setFormData(prev => ({ ...prev, primary_image: data.url }))
        } else {
          setFormData(prev => ({ ...prev, images: [...prev.images, data.url] }))
        }
      } else {
        alert(data.error || 'Erreur lors de l\'upload')
      }
    } catch (error) {
      console.error('Upload error:', error)
      alert('Erreur lors de l\'upload de l\'image')
    } finally {
      setUploading(false)
    }
  }

  const generateSlug = (name: string) => {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '')
  }

  const handleSave = async () => {
    try {
      const url = editing ? `/api/products/${editing}` : '/api/products'
      const method = editing ? 'PUT' : 'POST'

      const payload = {
        ...formData,
      }

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      const data = await res.json()

      if (!res.ok) {
        alert(data.error || 'Erreur')
        return
      }

      await loadData()
      handleCancel()
      alert(editing ? 'Produit mis à jour' : 'Produit créé')
    } catch (error) {
      console.error('Error saving product:', error)
      alert('Erreur lors de la sauvegarde')
    }
  }

  const handleEdit = async (productId: number) => {
    try {
      const res = await fetch(`/api/products/${productId}`)
      const data = await res.json()

      if (data.success) {
        setEditing(productId)
        setFormData({
          id: data.product.id,
          name: data.product.name,
          slug: data.product.slug,
          description: data.product.description,
          category_id: data.product.category_id,
          price: parseFloat(data.product.price),
          discount_price: data.product.discount_price ? parseFloat(data.product.discount_price) : null,
          stock: data.product.stock || 0,
          is_active: Boolean(data.product.is_active),
          is_featured: Boolean(data.product.is_featured),
          primary_image: data.product.primary_image || '',
          images: data.product.images || [],
        })
      } else {
        alert('Erreur lors du chargement du produit')
      }
    } catch (error) {
      console.error('Error loading product:', error)
      alert('Erreur lors du chargement du produit')
    }
  }

  const handleDelete = async (id: number, name: string) => {
    if (!confirm(`Voulez-vous vraiment supprimer le produit "${name}" ?`)) {
      return
    }

    try {
      const res = await fetch(`/api/products?id=${id}`, {
        method: 'DELETE',
      })

      const data = await res.json()

      if (!res.ok) {
        alert(data.error || 'Erreur')
        return
      }

      await loadData()
      alert('Produit supprimé')
    } catch (error) {
      console.error('Error deleting product:', error)
      alert('Erreur lors de la suppression')
    }
  }

  const addImageUrl = () => {
    const url = prompt('URL de l\'image:')
    if (url) {
      setFormData({ ...formData, images: [...formData.images, url] })
    }
  }

  const removeImage = (index: number) => {
    setFormData({
      ...formData,
      images: formData.images.filter((_, i) => i !== index),
    })
  }

  const calculateDiscountPercent = (price: number, discountPrice: number | null) => {
    if (!discountPrice || discountPrice >= price) return 0
    return Math.round(((price - discountPrice) / price) * 100)
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Chargement...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="p-6 lg:p-8">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Gestion des Produits</h1>
            <p className="text-sm text-gray-600 mt-1">{products.length} produit(s)</p>
          </div>
          <button
            onClick={handleCreate}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            <Plus className="w-5 h-5" />
            Nouveau Produit
          </button>
        </div>
      </div>

      {/* Form Create/Edit */}
      {(creating || editing) && (
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              {editing ? 'Modifier le produit' : 'Nouveau produit'}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Nom */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nom du produit *
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => {
                    const newName = e.target.value
                    setFormData({ 
                      ...formData, 
                      name: newName,
                      slug: editing ? formData.slug : generateSlug(newName)
                    })
                  }}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="NiceHash Lucky Miner M"
                />
              </div>

              {/* Slug */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Slug *
                </label>
                <input
                  type="text"
                  value={formData.slug}
                  onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="nicehash-lucky-miner-m"
                />
              </div>

              {/* Catégorie */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Collection *
                </label>
                <select
                  value={formData.category_id || ''}
                  onChange={(e) => setFormData({ ...formData, category_id: parseInt(e.target.value) })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Sélectionner une collection</option>
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Prix */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Prix (€) *
                </label>
                <input
                  type="number"
                  value={formData.price ?? ''}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value === '' ? 0 : parseFloat(e.target.value) })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  step="0.01"
                  min="0"
                  required
                />
              </div>

              {/* Prix réduit */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Prix réduit (€)
                  {formData.discount_price && formData.discount_price < formData.price && (
                    <span className="ml-2 text-green-600 font-semibold">
                      -{calculateDiscountPercent(formData.price, formData.discount_price)}%
                    </span>
                  )}
                </label>
                <input
                  type="number"
                  value={formData.discount_price ?? ''}
                  onChange={(e) => setFormData({ 
                    ...formData, 
                    discount_price: e.target.value === '' ? null : parseFloat(e.target.value) 
                  })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  step="0.01"
                  min="0"
                  placeholder="Optionnel"
                />
              </div>

              {/* Description courte - SUPPRIMÉ */}

              {/* Stock */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Stock
                </label>
                <input
                  type="number"
                  value={formData.stock ?? 0}
                  onChange={(e) => setFormData({ ...formData, stock: e.target.value === '' ? 0 : parseInt(e.target.value) })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  min="0"
                  placeholder="Quantité en stock"
                />
              </div>

              {/* Description complète */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description complète *
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Description détaillée du produit"
                />
              </div>

              {/* Image principale */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Image principale * 📷
                </label>
                
                {/* Affichage de l'image actuelle */}
                {formData.primary_image && (
                  <div className="mb-3">
                    <img 
                      src={formData.primary_image} 
                      alt="Aperçu" 
                      className="w-32 h-32 object-cover rounded border-2 border-gray-300"
                      onError={(e) => {
                        e.currentTarget.src = '/ref/logo.png'
                      }}
                    />
                  </div>
                )}

                {/* Bouton d'upload */}
                <div className="flex gap-2">
                  <label className="flex-1 cursor-pointer">
                    <div className="flex items-center justify-center gap-2 px-4 py-2 bg-blue-50 border-2 border-blue-300 border-dashed rounded-lg hover:bg-blue-100 transition">
                      <ImageIcon className="w-5 h-5 text-blue-600" />
                      <span className="text-blue-600 font-medium">
                        {uploading ? 'Upload en cours...' : 'Choisir une image'}
                      </span>
                    </div>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleImageUpload(e, true)}
                      className="hidden"
                      disabled={uploading}
                    />
                  </label>
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  ✨ Formats acceptés: JPG, PNG, WEBP, GIF (max 5MB)
                </p>
              </div>

              {/* Images supplémentaires */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Images supplémentaires (Galerie) 🖼️
                </label>
                <div className="flex flex-wrap gap-2 mb-2">
                  {formData.images.map((img, index) => (
                    <div key={index} className="relative group">
                      <img 
                        src={img} 
                        alt={`Image ${index + 1}`} 
                        className="w-20 h-20 object-cover rounded border"
                        onError={(e) => {
                          e.currentTarget.src = '/ref/logo.png'
                        }}
                      />
                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                  
                  {/* Bouton d'upload pour images supplémentaires */}
                  <label className="cursor-pointer">
                    <div className="w-20 h-20 border-2 border-dashed border-gray-300 rounded flex flex-col items-center justify-center hover:border-blue-500 hover:bg-blue-50 transition">
                      <Plus className="w-6 h-6 text-gray-400" />
                      <span className="text-xs text-gray-500 mt-1">Upload</span>
                    </div>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleImageUpload(e, false)}
                      className="hidden"
                      disabled={uploading}
                    />
                  </label>
                </div>
                <p className="text-xs text-gray-500">Cliquez sur + pour ajouter des images à la galerie</p>
              </div>

              {/* Options */}
              <div className="flex items-center gap-6">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="is_active"
                    checked={formData.is_active}
                    onChange={(e) => setFormData({ ...formData, is_active: e.target.checked })}
                    className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                  />
                  <label htmlFor="is_active" className="ml-2 text-sm font-medium text-gray-700">
                    Actif
                  </label>
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="is_featured"
                    checked={formData.is_featured}
                    onChange={(e) => setFormData({ ...formData, is_featured: e.target.checked })}
                    className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                  />
                  <label htmlFor="is_featured" className="ml-2 text-sm font-medium text-gray-700">
                    Produit vedette
                  </label>
                </div>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex gap-3 mt-6">
              <button
                onClick={handleSave}
                disabled={!formData.name || !formData.slug || !formData.description || !formData.primary_image || !formData.category_id}
                className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                <Save className="w-4 h-4" />
                Enregistrer
              </button>
              <button
                onClick={handleCancel}
                className="flex items-center gap-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition"
              >
                <X className="w-4 h-4" />
                Annuler
              </button>
            </div>
          </div>
        )}

        {/* Products List */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Produit
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Collection
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Prix
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Stock
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Statut
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {products.map((product) => (
                  <tr key={product.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-10 h-10 rounded object-cover mr-3"
                          onError={(e) => {
                            e.currentTarget.src = '/ref/logo.png'
                          }}
                        />
                        <div>
                          <div className="font-medium text-gray-900">{product.name}</div>
                          <code className="text-xs text-gray-500">{product.slug}</code>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm text-gray-600">{product.category}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm">
                        {product.discountPrice ? (
                          <>
                            <span className="text-gray-500 line-through">{product.originalPrice} €</span>
                            <span className="text-green-600 font-bold ml-2">{product.discountPrice} €</span>
                          </>
                        ) : (
                          <span className="text-gray-900 font-bold">{product.price} €</span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                        product.inStock 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {product.inStock ? 'En stock' : 'Rupture'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                        product.isFeatured 
                          ? 'bg-yellow-100 text-yellow-800' 
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        {product.isFeatured ? 'Vedette' : 'Normal'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button
                        onClick={() => handleEdit(product.id)}
                        className="text-blue-600 hover:text-blue-900 mr-4"
                      >
                        <Edit className="w-4 h-4 inline" />
                      </button>
                      <button
                        onClick={() => handleDelete(product.id, product.name)}
                        className="text-red-600 hover:text-red-900"
                      >
                        <Trash2 className="w-4 h-4 inline" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {products.length === 0 && (
            <div className="text-center py-12">
              <ImageIcon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">Aucun produit. Créez-en un pour commencer.</p>
            </div>
          )}
        </div>
    </div>
  )
}
