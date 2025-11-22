"use client";

import { LayoutDashboard, Users, Settings, Building } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import PageWrapper from "@/layout/dashboard/page-wrapper";

export default function Page() {
  const router = useRouter();

  const cards = [
    {
      title: "کلاینت",
      icon: Users,
      href: "/client",
      description: "مشاهده و مدیریت کلاینت",
      gradient: "from-blue-500 via-blue-400 to-cyan-400",
      iconBg: "from-blue-500/30 via-blue-400/20 to-cyan-400/10",
      iconColor: "text-blue-600 dark:text-blue-400",
      borderColor: "border-blue-400/50 dark:border-blue-500/50",
      shadowColor: "hover:shadow-blue-500/20",
    },
    {
      title: "اتاق",
      icon: Building,
      href: "/room",
      description: "مشاهده و مدیریت اتاق ها",
      gradient: "from-purple-500 via-purple-400 to-pink-400",
      iconBg: "from-purple-500/30 via-purple-400/20 to-pink-400/10",
      iconColor: "text-purple-600 dark:text-purple-400",
      borderColor: "border-purple-400/50 dark:border-purple-500/50",
      shadowColor: "hover:shadow-purple-500/20",
    },
    {
      title: "آزمایشگاه",
      icon: Settings,
      href: "/laboratory",
      description: "پیکربندی و مدیریت تنظیمات سیستم",
      gradient: "from-orange-500 via-orange-400 to-amber-400",
      iconBg: "from-orange-500/30 via-orange-400/20 to-amber-400/10",
      iconColor: "text-orange-600 dark:text-orange-400",
      borderColor: "border-orange-400/50 dark:border-orange-500/50",
      shadowColor: "hover:shadow-orange-500/20",
    },
  ];

  return (
    <PageWrapper
      breadcrumbItems={[
        { href: "/dashboard", label: "داشبورد", icon: LayoutDashboard },
      ]}
      title="داشبورد"
      className="*:w-full *:min-h-full"
    >
      <div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 py-10"
        dir="rtl"
      >
        {cards.map((item, idx) => {
          const Icon = item.icon;
          return (
            <motion.div
              className="h-52"
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
            >
              <Card
                onClick={() => router.push(item.href)}
                className={`
                  cursor-pointer backdrop-blur-xl bg-white/70 dark:bg-black/40
                  border ${item.borderColor} shadow-[0_8px_18px_rgba(0,0,0,0.1)]
                  hover:shadow-[0_12px_35px_rgba(0,0,0,0.15)] ${item.shadowColor}
                  transition-all duration-300 rounded-2xl overflow-hidden
                  relative group
                `}
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}
                />

                <CardHeader className="flex flex-col items-center gap-4 pt-8 relative z-10">
                  <div
                    className={`
                      p-4 rounded-full shadow-lg backdrop-blur-md
                      bg-gradient-to-br ${item.iconBg}
                      border-2 ${item.borderColor}
                      group-hover:scale-110 group-hover:rotate-6 transition-all duration-300
                    `}
                  >
                    <Icon
                      className={`w-10 h-10 ${item.iconColor} drop-shadow-lg`}
                    />
                  </div>
                  <CardTitle className="text-xl font-bold text-gray-800 dark:text-white">
                    {item.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="pb-8 text-center text-gray-600 dark:text-gray-300 text-sm relative z-10">
                  {item.description}
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>
    </PageWrapper>
  );
}
