"use client";
import PageWrapper from "@/layout/dashboard/page-wrapper";
import { useClientStore } from "@/layout/dashboard/store";
import {
  AddRoomRequest,
  RoomService,
  useAddRoom,
  useGetAllRoom,
} from "@/services";
import { User } from "lucide-react";
import RoomForm from "../_components/room-form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";

const Page = () => {
  const { mutateAsync, isPending } = useAddRoom();
  const router = useRouter();

  const schema = RoomService.Room();

  const form = useForm<AddRoomRequest>({
    disabled: isPending,
    reValidateMode: "onBlur",
    resolver: zodResolver(schema),
    defaultValues: {
      clientId: undefined,
      contentPrompt: undefined,
      description: undefined,
      ImageFile: undefined,
      llmModelId: undefined,
      name: undefined,
      systemPrompt: "default",
    },
  });

  const onSubmit = async (values: AddRoomRequest) => {
    const res = await mutateAsync(values);
    if (res.isSuccess) {
      router.push("/room");
      form.reset();
    }
  };
  return (
    <PageWrapper
      breadcrumbItems={[{ href: "/dashboard", label: "اتاق", icon: User }]}
      title="ساخت اتاق"
      description="ساخت اتاق"
      className="*:w-full *:min-h-full"
      action={<></>}
    >
      <>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <RoomForm form={form} />
            <div className="flex justify-between gap-2 mt-4">
              <Button
                type="button"
                className="w-full"
                variant="ghost"
                onClick={() => router.push("/room")}
              >
                لغو
              </Button>
              <Button type="submit" loading={isPending} className="w-full">
                ذخیره
              </Button>
            </div>
          </form>
        </Form>
      </>
    </PageWrapper>
  );
};

export default Page;
