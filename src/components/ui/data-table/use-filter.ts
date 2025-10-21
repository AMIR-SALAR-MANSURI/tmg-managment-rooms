/* eslint-disable react-hooks/exhaustive-deps */
import { useDebouncedCallback } from "@/hooks/use-debounced-callback";
import {} from "@tanstack/react-query";
import {
  ColumnDef,
  ColumnFiltersState,
  type Updater,
} from "@tanstack/react-table";
import {
  parseAsArrayOf,
  parseAsInteger,
  parseAsString,
  Parser,
  useQueryStates,
} from "nuqs";
import React from "react";
import { FilterVariant } from "./table-meta";

const ARRAY_SEPARATOR = ",";
const DEBOUNCE_MS = 300;

export default function useFilter<TData>({
  columns,
}: {
  columns: ColumnDef<TData>[];
}) {
  const filterableColumns = React.useMemo(() => {
    return columns.filter((column) => column?.enableColumnFilter);
  }, [columns]);

  const getColumnKey = (c: ColumnDef<TData>): string =>
    // @ts-expect-error this missing type error
    c.id || c.accessorKey || "";

  const filterParsers = React.useMemo(() => {
    return filterableColumns.reduce<
      Record<string, Parser<string> | Parser<string[]> | Parser<number>>
    >((acc, column) => {
      if (column.meta?.options?.length && column.meta.variant !== "select") {
        acc[getColumnKey(column)] = parseAsArrayOf(
          parseAsString,
          ARRAY_SEPARATOR
        ).withOptions({});
      } else {
        if (column.meta?.type === "number")
          acc[getColumnKey(column)] = parseAsInteger.withOptions({});
        else acc[getColumnKey(column)] = parseAsString.withOptions({});
      }
      return acc;
    }, {});
  }, [filterableColumns]);

  const [filterValues, setFilterValues] = useQueryStates(filterParsers);

  const debouncedSetFilterValues = useDebouncedCallback(
    (values: typeof filterValues) => {
      void setFilterValues(values);
    },
    DEBOUNCE_MS
  );

  const initialColumnFilters: ColumnFiltersState = React.useMemo(() => {
    return Object.entries(filterValues).reduce<ColumnFiltersState>(
      (filters, [key, value]) => {
        if (value !== null) {
          const processedValue = Array.isArray(value)
            ? value
            : typeof value === "string" && /[^a-zA-Z0-9]/.test(value)
            ? value.split(/[^a-zA-Z0-9]+/).filter(Boolean)
            : [value];

          filters.push({
            id: key,
            value: processedValue,
          });
        }
        return filters;
      },
      []
    );
  }, [filterValues]);

  const [columnFilters, setColumnFilters] =
    React.useState<ColumnFiltersState>(initialColumnFilters);

  const onColumnFiltersChange = React.useCallback(
    (updaterOrValue: Updater<ColumnFiltersState>) => {
      setColumnFilters((prev) => {
        const next =
          typeof updaterOrValue === "function"
            ? updaterOrValue(prev)
            : updaterOrValue;

        const filterUpdates: Record<string, string | string[] | number | null> =
          {};

        for (const filter of next) {
          const col = filterableColumns.find(
            (column) => getColumnKey(column) === filter.id
          );
          if (col) {
            filterUpdates[filter.id] = filter.value as
              | string
              | string[]
              | number;

            if (!col.meta?.multiple && Array.isArray(filter.value)) {
              filterUpdates[filter.id] = filter.value?.[0];
            }
          }
        }

        for (const prevFilter of prev) {
          if (!next.some((filter) => filter.id === prevFilter.id)) {
            filterUpdates[prevFilter.id] = null;
          }
        }

        console.log(filterUpdates);

        debouncedSetFilterValues(filterUpdates);

        return next;
      });
    },
    [setColumnFilters, debouncedSetFilterValues, filterableColumns]
  );

  return { onColumnFiltersChange, columnFilters, filterValues };
}
