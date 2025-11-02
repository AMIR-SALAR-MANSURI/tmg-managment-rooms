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
import { useState } from "react";
import { useLabStore } from "../store";
import {
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

export default function AssignDialog() {
  const [isOpen, setIsOpen] = useState(false);

  const { LabDeleteId } = useLabStore();

  const deleteLab = useAssignLab();

  const schema = LabService.Assign();

  const form = useForm<AssignLabRequest>({
    // disabled: isPending,
    reValidateMode: "onBlur",
    resolver: zodResolver(schema),
    defaultValues: {
      id: undefined,
      roomId: undefined,
    },
  });

  const onSubmit = async () => {
    // const res = await deleteLab.mutateAsync(LabDeleteId);
    // if (res.isSuccess) {
    //   setIsOpen(false);
    // }
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
          <DialogTitle>حذف سوال</DialogTitle>
        </DialogHeader>
        <div>آیا مطمئن هستید می‌خواهید این آیتم را حذف کنید؟</div>
        <div className="flex justify-end gap-2">
          <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="roomId"
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormLabel>وضعیت</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={(val) => field.onChange(val === "true")}
                      value={String(field.value)}
                      defaultValue="false"
                    >
                      <SelectTrigger aria-invalid={fieldState.invalid}>
                        <SelectValue placeholder="انتخاب وضعیت" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="false">فعال</SelectItem>
                        <SelectItem value="true">غیرفعال</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />{" "}
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
                // loading={isPending}
                className="dialog-button"
              >
                ذخیره
              </Button>
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
