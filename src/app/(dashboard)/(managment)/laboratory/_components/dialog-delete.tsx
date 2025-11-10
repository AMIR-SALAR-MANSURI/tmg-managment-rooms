"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useDeleteLab } from "@/services/laboratory";
import { Trash2 } from "lucide-react";
import { useEffect, useState } from "react";

interface Props {
  id?: string | undefined;
}

export default function DeleteDialog({ id }: Props) {
  const [isOpen, setIsOpen] = useState(false);

  const deleteLab = useDeleteLab();

  useEffect(() => {
    console.log(isOpen ? id : "");
  }, [id, isOpen]);

  const onSubmit = async () => {
    const res = await deleteLab.mutateAsync(isOpen ? (id as string) : "");
    if (res.isSuccess) {
      setIsOpen(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <div
          className="cursor-pointer text-destructive flex items-center gap-1 w-full"
          onClick={(e) => e.stopPropagation()}
        >
          حذف
          <Trash2 className="w-4 h-4 text-destructive" />
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[800px] border-destructive-500">
        <DialogHeader className="border-destructive-500">
          <DialogTitle>حذف سوال</DialogTitle>
        </DialogHeader>
        <div>آیا مطمئن هستید می‌خواهید این آیتم را حذف کنید؟</div>
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
            loading={deleteLab.isPending}
            className="dialog-button"
            onClick={onSubmit}
            variant={"destructive"}
          >
            حذف
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
