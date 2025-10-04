import apiClient from "@/lib/apiClient";
import { ICartItem } from "@/types/cart";

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
      await apiClient.addManyToCart(items);
    }
  } catch (error) {
    console.error("❌ Error syncing cart:", error);
  }
};

export const clearCartFromDB = async () => {
  try {
    await apiClient.clearCart();
  } catch (error) {
    console.error("❌ Error clearing cart:", error);
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
      // sum the quntity of both
      // existing.quantity += localItem.quantity; // Add quantities
      existing.quantity = localItem.quantity; // set local quantities
    } else {
      merged.push(localItem);
    }
  });

  return merged;
};

// this is to merge the cart and if there is same so priorities to the quantity of local cart and then save merged to db and local
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

    // Only save to localStorage if we have items to save
    if (mergedCart.length > 0) {
      saveCartToLocalStorage(mergedCart);
    } else {
      // If merged cart is empty, clear localStorage
      clearCartFromLocalStorage();
    }

    return mergedCart;
  } catch (err) {
    console.error("❌ Error syncing cart:", err);
    return [];
  }
};

// this is to merge the cart and if there is same so priorities to the quantity of local cart and then save merged to db and local
export const syncCartForDelete = async () => {
  try {
    // 1. Get local cart
    const localCart = loadCartFromLocalStorage();
    await saveCartToDB(localCart);
  } catch (err) {
    console.error("❌ Error syncing cart:", err);
    return [];
  }
};
