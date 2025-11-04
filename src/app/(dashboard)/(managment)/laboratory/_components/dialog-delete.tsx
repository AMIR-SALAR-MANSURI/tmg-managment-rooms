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
  AddClientsRequest,
  ClientsService,
  useAddClients,
} from "@/services/clients";
import { useDeleteLab } from "@/services/laboratory";
import { Plus, Trash2 } from "lucide-react";
import { useState } from "react";
import { useLabStore } from "../store";

export default function DeleteDialog() {
  const [isOpen, setIsOpen] = useState(false);

  const { LabDeleteId } = useLabStore();

  const deleteLab = useDeleteLab();

  const onSubmit = async () => {
    const res = await deleteLab.mutateAsync(LabDeleteId);
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
