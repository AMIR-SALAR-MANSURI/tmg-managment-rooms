import { TooltipContentProps } from "@radix-ui/react-tooltip";
import { ColumnSort, TableOptions } from "@tanstack/react-table";
import "@tanstack/react-table";
import { type DataTableConfig } from "./lib/config";
import { ReactNode } from "react";

interface ColumnMeta {
  //   width?: number | string;
  //   minWidth?: number | string;
  //   maxWidth?: number | string;
  align?: "left" | "center" | "right";
}

type TypedColumnDef<TData, TValue = unknown> = ColumnDef<TData, TValue> & {
  meta?: ColumnMeta;
};

type DataTableProps<TData> = Omit<
  TableOptions<TData>,
  "data" | "columns" | "getCoreRowModel"
> & {
  data: TData[] | undefined;
  columns: TypedColumnDef<TData>[];
  loading?: boolean;
  hasPagination?: boolean;
  showSelection?: boolean;
  getDisabledRows?: (row: TData) => boolean;
  getAction?: (table: Table<TData>) => ReactNode;
};

export interface Option {
  label: string;
  value: string | number | boolean;
  count?: number;
  icon?: React.FC<React.SVGProps<SVGSVGElement>>;
}

declare module "@tanstack/react-table" {
  interface ColumnMeta<TData extends RowData, TValue> extends ColumnMeta {
    align?: "left" | "center" | "right";
    addDashIfEmpty?: boolean;
    isBoolean?: boolean;
    minSize?: number;
    maxSize?: number;
    showTooltip?: boolean;
    isAccess?: boolean;
    maxSearchWidth?: 1 | 2 | 3 | 4;
    type?: "number" | "string";
    multiple?: boolean;
    tooltipProps?: {
      tooltipSide?: TooltipContentProps["side"];
      tooltipAlign?: TooltipContentProps["align"];
      tooltipClassName: string;
    };
    isWordWrapped?: boolean;
    icon?: React.FC<React.SVGProps<SVGSVGElement>>;
    variant?: FilterVariant;
    options?: Option[];
    unit?: string;
    range?: [number, number];
    label?: string;
    placeholder?: string;
    order?: number;
    trueLabel?: string;
    falseLabel?: string;
  }
}

interface ExtendedColumnSort<TData> extends Omit<ColumnSort, "id"> {
  id: Extract<keyof TData, string>;
}

interface ExtendedColumnFilter<TData> extends Omit<FilterItemSchema, "id"> {
  id: string;
}

type FilterOperator = DataTableConfig["operators"][number];
export type JoinOperator = DataTableConfig["joinOperators"][number];
type FilterVariant =
  | "text"
  | "number"
  | "range"
  | "date"
  | "dateRange"
  | "boolean"
  | "select"
  | "multiSelect";

const FilterVariantEnum = [
  "text",
  "number",
  "range",
  "date",
  "dateRange",
  "boolean",
  "select",
  "multiSelect",
];

export { FilterVariantEnum };

export type {
  DataTableProps,
  FilterVariant,
  ExtendedColumnSort,
  ExtendedColumnFilter,
  FilterOperator,
};
