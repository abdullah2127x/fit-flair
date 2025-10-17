// queries.ts
// groq query for product detail and define queries types, product detail schema

import { groq } from "next-sanity";

// Common projection (fields to fetch for any product)
export const productFields = `{
  "id": _id,
  title,
  subTitle,
  "slug": slug.current,
  price,
  "category": category,
  season,
  "subCategory": subCategory,
  "fabric": fabric->name,
  designs,
  occasions,
  "audience": audience,
  variants[] {
    stock,
    "featuredImage": featuredImage.asset->url,
    "additionalImages": additionalImages[].asset->url,
    "colorName": color->name,
    "colorCode": color->code
  },
  "description": pt::text(description),
  "uploadedAt": _createdAt,
  isFeatured,
  isNewArrival,
  isPopular,
  relevantTags,
  "outFitType": select(
    audience == "men" => menOutfitType,
    audience == "women" => womenOutfitType,
    []
  ),
  discount
}`;

// for product showcase
export const allProductsQuery = (page: number) => {
  const pageSize = 24;
  const start = page * pageSize;
  const end = start + pageSize - 1;

  return `*[
    _type == "product" &&
    // isFeatured == true &&
    defined(title) &&
    defined(slug.current) &&
    defined(description) &&
    defined(price) &&
    defined(variants)
  ] | order(publishedAt desc)
    [${start}..${end}]
    ${productFields}
  `;
};




export const filteredProductsQuery = (
  page: number,
  search?: string,
  productFilter?: any
) => {
  const pageSize = 24;
  const start = page * pageSize;
  const end = start + pageSize - 1;

  const isSearchingForFeaturedProducts = search?.toLowerCase().includes("feature");

  // --- Price range filter ---
  const priceRangeArray =
    productFilter?.priceRanges?.length > 0
      ? productFilter.priceRanges.map((range: string) => {
          const [startPart, endPart] = range.split("-");
          const start = parseFloat(startPart.replace("$", "").trim());
          let end: any = endPart
            ? parseFloat(endPart.replace("$", "").trim())
            : null;
          if (isNaN(end)) end = null;
          return { start, end };
        })
      : [];

  // --- Build conditions dynamically ---
  const conditions = [
    `_type == "product"`,
    `defined(title)`,
    `defined(slug.current)`,
    `defined(price)`,
    `defined(variants)`,
  ];

  // Add filters
  if (isSearchingForFeaturedProducts) conditions.push(`isFeatured == true`);

  if (search && !isSearchingForFeaturedProducts) {
    conditions.push(`
      title match "${search}*" ||
      subTitle match "${search}*" ||
      brand->name match "${search}*" ||
      "${search}" in relevantTags[]->value
    `);
  }

  if (productFilter?.brands?.length > 0) {
    conditions.push(`brand->name in [${productFilter.brands
      .map((b: string) => `"${b}"`)
      .join(", ")}]`);
  }

  if (priceRangeArray.length > 0) {
    const priceConditions = priceRangeArray
      .map(
        (price: { start: number; end: number }) =>
          `(price >= ${price.start}${price.end != null ? ` && price <= ${price.end}` : ""})`
      )
      .join(" || ");
    conditions.push(`(${priceConditions})`);
  }

  if (productFilter?.categories?.length > 0) {
    conditions.push(`category in [${productFilter.categories
      .map((c: string) => `"${c}"`)
      .join(", ")}]`);
  }

  if (productFilter?.discounts?.length > 0) {
    conditions.push(`discount in [${productFilter.discounts.join(", ")}]`);
  }

  if (productFilter?.ratings?.length > 0) {
    conditions.push(`rating in [${productFilter.ratings.join(", ")}]`);
  }

  // --- Final GROQ query ---
  return `*[
    ${conditions.join(" && ")}
  ] | order(publishedAt desc) [${start}..${end}] ${productFields}`;
};


