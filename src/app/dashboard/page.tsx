"use client";
import { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import apiClient from "@/lib/apiClient";
import type { ICart } from "@/types/cart";
import type { IOrder } from "@/types/order";
import Link from "next/link";

export default function DashboardPage() {
  const [orders, setOrders] = useState<IOrder[]>([]);
  const [ordersLoading, setOrdersLoading] = useState(true);
  const [cart, setCart] = useState<ICart | null>(null);
  const [cartLoading, setCartLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    (async () => {
      setOrdersLoading(true);
      const res = await apiClient.getOrders({ limit: 10 });
      if (isMounted && res.success) {
        setOrders((res.data as { orders?: IOrder[] })?.orders || []);
      }
      setOrdersLoading(false);
      isMounted = false;
    })();
    return () => {
      isMounted = false;
    }
  }, []);

  useEffect(() => {
    let isMounted = true;
    (async () => {
      setCartLoading(true);
      const res = await apiClient.getCart();
      if (isMounted && res.success) {
        setCart(res.data as ICart || null);
      }
      setCartLoading(false);
      isMounted = false;
    })();
    return () => {
      isMounted = false;
    }
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl md:text-3xl font-semibold mb-6">Your Dashboard</h1>
      <Tabs defaultValue="orders" className="w-full">
        <TabsList className="grid grid-cols-2 w-full md:w-auto">
          <TabsTrigger value="orders">Orders</TabsTrigger>
          <TabsTrigger value="cart">Cart</TabsTrigger>
        </TabsList>
        <TabsContent value="orders" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Your Recent Orders</CardTitle>
            </CardHeader>
            <CardContent>
              {ordersLoading ? (
                <div className="text-sm text-muted-foreground">Loading orders...</div>
              ) : orders.length === 0 ? (
                <div className="flex flex-col items-start gap-3">
                  <p className="text-sm text-muted-foreground">No orders yet.</p>
                  <Link href="/shop">
                    <Button>Shop now</Button>
                  </Link>
                </div>
              ) : (
                <div className="space-y-3">
                  {orders.map((order) => (
                    <div
                      key={String(order._id)}
                      className="flex flex-col md:flex-row md:items-center md:justify-between rounded-md border p-4 bg-card"
                    >
                      <div className="space-y-1">
                        <p className="text-sm">Order #{String(order._id).slice(-8)}</p>
                        <p className="text-xs text-muted-foreground">
                          Status: {order.status} • Total: ${order.total}
                        </p>
                      </div>
                      <div className="mt-3 md:mt-0 flex gap-2">
                        <Link href={`/orders/${order._id}`}>
                          <Button variant="outline" size="sm">View</Button>
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="cart" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Your Cart</CardTitle>
            </CardHeader>
            <CardContent>
              {cartLoading ? (
                <div className="text-sm text-muted-foreground">Loading cart...</div>
              ) : !cart || cart.items.length === 0 ? (
                <div className="flex flex-col items-start gap-3">
                  <p className="text-sm text-muted-foreground">Your cart is empty.</p>
                  <Link href="/shop">
                    <Button>Browse products</Button>
                  </Link>
                </div>
              ) : (
                <div className="space-y-3">
                  {cart.items.map((item) => (
                    <div key={`${item.productId}-${item.colorName}`} className="flex items-center justify-between rounded-md border p-4 bg-card">
                      <div className="space-y-1">
                        <p className="text-sm font-medium">{item.title}</p>
                        <p className="text-xs text-muted-foreground">Color: {item.colorName}</p>
                        <p className="text-xs text-muted-foreground">Qty: {item.quantity}</p>
                      </div>
                      <div className="text-sm">${item.price * item.quantity}</div>
                    </div>
                  ))}
                  <div className="pt-2">
                    <Link href="/shopping-cart">
                      <Button className="w-full md:w-auto">Go to cart</Button>
                    </Link>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}


