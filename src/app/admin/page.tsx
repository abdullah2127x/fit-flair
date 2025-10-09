"use client";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import apiClient from "@/lib/apiClient";

type ProductForm = {
  title: string;
  subTitle: string;
  audience: "men" | "women";
  category?: string;
  subCategory: string;
  price: number;
  fabric: string; // ref id
  season: string[];
  designs: string[];
  occasions: string[];
  description: any[]; // portable text blocks
};

export default function AdminPage() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ProductForm>({
    defaultValues: { audience: "men", season: [], designs: [], occasions: [] },
  });

  const [users, setUsers] = useState<any[]>([]);
  const [orders, setOrders] = useState<any[]>([]);
  const [loadingLists, setLoadingLists] = useState(true);
  const [products, setProducts] = useState<any[]>([]);
  const [loadingProducts, setLoadingProducts] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitSuccess, setSubmitSuccess] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    (async () => {
      setLoadingLists(true);
      const [usersRes, ordersRes, productsRes] = await Promise.all([
        apiClient.get("/admin/users"),
        apiClient.get("/admin/orders"),
        apiClient.get("/admin/products"),
      ]);
      if (mounted) {
        if (usersRes.success) setUsers((usersRes.data as any[]) || []);
        if (ordersRes.success) setOrders((ordersRes.data as any[]) || []);
        if (productsRes.success) setProducts((productsRes.data as any[]) || []);
        setLoadingLists(false);
      }
    })();
    return () => {
      mounted = false;
    };
  }, []);

  const reloadProducts = async () => {
    setLoadingProducts(true);
    const res = await apiClient.get("/admin/products");
    if (res.success) setProducts((res.data as any[]) || []);
    setLoadingProducts(false);
  };

  const onSubmit = async (data: ProductForm) => {
    setSubmitError(null);
    setSubmitSuccess(null);
    // Minimal required payload aligned to Sanity schema
    const payload = {
      ...data,
      variants: [],
      description: data.description?.length ? data.description : [{ _type: "block", children: [{ _type: "span", text: data.subTitle }] }],
    } as any;
    const res = await apiClient.post("/admin/products", payload);
    if (!res.success) {
      setSubmitError(res.message || "Failed to create product");
      return;
    }
    setSubmitSuccess("Product created");
    reset();
    reloadProducts();
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl md:text-3xl font-semibold mb-6">Admin Dashboard</h1>
      <Tabs defaultValue="products">
        <TabsList className="grid grid-cols-3 w-full md:w-auto">
          <TabsTrigger value="products">Products</TabsTrigger>
          <TabsTrigger value="users">Users</TabsTrigger>
          <TabsTrigger value="orders">Orders</TabsTrigger>
        </TabsList>

        <TabsContent value="products" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Add Product</CardTitle>
            </CardHeader>
            <CardContent>
              <form className="grid grid-cols-1 md:grid-cols-2 gap-4" onSubmit={handleSubmit(onSubmit)}>
                <div>
                  <Label htmlFor="title">Title</Label>
                  <Input id="title" placeholder="Product title" {...register("title", { required: "Title is required", minLength: { value: 3, message: "At least 3 chars" } })} />
                  {errors.title && <p className="text-xs text-destructive mt-1">{errors.title.message}</p>}
                </div>
                <div>
                  <Label htmlFor="subTitle">Subtitle</Label>
                  <Input id="subTitle" placeholder="Short subtitle" {...register("subTitle", { required: "Subtitle is required" })} />
                  {errors.subTitle && <p className="text-xs text-destructive mt-1">{errors.subTitle.message}</p>}
                </div>
                <div>
                  <Label>Audience</Label>
                  <select className="w-full border rounded h-10 px-3 bg-background" {...register("audience", { required: "Audience is required" })}>
                    <option value="men">Men</option>
                    <option value="women">Women</option>
                  </select>
                  {errors.audience && <p className="text-xs text-destructive mt-1">{errors.audience.message}</p>}
                </div>
                <div>
                  <Label>Sub Category</Label>
                  <select className="w-full border rounded h-10 px-3 bg-background" {...register("subCategory", { required: "Sub category is required" })}>
                    <option value="top">Top</option>
                    <option value="bottom">Bottom</option>
                    <option value="2piece">2 Piece</option>
                    <option value="3piece">3 Piece</option>
                  </select>
                  {errors.subCategory && <p className="text-xs text-destructive mt-1">{errors.subCategory.message}</p>}
                </div>
                <div>
                  <Label htmlFor="price">Price</Label>
                  <Input id="price" type="number" step="0.01" placeholder="0.00" {...register("price", { required: "Price is required", valueAsNumber: true, min: { value: 0, message: "Price must be ≥ 0" } })} />
                  {errors.price && <p className="text-xs text-destructive mt-1">{errors.price.message}</p>}
                </div>
                <div>
                  <Label htmlFor="fabric">Fabric (Sanity ref id)</Label>
                  <Input id="fabric" placeholder="fabric _id" {...register("fabric", { required: "Fabric is required" })} />
                  {errors.fabric && <p className="text-xs text-destructive mt-1">{errors.fabric.message}</p>}
                </div>
                <div className="md:col-span-2">
                  <Label htmlFor="season">Season (comma separated)</Label>
                  <Input id="season" placeholder="summer,winter" {...register("season", { required: "Season is required", setValueAs: (v) => String(v || "").split(",").map((s: string) => s.trim()).filter(Boolean) })} />
                  {errors.season && <p className="text-xs text-destructive mt-1">{errors.season.message}</p>}
                </div>
                <div className="md:col-span-2">
                  <Label htmlFor="designs">Designs (comma separated)</Label>
                  <Input id="designs" placeholder="plain,printed" {...register("designs", { required: "Designs are required", setValueAs: (v) => String(v || "").split(",").map((s: string) => s.trim()).filter(Boolean) })} />
                  {errors.designs && <p className="text-xs text-destructive mt-1">{errors.designs.message}</p>}
                </div>
                <div className="md:col-span-2">
                  <Label htmlFor="occasions">Occasions (comma separated)</Label>
                  <Input id="occasions" placeholder="casual,formal" {...register("occasions", { required: "Occasions are required", setValueAs: (v) => String(v || "").split(",").map((s: string) => s.trim()).filter(Boolean) })} />
                  {errors.occasions && <p className="text-xs text-destructive mt-1">{errors.occasions.message}</p>}
                </div>
                {submitError && <p className="text-sm text-destructive md:col-span-2">{submitError}</p>}
                {submitSuccess && <p className="text-sm text-green-600 md:col-span-2">{submitSuccess}</p>}
                <div className="md:col-span-2 flex gap-3">
                  <Button type="submit" disabled={isSubmitting}>{isSubmitting ? "Creating..." : "Create product"}</Button>
                  <Button type="button" variant="outline" onClick={() => reset()}>Reset</Button>
                </div>
              </form>
            </CardContent>
          </Card>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Products</CardTitle>
            </CardHeader>
            <CardContent>
              {loadingLists || loadingProducts ? (
                <div className="text-sm text-muted-foreground">Loading products…</div>
              ) : (
                <div className="space-y-2">
                  {products.map((p) => (
                    <div key={p._id} className="flex flex-col md:flex-row md:items-center md:justify-between border rounded p-3 bg-card">
                      <div className="space-y-1">
                        <p className="text-sm font-medium">{p.title}</p>
                        <p className="text-xs text-muted-foreground">{p.subTitle}</p>
                        <p className="text-xs text-muted-foreground">${p.price} • {p.audience} • {p.subCategory}</p>
                      </div>
                      <div className="mt-2 md:mt-0 flex gap-2">
                        <Button variant="outline" size="sm" onClick={async () => {
                          const newTitle = prompt("New title", p.title);
                          if (!newTitle) return;
                          const res = await apiClient.put(`/admin/products/${p._id}`, { title: newTitle });
                          if (res.success) reloadProducts();
                        }}>Edit</Button>
                        <Button variant="destructive" size="sm" onClick={async () => {
                          if (!confirm("Delete this product?")) return;
                          const res = await apiClient.delete(`/admin/products/${p._id}`);
                          if (res.success) reloadProducts();
                        }}>Delete</Button>
                      </div>
                    </div>) )}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="users" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Users</CardTitle>
            </CardHeader>
            <CardContent>
              {loadingLists ? (
                <div className="text-sm text-muted-foreground">Loading users…</div>
              ) : (
                <div className="space-y-2">
                  {users.map((u) => (
                    <div key={u._id} className="flex items-center justify-between border rounded p-3 bg-card">
                      <div>
                        <p className="text-sm font-medium">{u.fullName || `${u.firstName} ${u.lastName}`}</p>
                        <p className="text-xs text-muted-foreground">{u.email}</p>
                      </div>
                      <div className="text-xs text-muted-foreground">{new Date(u.createdAt).toLocaleString()}</div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="orders" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Orders</CardTitle>
            </CardHeader>
            <CardContent>
              {loadingLists ? (
                <div className="text-sm text-muted-foreground">Loading orders…</div>
              ) : (
                <div className="space-y-2">
                  {orders.map((o) => (
                    <div key={o._id} className="flex flex-col md:flex-row md:items-center md:justify-between border rounded p-3 bg-card">
                      <div className="space-y-1">
                        <p className="text-sm">Order #{String(o._id).slice(-8)}</p>
                        <p className="text-xs text-muted-foreground">Status: {o.status} • Total: ${o.total}</p>
                      </div>
                      <div className="text-xs text-muted-foreground mt-2 md:mt-0">{new Date(o.createdAt).toLocaleString()}</div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}


