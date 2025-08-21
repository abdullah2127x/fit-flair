// Common tags used across all categories
export const commonTags: string[] = [
  "Casual",
  "Formal",
  "Party Wear",
  "Work Wear",
  "Everyday Wear",
  "Summer Collection",
  "Winter Collection",
  "Festive",
];

// Unstitched has no product-type tags, only common tags
export const unStitchedTags: string[] = [...commonTags];

// Ready-to-Wear subcategory tags
export const topTags: string[] = [
  "T-Shirt",
  "Polo",
  "Shirt",
  "Kurta",
  "Hoodie",
  "Sweater",
  "Jacket",
  "Blazer",
  ...commonTags
];

export const bottomTags: string[] = [
  "Trouser",
  "Jeans",
  "Shorts",
  "Skirt",
  ...commonTags
];

export const fullTags: string[] = [
  "Dress",
  "Abaya",
  "Jumpsuit",
  ...commonTags
];