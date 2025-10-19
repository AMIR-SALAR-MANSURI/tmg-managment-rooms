"use client";
import { Sparkles } from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-white via-blue-50 to-blue-100">
      {/* Glow Effect */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[600px] h-[600px] bg-blue-400/20 rounded-full blur-3xl animate-pulse" />
      </div>

      <div className="container mx-auto px-6 py-20 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content - Right Side */}
          <div className="text-right space-y-8">
            <div className="space-y-4">
              <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                مدیریت پشتیبانی هوشمند
              </h1>
              <p className="text-xl lg:text-2xl text-gray-600 leading-relaxed">
                پشتیبانی هوشمند و یکپارچه برای سازمان شما — با کمک هوش مصنوعی،
                فرآیند پاسخ‌گویی، مدیریت درخواست‌ها و گزارش‌دهی را سریع‌تر و
                دقیق‌تر کنید.
              </p>
            </div>

            <button
              onClick={() => (window.location.href = "/dashboard")}
              className="group relative px-8 py-4 bg-primary text-white text-lg font-semibold rounded-2xl overflow-hidden transition-all duration-300 hover:bg-blue-700 hover:shadow-2xl hover:shadow-blue-400/50 hover:-translate-y-1"
            >
              <span className="relative z-10 flex items-center gap-2">
                شروع کنید
                <Sparkles className="w-5 h-5 group-hover:rotate-12 transition-transform" />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-blue-500 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </button>
          </div>

          {/* Visual Element - Left Side */}
          <div className="relative flex items-center justify-center">
            <div className="relative w-full max-w-md">
              {/* Animated Robot/AI Icon */}
              <div className="relative animate-float">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-purple-500 rounded-3xl blur-2xl opacity-30" />
                <div className="relative bg-gradient-to-br from-blue-500 to-blue-600 rounded-3xl p-12 shadow-2xl">
                  <div className="space-y-6">
                    {/* Chat Bubbles */}
                    <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-4 animate-slide-up">
                      <div className="flex items-center gap-3 text-white">
                        <div className="w-10 h-10 bg-white/30 rounded-full flex items-center justify-center">
                          <Sparkles className="w-5 h-5" />
                        </div>
                        <div className="flex-1">
                          <div className="h-3 bg-white/40 rounded-full w-3/4 mb-2" />
                          <div className="h-3 bg-white/30 rounded-full w-1/2" />
                        </div>
                      </div>
                    </div>

                    <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-4 animate-slide-up animation-delay-200">
                      <div className="flex items-center gap-3 text-white">
                        <div className="w-10 h-10 bg-white/30 rounded-full flex items-center justify-center">
                          <Sparkles className="w-5 h-5" />
                        </div>
                        <div className="flex-1">
                          <div className="h-3 bg-white/40 rounded-full w-2/3 mb-2" />
                          <div className="h-3 bg-white/30 rounded-full w-full" />
                        </div>
                      </div>
                    </div>

                    <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-4 animate-slide-up animation-delay-400">
                      <div className="flex items-center gap-3 text-white">
                        <div className="w-10 h-10 bg-white/30 rounded-full flex items-center justify-center">
                          <Sparkles className="w-5 h-5" />
                        </div>
                        <div className="flex-1">
                          <div className="h-3 bg-white/40 rounded-full w-4/5 mb-2" />
                          <div className="h-3 bg-white/30 rounded-full w-3/5" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating Particles */}
              <div className="absolute -top-8 -right-8 w-16 h-16 bg-blue-400 rounded-full blur-xl opacity-60 animate-float animation-delay-300" />
              <div className="absolute -bottom-8 -left-8 w-20 h-20 bg-purple-400 rounded-full blur-xl opacity-60 animate-float animation-delay-500" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
