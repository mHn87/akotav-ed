# راهنمای نصب و راه‌اندازی سریع

## مراحل نصب (برای اولین بار)

### 1️⃣ نصب وابستگی‌ها
```bash
npm install
```

### 2️⃣ راه‌اندازی PostgreSQL و MinIO
```bash
docker-compose up -d
```

**صبر کنید تا سرویس‌ها آماده شوند (30 ثانیه)**

### 3️⃣ ساخت دیتابیس
```bash
npx prisma migrate dev --name init
```

### 4️⃣ اضافه کردن داده‌های اولیه
```bash
npm run db:seed
```

### 5️⃣ اجرای برنامه
```bash
npm run dev
```

## ✅ آماده است!

🌐 **سایت اصلی**: http://localhost:3000  
🔐 **پنل مدیریت**: http://localhost:3000/panel/login  
📦 **MinIO Console**: http://localhost:9001  

### اطلاعات ورود
- **نام کاربری**: `admin`
- **رمز عبور**: `123qwe123`

---

## مراحل برای دفعات بعدی

```bash
# 1. راه‌اندازی سرویس‌ها
docker-compose up -d

# 2. اجرای برنامه
npm run dev
```

---

## متوقف کردن

```bash
# متوقف کردن Next.js
# فشار دادن Ctrl+C در ترمینال

# متوقف کردن Docker services
docker-compose down
```

---

## حذف کامل داده‌ها

⚠️ **هشدار**: این دستور تمام داده‌ها را حذف می‌کند!

```bash
docker-compose down -v
```

---

## مشاهده دیتابیس

```bash
npm run db:studio
```

این دستور Prisma Studio را در http://localhost:5555 باز می‌کند.

---

## رفع مشکلات رایج

### خطا در اتصال به دیتابیس
```bash
# بررسی وضعیت services
docker-compose ps

# مشاهده logs
docker-compose logs postgres

# restart کردن
docker-compose restart postgres
```

### خطا در آپلود فایل
```bash
# بررسی MinIO
docker-compose ps

# restart کردن MinIO
docker-compose restart minio
```

### خطای Prisma
```bash
# تولید مجدد Prisma Client
npx prisma generate

# اجرای migrations
npx prisma migrate deploy
```

---

## بروزرسانی dependencies

```bash
npm install
```

---

## ساخت برای production

```bash
npm run build
npm start
```
