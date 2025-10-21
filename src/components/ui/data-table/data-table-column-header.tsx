import { cn } from "@/lib/utils";
import { flexRender, Header } from "@tanstack/react-table";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../dropdown-menu";
import {
  ChevronDown,
  ChevronsUpDown,
  ChevronUp,
  EyeOff,
  X,
} from "lucide-react";

interface DataTableColumnHeaderProps<TData> {
  header: Header<TData, unknown>;
}

export default function DataTableColumnHeader<TData>({
  header,
}: DataTableColumnHeaderProps<TData>) {
  const enabled = header.column.columnDef.enableSorting;
  const column = header.column;
  const title = header.isPlaceholder
    ? null
    : flexRender(header.column.columnDef.header, header.getContext());

  if (enabled) {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger className="whitespace-nowrap flex items-center gap-1.5 [&_svg]:size-4 [&_svg]:shrink-0 [&_svg]:text-muted-foreground">
          {title}
          {enabled &&
            (column.getIsSorted() === "desc" ? (
              <ChevronDown />
            ) : column.getIsSorted() === "asc" ? (
              <ChevronUp />
            ) : (
              <ChevronsUpDown />
            ))}
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-28 !p-2">
          {enabled && (
            <>
              <DropdownMenuCheckboxItem
                className="relative [&>span:first-child]:right-2 [&>span:first-child]:left-auto [&_svg]:text-muted-foreground"
                checked={column.getIsSorted() === "asc"}
                onSelect={() => column.toggleSorting(false)}
              >
                <ChevronUp className="!size-4" />
                صعودی
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                className="relative [&>span:first-child]:right-2 [&>span:first-child]:left-auto [&_svg]:text-muted-foreground"
                checked={column.getIsSorted() === "desc"}
                onClick={() => column.toggleSorting(true)}
              >
                <ChevronDown className="!size-4" />
                نزولی
              </DropdownMenuCheckboxItem>
              {column.getIsSorted() && (
                <DropdownMenuItem
                  className="[&_svg]:text-muted-foreground"
                  onClick={() => column.clearSorting()}
                >
                  <X className="!size-4" />
                  بازنشانی
                </DropdownMenuItem>
              )}
            </>
          )}
          {column.getCanHide() && (
            <DropdownMenuCheckboxItem
              className="!text-sm w-full relative [&>span:first-child]:right-2 [&>span:first-child]:left-auto [&_svg]:ml-1 [&_svg]:text-muted-foreground"
              checked={!column.getIsVisible()}
              onClick={() => column.toggleVisibility(false)}
            >
              <EyeOff className="!size-4" />
              مخفی
            </DropdownMenuCheckboxItem>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }

  return (
    <div
      className={cn(
        header.column.columnDef.enableSorting && "cursor-pointer",
        "whitespace-nowrap"
      )}
    >
      {title}
    </div>
  );
}
