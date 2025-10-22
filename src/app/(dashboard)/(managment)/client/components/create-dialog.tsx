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
import { Plus } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import {
  AddClientsRequest,
  ClientsService,
  useAddClients,
} from "@/services/clients";
import { zodResolver } from "@hookform/resolvers/zod";
import ClientForm from "./client-form";

export default function CreateDialog() {
  const [isOpen, setIsOpen] = useState(false);

  const { mutateAsync, isPending } = useAddClients();

  const schema = ClientsService.clients();

  const form = useForm<AddClientsRequest>({
    disabled: isPending,
    reValidateMode: "onBlur",
    resolver: zodResolver(schema),
    defaultValues: {
      name: undefined,
      description: undefined,
      isDisabled: undefined,
      userIds: undefined,
    },
  });

  const onSubmit = async (values: AddClientsRequest) => {
    const res = await mutateAsync(values);
    if (res.isSuccess) {
      setIsOpen(false);
      form.reset();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button>
          ایجاد کلاینت
          <Plus />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[800px]">
        <DialogHeader>
          <DialogTitle>ایجاد کلاینت</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
            <ClientForm form={form} />
            <div className="flex justify-end gap-2">
              <Button
                type="button"
                className="dialog-button"
                variant="ghost"
                onClick={() => setIsOpen(false)}
              >
                لغو
              </Button>
              <Button
                type="submit"
                loading={isPending}
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
