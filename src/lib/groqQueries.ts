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

// export const filteredProductsQuery = (
//   page: number,
//   search?: string,
//   productFilter?: any
// ) => {
//   console.log("[filteredProductsQuery] called with:", {
//     page,
//     search,
//     productFilter,
//   });

//   const pageSize = 24;
//   const start = page * pageSize;
//   const end = start + pageSize - 1;
//   console.log("[filteredProductsQuery] paging:", { pageSize, start, end });

//   const isSearchingForFeaturedProducts = search
//     ?.toLowerCase()
//     .includes("feature");
//   console.log(
//     "[filteredProductsQuery] isSearchingForFeaturedProducts:",
//     isSearchingForFeaturedProducts
//   );

//   // --- 🧮 Price Ranges Parsing ---
//   const priceRangeArray =
//     productFilter?.priceRanges?.length > 0
//       ? productFilter.priceRanges.map((range: string) => {
//           console.log("[filteredProductsQuery] parsing price range:", range);
//           if (range.includes("+")) {
//             const start = parseFloat(
//               range.replace("$", "").replace("+", "").trim()
//             );
//             console.log("[filteredProductsQuery] parsed open-ended price:", {
//               start,
//               end: null,
//             });
//             return { start, end: null };
//           }
//           const [startPart, endPart] = range.split("-");
//           const start = parseFloat(startPart.replace("$", "").trim());
//           const end = endPart
//             ? parseFloat(endPart.replace("$", "").trim())
//             : null;
//           const parsedEnd = isNaN(end as number) ? null : end;
//           console.log("[filteredProductsQuery] parsed price range:", {
//             start,
//             end: parsedEnd,
//           });
//           return { start, end: parsedEnd };
//         })
//       : [];
//   console.log("[filteredProductsQuery] priceRangeArray:", priceRangeArray);

//   // --- Base Conditions ---
//   const conditions: string[] = [
//     `_type == "product"`,
//     `defined(title)`,
//     `defined(slug.current)`,
//     `defined(price)`,
//   ];
//   console.log("[filteredProductsQuery] initial conditions:", conditions);

//   const addCondition = (cond: string) => {
//     conditions.push(cond);
//     console.log("[filteredProductsQuery] added condition:", cond);
//   };

//   // --- Featured Filter ---
//   if (isSearchingForFeaturedProducts) {
//     addCondition(`isFeatured == true`);
//   }

//   // --- Search Filter ---
//   if (search && !isSearchingForFeaturedProducts) {
//     const safeSearch = search.replace(/"/g, '\\"');
//     const searchCond = `(
//       title match "${safeSearch}*" ||
//       subTitle match "${safeSearch}*" ||
//       brand->name match "${safeSearch}*" ||
//       "${safeSearch}" in relevantTags[]->value
//     )`;
//     addCondition(searchCond);
//   }

//   // --- Category Filter ---
//   if (productFilter?.categories?.length > 0) {
//     const categoriesList = productFilter.categories
//       .map((c: string) => `"${c}"`)
//       .join(", ");
//     // ✅ Use category->name since category is a reference field in Sanity
//     addCondition(`category->name in [${categoriesList}]`);
//   }

//   // --- Brand Filter ---
//   if (productFilter?.brands?.length > 0) {
//     const brandsList = productFilter.brands
//       .map((b: string) => `"${b}"`)
//       .join(", ");
//     // ✅ brand is a reference, so use brand->name
//     addCondition(`brand->name in [${brandsList}]`);
//   }

//   // --- Discount Filter ---
//   if (productFilter?.discounts?.length > 0) {
//     const discountsList = productFilter.discounts.join(", ");
//     // ✅ Numeric discount filter
//     addCondition(`discount in [${discountsList}]`);
//   }

//   // --- Ratings Filter ---
//   if (productFilter?.ratings?.length > 0) {
//     const ratingsList = productFilter.ratings.join(", ");
//     // ✅ round() ensures float ratings like 4.7 match filter 5
//     addCondition(`round(rating) in [${ratingsList}]`);
//   }

//   // --- Price Filter ---
//   if (priceRangeArray.length > 0) {
//     const priceConditions = priceRangeArray
//       .map(
//         (p: { start: number; end: number | null }) =>
//           `(price >= ${p.start}${p.end ? ` && price <= ${p.end}` : ""})`
//       )
//       .join(" || ");
//     addCondition(`(${priceConditions})`);
//   }

//   console.log("[filteredProductsQuery] final conditions:", conditions);

//   // --- Final Query ---
//   const query = `*[
//     ${conditions.join(" && ")}

//     ] | order(publishedAt desc) [${start}..${end}] ${productFields}`;
//   console.log("[filteredProductsQuery] finalQuery:", query);

//   return query;
// };

