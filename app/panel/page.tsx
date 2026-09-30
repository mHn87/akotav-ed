'use client'

import { useEffect, useState } from 'react'
import { Package, FolderTree, FileText } from 'lucide-react'

export default function PanelDashboard() {
  const [lang, setLang] = useState<'fa' | 'en'>('fa')
  const [stats, setStats] = useState({
    categories: 0,
    products: 0,
    pages: 2,
  })

  useEffect(() => {
    const savedLang = localStorage.getItem('lang') as 'fa' | 'en'
    if (savedLang) setLang(savedLang)

    // Fetch real stats from API
    fetchStats()
  }, [])

  const fetchStats = async () => {
    try {
      const [categoriesRes, productsRes] = await Promise.all([
        fetch('/api/categories'),
        fetch('/api/products')
      ])
      
      if (categoriesRes.ok && productsRes.ok) {
        const categories = await categoriesRes.json()
        const products = await productsRes.json()
        
        setStats({
          categories: categories.length,
          products: products.length,
          pages: 2
        })
      }
    } catch (error) {
      console.error('Failed to fetch stats:', error)
    }
  }

  const cards = [
    {
      title: lang === 'fa' ? 'دسته‌بندی‌ها' : 'Categories',
      value: stats.categories,
      icon: FolderTree,
      color: 'bg-blue-500',
    },
    {
      title: lang === 'fa' ? 'محصولات' : 'Products',
      value: stats.products,
      icon: Package,
      color: 'bg-green-500',
    },
    {
      title: lang === 'fa' ? 'صفحات' : 'Pages',
      value: stats.pages,
      icon: FileText,
      color: 'bg-purple-500',
    },
  ]

  return (
    <div className="p-6">
      <h1 className="mb-6 text-2xl font-bold text-gray-900 dark:text-white">
        {lang === 'fa' ? 'داشبورد' : 'Dashboard'}
      </h1>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {cards.map((card) => {
          const Icon = card.icon
          return (
            <div
              key={card.title}
              className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    {card.title}
                  </p>
                  <p className="mt-2 text-3xl font-bold text-gray-900 dark:text-white">
                    {card.value}
                  </p>
                </div>
                <div className={`rounded-xl ${card.color} p-3`}>
                  <Icon className="h-6 w-6 text-white" />
                </div>
              </div>
            </div>
          )
        })}
      </div>

      <div className="mt-8 rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
        <h2 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
          {lang === 'fa' ? 'خوش آمدید' : 'Welcome'}
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          {lang === 'fa'
            ? 'به پنل مدیریت آکاتو خوش آمدید. از منوی کناری برای مدیریت محصولات، دسته‌بندی‌ها و صفحات استفاده کنید.'
            : 'Welcome to Akotav admin panel. Use the sidebar menu to manage products, categories, and pages.'}
        </p>
      </div>
    </div>
  )
}
