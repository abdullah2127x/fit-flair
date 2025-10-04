import connectDB from "./mongodb";
import Product, { IProduct } from "@/models/Product";
import User from "@/models/User";
import Order from "@/models/Order";
import Cart from "@/models/Cart";
import { ICart, ICartItem } from "@/types/cart";
import { formatDBError } from "@/utilityFunctions/formatDBError";
import { DbErrorCode, DBResponse, Pagination } from "@/types/database";
import { IUser } from "@/types/user";
import { IOrder } from "@/types/order";

// Database utility functions
export class DatabaseService {
  // Product operations
  // static async getProducts(
  //   filters: any = {},
  //   page = 1,
  //   limit = 12
  // ): Promise<DBResponse<{ products: any[]; pagination: Pagination }>> {
  //   try {
  //     await connectDB();
  //     const skip = (page - 1) * limit;

  //     const [products, total] = await Promise.all([
  //       Product.find(filters)
  //         .sort({ createdAt: -1 })
  //         .skip(skip)
  //         .limit(limit)
  //         .lean(),
  //       Product.countDocuments(filters),
  //     ]);

  //     return {
  //       success: true,
  //       data: {
  //         products,
  //         pagination: {
  //           page,
  //           limit,
  //           total,
  //           totalPages: Math.ceil(total / limit),
  //           hasNext: page < Math.ceil(total / limit),
  //           hasPrev: page > 1,
  //         },
  //       },
  //     };
  //   } catch (err: any) {
  //     return formatDBError(err);
  //   }
  // }

  // static async getProductById(
  //   id: string
  // ): Promise<DBResponse<IProduct | null>> {
  //   try {
  //     await connectDB();
  //     const product = await Product.findById(id);
  //     return { success: true, data: product };
  //   } catch (err: any) {
  //     return formatDBError(err);
  //   }
  // }

  // static async getProductBySlug(slug: string): Promise<DBResponse<any>> {
  //   try {
  //     await connectDB();
  //     const product = await Product.findOne({ slug });
  //     return { success: true, data: product };
  //   } catch (err: any) {
  //     return formatDBError(err);
  //   }
  // }

  // static async createProduct(productData: any): Promise<DBResponse<any>> {
  //   try {
  //     await connectDB();
  //     const product = new Product(productData);
  //     const saved = await product.save();
  //     return { success: true, data: saved };
  //   } catch (err: any) {
  //     return formatDBError(err);
  //   }
  // }

  // static async updateProduct(
  //   id: string,
  //   updateData: any
  // ): Promise<DBResponse<any>> {
  //   try {
  //     await connectDB();
  //     const updated = await Product.findByIdAndUpdate(id, updateData, {
  //       new: true,
  //     });
  //     return { success: true, data: updated };
  //   } catch (err: any) {
  //     return formatDBError(err);
  //   }
  // }

  // static async deleteProduct(id: string): Promise<DBResponse<any>> {
  //   try {
  //     await connectDB();
  //     const deleted = await Product.findByIdAndDelete(id);
  //     return { success: true, data: deleted };
  //   } catch (err: any) {
  //     return formatDBError(err);
  //   }
  // }

  // User operations
  static async getUserByClerkId(clerkId: string): Promise<DBResponse<IUser>> {
    try {
      await connectDB();
      const user = await User.findOne({ clerkId });
      if (!user) {
        return {
          success: false,
          error: {
            code: DbErrorCode.NOT_FOUND,
            message: "User not found",
          },
        };
      }

      return { success: true, data: user };
    } catch (err: any) {
      return formatDBError(err);
    }
  }

  static async createUser(userData: any): Promise<DBResponse<IUser>> {
    try {
      await connectDB();
      const user = new User(userData);
      const saved = await user.save();
      return { success: true, data: saved };
    } catch (err: any) {
      console.log("The error from catch under createUser in databse :", err);
      return formatDBError(err);
    }
  }

  static async updateUser(
    clerkId: string,
    updateData: any
  ): Promise<DBResponse<IUser | null>> {
    try {
      await connectDB();

      const updated = await User.findOneAndUpdate(
        { clerkId },
        updateData,
        { new: true } // return the updated document
      );

      if (!updated) {
        return {
          success: false,
          error: {
            code: DbErrorCode.NOT_FOUND,
            message: `No user found with clerkId: ${clerkId}`,
          },
        };
      }

      return { success: true, data: updated };
    } catch (err: any) {
      return formatDBError(err);
    }
  }

  static async deleteUser(clerkId: string): Promise<DBResponse<IUser | null>> {
    try {
      await connectDB();
      const deleted = await User.findOneAndDelete({ clerkId });

      if (!deleted) {
        return {
          success: false,
          error: {
            code: DbErrorCode.NOT_FOUND,
            message: `No user found with clerkId: ${clerkId}`,
          },
        };
      }

      return { success: true, data: deleted };
    } catch (err: any) {
      console.log("The error from catch under deleteUser in database :", err);
      return formatDBError(err);
    }
  }

