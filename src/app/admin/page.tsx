"use client";
import { useEffect, useMemo, useState } from "react";
import { useFieldArray, Controller, useForm } from "react-hook-form";
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
import { Label } from "@/components/ui/label";
import apiClient from "@/lib/apiClient";
import Link from "next/link";
import EditProductDialog from "@/components/custom/EditProductDialog";
import { Checkbox } from "@/components/ui/checkbox";
import { X } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import DescriptionEditor from "@/components/custom/admin/DescriptionEditor";

type ProductForm = {
  title: string;
  variants: {
    color: string;
    featuredImage: File | null;
    additionalImages: File[];
    stock: number;
  }[];
  description: string;
  // description: any[]; // portable text blocks

  subTitle: string;
  audience: "men" | "women";
  category: string;
  subCategory: string;
  outfitType: string;
  price: number;
  fabric: string; // ref id
  season: string[];
  designs: string[];
  occasions: string[];
};

export default function AdminPage() {
  const {
    control,
    watch,
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ProductForm>({
    defaultValues: {
      audience: "men",
      description: "",
      season: [],
      designs: [],
      occasions: [],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "variants",
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

  const [fabrics, setFabrics] = useState<{ _id: string; title: string }[]>([]);
  const [colors, setColors] = useState<{ _id: string; title: string }[]>([]);

  // load colors from backend
  useEffect(() => {
    (async () => {
      const res = await apiClient.get("/admin/colors");
      console.log("the colors res is :", res);
      if (res.success) setColors(res.data as { _id: string; title: string }[]);
    })();
  }, []);

  // loading fabrics
  useEffect(() => {
    (async () => {
      const res = await apiClient.get("/admin/fabrics");
      console.log("the fabrics at the admin are : ", res);

      if (res.success) {
        console.log("setting the fabrics");
        setFabrics(res.data as { _id: string; title: string }[]);
      }
    })();
  }, []);

  useEffect(() => {
    let mounted = true;
    (async () => {
      setLoadingLists(true);
      console.log("Admin page: Starting to fetch data...");

      try {
        const [usersRes, ordersRes, productsRes] = await Promise.all([
          apiClient.get("/admin/users"),
          apiClient.get("/admin/orders"),
          apiClient.get<AdminProduct[]>("/admin/products"),
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

          if (productsRes.success) {
            setProducts((productsRes.data as AdminProduct[]) || []);
            console.log("Products loaded:", productsRes.data as AdminProduct[]);
          } else {
            console.error("Failed to load products:", productsRes.message);
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
    console.log("In the update product the res is :", res);
    if (res.success) await reloadProducts();
    return res.success;
  };

  const onSubmit = async (data: ProductForm) => {
    setSubmitError(null);
    setSubmitSuccess(null);
    // Minimal required payload aligned to Sanity schema
    const payload = {
      ...data,
      fabric: {
        _type: "reference",
        _ref: data.fabric, // fabric id selected from dropdown
      },
      variants: [],
      slug:data.title.split.join("-"),
      description: data.description?.length
        ? data.description
        : [
            {
              _type: "block",
              children: [{ _type: "span", text: data.subTitle }],
            },
          ],
    };

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

                  <Controller
                    name="audience"
                    control={control}
                    rules={{ required: "Audience is required" }}
                    render={({ field }) => (
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <SelectTrigger className="w-full h-10 px-3 bg-background">
                          <SelectValue placeholder="Select Audience" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="men">Men</SelectItem>
                          <SelectItem value="women">Women</SelectItem>
                        </SelectContent>
                      </Select>
                    )}
                  />

                  {errors.audience && (
                    <p className="text-xs text-destructive mt-1">
                      {errors.audience.message}
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
                  <Label>Category</Label>
                  <Controller
                    name="category"
                    control={control}
                    rules={{ required: "Category is required" }}
                    render={({ field }) => (
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <SelectTrigger className="w-full h-10 px-3 bg-background">
                          <SelectValue placeholder="Select Category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="unStitched">
                            Un Stitched
                          </SelectItem>
                          <SelectItem value="stitched">Stitched</SelectItem>
                          <SelectItem value="readyToWear">
                            Ready To Wear
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    )}
                  />
                  {errors.subCategory && (
                    <p className="text-xs text-destructive mt-1">
                      {errors.subCategory.message}
                    </p>
                  )}
                </div>
                <div>
                  <Label>Sub Category</Label>
                  <Controller
                    name="subCategory"
                    control={control}
                    rules={{ required: "Sub category is required" }}
                    render={({ field }) => (
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <SelectTrigger className="w-full h-10 px-3 bg-background">
                          <SelectValue placeholder="Select Sub Category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="top">Top</SelectItem>
                          <SelectItem value="bottom">Bottom</SelectItem>
                          <SelectItem value="2piece">2 Piece</SelectItem>
                          <SelectItem value="3piece">3 Piece</SelectItem>
                        </SelectContent>
                      </Select>
                    )}
                  />
                  {errors.subCategory && (
                    <p className="text-xs text-destructive mt-1">
                      {errors.subCategory.message}
                    </p>
                  )}
                </div>
                {/* Outfit Type */}
                <Controller
                  name="outfitType"
                  control={control}
                  rules={{ required: "Outfit Type is required" }}
                  render={({ field }) => {
                    const outfitOptions =
                      watch("audience") === "men"
                        ? [
                            "Polo Shirt",
                            "T-Shirt",
                            "Formal Shirt",
                            "Kurta",
                            "Waistcoat",
                            "Formal Suit (2 Piece)",
                            "Formal Suit (3 Piece)",
                            "Sherwani",
                            "Jeans",
                            "Trousers / Chinos",
                            "Shorts",
                            "Tracksuit / Gym Wear",
                          ]
                        : [
                            "Kurti / Shirt",
                            "Polo Shirt",
                            "T-Shirt",
                            "Blouse / Tunic",
                            "Dress / Maxi",
                            "Gown",
                            "Saree",
                            "Lehenga Choli",
                            "Anarkali Suit",
                            "2 Piece (Kurti + Trouser)",
                            "3 Piece (Kurti + Trouser + Dupatta)",
                            "Jeans / Trousers",
                            "Skirt",
                            "Leggings / Jeggings",
                            "Tracksuit / Gym Wear",
                          ];

                    return (
                      <div>
                        <Label>Outfit Type</Label>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                        >
                          <SelectTrigger className="w-full h-10 px-3 bg-background">
                            <SelectValue placeholder="Select Outfit Type" />
                          </SelectTrigger>
                          <SelectContent>
                            {outfitOptions.map((item) => (
                              <SelectItem key={item} value={item}>
                                {item}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        {errors.outfitType && (
                          <p className="text-xs text-destructive mt-1">
                            {errors.outfitType.message}
                          </p>
                        )}
                      </div>
                    );
                  }}
                />

                {/* Fabaric */}
                <div>
                  <Label>Fabric</Label>
                  <Controller
                    name="fabric"
                    control={control}
                    rules={{ required: "Fabric is required" }}
                    render={({ field }) => (
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <SelectTrigger className="w-full h-10 px-3 bg-background">
                          <SelectValue placeholder="Select Fabric" />
                        </SelectTrigger>
                        <SelectContent>
                          {fabrics.map((fabric) => (
                            <SelectItem key={fabric._id} value={fabric._id}>
                              {fabric.title}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}
                  />
                  {errors.fabric && (
                    <p className="text-xs text-destructive mt-1">
                      {errors.fabric.message}
                    </p>
                  )}
                </div>

                {/* desscription */}

                <div className="md:col-span-2 space-y-4">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    placeholder="Enter product description..."
                    {...register("description", {
                      required: "Description is required",
                    })}
                  />
                  {errors.description && (
                    <p className="text-red-500 text-sm">
                      {errors.description.message}
                    </p>
                  )}
                </div>

                {/* <Controller
                  name="description"
                  control={control}
                  rules={{ required: "Description is required" }}
                  render={({ field }) => (
                    <DescriptionEditor
                      value={field.value}
                      onChange={field.onChange}
                    />
                  )}
                /> */}

                {/* variants */}
                <div className="md:col-span-2 space-y-4">
                  <div className="flex items-center justify-between">
                    <Label>Variants</Label>
                    <Button
                      type="button"
                      onClick={() =>
                        append({
                          color: "",
                          featuredImage: null,
                          additionalImages: [],
                          stock: 0,
                        })
                      }
                    >
                      + Add Variant
                    </Button>
                  </div>

                  {fields.map((variant, index) => (
                    <Card key={variant.id} className="p-4 relative">
                      <button
                        type="button"
                        onClick={() => remove(index)}
                        className="absolute top-2 right-2 text-gray-500 hover:text-red-600"
                      >
                        <X size={18} />
                      </button>

                      {/* Color Select */}
                      <Controller
                        name={`variants.${index}.color`}
                        control={control}
                        rules={{ required: "Color is required" }}
                        render={({ field }) => (
                          <div className="mb-3">
                            <Label>Color</Label>
                            <Select
                              onValueChange={field.onChange}
                              value={field.value}
                            >
                              <SelectTrigger className="w-full h-10 px-3 bg-background">
                                <SelectValue placeholder="Select Color" />
                              </SelectTrigger>
                              <SelectContent>
                                {colors.map((color) => (
                                  <SelectItem key={color._id} value={color._id}>
                                    {color.title}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            {errors.variants?.[index]?.color && (
                              <p className="text-xs text-destructive mt-1">
                                {errors.variants[index].color.message}
                              </p>
                            )}
                          </div>
                        )}
                      />

                      {/* Featured Image */}
                      <div className="mb-3">
                        <Label>Featured Image</Label>
                        <Input
                          type="file"
                          accept="image/*"
                          {...register(`variants.${index}.featuredImage`, {
                            required: "Featured image is required",
                          })}
                        />
                        {errors.variants?.[index]?.featuredImage && (
                          <p className="text-xs text-destructive mt-1">
                            {errors.variants[index].featuredImage.message}
                          </p>
                        )}
                      </div>

                      {/* Additional Images */}
                      <div className="mb-3">
                        <Label>Additional Images</Label>
                        <Input
                          type="file"
                          multiple
                          accept="image/*"
                          {...register(`variants.${index}.additionalImages`)}
                        />
                      </div>

                      {/* Stock */}
                      <div>
                        <Label>Stock</Label>
                        <Input
                          type="number"
                          min="0"
                          {...register(`variants.${index}.stock`, {
                            required: "Stock is required",
                            valueAsNumber: true,
                            min: {
                              value: 0,
                              message: "Stock cannot be negative",
                            },
                          })}
                        />
                        {errors.variants?.[index]?.stock && (
                          <p className="text-xs text-destructive mt-1">
                            {errors.variants[index].stock.message}
                          </p>
                        )}
                      </div>
                    </Card>
                  ))}
                </div>
                {/* <div className="md:col-span-2">
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
                </div> */}
                <Controller
                  name="season"
                  control={control}
                  rules={{ required: "Please select at least one season" }}
                  render={({ field }) => {
                    const handleChange = (value: string) => {
                      const newValue = field.value?.includes(value)
                        ? field.value.filter((v: string) => v !== value)
                        : [...(field.value || []), value];
                      field.onChange(newValue);
                    };

                    const seasonOptions = ["Summer", "Winter"];

                    return (
                      <div className="md:col-span-2">
                        <Label>Season</Label>
                        <div className="flex flex-wrap gap-4 mt-2">
                          {seasonOptions.map((season) => (
                            <div
                              key={season}
                              className="flex items-center space-x-2"
                            >
                              <Checkbox
                                id={season}
                                checked={field.value?.includes(season)}
                                onCheckedChange={() => handleChange(season)}
                              />
                              <label htmlFor={season} className="text-sm">
                                {season}
                              </label>
                            </div>
                          ))}
                        </div>
                        {errors.season && (
                          <p className="text-xs text-destructive mt-1">
                            {errors.season.message}
                          </p>
                        )}
                      </div>
                    );
                  }}
                />

                {/* <div className="md:col-span-2">
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
                </div> */}
                <Controller
                  name="designs"
                  control={control}
                  rules={{ required: "Please select at least one design" }}
                  render={({ field }) => {
                    const handleChange = (value: string) => {
                      const newValue = field.value?.includes(value)
                        ? field.value.filter((v: string) => v !== value)
                        : [...(field.value || []), value];
                      field.onChange(newValue);
                    };

                    const designOptions = [
                      "Plain",
                      "Printed",
                      "Embroidered",
                      "Block Print",
                      "Digital Print",
                      "Geometric",
                      "Floral",
                      "Abstract",
                      "Minimalist",
                    ];

                    return (
                      <div className="md:col-span-2">
                        <Label>Designs</Label>
                        <div className="flex flex-wrap gap-4 mt-2">
                          {designOptions.map((design) => (
                            <div
                              key={design}
                              className="flex items-center space-x-2"
                            >
                              <Checkbox
                                id={design}
                                checked={field.value?.includes(design)}
                                onCheckedChange={() => handleChange(design)}
                              />
                              <label htmlFor={design} className="text-sm">
                                {design}
                              </label>
                            </div>
                          ))}
                        </div>
                        {errors.designs && (
                          <p className="text-xs text-destructive mt-1">
                            {errors.designs.message}
                          </p>
                        )}
                      </div>
                    );
                  }}
                />

                {/* <div className="md:col-span-2">
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
                </div> */}
                <Controller
                  name="occasions"
                  control={control}
                  rules={{ required: "Please select at least one occasion" }}
                  render={({ field }) => {
                    const handleChange = (value: string) => {
                      const newValue = field.value?.includes(value)
                        ? field.value.filter((v: string) => v !== value)
                        : [...(field.value || []), value];
                      field.onChange(newValue);
                    };

                    const occasionOptions = [
                      "Casual",
                      "Formal",
                      "Party / Festive",
                      "Wedding",
                      "Office / Workwear",
                      "Eid / Religious",
                    ];

                    return (
                      <div className="md:col-span-2">
                        <Label>Occasions</Label>
                        <div className="flex flex-wrap gap-4 mt-2">
                          {occasionOptions.map((occasion) => (
                            <div
                              key={occasion}
                              className="flex items-center space-x-2"
                            >
                              <Checkbox
                                id={occasion}
                                checked={field.value?.includes(occasion)}
                                onCheckedChange={() => handleChange(occasion)}
                              />
                              <label htmlFor={occasion} className="text-sm">
                                {occasion}
                              </label>
                            </div>
                          ))}
                        </div>
                        {errors.occasions && (
                          <p className="text-xs text-destructive mt-1">
                            {errors.occasions.message}
                          </p>
                        )}
                      </div>
                    );
                  }}
                />
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
