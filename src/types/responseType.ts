export interface PaginationType {
  pageNumber?: number;
  pageSize?: number;
}

export interface ApiListRequestDto {
  pageNumber?: number | null;
  pageSize?: number | null;
  shenaseh?: number;
}

export type ApiResponseDto<T = null> = {
  title?: string;
  isSuccess?: boolean;
  data: T;
  pagingMetaData: {
    currentPage: number;
    totalPages: number;
    pageSize: number;
    totalCount: number;
    hasPrevious: boolean;
    hasNext: boolean;
  };
  hasError?: boolean;
  warnings: [string];
  errorDetails?: {
    statusCode?: number;
    message?: string;
    internalCode?: number;
  };
};

export type Response500Type = {
  message: string;
  detail: string;
  status: boolean;
  code: number;
  data: null;
};

export interface IDRequest {
  id: string;
}

export type AddParams = {
  opid: number;
  fsID: number;
} & IDRequest;
