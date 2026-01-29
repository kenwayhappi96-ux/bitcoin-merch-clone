'use client'

import { usePathname } from 'next/navigation'
import Header from './Header'
import Footer from './Footer'
import CartSidebar from './CartSidebar'
import ReviewsWidget from './ReviewsWidget'

export default function ConditionalLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  
  // Pages without header/footer (admin pages and login)
  const noLayoutPages = ['/login','/checkout']
  const isNoLayoutPage = noLayoutPages.includes(pathname) || pathname.startsWith('/admin')

  if (isNoLayoutPage) {
    return <>{children}</>
  }

  return (
    <>
      <Header />
      {children}
      <Footer />
      <CartSidebar />
      <ReviewsWidget />
    </>
  )
}
