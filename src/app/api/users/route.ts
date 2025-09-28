import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import DatabaseService from "@/lib/database";
import { success, failure } from "@/lib/response";
import { mapDbCodeToStatus } from "@/utilityFunctions/mapDbCodeToStatus";
import { DbErrorCode } from "@/types/database";

export async function GET() {
  try {
    console.log("get req come to users route");
    const { userId } = await auth();

    if (!userId) {
      console.log("IN the get user endpoint user is not logged in! ");
      return failure("Unauthorized", 401);
    }

    // getUserByClerkId returns DBResponse<User | null>
    console.log("IN the get user endpoint user has logged in! ");
    const userRes = await DatabaseService.getUserByClerkId(userId);
    console.log("The user res from the data base that already exist.", userRes);

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

    return success(userRes.data, "User fetched", 200);
  } catch (err: any) {
    console.error("Unhandled error fetching user:", err);
    return failure("Internal server error", 500, "SERVER_ERROR", err?.message);
  }
}


// just create and if there is already the user so database return the error dublicate key
export async function POST(request: NextRequest) {
  try {
    console.log("Req come to POST /users");

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
    console.error("Unhandled error creating/upserting user:", err);
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

export async function DELETE() {
  try {
    console.log("Req come to DELETE /users");

    const { userId } = await auth();
    if (!userId) {
      return failure("Unauthorized", 401);
    }

    // call service layer to delete by clerkId
    const deleteRes = await DatabaseService.deleteUser(userId);

    if (!deleteRes.success) {
      const err = deleteRes.error;
      const status = mapDbCodeToStatus(err?.code);
      return failure(
        err?.message || "Database error",
        status,
        err?.code,
        err?.details
      );
    }

    if (!deleteRes.data) {
      return failure("User not found", 404, "NOT_FOUND");
    }

    return success(deleteRes.data, "User deleted", 200);
  } catch (err: any) {
    console.error("Unhandled error deleting user:", err);
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
