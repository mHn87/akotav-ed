# راهنمای نصب سریع پروژه آکوتاو

این راهنما برای توسعه‌دهندگانی است که می‌خواهند پروژه را روی سیستم خود اجرا کنند.

## 📋 پیش‌نیازها

قبل از شروع، مطمئن شوید این موارد نصب شده‌اند:

- ✅ **Node.js** (نسخه 18 یا بالاتر) - [دانلود](https://nodejs.org/)
- ✅ **pnpm** - نصب با: `npm install -g pnpm`
- ✅ **Docker Desktop** - [دانلود](https://www.docker.com/products/docker-desktop/)
- ✅ **Git** - [دانلود](https://git-scm.com/)

## 🚀 مراحل نصب (10 دقیقه)

### گام 1️⃣: دریافت کد پروژه

```bash
# کلون کردن repository
git clone https://github.com/mHn87/akotav-ed.git

# ورود به پوشه پروژه
cd akotav-ed
```

### گام 2️⃣: نصب وابستگی‌ها

```bash
pnpm install
```

⏱️ این مرحله حدود 2-3 دقیقه طول می‌کشد.

### گام 3️⃣: راه‌اندازی دیتابیس و MinIO

```bash
# اجرای Docker containers (PostgreSQL + MinIO)
docker-compose up -d
```

✅ بررسی اجرا شدن صحیح:
```bash
docker-compose ps
```

باید 2 سرویس در حالت `running` باشند:
- `akotav-postgres`
- `akotav-minio`

### گام 4️⃣: ایجاد جداول دیتابیس

```bash
# ایجاد ساختار دیتابیس
npx prisma db push
```

### گام 5️⃣: وارد کردن داده‌های اولیه

```bash
# اضافه کردن دسته‌بندی‌ها و محتوای اولیه
npx prisma db seed
```

این دستور موارد زیر را ایجاد می‌کند:
- ✅ 4 دسته‌بندی محصول
- ✅ صفحه درباره ما
- ✅ صفحه تماس با ما

### گام 6️⃣: اجرای پروژه

```bash
pnpm dev
```

✨ پروژه روی آدرس زیر اجرا می‌شود:
- **سایت اصلی**: http://localhost:3000
- **پنل مدیریت**: http://localhost:3000/panel

## 🔑 اطلاعات ورود

### پنل مدیریت
- 🌐 آدرس: http://localhost:3000/panel
- 👤 نام کاربری: `admin`
- 🔒 رمز عبور: `123qwe123`

### MinIO Console (مدیریت فایل‌ها)
- 🌐 آدرس: http://localhost:9001
- 👤 نام کاربری: `minioadmin`
- 🔒 رمز عبور: `minioadmin`

### Prisma Studio (مشاهده دیتابیس)
```bash
npx prisma studio
```
- 🌐 آدرس: http://localhost:5555

## ✅ بررسی نصب موفق

اگر همه چیز درست پیش رفته باشد:

1. ✅ سایت روی http://localhost:3000 باز می‌شود
2. ✅ 4 دسته‌بندی در صفحه اصلی نمایش داده می‌شود
3. ✅ می‌توانید با `admin` / `123qwe123` وارد پنل شوید
4. ✅ صفحات "درباره ما" و "تماس با ما" محتوا دارند

## 🐛 رفع مشکلات رایج

### مشکل: Docker اجرا نمی‌شود
```bash
# اطمینان از اجرای Docker Desktop
# سپس دوباره امتحان کنید:
docker-compose down
docker-compose up -d
```

### مشکل: خطای اتصال به دیتابیس
```bash
# بررسی logs
docker-compose logs postgres

# ریستارت سرویس‌ها
docker-compose restart
```

### مشکل: پورت 3000 در حال استفاده است
```bash
# پیدا کردن process
lsof -ti:3000

# کشتن process
kill -9 $(lsof -ti:3000)

# یا استفاده از پورت دیگر
PORT=3001 pnpm dev
```

### مشکل: داده‌های seed ایجاد نشدند
```bash
# حذف و ایجاد مجدد دیتابیس
docker-compose down -v
docker-compose up -d
npx prisma db push
npx prisma db seed
```

## 📁 ساختار مهم فایل‌ها

```
akotav/
├── .env                  # تنظیمات محیطی (از قبل موجود است)
├── docker-compose.yml    # کانفیگ PostgreSQL و MinIO
├── prisma/
│   ├── schema.prisma     # مدل دیتابیس
│   └── seed.ts           # داده‌های اولیه
├── app/
│   ├── panel/            # پنل مدیریت
│   ├── api/              # API routes
│   └── page.tsx          # صفحه اصلی
└── components/           # کامپوننت‌های React
```

## 🎯 مراحل بعدی

بعد از نصب موفق، می‌توانید:

1. 🖼️ **محصول اضافه کنید**: از پنل مدیریت → محصولات
2. 📸 **بنر اضافه کنید**: از پنل مدیریت → بنرها
3. 🤝 **شرکا اضافه کنید**: از پنل مدیریت → شرکای همکار
4. ✏️ **محتوا ویرایش کنید**: از پنل مدیریت → صفحات

## 💡 نکات مفید

- **تغییر در schema**: بعد از تغییر `schema.prisma` حتماً `npx prisma db push` اجرا کنید
- **مشاهده لاگ‌ها**: `docker-compose logs -f` برای مشاهده لاگ‌های زنده
- **پاک کردن cache**: `rm -rf .next` و `pnpm dev` دوباره

## 📞 کمک بیشتر

اگر مشکلی پیش آمد:
1. ✅ ابتدا بخش "رفع مشکلات رایج" را بررسی کنید
2. ✅ `README.md` را برای جزئیات بیشتر بخوانید
3. ✅ لاگ‌های Docker و terminal را بررسی کنید

---

موفق باشید! 🎉
