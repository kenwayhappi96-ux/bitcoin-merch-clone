// Types pour les produits
export interface Product {
  id: number
  name: string
  slug: string
  description: string
  short_description?: string
  price: number
  compare_at_price?: number
  sku?: string
  stock_quantity: number
  weight?: number
  is_active: boolean
  is_featured: boolean
  category_id?: number
  image_url: string
  images?: ProductImage[]
  category?: Category
}

export interface ProductImage {
  id: number
  product_id: number
  image_url: string
  alt_text?: string
  display_order: number
  is_primary: boolean
}

export interface Category {
  id: number
  name: string
  slug: string
  description?: string
  image_url?: string
  parent_id?: number
  display_order: number
  is_active: boolean
}

// Types pour le panier
export interface CartItem {
  id: number
  product: Product
  quantity: number
  price: number
}

export interface Cart {
  items: CartItem[]
  subtotal: number
  shipping: number
  tax: number
  total: number
}

// Types pour l'utilisateur
export interface User {
  id: number
  email: string
  first_name?: string
  last_name?: string
  phone?: string
}

export interface Address {
  id: number
  user_id: number
  type: 'shipping' | 'billing'
  first_name: string
  last_name: string
  address_line1: string
  address_line2?: string
  city: string
  state?: string
  postal_code: string
  country: string
  phone?: string
  is_default: boolean
}
