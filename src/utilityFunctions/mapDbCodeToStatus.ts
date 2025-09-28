import { DbErrorCode } from "@/types/database";

export function mapDbCodeToStatus(code?: DbErrorCode): number {
  switch (code) {
    case DbErrorCode.VALIDATION_ERROR:
      return 400;
    case DbErrorCode.DUPLICATE_KEY:
      return 409;
    case DbErrorCode.NOT_FOUND:
      return 404;
    case DbErrorCode.UNAUTHORIZED:
      return 401;
    case DbErrorCode.FORBIDDEN:
      return 403;
    case DbErrorCode.DB_ERROR:
      return 500;
    default:
      return 500;
  }
}
