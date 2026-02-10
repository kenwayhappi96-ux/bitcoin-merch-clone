'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import {
  LayoutDashboard,
  Package,
  Layers,
  ShoppingCart,
  Image as ImageIcon,
  Star,
  Settings,
  User,
  TrendingUp,
  DollarSign,
  Clock,
} from 'lucide-react'

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    products: 0,
    orders: 0,
    revenue: 0,
    pending: 0,
  })
  const [admin, setAdmin] = useState<any>(null)

  useEffect(() => {
    const adminData = localStorage.getItem('admin')
    if (adminData) {
      setAdmin(JSON.parse(adminData))
    }
    loadStats()
  }, [])

  const loadStats = async () => {
    try {
      const [productsRes, ordersRes] = await Promise.all([
        fetch('/api/products'),
        fetch('/api/orders?limit=1000'),
      ])

      const productsData = await productsRes.json()
      const ordersData = await ordersRes.json()

      let totalOrders = 0
      let totalRevenue = 0
      let pendingOrders = 0

      if (ordersData.success && ordersData.orders) {
        totalOrders = ordersData.orders.length
        totalRevenue = ordersData.orders.reduce((sum: number, order: any) => sum + Number(order.total), 0)
        pendingOrders = ordersData.orders.filter((order: any) => order.status === 'pending').length
      }

      setStats({
        products: productsData.count || 0,
        orders: totalOrders,
        revenue: Math.round(totalRevenue * 100) / 100,
        pending: pendingOrders,
      })
    } catch (error) {
      console.error('Error loading stats:', error)
    }
  }

  const menuItems = [
    {
      icon: Package,
      label: 'Produits',
      href: '/admin/products',
      description: 'Ajouter un produit',
    },
    {
      icon: Layers,
      label: 'Collections',
      href: '/admin/categories',
      description: 'Catégories et collections',
    },
    {
      icon: ShoppingCart,
      label: 'Commandes',
      href: '/admin/orders',
      description: 'Voir toutes les commandes',
    },
    {
      icon: User,
      label: 'Profil',
      href: '/admin/profile',
      description: 'Modifier le profil',
    },

  ]

  return (
    <div className="p-6 lg:p-8">
      {/* Welcome */}
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900">
          Bienvenue, {admin?.name}
        </h2>
        <p className="text-gray-600 mt-2">
          Voici un aperçu de votre boutique Bitcoin Merch
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-6 text-white shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <Package className="w-8 h-8 opacity-80" />
            <span className="text-3xl font-bold">{stats.products}</span>
          </div>
          <div className="text-sm font-medium opacity-90">Produits actifs</div>
        </div>

        <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl p-6 text-white shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <ShoppingCart className="w-8 h-8 opacity-80" />
            <span className="text-3xl font-bold">{stats.orders}</span>
          </div>
          <div className="text-sm font-medium opacity-90">Commandes totales</div>
        </div>

        <div className="bg-gradient-to-br from-yellow-500 to-orange-500 rounded-xl p-6 text-white shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <DollarSign className="w-8 h-8 opacity-80" />
            <span className="text-3xl font-bold">{stats.revenue} €</span>
          </div>
          <div className="text-sm font-medium opacity-90">Revenu total</div>
        </div>

        <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl p-6 text-white shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <Clock className="w-8 h-8 opacity-80" />
            <span className="text-3xl font-bold">{stats.pending}</span>
          </div>
          <div className="text-sm font-medium opacity-90">En attente</div>
        </div>
      </div>

      {/* Quick Actions Grid */}
      <div>
        <h3 className="text-xl font-bold text-gray-900 mb-4">Actions rapides</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {menuItems.map((item) => {
            const Icon = item.icon
            return (
              <Link
                key={item.href}
                href={item.href}
                className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow border border-gray-200 group"
              >
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-blue-50 rounded-lg group-hover:bg-blue-100 transition-colors">
                    <Icon className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">
                      {item.label}
                    </h4>
                    <p className="text-sm text-gray-600">{item.description}</p>
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
      </div>

      {/* Info Banner */}
      <div className="mt-8 bg-blue-50 border border-blue-200 rounded-xl p-6">
        <div className="flex items-start gap-3">
          <TrendingUp className="w-6 h-6 text-blue-600 flex-shrink-0 mt-0.5" />
          <div>
            <h4 className="font-semibold text-blue-900 mb-1">
              Dashboard opérationnel
            </h4>
            <p className="text-sm text-blue-700">
              Toutes les fonctionnalités de gestion sont disponibles. Utilisez le menu latéral pour naviguer entre les différentes sections.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
