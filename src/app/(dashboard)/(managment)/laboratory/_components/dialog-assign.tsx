"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  AssignLabRequest,
  LabService,
  useAssignLab,
  useDeleteLab,
} from "@/services/laboratory";
import { Pin, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useLabStore } from "../store";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useGetAllRoom, useGetAllRooms } from "@/services";

export default function AssignDialog() {
  const [isOpen, setIsOpen] = useState(false);

  const { LabDeleteId } = useLabStore();

  const { data } = useGetAllRooms({ returnAll: true });

  const { mutateAsync, isPending } = useAssignLab();

  const schema = LabService.Assign();

  const form = useForm<AssignLabRequest>({
    disabled: isPending,
    reValidateMode: "onBlur",
    resolver: zodResolver(schema),
    defaultValues: {
      id: LabDeleteId,
      roomId: undefined,
    },
  });

  const onSubmit = async (values: AssignLabRequest) => {
    const formValues = {
      ...values,
      id: LabDeleteId,
    };
    const res = await mutateAsync(formValues);
    if (res.isSuccess) {
      setIsOpen(false);
      form.reset();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <div className="cursor-pointer flex items-center gap-1">
          الصاق
          <Pin className="w-4 h-4" />
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[800px] ">
        <DialogHeader>
          <DialogTitle>الصاق گفتگو به اتاق</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="roomId"
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormLabel>اتاق</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      value={field.value || ""}
                    >
                      <SelectTrigger aria-invalid={fieldState.invalid}>
                        <SelectValue placeholder="انتخاب اتاق" />
                      </SelectTrigger>
                      <SelectContent>
                        {data?.map((i) => (
                          <SelectItem key={i.id} value={i.id}>
                            {i.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
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
