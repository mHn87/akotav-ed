# راهنمای Migration دیتابیس

## تغییرات انجام شده:

1. **حذف فیلد parent از Category**
   - حذف `parentId`, `parent`, `children`
   - دسته‌بندی‌ها دیگر تو در تو نیستند

2. **تغییر priority به isMain در Media**
   - حذف فیلد `priority`
   - اضافه شدن فیلد `isMain` (Boolean)
   - فقط یک تصویر می‌تواند isMain باشد

3. **حذف فیلدهای title از Page**
   - در کد فقط contentFa و contentEn استفاده می‌شود
   - titleFa و titleEn در schema باقی مانده‌اند اما استفاده نمی‌شوند

## مراحل Migration:

### روش 1: Reset کامل (⚠️ تمام داده‌ها حذف می‌شوند)

```bash
# متوقف کردن سرویس‌ها
docker-compose down -v

# شروع مجدد
docker-compose up -d

# صبر 30 ثانیه

# ساخت دیتابیس جدید
npx prisma migrate dev --name update_schema

# اضافه کردن seed data
npm run db:seed
```

### روش 2: Migration تدریجی (حفظ داده‌ها)

```bash
# ساخت migration
npx prisma migrate dev --name remove_parent_and_priority

# اگر خطا داد، migration manual بزنید:
npx prisma migrate dev --create-only --name manual_update
```

سپس migration SQL را ویرایش کنید:

```sql
-- Migration: remove parent from categories and priority from media

-- 1. حذف رابطه parent-child از categories
ALTER TABLE "Category" DROP COLUMN IF EXISTS "parentId";

-- 2. تغییر priority به isMain در media
ALTER TABLE "Media" ADD COLUMN "isMain" BOOLEAN DEFAULT false;

-- 3. تنظیم اولین تصویر هر محصول به عنوان main
WITH ranked_media AS (
  SELECT 
    id,
    "productId",
    type,
    ROW_NUMBER() OVER (PARTITION BY "productId", type ORDER BY priority DESC, "createdAt" ASC) as rn
  FROM "Media"
  WHERE type = 'image'
)
UPDATE "Media" m
SET "isMain" = true
FROM ranked_media rm
WHERE m.id = rm.id AND rm.rn = 1;

-- 4. حذف ستون priority
ALTER TABLE "Media" DROP COLUMN IF EXISTS "priority";

-- 5. پاک کردن index های قدیمی
DROP INDEX IF EXISTS "Category_parentId_idx";
DROP INDEX IF EXISTS "Media_priority_idx";
```

سپس:

```bash
# اجرای migration
npx prisma migrate deploy

# تولید Prisma Client جدید
npx prisma generate
```

## بررسی Migration:

```bash
# مشاهده وضعیت
npx prisma migrate status

# مشاهده دیتابیس
npm run db:studio
```

## اگر مشکلی پیش آمد:

```bash
# Reset کامل
npx prisma migrate reset

# اجرای seed
npm run db:seed
```
