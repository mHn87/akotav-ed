'use client'

import { use, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowLeft, Upload, X, Video } from 'lucide-react'
import { useTranslation, type Language } from '@/lib/i18n'
import Link from 'next/link'

type Category = {
  id: string
  nameFa: string
  nameEn: string
}

type MediaItem = {
  id?: string
  type: string
  url: string
  filename: string
  isMain: boolean
}

type Product = {
  id: string
  nameFa: string
  nameEn: string | null
  descriptionFa: string | null
  descriptionEn: string | null
  categoryId: string
  media: MediaItem[]
}

export default function ProductFormPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const router = useRouter()
  const isNew = id === 'new'
  const [lang, setLang] = useState<Language>('fa')
  const [loading, setLoading] = useState(!isNew)
  const [saving, setSaving] = useState(false)
  const [categories, setCategories] = useState<Category[]>([])
  const [uploadProgress, setUploadProgress] = useState<{ [key: string]: number }>({})
  const [formData, setFormData] = useState({
    nameFa: '',
    nameEn: '',
    descriptionFa: '',
    descriptionEn: '',
    categoryId: '',
  })
  const [media, setMedia] = useState<MediaItem[]>([])
  const t = useTranslation(lang)

  useEffect(() => {
    const savedLang = localStorage.getItem('lang') as Language
    if (savedLang) setLang(savedLang)
    fetchCategories()
    if (!isNew) {
      fetchProduct()
    }
  }, [])

  const fetchCategories = async () => {
    try {
      const res = await fetch('/api/categories')
      if (res.ok) {
        const data = await res.json()
        setCategories(data)
      }
    } catch (error) {
      console.error('Failed to fetch categories:', error)
    }
  }

  const fetchProduct = async () => {
    try {
      const res = await fetch(`/api/products/${id}`)
      if (res.ok) {
        const data: Product = await res.json()
        setFormData({
          nameFa: data.nameFa,
          nameEn: data.nameEn || '',
          descriptionFa: data.descriptionFa || '',
          descriptionEn: data.descriptionEn || '',
          categoryId: data.categoryId,
        })
        setMedia(data.media)
      }
    } catch (error) {
      console.error('Failed to fetch product:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files) return

    for (let i = 0; i < files.length; i++) {
      const file = files[i]
      const uploadId = `${Date.now()}-${i}`
      
      try {
        setUploadProgress(prev => ({ ...prev, [uploadId]: 0 }))

        const formData = new FormData()
        formData.append('file', file)

        // Simulate progress (in real scenario, use XMLHttpRequest for real progress)
        const progressInterval = setInterval(() => {
          setUploadProgress(prev => {
            const current = prev[uploadId] || 0
            if (current >= 90) {
              clearInterval(progressInterval)
              return prev
            }
            return { ...prev, [uploadId]: current + 10 }
          })
        }, 200)

        const res = await fetch('/api/upload', {
          method: 'POST',
          body: formData,
        })

        clearInterval(progressInterval)

        if (res.ok) {
          const data = await res.json()
          setUploadProgress(prev => ({ ...prev, [uploadId]: 100 }))
          
          setTimeout(() => {
            setMedia(prev => {
              const newItem = {
                type: data.type,
                url: data.url,
                filename: data.filename,
                isMain: data.type === 'image' && prev.filter(m => m.type === 'image').length === 0
              }
              return [...prev, newItem]
            })
            setUploadProgress(prev => {
              const newProgress = { ...prev }
              delete newProgress[uploadId]
              return newProgress
            })
          }, 500)
        } else {
          clearInterval(progressInterval)
          setUploadProgress(prev => {
            const newProgress = { ...prev }
            delete newProgress[uploadId]
            return newProgress
          })
          alert('خطا در آپلود فایل')
        }
      } catch (error) {
        console.error('Upload error:', error)
        setUploadProgress(prev => {
          const newProgress = { ...prev }
          delete newProgress[uploadId]
          return newProgress
        })
      }
    }
  }

  const handleRemoveMedia = (index: number) => {
    setMedia(prev => prev.filter((_, i) => i !== index))
  }

  const handleSetMainImage = (index: number) => {
    setMedia(prev => {
      const updated = prev.map((item, i) => ({
        ...item,
        isMain: i === index && item.type === 'image'
      }))
      return updated
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)

    try {
      const url = isNew ? '/api/products' : `/api/products/${id}`
      const method = isNew ? 'POST' : 'PUT'

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          media: media.map(({ id, ...m }) => m),
        }),
      })

      if (res.ok) {
        router.push('/panel/products')
      } else {
        const error = await res.json()
        alert(error.error)
      }
    } catch (error) {
      console.error('Failed to save product:', error)
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
          href="/panel/products"
          className="rounded-lg p-2 transition-colors hover:bg-gray-100 dark:hover:bg-gray-700"
        >
          <ArrowLeft className={`h-5 w-5 ${lang === 'en' ? 'rotate-180' : ''}`} />
        </Link>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          {isNew ? t.addProduct : t.editProduct}
        </h1>
      </div>

      <form onSubmit={handleSubmit} className="mx-auto max-w-3xl space-y-6">
        {/* Persian Name */}
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
          <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
            {t.productNameFa} *
          </label>
          <input
            type="text"
            value={formData.nameFa}
            onChange={(e) => setFormData({ ...formData, nameFa: e.target.value })}
            className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
            required
          />
        </div>

        {/* English Name */}
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
          <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
            {t.productNameEn}
          </label>
          <input
            type="text"
            value={formData.nameEn}
            onChange={(e) => setFormData({ ...formData, nameEn: e.target.value })}
            className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
          />
        </div>

        {/* Category */}
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
          <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
            {t.category} *
          </label>
          <select
            value={formData.categoryId}
            onChange={(e) => setFormData({ ...formData, categoryId: e.target.value })}
            className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
            required
          >
            <option value="">{t.selectCategory}</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {lang === 'fa' ? cat.nameFa : cat.nameEn}
              </option>
            ))}
          </select>
        </div>

        {/* Persian Description */}
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
          <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
            {t.productDescFa}
          </label>
          <textarea
            value={formData.descriptionFa}
            onChange={(e) => setFormData({ ...formData, descriptionFa: e.target.value })}
            rows={4}
            className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
          />
        </div>

        {/* English Description */}
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
          <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
            {t.productDescEn}
          </label>
          <textarea
            value={formData.descriptionEn}
            onChange={(e) => setFormData({ ...formData, descriptionEn: e.target.value })}
            rows={4}
            className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
          />
        </div>

        {/* Media Upload */}
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
          <label className="mb-4 block text-sm font-medium text-gray-700 dark:text-gray-300">
            {t.media}
          </label>
          
          {/* Upload Button */}
          <label className="mb-4 flex cursor-pointer items-center justify-center gap-2 rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 px-4 py-8 transition-colors hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:bg-gray-600">
            <Upload className="h-5 w-5 text-gray-500" />
            <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
              {t.uploadMedia}
            </span>
            <input
              type="file"
              multiple
              accept="image/*,video/*"
              onChange={handleFileUpload}
              className="hidden"
            />
          </label>

          {/* Upload Progress */}
          {Object.entries(uploadProgress).map(([id, progress]) => (
            <div key={id} className="mb-4 rounded-lg bg-blue-50 p-4 dark:bg-blue-900/20">
              <div className="mb-2 flex items-center justify-between text-sm">
                <span className="text-gray-700 dark:text-gray-300">{t.uploading}</span>
                <span className="font-semibold text-blue-600 dark:text-blue-400">{progress}%</span>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-blue-200 dark:bg-blue-900">
                <div
                  className="h-full bg-blue-600 transition-all duration-300 dark:bg-blue-500"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          ))}

          {/* Media List */}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {media.map((item, index) => (
              <div 
                key={index} 
                className={`group relative overflow-hidden rounded-lg border-2 transition-all ${
                  item.isMain && item.type === 'image' 
                    ? 'border-blue-500 shadow-lg' 
                    : 'border-gray-200 dark:border-gray-600'
                } bg-gray-50 dark:bg-gray-700`}
              >
                <div 
                  className={`aspect-video ${item.type === 'image' ? 'cursor-pointer' : ''}`}
                  onClick={() => item.type === 'image' && handleSetMainImage(index)}
                >
                  {item.type === 'image' ? (
                    <>
                      <img src={item.url} alt="" className="h-full w-full object-cover" />
                      {item.isMain && (
                        <div className="absolute left-2 top-2 rounded bg-blue-500 px-2 py-1 text-xs font-semibold text-white">
                          {lang === 'fa' ? 'تصویر اصلی' : 'Main Image'}
                        </div>
                      )}
                    </>
                  ) : (
                    <div className="flex h-full items-center justify-center bg-gray-800">
                      <Video className="h-12 w-12 text-gray-400" />
                      <video src={item.url} className="absolute inset-0 h-full w-full object-cover opacity-50" />
                    </div>
                  )}
                </div>
                <div className="p-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-600 dark:text-gray-400">
                      {item.type === 'image' ? (lang === 'fa' ? 'تصویر' : 'Image') : (lang === 'fa' ? 'ویدیو' : 'Video')}
                    </span>
                    <button
                      type="button"
                      onClick={() => handleRemoveMedia(index)}
                      className="rounded-lg bg-red-50 p-1.5 text-red-600 transition-colors hover:bg-red-100 dark:bg-red-900/20 dark:text-red-400 dark:hover:bg-red-900/30"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                  {item.type === 'image' && !item.isMain && (
                    <button
                      type="button"
                      onClick={() => handleSetMainImage(index)}
                      className="mt-2 w-full rounded bg-blue-50 px-2 py-1 text-xs font-medium text-blue-600 hover:bg-blue-100 dark:bg-blue-900/20 dark:text-blue-400"
                    >
                      {lang === 'fa' ? 'انتخاب به عنوان تصویر اصلی' : 'Set as Main Image'}
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
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
            href="/panel/products"
            className="flex flex-1 items-center justify-center rounded-lg border border-gray-300 py-3 text-sm font-semibold text-gray-700 transition-colors hover:bg-gray-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"
          >
            {t.cancel}
          </Link>
        </div>
      </form>
    </div>
  )
}
