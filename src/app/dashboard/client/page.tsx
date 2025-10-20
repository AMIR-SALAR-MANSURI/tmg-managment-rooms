import PageWrapper from "@/layout/dashboard/page-wrapper";
import { LayoutDashboard, User } from "lucide-react";
import React from "react";

const page = () => {
  return (
    <PageWrapper
      breadcrumbItems={[
        { href: "/dashboard", label: "داشبورد", icon: LayoutDashboard },
        { href: "/dashboard/client", label: "کاربران", icon: User },
      ]}
      title="مدیریت کاربران"
      description="مدیریت کاربران"
      className="*:w-full *:min-h-full"
    >
      fkjsdkfjkshfk
    </PageWrapper>
  );
};

export default page;
