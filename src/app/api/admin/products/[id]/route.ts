import { NextRequest } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { isAdminClerkId } from "@/lib/utils";
import { failure, success } from "@/lib/response";
import writeClient from "@/sanity/lib/writeClient";

// export async function PUT(
//   request: NextRequest,
//   { params }: { params: { id: string } }
// ) {
//   try {
//     const { id } =  params;
//     const { userId } = await auth();
//     if (!userId || !isAdminClerkId(userId)) return failure("Forbidden", 403);
//     const body = await request.json();
    
//     const updated = await writeClient
//     .patch(id)
//     .set(body)
//     .commit({ autoGenerateArrayKeys: true });

//     console.log("the updated is : ", updated);
//     return success(updated, "Product updated", 200);
//   } catch (err: any) {
//     console.error("Admin update product error:", err);
//     return failure("Internal server error", 500, "SERVER_ERROR", err?.message);
//   }
// }


export async function PUT(
  request: NextRequest,
  context: { params: { id: string } }
) {
  console.log("🟡 [PUT] API Called — Admin Update Product");

  try {
    console.log("🔹 Raw context:", context);

    const { params } = context;
    const { id } = params;
    console.log("🟢 Product ID from params:", id);

    const { userId } = await auth();
    console.log("👤 Authenticated user ID:", userId);

    if (!userId) {
      console.log("❌ No user ID found — Unauthorized");
      return failure("Unauthorized", 401);
    }

    const isAdmin = isAdminClerkId(userId);
    console.log("🧩 Is user admin?", isAdmin);

    if (!isAdmin) {
      console.log("🚫 Forbidden — Non-admin tried to update product");
      return failure("Forbidden", 403);
    }

    const body = await request.json();
    console.log("📦 Request body received:", body);

    console.log("🛠️ Attempting to update product in Sanity...");
    const updated = await writeClient
      .patch(id)
      .set(body)
      .commit({ autoGenerateArrayKeys: true });

    console.log("✅ Product updated successfully:", updated);
    return success(updated, "Product updated", 200);
  } catch (err: any) {
    console.error("🔥 Admin update product error:", err);
    return failure("Internal server error", 500, "SERVER_ERROR", err?.message);
  }
}

export async function DELETE(
  _: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    const { userId } = await auth();
    if (!userId || !isAdminClerkId(userId)) return failure("Forbidden", 403);

    const deleted = await writeClient.delete(id);
    return success(deleted, "Product deleted", 200);
  } catch (err: any) {
    console.error("Admin delete product error:", err);
    return failure("Internal server error", 500, "SERVER_ERROR", err?.message);
  }
}

// import { NextResponse } from "next/server";

// export async function GET() {
//   try {
//     // Example data — you can replace it with a database call or API fetch
//     const data = {
//       message: "GET request successful!",
//       status: "ok",
//     };

//     // Return a JSON response
//     return NextResponse.json(data, { status: 200 });
//   } catch (error) {
//     console.error("Error in GET route:", error);
//     return NextResponse.json(
//       { error: "Something went wrong" },
//       { status: 500 }
//     );
//   }
// }
