'use client'

import { useSearchParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { Check } from 'lucide-react'
import { useEffect } from 'react'

export default function OrderConfirmationPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const orderNumber = searchParams.get('orderNumber')
  const orderId = searchParams.get('orderId')

  useEffect(() => {
    if (!orderNumber || !orderId) {
      router.push('/')
    }
  }, [orderNumber, orderId, router])

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Success Message */}
        <div className="bg-white rounded-lg shadow-lg p-8 text-center mb-8">
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
              <Check className="w-8 h-8 text-green-600" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Commande confirmée !</h1>
          <p className="text-gray-600 mb-6">
            Merci pour votre achat. Votre commande a été reçue et sera bientôt traitée.
          </p>

          {/* Order Number */}
          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <p className="text-sm text-gray-600 mb-1">Numéro de commande</p>
            <p className="text-2xl font-bold text-gray-900">{orderNumber}</p>
          </div>

          {/* Message */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
            <p className="text-sm text-blue-800">
              Un email de confirmation a été envoyé avec les détails de votre commande et le lien de suivi.
            </p>
          </div>

          {/* What's Next */}
          <div className="text-left bg-gray-50 rounded-lg p-6 mb-6">
            <h2 className="font-semibold text-gray-900 mb-4">Prochaines étapes:</h2>
            <ul className="space-y-3 text-sm text-gray-700">
              <li className="flex gap-3">
                <span className="text-blue-600 font-bold">1.</span>
                <span>Vous recevrez bientôt un email de confirmation avec tous les détails de votre commande</span>
              </li>
              <li className="flex gap-3">
                <span className="text-blue-600 font-bold">2.</span>
                <span>Nous traiterons votre commande et vous enverrons un email de confirmation d'expédition</span>
              </li>
              <li className="flex gap-3">
                <span className="text-blue-600 font-bold">3.</span>
                <span>Suivez votre colis avec le numéro de suivi fourni dans l'email</span>
              </li>
              <li className="flex gap-3">
                <span className="text-blue-600 font-bold">4.</span>
                <span>Recevez votre colis et profitez de votre achat !</span>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
            <p className="text-sm text-yellow-800">
              Des questions ? Contactez notre support:{' '}
              <Link href="/contact" className="font-semibold text-yellow-900 hover:underline">
                Nous contacter
              </Link>
            </p>
          </div>

          {/* Buttons */}
          <div className="flex gap-4 flex-col sm:flex-row">
            <Link
              href="/"
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition text-center"
            >
              Retour à la boutique
            </Link>
            <Link
              href="/cart"
              className="flex-1 bg-gray-600 hover:bg-gray-700 text-white font-semibold py-3 rounded-lg transition text-center"
            >
              Continuer mes achats
            </Link>
          </div>
        </div>

        {/* FAQ */}
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Questions fréquentes</h2>
          <div className="space-y-6">
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Quand recevrai-je ma commande ?</h3>
              <p className="text-gray-700 text-sm">
                Les délais de livraison dépendent de la méthode d'expédition choisie. Vous recevrez un email avec un numéro de suivi une fois votre colis expédié.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Comment suivre ma commande ?</h3>
              <p className="text-gray-700 text-sm">
                Un lien de suivi vous sera envoyé par email dès que votre colis sera en route.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Puis-je modifier ma commande ?</h3>
              <p className="text-gray-700 text-sm">
                Pour modifier ou annuler votre commande, veuillez nous contacter rapidement via notre page de contact.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
