import { Button } from "@/components/ui/button";
import {
  DataTableDateCell,
  DataTableIndexCell,
} from "@/components/ui/data-table";
import { Tag } from "@/components/ui/tag";
import { ClientsList } from "@/services/clients";
import { CellContext, ColumnDef } from "@tanstack/react-table";
import { Ban, Edit } from "lucide-react";
import UpdateDialog from "./update-dialog";
import { useRouter } from "next/navigation";

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
    maxSize: 75,
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
      const isDisable = row.original.isDisabled === true;
      const variant = isDisable ? "destructive" : "primary";
      const label = isDisable ? "غیرفعال" : "فعال";
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
  const router = useRouter();
  return (
    <div className="flex items-center justify-center space-x-2 rtl:space-x-reverse">
      <UpdateDialog id={original.id} />
      {/* <Button
        model={"outline"}
        variant={"secondary"}
        onClick={() => router.push(`/gateWayLogin/${original.id}`)}
      >
        چت بات
      </Button> */}
    </div>
  );
};
