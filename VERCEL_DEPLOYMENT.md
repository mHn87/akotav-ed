# راهنمای Deploy در Vercel

## ✅ پروژه آماده است!

این پروژه به گونه‌ای طراحی شده که **بدون دیتابیس** کار کند و از داده‌های Mock استفاده کند.

## 🚀 مراحل Deploy

### 1. Push به Git Repository

```bash
git add .
git commit -m "Add mock data system for Vercel deployment"
git push
```

### 2. اتصال به Vercel

1. به [vercel.com](https://vercel.com) بروید
2. پروژه را Import کنید
3. **هیچ Environment Variable تنظیم نکنید** (یا فقط موارد اختیاری)

### 3. تنظیمات Vercel (اختیاری)

#### Environment Variables مورد نیاز (همه اختیاری):

```env
# JWT برای پنل مدیریت (اختیاری - اگر به پنل نیاز ندارید نیازی نیست)
JWT_SECRET=your-super-secret-key-here

# اگر می‌خواهید DATABASE_URL تنظیم کنید (اختیاری)
# DATABASE_URL=postgresql://...
```

⚠️ **نکته مهم**: اگر `DATABASE_URL` را تنظیم نکنید، اشکالی ندارد! پروژه با Mock Data کار می‌کند.

## 📋 چک‌لیست قبل از Deploy

- ✅ Mock data در `lib/mock-data.ts` موجود است
- ✅ تمام API routeها با fallback به mock data پیکربندی شده‌اند
- ✅ تصاویر در پوشه `public/` موجود هستند
- ✅ `lib/prisma.ts` به گونه‌ای پیکربندی شده که بدون DATABASE_URL کار کند

## 🎯 داده‌های Mock شامل:

### صفحات (Pages)
- ✅ درباره ما (`/about`)
- ✅ تماس با ما (`/contact`)

### محصولات (Products)
- ✅ 5 محصول با تصویر
- ✅ متعلق به 4 دسته‌بندی مختلف

### دسته‌بندی‌ها (Categories)
- ✅ خانه هوشمند
- ✅ امنیت و نظارت
- ✅ سیستم تهویه
- ✅ امنیت و دوربین مدار بسته

### بنرها (Banners)
- ✅ 3 بنر اسلایدر با تصویر

### شرکا (Partners)
- ✅ 4 شرکت همکار با لوگو

## 🌐 APIهای عمومی

همه این APIها **بدون دیتابیس** کار می‌کنند:

- `GET /api/public/products`
- `GET /api/public/categories`
- `GET /api/public/banners`
- `GET /api/public/partners`
- `GET /api/public/pages/about`
- `GET /api/public/pages/contact`

## 🔒 پنل مدیریت

پنل مدیریت (`/panel`) به دیتابیس نیاز دارد، اما:
- بخش عمومی سایت (`/`, `/products`, `/about`, `/contact`) کاملاً کار می‌کند
- می‌توانید بعداً دیتابیس اضافه کنید

## 🐛 Troubleshooting

### مشکل: Build Error مربوط به Prisma

**راه‌حل**: Build باید موفق باشد چون:
- Prisma Client از قبل generate شده
- `lib/prisma.ts` به گونه‌ای نوشته شده که بدون DATABASE_URL هم کار کند

### مشکل: Runtime Error در Vercel

**راه‌حل**: تمام API routeها از try-catch استفاده می‌کنند و در صورت خطا، Mock data برمی‌گردانند.

### مشکل: تصاویر نمایش داده نمی‌شوند

**راه‌حل**: 
- مطمئن شوید تمام فایل‌های `public/` در git commit شده‌اند
- `git add public/` و دوباره push کنید

## 📊 انتظارات پس از Deploy

✅ **کار می‌کند:**
- صفحه اصلی با بنرها
- صفحه محصولات با 5 محصول
- صفحه درباره ما
- صفحه تماس با ما
- تمام تصاویر

❌ **کار نمی‌کند:**
- پنل مدیریت (نیاز به دیتابیس دارد)
- لاگین/احراز هویت
- آپلود فایل

## 🎉 موفقیت!

اگر صفحه اصلی و صفحه محصولات را می‌بینید، Deploy موفق بوده است! 🚀

---

## 📝 نکات اضافی

### اضافه کردن دیتابیس در آینده:

1. در Vercel، یک Postgres database ایجاد کنید
2. `DATABASE_URL` را در Environment Variables تنظیم کنید
3. Migration را اجرا کنید:
   ```bash
   npx prisma migrate deploy
   ```
4. Seed data را اجرا کنید:
   ```bash
   npm run db:seed
   ```

### بررسی لاگ‌ها:

در Vercel Dashboard → Functions → Logs می‌توانید ببینید:
- APIها چه خطایی می‌دهند
- آیا از Mock data استفاده می‌شود

---

**سوالات؟** همه چیز باید بدون مشکل کار کند! 🎯
