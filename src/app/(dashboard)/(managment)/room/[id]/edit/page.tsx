"use client";
import PageWrapper from "@/layout/dashboard/page-wrapper";
import { useClientStore } from "@/layout/dashboard/store";
import {
  AddRoomRequest,
  EditRoomRequest,
  RoomService,
  useAddRoom,
  useGetAllRoom,
  useGetRoom,
} from "@/services";
import { User } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useParams, useRouter } from "next/navigation";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import RoomForm from "../../_components/room-form";
import { useEffect } from "react";

const Page = () => {
  const { id } = useParams();
  const { mutateAsync, isPending } = useAddRoom();
  const router = useRouter();

  const schema = RoomService.Room();

  const { data, isPending: get } = useGetRoom(id as string);

  const form = useForm<EditRoomRequest>({
    disabled: isPending || get,
    reValidateMode: "onBlur",
    resolver: zodResolver(schema),
    defaultValues: data || {
      clientId: undefined,
      contentPrompt: undefined,
      description: undefined,
      ImageFile: undefined,
      llmModelId: undefined,
      name: undefined,
      systemPrompt: undefined,
    },
  });

  useEffect(() => {
    console.log(data?.imageFile?.imageBase64);

    form.reset({
      clientId: data?.clientId,
      contentPrompt: data?.contentPrompt,
      description: data?.description,
      llmModelId: data?.llmModelId,
      name: data?.name,
      systemPrompt: data?.systemPrompt,
      ImageFile:
        data?.imageFile &&
        `data:${data?.imageFile.imageContentType};base64,${data?.imageFile.imageBase64}`,
    });
  }, [form, data]);

  const onSubmit = async (values: EditRoomRequest) => {
    const formValues = {
      ...values,
      id,
    };
    const res = await mutateAsync(formValues);
    if (res.isSuccess) {
      router.push("/room");
      form.reset();
    }
  };
  return (
    <PageWrapper
      breadcrumbItems={[{ href: "/dashboard", label: "ویرایش", icon: User }]}
      title="ویرایش اتاق"
      description="ویرایش اتاق"
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
                // onClick={() => setIsOpen(false)}
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
