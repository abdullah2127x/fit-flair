import { NextRequest } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { isAdminClerkId } from "@/lib/utils";
import { failure, success } from "@/lib/response";
import writeClient from "@/sanity/lib/writeClient";

export async function PUT(
  request: NextRequest,

  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;

  try {
    // const { id } = params;

    const { userId } = await auth();

    if (!userId) return failure("Unauthorized", 401);
    if (!isAdminClerkId(userId)) return failure("Forbidden", 403);

    const body = await request.json();

    const updated = await writeClient
      .patch(id)
      .set(body)
      .commit({ autoGenerateArrayKeys: true });

    return success(updated, "Product updated", 200);
  } catch (err: any) {
    console.error("🔥 Admin update product error:", err);
    return failure("Internal server error", 500, "SERVER_ERROR", err?.message);
  }
}

export async function DELETE(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;

    const { userId } = await auth();
    if (!userId || !isAdminClerkId(userId)) return failure("Forbidden", 403);

    const deleted = await writeClient.delete(id);
    return success(deleted, "Product deleted", 200);
  } catch (err: any) {
    console.error("Admin delete product error:", err);
    return failure("Internal server error", 500, "SERVER_ERROR", err?.message);
  }
}
