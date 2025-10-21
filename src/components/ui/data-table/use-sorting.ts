import {
  Column,
  ColumnDef,
  SortingState,
  Updater,
} from "@tanstack/react-table";
import { useQueryState } from "nuqs";
import { useCallback, useMemo } from "react";
import { getSortingStateParser } from "./lib/parsers";
import { ExtendedColumnSort } from "./table-meta";

export default function useSorting<TData>({
  columns,
}: {
  columns: ColumnDef<TData>[];
}) {
  const columnIds = useMemo(() => {
    return new Set(
      columns
        // @ts-expect-error this missing type error
        .map((column) => (column?.id ? column.id : column.accessorKey))
        .filter(Boolean) as string[]
    );
  }, [columns]);

  const [sorting, setSorting] = useQueryState(
    "sort",
    getSortingStateParser<TData>(columnIds)
      .withOptions({
        clearOnDefault: true,
      })
      .withDefault([])
  );

  const onSortingChange = useCallback(
    (updaterOrValue: Updater<SortingState>) => {
      if (typeof updaterOrValue === "function") {
        const newSorting = updaterOrValue(sorting);
        setSorting(newSorting as ExtendedColumnSort<TData>[]);
      } else {
        setSorting(updaterOrValue as ExtendedColumnSort<TData>[]);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [sorting]
  );

  return { sorting, onSortingChange };
}
