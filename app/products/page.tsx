'use client'

import { useEffect, useState } from 'react'
import { Search, SlidersHorizontal, X, ChevronLeft, ChevronRight, Play } from 'lucide-react'
import Link from 'next/link'
import WhatsAppButton from '@/components/whatsapp-button'

type Media = {
  id: string
  type: string
  url: string
  isMain: boolean
}

type Product = {
  id: string
  nameFa: string
  nameEn: string | null
  descriptionFa: string | null
  descriptionEn: string | null
  category: {
    id: string
    nameFa: string
    nameEn: string
  }
  media: Media[]
  createdAt: string
}

type Category = {
  id: string
  nameFa: string
  nameEn: string
}

export default function ProductsPage() {
  const [lang, setLang] = useState<'fa' | 'en'>('fa')
  const [products, setProducts] = useState<Product[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string>('')
  const [sortOrder, setSortOrder] = useState<'newest' | 'oldest'>('newest')
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const itemsPerPage = 10

  useEffect(() => {
    const savedLang = localStorage.getItem('lang') as 'fa' | 'en'
    if (savedLang) setLang(savedLang)
    
    // Get category from URL
    const params = new URLSearchParams(window.location.search)
    const categoryParam = params.get('category')
    if (categoryParam) {
      setSelectedCategory(categoryParam)
    }
    
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      const [productsRes, categoriesRes] = await Promise.all([
        fetch('/api/public/products'),
        fetch('/api/public/categories')
      ])

      if (productsRes.ok && categoriesRes.ok) {
        const productsData = await productsRes.json()
        const categoriesData = await categoriesRes.json()
        setProducts(productsData)
        setCategories(categoriesData)
      }
    } catch (error) {
      console.error('Failed to fetch data:', error)
    } finally {
      setLoading(false)
    }
  }

  // Filter and sort products
  const filteredProducts = products
    .filter(product => {
      const matchesSearch = 
        product.nameFa.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (product.nameEn?.toLowerCase().includes(searchQuery.toLowerCase())) ||
        product.category.nameFa.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.category.nameEn.toLowerCase().includes(searchQuery.toLowerCase())
      
      const matchesCategory = !selectedCategory || product.category.id === selectedCategory
      
      return matchesSearch && matchesCategory
    })
    .sort((a, b) => {
      if (sortOrder === 'newest') {
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      } else {
        return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
      }
    })

  // Pagination
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedProducts = filteredProducts.slice(startIndex, startIndex + itemsPerPage)

  // Get main image or first media
  const getMainMedia = (product: Product) => {
    return product.media.find(m => m.isMain) || product.media[0]
  }

  const t = lang === 'fa' ? {
    products: 'محصولات',
    search: 'جستجو...',
    category: 'دسته‌بندی',
    allCategories: 'همه دسته‌بندی‌ها',
    sort: 'مرتب‌سازی',
    newest: 'جدیدترین',
    oldest: 'قدیمی‌ترین',
    details: 'جزئیات',
    close: 'بستن',
    noProducts: 'محصولی یافت نشد',
    page: 'صفحه',
    of: 'از',
    description: 'توضیحات',
    noDescription: 'توضیحاتی وجود ندارد'
  } : {
    products: 'Products',
    search: 'Search...',
    category: 'Category',
    allCategories: 'All Categories',
    sort: 'Sort',
    newest: 'Newest',
    oldest: 'Oldest',
    details: 'Details',
    close: 'Close',
    noProducts: 'No products found',
    page: 'Page',
    of: 'of',
    description: 'Description',
    noDescription: 'No description available'
  }

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-gray-600 dark:text-gray-400">
          {lang === 'fa' ? 'در حال بارگذاری...' : 'Loading...'}
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="border-b border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800">
        <div className="mx-auto max-w-7xl px-5 py-8 lg:px-10">
          <div className="mb-6 flex items-center justify-between">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              {t.products}
            </h1>
            <Link
              href="/"
              className="text-sm font-medium text-blue-600 hover:text-blue-700 dark:text-blue-400"
            >
              {lang === 'fa' ? 'بازگشت به خانه' : 'Back to Home'}
            </Link>
          </div>

          {/* Filters */}
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400 ltr:left-3 ltr:right-auto" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value)
                  setCurrentPage(1)
                }}
                placeholder={t.search}
                className="w-full rounded-lg border border-gray-300 py-2.5 pe-4 ps-11 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
              />
            </div>

            {/* Category Filter */}
            <select
              value={selectedCategory}
              onChange={(e) => {
                setSelectedCategory(e.target.value)
                setCurrentPage(1)
              }}
              className="w-full rounded-lg border border-gray-300 px-4 py-2.5 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-gray-600 dark:bg-gray-700 dark:text-white sm:w-48"
            >
              <option value="">{t.allCategories}</option>
              {categories.map(cat => (
                <option key={cat.id} value={cat.id}>
                  {lang === 'fa' ? cat.nameFa : cat.nameEn}
                </option>
              ))}
            </select>

            {/* Sort */}
            <select
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value as 'newest' | 'oldest')}
              className="w-full rounded-lg border border-gray-300 px-4 py-2.5 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-gray-600 dark:bg-gray-700 dark:text-white sm:w-40"
            >
              <option value="newest">{t.newest}</option>
              <option value="oldest">{t.oldest}</option>
            </select>
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div className="mx-auto max-w-7xl px-5 py-8 lg:px-10">
        {paginatedProducts.length === 0 ? (
          <div className="rounded-xl border border-gray-200 bg-white p-12 text-center dark:border-gray-700 dark:bg-gray-800">
            <p className="text-gray-600 dark:text-gray-400">{t.noProducts}</p>
          </div>
        ) : (
          <>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {paginatedProducts.map((product) => {
                const mainMedia = getMainMedia(product)
                return (
                  <div
                    key={product.id}
                    className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition-shadow hover:shadow-md dark:border-gray-700 dark:bg-gray-800"
                  >
                    {/* Image */}
                    <div className="relative aspect-square bg-gray-100 dark:bg-gray-900">
                      {mainMedia ? (
                        mainMedia.type === 'image' ? (
                          <img
                            src={mainMedia.url}
                            alt={lang === 'fa' ? product.nameFa : (product.nameEn || product.nameFa)}
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          <div className="flex h-full w-full items-center justify-center">
                            <Play className="h-12 w-12 text-gray-400" />
                          </div>
                        )
                      ) : (
                        <div className="flex h-full w-full items-center justify-center text-gray-400">
                          {lang === 'fa' ? 'بدون تصویر' : 'No Image'}
                        </div>
                      )}
                    </div>

                    {/* Content */}
                    <div className="p-4">
                      <div className="mb-2 text-xs font-semibold text-blue-600 dark:text-blue-400">
                        {lang === 'fa' ? product.category.nameFa : product.category.nameEn}
                      </div>
                      <h3 className="mb-3 line-clamp-2 font-semibold text-gray-900 dark:text-white">
                        {lang === 'fa' ? product.nameFa : (product.nameEn || product.nameFa)}
                      </h3>
                      <button
                        onClick={() => setSelectedProduct(product)}
                        className="w-full rounded-lg bg-blue-50 py-2 text-sm font-medium text-blue-600 transition-colors hover:bg-blue-100 dark:bg-blue-900/20 dark:text-blue-400 dark:hover:bg-blue-900/30"
                      >
                        {t.details}
                      </button>
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="mt-8 flex items-center justify-center gap-2">
                <button
                  onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="rounded-lg border border-gray-300 p-2 transition-colors hover:bg-gray-100 disabled:opacity-50 dark:border-gray-600 dark:hover:bg-gray-700"
                >
                  <ChevronRight className={lang === 'en' ? 'rotate-180' : ''} />
                </button>
                
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  {t.page} {currentPage} {t.of} {totalPages}
                </span>

                <button
                  onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                  className="rounded-lg border border-gray-300 p-2 transition-colors hover:bg-gray-100 disabled:opacity-50 dark:border-gray-600 dark:hover:bg-gray-700"
                >
                  <ChevronLeft className={lang === 'en' ? 'rotate-180' : ''} />
                </button>
              </div>
            )}
          </>
        )}
      </div>

      {/* Product Details Modal */}
      {selectedProduct && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
          onClick={() => setSelectedProduct(null)}
        >
          <div 
            className="max-h-[90vh] w-full max-w-3xl overflow-auto rounded-xl bg-white shadow-xl dark:bg-gray-800"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="sticky top-0 z-10 flex items-center justify-between border-b border-gray-200 bg-white px-6 py-4 dark:border-gray-700 dark:bg-gray-800">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                {lang === 'fa' ? selectedProduct.nameFa : (selectedProduct.nameEn || selectedProduct.nameFa)}
              </h2>
              <button
                onClick={() => setSelectedProduct(null)}
                className="rounded-lg p-2 transition-colors hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6">
              {/* Category */}
              <div className="mb-4 inline-block rounded-full bg-blue-50 px-3 py-1 text-sm font-semibold text-blue-600 dark:bg-blue-900/20 dark:text-blue-400">
                {lang === 'fa' ? selectedProduct.category.nameFa : selectedProduct.category.nameEn}
              </div>

              {/* Media Grid */}
              {selectedProduct.media.length > 0 && (
                <div className="mb-6 grid gap-4 sm:grid-cols-2">
                  {selectedProduct.media.map((media) => (
                    <div key={media.id} className="overflow-hidden rounded-lg bg-gray-100 dark:bg-gray-900">
                      {media.type === 'image' ? (
                        <img
                          src={media.url}
                          alt={lang === 'fa' ? selectedProduct.nameFa : (selectedProduct.nameEn || selectedProduct.nameFa)}
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <video
                          src={media.url}
                          controls
                          className="h-full w-full"
                        />
                      )}
                    </div>
                  ))}
                </div>
              )}

              {/* Description */}
              <div>
                <h3 className="mb-3 text-lg font-semibold text-gray-900 dark:text-white">
                  {t.description}
                </h3>
                <div 
                  className="prose max-w-none text-justify dark:prose-invert"
                  dangerouslySetInnerHTML={{ 
                    __html: (lang === 'fa' ? selectedProduct.descriptionFa : selectedProduct.descriptionEn) || `<p class="text-gray-500">${t.noDescription}</p>`
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      )}
      <WhatsAppButton />
    </div>
  )
}
