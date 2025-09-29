import { NextRequest } from "next/server";
import { auth } from "@clerk/nextjs/server";
import DatabaseService from "@/lib/database";
import { success, failure } from "@/lib/response";
import { mapDbCodeToStatus } from "@/utilityFunctions/mapDbCodeToStatus";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    console.log("GET /cart called");
    const { userId } = await auth();

    if (!userId) {
      return failure("Unauthorized", 401);
    }

    const cartRes = await DatabaseService.getCart(userId);
    if (!cartRes.success) {
      const err = cartRes.error;
      const status = mapDbCodeToStatus(err?.code);
      return failure(err?.message || "Database error", status, err?.code, err?.details);
    }

    return success(cartRes.data, "Cart fetched", 200);
  } catch (err: any) {
    console.error("Unhandled error fetching cart:", err);
    return failure("Internal server error", 500, "SERVER_ERROR", err?.message);
  }
}

export async function POST(request: NextRequest) {
  try {
    console.log("POST /cart called");
    const { userId } = await auth();

    if (!userId) {
      return failure("Unauthorized", 401);
    }

    const body = await request.json();
    let addRes;

    // ✅ If it's an array → bulk insert
    if (Array.isArray(body)) {
      addRes = await DatabaseService.addManyToCart(userId, body);
    } 
    // ✅ If it's a single object → add single item
    else {
      addRes = await DatabaseService.addToCart(userId, body);
    }

    if (!addRes.success) {
      const err = addRes.error;
      const status = mapDbCodeToStatus(err?.code);
      return failure(err?.message || "Database error", status, err?.code, err?.details);
    }

    return success(addRes.data, "Cart updated", 201);
  } catch (err: any) {
    console.error("Unhandled error adding to cart:", err);
    return failure("Internal server error", 500, "SERVER_ERROR", err?.message);
  }
}


export async function PUT(request: NextRequest) {
  try {
    console.log("PUT /cart called");
    const { userId } = await auth();

    if (!userId) {
      return failure("Unauthorized", 401);
    }

    const { productId, colorName, quantity } = await request.json();
    const updateRes = await DatabaseService.updateCartItem(userId, productId, colorName, quantity);

    if (!updateRes.success) {
      const err = updateRes.error;
      const status = mapDbCodeToStatus(err?.code);
      return failure(err?.message || "Database error", status, err?.code, err?.details);
    }

    if (!updateRes.data) {
      return failure("Cart not found", 404, "NOT_FOUND");
    }

    return success(updateRes.data, "Cart updated", 200);
  } catch (err: any) {
    console.error("Unhandled error updating cart:", err);
    return failure("Internal server error", 500, "SERVER_ERROR", err?.message);
  }
}

export async function DELETE(request: NextRequest) {
  try {
    console.log("DELETE /cart called");
    const { userId } = await auth();

    if (!userId) {
      return failure("Unauthorized", 401);
    }

    const { searchParams } = new URL(request.url);
    const productId = searchParams.get("productId");
    const colorName = searchParams.get("colorName");

    let deleteRes;
    if (productId && colorName) {
      // remove specific item
      deleteRes = await DatabaseService.removeFromCart(userId, productId, colorName);
    } else {
      // clear entire cart
      deleteRes = await DatabaseService.clearCart(userId);
    }

    if (!deleteRes.success) {
      const err = deleteRes.error;
      const status = mapDbCodeToStatus(err?.code);
      return failure(err?.message || "Database error", status, err?.code, err?.details);
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


// export async function POST(request: Request) {
//   try {
//     const { userId, cartItems } = await request.json();

//     // Update cart in database
//     await DatabaseService.updateCartInDB(userId, cartItems);

//     return NextResponse.json({ success: true });
//   } catch (error) {
//     console.error("Error updating cart:", error);
//     return NextResponse.json({ success: false, error: error.message });
//   }
// }
