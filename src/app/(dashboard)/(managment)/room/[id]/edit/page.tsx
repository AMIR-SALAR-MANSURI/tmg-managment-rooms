"use client";

import PageWrapper from "@/layout/dashboard/page-wrapper";
import { User } from "lucide-react";
import FormEdit from "../../_components/form-edit";
import { useGetAllClients } from "@/services/clients";
import { useGetAllLlm } from "@/services/llmModels";

const Page = () => {
  const { data, isLoading } = useGetAllLlm();
  const { data: client, isLoading: llmLoading } = useGetAllClients({
    returnAll: true,
  });

  return (
    <PageWrapper
      breadcrumbItems={[{ href: "/dashboard", label: "ویرایش", icon: User }]}
      title="ویرایش اتاق"
      description="ویرایش اتاق"
      className="*:w-full *:min-h-full"
      action={<></>}
    >
      {!isLoading && !llmLoading && <FormEdit />}
    </PageWrapper>
  );
};

export default Page;
