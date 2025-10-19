"use client";
import { useState } from "react";
import { Mail, Lock, Sparkles, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  //   const { signIn, signUp } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    // try {
    //   if (isLogin) {
    //     await signIn(email, password);
    //     window.location.href = "/dashboard";
    //   } else {
    //     await signUp(email, password);
    //     setSuccess("حساب شما با موفقیت ایجاد شد! اکنون می‌توانید وارد شوید.");
    //     setIsLogin(true);
    //   }
    // } catch (err: any) {
    //   setError(err.message || "خطایی رخ داده است. لطفا دوباره تلاش کنید.");
    // } finally {
    //   setLoading(false);
    // }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 flex items-center justify-center px-6 py-12">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {isLogin ? "خوش آمدید" : "ایجاد حساب کاربری"}
          </h1>
          <p className="text-gray-600">
            {isLogin
              ? "برای ادامه وارد حساب خود شوید"
              : "برای شروع حساب کاربری جدید ایجاد کنید"}
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-center gap-3 text-red-700">
              <AlertCircle className="w-5 h-5 flex-shrink-0" />
              <p className="text-sm">{error}</p>
            </div>
          )}

          {success && (
            <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-xl flex items-center gap-3 text-green-700">
              <Sparkles className="w-5 h-5 flex-shrink-0" />
              <p className="text-sm">{success}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                ایمیل
              </label>
              <div className="relative">
                <Mail className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full pr-11 pl-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                  placeholder="example@domain.com"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                رمز عبور
              </label>
              <div className="relative">
                <Lock className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  minLength={6}
                  className="w-full pr-11 pl-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                  placeholder="••••••••"
                />
              </div>
            </div>

            {isLogin && (
              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-600">
                    مرا به خاطر بسپار
                  </span>
                </label>
                <a
                  href="/forgot-password"
                  className="text-sm text-blue-600 hover:text-blue-700"
                >
                  فراموشی رمز عبور؟
                </a>
              </div>
            )}

            <Button
              variant={"primary"}
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl font-medium hover:from-blue-700 hover:to-blue-800 transition-all shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "در حال پردازش..." : isLogin ? "ورود" : "ثبت‌نام"}
            </Button>
          </form>

          {/* <div className="mt-6 text-center">
            <button
              onClick={() => {
                setIsLogin(!isLogin);
                setError("");
                setSuccess("");
              }}
              className="text-sm text-gray-600 hover:text-blue-600 transition-colors"
            >
              {isLogin ? (
                <>
                  حساب کاربری ندارید؟{" "}
                  <span className="font-medium text-blue-600">
                    ثبت‌نام کنید
                  </span>
                </>
              ) : (
                <>
                  قبلا ثبت‌نام کرده‌اید؟{" "}
                  <span className="font-medium text-blue-600">وارد شوید</span>
                </>
              )}
            </button>
          </div> */}
        </div>

        <p className="text-center text-sm text-gray-500 mt-6">
          با ورود یا ثبت‌نام، شما{" "}
          <a href="/terms" className="text-primary hover:underline">
            شرایط استفاده
          </a>{" "}
          و{" "}
          <a href="/privacy" className="text-primary hover:underline">
            حریم خصوصی
          </a>{" "}
          ما را می‌پذیرید.
        </p>
      </div>
    </div>
  );
}
