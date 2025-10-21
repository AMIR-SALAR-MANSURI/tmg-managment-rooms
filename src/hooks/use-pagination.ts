"use client";

import { PaginationState, Updater } from "@tanstack/react-table";
import { parseAsInteger, useQueryStates } from "nuqs";

type PaginationQuery = {
  page: number;
  size: number;
};

const usePagination = (defaults: PaginationQuery = { page: 0, size: 5 }) => {
  const [query, setQuery] = useQueryStates({
    pageNumber: parseAsInteger.withDefault(defaults.page),
    pageSize: parseAsInteger.withDefault(defaults.size),
  });

  const onPaginationChange = (updater: Updater<PaginationState>) => {
    let newPagination: PaginationState;
    if (typeof updater === "function") {
      const currentPagination = {
        pageIndex: query.pageNumber,
        pageSize: query.pageSize,
      };
      newPagination = updater(currentPagination);
    } else {
      newPagination = updater;
    }

    console.log(newPagination);

    const { pageIndex, pageSize } = newPagination;
    setQuery({
      pageNumber: pageIndex,
      pageSize,
    });
  };

  return { pagination: query, onPaginationChange };
};

export { usePagination };
