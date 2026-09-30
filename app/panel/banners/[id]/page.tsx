'use client'

import { use, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowLeft, Upload, X } from 'lucide-react'
import { useTranslation, type Language } from '@/lib/i18n'
import Link from 'next/link'

type Banner = {
  id: string
  title: string | null
  imageUrl: string
  filename: string
  linkUrl: string | null
}

export default function BannerFormPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const router = useRouter()
  const isNew = id === 'new'
  const [lang, setLang] = useState<Language>('fa')
  const [loading, setLoading] = useState(!isNew)
  const [saving, setSaving] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [formData, setFormData] = useState({
    title: '',
    linkUrl: '',
  })
  const [image, setImage] = useState<{ url: string; filename: string } | null>(null)
  const t = useTranslation(lang)

  useEffect(() => {
    const savedLang = localStorage.getItem('lang') as Language
    if (savedLang) setLang(savedLang)
    if (!isNew) {
      fetchBanner()
    }
  }, [])

  const fetchBanner = async () => {
    try {
      const res = await fetch(`/api/banners/${id}`)
      if (res.ok) {
        const data: Banner = await res.json()
        setFormData({
          title: data.title || '',
          linkUrl: data.linkUrl || '',
        })
        setImage({ url: data.imageUrl, filename: data.filename })
      }
    } catch (error) {
      console.error('Failed to fetch banner:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
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
          setImage({ url: data.url, filename: data.filename })
          setUploadProgress(0)
        }, 500)
      } else {
        clearInterval(progressInterval)
        setUploadProgress(0)
        alert(lang === 'fa' ? 'خطا در آپلود تصویر' : 'Error uploading image')
      }
    } catch (error) {
      console.error('Upload error:', error)
      setUploadProgress(0)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!image) {
      alert(lang === 'fa' ? 'تصویر بنر الزامی است' : 'Banner image is required')
      return
    }

    setSaving(true)

    try {
      const url = isNew ? '/api/banners' : `/api/banners/${id}`
      const method = isNew ? 'POST' : 'PUT'

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          imageUrl: image.url,
          filename: image.filename,
        }),
      })

      if (res.ok) {
        router.push('/panel/banners')
      } else {
        const error = await res.json()
        alert(error.error)
      }
    } catch (error) {
      console.error('Failed to save banner:', error)
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
          href="/panel/banners"
          className="rounded-lg p-2 transition-colors hover:bg-gray-100 dark:hover:bg-gray-700"
        >
          <ArrowLeft className={`h-5 w-5 ${lang === 'en' ? 'rotate-180' : ''}`} />
        </Link>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          {isNew ? t.addBanner : t.editBanner}
        </h1>
      </div>

      <form onSubmit={handleSubmit} className="mx-auto max-w-2xl space-y-6">
        {/* Title */}
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
          <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
            {t.bannerTitle} ({lang === 'fa' ? 'اختیاری' : 'Optional'})
          </label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
            placeholder={lang === 'fa' ? 'عنوان بنر' : 'Banner title'}
          />
        </div>

        {/* Image Upload */}
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
          <label className="mb-4 block text-sm font-medium text-gray-700 dark:text-gray-300">
            {t.bannerImage} *
          </label>
          
          {!image ? (
            <label className="flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 py-12 transition-colors hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:bg-gray-600">
              <Upload className="mb-2 h-8 w-8 text-gray-500" />
              <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                {lang === 'fa' ? 'آپلود تصویر بنر' : 'Upload banner image'}
              </span>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
            </label>
          ) : (
            <div className="relative">
              <img
                src={image.url}
                alt="Banner"
                className="w-full rounded-lg"
              />
              <button
                type="button"
                onClick={() => setImage(null)}
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

        {/* Link URL */}
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
          <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
            {t.bannerLink} ({lang === 'fa' ? 'اختیاری' : 'Optional'})
          </label>
          <input
            type="url"
            value={formData.linkUrl}
            onChange={(e) => setFormData({ ...formData, linkUrl: e.target.value })}
            className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
            placeholder="https://example.com"
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
            href="/panel/banners"
            className="flex flex-1 items-center justify-center rounded-lg border border-gray-300 py-3 text-sm font-semibold text-gray-700 transition-colors hover:bg-gray-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"
          >
            {t.cancel}
          </Link>
        </div>
      </form>
    </div>
  )
}
