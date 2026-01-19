"use client"

import { Trophy, Star, Gift, TrendingUp, Zap, Shield, Crown } from 'lucide-react'
import { useState, useEffect } from 'react'

export default function BattlePassPage() {
  const [data, setData] = useState({ success: false, products: [] })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await fetch('http://localhost:3000/api/products', {
          cache: 'no-store'
        })
        if (!res.ok) {
          setData({ success: false, products: [] })
          return
        }
        const result = await res.json()
        setData(result)
      } catch (error) {
        console.error('Error fetching products:', error)
        setData({ success: false, products: [] })
      } finally {
        setLoading(false)
      }
    }
    fetchProducts()
  }, [])

  const allProducts = data.products || []
  const battlePassProducts = allProducts.filter((p) => 
    p.category_id === 3 || p.category === 'Battle Pass'
  )
  const mainBattlePass = battlePassProducts[0]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-900">
      {/* Hero Section with Animated Background */}
      <div className="relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute top-1/2 -left-40 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-700"></div>
          <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-pink-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          {loading ? (
            <div className="text-center py-32">
              <div className="inline-block animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-purple-500"></div>
              <p className="mt-4 text-white/60">Chargement...</p>
            </div>
          ) : mainBattlePass ? (
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Left side - Product Image */}
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-3xl blur-2xl opacity-30 group-hover:opacity-50 transition-opacity duration-500"></div>
                <div className="relative bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm rounded-3xl p-8 border border-purple-500/20">
                  {mainBattlePass.image ? (
                    <img
                      src={mainBattlePass.image}
                      alt={mainBattlePass.name}
                      className="w-full h-auto rounded-2xl shadow-2xl transform group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="aspect-square bg-gradient-to-br from-purple-900/50 to-pink-900/50 rounded-2xl flex items-center justify-center">
                      <Trophy className="w-32 h-32 text-purple-400/50" />
                    </div>
                  )}
                  
                  {/* Floating badge */}
                  <div className="absolute -top-4 -right-4 bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-bold px-6 py-3 rounded-full shadow-lg transform rotate-12 animate-pulse">
                    <Crown className="w-5 h-5 inline mr-2" />
                    EXCLUSIF
                  </div>
                </div>
              </div>

              {/* Right side - Product Info */}
              <div className="space-y-6">
                <div className="inline-flex items-center gap-2 bg-purple-500/20 border border-purple-500/30 rounded-full px-4 py-2 text-purple-300 text-sm font-medium">
                  <Zap className="w-4 h-4" />
                  Abonnement Mensuel
                </div>

                <h1 className="text-5xl lg:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 leading-tight">
                  {mainBattlePass.name}
                </h1>

                <p className="text-xl text-slate-300 leading-relaxed">
                  {mainBattlePass.description || 'Devenez un pionnier de la communauté minière à domicile. Rejoignez l\'abonnement mensuel exclusif.'}
                </p>

                <div className="flex items-baseline gap-4">
                  <span className="text-6xl font-black text-white">
                    ${mainBattlePass.price}
                  </span>
                  {mainBattlePass.compare_at_price && (
                    <span className="text-3xl text-slate-500 line-through">
                      ${mainBattlePass.compare_at_price}
                    </span>
                  )}
                  <span className="text-slate-400 text-lg">/mois</span>
                </div>

                <button className="group relative w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-bold text-xl py-6 px-8 rounded-2xl shadow-2xl transform hover:scale-105 transition-all duration-300 overflow-hidden">
                  <span className="relative z-10 flex items-center justify-center gap-3">
                    <Trophy className="w-6 h-6" />
                    Obtenir votre Battle Pass
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-pink-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </button>

                {/* Trust badges */}
                <div className="flex items-center gap-6 pt-4">
                  <div className="flex items-center gap-2">
                    <Shield className="w-5 h-5 text-green-400" />
                    <span className="text-sm text-slate-400">Paiement sécurisé</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Star className="w-5 h-5 text-yellow-400" />
                    <span className="text-sm text-slate-400">4.9/5 (2,450 avis)</span>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-32">
              <Trophy className="w-20 h-20 text-purple-400/50 mx-auto mb-4" />
              <h2 className="text-3xl font-bold text-white mb-2">Battle Pass</h2>
              <p className="text-slate-400">Chargement des informations...</p>
            </div>
          )}
        </div>
      </div>

      {/* Membership Perks Section */}
      <div className="relative py-24 bg-gradient-to-b from-transparent via-slate-900/50 to-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 mb-4">
              Avantages du Battle Pass
            </h2>
            <p className="text-xl text-slate-400">Des avantages exclusifs qui changent la donne</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Perk 1 */}
            <div className="group relative bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-sm rounded-3xl p-8 border border-purple-500/20 hover:border-purple-500/50 transition-all duration-300 hover:transform hover:-translate-y-2">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-600/10 to-pink-600/10 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              
              <div className="relative">
                <div className="bg-gradient-to-br from-purple-600 to-pink-600 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <TrendingUp className="w-8 h-8 text-white" />
                </div>

                <h3 className="text-2xl font-bold text-white mb-4">
                  15% de réduction
                </h3>

                <p className="text-slate-300 leading-relaxed">
                  15% de réduction sur les mineurs Bitaxe et les pièces détachées/mises à niveau Bitaxe - Tous les produits dérivés Bitcoin sous "Mineurs de loterie exclusifs" - Articles en magasin et "Meilleures ventes" comme des t-shirts, des coussins et plus encore.
                </p>
              </div>
            </div>

            {/* Perk 2 */}
            <div className="group relative bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-sm rounded-3xl p-8 border border-purple-500/20 hover:border-purple-500/50 transition-all duration-300 hover:transform hover:-translate-y-2">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-600/10 to-pink-600/10 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              
              <div className="relative">
                <div className="bg-gradient-to-br from-purple-600 to-pink-600 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Gift className="w-8 h-8 text-white" />
                </div>

                <h3 className="text-2xl font-bold text-white mb-4">
                  Mineur gratuit chaque mois
                </h3>

                <p className="text-slate-300 leading-relaxed">
                  Lors de votre première commande en tant que membre Bitcoin Battle Pass, nous inclurons un cadeau aléatoire gratuit (Bitaxe, pépite d'or, etc.) et un mineur gratuit livré à votre domicile chaque mois.
                </p>
              </div>
            </div>

            {/* Perk 3 */}
            <div className="group relative bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-sm rounded-3xl p-8 border border-purple-500/20 hover:border-purple-500/50 transition-all duration-300 hover:transform hover:-translate-y-2">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-600/10 to-pink-600/10 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              
              <div className="relative">
                <div className="bg-gradient-to-br from-purple-600 to-pink-600 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Star className="w-8 h-8 text-white" />
                </div>

                <h3 className="text-2xl font-bold text-white mb-4">
                  Réduction cumulable
                </h3>

                <p className="text-slate-300 leading-relaxed">
                  Réduction cumulable à volonté. 20% de réduction sur une sélection de produits dès 2 articles achetés. Offre valable sur l'ensemble du magasin pendant les soldes de fin d'année.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Final CTA Section */}
      <div className="relative py-24">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-900/20 to-pink-900/20"></div>
        
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Trophy className="w-20 h-20 text-purple-400 mx-auto mb-6 animate-bounce" />
          
          <h2 className="text-4xl lg:text-5xl font-black text-white mb-6">
            Ajoutez votre Battle Pass au panier
          </h2>
          
          <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
            Rejoignez des milliers de mineurs qui profitent déjà des avantages exclusifs du Battle Pass
          </p>

          <button className="group relative bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-bold text-xl py-6 px-12 rounded-2xl shadow-2xl transform hover:scale-105 transition-all duration-300 overflow-hidden">
            <span className="relative z-10 flex items-center justify-center gap-3">
              <Crown className="w-6 h-6" />
              Rejoindre maintenant
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-pink-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </button>

          <p className="mt-6 text-sm text-slate-400">
            ✓ Annulation possible à tout moment • ✓ Satisfait ou remboursé • ✓ Support 24/7
          </p>
        </div>
      </div>
    </div>
  )
}