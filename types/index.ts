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
  name: string
  price: number
  discount_price?: number
  quantity: number
  image?: string
  product?: Product
}

export interface Cart {
  items: CartItem[]
  subtotal: number
  shipping: number
  tax: number
  total: number
}

// Types pour les commandes
export interface Order {
  id: number
  order_number: string
  email: string
  first_name: string
  last_name: string
  address: string
  apartment?: string
  city: string
  state?: string
  postal_code: string
  country: string
  phone: string
  company?: string
  shipping_method: string
  shipping_cost: number
  protection_fee?: number
  protection_enabled: boolean
  subtotal: number
  total: number
  notes?: string
  payment_method: string
  payment_status: 'pending' | 'completed' | 'failed'
  order_status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled'
  created_at: string
  updated_at: string
}

export interface OrderItem {
  id: number
  order_id: number
  product_id: number
  product_name: string
  quantity: number
  price: number
  discount_price?: number
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
