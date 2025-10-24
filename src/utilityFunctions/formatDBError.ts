import { DBResponse, DbErrorCode } from "@/types/database";

export function formatDBError<T = null>(err: any): DBResponse<T> {
  // 1️⃣ Mongoose validation error (e.g. required field missing)
  if (err.name === "ValidationError") {
    return {
      success: false,
      error: {
        code: DbErrorCode.VALIDATION_ERROR,
        message: "Validation failed",
        details: err.errors,
      },
    };
  }

  // 2️⃣ MongoDB duplicate key error (e.g. email already exists)
  if (err.code === 11000) {
    return {
      success: false,
      error: {
        code: DbErrorCode.CONFLICT, // ✅ changed from DUPLICATE_KEY to CONFLICT for clarity
        message: "A record with the same unique value already exists.",
        details: err.keyValue,
      },
    };
  }

  // 3️⃣ Custom logical conflicts (manually thrown in your logic)
  if (err.code === DbErrorCode.CONFLICT) {
    return {
      success: false,
      error: {
        code: DbErrorCode.CONFLICT,
        message: err.message || "Conflict detected.",
        details: err.details,
      },
    };
  }

  // 4️⃣ Generic fallback for other DB or unknown errors
  return {
    success: false,
    error: {
      code: DbErrorCode.DB_ERROR,
      message: err.message || "Unknown database error",
      details: err,
    },
  };
}
