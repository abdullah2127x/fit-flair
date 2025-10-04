import { IOrder } from "@/types/order";
import mongoose, { Schema } from "mongoose";
import { CartItemSchema } from "./Cart";
import { AddressSchema } from "./User";

const OrderSchema = new Schema<IOrder>(
  {
    orderNumber: {
      type: String,
      // required: true,
      unique: true,
    },
    userId: {
      type: String,
      required: true,
    },
    items: [CartItemSchema],
    subTotal: {
      type: Number,
      required: true,
      min: 0,
    },
    shippingCost: {
      type: Number,
      required: true,
      min: 0,
    },
    total: {
      type: Number,
      required: true,
      min: 0,
    },
    status: {
      type: String,
      required: true,
      enum: ["pending", "processing", "shipped", "delivered", "cancelled"],
      default: "pending",
    },
    paymentIntentId: {
      type: String,
    },
    shippingAddress: AddressSchema,
    billingAddress: AddressSchema,
    trackingNumber: {
      type: String,
    },
    notes: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

// Pre-save middleware to generate order number
OrderSchema.pre("save", async function (next) {
  if (this.isNew && !this.orderNumber) {
    const count = await mongoose.model("Order").countDocuments();
    this.orderNumber = `ORD-${Date.now()}-${(count + 1).toString().padStart(4, "0")}`;
  }
  next();
});

export default mongoose.models.Order ||
  mongoose.model<IOrder>("Order", OrderSchema);
