// import { Webhook } from "svix";
// import { headers } from "next/headers";
// import { NextResponse } from "next/server";
// import DatabaseService from "@/lib/database"; // your DB methods

// // Clerk sends signed webhooks via Svix
// export async function POST(req: Request) {
//   const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET;
//   if (!WEBHOOK_SECRET) {
//     throw new Error("Missing CLERK_WEBHOOK_SECRET");
//   }

//   // 1. Extract headers for verification
//   const headerPayload = headers();
//   const svix_id = (await headerPayload).get("svix-id");
//   const svix_timestamp = (await headerPayload).get("svix-timestamp");
//   const svix_signature = (await headerPayload).get("svix-signature");

//   if (!svix_id || !svix_timestamp || !svix_signature) {
//     return NextResponse.json({ error: "Missing Svix headers" }, { status: 400 });
//   }

//   // 2. Verify the payload
//   const payload = await req.json();
//   const body = JSON.stringify(payload);

//   const wh = new Webhook(WEBHOOK_SECRET);

//   let evt: any;
//   try {
//     evt = wh.verify(body, {
//       "svix-id": svix_id,
//       "svix-timestamp": svix_timestamp,
//       "svix-signature": svix_signature,
//     });
//   } catch (err) {
//     console.error("Webhook verification failed:", err);
//     return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
//   }

//   // 3. Handle events
//   const eventType = evt.type;
//   const data = evt.data;

//   try {
//     if (eventType === "user.created") {
//       await DatabaseService.createUser({
//         clerkId: data.id,
//         email: data.email_addresses[0]?.email_address,
//         firstName: data.first_name,
//         lastName: data.last_name,
//         phone: data.phone_numbers[0]?.phone_number,
//         addresses: [],
//         orders: [],
//       });
//     }

//     if (eventType === "user.updated") {
//       await DatabaseService.updateUser(data.id, {
//         email: data.email_addresses[0]?.email_address,
//         firstName: data.first_name,
//         lastName: data.last_name,
//         phone: data.phone_numbers[0]?.phone_number,
//       });
//     }

//     if (eventType === "user.deleted") {
//       // optional: mark user as deleted or actually delete
//       console.log("User deleted:", data.id);
//     }

//     return NextResponse.json({ received: true });
//   } catch (error) {
//     console.error("Error processing Clerk webhook:", error);
//     return NextResponse.json({ error: "Webhook handling failed" }, { status: 500 });
//   }
// }

import { Webhook } from "svix";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import DatabaseService from "@/lib/database";

export async function POST(req: Request) {
  const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET;
  if (!WEBHOOK_SECRET) {
    console.error("❌ Missing CLERK_WEBHOOK_SECRET");
    throw new Error("Missing CLERK_WEBHOOK_SECRET");
  }

  console.log("📩 Clerk webhook received");

  // 1️⃣ Extract headers
  const headerPayload = headers();
  const svix_id = (await headerPayload).get("svix-id");
  const svix_timestamp = (await headerPayload).get("svix-timestamp");
  const svix_signature = (await headerPayload).get("svix-signature");

  if (!svix_id || !svix_timestamp || !svix_signature) {
    console.error("❌ Missing Svix headers");
    return NextResponse.json(
      { error: "Missing Svix headers" },
      { status: 400 }
    );
  }

  // 2️⃣ Verify payload
  const payload = await req.json();
  const body = JSON.stringify(payload);

  const wh = new Webhook(WEBHOOK_SECRET);

  let evt: any;
  try {
    evt = wh.verify(body, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    });
    console.log("✅ Webhook verified");
  } catch (err) {
    console.error("❌ Webhook verification failed:", err);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  // 3️⃣ Helper function to handle DB operations
  const handleUserEvent = async (type: string, data: any) => {
    const userData = {
      clerkId: data.id,
      email: data.email_addresses?.[0]?.email_address,
      firstName: data.first_name,
      lastName: data.last_name,
      phone: data.phone_numbers?.[0]?.phone_number,
      addresses: [],
      orders: [],
    };

    switch (type) {
      case "user.created":
        console.log("👤 Creating user in DB:", userData);
        await DatabaseService.createUser(userData);
        break;

      case "user.updated":
        console.log("🔄 Updating user in DB:", userData);
        await DatabaseService.updateUser(data.id, userData);
        break;

      case "user.deleted":
        console.log("🗑️ User deleted in Clerk:", data.id);
        await DatabaseService.deleteUser(data.id);
        break;

      default:
        console.warn("⚠️ Unhandled event type:", type);
    }
  };

  // 4️⃣ Process event
  try {
    await handleUserEvent(evt.type, evt.data);
    console.log("🎉 Webhook processed successfully");
    return NextResponse.json({ received: true });
  } catch (error) {
    console.error("❌ Error processing webhook:", error);
    return NextResponse.json(
      { error: "Webhook handling failed" },
      { status: 500 }
    );
  }
}
