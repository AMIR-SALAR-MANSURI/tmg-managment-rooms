import PageWrapper from "@/layout/dashboard/page-wrapper";
import { LayoutDashboard } from "lucide-react";

export default function Page() {
  return (
    <PageWrapper
      breadcrumbItems={[
        { href: "/dashboard", label: "داشبورد", icon: LayoutDashboard },
      ]}
      title="داشبورد"
      description="لیست اتاق های ساخته شده"
      className="*:w-full *:min-h-full"
    >
      fkjsdkfjkshfk
    </PageWrapper>
  );
}
