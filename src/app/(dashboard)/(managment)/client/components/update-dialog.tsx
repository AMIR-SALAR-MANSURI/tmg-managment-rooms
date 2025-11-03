"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Form } from "@/components/ui/form";
import {
  ClientsService,
  EditClientsRequest,
  useEditClients,
  useGetClients,
} from "@/services/clients";
import { zodResolver } from "@hookform/resolvers/zod";
import { Edit } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import ClientForm from "./client-form";

interface Props {
  id: string;
}

export default function UpdateDialog({ id }: Props) {
  const [open, setOpen] = useState(false);

  const { data, isPending } = useGetClients(open ? id : "");

  const update = useEditClients();

  const schema = ClientsService.clients();

  const form = useForm<EditClientsRequest>({
    disabled: isPending,
    reValidateMode: "onBlur",
    resolver: zodResolver(schema),
    defaultValues: data || {
      name: undefined,
      userIds: undefined,
      isDisabled: undefined,
      description: undefined,
    },
  });
  useEffect(() => {
    if (data) {
      form.reset(data);
    }
  }, [data, form, id, open]);

  const onSubmit = async (values: EditClientsRequest) => {
    const formValues = {
      ...values,
      id,
    };
    const res = await update.mutateAsync(formValues);
    if (res.isSuccess) {
      setOpen(false);
      form.reset();
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button model={"outline"} iconLeft={Edit}>
          ویرایش
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[800px]">
        <DialogHeader>
          <DialogTitle>ویرایش کلاینت</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
            <ClientForm form={form} />

            <div className="flex justify-end gap-2">
              <Button
                type="button"
                className="dialog-button"
                variant="ghost"
                onClick={() => setOpen(false)}
              >
                لغو
              </Button>
              <Button
                type="submit"
                loading={update.isPending}
                className="dialog-button"
              >
                ذخیره
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
