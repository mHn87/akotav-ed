# محصولات با تصاویر - Mock Data

## ✅ تصاویر اضافه شده

تمام 5 محصول mock حالا با تصاویر مرتبط هستند:

### 1️⃣ سیستم کنترل هوشمند Control4
- **دسته‌بندی**: خانه هوشمند
- **تصویر**: `/products/control.jpg`
- **Featured**: ✅ بله

### 2️⃣ دتکتور دود System Sensor
- **دسته‌بندی**: امنیت و نظارت
- **تصویر**: `/products/fire.jpg`
- **Featured**: ✅ بله

### 3️⃣ سیستم تهویه هوشمند
- **دسته‌بندی**: سیستم تهویه
- **تصویر**: `/products/fan_house.jpg`
- **Featured**: ❌ خیر

### 4️⃣ دوربین مداربسته IP
- **دسته‌بندی**: امنیت و دوربین مدار بسته
- **تصویر**: `/products/camera.jpg`
- **Featured**: ✅ بله

### 5️⃣ پنل اعلام حریق مرکزی
- **دسته‌بندی**: امنیت و نظارت
- **تصویر**: `/products/fan.jpg`
- **Featured**: ❌ خیر

## 📁 ساختار فایل‌های تصویر

```
public/
├── products/
│   ├── camera.jpg      → دوربین مداربسته
│   ├── control.jpg     → سیستم کنترل هوشمند
│   ├── fan.jpg         → پنل اعلام حریق
│   ├── fan_house.jpg   → سیستم تهویه
│   └── fire.jpg        → دتکتور دود
├── slider/
│   ├── Apartment-door-security-main.jpg
│   ├── image-1566402253434-39d5ba9d600a5dfaf36f5ca391d3081a.jpg
│   └── images.jpg
└── partner/
    ├── Control4_Logo_Color-2048x449-Q0oR7ku7sETWjMTRi6ElY8ZG8t5ZIZ.png
    ├── system-sensor-B-2048x715-ImL6ZL7xL4BscB8HfC89mHIOfrlsIZ.png
    ├── triad_logo_color_color-Wz0KlXSvOiCbZDGnPZYqD1mXydXQEo.png
    └── logo-2-XlAT450oMvNdUXAUGCxR4aQ28KNo4Y.png
```

## 🔧 تغییرات فنی

### 1. فایل `lib/mock-data.ts`
هر محصول حالا یک فیلد `imageUrl` دارد:
```typescript
{
  id: '1',
  nameFa: 'سیستم کنترل هوشمند Control4',
  nameEn: 'Control4 Smart Control System',
  imageUrl: '/products/control.jpg',  // ✅ اضافه شد
  // ...
}
```

### 2. فایل `app/api/public/products/route.ts`
API حالا تصاویر را به عنوان media object برمی‌گرداند:
```typescript
media: product.imageUrl ? [
  {
    id: `${product.id}-media-1`,
    type: 'image',
    url: product.imageUrl,
    isMain: true,
    createdAt: product.createdAt
  }
] : []
```

## ✅ تست API

```bash
GET /api/public/products
```

**پاسخ نمونه:**
```json
[
  {
    "id": "1",
    "nameFa": "سیستم کنترل هوشمند Control4",
    "nameEn": "Control4 Smart Control System",
    "imageUrl": "/products/control.jpg",
    "category": {
      "id": "1",
      "nameFa": "خانه هوشمند",
      "nameEn": "Smart Home"
    },
    "media": [
      {
        "id": "1-media-1",
        "type": "image",
        "url": "/products/control.jpg",
        "isMain": true
      }
    ]
  }
]
```

## 🌐 نمایش در صفحه محصولات

صفحه `/products` حالا:
- ✅ تصاویر محصولات را نمایش می‌دهد
- ✅ عکس اصلی هر محصول را در grid نشان می‌دهد
- ✅ در modal جزئیات، تمام media را نمایش می‌دهد
- ✅ بدون خطا کار می‌کند

## 🚀 آماده برای دیپلوی

پروژه کاملاً آماده است:
- ✅ تمام APIها با mock data کار می‌کنند
- ✅ تمام عکس‌ها موجود و لینک شده‌اند
- ✅ بدون نیاز به دیتابیس کار می‌کند
- ✅ مناسب برای دیپلوی در Vercel

**سرور در حال اجرا**: http://localhost:3000
