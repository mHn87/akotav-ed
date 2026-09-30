'use client'

import { useEffect, useState } from 'react'
import { Plus, Edit, Trash2, Users, ExternalLink } from 'lucide-react'
import { useTranslation, type Language } from '@/lib/i18n'
import Link from 'next/link'

type Partner = {
  id: string
  title: string | null
  logoUrl: string
  filename: string
  websiteUrl: string | null
  createdAt: string
}

export default function PartnersPage() {
  const [lang, setLang] = useState<Language>('fa')
  const [partners, setPartners] = useState<Partner[]>([])
  const [loading, setLoading] = useState(true)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [selectedPartner, setSelectedPartner] = useState<Partner | null>(null)
  const t = useTranslation(lang)

  useEffect(() => {
    const savedLang = localStorage.getItem('lang') as Language
    if (savedLang) setLang(savedLang)
    fetchPartners()
  }, [])

  const fetchPartners = async () => {
    try {
      const res = await fetch('/api/partners')
      if (res.ok) {
        const data = await res.json()
        setPartners(data)
      }
    } catch (error) {
      console.error('Failed to fetch partners:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async () => {
    if (!selectedPartner) return

    try {
      const res = await fetch(`/api/partners/${selectedPartner.id}`, {
        method: 'DELETE'
      })

      if (res.ok) {
        await fetchPartners()
        setShowDeleteModal(false)
        setSelectedPartner(null)
      } else {
        const error = await res.json()
        alert(error.error)
      }
    } catch (error) {
      console.error('Failed to delete partner:', error)
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
          {t.partners}
        </h1>
        <Link
          href="/panel/partners/new"
          className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-blue-700"
        >
          <Plus className="h-5 w-5" />
          {t.addPartner}
        </Link>
      </div>

      {partners.length === 0 ? (
        <div className="rounded-xl border border-gray-200 bg-white p-12 text-center dark:border-gray-700 dark:bg-gray-800">
          <Users className="mx-auto mb-4 h-12 w-12 text-gray-400" />
          <p className="text-gray-600 dark:text-gray-400">{t.noData}</p>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {partners.map((partner) => (
            <div
              key={partner.id}
              className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition-shadow hover:shadow-md dark:border-gray-700 dark:bg-gray-800"
            >
              {/* Logo */}
              <div className="flex h-40 items-center justify-center bg-gray-50 p-6 dark:bg-gray-900">
                <img
                  src={partner.logoUrl}
                  alt={partner.title || 'Partner logo'}
                  className="max-h-full max-w-full object-contain"
                />
              </div>

              {/* Content */}
              <div className="p-4">
                <h3 className="mb-2 font-semibold text-gray-900 dark:text-white">
                  {partner.title || (lang === 'fa' ? 'شرکت همکار' : 'Partner Company')}
                </h3>
                {partner.websiteUrl && (
                  <a
                    href={partner.websiteUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mb-3 flex items-center gap-1 text-sm text-blue-600 hover:underline dark:text-blue-400"
                  >
                    <ExternalLink className="h-3 w-3" />
                    {partner.websiteUrl}
                  </a>
                )}

                {/* Actions */}
                <div className="flex gap-2 mt-3">
                  <Link
                    href={`/panel/partners/${partner.id}`}
                    className="flex flex-1 items-center justify-center gap-1 rounded-lg bg-blue-50 px-3 py-2 text-sm font-medium text-blue-600 transition-colors hover:bg-blue-100 dark:bg-blue-900/20 dark:text-blue-400 dark:hover:bg-blue-900/30"
                  >
                    <Edit className="h-4 w-4" />
                    {t.edit}
                  </Link>
                  <button
                    onClick={() => {
                      setSelectedPartner(partner)
                      setShowDeleteModal(true)
                    }}
                    className="flex items-center justify-center gap-1 rounded-lg bg-red-50 px-3 py-2 text-sm font-medium text-red-600 transition-colors hover:bg-red-100 dark:bg-red-900/20 dark:text-red-400 dark:hover:bg-red-900/30"
                  >
                    <Trash2 className="h-4 w-4" />
                    {t.delete}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && selectedPartner && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl dark:bg-gray-800">
            <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">
              {t.deletePartner}
            </h2>
            <p className="mb-6 text-gray-600 dark:text-gray-400">
              {t.deletePartnerConfirm}
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
                  setSelectedPartner(null)
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
