'use client'

import { useState } from 'react'

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Form submitted:', formData)
  }

  return (
    <main className="min-h-screen bg-white">
      {/* Contact Header Section */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-8 text-gray-900">Contact Us</h1>
          
          <div className="text-gray-700 space-y-6">
            <h2 className="text-xl md:text-2xl font-normal">
              We're here to assist you with any inquiries or support you may need. Reach out to us through the following channels:
            </h2>
            
            {/* Contact Info Section */}
            <div className="space-y-6 text-center max-w-2xl mx-auto">
              <div>
                <h2 className="text-xl md:text-2xl font-bold mb-2">📞 Phone</h2>
                <p>
                  <a href="tel:+18775000282" className="text-blue-600 hover:underline">
                    (877) 5000-BTC
                  </a>
                </p>
              </div>

              <div>
                <h2 className="text-xl md:text-2xl font-bold mb-2">✉️ Email</h2>
                <p>
                  <a href="mailto:support@bitcoinmerch.com" className="text-blue-600 hover:underline">
                    support@bitcoinmerch.com
                  </a>
                </p>
              </div>

              <div>
                <h2 className="text-xl md:text-2xl font-bold mb-2">💬 Chat & Telegram</h2>
                <p>
                  Click on "Chat with us" or{' '}
                  <a 
                    href="https://t.me/+VXFU4LuGLaxiZjBh" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    Join <strong>Bitcoin Merch</strong> Telegram
                  </a>
                </p>
              </div>

              <div>
                <h2 className="text-xl md:text-2xl font-bold mb-2">Customer Support Hours</h2>
                <p>
                  <strong>Monday – Friday:</strong> 24 hours<br />
                  <strong>Saturday – Sunday:</strong> 9:00 AM – 5:00 PM
                </p>
              </div>

              <p>Our dedicated support team is ready to assist you with any questions or concerns.</p>
            </div>

            <div className="pt-4">
              <a 
                href="/collections/all" 
                className="inline-block bg-black text-white px-8 py-3 rounded hover:bg-gray-800 transition font-semibold"
              >
                Our products
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="relative">
                <input
                  type="text"
                  id="contact-form-name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 pt-6 pb-2 border border-gray-300 rounded focus:border-black focus:outline-none peer"
                  placeholder=" "
                  required
                />
                <label
                  htmlFor="contact-form-name"
                  className="absolute left-4 top-4 text-gray-500 transition-all pointer-events-none peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-focus:top-2 peer-focus:text-xs peer-[:not(:placeholder-shown)]:top-2 peer-[:not(:placeholder-shown)]:text-xs"
                >
                  Your name
                </label>
              </div>

              <div className="relative">
                <input
                  type="email"
                  id="contact-form-email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 pt-6 pb-2 border border-gray-300 rounded focus:border-black focus:outline-none peer"
                  placeholder=" "
                  required
                />
                <label
                  htmlFor="contact-form-email"
                  className="absolute left-4 top-4 text-gray-500 transition-all pointer-events-none peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-focus:top-2 peer-focus:text-xs peer-[:not(:placeholder-shown)]:top-2 peer-[:not(:placeholder-shown)]:text-xs"
                >
                  Your email
                </label>
              </div>
            </div>

            <div className="relative">
              <textarea
                id="contact-form-message"
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                rows={8}
                className="w-full px-4 pt-6 pb-2 border border-gray-300 rounded focus:border-black focus:outline-none resize-none peer"
                placeholder=" "
                required
              />
              <label
                htmlFor="contact-form-message"
                className="absolute left-4 top-4 text-gray-500 transition-all pointer-events-none peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-focus:top-2 peer-focus:text-xs peer-[:not(:placeholder-shown)]:top-2 peer-[:not(:placeholder-shown)]:text-xs"
              >
                Your message
              </label>
            </div>

            <div className="text-center">
              <button
                onClick={handleSubmit}
                className="bg-black text-white px-12 py-3 rounded hover:bg-gray-800 transition font-semibold min-w-[200px]"
              >
                Send message
              </button>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
