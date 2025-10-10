import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

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

const AdminProducts = () => {
      const [loadingProducts, setLoadingProducts] = useState(false);
    
  return (
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
          <div className="text-sm text-muted-foreground">Loading products…</div>
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
                  <div className="flex flex-wrap gap-2 md:mt-0">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={async () => {
                        const newTitle = prompt("New title", p.title);
                        if (!newTitle) return;
                        await updateProduct(p.id, { title: newTitle } as any);
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
                        await updateProduct(p.id, { price: newPrice } as any);
                      }}
                    >
                      Edit Price
                    </Button>
                    <Button
                      variant={p.isFeatured ? "default" : "outline"}
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
                      variant={p.isNewArrival ? "default" : "outline"}
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
                      variant={p.isPopular ? "default" : "outline"}
                      size="sm"
                      onClick={async () => {
                        await updateProduct(p.id, {
                          isPopular: !p.isPopular,
                        } as any);
                      }}
                    >
                      {p.isPopular ? "Unset Popular" : "Mark Popular"}
                    </Button>
                    <Link href={`/shop/${p.slug}`}>
                      <Button variant="secondary" size="sm">
                        View
                      </Button>
                    </Link>
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
              );
            })}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default AdminProducts;
