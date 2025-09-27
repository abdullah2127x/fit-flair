import mongoose, { Schema, Document } from 'mongoose';

export interface IProductVariant {
  color: string;
  colorCode: string;
  featuredImage: string;
  additionalImages: string[];
  stock: number;
}

export interface IProduct extends Document {
  _id: string;
  title: string;
  slug: string;
  subTitle: string;
  price: number;
  discount: number;
  audience: 'men' | 'women';
  category: 'unStitched' | 'stitched' | 'readyToWear';
  subCategory: 'top' | 'bottom' | '2piece' | '3piece';
  menOutfitType?: string;
  womenOutfitType?: string;
  season: string[];
  designs: string[];
  occasions: string[];
  fabric: string;
  variants: IProductVariant[];
  description: string;
  relevantTags?: string[];
  isFeatured: boolean;
  isNewArrival: boolean;
  isPopular: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const ProductVariantSchema = new Schema<IProductVariant>({
  color: { type: String, required: true },
  colorCode: { type: String, required: true },
  featuredImage: { type: String, required: true },
  additionalImages: [{ type: String }],
  stock: { type: Number, required: true, min: 0 }
});

const ProductSchema = new Schema<IProduct>({
  title: { 
    type: String, 
    required: true, 
    trim: true,
    minlength: 3,
    maxlength: 100
  },
  slug: { 
    type: String, 
    required: true, 
    unique: true,
    lowercase: true,
    trim: true
  },
  subTitle: { 
    type: String, 
    required: true,
    trim: true,
    minlength: 3,
    maxlength: 60
  },
  price: { 
    type: Number, 
    required: true, 
    min: 0 
  },
  discount: { 
    type: Number, 
    default: 0, 
    min: 0, 
    max: 100 
  },
  audience: { 
    type: String, 
    required: true, 
    enum: ['men', 'women'] 
  },
  category: { 
    type: String, 
    required: true, 
    enum: ['unStitched', 'stitched', 'readyToWear'] 
  },
  subCategory: { 
    type: String, 
    required: true, 
    enum: ['top', 'bottom', '2piece', '3piece'] 
  },
  menOutfitType: { 
    type: String,
    required: function(this: IProduct) {
      return this.audience === 'men';
    }
  },
  womenOutfitType: { 
    type: String,
    required: function(this: IProduct) {
      return this.audience === 'women';
    }
  },
  season: [{ 
    type: String, 
    enum: ['summer', 'winter'],
    required: true 
  }],
  designs: [{ 
    type: String, 
    enum: ['plain', 'printed', 'embroidered', 'block_print', 'digital_print', 'geometric', 'floral', 'abstract', 'minimalist'],
    required: true 
  }],
  occasions: [{ 
    type: String, 
    enum: ['casual', 'formal', 'party', 'wedding', 'office', 'eid'],
    required: true 
  }],
  fabric: { 
    type: String, 
    required: true 
  },
  variants: [ProductVariantSchema],
  description: { 
    type: String, 
    required: true 
  },
  relevantTags: [{ 
    type: String 
  }],
  isFeatured: { 
    type: Boolean, 
    default: false 
  },
  isNewArrival: { 
    type: Boolean, 
    default: false 
  },
  isPopular: { 
    type: Boolean, 
    default: false 
  }
}, {
  timestamps: true
});

// Indexes for better query performance
// ProductSchema.index({ slug: 1 });
// ProductSchema.index({ audience: 1, category: 1 });
// ProductSchema.index({ isFeatured: 1 });
// ProductSchema.index({ isNewArrival: 1 });
// ProductSchema.index({ isPopular: 1 });
// ProductSchema.index({ price: 1 });
// ProductSchema.index({ 'variants.stock': 1 });

// Virtual for discounted price
ProductSchema.virtual('discountedPrice').get(function() {
  return this.price - (this.price * this.discount / 100);
});

// Virtual for total stock
ProductSchema.virtual('totalStock').get(function() {
  return this.variants.reduce((total, variant) => total + variant.stock, 0);
});

// Ensure virtual fields are serialized
ProductSchema.set('toJSON', { virtuals: true });
ProductSchema.set('toObject', { virtuals: true });

export default mongoose.models.Product || mongoose.model<IProduct>('Product', ProductSchema);
