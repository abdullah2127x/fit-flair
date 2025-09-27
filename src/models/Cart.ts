import { ICart, ICartItem } from "@/types/cart";
import mongoose, { Schema, Document } from "mongoose";

// export interface ICartItem {
//   productId: string;
//   productTitle: string;
//   productSlug: string;
//   subTitle: string;
//   price: number;
//   discount: number;
//   imageSrc: string;
//   colorName: string;
//   quantity: number;
// }



const CartItemSchema = new Schema<ICartItem>({
  productId: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  slug: {
    type: String,
    required: true,
  },
  subTitle: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  },
  discount: {
    type: Number,
    default: 0,
    min: 0,
    max: 100,
  },
  imageSrc: {
    type: String,
    required: true,
  },
  colorName: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    min: 1,
  },
});

const CartSchema = new Schema<ICart>(
  {
    userId: {
      type: String,
      required: true,
      unique: true,
    },
    items: [CartItemSchema],
  },
  {
    timestamps: true,
  }
);

// Indexes
// CartSchema.index({ userId: 1 });

// Virtual for total items count
CartSchema.virtual("totalItems").get(function () {
  return this.items.reduce((total, item) => total + item.quantity, 0);
});

// Virtual for subtotal
CartSchema.virtual("subtotal").get(function () {
  return this.items.reduce((total, item) => {
    const discountedPrice = item.price - (item.price * item.discount) / 100;
    return total + discountedPrice * item.quantity;
  }, 0);
});

// Ensure virtual fields are serialized
CartSchema.set("toJSON", { virtuals: true });
CartSchema.set("toObject", { virtuals: true });

export default mongoose.models.Cart ||
  mongoose.model<ICart>("Cart", CartSchema);
