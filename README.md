# Akotav Admin Panel

پنل مدیریت دو زبانه (فارسی/انگلیسی) برای مدیریت محصولات، دسته‌بندی‌ها و محتوای سایت آکوتاو.

## ✨ ویژگی‌ها

### پنل مدیریت
- 🔐 **احراز هویت**: سیستم ورود با JWT (username: `admin` / password: `123qwe123`)
- 🌐 **دو زبانه**: پشتیبانی کامل از فارسی و انگلیسی
- 🎨 **حالت تاریک/روشن**: تم آبی-سفید با قابلیت تغییر
- 📦 **مدیریت دسته‌بندی‌ها**: CRUD کامل برای دسته‌بندی محصولات
- 🛍️ **مدیریت محصولات**: افزودن، ویرایش، حذف محصولات با آپلود چند تصویر
- 🖼️ **مدیریت بنرها**: بنرهای اسلایدر با قابلیت ترتیب‌دهی
- 🤝 **مدیریت شرکای همکار**: لوگو و لینک شرکت‌های همکار
- 📄 **مدیریت صفحات**: ویرایش محتوای صفحات درباره ما و تماس با ما
- 📤 **آپلود تصاویر**: ذخیره‌سازی تصاویر در MinIO
- ✏️ **ویرایشگر متن**: Tiptap برای محتوای غنی

### صفحه اصلی
- 🎭 **اسلایدر بنر**: نمایش بنرها با auto-play هر 3 ثانیه
- 📦 **دسته‌بندی محصولات**: نمایش دسته‌بندی‌ها با رنگ‌های تصادفی
- 📖 **درباره ما**: نمایش پیش‌نمایش صفحه درباره ما از API
- 🤝 **شرکای همکار**: اسکرول خودکار لوگوهای شرکت‌ها (RTL)
- 📱 **دکمه واتساپ**: دکمه شناور برای تماس مستقیم (09194862368)
- 🌐 **دو زبانه**: تغییر فوری زبان بین فارسی و انگلیسی

### صفحات دیگر
- **صفحه محصولات**: فیلتر بر اساس دسته‌بندی، جستجو، مرتب‌سازی، pagination
- **صفحه درباره ما**: نمایش محتوای کامل از API
- **صفحه تماس با ما**: نمایش اطلاعات تماس از API

## 🚀 نصب و راه‌اندازی

### پیش‌نیازها
- Node.js 18+
- pnpm (یا npm/yarn)
- Docker & Docker Compose

### مراحل نصب

#### 1. کلون کردن پروژه
```bash
git clone <repository-url>
cd akotav
```

#### 2. نصب وابستگی‌ها
```bash
pnpm install
```

#### 3. راه‌اندازی PostgreSQL و MinIO
```bash
docker-compose up -d
```

این دستور دو سرویس را راه‌اندازی می‌کند:
- **PostgreSQL**: دیتابیس اصلی روی پورت `5432`
- **MinIO**: ذخیره‌سازی فایل روی پورت `9000` (Console: `9001`)

#### 4. تنظیم متغیرهای محیطی
فایل `.env` را ویرایش کنید (از قبل موجود است):
```env
DATABASE_URL="postgresql://akotav:akotav123@localhost:5432/akotav"
JWT_SECRET="your-super-secret-jwt-key-change-this-in-production"
MINIO_ENDPOINT="localhost"
MINIO_PORT=9000
MINIO_USE_SSL=false
MINIO_ACCESS_KEY="minioadmin"
MINIO_SECRET_KEY="minioadmin"
MINIO_BUCKET_NAME="akotav"
```

#### 5. راه‌اندازی دیتابیس
```bash
# ایجاد جداول
npx prisma db push

# وارد کردن داده‌های اولیه
npx prisma db seed
```

این دستور داده‌های زیر را ایجاد می‌کند:
- 4 دسته‌بندی: خانه هوشمند، امنیت و نظارت، سیستم تهویه، امنیت و دوربین مدار بسته
- صفحه درباره ما با محتوای کامل
- صفحه تماس با ما با آدرس و اطلاعات تماس

#### 6. اجرای پروژه
```bash
pnpm dev
```

پروژه روی `http://localhost:3000` اجرا می‌شود.

