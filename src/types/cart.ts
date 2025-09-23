// types/cart.ts
import { ProductDetailSchema, ProductVariantSchema } from "@/types/product";

// export interface CartItem {
//   productId: string;
//   slug: string;
//   title: string;
//   price: number;
//   discount: number;
//   featuredImage: string;
//   variant: ProductVariantSchema; // selected variant
//   quantity: number;
// }



export interface CartItem {
  productId: string;
  slug: string;
  title: string;
  subTitle: string;
  price: number;
  discount: number;
  imageSrc:string;
  colorName:string
  quantity?: number;
}
