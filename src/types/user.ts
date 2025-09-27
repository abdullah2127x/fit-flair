import { Document } from "mongoose";

export interface IAddress {
  _id?: string;
  type: "billing" | "shipping";
  firstName: string;
  lastName: string;
  company?: string;
  address1: string;
  address2?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  phone?: string;
  isDefault: boolean;
}

export interface IUser extends Document {
  _id: string;
  clerkId: string;
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
  addresses: IAddress[];
  orders: string[]; // Array of order IDs
  createdAt: Date;
  updatedAt: Date;
}

