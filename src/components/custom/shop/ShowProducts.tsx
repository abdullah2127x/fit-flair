"use client";
import ProductGrid from "@/components/custom/ProductGrid";
import { filteredProductsQuery } from "@/lib/groqQueries";
import { client } from "@/sanity/lib/client";
import { ProductShowcaseSchema } from "@/types/product";
import React, { Suspense, useEffect, useState } from "react";
import FetchMoreProductsButton from "./FetchMoreProductsButton";
import { useSearchParams } from "next/navigation";
import FullPageLoader from "../FullPageLoader";
import { Package, Search, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

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
          We couldn't find any products to display. Try adjusting your filters
          or check back later for new arrivals.
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
      loadingMore={loadingMore} // 👈 tell grid about "load more"
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

const ShowProductsContent = ({ view }: { view: "list" | "grid" }) => {
  const [products, setProducts] = useState<ProductShowcaseSchema[]>([]);
  const [page, setPage] = useState(0);
  const [initialLoading, setInitialLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false); // 👈 load more
  const [hasMore, setHasMore] = useState(true);
  const [productFilter, setProductFilter] = useState<any>({});

  const searchParams = useSearchParams();

  const search = searchParams.get("search")?.toLocaleLowerCase();

  // ✅ Get all filters from URL (multi-value safe)
  const categories = searchParams.getAll("categories");
  const brands = searchParams.getAll("brands");
  const priceRanges = searchParams.getAll("priceRanges");
  const ratings = searchParams.getAll("ratings").map((r) => Number(r));
  const discounts = searchParams.getAll("discounts").map((d) => Number(d));

  useEffect(() => {
    const filters = {
      categories,
      brands,
      priceRanges,
      ratings: ratings.filter((r) => !isNaN(r)),
      discounts: discounts.filter((d) => !isNaN(d)),
    };
    setProductFilter(filters);
  }, [JSON.stringify({ categories, brands, priceRanges, ratings, discounts })]);

  useEffect(() => {
    setPage(0);
  }, [search, JSON.stringify(productFilter)]);

  useEffect(() => {
    let ignore = false; // helps prevent state updates if component unmounts

    const fetchData = async () => {
      try {
        setLoadingMore(true);
        if (page === 0) setInitialLoading(true);
        console.log(
          "Before sending to the groq query the search is :",
          search,
          "and the produst filter is : ",
          productFilter
        );
        // 🧠 Build query only when needed
        const query = filteredProductsQuery(page, search, productFilter);
        console.log("🔍 Fetching products with query:\n", query);

        const data = await client.fetch(query);
        console.log("The data return from the sanity is :", data);
        if (ignore) return;

        if (!data || data.length === 0) {
          if (page === 0) setProducts([]); // reset if first page is empty
          setHasMore(false);
          return;
        }

        // 🧩 Format data into your ProductShowcaseSchema
        const formatted: ProductShowcaseSchema[] = data.map((item: any) => {
          const customTags = [
            item.audience || "",
            item.fabric || "",
            ...(item.season || []),
            ...(item.designs || []),
            ...(item.occasions || []),
            item.outFitType || "",
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

        // ⚡ Merge or replace based on pagination
        setProducts((prev) =>
          page === 0 ? formatted : [...prev, ...formatted]
        );

        // ✅ If less than 24 (page size), no more products
        setHasMore(data.length >= 24);
      } catch (error) {
        console.error("❌ Error fetching products:", error);
      } finally {
        if (!ignore) {
          if (page === 0) {
            setInitialLoading(false);
            setLoadingMore(false);
          }
        }
      }
    };

    fetchData();

    // cleanup
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
          // loadingMore={false}
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
