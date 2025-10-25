"use client";
/* eslint-disable react-hooks/exhaustive-deps */
import ProductGrid from "@/components/custom/ProductGrid";
import { filteredProductsQuery } from "@/lib/groqQueries";
import { client } from "@/sanity/lib/client";
import { ProductShowcaseSchema } from "@/types/product";
import React, { Suspense, useEffect, useState } from "react";
import FetchMoreProductsButton from "./FetchMoreProductsButton";
import { useSearchParams } from "next/navigation";
import FullPageLoader from "../FullPageLoader";
import { Package, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useMemo } from "react";

// Empty State Component
const EmptyState = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-4">
      <div className="bg-card border-2 border-dashed border-border rounded-2xl p-12 max-w-md w-full text-center">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-muted mb-6">
          <Package
            className="w-10 h-10 text-muted-foreground"
            strokeWidth={1.5}
          />
        </div>

        <h3 className="text-2xl font-semibold text-foreground mb-3">
          No Products Found
        </h3>

        <p className="text-muted-foreground mb-8 leading-relaxed">
          We couldn&apos;t find any products to display. Try adjusting your
          filters or check back later for new arrivals.
        </p>

        <Button asChild variant={"secondary"} size={"lg"}>
          <Link className="flex gap-2 items-center" href={"/shop"}>
            <Search className="w-4 h-4" />
            Browse All
          </Link>
        </Button>
      </div>
    </div>
  );
};

const ShowInGridForm = ({
  products,
  loading,
  loadingMore,
}: {
  products: ProductShowcaseSchema[];
  loading: boolean;
  loadingMore: boolean;
}) => {
  return (
    <ProductGrid
      products={products}
      loading={loading}
      loadingMore={loadingMore}
    />
  );
};

const ShowInListForm = ({
  products,
  loading,
}: {
  products: ProductShowcaseSchema[];
  loading: boolean;
}) => {
  return <>Product in list view</>;
};

export const dynamic = "force-dynamic";
const ShowProductsContent = ({ view }: { view: "list" | "grid" }) => {
  const [products, setProducts] = useState<ProductShowcaseSchema[]>([]);
  const [page, setPage] = useState(0);
  const [initialLoading, setInitialLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [productFilter, setProductFilter] = useState<any>({});

  const searchParams = useSearchParams();

  const search = searchParams.get("search")?.toLowerCase();

  // ✅ Get all filters from URL matching the product schema
  const audience = searchParams.getAll("audience");
  const categories = searchParams.getAll("categories");
  const subCategories = searchParams.getAll("subCategories");
  const outfitTypes = searchParams.getAll("outfitTypes");
  const seasons = searchParams.getAll("seasons");
  const designs = searchParams.getAll("designs");
  const occasions = searchParams.getAll("occasions");
  const priceRanges = searchParams.getAll("priceRanges");
  const discounts = searchParams.getAll("discounts").map((d) => Number(d));

  useEffect(() => {
    const filters = {
      audience,
      categories,
      subCategories,
      outfitTypes,
      seasons,
      designs,
      occasions,
      priceRanges,
      discounts: discounts.filter((d) => !isNaN(d)),
    };
    setProductFilter(filters);
  }, [
    // audience,
    // categories,
    // designs,
    // discounts,
    // occasions,
    // outfitTypes,
    // priceRanges,
    // seasons,
    // subCategories,
    JSON.stringify({
      audience,
      categories,
      subCategories,
      outfitTypes,
      seasons,
      designs,
      occasions,
      priceRanges,
      discounts,
    }),
  ]);

  useEffect(() => {
    setPage(0);
  }, [search, JSON.stringify(productFilter)]);

  useEffect(() => {
    let ignore = false;

    const fetchData = async () => {
      try {
        setLoadingMore(true);
        if (page === 0) setInitialLoading(true);
       
        const query = filteredProductsQuery(page, search, productFilter);

        const data = await client.fetch(query);
        if (ignore) return;

        if (!data || data.length === 0) {
          if (page === 0) setProducts([]);
          setHasMore(false);
          return;
        }

        // 🧩 Format data into ProductShowcaseSchema
        const formatted: ProductShowcaseSchema[] = data.map((item: any) => {
          const customTags = [
            item.audience || "",
            item.fabric?.name || "",
            ...(item.season || []),
            ...(item.designs || []),
            ...(item.occasions || []),
            item.menOutfitType || "",
            item.womenOutfitType || "",
            item.category || "",
            item.subCategory || "",
          ].filter(Boolean);

          const randomVariant = item.variants?.length
            ? item.variants[Math.floor(Math.random() * item.variants.length)]
            : null;

          return {
            id: item._id || item.id,
            slug: item.slug,
            title: item.title,
            subTitle: item.subTitle,
            price: item.price,
            src: randomVariant?.featuredImage || "/fallback.jpg",
            colorName: randomVariant?.colorName || "",
            tags: customTags,
            discount: item.discount || 0,
          };
        });

        setProducts((prev) =>
          page === 0 ? formatted : [...prev, ...formatted]
        );

        setHasMore(data.length >= 24);
      } catch (error) {
        console.error("❌ Error fetching products:", error);
      } finally {
        if (!ignore) {
          if (page === 0) {
            setInitialLoading(false);
          }
          setLoadingMore(false);
        }
      }
    };

    fetchData();

    return () => {
      ignore = true;
    };
  }, [page, search, JSON.stringify(productFilter)]);

  if (!initialLoading && !loadingMore && products.length === 0) {
    return <EmptyState />;
  }

  return (
    <div className="min-h-screen flex flex-col items-center gap-8 relative">
      {view === "list" ? (
        <ShowInListForm products={products} loading={loadingMore} />
      ) : (
        <ShowInGridForm
          products={products}
          loading={initialLoading}
          loadingMore={loadingMore}
        />
      )}
      {hasMore && (
        <FetchMoreProductsButton
          loading={loadingMore}
          onClick={() => {
            setPage((p) => p + 1);
            setLoadingMore(true);
          }}
        />
      )}
    </div>
  );
};

export default function ShowProducts({ view }: { view: "list" | "grid" }) {
  return (
    <Suspense fallback={<FullPageLoader />}>
      <ShowProductsContent view={view} />
    </Suspense>
  );
}
