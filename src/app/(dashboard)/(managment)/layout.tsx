import React from "react";
import DashboardLayout from "@/layout/dashboard";
import { NuqsAdapter } from "nuqs/adapters/next/app";

interface LayoutProps {
  children: React.ReactNode;
}
export default function Layout({ children }: LayoutProps) {
  return (
    <NuqsAdapter>
      <DashboardLayout>{children}</DashboardLayout>
    </NuqsAdapter>
  );
}
