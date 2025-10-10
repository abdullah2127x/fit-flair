import connectDB from "./mongodb";
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
  // // ======================================User operations
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

  // // ======================================Admin utilities
  static async listUsers(): Promise<DBResponse<IUser[]>> {
    try {
      await connectDB();
      console.log("before getting the users in the data base")
      const users = await User.find().sort({ createdAt: -1 }).lean();
      console.log("the users are in the data base ", users)
      return { success: true, data: users as unknown as IUser[] };
    } catch (err: any) {
      console.log("Getting error in the users in the data base", err)
      return formatDBError(err);
    }
  }

  static async listOrders(): Promise<DBResponse<IOrder[]>> {
    try {
      await connectDB();
      const orders = await Order.find().sort({ createdAt: -1 }).lean();
      return { success: true, data: orders as unknown as IOrder[] };
    } catch (err: any) {
      return formatDBError(err);
    }
  }

  // // ======================================Cart operations
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

  // // ======================================Order operations
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

  static async getOrders(
    userId: string,
    page = 1,
    limit = 10,
    status?: string
  ): Promise<
    DBResponse<{
      orders: IOrder[] | null;
      pagination: {
        page: number;
        limit: number;
        total: number;
        totalPages: number;
        hasNext: boolean;
        hasPrev: boolean;
      };
    }>
  > {
    try {
      await connectDB();
      const filter: any = { userId };
      if (status) filter.status = status;

      const skip = (page - 1) * limit;

      const [orders, total] = await Promise.all([
        Order.find(filter)
          .sort({ createdAt: -1 })
          .skip(skip)
          .limit(limit)
          .lean(),
        Order.countDocuments(filter),
      ]);

      return {
        success: true,
        data: {
          orders: orders.map(order => order as unknown as IOrder),
          pagination: {
            page,
            limit,
            total,
            totalPages: Math.ceil(total / limit),
            hasNext: page < Math.ceil(total / limit),
            hasPrev: page > 1,
          },
        },
      };
    } catch (err: any) {
      return formatDBError(err);
    }
  }

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
