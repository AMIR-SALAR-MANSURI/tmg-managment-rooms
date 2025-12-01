"use client";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import PageWrapper from "@/layout/dashboard/page-wrapper";
import {
  EditRoomRequest,
  RoomService,
  useEditRoom,
  useGetRoom,
} from "@/services";
import { zodResolver } from "@hookform/resolvers/zod";
import { User } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { string } from "zod";
import RoomForm from "./room-form";

const FormEdit = () => {
  const { id } = useParams();
  const { mutateAsync, isPending } = useEditRoom();
  const router = useRouter();

  const schema = RoomService.Room();

  const { data, isPending: get } = useGetRoom(id as string);

  const form = useForm<EditRoomRequest>({
    resolver: zodResolver(schema),
    disabled: isPending || get,
    defaultValues: {
      clientId: undefined,
      contentPrompt: "",
      description: "",
      ImageFile: undefined,
      llmModelId: undefined,
      name: "",
      systemPrompt: "default",
    },
  });

  const base64ToFile = (
    base64: string,
    contentType: string,
    fileName: string
  ) => {
    const byteCharacters = atob(base64);
    const byteNumbers = new Array(byteCharacters.length);

    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }

    const byteArray = new Uint8Array(byteNumbers);
    return new File([byteArray], fileName, { type: contentType });
  };

  useEffect(() => {
    if (data) {
      form.reset({
        clientId: data?.clientId,
        contentPrompt: data?.contentPrompt,
        description: data?.description,
        llmModelId: data?.llmModelId,
        name: data?.name,
        systemPrompt: data?.systemPrompt,
        ImageFile: data.imageFile
          ? base64ToFile(
              data.imageFile.imageBase64,
              data.imageFile.imageContentType,
              "test"
            )
          : null,
      });
    }
  }, [form, data, id]);

  const onSubmit = async (values: EditRoomRequest) => {
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
  return (
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
  );
};

export default FormEdit;
