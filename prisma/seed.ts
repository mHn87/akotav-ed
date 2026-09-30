import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Seeding database...')

  // Create About Us page
  const aboutPage = await prisma.page.upsert({
    where: { key: 'about' },
    update: {
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
    },
    create: {
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
    },
  })

  // Create Contact Us page
  const contactPage = await prisma.page.upsert({
    where: { key: 'contact' },
    update: {
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
    },
    create: {
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
    },
  })

  console.log('✅ Pages created:', { aboutPage, contactPage })

  // Create categories
  const smartHomeCategory = await prisma.category.upsert({
    where: { slug: 'smart-home' },
    update: {
      nameFa: 'خانه هوشمند',
      nameEn: 'Smart Home',
    },
    create: {
      nameFa: 'خانه هوشمند',
      nameEn: 'Smart Home',
      slug: 'smart-home',
    },
  })

  const securityCategory = await prisma.category.upsert({
    where: { slug: 'security-surveillance' },
    update: {
      nameFa: 'امنیت و نظارت',
      nameEn: 'Security & Surveillance',
    },
    create: {
      nameFa: 'امنیت و نظارت',
      nameEn: 'Security & Surveillance',
      slug: 'security-surveillance',
    },
  })

  const ventilationCategory = await prisma.category.upsert({
    where: { slug: 'ventilation-system' },
    update: {
      nameFa: 'سیستم تهویه',
      nameEn: 'Ventilation System',
    },
    create: {
      nameFa: 'سیستم تهویه',
      nameEn: 'Ventilation System',
      slug: 'ventilation-system',
    },
  })

  const cctvCategory = await prisma.category.upsert({
    where: { slug: 'cctv-security' },
    update: {
      nameFa: 'امنیت و دوربین مدار بسته',
      nameEn: 'CCTV Security',
    },
    create: {
      nameFa: 'امنیت و دوربین مدار بسته',
      nameEn: 'CCTV Security',
      slug: 'cctv-security',
    },
  })

  console.log('✅ Categories created:', {
    smartHomeCategory,
    securityCategory,
    ventilationCategory,
    cctvCategory,
  })

  console.log('🎉 Seeding completed successfully!')
}

main()
  .catch((e) => {
    console.error('❌ Seeding failed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
