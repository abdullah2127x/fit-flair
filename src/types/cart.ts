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

export interface ICartItem {
  productId: string;
  title: string;
  slug: string;
  subTitle: string;
  price: number;
  discount: number;
  imageSrc: string;
  colorName: string;
  quantity: number;
}

export interface ICart {
  _id: string;
  userId: string;
  items: ICartItem[];
  totalItems: number;
  subtotal: number;
  createdAt: string;
  updatedAt: string;
}

// export interface ICart extends Document {
//   _id: string;
//   userId: string;
//   items: ICartItem[];
//   createdAt: Date;
//   updatedAt: Date;
// }