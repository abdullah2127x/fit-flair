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

export interface QuickViewProductSchema {
  id: string;
  slug: string; // URL-friendly identifier  
  title: string;
  subTitle: string;
  fabric: string; // fabric type
  price: number; // price in appropriate currency
  discount: number; // optional discount percentage
  category: string; // main category
  subCategory?: string; // optional sub-category
  audience: string; // target audience
  season?: string; // optional season
  designs?: string[]; // array of design names
  occasions?: string[]; // array of occasion names
  variant: {
    stock: number; // stock quantity
    featuredImage: string; // URL of the featured image
    additionalImages: string[]; // URLs of additional images
    colorName: string; // name of the color
    colorCode: string; // hex code of the color
  };
  outFitType?: string[]; // optional outfit types
  description?: string; // product description
  uploadedAt: string; // upload date as ISO string
}
