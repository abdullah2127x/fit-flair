import apiClient from "@/lib/apiClient";
import { ICart, ICartItem } from "@/types/cart";

// Load from localStorage
export const loadCartFromLocalStorage = (): ICartItem[] => {
  if (typeof window !== "undefined") {
    const data = localStorage.getItem("cart");
    return data ? JSON.parse(data) : [];
  }
  return [];
};

// Save to localStorage
export const saveCartToLocalStorage = (items: ICartItem[]) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("cart", JSON.stringify(items));
  }
};

// Clear localStorage cart
export const clearCartFromLocalStorage = () => {
  if (typeof window !== "undefined") {
    localStorage.removeItem("cart");
  }
};

export const loadCartFromDB = async () => {
  try {
    const dbCartRes = await apiClient.getCart();
    if (
      dbCartRes.success &&
      (dbCartRes.data as { items?: ICartItem[] })?.items
    ) {
      return (dbCartRes.data as { items: ICartItem[] }).items;
    } else {
      return null;
    }
  } catch (err) {
    throw err;
  }
};

export const saveCartToDB = async (items: ICartItem[]) => {
  try {
    if (items.length > 0) {
      const addManyToCartRes = await apiClient.addManyToCart(items);

      if (!addManyToCartRes) {
      }
    }
  } catch (error) {
    console.error("❌ Error syncing cart:", error);
  }
};

// Helper: merge carts
const mergeCarts = (localCart: ICartItem[], dbCart: ICartItem[]) => {
  const merged = [...dbCart];

  localCart.forEach((localItem) => {
    const existing = merged.find(
      (item) =>
        item.productId === localItem.productId &&
        item.colorName == localItem.colorName
    );
    if (existing) {
      // console.log("The item is already exist so we are not updating the quantity", existing)
      // sum the quntity of both
      // existing.quantity += localItem.quantity; // Add quantities
      existing.quantity = localItem.quantity; // set local quantities
    } else {
      merged.push(localItem);
    }
  });

  return merged;
};

export const syncCart = async () => {
  try {
    // 1. Get local cart
    const localCart = loadCartFromLocalStorage();

    // 2. Get DB cart
    const dbCartItems = await loadCartFromDB();

    let mergedCart: ICartItem[] = [];

    if (localCart.length > 0) {
      if (dbCartItems && dbCartItems.length > 0) {
        // Merge local + db
        mergedCart = mergeCarts(localCart, dbCartItems);
      } else {
        // Only local exists
        mergedCart = localCart;
      }

      // Save merged cart to DB
      await apiClient.addManyToCart(mergedCart);

      // Clear local storage (DB is now source of truth)
      // localStorage.removeItem("cart");
    } else {
      mergedCart = dbCartItems || [];
    }
    saveCartToLocalStorage(mergedCart);

    return mergedCart;
  } catch (err) {
    console.error("❌ Error syncing cart:", err);
    return [];
  }
};
