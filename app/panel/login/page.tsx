'use client'

import { useState, FormEvent } from 'react'
import { useRouter } from 'next/navigation'
import { LogIn, Moon, Sun, Globe, Sparkles } from 'lucide-react'

export default function LoginPage() {
  const router = useRouter()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [lang, setLang] = useState<'fa' | 'en'>('fa')
  const [theme, setTheme] = useState<'light' | 'dark'>('light')

  const t = {
    fa: {
      title: 'ورود به پنل مدیریت',
      subtitle: 'پنل مدیریت آکوتاو',
      username: 'نام کاربری',
      password: 'رمز عبور',
      login: 'ورود',
      loginButton: 'ورود به پنل',
    },
    en: {
      title: 'Login to Admin Panel',
      subtitle: 'Akotav Admin Panel',
      username: 'Username',
      password: 'Password',
      login: 'Login',
      loginButton: 'Login to Panel',
    },
  }

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light'
    setTheme(newTheme)
    if (newTheme === 'dark') {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }

  const toggleLanguage = () => {
    setLang(lang === 'fa' ? 'en' : 'fa')
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      })

      if (res.ok) {
        // Redirect and force a full page load to ensure layout loads properly
        window.location.href = '/panel'
      } else {
        const data = await res.json()
        setError(data.error || 'Login failed')
      }
    } catch (err) {
      setError('خطا در اتصال به سرور')
    } finally {
      setLoading(false)
    }
  }

  const dir = lang === 'fa' ? 'rtl' : 'ltr'

  return (
    <html lang={lang} dir={dir} suppressHydrationWarning>
      <body className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        {/* Theme and Language Toggle */}
        <div className="absolute right-6 top-6 flex gap-2">
          <button
            onClick={toggleTheme}
            className="rounded-lg bg-white p-2 shadow-md transition-colors hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700"
          >
            {theme === 'light' ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
          </button>
          <button
            onClick={toggleLanguage}
            className="flex items-center gap-1 rounded-lg bg-white px-3 py-2 shadow-md transition-colors hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700"
          >
            <Globe className="h-5 w-5" />
            <span className="text-xs font-semibold">{lang.toUpperCase()}</span>
          </button>
        </div>

        <div className="flex min-h-screen items-center justify-center p-4">
          <div className="w-full max-w-md">
            {/* Logo */}
            <div className="mb-8 text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 shadow-lg shadow-blue-500/30">
                <Sparkles className="h-8 w-8 text-white" />
              </div>
              <h1 className="mb-2 text-3xl font-bold text-gray-900 dark:text-white">
                {t[lang].title}
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                {t[lang].subtitle}
              </p>
            </div>

            {/* Login Form */}
            <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-xl dark:border-gray-700 dark:bg-gray-800">
              <form onSubmit={handleSubmit} className="space-y-6">
                {error && (
                  <div className="rounded-lg bg-red-50 p-4 text-sm text-red-600 dark:bg-red-900/20 dark:text-red-400">
                    {error}
                  </div>
                )}

                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                    {t[lang].username}
                  </label>
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 transition-colors focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                    placeholder="admin"
                    required
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                    {t[lang].password}
                  </label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 transition-colors focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                    placeholder="••••••••"
                    required
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="flex w-full items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-blue-600 to-blue-700 px-4 py-3 font-semibold text-white shadow-lg shadow-blue-500/30 transition-all hover:from-blue-700 hover:to-blue-800 disabled:opacity-50"
                >
                  <LogIn className="h-5 w-5" />
                  {loading ? (lang === 'fa' ? 'در حال ورود...' : 'Logging in...') : t[lang].loginButton}
                </button>
              </form>
            </div>
          </div>
        </div>
      </body>
    </html>
  )
}
