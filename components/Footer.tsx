import React, { useState } from 'react';
import { Facebook, Twitter, Instagram, Youtube } from 'lucide-react';

const Footer = () => {
  const [open, setOpen] = useState({
    mission: false,
    quick: false,
    info: false,
  });

  const toggle = (key) => {
    setOpen(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const quickLinks = [
    { name: 'Guides', link: '/en-eu/blogs/guides' },
    { name: 'Press', link: '/en-eu/pages/press' },
    { name: 'Search', link: '/en-eu/search' },
    { name: 'Join Affiliate Program', link: '/en-eu/pages/affiliate' },
    { name: 'About Us', link: 'https://bitcoinmerch.com/pages/about-us' },
    { name: 'Contact Us', link: '/en-eu/pages/contact-us' },
    { name: 'Rewards', link: '/en-eu#loloyal-home' },
  ];

  const infoLinks = [
    { name: 'Privacy Policy', link: '/en-eu/pages/privacy-policy' },
    { name: 'Refund Policy', link: '/en-eu/pages/refund-policy' },
    { name: 'Terms of Service', link: 'https://bitcoinmerch.com/policies/terms-of-service' },
    { name: 'Refurbished Mining Equipment', link: '/en-eu/pages/refurbished-mining-equipment' },
    { name: 'Partners', link: '/en-eu/pages/partners-list' },
    { name: 'Bitcoin Merch Team', link: '/en-eu/pages/team' },
    { name: 'Start Selling Lottery Miners', link: '/en-eu/pages/white-label' },
  ];

  const socialLinks = [
    { Icon: Facebook, link: 'https://www.facebook.com/bitcoinmerchcom', label: 'Facebook' },
    { Icon: Twitter, link: 'https://twitter.com/bitcoinmerchcom', label: 'Twitter' },
    { Icon: Instagram, link: 'https://www.instagram.com/bitcoinmerchcom/', label: 'Instagram' },
    { Icon: Youtube, link: 'https://www.youtube.com/channel/UCWYS5jvm0e7AnndKSc5ldNg', label: 'YouTube' },
  ];

  return (
    <footer className="bg-[#eff0eb] w-full">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-6">
        {/* Main Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Mission Statement */}
          <div className="border-b md:border-b-0 border-gray-300 pb-4 md:pb-0">
            <button
              onClick={() => toggle('mission')}
              className="flex justify-between items-center w-full md:cursor-default"
            >
              <h3 className="text-sm font-semibold uppercase tracking-wide text-gray-900 mb-4">
                Our Mission Statement
              </h3>
              <span className="md:hidden text-2xl font-light">
                {open.mission ? '−' : '+'}
              </span>
            </button>
            <div
              className={`grid transition-all duration-300 ease-in-out ${
                open.mission ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
              } md:grid-rows-[1fr] md:opacity-100`}
            >
              <div className="overflow-hidden">
                <p className="text-sm leading-relaxed text-gray-700">
                  BitcoinMerch.com is dedicated to making cryptocurrency mining accessible to everyone by offering affordable, energy-efficient equipment for every home. We aim to educate users on mining technology and tackle industry challenges such as limited inventory and high costs, empowering more people to participate in the world of crypto mining.
                </p>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="border-b md:border-b-0 border-gray-300 pb-4 md:pb-0">
            <button
              onClick={() => toggle('quick')}
              className="flex justify-between items-center w-full md:cursor-default"
            >
              <h3 className="text-sm font-semibold uppercase tracking-wide text-gray-900 mb-4">
                Quick Links
              </h3>
              <span className="md:hidden text-2xl font-light">
                {open.quick ? '−' : '+'}
              </span>
            </button>
            <div
              className={`grid transition-all duration-300 ease-in-out ${
                open.quick ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
              } md:grid-rows-[1fr] md:opacity-100`}
            >
              <ul className="overflow-hidden space-y-2">
                {quickLinks.map((item, index) => (
                  <li key={index}>
                    <a href={item.link} className="text-sm text-gray-700 hover:text-gray-900">
                      {item.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Information */}
          <div className="border-b md:border-b-0 border-gray-300 pb-4 md:pb-0">
            <button
              onClick={() => toggle('info')}
              className="flex justify-between items-center w-full md:cursor-default"
            >
              <h3 className="text-sm font-semibold uppercase tracking-wide text-gray-900 mb-4">
                Information
              </h3>
              <span className="md:hidden text-2xl font-light">
                {open.info ? '−' : '+'}
              </span>
            </button>
            <div
              className={`grid transition-all duration-300 ease-in-out ${
                open.info ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
              } md:grid-rows-[1fr] md:opacity-100`}
            >
              <ul className="overflow-hidden space-y-2">
                {infoLinks.map((item, index) => (
                  <li key={index}>
                    <a href={item.link} className="text-sm text-gray-700 hover:text-gray-900">
                      {item.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>


          {/* Newsletter */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wide text-gray-900 mb-4">
              Newsletter
            </h3>
            <p className="text-sm text-gray-700 mb-4">
              Subscribe to receive updates, access to exclusive deals, and more.
            </p>
            <form className="space-y-3">
              <div className="relative">
                <input
                  type="email"
                  placeholder="Your email"
                  required
                  className="w-full px-4 py-3 bg-white border border-gray-300 text-sm text-gray-900 placeholder-gray-500 focus:outline-none focus:border-gray-400"
                />
              </div>
              <button
                type="submit"
                className="bg-[#f18a1d] text-white px-6 py-3 text-xs font-semibold uppercase tracking-wide hover:bg-[#d97a1a] transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Section */}
        <aside className="border-t border-gray-300 pt-6">
          <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start gap-6">
            {/* Copyright - Desktop Only */}
            <div className="hidden lg:block">
              <p className="text-sm text-gray-700">
                © 2026 Bitcoin Merch <span className="text-gray-600">| 21620 Lassen St, Chatsworth, CA 91311, USA</span>
              </p>
            </div>

            {/* Follow Us */}
            <div>
              <p className="text-sm font-medium text-gray-900 mb-3">Follow Us</p>
              <div className="flex gap-2">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Follow us on ${social.label}`}
                    className="w-9 h-9 bg-gray-400 hover:bg-[#f18a1d] flex items-center justify-center transition-colors rounded"
                  >
                    <social.Icon className="w-5 h-5 text-white" />
                  </a>
                ))}
              </div>
            </div>

            {/* We Accept */}
            <div>
              <p className="text-sm font-medium text-gray-900 mb-3">We Accept</p>
              <div className="flex flex-wrap gap-1">
                {/* Bitcoin */}
                <svg className="w-[38px] h-[24px]" viewBox="0 0 38 24" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="pi-bitcoin"><title id="pi-bitcoin">Bitcoin</title><path opacity=".07" d="M35 0H3C1.3 0 0 1.3 0 3v18c0 1.7 1.4 3 3 3h32c1.7 0 3-1.3 3-3V3c0-1.7-1.4-3-3-3z" fill="#000"/><path fill="#fff" d="M35 1c1.1 0 2 .9 2 2v18c0 1.1-.9 2-2 2H3c-1.1 0-2-.9-2-2V3c0-1.1.9-2 2-2h32"/><path fill="#EDA024" d="M21.6 4.4c-4.2-1.4-8.7.8-10.2 5s.8 8.7 5 10.2 8.7-.8 10.2-5c1.4-4.2-.8-8.7-5-10.2z"/><path fill="#fff" d="M16.1 8.3l.3-1c.6.2 1.3.4 1.9.7.2-.5.4-1 .5-1.6l.9.3-.5 1.5.8.3.5-1.5.9.3c-.2.5-.4 1-.5 1.6l.4.2c.3.2.6.4.9.7.3.3.4.6.5 1 0 .3 0 .6-.2.9-.2.5-.5.8-1.1.9h-.2c.2.1.3.2.4.4.4.4.5.8.4 1.4 0 .1 0 .2-.1.3 0 .1 0 .1-.1.2-.1.2-.2.3-.2.5-.3.5-.8.9-1.5.9-.5 0-1 0-1.4-.1l-.4-.1c-.2.5-.4 1-.5 1.6l-.9-.3c.2-.5.4-1 .5-1.5l-.8-.3c-.2.5-.4 1-.5 1.5l-.9-.3c.2-.5.4-1 .5-1.6l-1.9-.6.6-1.1c.2.1.5.2.7.2.2.1.4 0 .5-.2L17 9.3v-.1c0-.3-.1-.5-.4-.5 0-.2-.2-.3-.5-.4zm1.2 6c.5.2.9.3 1.3.4.3.1.5.1.8.1.2 0 .3 0 .5-.1.5-.3.6-1 .2-1.4l-.6-.5c-.3-.2-.7-.3-1.1-.4-.1 0-.3-.1-.4-.2l-.7 2.1zm1-3.1c.3.1.5.2.7.2.3.1.6.2.9.1.4 0 .7-.1.8-.5.1-.3.1-.6 0-.8-.1-.2-.3-.3-.5-.4-.3-.2-.6-.3-1-.4l-.3-.1c-.1.7-.4 1.3-.6 1.9z"/></svg>
                
                {/* Visa */}
                <svg className="w-[38px] h-[24px]" viewBox="0 0 38 24" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="pi-visa"><title id="pi-visa">Visa</title><path opacity=".07" d="M35 0H3C1.3 0 0 1.3 0 3v18c0 1.7 1.4 3 3 3h32c1.7 0 3-1.3 3-3V3c0-1.7-1.4-3-3-3z" fill="#000"/><path fill="#fff" d="M35 1c1.1 0 2 .9 2 2v18c0 1.1-.9 2-2 2H3c-1.1 0-2-.9-2-2V3c0-1.1.9-2 2-2h32"/><path d="M28.3 10.1H28c-.4 1-.7 1.5-1 3h1.9c-.3-1.5-.3-2.2-.6-3zm2.9 5.9h-1.7c-.1 0-.1 0-.2-.1l-.2-.9-.1-.2h-2.4c-.1 0-.2 0-.2.2l-.3.9c0 .1-.1.1-.1.1h-2.1l.2-.5L27 8.7c0-.5.3-.7.8-.7h1.5c.1 0 .2 0 .2.2l1.4 6.5c.1.4.2.7.2 1.1.1.1.1.1.1.2zm-13.4-.3l.4-1.8c.1 0 .2.1.2.1.7.3 1.4.5 2.1.4.2 0 .5-.1.7-.2.5-.2.5-.7.1-1.1-.2-.2-.5-.3-.8-.5-.4-.2-.8-.4-1.1-.7-1.2-1-.8-2.4-.1-3.1.6-.4.9-.8 1.7-.8 1.2 0 2.5 0 3.1.2h.1c-.1.6-.2 1.1-.4 1.7-.5-.2-1-.4-1.5-.4-.3 0-.6 0-.9.1-.2 0-.3.1-.4.2-.2.2-.2.5 0 .7l.5.4c.4.2.8.4 1.1.6.5.3 1 .8 1.1 1.4.2.9-.1 1.7-.9 2.3-.5.4-.7.6-1.4.6-1.4 0-2.5.1-3.4-.2-.1.2-.1.2-.2.1zm-3.5.3c.1-.7.1-.7.2-1 .5-2.2 1-4.5 1.4-6.7.1-.2.1-.3.3-.3H18c-.2 1.2-.4 2.1-.7 3.2-.3 1.5-.6 3-1 4.5 0 .2-.1.2-.3.2M5 8.2c0-.1.2-.2.3-.2h3.4c.5 0 .9.3 1 .8l.9 4.4c0 .1 0 .1.1.2 0-.1.1-.1.1-.1l2.1-5.1c-.1-.1 0-.2.1-.2h2.1c0 .1 0 .1-.1.2l-3.1 7.3c-.1.2-.1.3-.2.4-.1.1-.3 0-.5 0H9.7c-.1 0-.2 0-.2-.2L7.9 9.5c-.2-.2-.5-.5-.9-.6-.6-.3-1.7-.5-1.9-.5L5 8.2z" fill="#142688"/></svg>

                {/* Mastercard */}
                <svg className="w-[38px] h-[24px]" viewBox="0 0 38 24" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="pi-master"><title id="pi-master">Mastercard</title><path opacity=".07" d="M35 0H3C1.3 0 0 1.3 0 3v18c0 1.7 1.4 3 3 3h32c1.7 0 3-1.3 3-3V3c0-1.7-1.4-3-3-3z" fill="#000"/><path fill="#fff" d="M35 1c1.1 0 2 .9 2 2v18c0 1.1-.9 2-2 2H3c-1.1 0-2-.9-2-2V3c0-1.1.9-2 2-2h32"/><circle fill="#EB001B" cx="15" cy="12" r="7"/><circle fill="#F79E1B" cx="23" cy="12" r="7"/><path fill="#FF5F00" d="M22 12c0-2.4-1.2-4.5-3-5.7-1.8 1.3-3 3.4-3 5.7s1.2 4.5 3 5.7c1.8-1.2 3-3.3 3-5.7z"/></svg>

                {/* PayPal */}
                <svg className="w-[38px] h-[24px]" viewBox="0 0 38 24" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="pi-paypal"><title id="pi-paypal">PayPal</title><path opacity=".07" d="M35 0H3C1.3 0 0 1.3 0 3v18c0 1.7 1.4 3 3 3h32c1.7 0 3-1.3 3-3V3c0-1.7-1.4-3-3-3z" fill="#000"/><path fill="#fff" d="M35 1c1.1 0 2 .9 2 2v18c0 1.1-.9 2-2 2H3c-1.1 0-2-.9-2-2V3c0-1.1.9-2 2-2h32"/><path fill="#003087" d="M23.9 8.3c.2-1 0-1.7-.6-2.3-.6-.7-1.7-1-3.1-1h-4.1c-.3 0-.5.2-.6.5L14 15.6c0 .2.1.4.3.4H17l.4-3.4 1.8-2.2 4.7-2.1z"/><path fill="#3086C8" d="M23.9 8.3l-.2.2c-.5 2.8-2.2 3.8-4.6 3.8H18c-.3 0-.5.2-.6.5l-.6 3.9-.2 1c0 .2.1.4.3.4H19c.3 0 .5-.2.5-.4v-.1l.4-2.4v-.1c0-.2.3-.4.5-.4h.3c2.1 0 3.7-.8 4.1-3.2.2-1 .1-1.8-.4-2.4-.1-.5-.3-.7-.5-.8z"/><path fill="#012169" d="M23.3 8.1c-.1-.1-.2-.1-.3-.1-.1 0-.2 0-.3-.1-.3-.1-.7-.1-1.1-.1h-3c-.1 0-.2 0-.2.1-.2.1-.3.2-.3.4l-.7 4.4v.1c0-.3.3-.5.6-.5h1.3c2.5 0 4.1-1 4.6-3.8v-.2c-.1-.1-.3-.2-.5-.2h-.1z"/></svg>
              </div>
            </div>

            {/* Copyright - Mobile */}
            <div className="lg:hidden w-full">
              <p className="text-sm text-gray-700 text-left">
                © 2026 Bitcoin Merch <span className="text-gray-600">| 21620 Lassen St, Chatsworth, CA 91311, USA</span>
              </p>
            </div>
          </div>
        </aside>
      </div>
    </footer>
  );
};

export default Footer;