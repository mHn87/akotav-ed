import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Seeding database...')

  // Create About Us page
  const aboutPage = await prisma.page.upsert({
    where: { key: 'about' },
    update: {},
    create: {
      key: 'about',
      titleFa: 'درباره ما',
      titleEn: 'About Us',
      contentFa: '<h2>درباره آکاتو</h2><p>شرکت آکوتاو در سال 1390 فعالیت خود را در زمینه ارائه خدمات و محصولات تجهیزات ساختمانی آغاز نموده است.</p>',
      contentEn: '<h2>About Akotav</h2><p>Akotav company started its activity in the field of providing services and products of building equipment in 2011.</p>',
    },
  })

  // Create Contact Us page
  const contactPage = await prisma.page.upsert({
    where: { key: 'contact' },
    update: {},
    create: {
      key: 'contact',
      titleFa: 'تماس با ما',
      titleEn: 'Contact Us',
      contentFa: '<h2>راه‌های ارتباطی</h2><p>برای تماس با ما از راه‌های زیر استفاده کنید:</p><ul><li>تلفن: 021-12345678</li><li>ایمیل: info@akotav.com</li></ul>',
      contentEn: '<h2>Contact Information</h2><p>You can contact us through the following ways:</p><ul><li>Phone: +98 21 12345678</li><li>Email: info@akotav.com</li></ul>',
    },
  })

  console.log('✅ Pages created:', { aboutPage, contactPage })

  // Create sample categories
  const smartHomeCategory = await prisma.category.create({
    data: {
      nameFa: 'خانه هوشمند',
      nameEn: 'Smart Home',
      slug: 'smart-home',
    },
  })

  const securityCategory = await prisma.category.create({
    data: {
      nameFa: 'امنیت و نظارت',
      nameEn: 'Security & Surveillance',
      slug: 'security-surveillance',
    },
  })

  const lightingSubCategory = await prisma.category.create({
    data: {
      nameFa: 'روشنایی هوشمند',
      nameEn: 'Smart Lighting',
      slug: 'smart-lighting',
      parentId: smartHomeCategory.id,
    },
  })

  console.log('✅ Categories created')

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
