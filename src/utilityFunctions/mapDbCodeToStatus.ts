export function mapDbCodeToStatus(code?: string): number {
  switch (code) {
    case "VALIDATION_ERROR":
      return 400;
    case "DUPLICATE_KEY":
    case "DUPLICATE_USER":
      return 409;
    case "NOT_FOUND":
      return 404;
    default:
      return 500;
  }
}
