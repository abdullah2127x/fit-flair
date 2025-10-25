// import { NextRequest } from "next/server";
// import DatabaseService from "@/lib/database";
// import { success, failure } from "@/lib/response";
// import { mapDbCodeToStatus } from "@/utilityFunctions/mapDbCodeToStatus";

// export async function DELETE(
//   request: NextRequest,
//   // { params }: { params: { id: string } }
//   params: Promise<{ id: string }>

// ) {
//   try {
//     const { id } = await params;
//     if (!id) {
//       return failure("Subscriber ID is required", 400);
//     }

//     const res = await DatabaseService.deleteSubscriber(id);

//     if (!res.success) {
//       const err = res.error;
//       const status = mapDbCodeToStatus(err?.code);
//       return failure(err?.message || "Database error", status, err?.code);
//     }

//     return success(null, "Subscriber deleted successfully", 200);
//   } catch (err: any) {
//     console.error("Unhandled error deleting subscriber:", err);
//     return failure("Internal server error", 500, "SERVER_ERROR", err?.message);
//   }
// }

import { NextRequest } from "next/server";
import DatabaseService from "@/lib/database";
import { success, failure } from "@/lib/response";
import { mapDbCodeToStatus } from "@/utilityFunctions/mapDbCodeToStatus";

export async function DELETE(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params; // ✅ unwrap correctly

    if (!id) {
      return failure("Subscriber ID is required", 400);
    }

    const res = await DatabaseService.deleteSubscriber(id);

    if (!res.success) {
      const err = res.error;
      const status = mapDbCodeToStatus(err?.code);
      return failure(err?.message || "Database error", status, err?.code);
    }

    return success(null, "Subscriber deleted successfully", 200);
  } catch (err: any) {
    console.error("Unhandled error deleting subscriber:", err);
    return failure("Internal server error", 500, "SERVER_ERROR", err?.message);
  }
}
