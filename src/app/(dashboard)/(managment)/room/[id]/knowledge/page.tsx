"use client";

import DataTable from "@/components/ui/data-table";
import { Form } from "@/components/ui/form";
import { useGetUid } from "@/hooks/use-get-uid";
import PageWrapper from "@/layout/dashboard/page-wrapper";
import {
  RagHistoryList,
  RoomService,
  useAddRoomRag,
  useGetAllRoomRag,
  useGetRoomRag,
} from "@/services";
import { AddRoomRagRequest } from "@/services/room/room.interface";
import { zodResolver } from "@hookform/resolvers/zod";
import { User } from "lucide-react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import FormRag from "../../_components/form-rag";
import { columns } from "../../_components/rag-columns";
import { useState } from "react";

const Page = () => {
  const { id } = useGetUid();
  const { data, isFetching } = useGetAllRoomRag({ id: id });

  const { mutateAsync, isPending } = useAddRoomRag();

  const schema = RoomService.RoomRag();

  const form = useForm<AddRoomRagRequest>({
    resolver: zodResolver(schema),
    disabled: isPending,
    defaultValues: {
      File: undefined,
      Knowledge: undefined,
      RAGParameters: undefined,
      SmallTalkPrompt: undefined,
      SystemPrompt: undefined,
    },
  });

  const router = useRouter();

  const onSubmit = async (values: AddRoomRagRequest) => {
    const formValues = {
      ...values,
      id: id as string,
    };
    const res = await mutateAsync(formValues);
    if (res.isSuccess) {
      router.push("/room");
      form.reset();
    }
  };

  const onSet = (row: RagHistoryList) => {
    form.setValue("SystemPrompt", row.systemPrompt);
    form.setValue("SmallTalkPrompt", row.smallTalkPrompt);
    form.setValue("Knowledge", row.contentPrompt);
  };

  return (
    <PageWrapper
      breadcrumbItems={[{ href: "/dashboard", label: "دانش", icon: User }]}
      title="دانش"
      description="اضافه شدن دانش به مدل به منظور پاسخ مناسب به سوال های پرسیده شده"
      className="*:w-full *:min-h-full"
      action={<></>}
    >
      <div className="flex flex-col gap-4 w-full min-w-0">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormRag form={form} isPending={isPending} />
          </form>
        </Form>

        <div className="w-full min-w-0 overflow-x-auto">
          <DataTable<RagHistoryList>
            loading={isFetching}
            columns={columns(onSet)}
            data={data?.data}
            pageCount={data?.pagingMetaData?.totalPages}
          />
        </div>
      </div>
    </PageWrapper>
  );
};

export default Page;