  // Cart operations
  static async getCart(userId: string): Promise<DBResponse<ICart | null>> {
    try {
      await connectDB();
      let cart = await Cart.findOne({ userId });

      if (!cart) {
        cart = new Cart({ userId, items: [] });
        await cart.save();
      }

      return { success: true, data: cart };
    } catch (err: any) {
      return formatDBError(err);
    }
  }

  // static async addToCart(
  //   userId: string,
  //   item: any
  // ): Promise<DBResponse<ICart>> {
  //   try {
  //     await connectDB();
  //     let cart = await Cart.findOne({ userId });

  //     if (!cart) {
  //       cart = new Cart({ userId, items: [] });
  //     }

  //     const existingItemIndex = cart.items.findIndex(
  //       (cartItem: ICartItem) =>
  //         cartItem.productId === item.productId &&
  //         cartItem.colorName === item.colorName
  //     );

  //     if (existingItemIndex > -1) {
  //       cart.items[existingItemIndex].quantity += item.quantity;
  //     } else {
  //       cart.items.push(item);
  //     }

  //     const saved = await cart.save();
  //     return { success: true, data: saved };
  //   } catch (err: any) {
  //     return formatDBError(err);
  //   }
  // }

  static async addManyToCart(
    userId: string,
    items: ICartItem[]
  ): Promise<DBResponse<ICart>> {
    try {
      await connectDB();
      let cart = await Cart.findOne({ userId });

      if (!cart) {
        cart = new Cart({ userId, items });
      } else {
        // Clear existing items and replace with new items
        cart.items = items;
      }

      await cart.save();
      return { success: true, data: cart };
    } catch (err: any) {
      return formatDBError(err);
    }
  }

  static async clearCart(userId: string): Promise<DBResponse<ICart | null>> {
    try {
      await connectDB();
      const cleared = await Cart.findOneAndUpdate(
        { userId },
        { items: [] },
        { new: true }
      );
      return { success: true, data: cleared };
    } catch (err: any) {
      return formatDBError(err);
    }
  }

  // static async updateCartItem(
  //   userId: string,
  //   productId: string,
  //   colorName: string,
  //   quantity: number
  // ): Promise<DBResponse<ICart | null>> {
  //   try {
  //     await connectDB();
  //     const cart = await Cart.findOne({ userId });

  //     if (!cart) {
  //       return { success: true, data: null }; // no cart found but not an error
  //     }

  //     const itemIndex = cart.items.findIndex(
  //       (item: ICartItem) =>
  //         item.productId === productId && item.colorName === colorName
  //     );

  //     if (itemIndex > -1) {
  //       if (quantity <= 0) {
  //         cart.items.splice(itemIndex, 1);
  //       } else {
  //         cart.items[itemIndex].quantity = quantity;
  //       }
  //     }

  //     const saved = await cart.save();
  //     return { success: true, data: saved };
  //   } catch (err: any) {
  //     return formatDBError(err);
  //   }
  // }

  // static async removeFromCart(
  //   userId: string,
  //   productId: string,
  //   colorName: string
  // ): Promise<DBResponse<ICart | null>> {
  //   try {
  //     await connectDB();
  //     const cart = await Cart.findOne({ userId });

  //     if (!cart) {
  //       return { success: true, data: null }; // empty cart
  //     }

  //     cart.items = cart.items.filter(
  //       (item: ICartItem) =>
  //         !(item.productId === productId && item.colorName === colorName)
  //     );

  //     const saved = await cart.save();
  //     return { success: true, data: saved };
  //   } catch (err: any) {
  //     return formatDBError(err);
  //   }
  // }

  // // Order operations
  static async createOrder(orderData: any): Promise<DBResponse<IOrder>> {
    try {
      await connectDB();
      const order = new Order(orderData);
      const saved = await order.save();
      return { success: true, data: saved };
    } catch (err: any) {
      return formatDBError(err);
    }
  }

  // static async getOrders(
  //   userId: string,
  //   page = 1,
  //   limit = 10,
  //   status?: string
  // ): Promise<
  //   DBResponse<{
  //     orders: IOrder[] | null;
  //     pagination: {
  //       page: number;
  //       limit: number;
  //       total: number;
  //       totalPages: number;
  //       hasNext: boolean;
  //       hasPrev: boolean;
  //     };
  //   }>
  // > {
  //   try {
  //     await connectDB();
  //     const filter: any = { userId };
  //     if (status) filter.status = status;

  //     const skip = (page - 1) * limit;

  //     const [orders, total] = await Promise.all([
  //       Order.find(filter)
  //         .sort({ createdAt: -1 })
  //         .skip(skip)
  //         .limit(limit)
  //         .lean(),
  //       Order.countDocuments(filter),
  //     ]);

  //     return {
  //       success: true,
  //       data: {
  //         orders,
  //         pagination: {
  //           page,
  //           limit,
  //           total,
  //           totalPages: Math.ceil(total / limit),
  //           hasNext: page < Math.ceil(total / limit),
  //           hasPrev: page > 1,
  //         },
  //       },
  //     };
  //   } catch (err: any) {
  //     return formatDBError(err);
  //   }
  // }

