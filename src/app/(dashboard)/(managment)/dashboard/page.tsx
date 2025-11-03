"use client";

import PageWrapper from "@/layout/dashboard/page-wrapper";
import {
  LayoutDashboard,
  Users,
  FileText,
  Settings,
  Building,
} from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { CardPos } from "iconsax-reactjs";

export default function Page() {
  const router = useRouter();

  const cards = [
    {
      title: "کلاینت",
      icon: Users,
      href: "/client",
      description: "مشاهده و مدیریت کلاینت",
    },
    {
      title: "اتاق",
      icon: Building,
      href: "/room",
      description: "مشاهده و مدیریت اتاق ها",
    },
    {
      title: "آزمایشگاه",
      icon: Settings,
      href: "/laboratory",
      description: "پیکربندی و مدیریت تنظیمات سیستم",
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
                className="
                  cursor-pointer backdrop-blur-xl bg-white/60 dark:bg-black/30
                  border border-white/50 shadow-[0_8px_18px_rgba(0,0,0,0.1)]
                  hover:shadow-[0_10px_30px_rgba(0,0,0,0.2)]
                  transition-all duration-300 rounded-2xl
                "
              >
                <CardHeader className="flex flex-col items-center gap-4 pt-8">
                  <div
                    className="
                      p-4 rounded-full shadow-lg backdrop-blur-md
                      bg-gradient-to-br from-blue-500/20 via-blue-400/10 to-transparent
                      border border-blue-300/40 dark:border-blue-700/40
                      group-hover:scale-110 transition-all
                    "
                  >
                    <Icon className="w-10 h-10 text-blue-600 dark:text-blue-400" />
                  </div>
                  <CardTitle className="text-xl font-bold text-gray-800 dark:text-white">
                    {item.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="pb-8 text-center text-gray-600 dark:text-gray-300 text-sm">
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