export const filteredProductsQuery = (
  page: number,
  search?: string,
  productFilter?: any
) => {
  console.log("[filteredProductsQuery] called with:", {
    page,
    search,
    productFilter,
  });

  const pageSize = 24;
  const start = page * pageSize;
  const end = start + pageSize - 1;
  console.log("[filteredProductsQuery] paging:", { pageSize, start, end });

  const isSearchingForFeaturedProducts = search
    ?.toLowerCase()
    .includes("feature");
  console.log(
    "[filteredProductsQuery] isSearchingForFeaturedProducts:",
    isSearchingForFeaturedProducts
  );

  // --- Base Conditions ---
  const conditions: string[] = [
    `_type == "product"`,
    `defined(title)`,
    `defined(slug.current)`,
    `defined(price)`,
  ];
  console.log("[filteredProductsQuery] initial conditions:", conditions);

  const addCondition = (cond: string) => conditions.push(cond);

  // --- Featured Filter ---
  if (isSearchingForFeaturedProducts) {
    addCondition(`isFeatured == true`);
  }

  // 🟩 SEARCH FILTER (smart, case-insensitive, full coverage)
  if (search && !isSearchingForFeaturedProducts) {
    const safeSearch = search.replace(/"/g, '\\"').toLowerCase();

    // Handle plural/singular equivalence like man ↔ men, woman ↔ women
    const altSearch =
      safeSearch === "man"
        ? "men"
        : safeSearch === "men"
          ? "man"
          : safeSearch === "woman"
            ? "women"
            : safeSearch === "women"
              ? "woman"
              : null;

    const allTerms = altSearch ? [safeSearch, altSearch] : [safeSearch];

    const searchConditions = allTerms.map(
      (term) => `(
      lower(title) match "${term}*" ||
      lower(subTitle) match "${term}*" ||
      lower(relevantTags[]) match "${term}*" ||
      lower(audience) match "${term}*" ||
      lower(category) match "${term}*" ||
      lower(subCategory) match "${term}*" ||
      lower(menOutfitType[]) match "${term}*" ||
      lower(womenOutfitType[]) match "${term}*" ||      
      count((season[])[lower(@) match "${term}*"]) > 0 ||
      count((designs[])[lower(@) match "${term}*"]) > 0 ||
      count((occasions[])[lower(@) match "${term}*"]) > 0 ||
      lower(fabric->name) match "${term}*" 
    )`
    );
    
    // Combine all with ORs if there are alternate spellings
    const combinedSearchCond = `(${searchConditions.join(" || ")})`;

    addCondition(combinedSearchCond);
  }

  // 🧍 AUDIENCE FILTER
  if (productFilter?.audience?.length > 0) {
    const list = productFilter.audience.map((a: string) => `"${a}"`).join(", ");
    addCondition(`audience in [${list}]`);
  }

  // 🏷 CATEGORY FILTER
  if (productFilter?.categories?.length > 0) {
    const list = productFilter.categories
      .map((c: string) => `"${c}"`)
      .join(", ");
    addCondition(`category in [${list}]`);
  }

  // 🧩 SUBCATEGORY FILTER
  if (productFilter?.subCategories?.length > 0) {
    const list = productFilter.subCategories
      .map((sc: string) => `"${sc}"`)
      .join(", ");
    addCondition(`subCategory in [${list}]`);
  }

  // 👕 OUTFIT TYPE FILTER (for men & women)
  if (productFilter?.outfitTypes?.length > 0) {
    const list = productFilter.outfitTypes
      .map((ot: string) => `"${ot}"`)
      .join(", ");
    addCondition(
      `(menOutfitType in [${list}] || womenOutfitType in [${list}])`
    );
  }

  // 🌦 SEASON FILTER
  if (productFilter?.seasons?.length > 0) {
    const conds = productFilter.seasons
      .map((s: string) => `"${s}" in season[]`)
      .join(" || ");
    addCondition(`(${conds})`);
  }

  // 🎨 DESIGN FILTER
  if (productFilter?.designs?.length > 0) {
    const conds = productFilter.designs
      .map((d: string) => `"${d}" in designs[]`)
      .join(" || ");
    addCondition(`(${conds})`);
  }

  // 🎉 OCCASION FILTER
  if (productFilter?.occasions?.length > 0) {
    const conds = productFilter.occasions
      .map((o: string) => `"${o}" in occasions[]`)
      .join(" || ");
    addCondition(`(${conds})`);
  }

  // 💸 DISCOUNT FILTER
  if (productFilter?.discounts?.length > 0) {
    const conds = productFilter.discounts
      .map((d: number) => `discount >= ${d}`)
      .join(" || ");
    addCondition(`(${conds})`);
  }

  // 💰 PRICE RANGE FILTER
  const priceRanges =
    productFilter?.priceRanges?.length > 0
      ? productFilter.priceRanges.map((range: string) => {
          if (range.includes("+")) {
            const start = parseFloat(
              range.replace("$", "").replace("+", "").trim()
            );
            return { start, end: null };
          }
          const [startPart, endPart] = range.split("-");
          const start = parseFloat(startPart.replace("$", "").trim());
          const end = endPart
            ? parseFloat(endPart.replace("$", "").trim())
            : null;
          return { start, end };
        })
      : [];

  if (priceRanges.length > 0) {
    const conds = priceRanges
      .map(
        (p: { start: number; end: number | null }) =>
          `(price >= ${p.start}${p.end ? ` && price <= ${p.end}` : ""})`
      )
      .join(" || ");
    addCondition(`(${conds})`);
  }

  // --- Final Query ---
  const query = `*[
    ${conditions.join(" && ")}
  ] | order(_createdAt desc) [${start}..${end}] ${productFields}`;
  console.log("[filteredProductsQuery] finalQuery:", query);

  return query;
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
