// = = = Error Handling = = =
// Error Handling: At the request method we are sending the req to the endpoints gets as the arguments and if the response is not ok send the error with status code and if ok send the response.

// = = = Work Flow = = =
// All the method in ApiClient uses its own private method "request" with one parameter required i.e "endpoint" where send the req and the second parameter is the options of the req like POST req body and more.

// API client for making requests to our Mongoose-based API routes
import { ResponseType } from "@/types/apiResponse";
import { ICartItem } from "@/types/cart";
import { IAddress } from "@/types/user";

class ApiClient {
  private baseUrl: string;

  // Custom error class for richer error handling
  constructor() {
    this.baseUrl =
      process.env.NODE_ENV === "production"
        ? "https://fitflair.vercel.app/api"
        : "http://localhost:3000/api";
  }

  // This is the method that gets the endpoint, and options like body, method (Post, Put) and manage the error simultaneously
  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ResponseType<T>> {
    try {
      const response = await fetch(`${this.baseUrl}${endpoint}`, {
        headers: {
          "Content-Type": "application/json",
          ...options.headers,
        },
        ...options,
      });

      const result: ResponseType<T> = await response.json();

      // ✅ Don’t throw — always return the structured response
      return result;
    } catch (err: any) {
      if (err instanceof SyntaxError) {
        return {
          status: 0,
          success: false,
          message: "Invalid server response",
          code: "INVALID_JSON",
        };
      }

      return {
        status: 0,
        success: false,
        message: `Network error: ${err?.message || "Unknown"}`,
        code: "NETWORK_ERROR",
      };
    }
  }

  // ========= Helper method to send the fetch from the request method
  async get<T>(endpoint: string) {
    const a = await this.request<T>(endpoint, { method: "GET" });
    return a;
  }

  async post<T>(endpoint: string, body: unknown) {
    return await this.request<T>(endpoint, {
      method: "POST",
      body: JSON.stringify(body),
    });
  }

  async put<T>(endpoint: string, body: unknown) {
    return await this.request<T>(endpoint, {
      method: "PUT",
      body: JSON.stringify(body),
    });
  }

  async delete<T>(endpoint: string) {
    return await this.request<T>(endpoint, { method: "DELETE" });
  }

  // =========Methods that can be access form the client side code

  // // ===== Product API methods =====
  // async getProducts(
  //   params: {
  //     page?: number;
  //     limit?: number;
  //     audience?: string;
  //     category?: string;
  //     subCategory?: string;
  //     minPrice?: number;
  //     maxPrice?: number;
  //     featured?: boolean;
  //     newArrival?: boolean;
  //     popular?: boolean;
  //     search?: string;
  //     sort?: string;
  //     order?: "asc" | "desc";
  //   } = {}
  // ) {
  //   const searchParams = new URLSearchParams();

  //   Object.entries(params).forEach(([key, value]) => {
  //     if (value !== undefined && value !== null) {
  //       searchParams.append(key, value.toString());
  //     }
  //   });

  //   const queryString = searchParams.toString();
  //   return this.get(`/products${queryString ? `?${queryString}` : ""}`);
  // }

  // async getProduct(id: string) {
  //   return this.get(`/products/${id}`);
  // }

  // async getProductBySlug(slug: string) {
  //   return this.get(`/products/slug/${slug}`);
  // }

  // ===== Cart API methods =====
  async getCart() {
    return this.get("/cart");
  }

  // manage with the redux and update the whole carts everytime so no need to manually update delete and like these
  async addManyToCart(items: ICartItem[]) {
    return this.post("/cart", items);
  }

  async clearCart() {
    return this.delete("/cart");
  }
  // async addToCart(item: ICartItem) {
  //   return this.post("/cart", item);
  // }

  // async updateCartItem(productId: string, colorName: string, quantity: number) {
  //   return this.put("/cart", { productId, colorName, quantity });
  // }

  // async removeFromCart(productId: string, colorName: string) {
  //   return this.delete(`/cart?productId=${productId}&colorName=${colorName}`);
  // }

  // // ===== Order API methods =====
  async getOrders(
    params: { page?: number; limit?: number; status?: string } = {}
  ) {
    const searchParams = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        searchParams.append(key, value.toString());
      }
    });
    const queryString = searchParams.toString();
    return this.get(`/orders${queryString ? `?${queryString}` : ""}`);
  }

  async getOrder(id: string) {
    return this.get(`/orders/${id}`);
  }

  async createOrder(orderData: {
    items: ICartItem[];
    subTotal: number;
    shippingCost: number;
    total: number;
    paymentIntentId?: string;
    shippingAddress: IAddress;
    billingAddress: IAddress;
  }) {
    return this.post("/orders", orderData);
  }

  // ===== User API methods =====

  async getUser() {
    const res = await this.get("/users");

    if (!res.success && res.code === "NOT_FOUND") {
      return null; // user doesn’t exist
    }

    if (!res.success) {
      throw res; // rethrow real errors
    }

    return res.data; // only return the user object
  }

  async createUser(userData: {
    email: string;
    firstName: string;
    lastName: string;
    phone?: string;
  }) {
    const res = await this.post("/users", userData);

    if (!res.success) throw res; // bubble up errors
    return res.data; // only return the user
  }

  async updateUser(userData: {
    firstName?: string;
    lastName?: string;
    phone?: string;
    addresses?: any[];
  }) {
    const res = await this.put("/users", userData);

    if (!res.success) throw res;
    return res.data; // updated user object
  }

  async deleteUser() {
    const res = await this.delete("/users");

    if (!res.success && res.code === "NOT_FOUND") {
      return null; // user doesn’t exist
    }

    if (!res.success) throw res; // bubble up errors

    return res.data; // return deleted user object (or success response)
  }
}

export const apiClient = new ApiClient();
export default apiClient;
