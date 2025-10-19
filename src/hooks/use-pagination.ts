import { ApiResponseDto } from "@/types/responseType";
import { parseAsInteger, useQueryState } from "nuqs";

const usePagination = (p?: ApiResponseDto & { key?: string }) => {
  const key = p?.key || "";

  const [currentPage, setCurrentPage] = useQueryState(
    key + "page",
    parseAsInteger.withDefault(p?.pagingMetaData.currentPage || 1)
  );
  const [currentPageSize, setCurrentPageSize] = useQueryState(
    key + "pageSize",
    parseAsInteger.withDefault(p?.pagingMetaData.pageSize || 12)
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
