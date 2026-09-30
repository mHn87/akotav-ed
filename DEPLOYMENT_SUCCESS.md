# ✅ آماده برای Deploy در Vercel!

## 🚀 Push موفق بود!

Commit شما با موفقیت به GitHub push شد:
- **Repository**: https://github.com/mHn87/akotav-ed.git
- **Branch**: main
- **Commit**: aa0ec28

---

## 📋 چک‌لیست نهایی

### ✅ فایل‌های اضافه شده:

#### Mock Data System
- ✅ `lib/mock-data.ts` - تمام داده‌های mock
- ✅ `lib/prisma.ts` - به‌روز شده برای کار بدون DATABASE_URL

#### API Routes (Updated)
- ✅ `app/api/public/products/route.ts` - با fallback به mock
- ✅ `app/api/public/categories/route.ts` - با fallback به mock
- ✅ `app/api/public/banners/route.ts` - با fallback به mock
- ✅ `app/api/public/partners/route.ts` - با fallback به mock
- ✅ `app/api/public/pages/[key]/route.ts` - با fallback به mock

#### تصاویر محصولات (5 عکس)
- ✅ `public/products/control.jpg`
- ✅ `public/products/fire.jpg`
- ✅ `public/products/fan_house.jpg`
- ✅ `public/products/camera.jpg`
- ✅ `public/products/fan.jpg`

#### تصاویر بنرها (3 عکس)
- ✅ `public/slider/Apartment-door-security-main.jpg`
- ✅ `public/slider/image-1566402253434-39d5ba9d600a5dfaf36f5ca391d3081a.jpg`
- ✅ `public/slider/images.jpg`

#### لوگوهای شرکا (4 لوگو)
- ✅ `public/partner/Control4_Logo_Color-2048x449-Q0oR7ku7sETWjMTRi6ElY8ZG8t5ZIZ.png`
- ✅ `public/partner/system-sensor-B-2048x715-ImL6ZL7xL4BscB8HfC89mHIOfrlsIZ.png`
- ✅ `public/partner/triad_logo_color_color-Wz0KlXSvOiCbZDGnPZYqD1mXydXQEo.png`
- ✅ `public/partner/logo-2-XlAT450oMvNdUXAUGCxR4aQ28KNo4Y.png`

#### مستندات
- ✅ `VERCEL_DEPLOYMENT.md` - راهنمای deploy
- ✅ `MOCK_DATA_README.md` - توضیحات سیستم mock data
- ✅ `PRODUCTS_WITH_IMAGES.md` - اطلاعات محصولات
- ✅ `MOCK_DATA_FIXED.md` - تغییرات و رفع مشکلات

---

## 🌐 مراحل Deploy در Vercel

### 1️⃣ ورود به Vercel
- به https://vercel.com بروید
- با حساب GitHub خود Login کنید

### 2️⃣ Import Repository
1. روی "Add New Project" کلیک کنید
2. Repository `mHn87/akotav-ed` را انتخاب کنید
3. روی "Import" کلیک کنید

### 3️⃣ تنظیمات Build (پیش‌فرض خوب است)

**Framework Preset**: Next.js ✅ (خودکار تشخیص داده می‌شود)

**Build Command**: 
```bash
npm run build
```

**Output Directory**: 
```
.next
```

**Install Command**:
```bash
npm install
```

### 4️⃣ Environment Variables

⚠️ **نکته مهم**: **هیچ Environment Variable تنظیم نکنید!**

پروژه بدون هیچ environment variable کار می‌کند.

اگر می‌خواهید (اختیاری):
- `JWT_SECRET` = یک رشته تصادفی (برای پنل مدیریت)

**DATABASE_URL را تنظیم نکنید** - سایت با Mock Data کار می‌کند.

### 5️⃣ Deploy!
- روی "Deploy" کلیک کنید
- صبر کنید (معمولاً 2-3 دقیقه)

---

## 🎯 انتظارات پس از Deploy

### ✅ چیزهایی که کار می‌کنند:

#### صفحات عمومی
- 🏠 **صفحه اصلی** (`/`)
  - بنرهای اسلایدر با تصاویر
  - لیست شرکای تجاری
  - لینک به محصولات

