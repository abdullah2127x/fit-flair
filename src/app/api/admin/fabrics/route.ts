// admin/fabrics/route.ts
import { client as readClient } from "@/sanity/lib/client";
import { failure, success } from "@/lib/response";

export async function GET() {
  try {
    // console.log("req come to get og admin fabrics");
    const fabrics = await readClient.fetch(`*[_type == "fabric"]{
      _id,
      "title":name
    }`);
    // console.log("the fabrics are : ", fabrics);
    if (!fabrics) return failure(fabrics.error?.message || "DB error", 500);
    

    return success(fabrics, "Fabrics fetched", 200);
  } catch (error: any) {
    console.error("Error fetching fabrics:", error);
    return failure(
      "Internal server error",
      500,
      "SERVER_ERROR",
      error?.message
    );
  }
}
