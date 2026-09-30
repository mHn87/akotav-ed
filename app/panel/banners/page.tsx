'use client'

import { useEffect, useState } from 'react'
import { Plus, Edit, Trash2, ImageIcon, ChevronUp, ChevronDown, ExternalLink } from 'lucide-react'
import { useTranslation, type Language } from '@/lib/i18n'
import Link from 'next/link'

type Banner = {
  id: string
  title: string | null
  imageUrl: string
  filename: string
  linkUrl: string | null
  order: number
  createdAt: string
}

export default function BannersPage() {
  const [lang, setLang] = useState<Language>('fa')
  const [banners, setBanners] = useState<Banner[]>([])
  const [loading, setLoading] = useState(true)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [selectedBanner, setSelectedBanner] = useState<Banner | null>(null)
  const t = useTranslation(lang)

  useEffect(() => {
    const savedLang = localStorage.getItem('lang') as Language
    if (savedLang) setLang(savedLang)
    fetchBanners()
  }, [])

  const fetchBanners = async () => {
    try {
      const res = await fetch('/api/banners')
      if (res.ok) {
        const data = await res.json()
        setBanners(data)
      }
    } catch (error) {
      console.error('Failed to fetch banners:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleMove = async (id: string, direction: 'up' | 'down') => {
    try {
      const res = await fetch(`/api/banners/${id}/move`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ direction })
      })

      if (res.ok) {
        await fetchBanners()
      }
    } catch (error) {
      console.error('Failed to move banner:', error)
    }
  }

  const handleDelete = async () => {
    if (!selectedBanner) return

    try {
      const res = await fetch(`/api/banners/${selectedBanner.id}`, {
        method: 'DELETE'
      })

      if (res.ok) {
        await fetchBanners()
        setShowDeleteModal(false)
        setSelectedBanner(null)
      } else {
        const error = await res.json()
        alert(error.error)
      }
    } catch (error) {
      console.error('Failed to delete banner:', error)
      alert(t.error)
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
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          {t.banners}
        </h1>
        <Link
          href="/panel/banners/new"
          className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-blue-700"
        >
          <Plus className="h-5 w-5" />
          {t.addBanner}
        </Link>
      </div>

      {banners.length === 0 ? (
        <div className="rounded-xl border border-gray-200 bg-white p-12 text-center dark:border-gray-700 dark:bg-gray-800">
          <ImageIcon className="mx-auto mb-4 h-12 w-12 text-gray-400" />
          <p className="text-gray-600 dark:text-gray-400">{t.noData}</p>
        </div>
      ) : (
        <div className="space-y-3">
          {banners.map((banner, index) => (
            <div
              key={banner.id}
              className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800"
            >
              {/* Top Row: Image and Info */}
              <div className="flex items-center gap-4">
                {/* Banner Image */}
                <div className="h-20 w-32 flex-shrink-0 overflow-hidden rounded-lg bg-gray-100 dark:bg-gray-700">
                  <img
                    src={banner.imageUrl}
                    alt={banner.title || 'Banner'}
                    className="h-full w-full object-cover"
                  />
                </div>

                {/* Banner Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-gray-900 dark:text-white truncate">
                      {banner.title || (lang === 'fa' ? 'بنر بدون عنوان' : 'Untitled Banner')}
                    </h3>
                    <span className="text-sm font-medium text-gray-600 dark:text-gray-400 whitespace-nowrap">
                      #{banner.order}
                    </span>
                  </div>
                  {banner.linkUrl && (
                    <a
                      href={banner.linkUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-1 flex items-center gap-1 text-sm text-blue-600 hover:underline dark:text-blue-400 truncate"
                    >
                      <ExternalLink className="h-3 w-3 flex-shrink-0" />
                      <span className="truncate">{banner.linkUrl}</span>
                    </a>
                  )}
                </div>
              </div>

              {/* Bottom Row: Actions */}
              <div className="mt-3 flex items-center justify-end gap-2 border-t border-gray-100 pt-3 dark:border-gray-700">
                {/* Move Up */}
                <button
                  onClick={() => handleMove(banner.id, 'up')}
                  disabled={index === 0}
                  className="rounded-lg border border-gray-300 p-2 transition-colors hover:bg-gray-100 disabled:opacity-30 dark:border-gray-600 dark:hover:bg-gray-700"
                  title={t.moveUp}
                >
                  <ChevronUp className="h-5 w-5" />
                </button>

                {/* Move Down */}
                <button
                  onClick={() => handleMove(banner.id, 'down')}
                  disabled={index === banners.length - 1}
                  className="rounded-lg border border-gray-300 p-2 transition-colors hover:bg-gray-100 disabled:opacity-30 dark:border-gray-600 dark:hover:bg-gray-700"
                  title={t.moveDown}
                >
                  <ChevronDown className="h-5 w-5" />
                </button>

                {/* Edit */}
                <Link
                  href={`/panel/banners/${banner.id}`}
                  className="rounded-lg bg-blue-50 p-2 text-blue-600 transition-colors hover:bg-blue-100 dark:bg-blue-900/20 dark:text-blue-400 dark:hover:bg-blue-900/30"
                >
                  <Edit className="h-5 w-5" />
                </Link>

                {/* Delete */}
                <button
                  onClick={() => {
                    setSelectedBanner(banner)
                    setShowDeleteModal(true)
                  }}
                  className="rounded-lg bg-red-50 p-2 text-red-600 transition-colors hover:bg-red-100 dark:bg-red-900/20 dark:text-red-400 dark:hover:bg-red-900/30"
                >
                  <Trash2 className="h-5 w-5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && selectedBanner && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl dark:bg-gray-800">
            <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">
              {t.deleteBanner}
            </h2>
            <p className="mb-6 text-gray-600 dark:text-gray-400">
              {t.deleteBannerConfirm}
            </p>
            <div className="flex gap-3">
              <button
                onClick={handleDelete}
                className="flex-1 rounded-lg bg-red-600 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-red-700"
              >
                {t.confirm}
              </button>
              <button
                onClick={() => {
                  setShowDeleteModal(false)
                  setSelectedBanner(null)
                }}
                className="flex-1 rounded-lg border border-gray-300 py-2.5 text-sm font-semibold text-gray-700 transition-colors hover:bg-gray-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"
              >
                {t.cancel}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