## 🔑 دسترسی به پنل

- **آدرس پنل**: `http://localhost:3000/panel`
- **نام کاربری**: `admin`
- **رمز عبور**: `123qwe123`

## 🗂️ ساختار پروژه

```
akotav/
├── app/
│   ├── api/              # API routes
│   │   ├── auth/         # احراز هویت (login, logout, verify)
│   │   ├── panel/        # API های پنل مدیریت
│   │   └── public/       # API های عمومی (بدون احراز هویت)
│   ├── panel/            # صفحات پنل مدیریت
│   ├── products/         # صفحه محصولات
│   ├── about/            # صفحه درباره ما
│   ├── contact/          # صفحه تماس با ما
│   └── page.tsx          # صفحه اصلی
├── components/
│   ├── smart-building-site.tsx  # کامپوننت اصلی صفحه لندینگ
│   └── whatsapp-button.tsx      # دکمه واتساپ شناور
├── lib/
│   ├── minio.ts          # کانفیگ MinIO
│   ├── jwt.ts            # توابع JWT
│   └── utils.ts          # توابع کمکی
├── prisma/
│   ├── schema.prisma     # مدل دیتابیس
│   └── seed.ts           # داده‌های اولیه
└── docker-compose.yml    # کانفیگ PostgreSQL و MinIO
```

## 📦 دسته‌بندی‌های پیش‌فرض

1. **خانه هوشمند** (Smart Home)
2. **امنیت و نظارت** (Security & Surveillance)
3. **سیستم تهویه** (Ventilation System)
4. **امنیت و دوربین مدار بسته** (CCTV Security)

## 🛠️ تکنولوژی‌ها

- **Framework**: Next.js 14 (App Router)
- **Database**: PostgreSQL
- **ORM**: Prisma
- **Storage**: MinIO
- **Authentication**: JWT
- **UI**: Tailwind CSS
- **Rich Text Editor**: Tiptap
- **Language**: TypeScript
- **Icons**: Lucide React

## 🔄 دستورات مفید

```bash
# نصب وابستگی‌ها
pnpm install

# اجرای پروژه در حالت توسعه
pnpm dev

# بیلد پروژه
pnpm build

# اجرای بیلد شده
pnpm start

# راه‌اندازی دیتابیس
docker-compose up -d

# خاموش کردن دیتابیس
docker-compose down

# ایجاد/آپدیت جداول دیتابیس
npx prisma db push

# وارد کردن داده‌های اولیه
npx prisma db seed

# مشاهده دیتابیس با Prisma Studio
npx prisma studio
```

## 📝 نکات مهم

### MinIO Console
برای دسترسی به MinIO Console:
- آدرس: `http://localhost:9001`
- نام کاربری: `minioadmin`
- رمز عبور: `minioadmin`

### دیتابیس
اگر نیاز به ریست کامل دیتابیس دارید:
```bash
docker-compose down -v
docker-compose up -d
npx prisma db push
npx prisma db seed
```

### تصاویر
تمام تصاویر در MinIO bucket با نام `akotav` ذخیره می‌شوند.

## 🐛 رفع مشکلات

### خطای اتصال به دیتابیس
```bash
# بررسی وضعیت Docker containers
docker-compose ps

# مشاهده لاگ‌ها
docker-compose logs postgres
```

### خطای MinIO
```bash
# بررسی لاگ‌های MinIO
docker-compose logs minio

# ریستارت MinIO
docker-compose restart minio
```

### خطای Migration
```bash
# حذف و ایجاد مجدد دیتابیس
docker-compose down -v
docker-compose up -d
npx prisma db push
```

## 📞 اطلاعات تماس

- **آدرس**: استان تهران، شهرستان شمیرانات، بخش مرکزی، شهر تجریش، چیذر، خیابان شهیدسرلشکرمنصور وطن پور شمالی، خیابان شهید دکتر لواسانی، پلاک ۲۰۰، طبقه ۱
- **کد پستی**: 1937744114
- **تلفن**: 021-00000000
- **واتساپ**: 09194862368
- **ساعات کاری**: 8 الی 14 و 17 الی 20

## 📄 لایسنس

این پروژه برای استفاده شخصی شرکت آکوتاو ساخته شده است.
