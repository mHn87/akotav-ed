'use client'

import { use, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowLeft, Upload, X } from 'lucide-react'
import { useTranslation, type Language } from '@/lib/i18n'
import Link from 'next/link'

type Partner = {
  id: string
  title: string | null
  logoUrl: string
  filename: string
  websiteUrl: string
}

export default function PartnerFormPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const router = useRouter()
  const isNew = id === 'new'
  const [lang, setLang] = useState<Language>('fa')
  const [loading, setLoading] = useState(!isNew)
  const [saving, setSaving] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [formData, setFormData] = useState({
    title: '',
    websiteUrl: '',
  })
  const [logo, setLogo] = useState<{ url: string; filename: string } | null>(null)
  const t = useTranslation(lang)

  useEffect(() => {
    const savedLang = localStorage.getItem('lang') as Language
    if (savedLang) setLang(savedLang)
    if (!isNew) {
      fetchPartner()
    }
  }, [])

  const fetchPartner = async () => {
    try {
      const res = await fetch(`/api/partners/${id}`)
      if (res.ok) {
        const data: Partner = await res.json()
        setFormData({
          title: data.title || '',
          websiteUrl: data.websiteUrl,
        })
        setLogo({ url: data.logoUrl, filename: data.filename })
      }
    } catch (error) {
      console.error('Failed to fetch partner:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleLogoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    if (!file.type.startsWith('image/')) {
      alert(lang === 'fa' ? 'فقط تصویر مجاز است' : 'Only images are allowed')
      return
    }

    try {
      setUploadProgress(0)

      const formData = new FormData()
      formData.append('file', file)

      const progressInterval = setInterval(() => {
        setUploadProgress(prev => {
          if (prev >= 90) {
            clearInterval(progressInterval)
            return prev
          }
          return prev + 10
        })
      }, 200)

      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      })

      clearInterval(progressInterval)

      if (res.ok) {
        const data = await res.json()
        setUploadProgress(100)
        
        setTimeout(() => {
          setLogo({ url: data.url, filename: data.filename })
          setUploadProgress(0)
        }, 500)
      } else {
        clearInterval(progressInterval)
        setUploadProgress(0)
        alert(lang === 'fa' ? 'خطا در آپلود لوگو' : 'Error uploading logo')
      }
    } catch (error) {
      console.error('Upload error:', error)
      setUploadProgress(0)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!logo) {
      alert(lang === 'fa' ? 'لوگو الزامی است' : 'Logo is required')
      return
    }

    if (!formData.websiteUrl) {
      alert(lang === 'fa' ? 'وب‌سایت الزامی است' : 'Website URL is required')
      return
    }

    setSaving(true)

    try {
      const url = isNew ? '/api/partners' : `/api/partners/${id}`
      const method = isNew ? 'POST' : 'PUT'

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          logoUrl: logo.url,
          filename: logo.filename,
        }),
      })

      if (res.ok) {
        router.push('/panel/partners')
      } else {
        const error = await res.json()
        alert(error.error)
      }
    } catch (error) {
      console.error('Failed to save partner:', error)
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

  return (
    <div className="p-6">
      <div className="mb-6 flex items-center gap-4">
        <Link
          href="/panel/partners"
          className="rounded-lg p-2 transition-colors hover:bg-gray-100 dark:hover:bg-gray-700"
        >
          <ArrowLeft className={`h-5 w-5 ${lang === 'en' ? 'rotate-180' : ''}`} />
        </Link>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          {isNew ? t.addPartner : t.editPartner}
        </h1>
      </div>

      <form onSubmit={handleSubmit} className="mx-auto max-w-2xl space-y-6">
        {/* Title */}
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
          <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
            {t.partnerTitle} ({lang === 'fa' ? 'اختیاری' : 'Optional'})
          </label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
            placeholder={lang === 'fa' ? 'نام شرکت' : 'Company name'}
          />
        </div>

        {/* Logo Upload */}
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
          <label className="mb-4 block text-sm font-medium text-gray-700 dark:text-gray-300">
            {t.partnerLogo} *
          </label>
          
          {!logo ? (
            <label className="flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 py-12 transition-colors hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:bg-gray-600">
              <Upload className="mb-2 h-8 w-8 text-gray-500" />
              <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                {lang === 'fa' ? 'آپلود لوگوی شرکت' : 'Upload company logo'}
              </span>
              <input
                type="file"
                accept="image/*"
                onChange={handleLogoUpload}
                className="hidden"
              />
            </label>
          ) : (
            <div className="relative rounded-lg border border-gray-200 bg-gray-50 p-8 dark:border-gray-600 dark:bg-gray-700">
              <img
                src={logo.url}
                alt="Partner logo"
                className="mx-auto max-h-40 object-contain"
              />
              <button
                type="button"
                onClick={() => setLogo(null)}
                className="absolute left-2 top-2 rounded-lg bg-red-500 p-2 text-white transition-colors hover:bg-red-600"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          )}

          {uploadProgress > 0 && uploadProgress < 100 && (
            <div className="mt-4">
              <div className="mb-2 flex items-center justify-between text-sm">
                <span className="text-gray-700 dark:text-gray-300">{t.uploading}</span>
                <span className="font-semibold text-blue-600 dark:text-blue-400">{uploadProgress}%</span>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-blue-200 dark:bg-blue-900">
                <div
                  className="h-full bg-blue-600 transition-all duration-300 dark:bg-blue-500"
                  style={{ width: `${uploadProgress}%` }}
                />
              </div>
            </div>
          )}
        </div>

        {/* Website URL */}
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
          <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
            {t.partnerWebsite} *
          </label>
          <input
            type="url"
            value={formData.websiteUrl}
            onChange={(e) => setFormData({ ...formData, websiteUrl: e.target.value })}
            className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
            placeholder="https://example.com"
            required
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
            href="/panel/partners"
            className="flex flex-1 items-center justify-center rounded-lg border border-gray-300 py-3 text-sm font-semibold text-gray-700 transition-colors hover:bg-gray-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"
          >
            {t.cancel}
          </Link>
        </div>
      </form>
    </div>
  )
}
