"use client";
import ProductGrid from "@/components/custom/ProductGrid";
import {
  allProductsQuery,
  featuredCollectionQuery,
  filteredProductsQuery,
} from "@/lib/groqQueries";
import { client } from "@/sanity/lib/client";
import { ProductShowcaseSchema } from "@/types/product";
import React, { useEffect, useState } from "react";
import FetchMoreProductsButton from "./FetchMoreProductsButton";
import { useSearchParams } from "next/navigation";

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

const ShowProducts = ({ view }: { view: "list" | "grid" }) => {
  const [products, setProducts] = useState<ProductShowcaseSchema[]>([]);
  const [page, setPage] = useState(0);
  const [initialLoading, setInitialLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false); // 👈 load more
  const [hasMore, setHasMore] = useState(true);
  const [productFilter, setProductFilter] = useState<any>({});

  const searchParams = useSearchParams();
  const search = searchParams.get("search")?.toLocaleLowerCase();

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const data = await client.fetch(allProductsQuery(page));

  //       if (!data || data.length === 0) {
  //         setHasMore(false); // stop showing "Show More"
  //         return;
  //       }
  //       const formatted = data.map((item: any): ProductShowcaseSchema => {
  //         const customTags = [
  //           item.audience || "",
  //           item.fabric || "",
  //           ...(item.season || []),
  //           ...(item.designs || []),
  //           ...(item.occasions || []),
  //           item.outFitType || "",
  //           item.category || "",
  //           item.subCategory || "",
  //         ].filter(Boolean);

  //         const randomVariant = item.variants?.length
  //           ? item.variants[Math.floor(Math.random() * item.variants.length)]
  //           : null;

  //         return {
  //           id: item.id,
  //           slug: item.slug,
  //           title: item.title,
  //           subTitle: item.subTitle,
  //           price: item.price,
  //           src: randomVariant?.featuredImage || "/fallback.jpg",
  //           colorName: randomVariant?.colorName || "",
  //           tags: customTags,
  //           discount: item.discount || 0,
  //         };
  //       });
  //       setProducts((prev) => [...prev, ...formatted]);
  //     } catch (error) {
  //       console.error(`Error fetching products: `, error);
  //     } finally {
  //       if (page === 0) {
  //         setInitialLoading(false); // stop first load skeleton
  //       } else {
  //         setLoadingMore(false); // stop "load more" skeleton
  //       }
  //     }
  //   };

  //   fetchData();
  // }, [page]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const query = filteredProductsQuery(page, search, productFilter);
        console.log("the product query that is going to fetch from sanity is :", query)
        const data = await client.fetch(query);

        if (!data || data.length === 0) {
          setHasMore(false);
          return;
        }
        const formatted = data.map((item: any): ProductShowcaseSchema => {
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
            id: item.id,
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
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        if (page === 0) setInitialLoading(false);
        else setLoadingMore(false);
      }
    };

    fetchData();
  }, [page, search, productFilter]);

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

export default ShowProducts;
