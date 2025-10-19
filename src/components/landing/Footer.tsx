export function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-12">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          {/* Brand - Right Side */}
          <div className="text-center md:text-right">
            <h3 className="text-2xl font-bold text-white mb-2">
              مدیریت پشتیبانی هوشمند
            </h3>
            <p className="text-gray-400 text-sm">
              پشتیبانی هوشمند برای آینده‌ای بهتر
            </p>
          </div>

          {/* Links - Left Side */}
          <div className="flex flex-wrap items-center gap-6 text-sm">
            <a
              href="/privacy"
              className="hover:text-white transition-colors duration-200 hover:underline"
            >
              حریم خصوصی
            </a>
            <span className="text-gray-600">•</span>
            <a
              href="/terms"
              className="hover:text-white transition-colors duration-200 hover:underline"
            >
              شرایط استفاده
            </a>
            <span className="text-gray-600">•</span>
            <a
              href="/contact"
              className="hover:text-white transition-colors duration-200 hover:underline"
            >
              تماس با ما
            </a>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-8 border-t border-gray-800 text-center text-sm text-gray-500">
          <p>
            © ۲۰۲۵ مدیریت پشتیبانی هوشمند — تمامی حقوق برای شرکت بنیان آوا محفوظ
            است.
          </p>
        </div>
      </div>
    </footer>
  );
}