// for product showcase
export const featuredCollectionQuery = `*[
  _type == "product" &&
  isFeatured == true &&
  defined(title) &&
  defined(slug.current) &&
  defined(description) &&
  defined(price) &&
  defined(variants)
] | order(publishedAt desc)
    [0..11]
 ${productFields}
 `;

// for product showcase
export const newInQuery = `*[
  _type == "product" &&
  isNewArrival == true &&
  defined(title) &&
  defined(slug.current) &&
  defined(description) &&
  defined(price) &&
  defined(variants)
] | order(publishedAt desc)
    [0..7]
  ${productFields}`;

// for product showcase
export const popularQuery = `*[
  _type == "product" &&
  isPopular == true &&
  defined(title) &&
  defined(slug.current) &&
  defined(description) &&
  defined(price) &&
  defined(variants)
] | order(publishedAt desc)
    [0..7]
  ${productFields}`;

// for product showcase
export const specialOffersQuery = `*[
  _type == "product" &&
  defined(discount) && discount > 0 &&
  defined(title) &&
  defined(slug.current) &&
  defined(description) &&
  defined(price) &&
  defined(variants)
] | order(discount desc)
    [0..7]
  ${productFields}`;

type RelavantProductFilter = {
  currentId: string;
  category: string;
  subCategory?: string | null;
  fabric: string | null;
  season: string[] | null;
  designs: string[] | null;
  relevantTags?: string[] | null;
  occasions: string[] | null;
  sortOrder?: "asc" | "desc";
  limit: number;
};

export const relevantProductsQuery = ({
  currentId,
  category,
  subCategory,
  fabric,
  season,
  designs,
  relevantTags,
  occasions,
  sortOrder = "desc",
  limit = 4,
}: RelavantProductFilter) => {
  // Build filter conditions dynamically
  let filters = [
    `_type == "product"`,
    `defined(title)`,
    `defined(slug.current)`,
    `defined(description)`,
    `defined(price)`,
    `defined(variants)`,
  ];

  // Exclude current product
  if (currentId) filters.push(`_id != "${currentId}"`);

  // Apply category filter
  if (category) filters.push(`category == "${category}"`);

  // Apply subcategory filter
  if (subCategory) filters.push(`subCategory._ref == "${subCategory}"`);

  // Apply fabric filter
  if (fabric) filters.push(`fabric._ref == "${fabric}"`);

  // Apply season filter
  if (season && season.length > 0) {
    const seasonFilter = season.map((s) => `"${s}" == season`).join(" || ");
    filters.push(`(${seasonFilter})`);
  }

  // Apply designs filter
  if (designs && designs.length > 0) {
    const designsFilter = designs
      .map((design) => `"${design}" in designs`)
      .join(" || ");
    filters.push(`(${designsFilter})`);
  }

  // Apply tags filter
  if (relevantTags && relevantTags.length > 0) {
    const tagsFilter = relevantTags
      .map((tag) => `"${tag}" in relevantTags`)
      .join(" || ");
    filters.push(`(${tagsFilter})`);
  }

  // Apply occasions filter
  if (occasions && occasions.length > 0) {
    const occasionsFilter = occasions
      .map((occasion) => `"${occasion}" in occasions`)
      .join(" || ");
    filters.push(`(${occasionsFilter})`);
  }

  // Determine sort field
  let sortField = "_createdAt";

  return `
  *[${filters.join(" || ")}] | order(${sortField} ${sortOrder}) [0...${limit}] 
  ${productFields}`;
};

// need id
export const quickViewProductQuery = ({
  productId,
  colorName,
}: {
  productId: string;
  colorName: string;
}) => `*[
    _type == "product" &&
    _id == "${productId}" &&
    "${colorName}" in variants[].color->name &&
    defined(title) &&
    defined(slug.current) &&
    defined(description) &&
    defined(price) &&
    defined(variants)
][0]
  {
  "id":_id,
  title,
  subTitle,
  "slug": slug.current,
  price,
  discount,
  category,
  subCategory,
  "fabric": fabric->name,
  "audience": audience,
  designs,
  season,
  occasions,
  "variant": variants[ color->name == "${colorName}" ][0]{
    stock,
    "featuredImage": featuredImage.asset->url,
    "additionalImages": additionalImages[].asset->url,
    "colorName": color->name,
    "colorCode": color->code,
  },
  "description": pt::text(description),
  "uploadedAt":_createdAt,
  "outFitType": select(
    audience == "men" => menOutfitType,
    audience == "women" => womenOutfitType,
    "" // fallback empty array
  ),
}`;

