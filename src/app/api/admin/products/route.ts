import { NextRequest } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { isAdminClerkId } from "@/lib/utils";
import { failure, success } from "@/lib/response";
import writeClient from "@/sanity/lib/writeClient";
import { client as readClient } from "@/sanity/lib/client";
import { productFields } from "@/lib/groqQueries";

// with images
// Create a product in Sanity (basic fields; images should be uploaded separately via Sanity asset API or studio)
// export async function POST(request: NextRequest) {
//   try {
//     // 🔐 Admin check
//     const { userId } = await auth();
//     if (!userId || !isAdminClerkId(userId)) {
//       console.log("forbidden");
//       return failure("Forbidden", 403);
//     }

//     // 🧩 Get the FormData (not JSON!)
//     const formData = await request.formData();

//     // 🔹 Extract basic fields
//     const title = formData.get("title") as string;
//     const subTitle = formData.get("subTitle") as string;
//     const audience = formData.get("audience") as string;
//     const category = formData.get("category") as string;
//     const subCategory = formData.get("subCategory") as string;
//     const fabric = formData.get("fabric") as string;
//     const price = Number(formData.get("price"));
//     const description = formData.get("description") as string;

//     // 🧩 Extract variants
//     const variants: {
//       color: string;
//       stock: number;
//       featuredImage: File | null;
//       additionalImages: File[];
//     }[] = [];

//     for (let i = 0; formData.has(`variants[${i}][color]`); i++) {
//       const color = formData.get(`variants[${i}][color]`) as string;
//       const stock = Number(formData.get(`variants[${i}][stock]`));
//       const featuredImage = formData.get(
//         `variants[${i}][featuredImage]`
//       ) as File | null;

//       const additionalImages: File[] = [];
//       let j = 0;
//       while (formData.has(`variants[${i}][additionalImages][${j}]`)) {
//         additionalImages.push(
//           formData.get(`variants[${i}][additionalImages][${j}]`) as File
//         );
//         j++;
//       }

//       variants.push({ color, stock, featuredImage, additionalImages });
//     }

//     console.log("🧩 Received Variants:", variants);

//     // 🖼️ Upload each variant’s images to Sanity
//     const uploadedVariants = await Promise.all(
//       variants.map(async (variant) => {
//         // Upload Featured Image
//         let featuredImageRef = null;
//         if (variant.featuredImage) {
//           const fd = new FormData();
//           fd.append("file", variant.featuredImage);

//           const uploadRes = await fetch(
//             `https://${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}.api.sanity.io/v2025-01-15/assets/images/${process.env.NEXT_PUBLIC_SANITY_DATASET}`,
//             {
//               method: "POST",
//               headers: {
//                 Authorization: `Bearer ${process.env.SANITY_API_TOKEN}`,
//               },
//               body: fd,
//             }
//           );

//           const asset = await uploadRes.json();
//           featuredImageRef = {
//             _type: "image",
//             asset: { _type: "reference", _ref: asset._id },
//           };
//         }

//         // Upload Additional Images
//         const additionalImageRefs: any[] = [];
//         for (const file of variant.additionalImages) {
//           const fd = new FormData();
//           fd.append("file", file);

//           const uploadRes = await fetch(
//             `https://${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}.api.sanity.io/v2025-01-15/assets/images/${process.env.NEXT_PUBLIC_SANITY_DATASET}`,
//             {
//               method: "POST",
//               headers: {
//                 Authorization: `Bearer ${process.env.SANITY_API_TOKEN}`,
//               },
//               body: fd,
//             }
//           );

//           const asset = await uploadRes.json();
//           additionalImageRefs.push({
//             _type: "image",
//             asset: { _type: "reference", _ref: asset._id },
//           });
//         }

//         return {
//           color: { _type: "reference", _ref: variant.color },
//           stock: variant.stock,
//           featuredImage: featuredImageRef,
//           additionalImages: additionalImageRefs,
//         };
//       })
//     );

//     console.log("✅ Uploaded Variants:", uploadedVariants);

//     // 🧾 Prepare Sanity document
//     const doc = {
//       _type: "product",
//       title,
//       subTitle,
//       audience,
//       category,
//       subCategory,
//       fabric: { _type: "reference", _ref: fabric },
//       price,
//       description,
//       variants: uploadedVariants,
//       slug: {
//         _type: "slug",
//         current: title.toLowerCase().split(" ").join("-"),
//       },
//       createdAt: new Date().toISOString(),
//     };

//     console.log("📝 Final Sanity doc:", doc);

//     // Uncomment to actually create the product in Sanity
//     const created = await writeClient.create(doc);
//     return success(created, "Product created", 201);

//     // return success(doc, "Product prepared (mocked)", 201);
//   } catch (err: any) {
//     console.error("❌ Admin create product error:", err);
//     return failure("Internal server error", 500, "SERVER_ERROR", err?.message);
//   }
// }

// without images
// export async function POST(request: NextRequest) {
//   try {
//     const { userId } = await auth();
//     if (!userId || !isAdminClerkId(userId)) {
//       console.log("forbidden");
//       return failure("Forbidden", 403);
//     }