- 🛍️ **صفحه محصولات** (`/products`)
  - 5 محصول با تصویر
  - فیلتر دسته‌بندی
  - جستجو
  - مرتب‌سازی
  - صفحه‌بندی
  - modal جزئیات محصول

- ℹ️ **درباره ما** (`/about`)
  - محتوای کامل فارسی/انگلیسی

- 📞 **تماس با ما** (`/contact`)
  - اطلاعات تماس کامل

#### APIهای عمومی
- ✅ `GET /api/public/products`
- ✅ `GET /api/public/categories`
- ✅ `GET /api/public/banners`
- ✅ `GET /api/public/partners`
- ✅ `GET /api/public/pages/about`
- ✅ `GET /api/public/pages/contact`

### ❌ چیزهایی که کار نمی‌کنند (نیاز به دیتابیس دارند):

- ❌ پنل مدیریت (`/panel`)
- ❌ لاگین/احراز هویت
- ❌ آپلود فایل
- ❌ CRUD operations

---

## 🧪 تست Deploy

بعد از deploy موفق، این URLها را تست کنید:

### صفحات
```
https://your-project.vercel.app/
https://your-project.vercel.app/products
https://your-project.vercel.app/about
https://your-project.vercel.app/contact
```

### APIs
```
https://your-project.vercel.app/api/public/products
https://your-project.vercel.app/api/public/categories
https://your-project.vercel.app/api/public/banners
```

---

## 📊 داده‌های Mock

### محصولات (5 محصول)
1. سیستم کنترل هوشمند Control4 (خانه هوشمند)
2. دتکتور دود System Sensor (امنیت و نظارت)
3. سیستم تهویه هوشمند (سیستم تهویه)
4. دوربین مداربسته IP (امنیت و دوربین مدار بسته)
5. پنل اعلام حریق مرکزی (امنیت و نظارت)

### دسته‌بندی‌ها (4 دسته)
1. خانه هوشمند
2. امنیت و نظارت
3. سیستم تهویه
4. امنیت و دوربین مدار بسته

### بنرها (3 بنر)
1. سیستم‌های امنیتی پیشرفته
2. خانه هوشمند آکوتاو
3. سیستم‌های اعلام حریق

### شرکا (4 شرکت)
1. Control4
2. System Sensor
3. Triad
4. Logo 2

---

## 🔍 Troubleshooting

### مشکل: Build Failed

**علت احتمالی**: مشکل در نصب dependencies

**راه‌حل**:
1. چک کنید که `package.json` صحیح است
2. در Vercel settings، Node.js version را 18.x یا بالاتر تنظیم کنید

### مشکل: تصاویر نمایش داده نمی‌شوند

**علت احتمالی**: فایل‌های public در git نیستند

**راه‌حل**:
```bash
git add public/
git commit -m "Ensure all public assets are included"
git push
```

### مشکل: صفحه سفید یا خطای Runtime

**علت احتمالی**: خطای JavaScript

**راه‌حل**:
1. در Vercel Dashboard → Functions → Logs بروید
2. خطاها را بررسی کنید
3. اگر مربوط به Prisma است، مطمئن شوید که `DATABASE_URL` تنظیم **نشده** است

---

## 🎉 موفقیت!

اگر همه چیز درست باشد:
- ✅ Build موفق می‌شود
- ✅ صفحه اصلی با بنرها نمایش داده می‌شود
- ✅ صفحه محصولات با 5 محصول کار می‌کند
- ✅ تمام تصاویر نمایش داده می‌شوند

---

## 📈 گام بعدی (اختیاری)

### اضافه کردن دیتابیس در آینده:

1. **Vercel Postgres**:
   - در Vercel Dashboard → Storage → Create Database
   - Postgres را انتخاب کنید
   - به پروژه خود connect کنید

2. **Migration**:
   ```bash
   npx prisma migrate deploy
   ```

3. **Seed Data**:
   ```bash
   npm run db:seed
   ```

4. پنل مدیریت فعال می‌شود! 🎯

---

## 📞 پشتیبانی

اگر مشکلی داشتید:
- لاگ‌های Vercel را بررسی کنید
- فایل `VERCEL_DEPLOYMENT.md` را مطالعه کنید
- GitHub Repository را چک کنید

**همه چیز آماده است! 🚀**
