import { Trophy, Star, Gift, TrendingUp } from 'lucide-react'
import ProductGrid from '@/components/ProductGrid'

async function getProducts() {
  try {
    const res = await fetch('http://localhost:3000/api/products', {
      cache: 'no-store'
    })
    
    if (!res.ok) {
      return { success: false, products: [] }
    }
    
    return await res.json()
  } catch (error) {
    console.error('Error fetching products:', error)
    return { success: false, products: [] }
  }
}

export default async function BattlePassPage() {
  const data = await getProducts()
  const allProducts = data.products || []
  
  // Filtrer les produits de la catégorie Battle Pass (category_id = 3)
  const battlePassProducts = allProducts.filter((p: any) => 
    p.category_id === 3 || p.category === 'Battle Pass'
  )
  
  const mainBattlePass = battlePassProducts[0]

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-orange-500 to-orange-600 py-16 px-4">
        <div className="max-w-7xl mx-auto">
          {mainBattlePass ? (
            <>
              <div className="flex justify-center mb-6">
                {mainBattlePass.image ? (
                  <img 
                    src={mainBattlePass.image} 
                    alt={mainBattlePass.name}
                    className="w-48 h-48 object-contain"
                  />
                ) : (
                  <Trophy className="w-16 h-16" />
                )}
              </div>
              <div className="text-center text-white">
                <h1 className="text-4xl md:text-5xl font-bold mb-3">
                  {mainBattlePass.name}
                </h1>
                <div className="flex items-center justify-center gap-3 mb-4">
                  <span className="text-3xl font-bold">
                    ${mainBattlePass.price}
                  </span>
                  {mainBattlePass.compare_at_price && (
                    <span className="text-2xl line-through opacity-75">
                      ${mainBattlePass.compare_at_price}
                    </span>
                  )}
                </div>
                <p className="text-xl mb-8 max-w-3xl mx-auto">
                  {mainBattlePass.description || 'Devenez un pionnier de la communauté minière à domicile. Rejoignez l\'abonnement mensuel exclusif.'}
                </p>
                <button className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-4 rounded-lg text-lg font-bold transition shadow-lg">
                  Obtenir votre Battle Pass
                </button>
              </div>
            </>
          ) : (
            <div className="text-center text-white">
              <div className="flex justify-center mb-6">
                <Trophy className="w-16 h-16" />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold">Battle Pass</h1>
              <p className="text-xl mt-4">Chargement...</p>
            </div>
          )}
        </div>
      </div>

      {/* Membership Perks Section - 3 avantages seulement */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12">
            Avantages du Battle Pass
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gray-50 p-8 rounded-lg">
              <div className="flex justify-center mb-4">
                <div className="bg-orange-100 p-4 rounded-full">
                  <Star className="w-12 h-12 text-orange-600" />
                </div>
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-3 text-center">
                15% de réduction sur la plupart des articles du magasin
              </h3>
              <p className="text-gray-600 text-center">
                15% de réduction sur les mineurs Bitaxe et les pièces détachées/mises à niveau Bitaxe - Tous les produits dérivés Bitcoin sous "Mineurs de loterie exclusifs" - Articles en magasin et "Meilleures ventes" comme des t-shirts, des coussins et plus encore.
              </p>
            </div>

            <div className="bg-gray-50 p-8 rounded-lg">
              <div className="flex justify-center mb-4">
                <div className="bg-blue-100 p-4 rounded-full">
                  <Gift className="w-12 h-12 text-blue-600" />
                </div>
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-3 text-center">
                Mineur gratuit chaque mois
              </h3>
              <p className="text-gray-600 text-center">
                Lors de votre première commande en tant que membre Bitcoin Battle Pass, nous inclurons un cadeau aléatoire gratuit (Bitaxe, pépite d'or, etc.) et un mineur gratuit livré à votre domicile chaque mois.
              </p>
            </div>

            <div className="bg-gray-50 p-8 rounded-lg">
              <div className="flex justify-center mb-4">
                <div className="bg-green-100 p-4 rounded-full">
                  <TrendingUp className="w-12 h-12 text-green-600" />
                </div>
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-3 text-center">
                Réduction cumulable
              </h3>
              <p className="text-gray-600 text-center">
                Réduction cumulable à volonté. 20% de réduction sur une sélection de produits dès 2 articles achetés. Offre valable sur l'ensemble du magasin pendant les soldes de fin d'année.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">
            Ajoutez votre Battle Pass au panier
          </h2>
          <button className="bg-white text-orange-600 px-10 py-5 rounded-lg text-xl font-bold hover:bg-gray-100 transition shadow-lg">
            Rejoindre maintenant
          </button>
        </div>
      </section>
    </main>
  )
}