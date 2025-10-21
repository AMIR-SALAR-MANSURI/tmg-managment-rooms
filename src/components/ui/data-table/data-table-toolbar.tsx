"use client";

import type { Column, Table } from "@tanstack/react-table";
import { X } from "lucide-react";
import * as React from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { DataTableViewOptions } from "./data-table-view-options";
import { DataTableFacetedFilter } from "./data-table-faceted-filter";
import { DataTableDateFilter } from "./data-table-date-filter";
import { DataTableSliderFilter } from "./data-table-slider-filter";
import { SearchStatus } from "iconsax-reactjs";
import { DataTableBooleanFilter } from "./data-table-boolean-filter";
import DataTableNumberFilter from "./data-table-number-filter";

interface DataTableToolbarProps<TData> extends React.ComponentProps<"div"> {
  table: Table<TData>;
}

export function DataTableToolbar<TData>({
  table,
  children,
  className,
  ...props
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0;

  const columns = React.useMemo(
    () => table.getAllColumns().filter((column) => column.getCanFilter()),
    [table]
  );

  const onReset = React.useCallback(() => {
    table.resetColumnFilters();
  }, [table]);

  return (
    <div
      role="toolbar"
      aria-orientation="horizontal"
      className={cn(
        "flex w-full items-start justify-between gap-2 p-1",
        className
      )}
      {...props}
    >
      <div className="flex flex-1 flex-wrap items-center gap-2">
        {columns
          .sort(
            ({ columnDef: { meta: metaA } }, { columnDef: { meta: metaB } }) =>
              (metaA?.order ?? Infinity) - (metaB?.order ?? Infinity)
          )
          .map((column) => (
            <DataTableToolbarFilter key={column.id} column={column} />
          ))}
        {isFiltered &&
          columns.filter((i) => i.columnDef.enableColumnFilter).length > 1 && (
            <Button
              size="sm"
              model="outline"
              variant="destructive"
              onClick={onReset}
              aria-label="Reset filters"
            >
              <X />
              بازنشانی
            </Button>
          )}
      </div>
      <div className="flex items-center gap-2">
        {/* <DataTableViewOptions table={table} /> */}
        {children}
      </div>
    </div>
  );
}
interface DataTableToolbarFilterProps<TData> {
  column: Column<TData>;
}

function DataTableToolbarFilter<TData>({
  column,
}: DataTableToolbarFilterProps<TData>) {
  {
    const columnMeta = column.columnDef.meta;
    const columnDef = column.columnDef;

    const onFilterRender = React.useCallback(() => {
      if (!columnMeta?.variant) return null;

      switch (columnMeta.variant) {
        case "text":
          return (
            <Input
              variant="filled"
              iconRight={SearchStatus}
              iconSize="lg"
              inputMode="numeric"
              className={cn(
                ["max-w-60 lg:max-w-96", "max-w-32", "max-w-36", "max-w-40"]?.[
                  columnMeta.maxSearchWidth || 0
                ]
              )}
              placeholder={columnMeta?.placeholder ?? columnMeta.label}
              value={(column.getFilterValue() as string) ?? ""}
              onChange={(event) => column.setFilterValue(event.target.value)}
            />
          );

        case "number":
          return (
            <DataTableNumberFilter
              column={column}
              title={
                typeof columnDef.header == "string"
                  ? columnDef.header
                  : columnMeta.label
              }
            />
          );

        case "boolean":
          return (
            <DataTableBooleanFilter
              column={column}
              title={
                typeof columnDef.header == "string"
                  ? columnDef.header
                  : columnMeta.label
              }
              trueLabel={column.columnDef.meta?.trueLabel}
              falseLabel={column.columnDef.meta?.falseLabel}
            />
          );

        case "range":
          return (
            <DataTableSliderFilter
              column={column}
              title={
                typeof columnDef.header == "string"
                  ? columnDef.header
                  : columnMeta.label
              }
            />
          );

        case "date":
        case "dateRange":
          return (
            <DataTableDateFilter
              column={column}
              title={
                typeof columnDef.header == "string"
                  ? columnDef.header
                  : columnMeta?.label
              }
              multiple={columnMeta.variant === "dateRange"}
            />
          );

        case "select":
        case "multiSelect":
          return (
            <DataTableFacetedFilter
              column={column}
              title={
                typeof columnDef.header == "string"
                  ? columnDef.header
                  : columnMeta?.label
              }
              options={columnMeta.options ?? []}
              multiple={columnMeta.variant === "multiSelect"}
            />
          );

        default:
          return null;
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [
      column,
      columnDef.header,
      columnMeta?.label,
      columnMeta?.options,
      columnMeta?.placeholder,
      columnMeta?.unit,
      columnMeta?.variant,
    ]);

    return onFilterRender();
  }
}
