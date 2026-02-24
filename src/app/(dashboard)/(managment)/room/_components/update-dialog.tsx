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
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { RoomService, useEditRoomRag, useGetRoomRag } from "@/services";
import { EditRoomRagRequest } from "@/services/room/room.interface";
import { zodResolver } from "@hookform/resolvers/zod";
import { Edit } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

interface Props {
  id: string;
  promptId: string;
}

export default function UpdateDialog({ id, promptId }: Props) {
  const [open, setOpen] = useState(false);

  const { data, isPending } = useGetRoomRag(
    open ? { id: id, promptId: promptId } : undefined,
  );

  const update = useEditRoomRag();

  const schema = RoomService.RoomRagEdit();

  const form = useForm<EditRoomRagRequest>({
    disabled: isPending,
    reValidateMode: "onBlur",
    resolver: zodResolver(schema),
    defaultValues: data || {
      systemPrompt: undefined,
      smallTalkPrompt: undefined,
      isActive: undefined,
      temperature: undefined,
    },
  });
  useEffect(() => {
    if (data) {
      form.reset(data);
    }
  }, [data, form, id, open]);

  const onSubmit = async (values: EditRoomRagRequest) => {
    const formValues = {
      ...values,
      id,
      promptId,
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
          <DialogTitle>ویرایش دانش</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 space-y-2">
              <FormField
                control={form.control}
                name="systemPrompt"
                render={({ field }) => (
                  <FormItem className="col-span-2">
                    <FormLabel>دانش</FormLabel>
                    <FormControl>
                      <Textarea
                        rows={10}
                        className="max-h-[240px] overflow-y-auto"
                        placeholder="دانش"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="relative col-span-full">
                <FormField
                  control={form.control}
                  name="smallTalkPrompt"
                  render={({ field }) => (
                    <FormItem className="col-span-full">
                      <FormLabel>SystemPrompt</FormLabel>
                      <FormControl>
                        <Textarea
                          rows={10}
                          className="max-h-[240px] overflow-y-auto"
                          placeholder="SystemPrompt"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="isActive"
                render={({ field, fieldState }) => (
                  <FormItem className="col-span-full">
                    <FormLabel>فعال/غیرفعال</FormLabel>
                    <FormControl>
                      <Select
                        {...field}
                        value={field.value === true ? "true" : "false"}
                        onValueChange={(e) =>
                          field.onChange(e === "true" ? true : false)
                        }
                      >
                        <SelectTrigger aria-invalid={fieldState.invalid}>
                          <SelectValue placeholder="انتخاب کنید" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectItem value={"true"}>فعال</SelectItem>
                            <SelectItem value={"false"}>غیرفعال</SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
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
