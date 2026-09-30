// Mock data برای زمانی که دیتابیس در دسترس نیست (خطای 500)

export const mockPages = {
  about: {
    key: 'about',
    titleFa: 'درباره ما',
    titleEn: 'About Us',
    contentFa: `<h2>درباره آکوتاو</h2>
<p>شرکت آکوتاو در سال 1390 فعالیت خود را در زمینه ارائه خدمات و محصولات تجهیزات ساختمانی آغاز نموده است. این شرکت جزو مشاوران مورد تأیید سازمان‌های مهندسی و تجاری تهران می‌باشد و با بهره‌گیری از سال‌ها تجربه ارزشمند و راه‌اندازی صدها پروژه ملی، تبدیل به یکی از برندهای خوشنام و مورد اعتماد در حوزه تأسیسات شده است.</p>
<p>ارائه راهکارهای متناسب با نیاز مشتری و خدمات پس از فروش پیوسته، باعث جلب اعتماد صنایع مختلف شده و رمز موفقیت این شرکت است. تمامی سیستم‌ها باید از برندهای معتمد، تأییدیه‌های معتبر جهانی و مهم‌تر از همه مورد تأیید سازمان آتش‌نشانی، مهندسی و خدمات ایمنی برق و غیره باشند.</p>
<p>گروه صنعتی آکوتاو نماینده بهترین و معتبرترین برندهای مربوط به سیستم‌های اعلام حریق و سیستم‌های اطفاء حریق می‌باشد. همکاری با کمپانی‌های معتبر اروپایی و استفاده از پرسنل کارآزموده، در کنار بهره‌گیری از استانداردهای معتبر بین‌المللی، باعث کسب رضایت مشتریان و ارتقاء جایگاه این شرکت گردیده است.</p>`,
    contentEn: `<h2>About Akotav</h2>
<p>Akotav Company started its activities in 2011 in the field of providing services and products for building equipment. This company is one of the approved consultants of Tehran engineering and commercial organizations and with years of valuable experience and launching hundreds of national projects, it has become one of the reputable and trusted brands in the field of facilities.</p>
<p>Providing solutions tailored to customer needs and continuous after-sales service has gained the trust of various industries and is the secret of this company's success. All systems must be from reliable brands, valid international certifications, and most importantly, approved by fire departments, engineering, and electrical safety services.</p>
<p>Akotav Industrial Group is the representative of the best and most reliable brands related to fire alarm systems and fire extinguishing systems. Cooperation with reputable European companies and the use of experienced personnel, along with the use of valid international standards, has resulted in customer satisfaction and the promotion of this company's position.</p>`,
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01'),
  },
  contact: {
    key: 'contact',
    titleFa: 'تماس با ما',
    titleEn: 'Contact Us',
    contentFa: `<h2>تماس با ما</h2>
<h3>آدرس</h3>
<p>استان تهران، شهرستان شمیرانات، بخش مرکزی، شهر تجریش، چیذر، خیابان شهیدسرلشکرمنصور وطن پور شمالی، خیابان شهید دکتر لواسانی، پلاک ۲۰۰، طبقه ۱</p>
<h3>کد پستی</h3>
<p>1937744114</p>
<h3>تلفن تماس</h3>
<p>021-00000000</p>
<h3>ساعات پاسخ گویی</h3>
<p>8 الی 14 و 17 الی 20</p>`,
    contentEn: `<h2>Contact Us</h2>
<h3>Address</h3>
<p>Tehran Province, Shemiranat County, Central District, Tajrish City, Chizar, Shahid Sarlashkar Mansour Vatanpour North Street, Shahid Dr. Lavasani Street, Plate 200, Floor 1</p>
<h3>Postal Code</h3>
<p>1937744114</p>
<h3>Phone</h3>
<p>021-00000000</p>
<h3>Working Hours</h3>
<p>8 AM to 2 PM and 5 PM to 8 PM</p>`,
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01'),
  },
}

export const mockCategories = [
  {
    id: '1',
    nameFa: 'خانه هوشمند',
    nameEn: 'Smart Home',
    slug: 'smart-home',
    createdAt: '2024-01-01T00:00:00.000Z',
    updatedAt: '2024-01-01T00:00:00.000Z',
  },
  {
    id: '2',
    nameFa: 'امنیت و نظارت',
    nameEn: 'Security & Surveillance',
    slug: 'security-surveillance',
    createdAt: '2024-01-01T00:00:00.000Z',
    updatedAt: '2024-01-01T00:00:00.000Z',
  },
  {
    id: '3',
    nameFa: 'سیستم تهویه',
    nameEn: 'Ventilation System',
    slug: 'ventilation-system',
    createdAt: '2024-01-01T00:00:00.000Z',
    updatedAt: '2024-01-01T00:00:00.000Z',
  },
  {
    id: '4',
    nameFa: 'امنیت و دوربین مدار بسته',
    nameEn: 'CCTV Security',
    slug: 'cctv-security',
    createdAt: '2024-01-01T00:00:00.000Z',
    updatedAt: '2024-01-01T00:00:00.000Z',
  },
]

