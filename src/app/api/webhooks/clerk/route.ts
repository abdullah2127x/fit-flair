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
import DatabaseService from "@/lib/database"; // your DB methods

export async function POST(req: Request) {
  const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET;
  if (!WEBHOOK_SECRET) {
    console.error("❌ [Stage 0] Missing CLERK_WEBHOOK_SECRET");
    throw new Error("Missing CLERK_WEBHOOK_SECRET");
  }

  console.log("📩 [Stage 1] Clerk webhook received");

  // 1. Extract headers
  const headerPayload = headers();
  const svix_id = (await headerPayload).get("svix-id");
  const svix_timestamp = (await headerPayload).get("svix-timestamp");
  const svix_signature = (await headerPayload).get("svix-signature");

  if (!svix_id || !svix_timestamp || !svix_signature) {
    console.error("❌ [Stage 1.1] Missing Svix headers");
    return NextResponse.json({ error: "Missing Svix headers" }, { status: 400 });
  }
  console.log("✅ [Stage 1.2] Svix headers found:", {
    svix_id,
    svix_timestamp,
  });

  // 2. Verify payload
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
    console.log("✅ [Stage 2] Webhook verified");
  } catch (err) {
    console.error("❌ [Stage 2] Webhook verification failed:", err);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  // 3. Handle events
  const eventType = evt.type;
  const data = evt.data;
  console.log(`📢 [Stage 3] Event received: ${eventType}`);

  try {
    if (eventType === "user.created") {
      console.log("👤 [Stage 3.1] Creating user in DB with:", {
        clerkId: data.id,
        email: data.email_addresses[0]?.email_address,
      });
      await DatabaseService.createUser({
        clerkId: data.id,
        email: data.email_addresses[0]?.email_address,
        firstName: data.first_name,
        lastName: data.last_name,
        phone: data.phone_numbers[0]?.phone_number,
        addresses: [],
        orders: [],
      });
      console.log("✅ [Stage 3.1] User created successfully in DB");
    }

    if (eventType === "user.updated") {
      console.log(`🔄 [Stage 3.2] Updating user in DB with ID: ${data.id}`);
      await DatabaseService.updateUser(data.id, {
        email: data.email_addresses[0]?.email_address,
        firstName: data.first_name,
        lastName: data.last_name,
        phone: data.phone_numbers[0]?.phone_number,
      });
      console.log("✅ [Stage 3.2] User updated successfully in DB");
    }

    if (eventType === "user.deleted") {
      console.log(`🗑️ [Stage 3.3] User deleted in Clerk: ${data.id}`);
      // optional: mark inactive in DB
    }

    console.log("🎉 [Stage 4] Webhook processed successfully");
    return NextResponse.json({ received: true });
  } catch (error) {
    console.error("❌ [Stage 4] Error processing Clerk webhook:", error);
    return NextResponse.json(
      { error: "Webhook handling failed" },
      { status: 500 }
    );
  }
}
