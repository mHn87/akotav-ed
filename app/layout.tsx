import { Analytics } from '@vercel/analytics/next'
import { Vazirmatn } from 'next/font/google'
import type { Metadata, Viewport } from 'next'

const vazirmatn = Vazirmatn({ subsets: ['arabic'], variable: '--font-vazirmatn' })
import './globals.css'

export const metadata: Metadata = {
  title: 'آکاتو | akotav — هوشمندسازی ساختمان',
  description: 'راهکارهای یکپارچه هوشمندسازی ساختمان برای خانه‌ها و فضاهای کاری آرام‌تر، امن‌تر و کارآمدتر.',
  generator: 'v0.app',
}

export const viewport: Viewport = {
  colorScheme: 'light dark',
  themeColor: '#1e6ff0',
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="fa" dir="rtl" suppressHydrationWarning><body className={`${vazirmatn.variable} antialiased`}>{children}{process.env.NODE_ENV === 'production' && <Analytics />}</body></html>
}
