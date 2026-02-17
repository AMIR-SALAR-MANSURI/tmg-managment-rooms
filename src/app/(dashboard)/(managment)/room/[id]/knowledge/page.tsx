"use client";

import PageWrapper from "@/layout/dashboard/page-wrapper";
import { User } from "lucide-react";
import FormEdit from "../../_components/form-edit";
import { useGetAllClients } from "@/services/clients";
import { useGetAllLlm } from "@/services/llmModels";
import FormRag from "../../_components/form-rag";

const Page = () => {
  return (
    <PageWrapper
      breadcrumbItems={[{ href: "/dashboard", label: "دانش", icon: User }]}
      title="دانش"
      description="اضافه شدن دانش به مدل به منظور پاسخ مناسب به سوال های پرسیده شده"
      className="*:w-full *:min-h-full"
      action={<></>}
    >
      <>
        <FormRag />
      </>
    </PageWrapper>
  );
};

export default Page;
