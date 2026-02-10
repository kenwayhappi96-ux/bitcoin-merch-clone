'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { ChevronLeft, AlertCircle, Check } from 'lucide-react'

interface OrderItem {
  id: number
  product_name: string
  quantity: number
  price: number
  discount_price?: number
  total: number
}

interface Order {
  id: number
  order_number: string
  customer_email: string
  customer_name: string
  customer_phone?: string
  company?: string
  shipping_address: string
  shipping_city: string
  shipping_zip: string
  shipping_country: string
  shipping_method?: string
  shipping_cost: number
  shipping_protection: boolean
  subtotal: number
  total: number
  order_instructions?: string
  payment_method: string
  payment_status: string
  status: string
  created_at: string
  updated_at: string
  tracking_number?: string
  items?: OrderItem[]
}

export default function AdminOrderDetailPage() {
  const params = useParams()
  const router = useRouter()
  const orderId = params.id

  const [order, setOrder] = useState<Order | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isUpdating, setIsUpdating] = useState(false)
  const [newStatus, setNewStatus] = useState<string>('')
  const [newPaymentStatus, setNewPaymentStatus] = useState<string>('')
  const [trackingNumber, setTrackingNumber] = useState<string>('')

  useEffect(() => {
    fetchOrder()
  }, [orderId])

  const fetchOrder = async () => {
    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch(`/api/orders/${orderId}`)
      const data = await response.json()

      if (data.success) {
        setOrder(data.order)
        setNewStatus(data.order.status)
        setNewPaymentStatus(data.order.payment_status)
        setTrackingNumber(data.order.tracking_number || '')
      } else {
        setError(data.error || 'Commande non trouvée')
      }
    } catch (err) {
      setError('Erreur réseau')
      console.error('Fetch order error:', err)
    } finally {
      setIsLoading(false)
    }
  }

  const handleUpdateStatus = async () => {
    if (!order) return

    setIsUpdating(true)

    try {
      const response = await fetch(`/api/orders/${orderId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          orderStatus: newStatus,
          paymentStatus: newPaymentStatus,
          trackingNumber,
        }),
      })

      const data = await response.json()

      if (data.success) {
        setOrder((prev) =>
          prev
            ? {
                ...prev,
                status: newStatus,
                payment_status: newPaymentStatus,
              }
            : null
        )
        alert('Commande mise à jour avec succès')
      } else {
        setError(data.error || 'Erreur lors de la mise à jour')
      }
    } catch (err) {
      setError('Erreur réseau')
      console.error('Update order error:', err)
    } finally {
      setIsUpdating(false)
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

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'long',
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
              <Link href="/admin/orders">
                <ChevronLeft className="w-6 h-6 text-gray-600 hover:text-gray-900" />
              </Link>
              <h1 className="text-3xl font-bold text-gray-900">Détail de la commande</h1>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4 flex items-center gap-3">
            <AlertCircle className="w-5 h-5 text-red-600" />
            <p className="text-sm text-red-600">{error}</p>
          </div>
        )}

        {isLoading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin">
              <div className="w-8 h-8 border-4 border-gray-200 border-t-blue-600 rounded-full" />
            </div>
            <p className="mt-4 text-gray-600">Chargement...</p>
          </div>
        ) : order ? (
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Order Info */}
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">{order.order_number}</h2>
                    <p className="text-gray-600 mt-1">Créée le {formatDate(order.created_at)}</p>
                  </div>
                    <span className={`inline-block px-4 py-2 rounded-lg font-semibold ${getStatusColor(order.status)}`}>
                      {order.status}
                  </span>
                </div>
              </div>

              {/* Customer Info */}
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Informations client</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Nom</p>
                    <p className="font-semibold text-gray-900">
                      {order.customer_name}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Email</p>
                    <p className="font-semibold text-gray-900">{order.customer_email}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Téléphone</p>
                    <p className="font-semibold text-gray-900">{order.customer_phone || 'N/A'}</p>
                  </div>
                </div>
              </div>

              {/* Shipping Address */}
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Adresse de livraison</h3>
                <p className="text-gray-900 font-semibold">{order.shipping_address}</p>
                <p className="text-gray-900">
                  {order.shipping_zip} {order.shipping_city}
                </p>
                <p className="text-gray-900">{order.shipping_country}</p>
              </div>

              {/* Order Items */}
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Articles</h3>
                <div className="space-y-4">
                  {order.items?.map((item) => (
                    <div key={item.id} className="flex justify-between py-2 border-b border-gray-200 last:border-b-0">
                      <div>
                        <p className="font-semibold text-gray-900">{item.product_name}</p>
                        <p className="text-sm text-gray-600">Quantité: {item.quantity}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-gray-900">${Number(item.total).toFixed(2)}</p>
                        {item.discount_price && (
                          <p className="text-sm text-gray-600 line-through">${(Number(item.price) * item.quantity).toFixed(2)}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Summary */}
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Résumé</h3>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-semibold text-gray-900">${Number(order.subtotal).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Shipping</span>
                    <span className="font-semibold text-gray-900">${Number(order.shipping_cost).toFixed(2)}</span>
                  </div>
                  {order.shipping_protection && (
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Protection</span>
                      <span className="font-semibold text-gray-900">$13.50</span>
                    </div>
                  )}
                  <div className="border-t border-gray-200 pt-3 flex justify-between">
                    <span className="font-semibold text-gray-900">Total</span>
                    <span className="text-lg font-bold text-gray-900">${Number(order.total).toFixed(2)}</span>
                  </div>
                </div>
              </div>

              {/* Shipping Info */}
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Expédition</h3>
                <div className="space-y-2 text-sm">
                  <p>
                    <span className="text-gray-600">Coût:</span>
                    <span className="font-semibold text-gray-900 ml-2">${Number(order.shipping_cost).toFixed(2)}</span>
                  </p>
                  {order.tracking_number && (
                    <p>
                      <span className="text-gray-600">Numéro de suivi:</span>
                      <span className="font-semibold text-gray-900 ml-2">{order.tracking_number}</span>
                    </p>
                  )}
                </div>
              </div>

              {/* Payment Info */}
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Paiement</h3>
                <div className="space-y-2 text-sm">
                  <p>
                    <span className="text-gray-600">Méthode:</span>
                    <span className="font-semibold text-gray-900 ml-2">{order.payment_method}</span>
                  </p>
                  <p>
                    <span className="text-gray-600">Statut:</span>
                    <span className={`font-semibold ml-2 ${order.payment_status === 'completed' ? 'text-green-600' : 'text-yellow-600'}`}>
                      {order.payment_status}
                    </span>
                  </p>
                </div>
              </div>

              {/* Update Status */}
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Mettre à jour</h3>
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Statut de la commande</label>
                    <select
                      value={newStatus}
                      onChange={(e) => setNewStatus(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                    >
                      <option value="pending">En attente</option>
                      <option value="processing">En traitement</option>
                      <option value="shipped">Expédiée</option>
                      <option value="delivered">Livrée</option>
                      <option value="cancelled">Annulée</option>
                      <option value="refunded">Remboursée</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Statut du paiement</label>
                    <select
                      value={newPaymentStatus}
                      onChange={(e) => setNewPaymentStatus(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                    >
                      <option value="pending">En attente</option>
                      <option value="paid">Payé</option>
                      <option value="failed">Échoué</option>
                      <option value="refunded">Remboursé</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Numéro de suivi</label>
                    <input
                      type="text"
                      value={trackingNumber}
                      onChange={(e) => setTrackingNumber(e.target.value)}
                      placeholder="Ex: 1Z999AA10123456784"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                  </div>
                  <button
                    onClick={handleUpdateStatus}
                    disabled={isUpdating}
                    className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-semibold py-2 rounded-lg transition"
                  >
                    {isUpdating ? 'Mise à jour...' : 'Mettre à jour'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
            <p className="text-gray-600 text-lg">Commande non trouvée</p>
          </div>
        )}
      </div>
    </div>
  )
}
