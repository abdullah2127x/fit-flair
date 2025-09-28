export enum DbErrorCode {
  VALIDATION_ERROR = "VALIDATION_ERROR",
  DUPLICATE_KEY = "DUPLICATE_KEY",
  NOT_FOUND = "NOT_FOUND",
  UNAUTHORIZED = "UNAUTHORIZED",
  FORBIDDEN = "FORBIDDEN",
  DB_ERROR = "DB_ERROR",
}

export type DBResponse<T = null> = {
  success: boolean;
  data?: T;
  error?: {
    code: DbErrorCode;
    message: string;
    details?: any;
  };
};

export interface Pagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
}