// lib/GroqQueries.ts
export const productDetailQuery = (slug: string) => {
  return groq`*[_type == "product" && slug.current == "${slug}"][0]{
    "id": _id,
    title,
    subTitle,
    "slug": slug.current,
    price,
    discount,
    "category": category,
    "subCategory": subCategory,
    "fabric": fabric->name,
    "audience": audience,
    designs,
    occasions,
    "variants": variants[] {
      stock,
      "featuredImage": featuredImage.asset->url,
      "additionalImages": additionalImages[].asset->url,
      "colorName": color->name,
      "colorCode": color->code,
    },
    "description": pt::text(description),
    "uploadedAt": _createdAt,
    isFeatured,
    isNewArrival,
    isPopular,
    relevantTags,
    "outFitType": select(
      audience == "men" => menOutfitType,
      audience == "women" => womenOutfitType,
      "" // fallback empty string
    )
  }`;
};

// export const relevantProductsQuery = (category: string, excludeId: string) => {
//   return groq`*[_type == "product" && category == $category && _id != $excludeId][0..3]{
//     "id": _id,
//     title,
//     subTitle,
//     "slug": slug.current,
//     price,
//     discount,
//     "category": category,
//     "subCategory": subCategory,
//     "fabric": fabric->name,
//     "audience": audience,
//     "variant": variants[0] {
//       stock,
//       "featuredImage": featuredImage.asset->url,
//       "colorName": color->name,
//       "colorCode": color->code,
//     },
//     "uploadedAt": _createdAt,
//     isFeatured,
//     isNewArrival,
//     isPopular,
//   }`;
// };

// Query for the main product page based on slug
export const fullProductQuery = `
*[_type == "product" && slug.current == $slug][0] {
  "id": _id,
  title,
  subTitle,
  "slug": slug.current,
  price,
  discount,
  "category": category->name,
  "subCategory": subCategory->name,
  "fabric": fabric->name,
  audience,
  designs,
  occasions,
  variants[] {
    stock,
    "featuredImage": featuredImage.asset->url,
    "additionalImages": additionalImages[].asset->url,
    "colorName": color->name,
    "colorCode": color->code
  },
  "description": pt::text(description),
  "uploadedAt": _createdAt,
  isFeatured,
  isNewArrival,
  isPopular,
  "relevantTags": relevantTags[].value,
  "outFitType": select(
    audience == "men" => menOutfitType,
    audience == "women" => womenOutfitType,
    []
  )
}
`;

// export const productDetailQuery = (productId: string,colorName:string) => `*[
//     _type == "product" &&
//     _id == "${productId}" &&
//     defined(title) &&
//     defined(slug.current) &&
//     defined(description) &&
//     defined(price) &&
//     defined(variants)
// ][0]
//   {
//   "id":_id,
//   title,
//   subTitle,
//   "slug": slug.current,
//   price,
//   discount,
//   "category": category,
//   "subCategory": subCategory,
//   "fabric": fabric->name,
//   "audience": audience,
//   designs,
//   occasions,
//   variants[] {
//     stock,
//     "featuredImage": featuredImage.asset->url,
//     "additionalImages": additionalImages[].asset->url,
//     "colorName": color->name,
//     "colorCode": color->code,
//   },
//   "description": pt::text(description),
//   "uploadedAt":_createdAt,
//   isFeatured,
//   isNewArrival,
//   isPopular,
//   relevantTags,
//   "outFitType": select(
//     audience == "men" => menOutfitType,
//     audience == "women" => menOutfitType,
//     [] // fallback empty array
//   ),

// }`;
