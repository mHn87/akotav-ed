'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Home, ArrowLeft, FileQuestion } from 'lucide-react'

export default function NotFound() {
  const [lang, setLang] = useState<'fa' | 'en'>('fa')

  useEffect(() => {
    // Detect language from path or localStorage
    const path = window.location.pathname
    if (path.startsWith('/panel')) {
      const savedLang = localStorage.getItem('lang') as 'fa' | 'en'
      if (savedLang) setLang(savedLang)
    }
  }, [])

  const t = {
    fa: {
      title: '404',
      subtitle: 'صفحه مورد نظر یافت نشد',
      description: 'متأسفانه صفحه‌ای که به دنبال آن هستید وجود ندارد یا حذف شده است.',
      home: 'بازگشت به صفحه اصلی',
      panel: 'بازگشت به پنل',
    },
    en: {
      title: '404',
      subtitle: 'Page Not Found',
      description: 'Sorry, the page you are looking for does not exist or has been removed.',
      home: 'Back to Home',
      panel: 'Back to Panel',
    },
  }

  const isPanel = typeof window !== 'undefined' && window.location.pathname.startsWith('/panel')
  const dir = lang === 'fa' ? 'rtl' : 'ltr'

  return (
    <html lang={lang} dir={dir}>
      <body>
        <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 via-white to-blue-50 p-4 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
          <div className="text-center">
            <div className="mb-8 flex justify-center">
              <div className="rounded-full bg-blue-100 p-6 dark:bg-blue-900/30">
                <FileQuestion className="h-24 w-24 text-blue-600 dark:text-blue-400" />
              </div>
            </div>

            <h1 className="mb-4 text-9xl font-bold text-blue-600 dark:text-blue-400">
              {t[lang].title}
            </h1>

            <h2 className="mb-4 text-3xl font-bold text-gray-900 dark:text-white">
              {t[lang].subtitle}
            </h2>

            <p className="mb-8 text-gray-600 dark:text-gray-400">
              {t[lang].description}
            </p>

            <div className="flex flex-col justify-center gap-4 sm:flex-row">
              {isPanel ? (
                <Link
                  href="/panel"
                  className="flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white shadow-lg transition-colors hover:bg-blue-700"
                >
                  <ArrowLeft className={`h-5 w-5 ${lang === 'en' ? 'rotate-180' : ''}`} />
                  {t[lang].panel}
                </Link>
              ) : (
                <Link
                  href="/"
                  className="flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white shadow-lg transition-colors hover:bg-blue-700"
                >
                  <Home className="h-5 w-5" />
                  {t[lang].home}
                </Link>
              )}
            </div>
          </div>
        </div>
      </body>
    </html>
  )
}
