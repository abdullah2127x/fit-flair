// = = = Error Handling = = =
// Error Handling: At the request method we are sending the req to the endpoints gets as the arguments and if the response is not ok send the error with status code and if ok send the response.

// = = = Work Flow = = =
// All the method in ApiClient uses its own private method "request" with one parameter required i.e "endpoint" where send the req and the second parameter is the options of the req like POST req body and more.

// API client for making requests to our Mongoose-based API routes
import { ResponseType } from "@/types/response";

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
  ): Promise<T> {
    try {
      const response = await fetch(`${this.baseUrl}${endpoint}`, {
        headers: {
          "Content-Type": "application/json",
          ...options.headers,
        },
        ...options,
      });

      const result: ResponseType<T> = await response.json();

      // Always check unified success flag
      if (!result.success) {
        throw result; // throw the ResponseType itself
      }

      return result.data as T;
    } catch (err: any) {
      // If server didn't respond with JSON (network failure, timeout, etc.)
      if (err instanceof SyntaxError) {
        throw {
          status: 0,
          success: false,
          message: "Invalid server response",
          code: "INVALID_JSON",
        } satisfies ResponseType;
      }

      if (err?.success === false) {
        throw err as ResponseType; // already structured
      }

      throw {
        status: 0,
        success: false,
        message: `Network error: ${err?.message || "Unknown"}`,
        code: "NETWORK_ERROR",
      } satisfies ResponseType;
    }
  }
  // ========= Helper method to send the fetch from the request method
  private get<T>(endpoint: string) {
    return this.request<T>(endpoint, { method: "GET" });
  }

  private post<T>(endpoint: string, body: unknown) {
    return this.request<T>(endpoint, {
      method: "POST",
      body: JSON.stringify(body),
    });
  }

  private put<T>(endpoint: string, body: unknown) {
    return this.request<T>(endpoint, {
      method: "PUT",
      body: JSON.stringify(body),
    });
  }

  private delete<T>(endpoint: string) {
    return this.request<T>(endpoint, { method: "DELETE" });
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

  // // ===== Cart API methods =====
  // async getCart() {
  //   return this.get("/cart");
  // }

  // async addToCart(item: {
  //   productId: string;
  //   productTitle: string;
  //   productSlug: string;
  //   subTitle: string;
  //   price: number;
  //   discount: number;
  //   imageSrc: string;
  //   colorName: string;
  //   quantity: number;
  // }) {
  //   return this.post("/cart", item);
  // }

  // async updateCartItem(productId: string, colorName: string, quantity: number) {
  //   return this.put("/cart", { productId, colorName, quantity });
  // }

  // async removeFromCart(productId: string, colorName: string) {
  //   return this.delete(`/cart?productId=${productId}&colorName=${colorName}`);
  // }

  // async clearCart() {
  //   return this.delete("/cart");
  // }

  // // ===== Order API methods =====
  // async getOrders(
  //   params: { page?: number; limit?: number; status?: string } = {}
  // ) {
  //   const searchParams = new URLSearchParams();
  //   Object.entries(params).forEach(([key, value]) => {
  //     if (value !== undefined && value !== null) {
  //       searchParams.append(key, value.toString());
  //     }
  //   });
  //   const queryString = searchParams.toString();
  //   return this.get(`/orders${queryString ? `?${queryString}` : ""}`);
  // }

  // async getOrder(id: string) {
  //   return this.get(`/orders/${id}`);
  // }

  // async createOrder(orderData: {
  //   items: any[];
  //   subtotal: number;
  //   shippingCost: number;
  //   tax: number;
  //   total: number;
  //   paymentMethod: string;
  //   paymentIntentId?: string;
  //   shippingAddress: any;
  //   billingAddress: any;
  // }) {
  //   return this.post("/orders", orderData);
  // }

  // ===== User API methods =====

  async getUser() {
    return this.get("/users");
  }

  async createUser(userData: {
    email: string;
    firstName: string;
    lastName: string;
    phone?: string;
  }) {
    return this.post("/users", userData);
  }

  async updateUser(userData: {
    firstName?: string;
    lastName?: string;
    phone?: string;
    addresses?: any[];
  }) {
    return this.put("/users", userData);
  }
}

export const apiClient = new ApiClient();
export default apiClient;
