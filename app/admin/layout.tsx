'use client'

import { useEffect, useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'
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
  LogOut,
  Eye,
} from 'lucide-react'

interface Admin {
  id: number
  name: string
  email: string
  role: string
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()
  const pathname = usePathname()
  const [admin, setAdmin] = useState<Admin | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem('token')
    const adminData = localStorage.getItem('admin')

    if (!token || !adminData) {
      router.push('/login')
      return
    }

    setAdmin(JSON.parse(adminData))
    setLoading(false)
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('admin')
    router.push('/login')
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

  const menuItems = [
    {
      icon: LayoutDashboard,
      label: 'Dashboard',
      href: '/admin',
      description: 'Vue d\'ensemble',
    },
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
      icon: ImageIcon,
      label: 'Carousel',
      href: '/admin/carousel',
      description: 'Images de la homepage',
    },
    {
      icon: Star,
      label: 'Avis',
      href: '/admin/reviews',
      description: 'Modérer les reviews',
    },
    {
      icon: User,
      label: 'Profil',
      href: '/admin/profile',
      description: 'Modifier le profil',
    },
    {
      icon: Settings,
      label: 'Paramètres',
      href: '/admin/settings',
      description: 'Configuration du site',
    },
  ]

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="hidden lg:flex lg:flex-col lg:w-72 bg-gradient-to-b from-blue-900 to-blue-800 text-white">
        {/* Logo */}
        <div className="p-6 border-b border-blue-700">
          <h1 className="text-2xl font-bold">Bitcoin Merch</h1>
          <p className="text-sm text-blue-200 mt-1">Administration</p>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-4">
          {menuItems.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href
            
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-6 py-3 transition-colors ${
                  isActive
                    ? 'bg-blue-700 border-l-4 border-yellow-400'
                    : 'hover:bg-blue-700/50'
                }`}
              >
                <Icon className="w-5 h-5" />
                <div>
                  <div className="font-medium">{item.label}</div>
                  <div className="text-xs text-blue-200">{item.description}</div>
                </div>
              </Link>
            )
          })}
        </nav>

        {/* User Info */}
        <div className="p-6 border-t border-blue-700">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-blue-700 rounded-full flex items-center justify-center">
              <User className="w-6 h-6" />
            </div>
            <div className="flex-1">
              <div className="font-medium truncate">{admin?.name}</div>
              <div className="text-xs text-blue-200 truncate">{admin?.email}</div>
            </div>
          </div>
          
          <div className="flex gap-2">
            <Link
              href="/"
              className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-blue-700 rounded-lg hover:bg-blue-600 transition text-sm"
            >
              <Eye className="w-4 h-4" />
              Voir le site
            </Link>
            <button
              onClick={handleLogout}
              className="flex items-center justify-center gap-2 px-3 py-2 bg-red-600 rounded-lg hover:bg-red-700 transition text-sm"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        {/* Header Mobile */}
        <header className="lg:hidden bg-white shadow-sm border-b p-4">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-bold text-gray-900">Dashboard Admin</h1>
            <button
              onClick={handleLogout}
              className="p-2 text-gray-600 hover:text-red-600"
            >
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        </header>

        {/* Page Content */}
        {children}
      </main>
    </div>
  )
}
