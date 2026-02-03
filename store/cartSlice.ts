import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { CartItem, Product } from '@/types'

interface CartState {
  items: CartItem[]
  isOpen: boolean
  shippingProtection: boolean          // ← NOUVEAU
  protectionFee: number                // ← NOUVEAU (13.50 par défaut)
}

const initialState: CartState = {
  items: [],
  isOpen: false,
  shippingProtection: true,            // coché par défaut
  protectionFee: 13.50,                // montant fixe (en € ou $ selon ta préférence)
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<any>) => {
      const existingItem = state.items.find(item => item.id === action.payload.id)
      
      if (existingItem) {
        existingItem.quantity += 1
      } else {
        state.items.push({
          id: action.payload.id,
          name: action.payload.name,
          price: action.payload.discountPrice || action.payload.price,
          discount_price: action.payload.discountPrice,
          quantity: 1,
          image: action.payload.image || '/ref/logo.png',
        })
      }
    },
    
    removeFromCart: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter(item => item.id !== action.payload)
    },
    
    updateQuantity: (state, action: PayloadAction<{ id: number; quantity: number }>) => {
      const item = state.items.find(item => item.id === action.payload.id)
      if (item) {
        item.quantity = action.payload.quantity
      }
    },
    
    clearCart: (state) => {
      state.items = []
    },
    
    toggleCart: (state) => {
      state.isOpen = !state.isOpen
    },
    
    openCart: (state) => {
      state.isOpen = true
    },
    
    closeCart: (state) => {
      state.isOpen = false
    },

    // ──────────────────────────────────────────────
    // NOUVEAUX REDUCERS pour la protection
    // ──────────────────────────────────────────────
    setShippingProtection: (state, action: PayloadAction<boolean>) => {
      state.shippingProtection = action.payload
    },

    toggleShippingProtection: (state) => {
      state.shippingProtection = !state.shippingProtection
    },
  },
})

export const { 
  addToCart, 
  removeFromCart, 
  updateQuantity, 
  clearCart, 
  toggleCart,
  openCart,
  closeCart,
  setShippingProtection,
  toggleShippingProtection,
} = cartSlice.actions

export default cartSlice.reducer