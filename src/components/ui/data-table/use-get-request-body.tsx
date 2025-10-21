import { ColumnDef } from "@tanstack/react-table";
import useFilter from "./use-filter";
import useSorting from "./use-sorting";
import { usePagination } from "../../../hooks/use-pagination";
import { useEffect } from "react";

export const useGetRequestBody = (columns: ColumnDef<any>[]) => {
  const { filterValues, columnFilters } = useFilter({ columns });

  const { sorting } = useSorting({ columns });

  const { pagination } = usePagination();

  // useEffect(() => {
  //   console.log(columnFilters, filterValues);
  // }, [columnFilters, filterValues]);

  return {
    pagination,
    filterValues,
    sorting,
    // : Object.fromEntries(sorting.map((i) => [i.id, i.desc]))
  };
};
