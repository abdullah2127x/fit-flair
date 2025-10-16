"use client";
import { useEffect, useMemo, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import apiClient from "@/lib/apiClient";
import Link from "next/link";
import EditProductDialog from "@/components/custom/EditProductDialog";

// import { useFieldArray, Controller, useForm } from "react-hook-form";
// import { Label } from "@/components/ui/label";
// import { Checkbox } from "@/components/ui/checkbox";
// import { X } from "lucide-react";
// import { Textarea } from "@/components/ui/textarea";

// type ProductForm = {
//   title: string;
//   variants: {
//     color: string;
//     featuredImage: File | null;
//     additionalImages: File[];
//     stock: number;
//   }[];
//   description: string;
//   // description: any[]; // portable text blocks

//   subTitle: string;
//   audience: "men" | "women";
//   category: string;
//   subCategory: string;
//   outfitType: string;
//   price: number;
//   fabric: string; // ref id
//   season: string[];
//   designs: string[];
//   occasions: string[];
// };

export default function AdminPage() {
  // const {
  //   control,
  //   watch,
  //   register,
  //   handleSubmit,
  //   formState: { errors, isSubmitting },
  //   reset,
  // } = useForm<ProductForm>({
  //   defaultValues: {
  //     audience: "men",
  //     description: "",
  //     season: [],
  //     designs: [],
  //     occasions: [],
  //   },
  // });

  // const { fields, append, remove } = useFieldArray({
  //   control,
  //   name: "variants",
  // });

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
  const [search, setSearch] = useState("");
  const [audience, setAudience] = useState<"all" | "men" | "women">("all");
  const [onlyFeatured, setOnlyFeatured] = useState(false);
  const [onlyNew, setOnlyNew] = useState(false);
  const [onlyPopular, setOnlyPopular] = useState(false);

  // const [submitError, setSubmitError] = useState<string | null>(null);
  // const [submitSuccess, setSubmitSuccess] = useState<string | null>(null);

  // all the fabrics from sanity
  // const [fabrics, setFabrics] = useState<{ _id: string; title: string }[]>([]);

  // all the colors from sanity
  // const [colors, setColors] = useState<{ _id: string; title: string }[]>([]);

  // load colors from backend
  // useEffect(() => {
  //   (async () => {
  //     const res = await apiClient.get("/admin/colors");
  //     console.log("the colors res is :", res);
  //     if (res.success) setColors(res.data as { _id: string; title: string }[]);
  //   })();
  // }, []);

  // loading fabrics
  // useEffect(() => {
  //   (async () => {
  //     const res = await apiClient.get("/admin/fabrics");
  //     console.log("the fabrics at the admin are : ", res);

  //     if (res.success) {
  //       console.log("setting the fabrics");
  //       setFabrics(res.data as { _id: string; title: string }[]);
  //     }
  //   })();
  // }, []);

  // Step 1: Chunked state
  const PAGE_SIZE = 24;
  const [page, setPage] = useState(0);
  const [loadingMore, setLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  // to fetch products, users and orders
  useEffect(() => {
    let mounted = true;
    (async () => {
      if (page === 0) setLoadingLists(true);
      else setLoadingMore(true);

      let url = `/admin/products?page=${page}&limit=${PAGE_SIZE}`;
      if (search) url += `&q=${encodeURIComponent(search)}`;
      const productsRes = await apiClient.get(url);

      if (!mounted) return;

      if (productsRes.success) {
        const incoming = productsRes.data as AdminProduct[];
        if (page === 0) setProducts(incoming);
        else setProducts((prev) => [...prev, ...incoming]);
        setHasMore(incoming.length === PAGE_SIZE);
      } else {
        if (page === 0) setProducts([]);
        setHasMore(false);
      }
      setLoadingLists(false);
      setLoadingMore(false);
    })();
    return () => {
      mounted = false;
    };
  }, [page, search]);

  // to load users and orders
  useEffect(() => {
    let mounted = true;
    (async () => {
      setLoadingLists(true);
      console.log("Admin page: Starting to fetch data...");

      try {
        const [usersRes, ordersRes] = await Promise.all([
          apiClient.get("/admin/users"),
          apiClient.get("/admin/orders"),
        ]);

        if (mounted) {
          if (usersRes.success) {
            setUsers((usersRes.data as any[]) || []);
          } else {
            console.error("Failed to load users:", usersRes.message);
          }

          if (ordersRes.success) {
            setOrders((ordersRes.data as any[]) || []);
          } else {
            console.error("Failed to load orders:", ordersRes.message);
          }

          setLoadingLists(false);
        }
      } catch (error) {
        console.error("Admin page: Error fetching data:", error);
        setLoadingLists(false);
      }
    })();
    return () => {
      mounted = false;
    };
  }, []);

  // Instead of reloadProducts, reset pagination!
  const reloadProducts = async () => {
    setPage(0);
    setHasMore(true);
    setLoadingLists(true);
    // "search" triggers effect above
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
    console.log("In the update product the res is :", res);
    if (res.success) await reloadProducts();
    return res.success;
  };

  // witout iamges
  // const onSubmit = async (data: ProductForm) => {
  //   // 1️⃣ Upload each variant image to Sanity
  //   setSubmitError(null);
  //   setSubmitSuccess(null);
  //   // Minimal required payload aligned to Sanity schema
  //   const payload = {
  //     ...data,
  //     fabric: {
  //       _type: "reference",
  //       _ref: data.fabric, // fabric id selected from dropdown
  //     },
  //     slug: data.title.toLowerCase().split(" ").join("-"),
  //     variants: data.variants,
  //     description: data.description?.length
  //       ? data.description
  //       : [
  //           {
  //             _type: "block",
  //             children: [{ _type: "span", text: data.subTitle }],
  //           },
  //         ],
  //   };

  //   const res = await apiClient.post("/admin/products", payload);
  //   if (!res.success) {
  //     setSubmitError(res.message || "Failed to create product");
  //     return;
  //   }
  //   setSubmitSuccess("Product created");
  //   // reset();
  //   reloadProducts();
  // };

  // with the images
  // const onSubmit = async (data: ProductForm) => {
  //   setSubmitError(null);
  //   setSubmitSuccess(null);

  //   const formData = new FormData();

  //   // add simple fields
  //   formData.append("title", data.title);
  //   formData.append("subTitle", data.subTitle);
  //   formData.append("audience", data.audience);
  //   formData.append("category", data.category);
  //   formData.append("subCategory", data.subCategory);
  //   formData.append("price", data.price.toString());
  //   formData.append("fabric", data.fabric);
  //   formData.append("slug", data.title.toLowerCase().split(" ").join("-"));
  //   formData.append("description", data.description || "");

  //   // add variants
  //   data.variants.forEach((variant, index) => {
  //     formData.append(`variants[${index}][color]`, variant.color);
  //     formData.append(`variants[${index}][stock]`, variant.stock.toString());

  //     if (variant.featuredImage) {
  //       formData.append(
  //         `variants[${index}][featuredImage]`,
  //         variant.featuredImage
  //       );
  //     }

  //     if (variant.additionalImages) {
  //       // convert FileList or single File into an array safely
  //       const files = Array.isArray(variant.additionalImages)
  //         ? variant.additionalImages
  //         : Array.from(variant.additionalImages);

  //       files.forEach((file, i) => {
  //         formData.append(
  //           `variants[${index}][additionalImages][${i}]`,
  //           file as File
  //         );
  //       });
  //     }
  //     console.log("Form data at the Admin client is :", formData);
  //     // if (variant.additionalImages?.length) {
  //     // variant.additionalImages.forEach((file, i) => {
  //     // formData.append(`variants[${index}][additionalImages][${i}]`, file);
  //     // });
  //     // }
  //   });

  //   const res = await fetch("/api/admin/products", {
  //     method: "POST",
  //     body: formData, // ✅ not JSON
  //   });

  //   const result = await res.json();
  //   if (!result.success) {
  //     setSubmitError(result.message || "Failed to create product");
  //     return;
  //   }

  //   setSubmitSuccess("Product created");
  //   // reset()
  //   reloadProducts();
  // };

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
            <Button asChild variant={"secondary"} size="lg" className="w-full">
              <Link href="studio">Add New Product</Link>
            </Button>
          </Card>
          {/* Add product content is place inside the 
          components/custom/admin/AddProduct.tsx */}

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
                  <Select
                    value={audience}
                    onValueChange={(value) => setAudience(value as any)}
                  >
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Select Audience" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Audience</SelectLabel>
                        <SelectItem value="all">All</SelectItem>
                        <SelectItem value="men">Men</SelectItem>
                        <SelectItem value="women">Women</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>

                  <Button
                    variant={onlyFeatured ? "secondary" : "outline"}
                    onClick={() => setOnlyFeatured((v) => !v)}
                  >
                    Featured
                  </Button>
                  <Button
                    variant={onlyNew ? "secondary" : "outline"}
                    onClick={() => setOnlyNew((v) => !v)}
                  >
                    New
                  </Button>
                  <Button
                    variant={onlyPopular ? "secondary" : "outline"}
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
                            {/* <Button
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
                            </Button> */}
                            <EditProductDialog
                              product={p}
                              onUpdate={async (id, data) => {
                                await updateProduct(id, data);
                              }}
                            />

                            {/* <Button
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
                            </Button> */}

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
                  {hasMore && (
                    <Button
                      variant="outline"
                      // loading={loadingMore}
                      disabled={loadingMore}
                      className="w-full mt-4"
                      onClick={() => {
                        setPage((p) => p + 1);
                        setLoadingMore(true);
                      }}
                    >
                      {loadingMore ? "Loading more…" : "Show More"}
                    </Button>
                  )}
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
