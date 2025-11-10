"use client";

import { FeaturesSection } from "@/components/landing/FeaturesSection";
import { Button } from "@/components/ui/button";
import PageWrapper from "@/layout/dashboard/page-wrapper";
import { useClientStore } from "@/layout/dashboard/store";
import { useGetAllRoom } from "@/services";
import { LayoutDashboard, Plus, User } from "lucide-react";
import { useRouter } from "next/navigation";
import { Skeleton } from "@/components/ui/skeleton"; // ✅ Assuming you have this Shadcn Skeleton

const Page = () => {
  const { selectedVersion } = useClientStore();
  const { data, hasNextPage, isFetchingNextPage, fetchNextPage, isLoading } =
    useGetAllRoom({
      clientId: selectedVersion ? selectedVersion : undefined,
      // pageNumber: 0,
      // pageSize: 200,
    });

  const allFeatures = data?.pages.flatMap((p: any) => p.data) || [];
  const router = useRouter();

  return (
    <PageWrapper
      breadcrumbItems={[{ href: "/dashboard", label: "اتاق", icon: User }]}
      title="مدیریت اتاق"
      description="مدیریت اتاق"
      className="*:w-full *:min-h-full"
      action={<></>}
    >
      <main className="min-h-screen w-full">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {isLoading
              ? Array.from({ length: 4 }).map((_, i) => (
                  <div
                    key={i}
                    className="bg-white/50 rounded-3xl p-8 border shadow-sm"
                  >
                    <Skeleton className="h-40 w-full rounded-2xl mb-4" />
                    <Skeleton className="h-6 w-3/4 mb-2" />
                    <Skeleton className="h-4 w-1/2" />
                  </div>
                ))
              : allFeatures.map((feature: any, index: number) => (
                  <div key={feature.id || index}>
                    <FeaturesSection data={[feature]} />
                  </div>
                ))}

            <div
              onClick={() => router.push("/room/create")}
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

          <div className="col-span-full flex items-center justify-center py-6">
            <Button
              variant="primary"
              model="outline"
              onClick={() => fetchNextPage()}
              disabled={!hasNextPage || isFetchingNextPage}
              loading={isFetchingNextPage}
            >
              بیشتر
            </Button>
          </div>
        </div>
      </main>
    </PageWrapper>
  );
};

export default Page;
