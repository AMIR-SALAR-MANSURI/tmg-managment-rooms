import { Button } from "@/components/ui/button";
import {
  DataTableDateCell,
  DataTableIndexCell,
} from "@/components/ui/data-table";
import { Tag } from "@/components/ui/tag";
import { ClientsList } from "@/services/clients";
import { CellContext, ColumnDef } from "@tanstack/react-table";
import { Ban } from "lucide-react";

export const columns = (): ColumnDef<ClientsList>[] => [
  {
    accessorKey: "row",
    header: "#",
    size: 10,
    cell: DataTableIndexCell,
  },

  {
    accessorKey: "name",
    header: "نام",
    meta: {
      isWordWrapped: false,
    },
  },
  {
    accessorKey: "description",
    header: "توضیحات",
    meta: {
      isWordWrapped: false,
    },
  },

  {
    accessorKey: "isDisabled",
    header: "وضعیت",
    meta: {
      isWordWrapped: false,
    },
    cell: ({ row }) => {
      const isBanned = row.original.isDisabled === true;
      const variant = isBanned ? "destructive" : "success";
      const label = isBanned ? "بن شده" : "فعال";
      return <Tag variant={variant}>{label}</Tag>;
    },
  },

  {
    id: "actions",
    header: "عملیات",
    cell: Actions,
  },
];

const Actions = ({ row: { original } }: CellContext<ClientsList, unknown>) => {
  return (
    <div className="flex items-center justify-center space-x-2 rtl:space-x-reverse">
      {/* اینجا می‌توانید دکمه‌های بن/رفع بن، ویرایش، حذف و غیره را اضافه کنید */}
      {/* مثال: <ToggleBanDialog uid={original.uid} isBanned={original.isBanned === "true"} /> */}
      <Button variant="primary" model="outline" iconLeft={Ban}>
        مسدود
      </Button>
      {/* <UpdateDialog uid={original.uid as string} /> */}
    </div>
  );
};
