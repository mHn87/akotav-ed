# سیستم Mock Data برای Vercel

این پروژه شامل یک سیستم Mock Data است که در صورت عدم دسترسی به دیتابیس (خطای 500)، داده‌های جایگزین را نمایش می‌دهد.

## ساختار فایل‌ها

### 1. فایل Mock Data: `lib/mock-data.ts`

این فایل شامل تمام داده‌های mock است:

- **mockPages**: داده‌های صفحات (درباره ما، تماس با ما)
- **mockCategories**: دسته‌بندی‌ها (4 دسته از seed)
- **mockBanners**: بنرهای اسلایدر (3 بنر با عکس‌های موجود در public/slider)
- **mockPartners**: شرکای تجاری (4 شرکا با لوگوهای موجود در public/partner)
- **mockProducts**: محصولات (5 محصول بر اساس دسته‌بندی‌ها - بدون عکس)

### 2. API Routes

تمام API های عمومی آپدیت شده‌اند:

- `app/api/public/banners/route.ts` - بنرها
- `app/api/public/categories/route.ts` - دسته‌بندی‌ها  
- `app/api/public/pages/[key]/route.ts` - صفحات
- `app/api/public/partners/route.ts` - شرکا
- `app/api/public/products/route.ts` - محصولات

### 3. عکس‌های استفاده شده

**بنرها (Sliders):**
- `/slider/Apartment-door-security-main.jpg`
- `/slider/image-1566402253434-39d5ba9d600a5dfaf36f5ca391d3081a.jpg`
- `/slider/images.jpg`

**شرکای تجاری (Partners):**
- `/partner/Control4_Logo_Color-2048x449-Q0oR7ku7sETWjMTRi6ElY8ZG8t5ZIZ.png`
- `/partner/system-sensor-B-2048x715-ImL6ZL7xL4BscB8HfC89mHIOfrlsIZ.png`
- `/partner/triad_logo_color_color-Wz0KlXSvOiCbZDGnPZYqD1mXydXQEo.png`
- `/partner/logo-2-XlAT450oMvNdUXAUGCxR4aQ28KNo4Y.png`

**محصولات:**
- فعلاً بدون عکس (imageUrl: null)
- می‌توانید بعداً عکس اضافه کنید

## نحوه کار

1. زمانی که API به دیتابیس متصل است، داده‌های واقعی را برمی‌گرداند
2. اگر خطای 500 رخ دهد (مثلاً در Vercel بدون دیتابیس)، به جای خطا، داده‌های mock نمایش داده می‌شود
3. کاربر متوجه تفاوتی نمی‌شود و سایت به صورت کامل کار می‌کند

## محصولات Mock

محصولات بر اساس دسته‌بندی‌های seed ایجاد شده‌اند:

1. **سیستم کنترل هوشمند Control4** - دسته: خانه هوشمند
2. **دتکتور دود System Sensor** - دسته: امنیت و نظارت
3. **سیستم تهویه هوشمند** - دسته: سیستم تهویه
4. **دوربین مداربسته IP** - دسته: امنیت و دوربین مدار بسته
5. **پنل اعلام حریق مرکزی** - دسته: امنیت و نظارت

هر محصول شامل:
- عنوان فارسی و انگلیسی
- توضیحات کوتاه
- محتوای کامل HTML با ویژگی‌ها
- ارتباط با دسته‌بندی مربوطه

## دیپلوی در Vercel

برای دیپلوی در Vercel بدون دیتابیس:

1. فایل‌های مورد نیاز در پوشه `public` را کامیت کنید
2. پروژه را به Vercel متصل کنید
3. متغیرهای محیطی را تنظیم **نکنید** (یا URL دیتابیس غلط بدهید)
4. سایت با داده‌های mock کار می‌کند

## توسعه آینده

اگر خواستید عکس برای محصولات اضافه کنید:

1. عکس‌ها را در پوشه `public/products` قرار دهید
2. در `lib/mock-data.ts` فیلد `imageUrl` را آپدیت کنید
3. مثال: `imageUrl: '/products/product-1.jpg'`

## نکات مهم

- تمام داده‌های mock از فایل seed گرفته شده‌اند
- عکس‌های بنر و شرکا از فایل‌های موجود در public استفاده می‌کنند
- محصولات فعلاً بدون عکس هستند (برای سرعت بیشتر)
- این سیستم هیچ تغییری در عملکرد عادی (با دیتابیس) ایجاد نمی‌کند
