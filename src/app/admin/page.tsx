"use client";
import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import apiClient from "@/lib/apiClient";
import Link from "next/link";

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

  type AdminProduct = {
    id: string;
    title: string;
    subTitle: string;
    slug: string;
    price: number;
    discount?: number;
    category: string;
    subCategory: string;
    fabric: string;
    audience: "men" | "women";
    designs: string[];
    occasions: string[];
    season: string[];
    variants: Array<{
      stock: number;
      featuredImage?: string;
      additionalImages?: string[];
      colorName?: string;
      colorCode?: string;
    }>;
    description: string;
    uploadedAt: string;
    isFeatured?: boolean;
    isNewArrival?: boolean;
    isPopular?: boolean;
    relevantTags?: string[];
    outFitType?: string;
  };

  const [users, setUsers] = useState<any[]>([]);
  const [orders, setOrders] = useState<any[]>([]);
  const [loadingLists, setLoadingLists] = useState(true);
  const [products, setProducts] = useState<AdminProduct[]>([]);
  const [loadingProducts, setLoadingProducts] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitSuccess, setSubmitSuccess] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [audience, setAudience] = useState<"all" | "men" | "women">("all");
  const [onlyFeatured, setOnlyFeatured] = useState(false);
  const [onlyNew, setOnlyNew] = useState(false);
  const [onlyPopular, setOnlyPopular] = useState(false);

  useEffect(() => {
    let mounted = true;
    (async () => {
      setLoadingLists(true);
      const [usersRes, ordersRes, productsRes] = await Promise.all([
        apiClient.get("/admin/users"),
        apiClient.get("/admin/orders"),
        apiClient.get<AdminProduct[]>("/admin/products"),
      ]);
      if (mounted) {
        if (usersRes.success) setUsers((usersRes.data as any[]) || []);
        if (ordersRes.success) setOrders((ordersRes.data as any[]) || []);
        if (productsRes.success)
          setProducts((productsRes.data as AdminProduct[]) || []);
        setLoadingLists(false);
      }
    })();
    return () => {
      mounted = false;
    };
  }, []);

  const reloadProducts = async () => {
    setLoadingProducts(true);
    const queryParam = search ? `?q=${encodeURIComponent(search)}` : "";
    const res = await apiClient.get<AdminProduct[]>(
      `/admin/products${queryParam}`
    );
    if (res.success) setProducts((res.data as AdminProduct[]) || []);
    setLoadingProducts(false);
  };

  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      if (audience !== "all" && p.audience !== audience) return false;
      if (onlyFeatured && !p.isFeatured) return false;
      if (onlyNew && !p.isNewArrival) return false;
      if (onlyPopular && !p.isPopular) return false;
      return true;
    });
  }, [products, audience, onlyFeatured, onlyNew, onlyPopular]);

  const updateProduct = async (id: string, data: Partial<AdminProduct>) => {
    const res = await apiClient.put(`/admin/products/${id}`, data);
    if (res.success) await reloadProducts();
    return res.success;
  };

  const onSubmit = async (data: ProductForm) => {
    setSubmitError(null);
    setSubmitSuccess(null);
    // Minimal required payload aligned to Sanity schema
    const payload = {
      ...data,
      variants: [],
      description: data.description?.length
        ? data.description
        : [
            {
              _type: "block",
              children: [{ _type: "span", text: data.subTitle }],
            },
          ],
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
      <h1 className="text-2xl md:text-3xl font-semibold mb-6">
        Admin Dashboard
      </h1>
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
              <form
                className="grid grid-cols-1 md:grid-cols-2 gap-4"
                onSubmit={handleSubmit(onSubmit)}
              >
                <div>
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    placeholder="Product title"
                    {...register("title", {
                      required: "Title is required",
                      minLength: { value: 3, message: "At least 3 chars" },
                    })}
                  />
                  {errors.title && (
                    <p className="text-xs text-destructive mt-1">
                      {errors.title.message}
                    </p>
                  )}
                </div>
                <div>
                  <Label htmlFor="subTitle">Subtitle</Label>
                  <Input
                    id="subTitle"
                    placeholder="Short subtitle"
                    {...register("subTitle", {
                      required: "Subtitle is required",
                    })}
                  />
                  {errors.subTitle && (
                    <p className="text-xs text-destructive mt-1">
                      {errors.subTitle.message}
                    </p>
                  )}
                </div>
                <div>
                  <Label>Audience</Label>
                  <select
                    className="w-full border rounded h-10 px-3 bg-background"
                    {...register("audience", {
                      required: "Audience is required",
                    })}
                  >
                    <option value="men">Men</option>
                    <option value="women">Women</option>
                  </select>
                  {errors.audience && (
                    <p className="text-xs text-destructive mt-1">
                      {errors.audience.message}
                    </p>
                  )}
                </div>
                <div>
                  <Label>Sub Category</Label>
                  <select
                    className="w-full border rounded h-10 px-3 bg-background"
                    {...register("subCategory", {
                      required: "Sub category is required",
                    })}
                  >
                    <option value="top">Top</option>
                    <option value="bottom">Bottom</option>
                    <option value="2piece">2 Piece</option>
                    <option value="3piece">3 Piece</option>
                  </select>
                  {errors.subCategory && (
                    <p className="text-xs text-destructive mt-1">
                      {errors.subCategory.message}
                    </p>
                  )}
                </div>
                <div>
                  <Label htmlFor="price">Price</Label>
                  <Input
                    id="price"
                    type="number"
                    step="0.01"
                    placeholder="0.00"
                    {...register("price", {
                      required: "Price is required",
                      valueAsNumber: true,
                      min: { value: 0, message: "Price must be ≥ 0" },
                    })}
                  />
                  {errors.price && (
                    <p className="text-xs text-destructive mt-1">
                      {errors.price.message}
                    </p>
                  )}
                </div>
                <div>
                  <Label htmlFor="fabric">Fabric (Sanity ref id)</Label>
                  <Input
                    id="fabric"
                    placeholder="fabric _id"
                    {...register("fabric", { required: "Fabric is required" })}
                  />
                  {errors.fabric && (
                    <p className="text-xs text-destructive mt-1">
                      {errors.fabric.message}
                    </p>
                  )}
                </div>
                <div className="md:col-span-2">
                  <Label htmlFor="season">Season (comma separated)</Label>
                  <Input
                    id="season"
                    placeholder="summer,winter"
                    {...register("season", {
                      required: "Season is required",
                      setValueAs: (v) =>
                        String(v || "")
                          .split(",")
                          .map((s: string) => s.trim())
                          .filter(Boolean),
                    })}
                  />
                  {errors.season && (
                    <p className="text-xs text-destructive mt-1">
                      {errors.season.message}
                    </p>
                  )}
                </div>
                <div className="md:col-span-2">
                  <Label htmlFor="designs">Designs (comma separated)</Label>
                  <Input
                    id="designs"
                    placeholder="plain,printed"
                    {...register("designs", {
                      required: "Designs are required",
                      setValueAs: (v) =>
                        String(v || "")
                          .split(",")
                          .map((s: string) => s.trim())
                          .filter(Boolean),
                    })}
                  />
                  {errors.designs && (
                    <p className="text-xs text-destructive mt-1">
                      {errors.designs.message}
                    </p>
                  )}
                </div>
                <div className="md:col-span-2">
                  <Label htmlFor="occasions">Occasions (comma separated)</Label>
                  <Input
                    id="occasions"
                    placeholder="casual,formal"
                    {...register("occasions", {
                      required: "Occasions are required",
                      setValueAs: (v) =>
                        String(v || "")
                          .split(",")
                          .map((s: string) => s.trim())
                          .filter(Boolean),
                    })}
                  />
                  {errors.occasions && (
                    <p className="text-xs text-destructive mt-1">
                      {errors.occasions.message}
                    </p>
                  )}
                </div>
                {submitError && (
                  <p className="text-sm text-destructive md:col-span-2">
                    {submitError}
                  </p>
                )}
                {submitSuccess && (
                  <p className="text-sm text-green-600 md:col-span-2">
                    {submitSuccess}
                  </p>
                )}
                <div className="md:col-span-2 flex gap-3">
                  <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? "Creating..." : "Create product"}
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => reset()}
                  >
                    Reset
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Products</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col gap-3 mb-4 md:flex-row md:items-center md:justify-between">
                <div className="flex gap-2 w-full md:w-auto">
                  <Input
                    placeholder="Search by title or subtitle"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                  <Button variant="outline" onClick={reloadProducts}>
                    Search
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  <select
                    className="border rounded h-10 px-3 bg-background"
                    value={audience}
                    onChange={(e) => setAudience(e.target.value as any)}
                  >
                    <option value="all">All</option>
                    <option value="men">Men</option>
                    <option value="women">Women</option>
                  </select>
                  <Button
                    variant={onlyFeatured ? "default" : "outline"}
                    onClick={() => setOnlyFeatured((v) => !v)}
                  >
                    Featured
                  </Button>
                  <Button
                    variant={onlyNew ? "default" : "outline"}
                    onClick={() => setOnlyNew((v) => !v)}
                  >
                    New
                  </Button>
                  <Button
                    variant={onlyPopular ? "default" : "outline"}
                    onClick={() => setOnlyPopular((v) => !v)}
                  >
                    Popular
                  </Button>
                </div>
              </div>

              {loadingLists || loadingProducts ? (
                <div className="text-sm text-muted-foreground">
                  Loading products…
                </div>
              ) : filteredProducts.length === 0 ? (
                <div className="text-sm text-muted-foreground">
                  No products found.
                </div>
              ) : (
                <div className="grid grid-cols-1 gap-3">
                  {filteredProducts.map((p) => {
                    const img = p.variants?.[0]?.featuredImage;
                    return (
                      <div
                        key={p.id}
                        className="flex flex-col gap-3 border rounded p-3 bg-card md:flex-row md:items-center md:justify-between"
                      >
                        <div className="flex items-start gap-3">
                          {img ? (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img
                              src={img}
                              alt={p.title}
                              className="size-16 rounded object-cover"
                            />
                          ) : (
                            <div className="size-16 rounded bg-muted" />
                          )}
                          <div className="space-y-1">
                            <p className="text-sm font-medium">{p.title}</p>
                            <p className="text-xs text-muted-foreground">
                              {p.subTitle}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              ${p.price} • {p.audience} • {p.subCategory}
                            </p>
                            <div className="flex flex-wrap gap-2 pt-1">
                              {p.isFeatured ? (
                                <span className="text-xs rounded px-2 py-0.5 bg-emerald-600/10 text-emerald-600">
                                  Featured
                                </span>
                              ) : null}
                              {p.isNewArrival ? (
                                <span className="text-xs rounded px-2 py-0.5 bg-sky-600/10 text-sky-600">
                                  New
                                </span>
                              ) : null}
                              {p.isPopular ? (
                                <span className="text-xs rounded px-2 py-0.5 bg-fuchsia-600/10 text-fuchsia-600">
                                  Popular
                                </span>
                              ) : null}
                            </div>
                          </div>
                        </div>
                        <div className="flex flex-col items-center gap-2 md:mt-0">
                          <div className="flex gap-2 flex-wrap items-center">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={async () => {
                                const newTitle = prompt("New title", p.title);
                                if (!newTitle) return;
                                await updateProduct(p.id, {
                                  title: newTitle,
                                } as any);
                              }}
                            >
                              Edit Title
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={async () => {
                                const newPriceStr = prompt(
                                  "New price",
                                  String(p.price)
                                );
                                if (!newPriceStr) return;
                                const newPrice = Number(newPriceStr);
                                if (Number.isNaN(newPrice) || newPrice < 0)
                                  return alert("Invalid price");
                                await updateProduct(p.id, {
                                  price: newPrice,
                                } as any);
                              }}
                            >
                              Edit Price
                            </Button>
                            <Button
                              variant={p.isFeatured ? "secondary" : "outline"}
                              size="sm"
                              onClick={async () => {
                                await updateProduct(p.id, {
                                  isFeatured: !p.isFeatured,
                                } as any);
                              }}
                            >
                              {p.isFeatured ? "Unfeature" : "Feature"}
                            </Button>
                            <Button
                              variant={p.isNewArrival ? "secondary" : "outline"}
                              size="sm"
                              onClick={async () => {
                                await updateProduct(p.id, {
                                  isNewArrival: !p.isNewArrival,
                                } as any);
                              }}
                            >
                              {p.isNewArrival ? "Unset New" : "Mark New"}
                            </Button>
                            <Button
                              variant={p.isPopular ? "secondary" : "outline"}
                              size="sm"
                              onClick={async () => {
                                await updateProduct(p.id, {
                                  isPopular: !p.isPopular,
                                } as any);
                              }}
                            >
                              {p.isPopular ? "Unset Popular" : "Mark Popular"}
                            </Button>
                          </div>
                          <div className="flex gap-2 items-center">
                            <Button asChild variant="default" size="sm">
                              <Link href={`/shop/${p.slug}`}>View</Link>
                            </Button>
                            <Button
                              variant="destructive"
                              size="sm"
                              onClick={async () => {
                                if (!confirm("Delete this product?")) return;
                                const res = await apiClient.delete(
                                  `/admin/products/${p.id}`
                                );
                                if (res.success) reloadProducts();
                              }}
                            >
                              Delete
                            </Button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
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
                <div className="text-sm text-muted-foreground">
                  Loading users…
                </div>
              ) : (
                <div className="space-y-2">
                  {users.map((u) => (
                    <div
                      key={u._id}
                      className="flex items-center justify-between border rounded p-3 bg-card"
                    >
                      <div>
                        <p className="text-sm font-medium">
                          {u.fullName || `${u.firstName} ${u.lastName}`}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {u.email}
                        </p>
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {new Date(u.createdAt).toLocaleString()}
                      </div>
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
                <div className="text-sm text-muted-foreground">
                  Loading orders…
                </div>
              ) : (
                <div className="space-y-2">
                  {orders.map((o) => (
                    <div
                      key={o._id}
                      className="flex flex-col md:flex-row md:items-center md:justify-between border rounded p-3 bg-card"
                    >
                      <div className="space-y-1">
                        <p className="text-sm">
                          Order #{String(o._id).slice(-8)}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Status: {o.status} • Total: ${o.total}
                        </p>
                      </div>
                      <div className="text-xs text-muted-foreground mt-2 md:mt-0">
                        {new Date(o.createdAt).toLocaleString()}
                      </div>
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
