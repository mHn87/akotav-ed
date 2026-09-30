'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import WhatsAppButton from '@/components/whatsapp-button'

type PageData = {
  id: string
  key: string
  titleFa: string
  titleEn: string
  contentFa: string
  contentEn: string
}

export default function AboutPage() {
  const [lang, setLang] = useState<'fa' | 'en'>('fa')
  const [page, setPage] = useState<PageData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const savedLang = localStorage.getItem('lang') as 'fa' | 'en'
    if (savedLang) setLang(savedLang)
    
    fetch('/api/public/pages/about')
      .then(res => res.json())
      .then(data => setPage(data))
      .catch(err => console.error('Failed to fetch about page:', err))
      .finally(() => setLoading(false))
  }, [])

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-gray-600 dark:text-gray-400">
          {lang === 'fa' ? 'در حال بارگذاری...' : 'Loading...'}
        </div>
      </div>
    )
  }

  if (!page) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <p className="mb-4 text-gray-600 dark:text-gray-400">
            {lang === 'fa' ? 'صفحه یافت نشد' : 'Page not found'}
          </p>
          <Link href="/" className="text-blue-600 hover:text-blue-700">
            {lang === 'fa' ? 'بازگشت به خانه' : 'Back to Home'}
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="border-b border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800">
        <div className="mx-auto max-w-4xl px-5 py-8 lg:px-10">
          <div className="mb-4 flex items-center justify-between">
            <Link
              href="/"
              className="text-sm font-medium text-blue-600 hover:text-blue-700 dark:text-blue-400"
            >
              ← {lang === 'fa' ? 'بازگشت به خانه' : 'Back to Home'}
            </Link>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
            {lang === 'fa' ? page.titleFa : page.titleEn}
          </h1>
        </div>
      </div>

      {/* Content */}
      <div className="mx-auto max-w-4xl px-5 py-12 lg:px-10">
        <div className="rounded-xl border border-gray-200 bg-white p-8 shadow-sm dark:border-gray-700 dark:bg-gray-800 lg:p-12">
          <div 
            className="prose prose-lg max-w-none text-justify leading-relaxed dark:prose-invert"
            dangerouslySetInnerHTML={{ 
              __html: lang === 'fa' ? page.contentFa : page.contentEn
            }}
          />
        </div>
      </div>
      <WhatsAppButton />
    </div>
  )
}
