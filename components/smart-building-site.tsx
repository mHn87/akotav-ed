'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import { ArrowLeft, Check, ChevronDown, Globe2, Leaf, Lightbulb, Menu, Moon, Search, ShieldCheck, SlidersHorizontal, Sparkles, Sun, Thermometer, X, Zap } from 'lucide-react'
import WhatsAppButton from './whatsapp-button'

function NetworkBackground() {
  const ref = useRef<HTMLCanvasElement>(null)
  useEffect(() => {
    const canvas = ref.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')!
    let frame = 0
    let raf = 0
    let nodes: { x: number; y: number; vx: number; vy: number; r: number }[] = []
    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio, 2)
      canvas.width = innerWidth * dpr; canvas.height = innerHeight * dpr
      canvas.style.width = `${innerWidth}px`; canvas.style.height = `${innerHeight}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      nodes = Array.from({ length: innerWidth < 700 ? 32 : 58 }, (_, i) => ({ x: (i * 193) % innerWidth, y: (i * 97) % innerHeight, vx: (i % 3 - 1) * .08, vy: ((i + 1) % 3 - 1) * .06, r: i % 7 === 0 ? 2.4 : 1.4 }))
    }
    const draw = () => {
      frame++; ctx.clearRect(0, 0, innerWidth, innerHeight)
      const dark = document.documentElement.classList.contains('dark')
      const line = dark ? 'rgba(83,153,255,.13)' : 'rgba(30,111,240,.08)'
      const dot = dark ? 'rgba(117,190,255,.5)' : 'rgba(30,111,240,.27)'
      nodes.forEach(n => { n.x += n.vx; n.y += n.vy; if (n.x < -10 || n.x > innerWidth + 10) n.vx *= -1; if (n.y < -10 || n.y > innerHeight + 10) n.vy *= -1 })
      nodes.forEach((a, i) => nodes.slice(i + 1).forEach(b => { const d = Math.hypot(a.x-b.x, a.y-b.y); if (d < 170) { ctx.strokeStyle = line; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(a.x,a.y); ctx.lineTo(b.x,b.y); ctx.stroke() } }))
      nodes.forEach(n => { ctx.fillStyle = dot; ctx.beginPath(); ctx.arc(n.x,n.y,n.r,0,Math.PI*2); ctx.fill() })
      raf = requestAnimationFrame(draw)
    }
    resize(); draw(); addEventListener('resize', resize)
    return () => { cancelAnimationFrame(raf); removeEventListener('resize', resize) }
  }, [])
  return <canvas ref={ref} aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 opacity-80" />
}

export default function SmartBuildingSite() {
  const [fa, setFa] = useState(true)
  const [dark, setDark] = useState(false)
  const [menu, setMenu] = useState(false)
  const [bannerSlide, setBannerSlide] = useState(0)
  const [search, setSearch] = useState(false)
  const [banners, setBanners] = useState<{id: string; title: string | null; imageUrl: string; linkUrl: string | null}[]>([])
  const [categories, setCategories] = useState<{id: string; nameFa: string; nameEn: string}[]>([])
  const [aboutPreview, setAboutPreview] = useState<string>('')
  const [partners, setPartners] = useState<{id: string; title: string | null; logoUrl: string; websiteUrl: string | null}[]>([])
  const dir = fa ? 'rtl' : 'ltr'

  // Fetch banners from API
  useEffect(() => {
    fetch('/api/public/banners')
      .then(res => res.json())
      .then(data => setBanners(data))
      .catch(err => console.error('Failed to fetch banners:', err))
    
    fetch('/api/public/categories')
      .then(res => res.json())
      .then(data => setCategories(data))
      .catch(err => console.error('Failed to fetch categories:', err))

    fetch('/api/public/pages/about')
      .then(res => res.json())
      .then(data => {
        // Extract first 5 lines of content
        const content = fa ? data.contentFa : data.contentEn
        const tempDiv = document.createElement('div')
        tempDiv.innerHTML = content
        const text = tempDiv.textContent || ''
        const lines = text.split('\n').filter(line => line.trim()).slice(0, 5).join('\n')
        setAboutPreview(lines)
      })
      .catch(err => console.error('Failed to fetch about page:', err))

    fetch('/api/public/partners')
      .then(res => res.json())
      .then(data => setPartners(data))
      .catch(err => console.error('Failed to fetch partners:', err))
  }, [])

  // Auto-play banners every 3 seconds
  useEffect(() => {
    if (banners.length <= 1) return
    const interval = setInterval(() => {
      setBannerSlide(prev => (prev + 1) % banners.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [banners.length])

  // Generate random light background color
  const getRandomLightColor = (index: number) => {
    const colors = [
      'bg-blue-50 dark:bg-blue-900/10',
      'bg-green-50 dark:bg-green-900/10',
      'bg-yellow-50 dark:bg-yellow-900/10',
      'bg-purple-50 dark:bg-purple-900/10',
      'bg-red-50 dark:bg-red-900/10',
      'bg-pink-50 dark:bg-pink-900/10',
      'bg-indigo-50 dark:bg-indigo-900/10',
      'bg-teal-50 dark:bg-teal-900/10',
    ]
    return colors[index % colors.length]
  }
  const copy = useMemo(() => fa ? { nav: ['خانه','محصولات','درباره ما','تماس با ما'], heroKicker:'تجهیزات حرفه‌ای ساختمانی', heroTitle:'آکوتاو، انتخابی برای', heroAccent:'ساختمان‌های امن‌تر.', heroText:'ارائه تجهیزات و سیستم‌های حرفه‌ای ساختمانی برای فضاهایی امن‌تر، آرام‌تر و کارآمدتر.', cta:'مشاهده محصولات', products:'محصولات آکوتاو', productsText:'تجهیزات حرفه‌ای و قابل اعتماد برای ساختن فضاهایی امن و هوشمند.', all:'مشاهده محصول', story:'درباره آکوتاو', storyText:'شرکت آکوتاو در سال 1390 فعالیت خود را در زمینه ارائه خدمات و محصولات تجهیزات ساختمانی آغاز نموده است. این شرکت جزو مشاوران مورد تأیید سازمان‌های مهندسی و تجاری تهران می‌باشد و با بهره‌گیری از سال‌ها تجربه ارزشمند و راه‌اندازی صدها پروژه ملی، تبدیل به یکی از برندهای خوشنام و مورد اعتماد در حوزه تأسیسات شده است. ارائه راهکارهای متناسب با نیاز مشتری و خدمات پس از فروش پیوسته، باعث جلب اعتماد صنایع مختلف شده و رمز موفقیت این شرکت است. تمامی سیستم‌ها باید از برندهای معتمد، تأییدیه‌های معتبر جهانی و مهم‌تر از همه مورد تأیید سازمان آتش‌نشانی، مهندسی و خدمات ایمنی برق و غیره باشند. گروه صنعتی آکوتاو نماینده بهترین و معتبرترین برندهای مربوط به سیستم‌های اعلام حریق و سیستم‌های اطفاء حریق می‌باشد. همکاری با کمپانی‌های معتبر اروپایی و استفاده از پرسنل کارآزموده، در کنار بهره‌گیری از استانداردهای معتبر بین‌المللی، باعث کسب رضایت مشتریان و ارتقاء جایگاه این شرکت گردیده است.', explore:'بیشتر', partners:'اعتماد ساخته می‌شود، نه گفته.', contact:'تماس با ما ', panel:'پنل', menu:'منو' } : { nav: ['Home','Products','About','Contact'], heroKicker:'Buildings, made more intelligent', heroTitle:'Technology that', heroAccent:'moves with you.', heroText:'Integrated building automation for calmer, safer and more efficient homes and workspaces.', cta:'Explore solutions', secondary:'Watch the film', products:'Intelligence for every space', productsText:'From a single room to a complete building, create an experience that feels effortless.', all:'View all products', story:'Technology matters when it makes life simpler.', storyText:'We design intelligent infrastructure that works in the background — precise, calm and always ready.', explore:'More about us', partners:'Trust is built, not claimed.', contact:'Talk to an expert', panel:'Panel', menu:'Menu' }, [fa])
  const toggleLang = () => setFa(!fa)
  return <div dir={dir} className={`${dark ? 'dark' : ''} relative min-h-screen overflow-x-hidden bg-background/70 text-foreground transition-colors duration-500`}>
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-20 overflow-hidden bg-slate-950">
      <video autoPlay muted loop playsInline className="absolute inset-[-10px] size-[calc(100%+20px)] object-cover opacity-85 blur-[1px]" poster="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/video5884318204423053033-2qJDvJUI2JqkizUu50CtLdZSUugaqr.mp4">
        <source src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/video5884318204423053033-2qJDvJUI2JqkizUu50CtLdZSUugaqr.mp4" type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-background/48" />
    </div>
    <NetworkBackground />
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/75 backdrop-blur-xl">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 lg:px-10">
        <a href="#top" className="flex items-center gap-3"><span className="grid size-10 place-items-center rounded-2xl bg-primary text-primary-foreground"><Sparkles /></span><span className="text-lg font-bold tracking-tight">akotav<span className="text-primary">.</span></span></a>
        <nav className="hidden items-center gap-8 lg:flex">{copy.nav.map((item, i) => <a key={item} href={i===0?'#top':i===1?'#solutions':i===2?'#story':'#contact'} className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">{item}{i===1 && <ChevronDown className="ms-1 inline size-3" />}</a>)}</nav>
        <div className="flex items-center gap-2"><button aria-label="Search" onClick={()=>setSearch(true)} className="grid size-10 place-items-center rounded-full hover:bg-muted"><Search /></button><button onClick={toggleLang} className="hidden items-center gap-1 rounded-full px-3 py-2 text-xs font-semibold hover:bg-muted sm:flex"><Globe2 /> {fa ? 'EN' : 'FA'}</button><button aria-label="Toggle theme" onClick={()=>setDark(!dark)} className="grid size-10 place-items-center rounded-full hover:bg-muted">{dark ? <Sun /> : <Moon />}</button><button aria-label={copy.menu} onClick={()=>setMenu(!menu)} className="grid size-10 place-items-center rounded-full bg-primary text-primary-foreground lg:hidden">{menu ? <X /> : <Menu />}</button><a href="/panel" className="hidden rounded-full bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/20 transition-transform hover:-translate-y-0.5 lg:block">{copy.panel}</a></div>
      </div>
      {menu && <div className="border-t border-border bg-background px-5 py-5 lg:hidden"><div className="flex flex-col gap-4">{copy.nav.map((item,i)=><a key={item} href={i===0?'#top':i===1?'#solutions':i===2?'#story':'#contact'} onClick={()=>setMenu(false)} className="text-base font-semibold">{item}</a>)}<a href="/panel" onClick={()=>setMenu(false)} className="text-base font-semibold text-primary">{copy.panel}</a><button onClick={toggleLang} className="w-fit text-start text-sm text-muted-foreground">{fa?'English':'فارسی'}</button></div></div>}
    </header>
    <main id="top">
      <section className="relative mx-auto grid min-h-[650px] max-w-7xl items-center gap-12 px-5 py-16 lg:grid-cols-[1.02fr_.98fr] lg:px-10 lg:py-24">
        <div className="relative z-10 max-w-xl"><div className="mb-7 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-2 text-xs font-semibold text-primary"><span className="size-2 animate-pulse rounded-full bg-primary" />{copy.heroKicker}</div><h1 className="text-5xl font-semibold leading-[1.04] tracking-[-.06em] sm:text-7xl">{copy.heroTitle}<br /><span className="text-primary">{copy.heroAccent}</span></h1><p className="mt-7 max-w-lg text-base leading-8 text-muted-foreground sm:text-lg">{copy.heroText}</p><div className="mt-9 flex flex-wrap items-center gap-4"><a href="/products" className="inline-flex items-center gap-3 rounded-full bg-primary px-6 py-4 text-sm font-semibold text-primary-foreground shadow-xl shadow-primary/20">{copy.cta}<ArrowLeft className="rtl:rotate-0 ltr:rotate-180" /></a></div></div>
        {banners.length > 0 && (
          <div className="relative mx-auto aspect-video w-full max-w-[600px] overflow-hidden rounded-[2.5rem] border border-border/70 bg-card/65 shadow-2xl backdrop-blur-xl">
            <div className="relative h-full overflow-hidden rounded-[2rem] bg-slate-950">
              <img 
                src={banners[bannerSlide].imageUrl} 
                alt={banners[bannerSlide].title || 'Banner'} 
                className="absolute inset-0 size-full object-cover transition-opacity duration-500" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/10 to-transparent" />
              {banners[bannerSlide].title && (
                <div className="relative flex h-full flex-col justify-end p-7 text-white sm:p-10">
                  <h2 className="max-w-md text-3xl font-semibold leading-tight sm:text-4xl">
                    {banners[bannerSlide].title}
                  </h2>
                </div>
              )}
            </div>
          </div>
        )}
      </section>
      <section id="solutions" className="mx-auto max-w-7xl px-5 py-20 lg:px-10 lg:py-28">
        <div className="mb-12">
          <p className="mb-3 text-sm font-bold text-primary">01 / {fa?'راهکارها':'SOLUTIONS'}</p>
          <h2 className="max-w-xl text-4xl font-semibold tracking-[-.045em] sm:text-5xl">{copy.products}</h2>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((category, i) => (
            <article 
              key={category.id} 
              className={`group rounded-3xl border border-border/70 p-6 backdrop-blur transition-all hover:-translate-y-1 hover:border-primary/40 hover:shadow-xl ${getRandomLightColor(i)}`}
            >
              <h3 className="mb-4 text-xl font-semibold">{fa ? category.nameFa : category.nameEn}</h3>
              <a 
                href={`/products?category=${category.id}`} 
                className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-primary"
              >
                {copy.all} <ArrowLeft className="rtl:rotate-0 ltr:rotate-180" />
              </a>
            </article>
          ))}
        </div>
      </section>
      <section id="story" className="border-y border-border/60 bg-card/45">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 py-20 lg:grid-cols-[.8fr_1.2fr] lg:px-10 lg:py-28">
          <div>
            <p className="mb-3 text-sm font-bold text-primary">02 / {fa?'درباره ما':'ABOUT US'}</p>
            <h2 className="text-4xl font-semibold leading-tight tracking-[-.045em] sm:text-5xl">{copy.story}</h2>
          </div>
          <div>
            <p className="whitespace-pre-line text-xl leading-10 text-justify text-muted-foreground">
              {aboutPreview || copy.storyText}
            </p>
            <a href="/about" className="mt-8 inline-flex items-center gap-3 rounded-full border border-border px-5 py-3 text-sm font-semibold">
              {copy.explore}<ArrowLeft className="rtl:rotate-0 ltr:rotate-180" />
            </a>
          </div>
        </div>
      </section>
      <section aria-labelledby="partners-title" className="mb-4 overflow-hidden border-y border-border/60 bg-card/35 py-8"><div className="mx-auto max-w-7xl px-5 lg:px-10"><div className="mb-5 flex items-center justify-between gap-4"><p id="partners-title" className="text-sm font-bold text-primary">{fa?'شرکت‌های همکار':'PARTNER COMPANIES'}</p></div><div className="relative overflow-hidden"><div className="flex w-max animate-marquee-rtl items-center gap-12 py-3" dir="ltr">{[...partners,...partners,...partners,...partners].map((partner,index)=><div key={`${partner.id}-${index}`} className="flex h-16 w-40 shrink-0 items-center justify-center rounded-2xl border border-primary/25 bg-primary/10 px-5 py-3"><img src={partner.logoUrl} alt={partner.title || 'Partner'} className="max-h-10 w-auto max-w-full object-contain" /></div>)}</div></div></div></section>
      <section id="contact" className="mx-auto max-w-7xl px-5 pb-20 lg:px-10 lg:pb-28"><div className="relative overflow-hidden rounded-[2rem] bg-foreground p-8 text-background sm:p-12 lg:p-16"><div className="absolute -end-20 -top-28 size-80 rounded-full bg-primary/30 blur-3xl" /><div className="relative flex flex-col justify-between gap-10 lg:flex-row lg:items-end"><div><p className="mb-4 text-sm font-bold text-primary">04 / {fa?'شروع کنیم':'LET’S CONNECT'}</p><h2 className="max-w-2xl text-4xl font-semibold tracking-[-.045em] sm:text-6xl">{fa?'پروژه بعدی شما، هوشمندتر شروع می‌شود.':'Your next project starts smarter.'}</h2></div><a href="/contact" className="inline-flex w-fit items-center gap-3 rounded-full bg-primary px-6 py-4 text-sm font-semibold text-primary-foreground">{copy.contact}<ArrowLeft className="rtl:rotate-0 ltr:rotate-180" /></a></div></div></section>
    </main>
    <footer className="border-t border-border/60"><div className="mx-auto flex max-w-7xl flex-col gap-8 px-5 py-10 text-sm text-muted-foreground lg:flex-row lg:items-center lg:justify-between lg:px-10"><div className="flex items-center gap-3 text-foreground"><span className="grid size-9 place-items-center rounded-xl bg-primary text-primary-foreground"><Sparkles /></span><span className="font-bold">akotav<span className="text-primary">.</span></span></div><p>{fa?'راهکارهای هوشمند برای زندگی بهتر.':'Intelligent systems for better living.'}</p><p>© 2024 Akotav</p></div></footer>
    <WhatsAppButton />
    {search && <div role="dialog" aria-modal="true" className="fixed inset-0 z-50 grid place-items-start bg-foreground/30 p-5 pt-28 backdrop-blur-sm" onClick={()=>setSearch(false)}><div className="w-full max-w-xl rounded-3xl border border-border bg-background p-4 shadow-2xl" onClick={e=>e.stopPropagation()}><div className="flex items-center gap-3 border-b border-border px-3 pb-3"><Search className="text-muted-foreground" /><input autoFocus placeholder={fa?'جستجو در سایت...':'Search the site...'} className="flex-1 bg-transparent py-2 outline-none" /><button onClick={()=>setSearch(false)} aria-label="Close search"><X /></button></div><div className="py-8 text-center text-sm text-muted-foreground">{fa?'محصول، مقاله یا صفحه‌ای را جستجو کنید':'Search products, articles or pages'}</div></div></div>}
  </div>
}
