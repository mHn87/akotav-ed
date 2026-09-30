'use client'

import { useEffect, useState } from 'react'
import { Plus, Edit, Trash2, Package, Search, X, ChevronLeft, ChevronRight } from 'lucide-react'
import { useTranslation, type Language } from '@/lib/i18n'
import Link from 'next/link'

type Category = {
  id: string
  nameFa: string
  nameEn: string
}

type Media = {
  id: string
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
  category: Category
  media: Media[]
  createdAt: string
}

export default function ProductsPage() {
  const [lang, setLang] = useState<Language>('fa')
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [searchQuery, setSearchQuery] = useState('')
  const itemsPerPage = 10
  const t = useTranslation(lang)

  useEffect(() => {
    const savedLang = localStorage.getItem('lang') as Language
    if (savedLang) setLang(savedLang)
    fetchProducts()
  }, [])

  const fetchProducts = async () => {
    try {
      const res = await fetch('/api/products')
      if (res.ok) {
        const data = await res.json()
        setProducts(data)
      }
    } catch (error) {
      console.error('Failed to fetch products:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async () => {
    if (!selectedProduct) return

    try {
      const res = await fetch(`/api/products/${selectedProduct.id}`, {
        method: 'DELETE'
      })

      if (res.ok) {
        await fetchProducts()
        setShowDeleteModal(false)
        setSelectedProduct(null)
      } else {
        const error = await res.json()
        alert(error.error)
      }
    } catch (error) {
      console.error('Failed to delete product:', error)
      alert(t.error)
    }
  }

  // Pagination calculations
  const filteredProducts = products.filter(product => {
    const searchLower = searchQuery.toLowerCase()
    return (
      product.nameFa.toLowerCase().includes(searchLower) ||
      (product.nameEn && product.nameEn.toLowerCase().includes(searchLower)) ||
      product.category.nameFa.toLowerCase().includes(searchLower) ||
      product.category.nameEn.toLowerCase().includes(searchLower)
    )
  })
  
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentProducts = filteredProducts.slice(startIndex, endIndex)

  if (loading) {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="text-gray-600 dark:text-gray-400">{t.loading}</div>
      </div>
    )
  }

  return (
    <div className="p-6">
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          {t.products}
        </h1>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          {/* Search */}
          <div className="relative">
            <Search className="absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value)
                setCurrentPage(1) // Reset to first page on search
              }}
              placeholder={lang === 'fa' ? 'جستجوی محصول...' : 'Search product...'}
              className="w-full rounded-lg border border-gray-300 py-2 pl-4 pr-10 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-gray-600 dark:bg-gray-700 dark:text-white sm:w-64"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
          <Link
            href="/panel/products/new"
            className="flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-blue-700"
          >
            <Plus className="h-5 w-5" />
            {t.addProduct}
          </Link>
        </div>
      </div>

      {filteredProducts.length === 0 ? (
        <div className="rounded-xl border border-gray-200 bg-white p-12 text-center dark:border-gray-700 dark:bg-gray-800">
          <Package className="mx-auto mb-4 h-12 w-12 text-gray-400" />
          <p className="text-gray-600 dark:text-gray-400">
            {searchQuery ? (lang === 'fa' ? 'محصولی یافت نشد' : 'No products found') : t.noData}
          </p>
        </div>
      ) : (
        <>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {currentProducts.map((product) => {
              const mainImage = product.media.find(m => m.isMain && m.type === 'image')
              const firstMedia = mainImage || product.media.find(m => m.type === 'image') || product.media[0]
              return (
                <div
                  key={product.id}
                  className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition-shadow hover:shadow-md dark:border-gray-700 dark:bg-gray-800"
                >
                  {/* Media Preview */}
                  <div className="relative aspect-video bg-gray-100 dark:bg-gray-700">
                    {firstMedia ? (
                      firstMedia.type === 'image' ? (
                        <img
                          src={firstMedia.url}
                          alt={product.nameFa}
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <video
                          src={firstMedia.url}
                          className="h-full w-full object-cover"
                        />
                      )
                    ) : (
                      <div className="flex h-full items-center justify-center">
                        <Package className="h-12 w-12 text-gray-400" />
                      </div>
                    )}
                    {product.media.length > 1 && (
                      <div className="absolute bottom-2 right-2 rounded-full bg-black/70 px-2 py-1 text-xs text-white">
                        +{product.media.length - 1}
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-4">
                    <h3 className="mb-1 font-semibold text-gray-900 dark:text-white">
                      {lang === 'fa' ? product.nameFa : product.nameEn || product.nameFa}
                    </h3>
                    <p className="mb-3 text-sm text-gray-600 dark:text-gray-400">
                      {lang === 'fa' ? product.category.nameFa : product.category.nameEn}
                    </p>

                    {/* Actions */}
                    <div className="flex gap-2">
                      <Link
                        href={`/panel/products/${product.id}`}
                        className="flex flex-1 items-center justify-center gap-1 rounded-lg bg-blue-50 px-3 py-2 text-sm font-medium text-blue-600 transition-colors hover:bg-blue-100 dark:bg-blue-900/20 dark:text-blue-400 dark:hover:bg-blue-900/30"
                      >
                        <Edit className="h-4 w-4" />
                        {t.edit}
                      </Link>
                      <button
                        onClick={() => {
                          setSelectedProduct(product)
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
              )
            })}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-8 flex items-center justify-center gap-2">
              <button
                onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                disabled={currentPage === 1}
                className="rounded-lg border border-gray-300 p-2 transition-colors hover:bg-gray-100 disabled:opacity-50 dark:border-gray-600 dark:hover:bg-gray-700"
              >
                <ChevronRight className={`h-5 w-5 ${lang === 'en' ? 'rotate-180' : ''}`} />
              </button>

              <div className="flex gap-1">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`min-w-10 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                      currentPage === page
                        ? 'bg-blue-600 text-white'
                        : 'border border-gray-300 hover:bg-gray-100 dark:border-gray-600 dark:hover:bg-gray-700'
                    }`}
                  >
                    {page}
                  </button>
                ))}
              </div>

              <button
                onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                disabled={currentPage === totalPages}
                className="rounded-lg border border-gray-300 p-2 transition-colors hover:bg-gray-100 disabled:opacity-50 dark:border-gray-600 dark:hover:bg-gray-700"
              >
                <ChevronLeft className={`h-5 w-5 ${lang === 'en' ? 'rotate-180' : ''}`} />
              </button>
            </div>
          )}
        </>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && selectedProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl dark:bg-gray-800">
            <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">
              {t.deleteProduct}
            </h2>
            <p className="mb-6 text-gray-600 dark:text-gray-400">
              {t.deleteProductConfirm}
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
                  setSelectedProduct(null)
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
