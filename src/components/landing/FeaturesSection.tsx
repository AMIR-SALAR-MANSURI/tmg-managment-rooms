"use client";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { GetAllRoomResponse } from "@/services";
import { Button } from "../ui/button";

interface Props {
  data: GetAllRoomResponse[] | undefined;
}

const features = [
  {
    image: "/file.svg",
    title: "پاسخ‌گویی خودکار",
    description:
      "با هوش مصنوعی پیشرفته، پاسخ‌های سریع و دقیق به درخواست‌های مشتریان ارائه دهید",
  },
  {
    image: "/file.svg",
    title: "مدیریت تیکت‌ها",
    description:
      "سازماندهی و پیگیری آسان تمام درخواست‌های پشتیبانی در یک پلتفرم یکپارچه",
  },
  {
    image: "/file.svg",
    title: "گزارش‌های هوشمند",
    description: "تحلیل عملکرد تیم و رضایت مشتریان با داشبورد تحلیلی پیشرفته",
  },
  {
    image: "/file.svg",
    title: "یکپارچه‌سازی",
    description: "اتصال آسان با ابزارها و سرویس‌های مورد استفاده سازمان شما",
  },
];

export function FeaturesSection({ data }: Props) {
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
          {/* {data?.map((feature, index) => (
            <div
              key={index}
              className="relative group bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-100"
            >
              <Button
                onClick={(e) => {
                  e.stopPropagation();
                  router.push(`/edit-feature/${feature.id}`);
                }}
                className="absolute top-3 left-3 z-10 bg-blue-500 hover:bg-blue-600 text-white rounded-full p-2 transition-colors duration-200 shadow-md"
                title="ویرایش"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="w-4 h-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M16.862 4.487a2.25 2.25 0 113.182 3.182L7.5 20.213l-4 1 1-4 12.362-12.726z"
                  />
                </svg>
              </Button>

              {/* محتوای کارت */}
          {/* <div
                onClick={() => router.push("/chat-bot")}
                className="cursor-pointer"
              >
                <div className="relative h-48 w-full overflow-hidden">
                  <Image
                    src={feature.imageBase64 || "/placeholder.svg"}
                    alt={feature.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {feature.name}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            </div> */}
          {/* ))} */}

          {/* کارت افزودن ویژگی جدید */}
          <div
            onClick={() => (window.location.href = "/add-feature")}
            className="group bg-white/50 rounded-3xl p-8 border-2 border-dashed border-blue-300 hover:border-blue-500 transition-all duration-300 hover:-translate-y-2 cursor-pointer relative overflow-hidden"
          >
            <div className="absolute max-h-72 inset-0 bg-gradient-to-br from-blue-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

            <div className="relative min-h-56 flex flex-col items-center justify-center h-full text-center">
              <div className="w-16 h-16 bg-gradient-to-br bg-primary rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-90 transition-all duration-300 shadow-lg shadow-blue-400/30">
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
