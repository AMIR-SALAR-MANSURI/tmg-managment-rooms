import { Button } from "@/components/ui/button";
import {
  DataTableDateCell,
  DataTableIndexCell,
} from "@/components/ui/data-table";
import { Tag } from "@/components/ui/tag";
import { RagHistoryList } from "@/services";
import { ClientsList } from "@/services/clients";
import { CellContext, ColumnDef } from "@tanstack/react-table";
import { Ban, Edit } from "lucide-react";
import { useRouter } from "next/navigation";
import UpdateDialog from "./update-dialog";

export const columns = (
  onSet: (row: RagHistoryList) => void,
): ColumnDef<RagHistoryList>[] => [
  {
    accessorKey: "row",
    header: "#",
    size: 10,
    cell: DataTableIndexCell,
  },

  {
    accessorKey: "systemPrompt",
    header: "systemPrompt",
    meta: {
      isWordWrapped: false,
      showTooltip: true,
    },
    maxSize: 75,
  },

  {
    accessorKey: "contentPrompt",
    header: "contentPrompt",
    meta: {
      isWordWrapped: false,
      showTooltip: true,
    },
    maxSize: 75,
  },
  {
    accessorKey: "smallTalkPrompt",
    header: "smallTalkPrompt",
    meta: {
      isWordWrapped: false,
      showTooltip: true,
    },
  },
  {
    accessorKey: "versionNumber",
    header: "نسخه",
    meta: {
      isWordWrapped: false,
    },
  },
  {
    accessorKey: "createdAt",
    header: "تاریخ ساخت",
    meta: {
      isWordWrapped: false,
    },
    cell: DataTableDateCell,
  },

  {
    accessorKey: "isActive",
    header: "وضعیت",
    meta: {
      isWordWrapped: false,
    },
    cell: ({ row }) => {
      const isDisable = row.original.isActive === true;
      const variant = isDisable ? "destructive" : "primary";
      const label = isDisable ? "غیرفعال" : "فعال";
      return <Tag variant={variant}>{label}</Tag>;
    },
  },
  {
    id: "actions",
    header: "عملیات",
    cell: (props) => <Actions {...props} onSet={onSet} />,
  },
];

const Actions = ({
  row: { original },
  onSet,
}: CellContext<RagHistoryList, unknown> & {
  onSet: (row: RagHistoryList) => void;
}) => {
  return (
    <div className="flex items-center justify-center space-x-2 rtl:space-x-reverse">
      <Button
        model={"outline"}
        variant={"secondary"}
        onClick={() => onSet(original)}
      >
        فراخوانی
      </Button>
      <UpdateDialog id={original.roomId} promptId={original.id} />
    </div>
  );
};
