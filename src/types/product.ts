// product.ts

export interface ProductShowcaseSchema {
  id: string;
  slug: string; // URL-friendly identifier
  title: string;
  src: string;
  subTitle: string;
  price: number;
  discount?: number;
  colorName: string;
  tags: string[];
}

export interface ProductCollectionSchema {
  id: string;
  slug: string;
  title: string;
  src: string;
}

// types/product.ts
export interface ProductVariantSchema {
  stock: number;
  featuredImage: string;
  additionalImages: string[];
  colorName: string;
  colorCode: string;
}

export interface ProductDetailSchema {
  id: string;
  slug: string;
  title: string;
  subTitle: string;
  price: number;
  discount: number;
  category: string;
  subCategory: string;
  fabric: string;
  audience: string;
  designs: string[];
  occasions: string[];
  season: string[]; // optional season
  variants: ProductVariantSchema[];
  description: string;
  uploadedAt: string;
  isFeatured: boolean;
  isNewArrival: boolean;
  isPopular: boolean;
  relevantTags?: string[];
  outFitType: string;
}

export interface QuickViewProductSchema {
  id: string;
  slug: string; // URL-friendly identifier
  title: string;
  subTitle: string;
  fabric: string; // fabric type
  price: number; // price in appropriate currency
  discount: number; // optional discount percentage
  category: string; // main category
  subCategory: string; // optional sub-category
  audience: string; // target audience
  season: string[]; // optional season
  designs: string[]; // array of design names
  occasions: string[]; // array of occasion names
  variant: ProductVariantSchema;
  outFitType: string; // optional outfit types
  description: string; // product description
  uploadedAt: string; // upload date as ISO string
}
