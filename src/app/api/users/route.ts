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

    // getUserByClerkId returns DBResponse<User | null>
    const userRes = await DatabaseService.getUserByClerkId(userId);

    if (!userRes.success) {
      const err = userRes.error;
      const status = mapDbCodeToStatus(err?.code);
      return failure(
        err?.message || "Database error",
        status,
        err?.code,
        err?.details
      );
    }

    if (!userRes.data) {
      return failure("User not found", 404, "NOT_FOUND");
    }

    return success(userRes.data, "User fetched", 200);
  } catch (err: any) {
    console.error("Unhandled error fetching user:", err);
    return failure("Internal server error", 500, "SERVER_ERROR", err?.message);
  }
}

export async function POST(request: NextRequest) {
  try {
    // authorize first
    const { userId } = await auth();
    if (!userId) {
      return failure("Unauthorized", 401);
    }

    const body = await request.json();
    const { email, firstName, lastName, phone } = body;

    const userData = {
      clerkId: userId,
      email,
      firstName,
      lastName,
      phone,
      addresses: [],
      orders: [],
    };

    // check if user already exists for this clerkId
    const savedUserRes = await DatabaseService.getUserByClerkId(userId);

    if (!savedUserRes.success) {
      // DB-level error — map and forward
      const err = savedUserRes.error;
      const status = mapDbCodeToStatus(err?.code);
      return failure(
        err?.message || "Database error",
        status,
        err?.code,
        err?.details
      );
    }
    const savedUser = savedUserRes.data;
    if (savedUser) return success(savedUser, "User already exists", 200);

    // createUser returns DBResponse<User>
    const createRes = await DatabaseService.createUser(userData);
    if (!createRes.success) {
      const err = createRes.error;
      const status = mapDbCodeToStatus(err?.code);
      return failure(
        err?.message || "Database error",
        status,
        err?.code,
        err?.details
      );
    }

    return success(createRes.data, "User created", 201);
  } catch (err: any) {
    console.error("Unhandled error creating user:", err);
    return failure("Internal server error", 500, "SERVER_ERROR", err?.message);
  }
}

export async function PUT(request: NextRequest) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return failure("Unauthorized", 401);
    }

    const body = await request.json();
    const { firstName, lastName, phone, addresses } = body;

    const updateData: any = {};
    if (firstName) updateData.firstName = firstName;
    if (lastName) updateData.lastName = lastName;
    if (phone) updateData.phone = phone;
    if (addresses) updateData.addresses = addresses;

    // call service layer instead of direct User.findOneAndUpdate
    const updateRes = await DatabaseService.updateUser(userId, updateData);

    if (!updateRes.success) {
      const err = updateRes.error;
      const status = mapDbCodeToStatus(err?.code);
      return failure(
        err?.message || "Database error",
        status,
        err?.code,
        err?.details
      );
    }

    if (!updateRes.data) {
      return failure("User not found", 404, "NOT_FOUND");
    }

    return success(updateRes.data, "User updated", 200);
  } catch (err: any) {
    console.error("Unhandled error updating user:", err);
    return failure("Internal server error", 500, "SERVER_ERROR", err?.message);
  }
}
// export async function PUT(request: NextRequest) {
//   try {
//     const { userId } = await auth();

//     if (!userId) {
//       return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
//     }

//     await connectDB();

//     const body = await request.json();
//     const { firstName, lastName, phone, addresses } = body;

//     const user = await User.findOneAndUpdate(
//       { clerkId: userId },
//       {
//         ...(firstName && { firstName }),
//         ...(lastName && { lastName }),
//         ...(phone && { phone }),
//         ...(addresses && { addresses }),
//       },
//       { new: true, runValidators: true }
//     );

//     if (!user) {
//       return NextResponse.json({ error: "User not found" }, { status: 404 });
//     }

//     return NextResponse.json(user);
//   } catch (error) {
//     console.error("Error updating user:", error);
//     return NextResponse.json(
//       { error: "Failed to update user" },
//       { status: 500 }
//     );
//   }
// }
