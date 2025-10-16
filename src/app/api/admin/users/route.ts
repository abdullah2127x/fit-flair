import { auth } from "@clerk/nextjs/server";
import { failure, success } from "@/lib/response";
import { isAdminClerkId } from "@/lib/utils";
import DatabaseService from "@/lib/database";

export async function GET() {
  try {
    const { userId } = await auth();
    if (!userId || !isAdminClerkId(userId)) {
      console.log("Admin users endpoint: Access denied - not admin");
      return failure("Forbidden", 403);
    }
    const res = await DatabaseService.listUsers();
    if (!res.success) return failure(res.error?.message || "DB error", 500);
    console.log("the users in teh admin is", res)
    return success(res.data, "Users fetched", 200);
  } catch (err: any) {
    console.error("Admin users endpoint: Error:", err);
    return failure("Internal server error", 500, "SERVER_ERROR", err?.message);
  }
}
