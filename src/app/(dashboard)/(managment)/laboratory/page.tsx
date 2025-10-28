"use client";

import PageWrapper from "@/layout/dashboard/page-wrapper";
import { LayoutDashboard } from "lucide-react";
import FormLab from "./_components/form-lab";
import { ItemList } from "./_components/item-list";

export default function Page() {
  return (
    <PageWrapper
      breadcrumbItems={[
        { href: "/dashboard", label: "آزمایشگاه", icon: LayoutDashboard },
      ]}
      title="آزمایشگاه"
      className="*:w-full *:min-h-full"
    >
      <div className="flex gap-6 h-full">
        <aside className="w-80 flex-shrink-0 space-y-6">
          <ItemList title="تاریخچه" />
        </aside>
        <main className="flex-1 min-w-0 space-y-6 h-[650px] overflow-y-auto p-1">
          <FormLab />
        </main>
      </div>
    </PageWrapper>
  );
}
