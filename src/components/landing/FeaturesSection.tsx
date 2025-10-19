"use client";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import Image from "next/image";

const features = [
  {
    image: "/ai-chatbot-responding-to-customer-support-messages.jpg",
    title: "پاسخ‌گویی خودکار",
    description:
      "با هوش مصنوعی پیشرفته، پاسخ‌های سریع و دقیق به درخواست‌های مشتریان ارائه دهید",
  },
  {
    image: "/organized-support-ticket-management-dashboard-with.jpg",
    title: "مدیریت تیکت‌ها",
    description:
      "سازماندهی و پیگیری آسان تمام درخواست‌های پشتیبانی در یک پلتفرم یکپارچه",
  },
  {
    image: "/analytics-dashboard-showing-charts-and-graphs-for-.jpg",
    title: "گزارش‌های هوشمند",
    description: "تحلیل عملکرد تیم و رضایت مشتریان با داشبورد تحلیلی پیشرفته",
  },
  {
    image: "/integration-connections-between-different-software.jpg",
    title: "یکپارچه‌سازی",
    description: "اتصال آسان با ابزارها و سرویس‌های مورد استفاده سازمان شما",
  },
];

export function FeaturesSection() {
  const router = useRouter();
  return (
    <section className="py-20 bg-gradient-to-b from-white to-blue-50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            قابلیت‌های پیشرفته
          </h2>
          <p className="text-xl text-gray-600">
            ابزارهای حرفه‌ای برای مدیریت پشتیبانی سازمان شما
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              onClick={() => router.push("/chat-bot")}
              className="group bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 cursor-pointer border border-gray-100"
            >
              <div className="relative h-48 w-full overflow-hidden">
                <Image
                  src={feature.image || "/placeholder.svg"}
                  alt={feature.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>

              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {feature.title}
                </h3>

                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}

          {/* Add New Feature Card */}
          <div
            onClick={() => (window.location.href = "/add-feature")}
            className="group bg-white/50 rounded-3xl p-8 border-2  border-dashed border-blue-300 hover:border-blue-500 transition-all duration-300 hover:-translate-y-2 cursor-pointer relative overflow-hidden"
          >
            <div className="absolute max-h-72 inset-0 bg-gradient-to-br from-blue-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

            <div className="relative  min-h-56 flex flex-col items-center justify-center h-full text-center">
              <div className="w-16  h-16 bg-gradient-to-br bg-primary rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-90 transition-all duration-300 shadow-lg shadow-blue-400/30">
                <Plus className="w-8 h-8 text-white" />
              </div>

              <h3 className="text-xl font-bold text-gray-700 group-hover:text-blue-600 transition-colors">
                افزودن پشتیبانی جدید
              </h3>

              <p className="text-gray-500 mt-2">سفارشی‌سازی پشتیبان</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
