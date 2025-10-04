// import { auth } from "@clerk/nextjs/server";
// import { NextRequest } from "next/server";
// import DatabaseService from "@/lib/database";
// import { success, failure } from "@/lib/response";
// import { mapDbCodeToStatus } from "@/utilityFunctions/mapDbCodeToStatus";

// // GET single order
// export async function GET(
//   request: NextRequest,
//   { params }: { params: { id: string } }
// ) {
//   try {
//     const { userId } = await auth();
//     if (!userId) return failure("Unauthorized", 401);

//     const orderRes = await DatabaseService.getOrderById(params.id, userId);

//     if (!orderRes.success) {
//       const err = orderRes.error;
//       const httpStatus = mapDbCodeToStatus(err?.code);
//       return failure(
//         err?.message || "Database error",
//         httpStatus,
//         err?.code,
//         err?.details
//       );
//     }

//     if (!orderRes.data) {
//       return failure("Order not found", 404, "NOT_FOUND");
//     }

//     return success(orderRes.data, "Order fetched", 200);
//   } catch (err: any) {
//     console.error("Unhandled error fetching order:", err);
//     return failure("Internal server error", 500, "SERVER_ERROR", err?.message);
//   }
// }

// // PUT update order
// export async function PUT(
//   request: NextRequest,
//   { params }: { params: { id: string } }
// ) {
//   try {
//     const { userId } = await auth();
//     if (!userId) return failure("Unauthorized", 401);

//     const body = await request.json();
//     const updateData: any = {};
//     if (body.status) updateData.status = body.status;
//     if (body.paymentStatus) updateData.paymentStatus = body.paymentStatus;
//     if (body.trackingNumber) updateData.trackingNumber = body.trackingNumber;
//     if (body.notes) updateData.notes = body.notes;

//     const updateRes = await DatabaseService.updateOrder(
//       params.id,
//       userId,
//       updateData
//     );

//     if (!updateRes.success) {
//       const err = updateRes.error;
//       const httpStatus = mapDbCodeToStatus(err?.code);
//       return failure(
//         err?.message || "Database error",
//         httpStatus,
//         err?.code,
//         err?.details
//       );
//     }

//     if (!updateRes.data) {
//       return failure("Order not found", 404, "NOT_FOUND");
//     }

//     return success(updateRes.data, "Order updated", 200);
//   } catch (err: any) {
//     console.error("Unhandled error updating order:", err);
//     return failure("Internal server error", 500, "SERVER_ERROR", err?.message);
//   }
// }

// // DELETE order
// export async function DELETE(
//   request: NextRequest,
//   { params }: { params: { id: string } }
// ) {
//   try {
//     const { userId } = await auth();
//     if (!userId) return failure("Unauthorized", 401);

//     const deleteRes = await DatabaseService.deleteOrder(params.id, userId);

//     if (!deleteRes.success) {
//       const err = deleteRes.error;
//       const httpStatus = mapDbCodeToStatus(err?.code);
//       return failure(
//         err?.message || "Database error",
//         httpStatus,
//         err?.code,
//         err?.details
//       );
//     }

//     if (!deleteRes.data) {
//       return failure("Order not found", 404, "NOT_FOUND");
//     }

//     return success(deleteRes.data, "Order deleted", 200);
//   } catch (err: any) {
//     console.error("Unhandled error deleting order:", err);
//     return failure("Internal server error", 500, "SERVER_ERROR", err?.message);
//   }
// }












import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({ message: "Cart API works!" });
}
