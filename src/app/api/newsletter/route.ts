import { NextRequest } from "next/server";
import DatabaseService from "@/lib/database";
import { success, failure } from "@/lib/response";
import { mapDbCodeToStatus } from "@/utilityFunctions/mapDbCodeToStatus";

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    if (!email) {
      return failure("Email is required", 400);
    }

    const res = await DatabaseService.addNewsletter(email);

    if (!res.success) {
      const err = res.error;
      const status = mapDbCodeToStatus(err?.code);
      return failure(err?.message || "Database error", status, err?.code);
    }

    return success(res.data, "Subscribed successfully", 201);
  } catch (err: any) {
    console.error("Unhandled error in newsletter subscription:", err);
    return failure("Internal server error", 500, "SERVER_ERROR", err?.message);
  }
}

export async function GET() {
  try {
    const res = await DatabaseService.getAllSubscribers();
    if (!res.success) {
      const err = res.error;
      const status = mapDbCodeToStatus(err?.code);
      return failure(err?.message || "Database error", status, err?.code);
    }

    return success(res.data, "Fetched all subscribers", 200);
  } catch (err: any) {
    return failure("Internal server error", 500, "SERVER_ERROR", err?.message);
  }
}
