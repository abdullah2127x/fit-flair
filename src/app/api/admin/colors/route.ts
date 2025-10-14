import { client as readClient } from "@/sanity/lib/client";
import { success, failure } from "@/lib/response";

export async function GET() {
  try {
    console.log("req come to get of admin colors")
    const colors = await readClient.fetch(`*[_type == "color"]{
      _id,
      "title": name
    }`);
    console.log("the admin colors are :", colors)

    if (!colors) return failure("Failed to fetch colors", 500);
    return success(colors, "Colors fetched", 200);
  } catch (error: any) {
    console.error("Error fetching colors:", error);
    return failure(
      "Internal server error",
      500,
      "SERVER_ERROR",
      error?.message
    );
  }
}
