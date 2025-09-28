export type ResponseType<T = any> = {
  status: number; // HTTP status (200, 400, 500, etc.)
  success: boolean; // true | false
  message: string; // short human-readable message
  data?: T; // actual payload if success
  code?: string; // optional error code (e.g., "DB_ERROR", "VALIDATION_ERROR")
  details?: any; // extra debug info (stack, validation errors, etc.)
};
