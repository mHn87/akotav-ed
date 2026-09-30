# Akotav Admin Panel

پنل مدیریت دو زبانه (فارسی/انگلیسی) برای مدیریت محصولات، دسته‌بندی‌ها و محتوای سایت آکاتو.

> ⚠️ **توجه**: اگر تغییرات اخیر را دریافت کرده‌اید، لطفاً فایل `FINAL_CHANGES.md` را بخوانید.

## 🎯 ویژگی‌ها

✅ **احراز هویت امن** - JWT-based authentication  
✅ **دو زبانه** - پشتیبانی کامل از فارسی و انگلیسی با تغییر فوری  
✅ **حالت تاریک/روشن** - Dark/Light mode با ذخیره تنظیمات  
✅ **مدیریت دسته‌بندی** - ساده و بدون سلسله‌مراتب  
✅ **مدیریت محصولات** - با فیلدهای دو زبانه و pagination  
✅ **آپلود رسانه** - آپلود تصاویر و ویدیو به MinIO با نمایش پیشرفت  
✅ **تصویر اصلی** - انتخاب تصویر اصلی با کلیک (بدون اولویت‌بندی)  
✅ **ویرایشگر متن غنی** - Tiptap editor با امکانات bold, italic, headings, lists  
✅ **مدیریت صفحات** - ویرایش محتوای "درباره ما" و "تماس با ما"  
✅ **Pagination** - نمایش 10 محصول در هر صفحه  
✅ **Responsive** - طراحی واکنش‌گرا برای موبایل و دسکتاپ

## 📋 پیش‌نیازها

- Node.js 18+
- Docker & Docker Compose
- npm یا pnpm

## 🚀 نصب و راه‌اندازی

### 1. نصب وابستگی‌ها

```bash
npm install
```

### 2. راه‌اندازی سرویس‌ها (PostgreSQL و MinIO)

```bash
docker-compose up -d
```

این دستور سرویس‌های زیر را راه‌اندازی می‌کند:
- **PostgreSQL**: پورت 5432
- **MinIO API**: پورت 9000
- **MinIO Console**: پورت 9001

منتظر بمانید تا سرویس‌ها کاملاً راه‌اندازی شوند (حدود 30 ثانیه).

### 3. تنظیم دیتابیس

```bash
# ساخت جداول دیتابیس
npx prisma migrate dev --name init

# اضافه کردن داده‌های اولیه (صفحات و دسته‌بندی‌های نمونه)
npm run db:seed
```

### 4. اجرای پروژه

```bash
npm run dev
```

پروژه روی **http://localhost:3000** اجرا می‌شود.

## 🔐 دسترسی به پنل ادمین

- **URL**: http://localhost:3000/panel/login
- **نام کاربری**: `admin`
- **رمز عبور**: `123qwe123`

## 🗄️ دسترسی به MinIO Console

برای مدیریت فایل‌ها و bucket‌ها:

- **URL**: http://localhost:9001
- **نام کاربری**: `admin`
- **رمز عبور**: `123qwe123`

## 📁 ساختار پروژه

```
akotav/
├── app/
│   ├── api/                    # API Routes
│   │   ├── auth/              # Authentication endpoints
│   │   ├── categories/        # Categories CRUD
│   │   ├── products/          # Products CRUD
│   │   ├── pages/             # Pages CRUD
│   │   └── upload/            # Media upload to MinIO
│   ├── panel/                 # Admin panel pages
│   │   ├── categories/        # Categories management
│   │   ├── products/          # Products management
│   │   ├── pages/             # Pages management
│   │   ├── login/             # Login page
│   │   ├── layout.tsx         # Panel layout
│   │   └── page.tsx           # Dashboard
│   ├── globals.css
│   ├── layout.tsx
│   ├── not-found.tsx          # 404 page
│   └── page.tsx               # Public homepage
├── components/
│   ├── rich-text-editor.tsx   # Tiptap editor
│   ├── smart-building-site.tsx
│   └── ui/
├── lib/
│   ├── auth.ts                # JWT authentication
│   ├── i18n.ts                # Translations
│   ├── minio.ts               # MinIO client
│   ├── prisma.ts              # Prisma client
│   └── utils.ts
├── prisma/
│   ├── schema.prisma          # Database schema
│   └── seed.ts                # Seed data
├── docker-compose.yml         # Services configuration
├── middleware.ts              # Auth middleware
└── .env                       # Environment variables
```

