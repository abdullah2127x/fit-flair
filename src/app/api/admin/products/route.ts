import { NextRequest } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { isAdminClerkId } from "@/lib/utils";
import { failure, success } from "@/lib/response";
import writeClient from "@/sanity/lib/writeClient";
import { client as readClient } from "@/sanity/lib/client";
import { productFields } from "@/lib/groqQueries";

// Create a product in Sanity (basic fields; images should be uploaded separately via Sanity asset API or studio)
export async function POST(request: NextRequest) {
  try {
    const { userId } = await auth();
    if (!userId || !isAdminClerkId(userId)) {
      console.log("forbidden");
      return failure("Forbidden", 403);
    }

    const body = await request.json();
    // Validate required fields based on Sanity schema
    const required = [
      "title",
      "subTitle",
      "audience",
      "subCategory",
      "season",
      "designs",
      "occasions",
      "fabric",
      "price",
      "variants",
      "description",
    ];
    const missing = required.filter(
      (k) => body[k] === undefined || body[k] === null || body[k] === ""
    );
    if (missing.length) {
      return failure(
        `Missing required fields: ${missing.join(", ")}`,
        400,
        "VALIDATION_ERROR"
      );
    }

    // Prepare Sanity document
    const doc: any = {
      _type: "product",
      title: body.title,
      subTitle: body.subTitle,
      audience: body.audience,
      category: body.category,
      subCategory: body.subCategory,
      menOutfitType: body.menOutfitType,
      womenOutfitType: body.womenOutfitType,
      season: body.season,
      designs: body.designs,
      occasions: body.occasions,
      // fabric: { _type: "reference", _ref: body.fabric },
      fabric: body.fabric, // <- this will be {_type: "reference", _ref: "..."}
      // other fields...
      price: body.price,
      discount: body.discount ?? 0,
      variants: (body.variants || []).map((v: any) => ({
        _type: "object",
        color: v.color ? { _type: "reference", _ref: v.color } : undefined,
        featuredImage: v.featuredImage, // expect already-uploaded asset ref
        additionalImages: v.additionalImages || [],
        stock: v.stock,
      })),
      relevantTags: body.relevantTags || [],
      isFeatured: !!body.isFeatured,
      isNewArrival: !!body.isNewArrival,
      isPopular: !!body.isPopular,
      description: body.description,
    };
    const created = await writeClient.create(doc);
    return success(created, "Product created", 201);
  } catch (err: any) {
    console.error("Admin create product error:", err);
    return failure("Internal server error", 500, "SERVER_ERROR", err?.message);
  }
}

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
    // here is the logic to apply the filter to search products
    const groq = `*[_type == "product" && (${query ? `title match $q || subTitle match $q` : "true"})] | order(_createdAt desc)[0...${limit}]
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
