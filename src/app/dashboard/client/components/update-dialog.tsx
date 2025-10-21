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
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";

export default function UpdateDialog() {
  const [isOpen, setIsOpen] = useState(false);

  const form = useForm<{}>({
    // disabled: isPending,
    reValidateMode: "onBlur",
    // resolver: zodResolver(),
    defaultValues: {
      name: undefined,
      parentUid: undefined,
      slug: undefined,
      topic: undefined,
    },
  });

  const onSubmit = async (values: "") => {
    // const res = await mutateAsync(values);
    // if (res.success) {
    //   setIsOpen(false);
    //   form.reset();
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button>ویرایش کلاینت</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[800px]">
        <DialogHeader>
          <DialogTitle>ویرایش کلاینت</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form className="space-y-6">
            {/* <CategoryFieldsForm form={form} /> */}
            <div className="flex justify-end gap-2">
              <Button
                type="button"
                className="dialog-button"
                variant="ghost"
                onClick={() => setIsOpen(false)}
              >
                لغو
              </Button>
              <Button type="submit" className="dialog-button">
                ذخیره
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
