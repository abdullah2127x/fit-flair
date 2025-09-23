"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ProductDetailSchema } from "@/types/product";
import { ShoppingCart, ZoomIn, Package, Heart } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface ProductDetailClientProps {
  product: ProductDetailSchema;
}

export default function ProductDetailClient({
  product,
}: ProductDetailClientProps) {
  // State to track the currently selected variant and image
  const [selectedVariantIndex, setSelectedVariantIndex] = useState(0);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  // Zoom state (same as Quick View)
  const [isZooming, setIsZooming] = useState(false);
  const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 });
  const [backgroundPosition, setBackgroundPosition] = useState("0% 0%");

  // Get the currently active variant data
  const currentVariant = product.variants[selectedVariantIndex];

  // Combine featured and additional images for the carousel
  const allImages = [
    currentVariant.featuredImage,
    ...currentVariant.additionalImages,
  ];

  // Reset image index when the variant (color) changes
  useEffect(() => {
    setSelectedImageIndex(0);
  }, [selectedVariantIndex]);

  // --- Zoom Handlers (Identical to Quick View) ---
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { left, top, width, height } =
      e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setBackgroundPosition(`${x}% ${y}%`);
    setZoomPosition({
      x: e.clientX - left - 40,
      y: e.clientY - top - 40,
    });
  };

  // Price calculation
  const discountedPrice =
    product.price - (product.price * product.discount) / 100;
  const inStock = currentVariant.stock > 0;

  return (
    <div className="flex flex-col lg:flex-row gap-8 lg:gap-16">
      {/* --- Left Column: Image Gallery --- */}
      <div className="lg:w-1/2">
        <div className="sticky top-24 space-y-4">
          {/* Main Image with Zoom */}
          <div
            className="relative aspect-square overflow-hidden rounded-xl bg-gray-100 dark:bg-gray-800 cursor-zoom-in"
            onMouseEnter={() => setIsZooming(true)}
            onMouseLeave={() => setIsZooming(false)}
            onMouseMove={handleMouseMove}
          >
            <Image
              src={allImages[selectedImageIndex]}
              alt={`${product.title} - ${currentVariant.colorName}`}
              fill
              className="object-contain p-2"
              priority
            />

            {/* Zoom Icon */}
            {isZooming && (
              <div
                className="absolute pointer-events-none z-10 w-20 h-20 border-2 border-primary rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center"
                style={{
                  left: `${zoomPosition.x}px`,
                  top: `${zoomPosition.y}px`,
                }}
              >
                <ZoomIn className="w-6 h-6 text-primary" />
              </div>
            )}

            {/* Zoomed Background View */}
            {isZooming && (
              <div
                className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-300"
                style={{
                  backgroundImage: `url(${allImages[selectedImageIndex]})`,
                  backgroundPosition: backgroundPosition,
                  backgroundSize: "200%",
                  backgroundRepeat: "no-repeat",
                }}
              />
            )}

            {/* Badges */}
            <div className="absolute top-3 left-3 flex flex-col gap-2">
              {product.discount > 0 && (
                <Badge variant="destructive">-{product.discount}%</Badge>
              )}
              {product.isNewArrival && <Badge variant="secondary">New</Badge>}
            </div>
          </div>

          {/* Thumbnails Carousel */}
          {allImages.length > 1 && (
            <div className="flex gap-3 overflow-x-auto pb-2">
              {allImages.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImageIndex(index)}
                  className={cn(
                    "relative flex-shrink-0 w-24 h-24 rounded-md overflow-hidden border-2 transition-all",
                    selectedImageIndex === index
                      ? "border-primary shadow-md"
                      : "border-transparent hover:border-gray-300"
                  )}
                >
                  <Image
                    src={image}
                    alt="Thumbnail"
                    fill
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* --- Right Column: Product Info --- */}
      <div className="lg:w-1/2 space-y-8">
        <div>
          <h1 className="text-3xl lg:text-4xl font-bold tracking-tight">
            {product.title}
          </h1>
          {product.subTitle && (
            <p className="mt-2 text-lg text-muted-foreground">
              {product.subTitle}
            </p>
          )}
        </div>

        {/* Price */}
        <div className="flex items-baseline gap-4">
          <span className="text-3xl font-bold text-primary">
            ${discountedPrice.toFixed(2)}
          </span>
          {product.discount > 0 && (
            <span className="text-xl text-muted-foreground line-through">
              ${product.price.toFixed(2)}
            </span>
          )}
        </div>

        {/* Stock Status */}
        <div className="flex items-center gap-2">
          <Badge variant={inStock ? "outline" : "destructive"}>
            <Package className="w-3 h-3 mr-1" />
            {inStock ? `In Stock (${currentVariant.stock})` : "Out of Stock"}
          </Badge>
        </div>

        <hr />

        {/* --- More Colors Section --- */}
        <div>
          <h3 className="text-lg font-semibold mb-4">
            Available Colors:{" "}
            <span className="font-normal">{currentVariant.colorName}</span>
          </h3>
          <div className="flex flex-wrap gap-3">
            {product.variants.map((variant, index) => (
              <button
                key={variant.colorName}
                onClick={() => setSelectedVariantIndex(index)}
                className={cn(
                  "group relative flex flex-col items-center justify-center p-1 rounded-md transition-all",
                  selectedVariantIndex === index
                    ? "ring-2 ring-primary ring-offset-2"
                    : "ring-1 ring-gray-300 hover:ring-primary"
                )}
                title={variant.colorName}
              >
                {/* Color Swatch */}
                <div
                  className="w-10 h-10 rounded-md border border-gray-300 shadow-sm"
                  style={{ backgroundColor: variant.colorCode }}
                />
                {/* Optional: Show a tiny version of the featured image instead of just color */}
                {/* <Image src={variant.featuredImage} alt="" width={40} height={40} className="rounded-md border" /> */}
              </button>
            ))}
          </div>
        </div>

        <hr />

        {/* Product Meta */}
        <dl className="grid grid-cols-2 gap-4 text-sm">
          {product.fabric && (
            <>
              <dt className="font-medium">Fabric</dt>
              <dd className="text-muted-foreground">{product.fabric}</dd>
            </>
          )}
          {product.category && (
            <>
              <dt className="font-medium">Category</dt>
              <dd className="text-muted-foreground">
                {product.category}{" "}
                {product.subCategory && `/ ${product.subCategory}`}
              </dd>
            </>
          )}
          {product.audience && (
            <>
              <dt className="font-medium">Audience</dt>
              <dd className="text-muted-foreground">{product.audience}</dd>
            </>
          )}
        </dl>

        {/* Description */}
        {product.description && (
          <div className="prose prose-sm max-w-none dark:prose-invert">
            <p>{product.description}</p>
          </div>
        )}

        {/* Actions */}
        <div className="flex gap-4 pt-4">
          <Button size="lg" className="flex-1" disabled={!inStock}>
            <ShoppingCart className="mr-2 h-5 w-5" />
            {inStock ? "Add to Cart" : "Out of Stock"}
          </Button>
          <Button size="lg" variant="outline" className="px-4">
            <Heart className="h-5 w-5" />
          </Button>
        </div>

        {/* Tags */}
        {product.relevantTags.length > 0 && (
          <div className="pt-4">
            <h4 className="text-sm font-medium mb-2">Tags:</h4>
            <div className="flex flex-wrap gap-2">
              {product.relevantTags.map((tag) => (
                <Link
                  key={tag}
                  href={`/shop?tag=${tag}`}
                  className="text-xs bg-secondary hover:bg-secondary/80 px-2 py-1 rounded-full transition-colors"
                >
                  {tag}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
