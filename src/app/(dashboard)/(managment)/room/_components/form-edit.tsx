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
      clientId: "",
      contentPrompt: "",
      description: "",
      ImageFile: undefined,
      llmModelId: "",
      name: "",
      systemPrompt: "default",
    },
  });

  useEffect(() => {
    if (data) {
      form.reset({
        clientId: data?.clientId,
        contentPrompt: data?.contentPrompt,
        description: data?.description,
        llmModelId: data?.llmModelId,
        name: data?.name,
        systemPrompt: data?.systemPrompt,
        ImageFile:
          data?.imageFile &&
          `data:${data?.imageFile.imageContentType};base64,${data.imageFile.imageBase64}`,
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
  );
};

export default FormEdit;
