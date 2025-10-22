"use client";
import DataTable from "@/components/ui/data-table";
import PageWrapper from "@/layout/dashboard/page-wrapper";
import { ClientsList, useGetAllClients } from "@/services/clients";
import { LayoutDashboard, User } from "lucide-react";
import { columns } from "./components/client-column";
import CreateDialog from "./components/create-dialog";

const page = () => {
  const { data, isFetching } = useGetAllClients({ returnAll: false });
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
        <DataTable<ClientsList>
          loading={isFetching}
          columns={columns()}
          data={data?.data}
          pageCount={data?.pagingMetaData.totalPages}
        />
      </>
    </PageWrapper>
  );
};

export default page;
