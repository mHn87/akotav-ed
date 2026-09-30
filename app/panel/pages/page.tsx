'use client'

import { useEffect, useState } from 'react'
import { FileText, Edit } from 'lucide-react'
import { useTranslation, type Language } from '@/lib/i18n'
import Link from 'next/link'

type Page = {
  id: string
  key: string
  titleFa: string
  titleEn: string
  contentFa: string
  contentEn: string
  updatedAt: string
}

export default function PagesListPage() {
  const [lang, setLang] = useState<Language>('fa')
  const [pages, setPages] = useState<Page[]>([])
  const [loading, setLoading] = useState(true)
  const t = useTranslation(lang)

  useEffect(() => {
    const savedLang = localStorage.getItem('lang') as Language
    if (savedLang) setLang(savedLang)
    fetchPages()
  }, [])

  const fetchPages = async () => {
    try {
      const res = await fetch('/api/pages')
      if (res.ok) {
        const data = await res.json()
        setPages(data)
      }
    } catch (error) {
      console.error('Failed to fetch pages:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="text-gray-600 dark:text-gray-400">{t.loading}</div>
      </div>
    )
  }

  const pageLabels: { [key: string]: { fa: string; en: string } } = {
    about: { fa: 'درباره ما', en: 'About Us' },
    contact: { fa: 'تماس با ما', en: 'Contact Us' },
  }

  return (
    <div className="p-6">
      <h1 className="mb-6 text-2xl font-bold text-gray-900 dark:text-white">
        {t.pages}
      </h1>

      <div className="grid gap-6 sm:grid-cols-2">
        {pages.map((page) => (
          <div
            key={page.id}
            className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition-shadow hover:shadow-md dark:border-gray-700 dark:bg-gray-800"
          >
            <div className="border-b border-gray-200 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-900">
              <div className="flex items-center gap-3">
                <div className="rounded-lg bg-blue-100 p-2 dark:bg-blue-900/30">
                  <FileText className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">
                    {lang === 'fa' ? page.titleFa : page.titleEn}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {pageLabels[page.key]?.[lang] || page.key}
                  </p>
                </div>
              </div>
            </div>

            <div className="p-4">
              <p className="mb-4 line-clamp-3 text-sm text-gray-600 dark:text-gray-400">
                {lang === 'fa' 
                  ? page.contentFa.replace(/<[^>]*>/g, '').substring(0, 150)
                  : page.contentEn.replace(/<[^>]*>/g, '').substring(0, 150)}
                ...
              </p>
              <Link
                href={`/panel/pages/${page.key}`}
                className="flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-blue-700"
              >
                <Edit className="h-4 w-4" />
                {t.edit}
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
