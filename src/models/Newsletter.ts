import { INewsletter } from "@/types/newletter";
import mongoose, { Schema, Document } from "mongoose";

const NewsletterSchema = new Schema<INewsletter>(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/^\S+@\S+\.\S+$/, "Invalid email format"],
    },
    subscribedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

export default mongoose.models.Newsletter ||
  mongoose.model<INewsletter>("Newsletter", NewsletterSchema);
