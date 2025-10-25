import { NextRequest } from "next/server";
import { auth } from "@clerk/nextjs/server";
import DatabaseService from "@/lib/database";
import { success, failure } from "@/lib/response";
import { mapDbCodeToStatus } from "@/utilityFunctions/mapDbCodeToStatus";

export async function GET() {
  try {
    const { userId } = await auth();

    if (!userId) {
      return failure("Unauthorized", 401);
    }

    const cartRes = await DatabaseService.getCart(userId);
    if (!cartRes.success) {
      const err = cartRes.error;
      const status = mapDbCodeToStatus(err?.code);
      return failure(
        err?.message || "Database error",
        status,
        err?.code,
        err?.details
      );
    }

    return success(cartRes.data?.items, "Cart fetched", 200);
  } catch (err: any) {
    console.error("Unhandled error fetching cart:", err);
    return failure("Internal server error", 500, "SERVER_ERROR", err?.message);
  }
}

// export async function GET(request: NextRequest) {
//   try {
//     const { userId } = await auth();

//     // 🟡 CASE 1: Not logged in → fallback to local cart
//     if (!userId) {
//       // NOTE: You cannot access localStorage on the server!
//       // So here we just return a hint for the frontend to load local cart.
//       return success(
//         { items: null },
//         "User not logged in, load from local storage",
//         200
//       );
//     }

//     // 🟢 CASE 2: Logged in → fetch from DB
//     const cartRes = await DatabaseService.getCart(userId);
//     if (!cartRes.success) {
//       const err = cartRes.error;
//       const status = mapDbCodeToStatus(err?.code);
//       return failure(
//         err?.message || "Database error",
//         status,
//         err?.code,
//         err?.details
//       );
//     }

//     return success(cartRes.data, "Cart fetched successfully", 200);
//   } catch (err: any) {
//     console.error("Unhandled error fetching cart:", err);
//     return failure("Internal server error", 500, "SERVER_ERROR", err?.message);
//   }
// }

export async function POST(request: NextRequest) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return failure("Unauthorized", 401);
    }

    const body = await request.json();
    const addRes = await DatabaseService.addManyToCart(userId, body);

    if (!addRes.success) {
      const err = addRes.error;
      const status = mapDbCodeToStatus(err?.code);
      return failure(
        err?.message || "Database error",
        status,
        err?.code,
        err?.details
      );
    }

    return success(addRes.data, "Cart updated", 201);
  } catch (err: any) {
    console.error("Unhandled error adding to cart:", err);
    return failure("Internal server error", 500, "SERVER_ERROR", err?.message);
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return failure("Unauthorized", 401);
    }

    const deleteRes = await DatabaseService.clearCart(userId);

    if (!deleteRes.success) {
      const err = deleteRes.error;
      const status = mapDbCodeToStatus(err?.code);
      return failure(
        err?.message || "Database error",
        status,
        err?.code,
        err?.details
      );
    }

    if (!deleteRes.data) {
      return failure("Cart not found", 404, "NOT_FOUND");
    }

    return success(deleteRes.data, "Cart updated", 200);
  } catch (err: any) {
    console.error("Unhandled error clearing/removing cart:", err);
    return failure("Internal server error", 500, "SERVER_ERROR", err?.message);
  }
}
