'use client'

import Link from 'next/link'
import { infos, links, quick_links } from '@/lib/constants'
import { useState } from "react"


export default function Footer() {
  const [open, setOpen] = useState({
    mission: false,
    quick: false,
    info: false,
  })

  const toggle = (key: "mission" | "quick" | "info") => {
    setOpen(prev => ({ ...prev, [key]: !prev[key] }))
  }


  return (
    <footer className="bg-[#eff0eb]">
      {/* Main Footer */}
      <div className="container mx-auto px-2 py-12 text-[13px] md:text-[14px]">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-12 justify-between">
          {/* Our Mission Statement + Copyright */}
          <div className="lg:col-span-2 flex flex-col lg:border-0 border-b border-b-gray-300 w-full">
            <button
              onClick={() => toggle("mission")}
              className="flex justify-between items-center lg:cursor-default cursor-pointer"
            >
              <h3 className="text-gray-900 font-bold mb-4">
                NOTRE ÉNONCÉ DE MISSION
              </h3>
              <span className="lg:hidden text-xl text-black font-bold">
                {open.mission ? "−" : "+"}
              </span>
            </button>

            <div
              className={`
                grid
                transition-all
                duration-300
                ease-in-out
                ${open.mission ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}
                lg:grid-rows-[1fr] lg:opacity-100
              `}
            >
              <p className="overflow-hidden text-base leading-relaxed">
                BitcoinMerch.com a pour mission de rendre le minage de cryptomonnaies
                accessible à tous en proposant des équipements abordables et économes en
                énergie pour chaque foyer. Nous avons pour objectif d'informer les
                utilisateurs sur les technologies de minage et de relever les défis du
                secteur, tels que la pénurie de matériel et les coûts élevés.
              </p>
            </div>
          </div>


          {/* Quick Links + Follow Us */}
          <div className="lg:col-span-1 lg:border-0 border-b border-b-gray-300 w-full">
            <button
              onClick={() => toggle("quick")}
              className="flex justify-between items-center w-full lg:cursor-default cursor-pointer"
            >
              <h3 className="text-gray-900 font-bold mb-4">QUICK LINKS</h3>
              <span className="lg:hidden text-xl text-black font-bold block">
                {open.quick ? "−" : "+"}
              </span>
            </button>

            <div
              className={`
                grid
                transition-all
                duration-300
                ease-in-out
                ${open.quick ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}
                lg:grid-rows-[1fr] lg:opacity-100
              `}
            >
              <ul className="overflow-hidden space-y-2 text-base">
                {quick_links.map((item, index) => (
                  <li key={index}>
                    <Link href={item.link} className='footer__link-item  link'>{item.name}</Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>


          {/* Information + We Accept */}
          <div className="lg:col-span-1 lg:border-0 border-b border-b-gray-300 w-full">
            <button
              onClick={() => toggle("info")}
              className="flex justify-between items-center w-full lg:cursor-default cursor-pointer"
            >
              <h3 className="text-gray-900 font-bold mb-4">INFORMATION</h3>
              <span className="lg:hidden text-xl font-bold text-black block">
                {open.info ? "−" : "+"}
              </span>
            </button>

            <div
              className={`
                grid
                transition-all
                duration-300
                ease-in-out
                ${open.info ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}
                lg:grid-rows-[1fr] lg:opacity-100
              `}
            >
              <ul className="overflow-hidden space-y-2 text-base">
                {infos.map((item, index) => (
                  <li key={index}>
                    <Link href={item.link} className='footer__link-item  link'>{item.name}</Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>


          {/* Newsletter */}
          <div className="lg:col-span-2">
            <h3 className="text-gray-900 font-bold mb-4">NEWSLETTER</h3>
            <p className="mb-4">Subscribe to receive updates, access to exclusive deals, and more.</p>
            <form action="#" method="post" className='space-y-3'>
              <input
                required
                type="email"
                placeholder="Your email"
                className="w-full px-4 py-3 bg-white text-gray-900 placeholder-black focus:outline-none focus:ring-2 focus:ring-[#FF8C00]"
              />
              <button
                type="submit"
                className="bg-[#f18a1d] text-white px-8 py-3 text-[12px] cursor-pointer rounded font-semibold hover:bg-[#f18a1dcc] transition"
              >
                SUBSCRIBE
              </button>

            </form>
          </div>
        </div>

        {/* Bottom Section - Copyright, Follow Us, We Accept */}
        <aside className="flex flex-col md:flex-wrap md:flex-row justify-between text-center">
          <div className='mt-8.5  footer-copyright-hidden lg:block hidden'>
            <p className="text-[13px] md:text-[14px] text-gray-700 lg:block hidden">
              © 2026 Bitcoin Merch | 21620 Lassen St, Chatsworth, CA 91311, États-Unis
            </p>
            
            <div>
              <h4 className="text-gray-900 font-bold text-base mb-2">Suivez-nous</h4>
              <div className="flex gap-3">
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="bg-gray-400 p-2 rounded hover:bg-[#FF8C00] transition">
                  <Facebook className="w-5 h-5" />
                </a>
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="bg-gray-400 p-2 rounded hover:bg-[#FF8C00] transition">
                  <Twitter className="w-5 h-5" />
                </a>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="bg-gray-400 p-2 rounded hover:bg-[#FF8C00] transition">
                  <Instagram className="w-5 h-5" />
                </a>
                <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="bg-gray-400 p-2 rounded hover:bg-[#FF8C00] transition">
                  <Youtube className="w-5 h-5" />
                </a>
              </div>
            </div>

            <div className='mt-8.5  payments_list'>
              <h4 className="text-gray-900 text-[13px] md:text-[14px] mb-[0.8em]">We Accept</h4>
              <div className="flex flex-wrap -m-1">
                <svg className="payment-list__item" viewBox="0 0 38 24" xmlns="http://www.w3.org/2000/svg" width="38" height="24" role="img" aria-labelledby="pi-bitcoin"><title id="pi-bitcoin">Bitcoin</title><path opacity=".07" d="M35 0H3C1.3 0 0 1.3 0 3v18c0 1.7 1.4 3 3 3h32c1.7 0 3-1.3 3-3V3c0-1.7-1.4-3-3-3z"></path><path fill="#fff" d="M35 1c1.1 0 2 .9 2 2v18c0 1.1-.9 2-2 2H3c-1.1 0-2-.9-2-2V3c0-1.1.9-2 2-2h32"></path><path fill="#EDA024" d="M21.6 4.4c-4.2-1.4-8.7.8-10.2 5s.8 8.7 5 10.2 8.7-.8 10.2-5c1.4-4.2-.8-8.7-5-10.2z"></path><path fill="#fff" d="M16.1 8.3l.3-1c.6.2 1.3.4 1.9.7.2-.5.4-1 .5-1.6l.9.3-.5 1.5.8.3.5-1.5.9.3c-.2.5-.4 1-.5 1.6l.4.2c.3.2.6.4.9.7.3.3.4.6.5 1 0 .3 0 .6-.2.9-.2.5-.5.8-1.1.9h-.2c.2.1.3.2.4.4.4.4.5.8.4 1.4 0 .1 0 .2-.1.3 0 .1 0 .1-.1.2-.1.2-.2.3-.2.5-.3.5-.8.9-1.5.9-.5 0-1 0-1.4-.1l-.4-.1c-.2.5-.4 1-.5 1.6l-.9-.3c.2-.5.4-1 .5-1.5l-.8-.3c-.2.5-.4 1-.5 1.5l-.9-.3c.2-.5.4-1 .5-1.6l-1.9-.6.6-1.1c.2.1.5.2.7.2.2.1.4 0 .5-.2L17 9.3v-.1c0-.3-.1-.5-.4-.5 0-.2-.2-.3-.5-.4zm1.2 6c.5.2.9.3 1.3.4.3.1.5.1.8.1.2 0 .3 0 .5-.1.5-.3.6-1 .2-1.4l-.6-.5c-.3-.2-.7-.3-1.1-.4-.1 0-.3-.1-.4-.2l-.7 2.1zm1-3.1c.3.1.5.2.7.2.3.1.6.2.9.1.4 0 .7-.1.8-.5.1-.3.1-.6 0-.8-.1-.2-.3-.3-.5-.4-.3-.2-.6-.3-1-.4l-.3-.1c-.1.7-.4 1.3-.6 1.9z"></path></svg>
                <svg className="payment-list__item" viewBox="0 0 38 24" xmlns="http://www.w3.org/2000/svg" width="38" height="24" role="img" aria-labelledby="pi-ethereum"><title id="pi-ethereum">Ethereum</title><g fill="none" fill-rule="evenodd"><rect fill-opacity=".07" fill="#000" width="38" height="24" rx="3"></rect><rect fill="#FFF" x="1" y="1" width="36" height="22" rx="2"></rect><g fill-rule="nonzero"><path fill="#343434" d="M18.658 4.25l-.102.346V14.63l.102.101 4.657-2.753z"></path><path fill="#8C8C8C" d="M18.658 4.25L14 11.978l4.658 2.754v-4.87z"></path><path fill="#3C3C3B" d="M18.658 15.613l-.058.07v3.575l.058.167 4.66-6.563z"></path><path fill="#8C8C8C" d="M18.658 19.425v-3.812L14 12.862z"></path><path fill="#141414" d="M18.658 14.731l4.657-2.753-4.657-2.117z"></path><path fill="#393939" d="M14 11.978l4.658 2.753v-4.87z"></path></g></g></svg>
                <svg className="payment-list__item" xmlns="http://www.w3.org/2000/svg" width="38" height="24" viewBox="-36 25 38 24" role="img" aria-labelledby="pi-litecoin"><title id="pi-litecoin">Litecoin</title><path fill="#fff" d="M-.4 49h-33.2c-1.3 0-2.4-1.1-2.4-2.4V27.4c0-1.3 1.1-2.4 2.4-2.4H-.4C.9 25 2 26.1 2 27.4v19.2C2 47.9.9 49-.4 49z"></path><path opacity=".25" fill="#A8AAAD" d="M-.4 49h-33.2c-1.3 0-2.4-1.1-2.4-2.4V27.4c0-1.3 1.1-2.4 2.4-2.4H-.5C.9 25 2 26.1 2 27.4v19.2C2 47.9.9 49-.4 49zm-33.2-23c-.8 0-1.4.6-1.4 1.4v19.2c0 .8.6 1.4 1.4 1.4H-.5c.8 0 1.5-.6 1.5-1.4V27.4C1 26.6.4 26-.4 26h-33.2z"></path><circle fill="#58595B" cx="-17" cy="37" r="8.2"></circle><path fill="#fff" d="M-17.8 32.5L-19 37l-1 .4-.3 1.1 1-.4-.7 2.7h6.9l.4-1.6H-17l.6-2.2 1.2-.4.3-1.1-1.2.5.9-3.5h-2.6z"></path></svg>
                <svg className="payment-list__item" width="38" height="24" viewBox="0 0 38 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-labelledby="pi-usdc" role="img"><title id="pi-usdc">USDC</title><g clip-path="url(#pi-usdc-clip0)"><path opacity=".07" d="M35 0H3C1.3 0 0 1.3 0 3v18c0 1.7 1.4 3 3 3h32c1.7 0 3-1.3 3-3V3c0-1.7-1.4-3-3-3z" fill="#000"></path><path d="M35 1c1.1 0 2 .9 2 2v18c0 1.1-.9 2-2 2H3c-1.1 0-2-.9-2-2V3c0-1.1.9-2 2-2h32z" fill="#fff"></path><path d="M19 20.2a8.2 8.2 0 100-16.4 8.2 8.2 0 000 16.4z" fill="#0B53BF"></path><path d="M20.98 13.054c0-1.035-.629-1.384-1.847-1.552-.9-.13-1.075-.34-1.075-.76s.305-.682.888-.682c.53 0 .837.184.963.612a.225.225 0 00.214.164h.466a.208.208 0 00.208-.242c-.148-.675-.603-1.082-1.317-1.209v-.712a.222.222 0 00-.221-.222h-.445a.222.222 0 00-.222.222v.687c-.886.125-1.447.71-1.447 1.462 0 .97.592 1.348 1.828 1.515.84.138 1.08.32 1.08.797 0 .478-.406.798-.98.798-.773 0-1.035-.338-1.122-.777a.224.224 0 00-.218-.18h-.505a.206.206 0 00-.206.24c.13.74.604 1.28 1.57 1.41v.702a.222.222 0 00.222.222h.445a.222.222 0 00.221-.222v-.7c.917-.146 1.5-.779 1.5-1.573z" fill="#fff"></path><path d="M17.32 16.597a4.896 4.896 0 010-9.195.354.354 0 00.211-.308v-.458a.232.232 0 00-.208-.253.231.231 0 00-.118.02 5.874 5.874 0 000 11.193.231.231 0 00.326-.233v-.456a.354.354 0 00-.21-.309l-.001-.001zm3.474-10.193a.232.232 0 00-.326.233v.457a.352.352 0 00.211.308 4.896 4.896 0 010 9.196.325.325 0 00-.21.309v.457a.233.233 0 00.326.233 5.874 5.874 0 000-11.193h-.001z" fill="#fff"></path></g><defs><clipPath id="pi-usdc-clip0"><path fill="#fff" d="M0 0h38v24H0z"></path></clipPath></defs></svg>
                <svg className="payment-list__item" xmlns="http://www.w3.org/2000/svg" role="img" viewBox="0 0 38 24" width="38" height="24" aria-labelledby="pi-dai"><title id="pi-dai">DAI</title><path fill="#000" opacity=".07" d="M35 0H3C1.3 0 0 1.3 0 3v18c0 1.7 1.4 3 3 3h32c1.7 0 3-1.3 3-3V3c0-1.7-1.4-3-3-3z"></path><path fill="#fff" d="M35 1c1.1 0 2 .9 2 2v18c0 1.1-.9 2-2 2H3c-1.1 0-2-.9-2-2V3c0-1.1.9-2 2-2h32"></path><circle cx="19" cy="12" r="8.2" fill="#f5ac37"></circle><path fill="#FFF" d="M15.002 16.462v-.03-1.17-1.577c0-.066 0-.076-.08-.076h-1.09c-.06 0-.086 0-.086-.08v-.954h1.165c.066 0 .09 0 .09-.086v-.944c0-.06 0-.075-.08-.075h-1.09c-.06 0-.085 0-.085-.08v-.885c0-.055 0-.07.08-.07h1.08c.076 0 .096 0 .096-.095V7.632c0-.08 0-.1.1-.1h3.767a5.6 5.6 0 01.814.09 4.912 4.912 0 011.572.583 4.47 4.47 0 01.884.683 4.892 4.892 0 01.537.668 3.953 3.953 0 01.392.769.13.13 0 00.15.105h.9c.115 0 .115 0 .12.11v.824c0 .08-.03.1-.11.1h-.693c-.07 0-.09 0-.086.091a5.108 5.108 0 010 .92c0 .085 0 .095.096.095h.793c.035.045 0 .09 0 .135a1.005 1.005 0 010 .176v.608c0 .085-.025.11-.1.11h-.95a.126.126 0 00-.145.096 4.018 4.018 0 01-1.055 1.537 6.133 6.133 0 01-.537.432c-.201.115-.397.236-.603.331a5.43 5.43 0 01-1.185.377 6.153 6.153 0 01-1.176.095h-3.485v-.005zm6.936-2.843a1.095 1.095 0 00-.256 0h-5.57c-.076 0-.1 0-.1.1v1.744c0 .08 0 .1.1.1h2.571a1.29 1.29 0 00.367-.025 3.852 3.852 0 001.09-.241 2.01 2.01 0 00.367-.17h.035a3.265 3.265 0 001.401-1.412s.035-.08-.005-.1v.004zm0-3.194a.095.095 0 000-.07 1.979 1.979 0 00-.18-.317 2.577 2.577 0 00-.373-.467 1.23 1.23 0 00-.23-.226 3.606 3.606 0 00-1.507-.763 3.742 3.742 0 00-.854-.096h-2.697c-.076 0-.086.03-.086.096v1.783c0 .075 0 .095.096.095h5.796s.05-.01.06-.04l-.025.005zm-2.813 2.15h3.054c.065 0 .095 0 .1-.086a5.801 5.801 0 000-.934c0-.06-.03-.085-.095-.085h-6.077c-.076 0-.096.025-.096.095v.89c0 .115 0 .115.12.115l2.994.005z"></path></svg>
                <svg className="payment-list__item" xmlns="http://www.w3.org/2000/svg" width="38" height="24" viewBox="-36 25 38 24" role="img" aria-labelledby="pi-dogecoin"><title id="pi-dogecoin">Dogecoin</title><path fill="#fff" d="M-.283 48.947H-33.44a1.94 1.94 0 0 1-1.934-1.934V27.842a1.94 1.94 0 0 1 1.934-1.934H-.283a1.94 1.94 0 0 1 1.934 1.934v19.171a1.94 1.94 0 0 1-1.934 1.934z"></path><path fill="#A7A8AB" d="M-.298 49.427h-33.128c-1.344 0-2.436-1.077-2.436-2.4v-19.2c0-1.323 1.092-2.4 2.436-2.4H-.298c1.344 0 2.436 1.077 2.436 2.4v19.2c0 1.323-1.092 2.4-2.436 2.4zm-33.128-23.04c-.806 0-1.462.646-1.462 1.44v19.2c0 .794.656 1.44 1.462 1.44H-.298c.806 0 1.462-.646 1.462-1.44v-19.2c0-.794-.656-1.44-1.462-1.44h-33.128z" opacity=".25"></path><circle fill="#CBA747" cx="-17" cy="37" r="7.669"></circle><path fill="#fff" d="M-12.586 36.004c-.295-1.753-1.7-2.648-2.411-2.878-.711-.227-5.413-.133-5.413-.133-.106.13-.041 1.898-.041 1.898l1.071-.006.021 1.358h-.924a.105.105 0 0 0-.106.106v1.34c0 .059.047.106.106.106h.939c.003.723-.006 1.302-.035 1.313-.08.032-.95-.044-1.036.015-.083.056-.038 1.104-.038 1.505-.003.401.106.384.106.384 4.985-.127 4.864.331 6.269-.511 1.405-.841 1.792-2.742 1.493-4.498zm-5.308 3.099v-1.325l1.601.017a.108.108 0 0 0 .109-.106v-1.34a.108.108 0 0 0-.109-.106l-1.601.003v-1.479s3.666-.406 3.666 2.343c0 2.642-3.666 1.993-3.666 1.993z"></path></svg>
                <svg className="payment-list__item" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="pi-american_express" viewBox="0 0 38 24" width="38" height="24"><title id="pi-american_express">American Express</title><path fill="#000" d="M35 0H3C1.3 0 0 1.3 0 3v18c0 1.7 1.4 3 3 3h32c1.7 0 3-1.3 3-3V3c0-1.7-1.4-3-3-3Z" opacity=".07"></path><path fill="#006FCF" d="M35 1c1.1 0 2 .9 2 2v18c0 1.1-.9 2-2 2H3c-1.1 0-2-.9-2-2V3c0-1.1.9-2 2-2h32Z"></path><path fill="#FFF" d="M22.012 19.936v-8.421L37 11.528v2.326l-1.732 1.852L37 17.573v2.375h-2.766l-1.47-1.622-1.46 1.628-9.292-.02Z"></path><path fill="#006FCF" d="M23.013 19.012v-6.57h5.572v1.513h-3.768v1.028h3.678v1.488h-3.678v1.01h3.768v1.531h-5.572Z"></path><path fill="#006FCF" d="m28.557 19.012 3.083-3.289-3.083-3.282h2.386l1.884 2.083 1.89-2.082H37v.051l-3.017 3.23L37 18.92v.093h-2.307l-1.917-2.103-1.898 2.104h-2.321Z"></path><path fill="#FFF" d="M22.71 4.04h3.614l1.269 2.881V4.04h4.46l.77 2.159.771-2.159H37v8.421H19l3.71-8.421Z"></path><path fill="#006FCF" d="m23.395 4.955-2.916 6.566h2l.55-1.315h2.98l.55 1.315h2.05l-2.904-6.566h-2.31Zm.25 3.777.875-2.09.873 2.09h-1.748Z"></path><path fill="#006FCF" d="M28.581 11.52V4.953l2.811.01L32.84 9l1.456-4.046H37v6.565l-1.74.016v-4.51l-1.644 4.494h-1.59L30.35 7.01v4.51h-1.768Z"></path></svg>
                <svg className="payment-list__item" viewBox="0 0 38 24" xmlns="http://www.w3.org/2000/svg" role="img" width="38" height="24" aria-labelledby="pi-diners_club"><title id="pi-diners_club">Diners Club</title><path opacity=".07" d="M35 0H3C1.3 0 0 1.3 0 3v18c0 1.7 1.4 3 3 3h32c1.7 0 3-1.3 3-3V3c0-1.7-1.4-3-3-3z"></path><path fill="#fff" d="M35 1c1.1 0 2 .9 2 2v18c0 1.1-.9 2-2 2H3c-1.1 0-2-.9-2-2V3c0-1.1.9-2 2-2h32"></path><path d="M12 12v3.7c0 .3-.2.3-.5.2-1.9-.8-3-3.3-2.3-5.4.4-1.1 1.2-2 2.3-2.4.4-.2.5-.1.5.2V12zm2 0V8.3c0-.3 0-.3.3-.2 2.1.8 3.2 3.3 2.4 5.4-.4 1.1-1.2 2-2.3 2.4-.4.2-.4.1-.4-.2V12zm7.2-7H13c3.8 0 6.8 3.1 6.8 7s-3 7-6.8 7h8.2c3.8 0 6.8-3.1 6.8-7s-3-7-6.8-7z" fill="#3086C8"></path></svg>
                <svg className="payment-list__item" viewBox="0 0 38 24" width="38" height="24" role="img" aria-labelledby="pi-discover" fill="none" xmlns="http://www.w3.org/2000/svg"><title id="pi-discover">Discover</title><path fill="#000" opacity=".07" d="M35 0H3C1.3 0 0 1.3 0 3v18c0 1.7 1.4 3 3 3h32c1.7 0 3-1.3 3-3V3c0-1.7-1.4-3-3-3z"></path><path d="M35 1c1.1 0 2 .9 2 2v18c0 1.1-.9 2-2 2H3c-1.1 0-2-.9-2-2V3c0-1.1.9-2 2-2h32z" fill="#fff"></path><path d="M3.57 7.16H2v5.5h1.57c.83 0 1.43-.2 1.96-.63.63-.52 1-1.3 1-2.11-.01-1.63-1.22-2.76-2.96-2.76zm1.26 4.14c-.34.3-.77.44-1.47.44h-.29V8.1h.29c.69 0 1.11.12 1.47.44.37.33.59.84.59 1.37 0 .53-.22 1.06-.59 1.39zm2.19-4.14h1.07v5.5H7.02v-5.5zm3.69 2.11c-.64-.24-.83-.4-.83-.69 0-.35.34-.61.8-.61.32 0 .59.13.86.45l.56-.73c-.46-.4-1.01-.61-1.62-.61-.97 0-1.72.68-1.72 1.58 0 .76.35 1.15 1.35 1.51.42.15.63.25.74.31.21.14.32.34.32.57 0 .45-.35.78-.83.78-.51 0-.92-.26-1.17-.73l-.69.67c.49.73 1.09 1.05 1.9 1.05 1.11 0 1.9-.74 1.9-1.81.02-.89-.35-1.29-1.57-1.74zm1.92.65c0 1.62 1.27 2.87 2.9 2.87.46 0 .86-.09 1.34-.32v-1.26c-.43.43-.81.6-1.29.6-1.08 0-1.85-.78-1.85-1.9 0-1.06.79-1.89 1.8-1.89.51 0 .9.18 1.34.62V7.38c-.47-.24-.86-.34-1.32-.34-1.61 0-2.92 1.28-2.92 2.88zm12.76.94l-1.47-3.7h-1.17l2.33 5.64h.58l2.37-5.64h-1.16l-1.48 3.7zm3.13 1.8h3.04v-.93h-1.97v-1.48h1.9v-.93h-1.9V8.1h1.97v-.94h-3.04v5.5zm7.29-3.87c0-1.03-.71-1.62-1.95-1.62h-1.59v5.5h1.07v-2.21h.14l1.48 2.21h1.32l-1.73-2.32c.81-.17 1.26-.72 1.26-1.56zm-2.16.91h-.31V8.03h.33c.67 0 1.03.28 1.03.82 0 .55-.36.85-1.05.85z" fill="#231F20"></path><path d="M20.16 12.86a2.931 2.931 0 100-5.862 2.931 2.931 0 000 5.862z" fill="url(#pi-paint0_linear)"></path><path opacity=".65" d="M20.16 12.86a2.931 2.931 0 100-5.862 2.931 2.931 0 000 5.862z" fill="url(#pi-paint1_linear)"></path><path d="M36.57 7.506c0-.1-.07-.15-.18-.15h-.16v.48h.12v-.19l.14.19h.14l-.16-.2c.06-.01.1-.06.1-.13zm-.2.07h-.02v-.13h.02c.06 0 .09.02.09.06 0 .05-.03.07-.09.07z" fill="#231F20"></path><path d="M36.41 7.176c-.23 0-.42.19-.42.42 0 .23.19.42.42.42.23 0 .42-.19.42-.42 0-.23-.19-.42-.42-.42zm0 .77c-.18 0-.34-.15-.34-.35 0-.19.15-.35.34-.35.18 0 .33.16.33.35 0 .19-.15.35-.33.35z" fill="#231F20"></path><path d="M37 12.984S27.09 19.873 8.976 23h26.023a2 2 0 002-1.984l.024-3.02L37 12.985z" fill="#F48120"></path><defs><linearGradient id="pi-paint0_linear" x1="21.657" y1="12.275" x2="19.632" y2="9.104" gradientUnits="userSpaceOnUse"><stop stop-color="#F89F20"></stop><stop offset=".25" stop-color="#F79A20"></stop><stop offset=".533" stop-color="#F68D20"></stop><stop offset=".62" stop-color="#F58720"></stop><stop offset=".723" stop-color="#F48120"></stop><stop offset="1" stop-color="#F37521"></stop></linearGradient><linearGradient id="pi-paint1_linear" x1="21.338" y1="12.232" x2="18.378" y2="6.446" gradientUnits="userSpaceOnUse"><stop stop-color="#F58720"></stop><stop offset=".359" stop-color="#E16F27"></stop><stop offset=".703" stop-color="#D4602C"></stop><stop offset=".982" stop-color="#D05B2E"></stop></linearGradient></defs></svg>
                <svg className="payment-list__item" xmlns="http://www.w3.org/2000/svg" role="img" viewBox="0 0 38 24" width="38" height="24" aria-labelledby="pi-google_pay"><title id="pi-google_pay">Google Pay</title><path d="M35 0H3C1.3 0 0 1.3 0 3v18c0 1.7 1.4 3 3 3h32c1.7 0 3-1.3 3-3V3c0-1.7-1.4-3-3-3z" fill="#000" opacity=".07"></path><path d="M35 1c1.1 0 2 .9 2 2v18c0 1.1-.9 2-2 2H3c-1.1 0-2-.9-2-2V3c0-1.1.9-2 2-2h32" fill="#FFF"></path><path d="M18.093 11.976v3.2h-1.018v-7.9h2.691a2.447 2.447 0 0 1 1.747.692 2.28 2.28 0 0 1 .11 3.224l-.11.116c-.47.447-1.098.69-1.747.674l-1.673-.006zm0-3.732v2.788h1.698c.377.012.741-.135 1.005-.404a1.391 1.391 0 0 0-1.005-2.354l-1.698-.03zm6.484 1.348c.65-.03 1.286.188 1.778.613.445.43.682 1.03.65 1.649v3.334h-.969v-.766h-.049a1.93 1.93 0 0 1-1.673.931 2.17 2.17 0 0 1-1.496-.533 1.667 1.667 0 0 1-.613-1.324 1.606 1.606 0 0 1 .613-1.336 2.746 2.746 0 0 1 1.698-.515c.517-.02 1.03.093 1.49.331v-.208a1.134 1.134 0 0 0-.417-.901 1.416 1.416 0 0 0-.98-.368 1.545 1.545 0 0 0-1.319.717l-.895-.564a2.488 2.488 0 0 1 2.182-1.06zM23.29 13.52a.79.79 0 0 0 .337.662c.223.176.5.269.785.263.429-.001.84-.17 1.146-.472.305-.286.478-.685.478-1.103a2.047 2.047 0 0 0-1.324-.374 1.716 1.716 0 0 0-1.03.294.883.883 0 0 0-.392.73zm9.286-3.75l-3.39 7.79h-1.048l1.281-2.728-2.224-5.062h1.103l1.612 3.885 1.569-3.885h1.097z" fill="#5F6368"></path><path d="M13.986 11.284c0-.308-.024-.616-.073-.92h-4.29v1.747h2.451a2.096 2.096 0 0 1-.9 1.373v1.134h1.464a4.433 4.433 0 0 0 1.348-3.334z" fill="#4285F4"></path><path d="M9.629 15.721a4.352 4.352 0 0 0 3.01-1.097l-1.466-1.14a2.752 2.752 0 0 1-4.094-1.44H5.577v1.17a4.53 4.53 0 0 0 4.052 2.507z" fill="#34A853"></path><path d="M7.079 12.05a2.709 2.709 0 0 1 0-1.735v-1.17H5.577a4.505 4.505 0 0 0 0 4.075l1.502-1.17z" fill="#FBBC04"></path><path d="M9.629 8.44a2.452 2.452 0 0 1 1.74.68l1.3-1.293a4.37 4.37 0 0 0-3.065-1.183 4.53 4.53 0 0 0-4.027 2.5l1.502 1.171a2.715 2.715 0 0 1 2.55-1.875z" fill="#EA4335"></path></svg>
                <svg className="payment-list__item" width="38" height="24" role="img" aria-labelledby="pi-jcb" viewBox="0 0 38 24" xmlns="http://www.w3.org/2000/svg"><title id="pi-jcb">JCB</title><g fill="none" fill-rule="evenodd"><g fill-rule="nonzero"><path d="M35 0H3C1.3 0 0 1.3 0 3v18c0 1.7 1.4 3 3 3h32c1.7 0 3-1.3 3-3V3c0-1.7-1.4-3-3-3z" fill="#000" opacity=".07"></path><path d="M35 1c1.1 0 2 .9 2 2v18c0 1.1-.9 2-2 2H3c-1.1 0-2-.9-2-2V3c0-1.1.9-2 2-2h32" fill="#FFF"></path></g><path d="M11.5 5H15v11.5a2.5 2.5 0 0 1-2.5 2.5H9V7.5A2.5 2.5 0 0 1 11.5 5z" fill="#006EBC"></path><path d="M18.5 5H22v11.5a2.5 2.5 0 0 1-2.5 2.5H16V7.5A2.5 2.5 0 0 1 18.5 5z" fill="#F00036"></path><path d="M25.5 5H29v11.5a2.5 2.5 0 0 1-2.5 2.5H23V7.5A2.5 2.5 0 0 1 25.5 5z" fill="#2AB419"></path><path d="M10.755 14.5c-1.06 0-2.122-.304-2.656-.987l.78-.676c.068 1.133 3.545 1.24 3.545-.19V9.5h1.802v3.147c0 .728-.574 1.322-1.573 1.632-.466.144-1.365.221-1.898.221zm8.116 0c-.674 0-1.388-.107-1.965-.366-.948-.425-1.312-1.206-1.3-2.199.012-1.014.436-1.782 1.468-2.165 1.319-.49 3.343-.261 3.926.27v.972c-.572-.521-1.958-.898-2.919-.46-.494.226-.737.917-.744 1.448-.006.56.245 1.252.744 1.497.953.467 2.39.04 2.919-.441v1.01c-.358.255-1.253.434-2.129.434zm8.679-2.587c.37-.235.582-.567.582-1.005 0-.438-.116-.687-.348-.939-.206-.207-.58-.469-1.238-.469H23v5h3.546c.696 0 1.097-.23 1.315-.415.283-.25.426-.53.426-.96 0-.431-.155-.908-.737-1.212zm-1.906-.281h-1.428v-1.444h1.495c.956 0 .944 1.444-.067 1.444zm.288 2.157h-1.716v-1.513h1.716c.986 0 1.083 1.513 0 1.513z" fill="#FFF" fill-rule="nonzero"></path></g></svg>
                <svg className="payment-list__item" viewBox="0 0 38 24" xmlns="http://www.w3.org/2000/svg" role="img" width="38" height="24" aria-labelledby="pi-master"><title id="pi-master">Mastercard</title><path opacity=".07" d="M35 0H3C1.3 0 0 1.3 0 3v18c0 1.7 1.4 3 3 3h32c1.7 0 3-1.3 3-3V3c0-1.7-1.4-3-3-3z"></path><path fill="#fff" d="M35 1c1.1 0 2 .9 2 2v18c0 1.1-.9 2-2 2H3c-1.1 0-2-.9-2-2V3c0-1.1.9-2 2-2h32"></path><circle fill="#EB001B" cx="15" cy="12" r="7"></circle><circle fill="#F79E1B" cx="23" cy="12" r="7"></circle><path fill="#FF5F00" d="M22 12c0-2.4-1.2-4.5-3-5.7-1.8 1.3-3 3.4-3 5.7s1.2 4.5 3 5.7c1.8-1.2 3-3.3 3-5.7z"></path></svg>
                <svg className="payment-list__item" viewBox="0 0 38 24" xmlns="http://www.w3.org/2000/svg" width="38" height="24" role="img" aria-labelledby="pi-paypal"><title id="pi-paypal">PayPal</title><path opacity=".07" d="M35 0H3C1.3 0 0 1.3 0 3v18c0 1.7 1.4 3 3 3h32c1.7 0 3-1.3 3-3V3c0-1.7-1.4-3-3-3z"></path><path fill="#fff" d="M35 1c1.1 0 2 .9 2 2v18c0 1.1-.9 2-2 2H3c-1.1 0-2-.9-2-2V3c0-1.1.9-2 2-2h32"></path><path fill="#003087" d="M23.9 8.3c.2-1 0-1.7-.6-2.3-.6-.7-1.7-1-3.1-1h-4.1c-.3 0-.5.2-.6.5L14 15.6c0 .2.1.4.3.4H17l.4-3.4 1.8-2.2 4.7-2.1z"></path><path fill="#3086C8" d="M23.9 8.3l-.2.2c-.5 2.8-2.2 3.8-4.6 3.8H18c-.3 0-.5.2-.6.5l-.6 3.9-.2 1c0 .2.1.4.3.4H19c.3 0 .5-.2.5-.4v-.1l.4-2.4v-.1c0-.2.3-.4.5-.4h.3c2.1 0 3.7-.8 4.1-3.2.2-1 .1-1.8-.4-2.4-.1-.5-.3-.7-.5-.8z"></path><path fill="#012169" d="M23.3 8.1c-.1-.1-.2-.1-.3-.1-.1 0-.2 0-.3-.1-.3-.1-.7-.1-1.1-.1h-3c-.1 0-.2 0-.2.1-.2.1-.3.2-.3.4l-.7 4.4v.1c0-.3.3-.5.6-.5h1.3c2.5 0 4.1-1 4.6-3.8v-.2c-.1-.1-.3-.2-.5-.2h-.1z"></path></svg>
                <svg className="payment-list__item" viewBox="0 0 38 24" width="38" height="24" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="pi-venmo"><title id="pi-venmo">Venmo</title><g fill="none" fill-rule="evenodd"><rect fill-opacity=".07" fill="#000" width="38" height="24" rx="3"></rect><path fill="#3D95CE" d="M35 1c1.1 0 2 .9 2 2v18c0 1.1-.9 2-2 2H3c-1.1 0-2-.9-2-2V3c0-1.1.9-2 2-2h32"></path><path d="M24.675 8.36c0 3.064-2.557 7.045-4.633 9.84h-4.74L13.4 6.57l4.151-.402 1.005 8.275c.94-1.566 2.099-4.025 2.099-5.702 0-.918-.154-1.543-.394-2.058l3.78-.783c.437.738.634 1.499.634 2.46z" fill="#FFF" fill-rule="nonzero"></path></g></svg>
                <svg className="payment-list__item" viewBox="0 0 38 24" xmlns="http://www.w3.org/2000/svg" role="img" width="38" height="24" aria-labelledby="pi-visa"><title id="pi-visa">Visa</title><path opacity=".07" d="M35 0H3C1.3 0 0 1.3 0 3v18c0 1.7 1.4 3 3 3h32c1.7 0 3-1.3 3-3V3c0-1.7-1.4-3-3-3z"></path><path fill="#fff" d="M35 1c1.1 0 2 .9 2 2v18c0 1.1-.9 2-2 2H3c-1.1 0-2-.9-2-2V3c0-1.1.9-2 2-2h32"></path><path d="M28.3 10.1H28c-.4 1-.7 1.5-1 3h1.9c-.3-1.5-.3-2.2-.6-3zm2.9 5.9h-1.7c-.1 0-.1 0-.2-.1l-.2-.9-.1-.2h-2.4c-.1 0-.2 0-.2.2l-.3.9c0 .1-.1.1-.1.1h-2.1l.2-.5L27 8.7c0-.5.3-.7.8-.7h1.5c.1 0 .2 0 .2.2l1.4 6.5c.1.4.2.7.2 1.1.1.1.1.1.1.2zm-13.4-.3l.4-1.8c.1 0 .2.1.2.1.7.3 1.4.5 2.1.4.2 0 .5-.1.7-.2.5-.2.5-.7.1-1.1-.2-.2-.5-.3-.8-.5-.4-.2-.8-.4-1.1-.7-1.2-1-.8-2.4-.1-3.1.6-.4.9-.8 1.7-.8 1.2 0 2.5 0 3.1.2h.1c-.1.6-.2 1.1-.4 1.7-.5-.2-1-.4-1.5-.4-.3 0-.6 0-.9.1-.2 0-.3.1-.4.2-.2.2-.2.5 0 .7l.5.4c.4.2.8.4 1.1.6.5.3 1 .8 1.1 1.4.2.9-.1 1.7-.9 2.3-.5.4-.7.6-1.4.6-1.4 0-2.5.1-3.4-.2-.1.2-.1.2-.2.1zm-3.5.3c.1-.7.1-.7.2-1 .5-2.2 1-4.5 1.4-6.7.1-.2.1-.3.3-.3H18c-.2 1.2-.4 2.1-.7 3.2-.3 1.5-.6 3-1 4.5 0 .2-.1.2-.3.2M5 8.2c0-.1.2-.2.3-.2h3.4c.5 0 .9.3 1 .8l.9 4.4c0 .1 0 .1.1.2 0-.1.1-.1.1-.1l2.1-5.1c-.1-.1 0-.2.1-.2h2.1c0 .1 0 .1-.1.2l-3.1 7.3c-.1.2-.1.3-.2.4-.1.1-.3 0-.5 0H9.7c-.1 0-.2 0-.2-.2L7.9 9.5c-.2-.2-.5-.5-.9-.6-.6-.3-1.7-.5-1.9-.5L5 8.2z" fill="#142688"></path></svg>
              </div>
          </div>
          </div>
        </aside>
      </div>
    </footer>
  )
}
