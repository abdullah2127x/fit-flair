import { DBResponse } from "@/types/database";

export function formatDBError<T = null>(err: any): DBResponse<T> {
  if (err.name === "ValidationError") {
    return {
      success: false,
      error: {
        code: "VALIDATION_ERROR",
        message: "Validation failed",
        details: err.errors,
      },
    };
  }

  if (err.code === 11000) {
    return {
      success: false,
      error: {
        code: "DUPLICATE_KEY",
        message: "Duplicate key error",
        details: err.keyValue,
      },
    };
  }

  return {
    success: false,
    error: {
      code: "DB_ERROR",
      message: err.message || "Unknown database error",
    },
  };
}
