"use client";

import PageWrapper from "@/layout/dashboard/page-wrapper";
import { LayoutDashboard } from "lucide-react";

export default function Page() {
  return (
    <PageWrapper
      breadcrumbItems={[
        { href: "/dashboard", label: "داشبورد", icon: LayoutDashboard },
      ]}
      title="داشبورد"
      className="*:w-full *:min-h-full"
    >
      <></>
    </PageWrapper>
  );
}