//     const body = await request.json();
//     console.log(
//       "In the admin products route the body got in the post method is :",
//       body
//     );
//     const uploadedVariants = await Promise.all(
//       body.variants.map(
//         async (variant: {
//           color: string;
//           featuredImage: File | null;
//           additionalImages: File[];
//           stock: number;
//         }) => {
//           // Upload Featured Image
//           let featuredImageRef = null;
//           if (variant.featuredImage) {
//             const formData = new FormData();
//             formData.append("file", variant.featuredImage); // File object

//             const uploadRes = await fetch(
//               `https://${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}.api.sanity.io/v2025-01-15/assets/images/${process.env.NEXT_PUBLIC_SANITY_DATASET}`,
//               {
//                 method: "POST",
//                 headers: {
//                   Authorization: `Bearer ${process.env.SANITY_API_TOKEN}`,
//                 },
//                 body: formData,
//               }
//             );

//             const asset = await uploadRes.json();
//             featuredImageRef = {
//               _type: "image",
//               asset: { _type: "reference", _ref: asset._id },
//             };
//           }

//           // Upload Additional Images
//           const additionalImageRefs = [];
//           if (variant.additionalImages?.length) {
//             for (const file of variant.additionalImages) {
//               const formData = new FormData();
//               formData.append("file", file);

//               const uploadRes = await fetch(
//                 `https://${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}.api.sanity.io/v2025-01-15/assets/images/${process.env.NEXT_PUBLIC_SANITY_DATASET}`,
//                 {
//                   method: "POST",
//                   headers: {
//                     Authorization: `Bearer ${process.env.SANITY_API_TOKEN}`,
//                   },
//                   body: formData,
//                 }
//               );

//               const asset = await uploadRes.json();
//               additionalImageRefs.push({
//                 _type: "image",
//                 asset: { _type: "reference", _ref: asset._id },
//               });
//             }
//           }

//           return {
//             color: variant.color,
//             featuredImage: featuredImageRef,
//             additionalImages: additionalImageRefs,
//             stock: variant.stock,
//           };
//         }
//       )
//     );

//     console.log("the loaded variants are :", uploadedVariants);

//     // Validate required fields based on Sanity schema
//     const required = [
//       "title",
//       "subTitle",
//       "audience",
//       "subCategory",
//       "season",
//       "designs",
//       "occasions",
//       "fabric",
//       "price",
//       "variants",
//       "description",
//     ];
//     const missing = required.filter(
//       (k) => body[k] === undefined || body[k] === null || body[k] === ""
//     );
//     if (missing.length) {
//       return failure(
//         `Missing required fields: ${missing.join(", ")}`,
//         400,
//         "VALIDATION_ERROR"
//       );
//     }

//     // Prepare Sanity document
//     const doc = {
//       _type: "product",
//       title: body.title,
//       subTitle: body.subTitle,
//       audience: body.audience,
//       category: body.category,
//       subCategory: body.subCategory,
//       menOutfitType: body.menOutfitType,
//       womenOutfitType: body.womenOutfitType,
//       season: body.season,
//       designs: body.designs,
//       occasions: body.occasions,
//       // fabric: { _type: "reference", _ref: body.fabric },
//       fabric: body.fabric, // <- this will be {_type: "reference", _ref: "..."}
//       // other fields...
//       price: body.price,
//       discount: body.discount ?? 0,
//       variants: (body.variants || []).map((v: any) => ({
//         _type: "object",
//         color: v.color ? { _type: "reference", _ref: v.color } : undefined,
//         featuredImage: v.featuredImage, // expect already-uploaded asset ref
//         additionalImages: v.additionalImages || [],
//         stock: v.stock,
//       })),
//       relevantTags: body.relevantTags || [],
//       isFeatured: !!body.isFeatured,
//       isNewArrival: !!body.isNewArrival,
//       isPopular: !!body.isPopular,
//       description: body.description,
//     };
//     console.log("The doc is in the route :", doc);
//     // const created = await writeClient.create(doc);
//     // return success(created, "Product created", 201);
//     return success(doc, "Product created", 201);
//   } catch (err: any) {
//     console.error("Admin create product error:", err);
//     return failure("Internal server error", 500, "SERVER_ERROR", err?.message);
//   }
// }


// List products from Sanity (basic fields)
export async function GET(request: NextRequest) {
  try {
    const { userId } = await auth();
    if (!userId || !isAdminClerkId(userId)) {
      return failure("Forbidden", 403);
    }

    const { searchParams } = new URL(request.url);
    const query = searchParams.get("q") || "";
    const limit = parseInt(searchParams.get("limit") || "20");
    const page = parseInt(searchParams.get("page") || "0");
    const start = page * limit;
    const end = start + limit - 1;
    // here is the logic to apply the filter to search products
    const groq = `*[_type == "product" && (${query ? `title match $q || subTitle match $q` : "true"})] | order(_createdAt desc)[${start}..${end}]
    ${productFields}
    `;

    const products = await readClient.fetch(groq, { q: `${query}*`, limit });
    console.log("The new products are :", products);
    return success(products, "Products fetched", 200);
  } catch (err: any) {
    console.error("Admin products endpoint: Error:", err);
    return failure("Internal server error", 500, "SERVER_ERROR", err?.message);
  }
}
