import { ICartItem } from "./cart";
import { IAddress } from "./user";

export interface IOrder extends Document {
  _id: string; //from the backend
  orderNumber: string; //from the backend if not so create at the model creation
  userId: string; //from the route
  items: ICartItem[]; //from the apiClient
  subTotal: number; //from the apiClient // sum of product discounted prices with quantity
  shippingCost: number; //from the apiClient
  total: number; //from the apiClient //sum of subtototal and shipping cost
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled"; //from the route
  paymentIntentId?: string; //from the apiClient
  shippingAddress: IAddress; //from the apiClient
  billingAddress: IAddress; //from the apiClient
  trackingNumber?: string;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}
