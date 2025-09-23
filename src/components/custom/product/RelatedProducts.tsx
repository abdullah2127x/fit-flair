// components/RelatedProducts.tsx
"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton";
import { client } from "@/sanity/lib/client";

interface RelatedProduct {
  id: string;
  slug: string;
  title: string;
  price: number;
  discount: number;
  featuredImage: string;
}

interface RelatedProductsProps {
  tags: string[];
  currentProductId: string;
}

export default function RelatedProducts({
  tags,
  currentProductId,
}: RelatedProductsProps) {
  const [products, setProducts] = useState<RelatedProduct[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!tags || tags.length === 0) return;

    const fetchRelatedProducts = async () => {
      try {
        // Create tag filter
        const tagFilters = tags.map(tag => `"${tag}" in relevantTags`).join(" || ");
        
        const query = `*[
          _type == "product" &&
          _id != "${currentProductId}" &&
          (${tagFilters})
        ][0...8] {
          "id": _id,
          "slug": slug.current,
          title,
          price,
          discount,
          "featuredImage": variants[0].featuredImage.asset->url
        }`;

        const data = await client.fetch(query);
        setProducts(data);
      } catch (error) {
        console.error("Error fetching related products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRelatedProducts();
  }, [tags, currentProductId]);

  if (loading) {
    return (
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="space-y-3">
            <Skeleton className="aspect-square w-full rounded-xl" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
          </div>
        ))}
      </div>
    );
  }

  if (products.length === 0) {
    return null;
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
      {products.map((product) => {
        const discountedPrice = product.price - (product.price * product.discount) / 100;
        
        return (
          <Link
            key={product.id}
            href={`/shop/${product.slug}`}
            className="group space-y-3"
          >
            <div className="aspect-square relative rounded-xl overflow-hidden bg-secondary/10">
              <Image
                src={product.featuredImage}
                alt={product.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
              {product.discount > 0 && (
                <div className="absolute top-3 left-3">
                  <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
                    -{product.discount}%
                  </span>
                </div>
              )}
            </div>
            
            <h3 className="font-medium text-sm line-clamp-2 group-hover:text-primary transition-colors">
              {product.title}
            </h3>
            
            <div className="flex items-baseline gap-1">
              <span className="font-bold text-sm">
                ${discountedPrice.toFixed(2)}
              </span>
              {product.discount > 0 && (
                <span className="text-xs text-muted-foreground line-through">
                  ${product.price.toFixed(2)}
                </span>
              )}
            </div>
          </Link>
        );
      })}
    </div>
  );
}