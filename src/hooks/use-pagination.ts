import { PaginationType } from "@/types/responseType";
import { parseAsInteger, useQueryState } from "nuqs";

const usePagination = (p?: PaginationType & { key?: string }) => {
  const key = p?.key || "";

  const [currentPage, setCurrentPage] = useQueryState(
    key + "page",
    parseAsInteger.withDefault(p?.pageNumber || 1)
  );
  const [currentPageSize, setCurrentPageSize] = useQueryState(
    key + "pageSize",
    parseAsInteger.withDefault(p?.pageSize || 12)
  );

  const pagination = {
    page: currentPage,
    per_page: currentPageSize,
  };

  const getNextPage = () => {
    setCurrentPageSize(currentPageSize + currentPageSize);
  };

  return {
    currentPage,
    currentPageSize,
    pagination,
    setCurrentPage,
    setCurrentPageSize,
    getNextPage,
  };
};

export { usePagination };
