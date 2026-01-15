'use client'

import { contact_method } from '@/lib/constants'
import { Phone, Mail, MessageCircle, MapPin, Clock } from 'lucide-react'
import Link from 'next/link'
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
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="max-w-7xl text-center py-16 px-4">
          <h1 className="heading h1 font-bold text-black">Contact Us</h1>

          {/* Visit Us */}
            <div className="page__description rte p-8">
              <h2>
                <Link href={'/pages/bitcoinmergefront'} className="heading h1 underline! text-[#0073e6]! hover:text-blue-800!">Visit Us In Person</Link>
              </h2>
              
              <p className="text-gray-600 mb-6">
                See our products in person, get expert guidance, or pick up merchandise. Appointment required.
              </p>
              <address className='text-black!'>
                <strong>Bitcoin Merch Gallery</strong>
                <br/>21620 Lassen St
                <br/>Chatsworth, CA 91311
              </address>
              <p>
                <strong>Gallery Hours:</strong><br/>Monday – Friday: 9:00 AM – 5:00 PM<br/>Saturday &amp; Sunday: Closed
              </p>
              {/* Right Column - Map */}
              <div className="rounded-lg shadow-lg mt-5 overflow-hidden">
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
              <h2>Need help with an order, product, or visit? Our support team is available through the options below.</h2>
              
              {/* Contact Methods */}
              <div className="card-grid">
                {
                  contact_method.map((item)=>(
                    <div key={item.name} className="card bg-white rounded-lg shadow-lg border p-8 text-center flex flex-col justify-between items-center">
                      <div className="icon">{item.icon}</div>
                      <h3 className="text-xl font-bold text-gray-800 mb-2">{item.name}</h3>
                      <p className="text-sm text-gray-600 mb-4">{item.val}<br/>{item.info}</p>
                      <a
                        href={item.link}
                        className="inline-block bg-[#ff9900]! px-6 py-2 rounded-lg font-semibold hover:bg-[#cc7a00]! transition"
                      >
                        {item.btn}
                      </a>
                    </div>
                  ))
                }
              </div>

              <h2 className="text-2xl font-bold">Customer Support Hours</h2>
                
              <div className="bg-white rounded-lg shadow-lg max-w-130 p-6 text-center mx-auto my-0">
                <p><strong>Monday – Friday:</strong> 24 hours</p>
                <p><strong>Saturday – Sunday:</strong> 9:00 AM – 5:00 PM</p>
                <p>All hours shown in Pacific Time.</p>
              </div>
            </div>
      </div>

      <div className="max-w-7xl">
        {/* Contact Form */}
        <div className=" p-8">
          <form onSubmit={handleSubmit} className="max-w-2xl mx-auto space-y-6">
            <div className='flex flex-col md:flex-row gap-3'>
              <input
                type="text"
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-3 border text-black border-gray-300 placeholder-black focus:border-[#ff9900] outline-none"
                placeholder="Your Name"
                required
              />
              <input
                type="email"
                id="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-3 text-black border border-gray-300 placeholder-black focus:border-[#ff9900] outline-none"
                placeholder="Your Email"
                required
              />
            </div>

            <textarea
              id="message"
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              rows={6}
              className="w-full h-75 px-4 py-3 border border-gray-300 text-black  placeholder-black focus:border-[#ff9900] outline-none resize-none"
              placeholder="Your message"
              required
            />

            <div className='flex justify-center items-center w-full mb-8'>
              <button
                type="submit"
                className="bg-[#ff9900] px-7.5 text-[12px] py-4 text-white uppercase min-w-50 hover:bg-[#f18a1dcc] transition"
              >
                Send message
              </button>
            </div>
          </form>
        </div>
      </div>
    </main>
  )
}