  static async getOrderById(
    orderId: string,
    userId: string
  ): Promise<DBResponse<IOrder | null>> {
    try {
      await connectDB();
      const order = await Order.findOne({ _id: orderId, userId });
      return { success: true, data: order };
    } catch (err: any) {
      return formatDBError(err);
    }
  }

  static async updateOrder(
    orderId: string,
    userId: string,
    updateData: any
  ): Promise<DBResponse<IOrder | null>> {
    try {
      await connectDB();
      const updated = await Order.findOneAndUpdate(
        { _id: orderId, userId },
        updateData,
        { new: true }
      );
      return { success: true, data: updated };
    } catch (err: any) {
      return formatDBError(err);
    }
  }

  static async deleteOrder(
    orderId: string,
    userId: string
  ): Promise<DBResponse<IOrder | null>> {
    try {
      await connectDB();
      const deleted = await Order.findOneAndDelete({ _id: orderId, userId });

      if (!deleted) {
        return {
          success: false,
          error: {
            code: DbErrorCode.NOT_FOUND,
            message: `No order found with id: ${orderId}`,
          },
        };
      }

      return { success: true, data: deleted };
    } catch (err: any) {
      return formatDBError(err);
    }
  }

  // // Search and filter operations
  // static async searchProducts(
  //   query: string,
  //   filters: any = {}
  // ): Promise<DBResponse<IProduct[]>> {
  //   try {
  //     await connectDB();

  //     const searchFilter = {
  //       ...filters,
  //       $or: [
  //         { title: { $regex: query, $options: "i" } },
  //         { subTitle: { $regex: query, $options: "i" } },
  //         { description: { $regex: query, $options: "i" } },
  //         { relevantTags: { $in: [new RegExp(query, "i")] } },
  //       ],
  //     };

  //     const products = await Product.find(searchFilter).lean();
  //     return { success: true, data: products };
  //   } catch (err: any) {
  //     return formatDBError(err);
  //   }
  // }

  // static async getFeaturedProducts(limit = 8): Promise<DBResponse<IProduct[]>> {
  //   try {
  //     await connectDB();
  //     const featured = await Product.find({ isFeatured: true })
  //       .sort({ createdAt: -1 })
  //       .limit(limit)
  //       .lean();
  //     return { success: true, data: featured };
  //   } catch (err: any) {
  //     return formatDBError(err);
  //   }
  // }

  // static async getNewArrivals(limit = 8): Promise<DBResponse<IProduct[]>> {
  //   try {
  //     await connectDB();
  //     const arrivals = await Product.find({ isNewArrival: true })
  //       .sort({ createdAt: -1 })
  //       .limit(limit)
  //       .lean();
  //     return { success: true, data: arrivals };
  //   } catch (err: any) {
  //     return formatDBError(err);
  //   }
  // }

  // static async getPopularProducts(limit = 8): Promise<DBResponse<IProduct[]>> {
  //   try {
  //     await connectDB();
  //     const popular = await Product.find({ isPopular: true })
  //       .sort({ createdAt: -1 })
  //       .limit(limit)
  //       .lean();
  //     return { success: true, data: popular };
  //   } catch (err: any) {
  //     return formatDBError(err);
  //   }
  // }

  // Analytics and reporting
  // static async getProductStats(): Promise<
  //   DBResponse<{
  //     totalProducts: number;
  //     featuredProducts: number;
  //     newArrivals: number;
  //     popularProducts: number;
  //     outOfStock: number;
  //   }>
  // > {
  //   try {
  //     await connectDB();

  //     const [
  //       totalProducts,
  //       featuredProducts,
  //       newArrivals,
  //       popularProducts,
  //       outOfStock,
  //     ] = await Promise.all([
  //       Product.countDocuments(),
  //       Product.countDocuments({ isFeatured: true }),
  //       Product.countDocuments({ isNewArrival: true }),
  //       Product.countDocuments({ isPopular: true }),
  //       Product.countDocuments({ "variants.stock": 0 }),
  //     ]);

  //     return {
  //       success: true,
  //       data: {
  //         totalProducts,
  //         featuredProducts,
  //         newArrivals,
  //         popularProducts,
  //         outOfStock,
  //       },
  //     };
  //   } catch (err: any) {
  //     return formatDBError(err);
  //   }
  // }

  static async getOrderStats(userId?: string): Promise<
    DBResponse<{
      totalOrders: number;
      pendingOrders: number;
      completedOrders: number;
      totalRevenue: number;
    }>
  > {
    try {
      await connectDB();

      const filter = userId ? { userId } : {};

      const [totalOrders, pendingOrders, completedOrders, totalRevenue] =
        await Promise.all([
          Order.countDocuments(filter),
          Order.countDocuments({ ...filter, status: "pending" }),
          Order.countDocuments({ ...filter, status: "delivered" }),
          Order.aggregate([
            { $match: filter },
            { $group: { _id: null, total: { $sum: "$total" } } },
          ]),
        ]);

      return {
        success: true,
        data: {
          totalOrders,
          pendingOrders,
          completedOrders,
          totalRevenue: totalRevenue[0]?.total || 0,
        },
      };
    } catch (err: any) {
      return formatDBError(err);
    }
  }
}

export default DatabaseService;
