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
      {/* Header */}
      <section className="py-12 px-6">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-center mb-12" style={{ color: '#ff9900' }}>Contact Us</h1>
          
          {/* Visit Us Section */}
          <div className="text-center mb-12">
            <h2 className="text-2xl font-bold mb-3" style={{ color: '#ff9900' }}>
              <a href="https://bitcoinmerch.com/pages/bitcoinmerchstorefront" target="_blank" rel="noopener" className="hover:underline">
                Visit Us In Person
              </a>
            </h2>
            <p className="text-gray-800 mb-4">See our products in person, get expert guidance, or pick up merchandise. Appointment required.</p>
            
            <address className="not-italic text-gray-800 mb-4">
              <strong>Bitcoin Merch Gallery</strong><br />
              21620 Lassen St<br />
              Chatsworth, CA 91311
            </address>
            
            <p className="text-gray-800 mb-6">
              <strong>Gallery Hours:</strong><br />
              Monday – Friday: 9:00 AM – 5:00 PM<br />
              Saturday &amp; Sunday: Closed
            </p>
            
            {/* Map */}
            <div className="rounded-xl overflow-hidden shadow-lg mb-8">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3308.807657320247!2d-118.60086712372146!3d34.25171147306913!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80c296a37e5cc4b7%3A0x9d5f9b314b5c80c1!2s21620%20Lassen%20St%2C%20Chatsworth%2C%20CA%2091311%2C%20USA!5e0!3m2!1sen!2sus!4v1700000000000!5m2!1sen!2sus" 
                width="100%" 
                height="350" 
                style={{ border: 0 }} 
                loading="lazy"
              />
            </div>
            
            <h2 className="text-2xl font-bold mb-8" style={{ color: '#ff9900' }}>
              Need help with an order, product, or visit? Our support team is available through the options below.
            </h2>
          </div>
          
          {/* Contact Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="bg-white p-7 rounded-2xl shadow-lg text-center">
              <div className="text-4xl mb-3">📞</div>
              <h3 className="text-xl font-bold mb-2" style={{ color: '#ff9900' }}>Call Us</h3>
              <p className="text-gray-800 mb-4">
                (877) 5000-BTC<br />
                Fastest support
              </p>
              <a 
                href="tel:+18775000282" 
                className="inline-block mt-3 px-5 py-2 rounded-lg text-white font-semibold hover:opacity-90"
                style={{ backgroundColor: '#ff9900' }}
              >
                Call Now
              </a>
            </div>
            
            <div className="bg-white p-7 rounded-2xl shadow-lg text-center">
              <div className="text-4xl mb-3">✉️</div>
              <h3 className="text-xl font-bold mb-2" style={{ color: '#ff9900' }}>Email Support</h3>
              <p className="text-gray-800 mb-4">
                support@bitcoinmerch.com<br />
                Response within 24 hours
              </p>
              <a 
                href="mailto:support@bitcoinmerch.com" 
                className="inline-block mt-3 px-5 py-2 rounded-lg text-white font-semibold hover:opacity-90"
                style={{ backgroundColor: '#ff9900' }}
              >
                Send Email
              </a>
            </div>
            
            <div className="bg-white p-7 rounded-2xl shadow-lg text-center">
              <div className="text-4xl mb-3">💬</div>
              <h3 className="text-xl font-bold mb-2" style={{ color: '#ff9900' }}>Chat &amp; Telegram</h3>
              <p className="text-gray-800 mb-4">
                Live chat or join our community
              </p>
              <a 
                href="https://t.me/+VXFU4LuGLaxiZjBh" 
                target="_blank" 
                rel="noopener"
                className="inline-block mt-3 px-5 py-2 rounded-lg text-white font-semibold hover:opacity-90"
                style={{ backgroundColor: '#ff9900' }}
              >
                Join Telegram
              </a>
            </div>
          </div>
          
          {/* Support Hours */}
          <div className="text-center mb-12">
            <h2 className="text-2xl font-bold mb-6" style={{ color: '#ff9900' }}>Customer Support Hours</h2>
            <div className="bg-white p-6 rounded-xl shadow-md max-w-lg mx-auto">
              <p className="text-gray-800 mb-2">
                <strong>Monday – Friday:</strong> 24 hours
              </p>
              <p className="text-gray-800 mb-2">
                <strong>Saturday – Sunday:</strong> 9:00 AM – 5:00 PM
              </p>
              <p className="text-gray-800">All hours shown in Pacific Time.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-16 px-6 bg-gray-50">
        <div className="max-w-5xl mx-auto">
          <div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
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

            <div className="relative mb-6">
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