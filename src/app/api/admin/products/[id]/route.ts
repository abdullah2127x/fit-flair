
import { NextRequest } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { isAdminClerkId } from "@/lib/utils";
import { failure, success } from "@/lib/response";
import { client as readClient } from "@/sanity/lib/client";
import writeClient from "@/sanity/lib/writeClient";


export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { userId } = await auth();
    if (!userId || !isAdminClerkId(userId)) return failure("Forbidden", 403);

    const body = await request.json();
    const patch = writeClient.patch(params.id).set(body);
    const updated = await writeClient
      .transaction()
      .patch(patch)
      .commit({ autoGenerateArrayKeys: true });
    return success(updated, "Product updated", 200);
  } catch (err: any) {
    console.error("Admin update product error:", err);
    return failure("Internal server error", 500, "SERVER_ERROR", err?.message);
  }
}

export async function DELETE(_: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { userId } = await auth();
    if (!userId || !isAdminClerkId(userId)) return failure("Forbidden", 403);

    const deleted = await writeClient.delete(params.id);
    return success(deleted, "Product deleted", 200);
  } catch (err: any) {
    console.error("Admin delete product error:", err);
    return failure("Internal server error", 500, "SERVER_ERROR", err?.message);
  }
}











// =================
export async function GET(request: NextRequest) {
  try {
    console.log("req come to Get of admin product")
    const { userId } = await auth();
    if (!userId || !isAdminClerkId(userId)) return failure("Forbidden", 403);
    
    const { searchParams } = new URL(request.url);
    const query = searchParams.get("q") || "";
    const limit = parseInt(searchParams.get("limit") || "20");
    const groq = `*[_type == "product" && (${query ? `title match $q || subTitle match $q` : 'true'})] | order(_createdAt desc)[0...$limit]{
      _id, title, subTitle, price, audience, category, subCategory, isFeatured, isNewArrival, isPopular
    }`;
    console.log("groq in the POST of admin product is :", groq)
    const products = await readClient.fetch(groq, { q: `${query}*`, limit });
    console.log("product res in the POST of admin product is :", products)
    return success(products, "Products fetched", 200);
  } catch (err: any) {
    console.error("Admin list products error:", err);
    return failure("Internal server error", 500, "SERVER_ERROR", err?.message);
  }
}