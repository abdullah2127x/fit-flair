import { NextRequest } from "next/server";
import DatabaseService from "@/lib/database";
import { success, failure } from "@/lib/response";
import { mapDbCodeToStatus } from "@/utilityFunctions/mapDbCodeToStatus";
import { auth } from "@clerk/nextjs/server";

// GET all orders (with pagination + filter)
// export async function GET(request: NextRequest) {
//   try {
//     const { userId } = await auth();
//     if (!userId) return failure("Unauthorized", 401);

//     const { searchParams } = new URL(request.url);
//     const page = parseInt(searchParams.get("page") || "1");
//     const limit = parseInt(searchParams.get("limit") || "10");
//     const status = searchParams.get("status") || undefined;

//     const orderRes = await DatabaseService.getOrders(userId, page, limit, status);

//     if (!orderRes.success) {
//       const err = orderRes.error;
//       const httpStatus = mapDbCodeToStatus(err?.code);
//       return failure(err?.message || "Database error", httpStatus, err?.code, err?.details);
//     }

//     return success(orderRes.data, "Orders fetched", 200);
//   } catch (err: any) {
//     console.error("Unhandled error fetching orders:", err);
//     return failure("Internal server error", 500, "SERVER_ERROR", err?.message);
//   }
// }

// POST new order
export async function POST(request: NextRequest) {
  try {
    const { userId } = await auth();
    if (!userId) return failure("Unauthorized", 401);

    const body = await request.json();
    const orderData = {
      ...body,
      userId,
      status: "pending",
    };

    const createRes = await DatabaseService.createOrder(orderData);
    if (!createRes.success) {
      const err = createRes.error;
      const httpStatus = mapDbCodeToStatus(err?.code);
      return failure(
        err?.message || "Database error",
        httpStatus,
        err?.code,
        err?.details
      );
    }

    return success(createRes.data, "Order created", 201);
  } catch (err: any) {
    console.error("Unhandled error creating order:", err);
    return failure("Internal server error", 500, "SERVER_ERROR", err?.message);
  }
}
