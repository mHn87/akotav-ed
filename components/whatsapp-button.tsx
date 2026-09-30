'use client'

import { useEffect, useState } from 'react'
import { MessageCircle } from 'lucide-react'

export default function WhatsAppButton() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      // Show button after scrolling 300px
      setVisible(window.scrollY > 300)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleClick = () => {
    // Open WhatsApp with the phone number
    const phoneNumber = '989194862368' // 09194862368 in international format
    const url = `https://wa.me/${phoneNumber}`
    window.open(url, '_blank')
  }

  return (
    <button
      onClick={handleClick}
      className={`fixed bottom-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-green-500 text-white shadow-lg transition-all duration-300 hover:bg-green-600 hover:scale-110 ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16 pointer-events-none'
      } ltr:right-6 rtl:left-6`}
      aria-label="WhatsApp"
    >
      <MessageCircle className="h-7 w-7" />
    </button>
  )
}
