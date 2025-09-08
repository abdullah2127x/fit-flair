// queries.ts
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
  {
  "id": _id,
  title,
  subTitle,
  "slug": slug.current,
  price,
  "category": category,
  season,
  "subCategory": subCategory,
  "fabric": fabric->name,
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
    audience == "women" => menOutfitType,
    []
  ),
  discount
}`;

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
  {
  "id": _id,
  title,
  subTitle,
  "slug": slug.current,
  price,
  "category": category,
  season,
  "subCategory": subCategory,
  "fabric": fabric->name,
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
    audience == "women" => menOutfitType,
    []
  ),
  discount
}`;

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
  {
  "id": _id,
  title,
  subTitle,
  "slug": slug.current,
  price,
  "category": category,
  season,
  "subCategory": subCategory,
  "fabric": fabric->name,
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
    audience == "women" => menOutfitType,
    []
  ),
  discount
}`;
