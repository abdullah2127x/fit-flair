import { IAddress, IUser } from "@/types/user";
import mongoose, { Schema } from "mongoose";

export const AddressSchema = new Schema<IAddress>({
  firstName: {
    type: String,
    required: true,
    trim: true,
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
  },
  address: {
    type: String,
    required: true,
    trim: true,
  },
  apartment: {
    type: String,
    trim: true,
  },
  city: {
    type: String,
    required: true,
    trim: true,
  },
  postalCode: {
    type: String,
    required: true,
    trim: true,
  },
  country: {
    type: String,
    required: true,
    trim: true,
  },
  phone: {
    type: String,
    trim: true,
  },
});

const UserSchema = new Schema<IUser>(
  {
    clerkId: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      error: "TRHER IS ",
    },
    firstName: {
      type: String,
      required: true,
      trim: true,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
    },
    phone: {
      type: String,
      trim: true,
    },
    addresses: [AddressSchema],
    orders: [
      {
        type: Schema.Types.ObjectId,
        ref: "Order",
      },
    ],
  },
  {
    timestamps: true,
  }
);

// Indexes
// UserSchema.index({ clerkId: 1 });
// UserSchema.index({ email: 1 });

// Virtual for full name
// it does not show and store in the db it just create dynamically
// Virtuals are computed fields → they do not exist in MongoDB.
// But when you fetch the user in your code:
// fullName is created on the fly from firstName + lastName.
UserSchema.virtual("fullName").get(function () {
  return `${this.firstName} ${this.lastName}`;
});

// Ensure virtual fields are serialized
// By default, if you convert a document to plain JSON (res.json(user) in an API), virtuals are not included.
// "When turning this doc into JSON or an object, include virtual fields too."
UserSchema.set("toJSON", { virtuals: true });
UserSchema.set("toObject", { virtuals: true });

// When you save a file, Next.js recompiles and reloads the server.
// This can cause the same Mongoose model to be registered again, leading to the error:
// Cannot overwrite `User` model once compiled.
export default mongoose.models.User ||
  mongoose.model<IUser>("User", UserSchema);
