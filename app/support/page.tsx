'use client'

import { Phone, Mail, MessageCircle, MapPin, Clock } from 'lucide-react'
import { useState } from 'react'

export default function SupportPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Form submitted:', formData)
  }

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-[#3b82f6] to-[#2563eb] text-white py-16 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Contact Us</h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto">
            Need help with an order, product, or visit? Our support team is available through the options below.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Contact Methods */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {/* Call Us */}
          <div className="bg-white rounded-lg shadow-md p-8 text-center hover:shadow-lg transition">
            <div className="text-5xl mb-4">📞</div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">Call Us</h3>
            <p className="text-2xl font-bold text-[#3b82f6] mb-2">(877) 5000-BTC</p>
            <p className="text-sm text-gray-600 mb-4">Fastest support</p>
            <a
              href="tel:8775000282"
              className="inline-block bg-[#3b82f6] text-white px-6 py-2 rounded-lg font-semibold hover:bg-[#2563eb] transition"
            >
              Call Now
            </a>
          </div>

          {/* Email Support */}
          <div className="bg-white rounded-lg shadow-md p-8 text-center hover:shadow-lg transition">
            <div className="text-5xl mb-4">✉️</div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">Email Support</h3>
            <p className="text-lg font-semibold text-gray-700 mb-2">support@bitcoinmerch.com</p>
            <p className="text-sm text-gray-600 mb-4">Response within 24 hours</p>
            <a
              href="mailto:support@bitcoinmerch.com"
              className="inline-block bg-green-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-green-700 transition"
            >
              Send Email
            </a>
          </div>

          {/* Chat & Telegram */}
          <div className="bg-white rounded-lg shadow-md p-8 text-center hover:shadow-lg transition">
            <div className="text-5xl mb-4">💬</div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">Chat & Telegram</h3>
            <p className="text-lg font-semibold text-gray-700 mb-2">Live chat or join our community</p>
            <p className="text-sm text-gray-600 mb-4">&nbsp;</p>
            <a
              href="https://t.me/bitcoinmerch"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-purple-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-purple-700 transition"
            >
              Join Telegram
            </a>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Left Column - Hours & Location */}
          <div className="space-y-8">
            {/* Support Hours */}
            <div className="bg-white rounded-lg shadow-md p-8">
              <div className="flex items-center gap-3 mb-6">
                <Clock className="w-8 h-8 text-[#3b82f6]" />
                <h2 className="text-2xl font-bold text-gray-800">Customer Support Hours</h2>
              </div>
              <div className="space-y-3 text-gray-700">
                <div className="flex justify-between items-center py-2 border-b">
                  <span className="font-semibold">Monday – Friday:</span>
                  <span>24 hours</span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="font-semibold">Saturday – Sunday:</span>
                  <span>9:00 AM – 5:00 PM</span>
                </div>
              </div>
              <p className="text-sm text-gray-500 mt-4 italic">All hours shown in Pacific Time.</p>
            </div>

            {/* Visit Us */}
            <div className="bg-white rounded-lg shadow-md p-8">
              <div className="flex items-center gap-3 mb-6">
                <MapPin className="w-8 h-8 text-[#3b82f6]" />
                <h2 className="text-2xl font-bold text-gray-800">Visit Us In Person</h2>
              </div>
              <p className="text-gray-600 mb-6">
                See our products in person, get expert guidance, or pick up merchandise. Appointment required.
              </p>
              <div className="space-y-4">
                <div>
                  <h3 className="font-bold text-lg text-gray-800 mb-2">Bitcoin Merch Gallery</h3>
                  <p className="text-gray-700">
                    21620 Lassen St<br />
                    Chatsworth, CA 91311
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">Gallery Hours:</h4>
                  <div className="text-gray-700 space-y-1">
                    <p>Monday – Friday: 9:00 AM – 5:00 PM</p>
                    <p>Saturday & Sunday: Closed</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Map */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3298.7194890367486!2d-118.61437!3d34.257!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80c29b5e1e5e5e5e%3A0x1e5e5e5e5e5e5e5e!2s21620%20Lassen%20St%2C%20Chatsworth%2C%20CA%2091311!5e0!3m2!1sen!2sus!4v1234567890"
              width="100%"
              height="100%"
              style={{ border: 0, minHeight: '500px' }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>

        {/* Contact Form */}
        <div className="bg-white rounded-lg shadow-md p-8">
          <form onSubmit={handleSubmit} className="max-w-2xl mx-auto space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
                Your name
              </label>
              <input
                type="text"
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3b82f6] focus:border-transparent outline-none transition"
                placeholder="Enter your name"
                required
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                Your email
              </label>
              <input
                type="email"
                id="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3b82f6] focus:border-transparent outline-none transition"
                placeholder="Enter your email"
                required
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-2">
                Your message
              </label>
              <textarea
                id="message"
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                rows={6}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3b82f6] focus:border-transparent outline-none transition resize-none"
                placeholder="How can we help you?"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-[#3b82f6] text-white py-3 rounded-lg font-semibold hover:bg-[#2563eb] transition"
            >
              Send message
            </button>
          </form>
        </div>
      </div>
    </main>
  )
}