export const mockBanners = [
  {
    id: '1',
    titleFa: 'سیستم‌های امنیتی پیشرفته',
    titleEn: 'Advanced Security Systems',
    descriptionFa: 'راهکارهای کامل امنیتی برای خانه و محل کار شما',
    descriptionEn: 'Complete security solutions for your home and workplace',
    imageUrl: '/slider/Apartment-door-security-main.jpg',
    linkUrl: '/products',
    order: 1,
    isActive: true,
    createdAt: '2024-01-01T00:00:00.000Z',
    updatedAt: '2024-01-01T00:00:00.000Z',
  },
  {
    id: '2',
    titleFa: 'خانه هوشمند آکوتاو',
    titleEn: 'Akotav Smart Home',
    descriptionFa: 'تجربه زندگی مدرن با سیستم‌های هوشمند',
    descriptionEn: 'Experience modern living with smart systems',
    imageUrl: '/slider/image-1566402253434-39d5ba9d600a5dfaf36f5ca391d3081a.jpg',
    linkUrl: '/products',
    order: 2,
    isActive: true,
    createdAt: '2024-01-01T00:00:00.000Z',
    updatedAt: '2024-01-01T00:00:00.000Z',
  },
  {
    id: '3',
    titleFa: 'سیستم‌های اعلام حریق',
    titleEn: 'Fire Alarm Systems',
    descriptionFa: 'محافظت حرفه‌ای از دارایی شما',
    descriptionEn: 'Professional protection for your property',
    imageUrl: '/slider/images.jpg',
    linkUrl: '/products',
    order: 3,
    isActive: true,
    createdAt: '2024-01-01T00:00:00.000Z',
    updatedAt: '2024-01-01T00:00:00.000Z',
  },
]

export const mockPartners = [
  {
    id: '1',
    nameFa: 'کنترل ۴',
    nameEn: 'Control4',
    logoUrl: '/partner/Control4_Logo_Color-2048x449-Q0oR7ku7sETWjMTRi6ElY8ZG8t5ZIZ.png',
    websiteUrl: 'https://www.control4.com',
    order: 1,
    isActive: true,
    createdAt: '2024-01-01T00:00:00.000Z',
    updatedAt: '2024-01-01T00:00:00.000Z',
  },
  {
    id: '2',
    nameFa: 'سیستم سنسور',
    nameEn: 'System Sensor',
    logoUrl: '/partner/system-sensor-B-2048x715-ImL6ZL7xL4BscB8HfC89mHIOfrlsIZ.png',
    websiteUrl: 'https://www.systemsensor.com',
    order: 2,
    isActive: true,
    createdAt: '2024-01-01T00:00:00.000Z',
    updatedAt: '2024-01-01T00:00:00.000Z',
  },
  {
    id: '3',
    nameFa: 'تریاد',
    nameEn: 'Triad',
    logoUrl: '/partner/triad_logo_color_color-Wz0KlXSvOiCbZDGnPZYqD1mXydXQEo.png',
    websiteUrl: '#',
    order: 3,
    isActive: true,
    createdAt: '2024-01-01T00:00:00.000Z',
    updatedAt: '2024-01-01T00:00:00.000Z',
  },
  {
    id: '4',
    nameFa: 'لوگو ۲',
    nameEn: 'Logo 2',
    logoUrl: '/partner/logo-2-XlAT450oMvNdUXAUGCxR4aQ28KNo4Y.png',
    websiteUrl: '#',
    order: 4,
    isActive: true,
    createdAt: '2024-01-01T00:00:00.000Z',
    updatedAt: '2024-01-01T00:00:00.000Z',
  },
]

