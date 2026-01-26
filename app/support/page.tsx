'use client'

import { useState } from 'react'

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Form submitted:', formData)
    // Ajoute ici l'envoi réel plus tard (API route, etc.)
  }

  return (
    <main className="bg-white min-h-screen">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16 max-w-6xl">
        {/* ================== TITRE PRINCIPAL ================== */}
        <header className="text-center mb-12 lg:mb-16">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900">Contact Us</h1>
        </header>

        {/* ================== FULL-BLEED INNER CONTENT ================== */}
        <div className="relative">
          {/* Simulation full-bleed avec large container */}
          <div className="max-w-[1100px] mx-auto">
            {/* Visit Us In Person */}
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-[#ff9900] mb-4">
                <a
                  href="https://bitcoinmerch.com/pages/bitcoinmerchstorefront"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline"
                >
                  Visit Us In Person
                </a>
              </h2>
              <p className="text-lg text-gray-700 max-w-3xl mx-auto mb-8">
                See our products in person, get expert guidance, or pick up merchandise. Appointment required.
              </p>

              <address className="not-italic text-gray-800 text-lg mb-6">
                <strong>Bitcoin Merch Gallery</strong><br />
                21620 Lassen St<br />
                Chatsworth, CA 91311
              </address>

              <p className="text-gray-800 text-lg mb-10">
                <strong>Gallery Hours:</strong><br />
                Monday – Friday: 9:00 AM – 5:00 PM<br />
                Saturday & Sunday: Closed
              </p>

              {/* Google Map */}
              <div className="rounded-xl overflow-hidden shadow-2xl max-w-4xl mx-auto mb-16">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3308.807657320247!2d-118.60086712372146!3d34.25171147306913!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80c296a37e5cc4b7%3A0x9d5f9b314b5c80c1!2s21620%20Lassen%20St%2C%20Chatsworth%2C%20CA%2091311%2C%20USA!5e0!3m2!1sen!2sus!4v1700000000000!5m2!1sen!2sus"
                  width="100%"
                  height="450"
                  style={{ border: 0 }}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Bitcoin Merch Gallery location"
                ></iframe>
              </div>
            </div>

            {/* Need help + Contact Cards */}
            <h2 className="text-3xl md:text-4xl font-bold text-[#ff9900] text-center mb-12">
              Need help with an order, product, or visit? Our support team is available through the options below.
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
              {/* Phone Card */}
              <div className="bg-white p-8 rounded-2xl shadow-xl text-center transition-all hover:shadow-2xl">
                <div className="text-6xl mb-6">📞</div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Call Us</h3>
                <p className="text-gray-600 mb-6 text-lg">
                  (877) 5000-BTC<br />
                  <span className="text-sm">Fastest support</span>
                </p>
                <a
                  href="tel:+18775000282"
                  className="inline-block bg-[#ff9900] text-white font-semibold px-8 py-4 rounded-lg hover:bg-[#e68a00] transition text-lg"
                >
                  Call Now
                </a>
              </div>

              {/* Email Card */}
              <div className="bg-white p-8 rounded-2xl shadow-xl text-center transition-all hover:shadow-2xl">
                <div className="text-6xl mb-6">✉️</div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Email Support</h3>
                <p className="text-gray-600 mb-6 text-lg">
                  support@bitcoinmerch.com<br />
                  <span className="text-sm">Response within 24 hours</span>
                </p>
                <a
                  href="mailto:support@bitcoinmerch.com"
                  className="inline-block bg-[#ff9900] text-white font-semibold px-8 py-4 rounded-lg hover:bg-[#e68a00] transition text-lg"
                >
                  Send Email
                </a>
              </div>

              {/* Telegram Card */}
              <div className="bg-white p-8 rounded-2xl shadow-xl text-center transition-all hover:shadow-2xl">
                <div className="text-6xl mb-6">💬</div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Chat & Telegram</h3>
                <p className="text-gray-600 mb-6 text-lg">
                  Live chat or join our community
                </p>
                <a
                  href="https://t.me/+VXFU4LuGLaxiZjBh"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block bg-[#ff9900] text-white font-semibold px-8 py-4 rounded-lg hover:bg-[#e68a00] transition text-lg"
                >
                  Join Telegram
                </a>
              </div>
            </div>

            {/* Customer Support Hours - Centered */}
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-[#ff9900] mb-8">Customer Support Hours</h2>
              <div className="bg-white p-10 rounded-2xl shadow-xl max-w-md mx-auto">
                <p className="text-gray-800 text-xl leading-relaxed">
                  <strong>Monday – Friday:</strong> 24 hours<br /><br />
                  <strong>Saturday – Sunday:</strong> 9:00 AM – 5:00 PM<br /><br />
                  <span className="text-base text-gray-600">All hours shown in Pacific Time.</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ================== FORMULAIRE ================== */}
      <section className="bg-gray-50 py-16 lg:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          <form onSubmit={handleSubmit} className="space-y-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="relative">
                <input
                  id="name"
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="peer w-full px-5 pt-8 pb-3 border border-gray-300 rounded-lg focus:border-black focus:ring-0 outline-none"
                  placeholder=" "
                  required
                />
                <label
                  htmlFor="name"
                  className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-500 text-base transition-all peer-focus:top-3 peer-focus:text-xs peer-focus:text-gray-700 peer-not-placeholder-shown:top-3 peer-not-placeholder-shown:text-xs pointer-events-none"
                >
                  Your name
                </label>
              </div>

              <div className="relative">
                <input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="peer w-full px-5 pt-8 pb-3 border border-gray-300 rounded-lg focus:border-black focus:ring-0 outline-none"
                  placeholder=" "
                  required
                />
                <label
                  htmlFor="email"
                  className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-500 text-base transition-all peer-focus:top-3 peer-focus:text-xs peer-focus:text-gray-700 peer-not-placeholder-shown:top-3 peer-not-placeholder-shown:text-xs pointer-events-none"
                >
                  Your email
                </label>
              </div>
            </div>

            <div className="relative">
              <textarea
                id="message"
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                rows={8}
                className="peer w-full px-5 pt-8 pb-3 border border-gray-300 rounded-lg focus:border-black focus:ring-0 outline-none resize-none"
                placeholder=" "
                required
              />
              <label
                htmlFor="message"
                className="absolute left-5 top-6 text-gray-500 text-base transition-all peer-focus:top-3 peer-focus:text-xs peer-focus:text-gray-700 peer-not-placeholder-shown:top-3 peer-not-placeholder-shown:text-xs pointer-events-none"
              >
                Your message
              </label>
            </div>

            <div className="text-center">
              <button
                type="submit"
                className="bg-black text-white font-bold px-12 py-5 rounded-lg hover:bg-gray-900 transition text-lg min-w-[220px]"
              >
                Send message
              </button>
            </div>
          </form>
        </div>
      </section>
    </main>
  )
}