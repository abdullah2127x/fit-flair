// queries.ts
// groq query for product detail and define queries types, product detail schema

// Common projection (fields to fetch for any product)
const productFields = `{
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
    [] // fallback empty array
  ),
}`;

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
