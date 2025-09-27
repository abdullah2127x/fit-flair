import { IOrder, IOrderItem } from '@/types/order';
import mongoose, { Schema, Document } from 'mongoose';

const OrderItemSchema = new Schema<IOrderItem>({
  productId: { 
    type: String, 
    required: true 
  },
  productTitle: { 
    type: String, 
    required: true 
  },
  productSlug: { 
    type: String, 
    required: true 
  },
  variant: {
    color: { type: String, required: true },
    colorCode: { type: String, required: true },
    featuredImage: { type: String, required: true }
  },
  quantity: { 
    type: Number, 
    required: true, 
    min: 1 
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
  totalPrice: { 
    type: Number, 
    required: true, 
    min: 0 
  }
});

const AddressSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  company: { type: String },
  address1: { type: String, required: true },
  address2: { type: String },
  city: { type: String, required: true },
  state: { type: String, required: true },
  postalCode: { type: String, required: true },
  country: { type: String, required: true },
  phone: { type: String }
});

const OrderSchema = new Schema<IOrder>({
  orderNumber: { 
    type: String, 
    required: true, 
    unique: true 
  },
  userId: { 
    type: String, 
    required: true 
  },
  items: [OrderItemSchema],
  subtotal: { 
    type: Number, 
    required: true, 
    min: 0 
  },
  shippingCost: { 
    type: Number, 
    required: true, 
    min: 0 
  },
  tax: { 
    type: Number, 
    required: true, 
    min: 0 
  },
  total: { 
    type: Number, 
    required: true, 
    min: 0 
  },
  status: { 
    type: String, 
    required: true, 
    enum: ['pending', 'processing', 'shipped', 'delivered', 'cancelled'],
    default: 'pending'
  },
  paymentStatus: { 
    type: String, 
    required: true, 
    enum: ['pending', 'paid', 'failed', 'refunded'],
    default: 'pending'
  },
  paymentMethod: { 
    type: String, 
    required: true, 
    enum: ['stripe', 'cod'] 
  },
  paymentIntentId: { 
    type: String 
  },
  shippingAddress: AddressSchema,
  billingAddress: AddressSchema,
  trackingNumber: { 
    type: String 
  },
  notes: { 
    type: String 
  }
}, {
  timestamps: true
});

// Indexes
// OrderSchema.index({ orderNumber: 1 });
// OrderSchema.index({ userId: 1 });
// OrderSchema.index({ status: 1 });
// OrderSchema.index({ paymentStatus: 1 });
// OrderSchema.index({ createdAt: -1 });

// Pre-save middleware to generate order number
OrderSchema.pre('save', async function(next) {
  if (this.isNew && !this.orderNumber) {
    const count = await mongoose.model('Order').countDocuments();
    this.orderNumber = `ORD-${Date.now()}-${(count + 1).toString().padStart(4, '0')}`;
  }
  next();
});

export default mongoose.models.Order || mongoose.model<IOrder>('Order', OrderSchema);
