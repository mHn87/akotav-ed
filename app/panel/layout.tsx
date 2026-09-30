'use client'

import { useEffect, useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { Vazirmatn } from 'next/font/google'
import { 
  LayoutDashboard, 
  FolderTree, 
  Package, 
  FileText, 
  LogOut, 
  Moon, 
  Sun, 
  Globe,
  Menu,
  X,
  Image as ImageIcon,
  Users
} from 'lucide-react'
import Link from 'next/link'
import { useTranslation, type Language } from '@/lib/i18n'

const vazirmatn = Vazirmatn({ subsets: ['arabic'], variable: '--font-vazirmatn' })

export default function PanelLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const pathname = usePathname()
  const [lang, setLang] = useState<Language>('fa')
  const [theme, setTheme] = useState<'light' | 'dark'>('light')
  const [loading, setLoading] = useState(true)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const t = useTranslation(lang)
  const dir = lang === 'fa' ? 'rtl' : 'ltr'

  useEffect(() => {
    // Check authentication
    fetch('/api/auth/verify')
      .then(res => {
        if (!res.ok) {
          router.push('/panel/login')
        } else {
          setLoading(false)
        }
      })
      .catch(() => {
        router.push('/panel/login')
      })

    // Load preferences from localStorage
    const savedLang = localStorage.getItem('lang') as Language
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark'
    
    if (savedLang) setLang(savedLang)
    if (savedTheme) setTheme(savedTheme)
    
    // Apply theme
    if (savedTheme === 'dark') {
      document.documentElement.classList.add('dark')
    }
  }, [router])

  // Apply direction to document element
  useEffect(() => {
    document.documentElement.setAttribute('dir', dir)
    document.documentElement.setAttribute('lang', lang)
  }, [dir, lang])

  const toggleLanguage = () => {
    const newLang = lang === 'fa' ? 'en' : 'fa'
    setLang(newLang)
    localStorage.setItem('lang', newLang)
    // Reload page to apply language changes
    window.location.reload()
  }

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light'
    setTheme(newTheme)
    localStorage.setItem('theme', newTheme)
    
    if (newTheme === 'dark') {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' })
    router.push('/')
  }

  const navigation = [
    { name: t.dashboard, href: '/panel', icon: LayoutDashboard },
    { name: t.categories, href: '/panel/categories', icon: FolderTree },
    { name: t.products, href: '/panel/products', icon: Package },
    { name: t.banners, href: '/panel/banners', icon: ImageIcon },
    { name: t.partners, href: '/panel/partners', icon: Users },
    { name: t.pages, href: '/panel/pages', icon: FileText },
  ]

  if (loading || pathname === '/panel/login') {
    return <div className="min-h-screen bg-background">{children}</div>
  }

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900" style={{ fontFamily: 'var(--font-vazirmatn), Vazirmatn, sans-serif' }}>
          {/* Sidebar */}
          <aside
            className={`fixed inset-y-0 z-50 flex w-64 flex-col border-gray-200 bg-white transition-transform dark:border-gray-700 dark:bg-gray-800 lg:static ${
              lang === 'fa' ? 'right-0 border-l' : 'left-0 border-r'
            } ${sidebarOpen ? 'translate-x-0' : lang === 'fa' ? 'translate-x-full lg:translate-x-0' : '-translate-x-full lg:translate-x-0'}`}
          >
            {/* Logo */}
            <div className="flex h-16 items-center justify-between border-b border-gray-200 px-6 dark:border-gray-700">
              <h1 className="text-xl font-bold text-blue-600 dark:text-blue-400">
                {lang === 'fa' ? 'پنل آکوتاو' : 'Akotav Panel'}
              </h1>
              <button
                onClick={() => setSidebarOpen(false)}
                className="lg:hidden"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            {/* Navigation */}
            <nav className="flex-1 space-y-1 px-3 py-4">
              {navigation.map((item) => {
                const Icon = item.icon
                const isActive = pathname === item.href || (item.href !== '/panel' && pathname.startsWith(item.href))
                
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setSidebarOpen(false)}
                    className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                      isActive
                        ? 'bg-blue-50 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300'
                        : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700'
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                    <span>{item.name}</span>
                  </Link>
                )
              })}
            </nav>

            {/* Settings & Logout */}
            <div className="border-t border-gray-200 p-4 dark:border-gray-700">
              <div className="flex items-center justify-around gap-2 pb-3">
                <button
                  onClick={toggleTheme}
                  className="rounded-lg p-2 hover:bg-gray-100 dark:hover:bg-gray-700"
                  title={theme === 'light' ? t.darkMode : t.lightMode}
                >
                  {theme === 'light' ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
                </button>
                <button
                  onClick={toggleLanguage}
                  className="rounded-lg p-2 hover:bg-gray-100 dark:hover:bg-gray-700"
                  title={t.language}
                >
                  <Globe className="h-5 w-5" />
                  <span className="ml-1 text-xs font-semibold">{lang.toUpperCase()}</span>
                </button>
              </div>
              <button
                onClick={handleLogout}
                className="flex w-full items-center justify-center gap-2 rounded-lg bg-red-50 px-4 py-2.5 text-sm font-medium text-red-700 transition-colors hover:bg-red-100 dark:bg-red-900/20 dark:text-red-400 dark:hover:bg-red-900/30"
              >
                <LogOut className="h-5 w-5" />
                <span>{t.logout}</span>
              </button>
            </div>
          </aside>

          {/* Main Content */}
          <div className="flex flex-1 flex-col overflow-hidden">
            {/* Mobile Header */}
            <header className="flex h-16 items-center justify-between border-b border-gray-200 bg-white px-4 dark:border-gray-700 dark:bg-gray-800 lg:hidden">
              <button onClick={() => setSidebarOpen(true)}>
                <Menu className="h-6 w-6" />
              </button>
              <h1 className="text-lg font-bold text-blue-600 dark:text-blue-400">
                {lang === 'fa' ? 'پنل آکوتاو' : 'Akotav Panel'}
              </h1>
              <div className="w-6" />
            </header>

            {/* Content */}
            <main className="flex-1 overflow-y-auto bg-gray-50 dark:bg-gray-900">
              {children}
            </main>
          </div>

          {/* Mobile Overlay */}
          {sidebarOpen && (
            <div
              className="fixed inset-0 z-40 bg-black/50 lg:hidden"
              onClick={() => setSidebarOpen(false)}
            />
          )}
        </div>
  )
}
