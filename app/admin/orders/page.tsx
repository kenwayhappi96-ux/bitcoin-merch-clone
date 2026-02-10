'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ChevronLeft, Eye, MoreHorizontal, AlertCircle } from 'lucide-react'

interface Order {
  id: number
  order_number: string
  customer_email: string
  customer_name: string
  total: number
  status: string
  payment_status: string
  created_at: string
}

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedStatus, setSelectedStatus] = useState<string>('all')

  useEffect(() => {
    fetchOrders()
  }, [selectedStatus])

  const fetchOrders = async () => {
    setIsLoading(true)
    setError(null)

    try {
      const url = selectedStatus === 'all' 
        ? '/api/orders?limit=100' 
        : `/api/orders?status=${selectedStatus}&limit=100`

      const response = await fetch(url)
      const data = await response.json()

      if (data.success) {
        setOrders(data.orders)
      } else {
        setError(data.error || 'Erreur lors du chargement des commandes')
      }
    } catch (err) {
      setError('Erreur réseau')
      console.error('Fetch orders error:', err)
    } finally {
      setIsLoading(false)
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800'
      case 'processing':
        return 'bg-blue-100 text-blue-800'
      case 'shipped':
        return 'bg-purple-100 text-purple-800'
      case 'delivered':
        return 'bg-green-100 text-green-800'
      case 'cancelled':
        return 'bg-red-100 text-red-800'
      case 'refunded':
        return 'bg-gray-100 text-gray-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getPaymentStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'text-yellow-600'
      case 'completed':
        return 'text-green-600'
      case 'failed':
        return 'text-red-600'
      default:
        return 'text-gray-600'
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/admin">
                <ChevronLeft className="w-6 h-6 text-gray-600 hover:text-gray-900" />
              </Link>
              <h1 className="text-3xl font-bold text-gray-900">Commandes</h1>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filter Buttons */}
        <div className="mb-6 flex gap-2 flex-wrap">
          {[
            { id: 'all', label: 'Toutes' },
            { id: 'pending', label: 'En attente' },
            { id: 'processing', label: 'En traitement' },
            { id: 'shipped', label: 'Expédiée' },
            { id: 'delivered', label: 'Livrée' },
            { id: 'cancelled', label: 'Annulée' },
            { id: 'refunded', label: 'Remboursée' },
          ].map((status) => (
            <button
              key={status.id}
              onClick={() => setSelectedStatus(status.id)}
              className={`px-4 py-2 rounded-lg font-medium transition ${
                selectedStatus === status.id
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-700 border border-gray-300 hover:border-gray-400'
              }`}
            >
              {status.label}
            </button>
          ))}
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4 flex items-center gap-3">
            <AlertCircle className="w-5 h-5 text-red-600" />
            <p className="text-sm text-red-600">{error}</p>
          </div>
        )}

        {/* Loading State */}
        {isLoading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin">
              <div className="w-8 h-8 border-4 border-gray-200 border-t-blue-600 rounded-full" />
            </div>
            <p className="mt-4 text-gray-600">Chargement des commandes...</p>
          </div>
        ) : orders.length === 0 ? (
          <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
            <p className="text-gray-600 text-lg">Aucune commande trouvée</p>
          </div>
        ) : (
          <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Numéro
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Client
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Total
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Statut
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Paiement
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {orders.map((order) => (
                  <tr key={order.id} className="hover:bg-gray-50 transition">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Link
                        href={`/admin/orders/${order.id}`}
                        className="text-blue-600 hover:text-blue-700 font-semibold"
                      >
                        {order.order_number}
                      </Link>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {order.customer_name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {order.customer_email}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">
                      ${Number(order.total).toFixed(2)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(order.status)}`}>
                        {order.status}
                      </span>
                    </td>
                    <td className={`px-6 py-4 whitespace-nowrap text-sm font-semibold ${getPaymentStatusColor(order.payment_status)}`}>
                      {order.payment_status}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {formatDate(order.created_at)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <Link href={`/admin/orders/${order.id}`} className="inline-block">
                        <Eye className="w-4 h-4 text-gray-600 hover:text-gray-900" />
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}
