export type Language = 'fa' | 'en'

export const translations = {
  fa: {
    // Navigation
    dashboard: 'داشبورد',
    categories: 'دسته‌بندی‌ها',
    products: 'محصولات',
    pages: 'صفحات',
    banners: 'بنرها',
    partners: 'شرکت‌های همکار',
    aboutUs: 'درباره ما',
    contactUs: 'تماس با ما',
    logout: 'خروج',
    
    // Common
    add: 'افزودن',
    edit: 'ویرایش',
    delete: 'حذف',
    save: 'ذخیره',
    cancel: 'انصراف',
    search: 'جستجو',
    actions: 'عملیات',
    loading: 'در حال بارگذاری...',
    noData: 'داده‌ای یافت نشد',
    confirm: 'تأیید',
    
    // Category
    addCategory: 'افزودن دسته‌بندی',
    editCategory: 'ویرایش دسته‌بندی',
    deleteCategory: 'حذف دسته‌بندی',
    categoryNameFa: 'نام دسته‌بندی (فارسی)',
    categoryNameEn: 'نام دسته‌بندی (انگلیسی)',
    parentCategory: 'دسته‌بندی والد',
    noneParent: 'بدون والد',
    deleteCategoryConfirm: 'آیا از حذف این دسته‌بندی مطمئن هستید؟ تمام محصولات مرتبط نیز حذف خواهند شد.',
    
    // Product
    addProduct: 'افزودن محصول',
    editProduct: 'ویرایش محصول',
    deleteProduct: 'حذف محصول',
    productNameFa: 'نام محصول (فارسی)',
    productNameEn: 'نام محصول (انگلیسی)',
    productDescFa: 'توضیحات (فارسی)',
    productDescEn: 'توضیحات (انگلیسی)',
    category: 'دسته‌بندی',
    selectCategory: 'انتخاب دسته‌بندی',
    media: 'تصاویر و ویدیوها',
    uploadMedia: 'آپلود فایل',
    deleteProductConfirm: 'آیا از حذف این محصول مطمئن هستید؟',
    
    // Media
    images: 'تصاویر',
    videos: 'ویدیوها',
    priority: 'اولویت نمایش',
    uploading: 'در حال آپلود...',
    
    // Auth
    login: 'ورود',
    username: 'نام کاربری',
    password: 'رمز عبور',
    loginButton: 'ورود به پنل',
    
    // Banner
    addBanner: 'افزودن بنر',
    editBanner: 'ویرایش بنر',
    deleteBanner: 'حذف بنر',
    bannerTitle: 'عنوان بنر',
    bannerImage: 'تصویر بنر',
    bannerLink: 'لینک بنر',
    moveUp: 'انتقال به بالا',
    moveDown: 'انتقال به پایین',
    deleteBannerConfirm: 'آیا از حذف این بنر مطمئن هستید؟',
    
    // Partner
    addPartner: 'افزودن شرکت همکار',
    editPartner: 'ویرایش شرکت همکار',
    deletePartner: 'حذف شرکت همکار',
    partnerTitle: 'عنوان شرکت',
    partnerLogo: 'لوگوی شرکت',
    partnerWebsite: 'وب‌سایت شرکت',
    deletePartnerConfirm: 'آیا از حذف این شرکت همکار مطمئن هستید؟',
    
    // Messages
    success: 'عملیات با موفقیت انجام شد',
    error: 'خطایی رخ داده است',
    required: 'این فیلد الزامی است',
    
    // Theme
    lightMode: 'حالت روشن',
    darkMode: 'حالت تاریک',
    language: 'زبان',
  },
  en: {
    // Navigation
    dashboard: 'Dashboard',
    categories: 'Categories',
    products: 'Products',
    pages: 'Pages',
    aboutUs: 'About Us',
    contactUs: 'Contact Us',
    logout: 'Logout',
    
    // Common
    add: 'Add',
    edit: 'Edit',
    delete: 'Delete',
    save: 'Save',
    cancel: 'Cancel',
    search: 'Search',
    actions: 'Actions',
    loading: 'Loading...',
    noData: 'No data found',
    confirm: 'Confirm',
    
    // Category
    addCategory: 'Add Category',
    editCategory: 'Edit Category',
    deleteCategory: 'Delete Category',
    categoryNameFa: 'Category Name (Persian)',
    categoryNameEn: 'Category Name (English)',
    parentCategory: 'Parent Category',
    noneParent: 'No Parent',
    deleteCategoryConfirm: 'Are you sure you want to delete this category? All related products will also be deleted.',
    
    // Product
    addProduct: 'Add Product',
    editProduct: 'Edit Product',
    deleteProduct: 'Delete Product',
    productNameFa: 'Product Name (Persian)',
    productNameEn: 'Product Name (English)',
    productDescFa: 'Description (Persian)',
    productDescEn: 'Description (English)',
    category: 'Category',
    selectCategory: 'Select Category',
    media: 'Images & Videos',
    uploadMedia: 'Upload File',
    deleteProductConfirm: 'Are you sure you want to delete this product?',
    
    // Media
    images: 'Images',
    videos: 'Videos',
    priority: 'Display Priority',
    uploading: 'Uploading...',
    
    // Auth
    login: 'Login',
    username: 'Username',
    password: 'Password',
    loginButton: 'Login to Panel',
    
    // Banner
    addBanner: 'Add Banner',
    editBanner: 'Edit Banner',
    deleteBanner: 'Delete Banner',
    bannerTitle: 'Banner Title',
    bannerImage: 'Banner Image',
    bannerLink: 'Banner Link',
    moveUp: 'Move Up',
    moveDown: 'Move Down',
    deleteBannerConfirm: 'Are you sure you want to delete this banner?',
    banners: 'Banners',
    
    // Partner
    addPartner: 'Add Partner',
    editPartner: 'Edit Partner',
    deletePartner: 'Delete Partner',
    partnerTitle: 'Company Title',
    partnerLogo: 'Company Logo',
    partnerWebsite: 'Website URL',
    deletePartnerConfirm: 'Are you sure you want to delete this partner?',
    partners: 'Partners',
    
    // Messages
    success: 'Operation completed successfully',
    error: 'An error occurred',
    required: 'This field is required',
    
    // Theme
    lightMode: 'Light Mode',
    darkMode: 'Dark Mode',
    language: 'Language',
  },
}

export function useTranslation(lang: Language) {
  return translations[lang]
}