export const mockProducts = [
  {
    id: '1',
    nameFa: 'سیستم کنترل هوشمند Control4',
    nameEn: 'Control4 Smart Control System',
    descriptionFa: '<p>سیستم کنترل هوشمند Control4 یکی از پیشرفته‌ترین سیستم‌های خانه هوشمند در جهان است. این سیستم امکان کنترل تمامی تجهیزات الکترونیکی خانه را از طریق یک رابط کاربری واحد فراهم می‌کند.</p><h3>ویژگی‌های محصول:</h3><ul><li>کنترل نور هوشمند</li><li>مدیریت دمای محیط</li><li>سیستم صوتی چند منطقه‌ای</li><li>کنترل از راه دور</li></ul>',
    descriptionEn: '<p>Control4 Smart Control System is one of the most advanced smart home systems in the world. This system provides the ability to control all home electronic equipment through a unified user interface.</p><h3>Product Features:</h3><ul><li>Smart lighting control</li><li>Temperature management</li><li>Multi-zone audio system</li><li>Remote control</li></ul>',
    imageUrl: '/products/control.jpg',
    categoryId: '1',
    isActive: true,
    isFeatured: true,
    createdAt: '2024-01-01T00:00:00.000Z',
    updatedAt: '2024-01-01T00:00:00.000Z',
  },
  {
    id: '2',
    nameFa: 'دتکتور دود System Sensor',
    nameEn: 'System Sensor Smoke Detector',
    descriptionFa: '<p>دتکتور دود System Sensor با استفاده از جدیدترین تکنولوژی‌های آشکارسازی، امنیت بالایی را برای ساختمان شما فراهم می‌کند.</p><h3>ویژگی‌های محصول:</h3><ul><li>حساسیت قابل تنظیم</li><li>مقاوم در برابر گرد و غبار</li><li>سیستم خودآزمایی</li><li>باتری طولانی مدت</li></ul>',
    descriptionEn: '<p>System Sensor smoke detector provides high security for your building using the latest detection technologies.</p><h3>Product Features:</h3><ul><li>Adjustable sensitivity</li><li>Dust resistant</li><li>Self-testing system</li><li>Long-life battery</li></ul>',
    imageUrl: '/products/fire.jpg',
    categoryId: '2',
    isActive: true,
    isFeatured: true,
    createdAt: '2024-01-02T00:00:00.000Z',
    updatedAt: '2024-01-02T00:00:00.000Z',
  },
  {
    id: '3',
    nameFa: 'سیستم تهویه هوشمند',
    nameEn: 'Smart Ventilation System',
    descriptionFa: '<p>سیستم تهویه هوشمند با استفاده از سنسورهای پیشرفته، کیفیت هوا را پایش کرده و به صورت خودکار تهویه را تنظیم می‌کند.</p><h3>ویژگی‌های محصول:</h3><ul><li>کنترل خودکار کیفیت هوا</li><li>بهینه‌سازی مصرف انرژی</li><li>فیلترهای قابل تعویض</li><li>عملکرد بی‌صدا</li></ul>',
    descriptionEn: '<p>Smart ventilation system monitors air quality using advanced sensors and automatically adjusts ventilation.</p><h3>Product Features:</h3><ul><li>Automatic air quality control</li><li>Energy consumption optimization</li><li>Replaceable filters</li><li>Silent operation</li></ul>',
    imageUrl: '/products/fan_house.jpg',
    categoryId: '3',
    isActive: true,
    isFeatured: false,
    createdAt: '2024-01-03T00:00:00.000Z',
    updatedAt: '2024-01-03T00:00:00.000Z',
  },
  {
    id: '4',
    nameFa: 'دوربین مداربسته IP',
    nameEn: 'IP CCTV Camera',
    descriptionFa: '<p>دوربین مداربسته IP با کیفیت تصویر 4K و قابلیت‌های پیشرفته نظارتی، امنیت کامل را برای شما فراهم می‌کند.</p><h3>ویژگی‌های محصول:</h3><ul><li>تصویربرداری 4K</li><li>دید در شب با مادون قرمز</li><li>تشخیص حرکت هوشمند</li><li>ذخیره‌سازی ابری</li></ul>',
    descriptionEn: '<p>IP CCTV camera with 4K image quality and advanced surveillance features provides complete security.</p><h3>Product Features:</h3><ul><li>4K recording</li><li>Infrared night vision</li><li>Smart motion detection</li><li>Cloud storage</li></ul>',
    imageUrl: '/products/camera.jpg',
    categoryId: '4',
    isActive: true,
    isFeatured: true,
    createdAt: '2024-01-04T00:00:00.000Z',
    updatedAt: '2024-01-04T00:00:00.000Z',
  },
  {
    id: '5',
    nameFa: 'پنل اعلام حریق مرکزی',
    nameEn: 'Central Fire Alarm Panel',
    descriptionFa: '<p>پنل اعلام حریق مرکزی با ظرفیت اتصال تا 500 دتکتور و قابلیت مدیریت چند منطقه‌ای.</p><h3>ویژگی‌های محصول:</h3><ul><li>ظرفیت بالا</li><li>مدیریت چند منطقه‌ای</li><li>رابط کاربری گرافیکی</li><li>ارتباط با مرکز کنترل</li></ul>',
    descriptionEn: '<p>Central fire alarm panel with capacity to connect up to 500 detectors and multi-zone management capability.</p><h3>Product Features:</h3><ul><li>High capacity</li><li>Multi-zone management</li><li>Graphical user interface</li><li>Control center communication</li></ul>',
    imageUrl: '/products/fan.jpg',
    categoryId: '2',
    isActive: true,
    isFeatured: false,
    createdAt: '2024-01-05T00:00:00.000Z',
    updatedAt: '2024-01-05T00:00:00.000Z',
  },
]
