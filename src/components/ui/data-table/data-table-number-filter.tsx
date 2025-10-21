import { Column } from "@tanstack/react-table";
import React from "react";
import { Input } from "../input";
import { cn } from "@/lib/utils";
import { XCircle } from "lucide-react";

interface DataTableNumberFilterProps<TData> {
  column: Column<TData, unknown>;
  title?: string;
}

export default function DataTableNumberFilter<TData>({
  column,
  title,
}: DataTableNumberFilterProps<TData>) {
  const columnMeta = column.columnDef.meta;

  const columnFilterValue = column.getFilterValue() as number | undefined;

  const onReset = React.useCallback(
    (event?: React.MouseEvent) => {
      event?.stopPropagation();
      column.setFilterValue(undefined);
    },
    [column]
  );

  return (
    <div className="relative">
      <Input
        type="number"
        inputMode="numeric"
        variant="outline"
        placeholder={columnMeta?.placeholder ?? columnMeta?.label}
        value={(column.getFilterValue() as string) ?? ""}
        onChange={(event) => column.setFilterValue(event.target.value)}
        className={cn(
          "w-[120px] placeholder:!text-black",
          columnMeta?.unit && "pr-6",
          columnMeta?.icon && "!pr-4"
        )}
      />
      {columnFilterValue ? (
        <div
          tabIndex={0}
          role="button"
          onClick={onReset}
          aria-label={`Clear ${title} filter`}
          className="absolute top-0 right-0 bottom-0 scale-90 flex items-center rounded-r-md px-2 opacity-70 transition-opacity hover:opacity-100 text-sm"
        >
          <XCircle className="text-primary-500 size-4" />
        </div>
      ) : (
        <>
          {columnMeta?.icon && (
            <span className="absolute top-0 right-0 bottom-0 scale-90 flex items-center rounded-r-md px-2 text-primary-500 text-sm">
              <columnMeta.icon className="!size-4" />
            </span>
          )}
          {!columnMeta?.icon && columnMeta?.unit && (
            <span className="absolute top-0 right-0 bottom-0 scale-90 flex items-center rounded-r-md bg-accent px-2 text-muted-foreground text-sm">
              {columnMeta.unit}
            </span>
          )}
        </>
      )}
    </div>
  );
}
