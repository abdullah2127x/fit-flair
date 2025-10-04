import { Document } from "mongoose";

export interface IAddress {
  _id?: string;
  firstName: string;
  lastName: string;
  address: string;
  apartment?: string;
  city: string;
  postalCode: string;
  country: string;
  phone?: number;
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
