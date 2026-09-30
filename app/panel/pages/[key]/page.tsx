'use client'

import { use, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'
import { useTranslation, type Language } from '@/lib/i18n'
import Link from 'next/link'
import dynamic from 'next/dynamic'

const RichTextEditor = dynamic(() => import('@/components/rich-text-editor'), {
  ssr: false,
})

type Page = {
  id: string
  key: string
  titleFa: string
  titleEn: string
  contentFa: string
  contentEn: string
}

export default function PageEditPage({ params }: { params: Promise<{ key: string }> }) {
  const { key } = use(params)
  const router = useRouter()
  const [lang, setLang] = useState<Language>('fa')
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [formData, setFormData] = useState({
    contentFa: '',
    contentEn: '',
  })
  const t = useTranslation(lang)

  useEffect(() => {
    const savedLang = localStorage.getItem('lang') as Language
    if (savedLang) setLang(savedLang)
    fetchPage()
  }, [])

  const fetchPage = async () => {
    try {
      const res = await fetch(`/api/pages/${key}`)
      if (res.ok) {
        const data: Page = await res.json()
        setFormData({
          contentFa: data.contentFa,
          contentEn: data.contentEn,
        })
      }
    } catch (error) {
      console.error('Failed to fetch page:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)

    try {
      const res = await fetch(`/api/pages/${key}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      if (res.ok) {
        alert(t.success)
      } else {
        const error = await res.json()
        alert(error.error)
      }
    } catch (error) {
      console.error('Failed to save page:', error)
      alert(t.error)
    } finally {
      setSaving(false)
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
    about: { fa: 'ویرایش صفحه درباره ما', en: 'Edit About Us Page' },
    contact: { fa: 'ویرایش صفحه تماس با ما', en: 'Edit Contact Us Page' },
  }

  return (
    <div className="p-6">
      <div className="mb-6 flex items-center gap-4">
        <Link
          href="/panel/pages"
          className="rounded-lg p-2 transition-colors hover:bg-gray-100 dark:hover:bg-gray-700"
        >
          <ArrowLeft className={`h-5 w-5 ${lang === 'en' ? 'rotate-180' : ''}`} />
        </Link>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          {pageLabels[key]?.[lang] || key}
        </h1>
      </div>

      <form onSubmit={handleSubmit} className="mx-auto max-w-4xl space-y-6">
        {/* Persian Content */}
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
          <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
            محتوا (فارسی)
          </label>
          <RichTextEditor
            content={formData.contentFa}
            onChange={(content) => setFormData({ ...formData, contentFa: content })}
            placeholder="محتوای صفحه را اینجا بنویسید..."
          />
        </div>

        {/* English Content */}
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
          <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
            Content (English)
          </label>
          <RichTextEditor
            content={formData.contentEn}
            onChange={(content) => setFormData({ ...formData, contentEn: content })}
            placeholder="Write page content here..."
          />
        </div>

        {/* Submit Buttons */}
        <div className="flex gap-4 rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
          <button
            type="submit"
            disabled={saving}
            className="flex-1 rounded-lg bg-blue-600 py-3 text-sm font-semibold text-white transition-colors hover:bg-blue-700 disabled:opacity-50"
          >
            {saving ? t.loading : t.save}
          </button>
          <Link
            href="/panel/pages"
            className="flex flex-1 items-center justify-center rounded-lg border border-gray-300 py-3 text-sm font-semibold text-gray-700 transition-colors hover:bg-gray-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"
          >
            {t.cancel}
          </Link>
        </div>
      </form>
    </div>
  )
}
