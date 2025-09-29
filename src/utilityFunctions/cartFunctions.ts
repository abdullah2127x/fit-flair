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
    console.log("Saving items to local storage :", items);
    localStorage.setItem("cart", JSON.stringify(items));
  }
};

// Clear localStorage cart
export const clearCartFromLocalStorage = () => {
  if (typeof window !== "undefined") {
    console.log("Removing cart from local storage");
    localStorage.removeItem("cart");
  }
};

export const loadCartFromDB = async () => {
  try {
    console.log("Fetching cart from DB...");
    const dbCartRes = await apiClient.getCart();
    console.log("The db cart result is :", dbCartRes);
    if (
      dbCartRes.success &&
      (dbCartRes.data as { items?: ICartItem[] })?.items
    ) {
      return (dbCartRes.data as { items: ICartItem[] }).items;
    } else {
      console.log("No cart items found in DB");
      return null;
    }
  } catch (err) {
    throw err;
  }
};

export const saveCartToDB = async (items: ICartItem[]) => {
  try {
    console.log("Saving cart to DB...");

    if (items.length > 0) {
      const addManyToCartRes = await apiClient.addManyToCart(items);

      if (!addManyToCartRes) {
        console.error("❌ Error while saving cart to DB", addManyToCartRes);
      } else {
        console.log("✅ Cart saved to DB successfully.");
      }
    } else {
      console.log("ℹ️ No items to save to DB.");
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
      // sum the quntity of both
      // existing.quantity += localItem.quantity; // Add quantities
    } else {
      merged.push(localItem);
    }
  });

  return merged;
};

export const syncCart = async () => {
  try {
    console.log("🔄 Syncing cart...");

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

      console.log("✅ Cart synced: Local → DB");
    } else {
      console.log("No local cart to sync. Using DB cart.");
      mergedCart = dbCartItems || [];
    }
    saveCartToLocalStorage(mergedCart);

    return mergedCart;
  } catch (err) {
    console.error("❌ Error syncing cart:", err);
    return [];
  }
};
