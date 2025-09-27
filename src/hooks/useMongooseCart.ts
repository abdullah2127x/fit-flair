// import { useState, useEffect } from 'react';
// import { useUser } from '@clerk/nextjs';
// import apiClient from '@/lib/apiClient';

// interface CartItem {
//   productId: string;
//   productTitle: string;
//   productSlug: string;
//   subTitle: string;
//   price: number;
//   discount: number;
//   imageSrc: string;
//   colorName: string;
//   quantity: number;
// }

// interface Cart {
//   _id: string;
//   userId: string;
//   items: CartItem[];
//   totalItems: number;
//   subtotal: number;
//   createdAt: string;
//   updatedAt: string;
// }

// export function useMongooseCart() {
//   const { user, isLoaded } = useUser();
//   const [cart, setCart] = useState<Cart | null>(null);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);

//   // Fetch cart from database
//   const fetchCart = async () => {
//     if (!user) return;
    
//     setLoading(true);
//     setError(null);
    
//     try {
//       const cartData = await apiClient.getCart();
//       setCart(cartData);
//     } catch (err) {
//       setError(err instanceof Error ? err.message : 'Failed to fetch cart');
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Add item to cart
//   const addToCart = async (item: Omit<CartItem, 'quantity'> & { quantity?: number }) => {
//     if (!user) {
//       setError('Please sign in to add items to cart');
//       return;
//     }

//     setLoading(true);
//     setError(null);

//     try {
//       const cartData = await apiClient.addToCart({
//         ...item,
//         quantity: item.quantity || 1,
//       });
//       setCart(cartData);
//     } catch (err) {
//       setError(err instanceof Error ? err.message : 'Failed to add to cart');
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Update item quantity
//   const updateQuantity = async (productId: string, colorName: string, quantity: number) => {
//     if (!user) return;

//     setLoading(true);
//     setError(null);

//     try {
//       const cartData = await apiClient.updateCartItem(productId, colorName, quantity);
//       setCart(cartData);
//     } catch (err) {
//       setError(err instanceof Error ? err.message : 'Failed to update quantity');
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Remove item from cart
//   const removeFromCart = async (productId: string, colorName: string) => {
//     if (!user) return;

//     setLoading(true);
//     setError(null);

//     try {
//       const cartData = await apiClient.removeFromCart(productId, colorName);
//       setCart(cartData);
//     } catch (err) {
//       setError(err instanceof Error ? err.message : 'Failed to remove from cart');
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Clear entire cart
//   const clearCart = async () => {
//     if (!user) return;

//     setLoading(true);
//     setError(null);

//     try {
//       const cartData = await apiClient.clearCart();
//       setCart(cartData);
//     } catch (err) {
//       setError(err instanceof Error ? err.message : 'Failed to clear cart');
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Load cart when user is loaded
//   useEffect(() => {
//     if (isLoaded && user) {
//       fetchCart();
//     } else if (isLoaded && !user) {
//       setCart(null);
//     }
//   }, [isLoaded, user]);

//   return {
//     cart,
//     loading,
//     error,
//     addToCart,
//     updateQuantity,
//     removeFromCart,
//     clearCart,
//     refetch: fetchCart,
//   };
// }