## 🛠️ دستورات مفید

```bash
# نصب dependencies
npm install

# اجرای development server
npm run dev

# ساخت production build
npm build

# اجرای production server
npm start

# تولید Prisma Client
npm run db:generate

# ساخت migration جدید
npm run db:migrate

# اضافه کردن seed data
npm run db:seed

# باز کردن Prisma Studio (Database GUI)
npm run db:studio

# شروع Docker services
docker-compose up -d

# نمایش logs
docker-compose logs -f

# متوقف کردن services
docker-compose down

# حذف کامل (با volumes)
docker-compose down -v
```

## 🎨 رنگ‌بندی

پنل از تم آبی-سفید استفاده می‌کند:
- **Primary**: Blue (#1e6ff0)
- **Background**: White / Dark Gray
- **Text**: Gray 900 / White

## 🌐 زبان‌ها

- **فارسی (پیش‌فرض)**: RTL layout
- **انگلیسی**: LTR layout

تغییر زبان از طریق دکمه در navigation bar انجام می‌شود.

## 📝 نکات مهم

### دسته‌بندی‌ها
- نام انگلیسی باید unique باشد
- ساده و بدون سلسله‌مراتب
- حذف دسته‌بندی، تمام محصولات مرتبط را نیز حذف می‌کند

### محصولات
- نام فارسی **الزامی** است
- نام انگلیسی **اختیاری** است
- هر محصول می‌تواند چندین عکس و ویدیو داشته باشد
- یک تصویر به عنوان **تصویر اصلی** با کلیک انتخاب می‌شود
- تصویر اصلی با border آبی مشخص می‌شود
- ویدیوها نمی‌توانند تصویر اصلی باشند
- لیست محصولات با pagination (10 آیتم در صفحه)

### رسانه‌ها (Media)
- فرمت‌های مجاز تصویر: JPG, PNG, GIF, WebP
- فرمت‌های مجاز ویدیو: MP4, WebM, MOV
- فایل‌ها در MinIO ذخیره می‌شوند
- URL عمومی برای دسترسی به فایل‌ها
- کاربر با کلیک تصویر اصلی را انتخاب می‌کند

### صفحات
- دو صفحه ثابت: "درباره ما" و "تماس با ما"
- فقط محتوای دو زبانه با rich text editor
- پشتیبانی از HTML

## 🔒 امنیت

- رمزهای عبور با bcrypt هش می‌شوند
- JWT برای session management
- Cookie با httpOnly flag
- Middleware برای محافظت از روت‌های پنل
- MinIO با authentication

## 🐛 عیب‌یابی

### خطای اتصال به دیتابیس
```bash
# بررسی کنید که PostgreSQL در حال اجرا است
docker-compose ps

# Logs را بررسی کنید
docker-compose logs postgres
```

### خطای آپلود فایل
```bash
# بررسی کنید که MinIO در حال اجرا است
docker-compose ps

# Logs را بررسی کنید
docker-compose logs minio

# bucket را manually بسازید
docker exec -it akotav-minio-mc mc mb myminio/akotav
```

### خطای Prisma
```bash
# Prisma Client را دوباره generate کنید
npx prisma generate

# Database را reset کنید (⚠️ تمام داده‌ها حذف می‌شود)
npx prisma migrate reset
```

## 📞 پشتیبانی

برای سوالات و مشکلات، با تیم توسعه تماس بگیرید.

## 📄 لایسنس

© 2024 Akotav. All rights reserved.

