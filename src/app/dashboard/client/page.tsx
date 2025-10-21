"use client";
import { Button } from "@/components/ui/button";
import DataTable from "@/components/ui/data-table";
import PageWrapper from "@/layout/dashboard/page-wrapper";
import { Bot, LayoutDashboard, Plus, Settings, User } from "lucide-react";
import React from "react";
import { columns } from "./components/client-column";
import CreateDialog from "./components/create-dialog";

const page = () => {
  return (
    <PageWrapper
      breadcrumbItems={[
        { href: "/dashboard", label: "داشبورد", icon: LayoutDashboard },
        { href: "/dashboard/client", label: "کلاینت", icon: User },
      ]}
      title="مدیریت کلاینت"
      description="مدیریت کلاینت"
      className="*:w-full *:min-h-full"
      action={
        <>
          <CreateDialog />
        </>
      }
    >
      <>
        <DataTable columns={columns()} data={[]} />
      </>
    </PageWrapper>
  );
};

export default page;
