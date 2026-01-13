'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      })

      const data = await response.json()

      if (!response.ok) {
        setError(data.error || 'Erreur de connexion')
        setLoading(false)
        return
      }

      // Stocker le token et les infos admin
      localStorage.setItem('token', data.token)
      localStorage.setItem('admin', JSON.stringify(data.admin))

      // Rediriger vers le dashboard
      router.push('/admin')
    } catch (err) {
      setError('Erreur serveur, vérifiez votre connexion')
      setLoading(false)
    }
  }

  const handleGoogleLogin = () => {
    console.log('Google login clicked')
    // TODO: Implement Google OAuth
  }

  const handleFacebookLogin = () => {
    console.log('Facebook login clicked')
    // TODO: Implement Facebook OAuth
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8">
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <Link href="/">
            <Image 
              src="/ref/logo.png" 
              alt="Bitcoin Merch" 
              width={200}
              height={60}
              className="h-16 w-auto"
            />
          </Link>
        </div>

        {/* Title */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Administration</h1>
          <p className="text-gray-600">Connectez-vous pour accéder au dashboard</p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-600 text-sm">{error}</p>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3b82f6] focus:border-transparent outline-none transition"
              placeholder="admin@bitcoinmerch.com"
              required
              disabled={loading}
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-2">
              Mot de passe
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3b82f6] focus:border-transparent outline-none transition"
              placeholder="••••••••"
              required
              disabled={loading}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#3b82f6] text-white py-3 rounded-lg font-semibold hover:bg-[#2563eb] transition disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {loading ? 'Connexion...' : 'Se connecter'}
          </button>
        </form>

        {/* Footer */}
        <div className="mt-6 text-center text-sm text-gray-500">
          <p>Identifiants par défaut:</p>
          <p className="font-mono text-xs mt-1">admin@bitcoinmerch.com / Admin@123</p>
        </div>
      </div>
    </div>
  )
}
