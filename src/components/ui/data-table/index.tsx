"use client";

import { usePagination } from "@/hooks/use-pagination";
import { cn, isNotEmpty } from "@/lib/utils";
import {
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  Header,
  RowSelectionState,
  useReactTable,
} from "@tanstack/react-table";
import { useEffect, useState } from "react";
import LinearIndeterminate from "../circular-progress";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../table";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../tooltip";
import DataTableColumnHeader from "./data-table-column-header";
import { DataTablePagination } from "./data-table-pagination";
import { DataTableProps } from "./table-meta";
import useSorting from "./use-sorting";
import useFilter from "./use-filter";

const DataTable = <TData,>({
  loading = false,
  hasPagination = true,
  showSelection = false,
  getAction,
  ...tableProps
}: DataTableProps<TData>) => {
  const [globalFilter, setGlobalFilter] = useState<string>("");
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});

  const { onPaginationChange, pagination } = usePagination();

  const { sorting, onSortingChange } = useSorting({
    columns: tableProps.columns,
  });

  const { columnFilters, onColumnFiltersChange } = useFilter({
    columns: tableProps.columns,
  });

  const table = useReactTable({
    ...tableProps,
    data: tableProps.data || [],
    onGlobalFilterChange: setGlobalFilter,
    onRowSelectionChange: setRowSelection,
    onSortingChange,
    onPaginationChange,
    onColumnFiltersChange,
    manualSorting: false,
    enableSorting: false,
    manualPagination: true,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    state: {
      columnFilters,
      globalFilter,
      rowSelection,
      sorting,
      pagination: {
        pageIndex: pagination.pageNumber,
        pageSize: pagination.pageSize,
        // pageIndex: currentPage,
        // pageSize: currentPageSize,
      },
    },
  });

  return (
    <TooltipProvider>
      <div className="relative space-y-4">
        {/* Table */}
        {getAction?.(table)}
        <div className="overflow-x-auto !rounded-xl">
          <Table className="min-w-full border-b border-collapse">
            <TableHeader className="w-full relative bg-[#EDEDED]">
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id} className="!border-b-0">
                  {headerGroup.headers.map((header: Header<TData, unknown>) => {
                    const meta = header.column.columnDef.meta;
                    if (meta?.isAccess == false) return null;

                    const span = header.colSpan;

                    const hasGrouping = table
                      .getHeaderGroups()[0]
                      ?.headers.some((hdr) => hdr.getLeafHeaders().length > 1);

                    return (
                      <TableHead
                        key={header.id}
                        colSpan={span}
                        style={{ width: header.getSize() }}
                        onClick={header.column.getToggleSortingHandler()}
                        className={cn(
                          hasGrouping && "border",
                          "relative h-12 lg:h-14 text-nowrap text-sm font-normal text-primary-text bg-secondary-light [&>span]:last:hidden data-[align=left]:pl-4 data-[align=right]:pr-4"
                        )}
                        data-align={meta?.align || "center"}
                        align={meta?.align || "center"}
                      >
                        <DataTableColumnHeader header={header} />
                      </TableHead>
                    );
                  })}
                </TableRow>
              ))}
              {loading && (
                <div className="absolute w-full bottom-0">
                  <LinearIndeterminate />
                </div>
              )}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  className="hover:bg-[#ebf0f5] [&>td]:last:border-none even:bg-secondary-light text-sm lg:text-base"
                >
                  {row.getVisibleCells().map((cell) => {
                    const meta = cell.column.columnDef.meta;

                    if (meta?.isAccess == false) return null;

                    const context = cell.getContext();

                    const rendered = flexRender(
                      cell.column.columnDef.cell,
                      context
                    );

                    let content = isNotEmpty(context.getValue())
                      ? rendered
                      : "-";

                    const renderBoolean = context.getValue() ? "دارد" : "ندارد";

                    content = meta?.isBoolean ? renderBoolean : content;

                    const cellValue =
                      meta?.addDashIfEmpty || meta?.isBoolean
                        ? content
                        : rendered;

                    return (
                      <TableCell
                        key={cell.id}
                        style={{
                          borderStyle: "solid",
                          maxWidth: meta?.maxSize,
                          minWidth: meta?.minSize,
                        }}
                        className={cn(
                          "px-2 h-[73px] border-b text-sm font-medium border-0 border-l last:border-l-0 border-border data-[align=left]:pl-4 data-[align=right]:pr-4 data-[isWordWrapped=false]:whitespace-nowrap data-[isDisabled=true]:text-neutral-third overflow-hidden text-ellipsis"
                        )}
                        data-isWordWrapped={meta?.isWordWrapped}
                        data-align={meta?.align || "center"}
                        data-isDisabled={
                          tableProps.getDisabledRows?.(context.row.original) ||
                          false
                        }
                        align={meta?.align || "center"}
                      >
                        {meta?.showTooltip ? (
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <div
                                style={{ maxWidth: meta?.maxSize || "100px" }}
                                className="hover:cursor-help truncate py-1"
                              >
                                {cellValue}
                              </div>
                            </TooltipTrigger>
                            <TooltipContent
                              style={{ maxWidth: meta?.maxSize || "100px" }}
                              side={meta?.tooltipProps?.tooltipSide || "top"}
                              align={
                                meta?.tooltipProps?.tooltipAlign || "center"
                              }
                              className={cn(
                                meta?.tooltipProps?.tooltipClassName,
                                "text-right leading-relaxed text-wrap"
                              )}
                            >
                              {cellValue}
                            </TooltipContent>
                          </Tooltip>
                        ) : (
                          cellValue
                        )}
                      </TableCell>
                    );
                  })}
                </TableRow>
              ))}
              {table.getRowModel().rows.length === 0 && loading && (
                <TableRow>
                  <TableCell
                    colSpan={tableProps.columns.length}
                    className="h-24 text-center"
                  >
                    درحال دریافت اطلاعات ...
                  </TableCell>
                </TableRow>
              )}
              {table.getRowModel().rows.length === 0 && !loading && (
                <TableRow>
                  <TableCell
                    colSpan={tableProps.columns.length}
                    className="h-24 text-center"
                  >
                    داده ای یافت نشد
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        {hasPagination && (
          <div className="mt-4 flex items-center gap-4">
            <DataTablePagination table={table} />
          </div>
        )}
      </div>
    </TooltipProvider>
  );
};

export * from "./data-table-cell";
export { DataTableSkeleton } from "./data-table-skeleton";
export default DataTable;
