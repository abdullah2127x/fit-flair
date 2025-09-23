"use client";

import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ShoppingCart, WalletCards, ZoomIn } from "lucide-react";
import { cn } from "@/lib/utils";
import { QuickViewProductSchema } from "@/types/product";
import { useState } from "react";
import ProductDetailContentSkeleton from "@/components/custom/skeletons/ProductDetailContentSkeleton";
import PrimaryHeading from "../PrimaryHeading";
import SubTitle from "../SubTitle";
import SecondaryHeading from "../SecondaryHeading";
import AddToCartWrapper from "../cart/AddToCartWrapper";

interface ProductDetailContentProps {
  product: QuickViewProductSchema | null;
  loading: boolean;
}

export default function ProductDetailContent({
  product,
  loading,
}: ProductDetailContentProps) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [isZooming, setIsZooming] = useState(false);
  const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 });
  const [backgroundPosition, setBackgroundPosition] = useState("0% 0%");

  if (loading || !product) {
    return (
      <div className="p-6 w-full">
        <ProductDetailContentSkeleton />
      </div>
    );
  }

  const allImages = [
    product.variant.featuredImage,
    ...product.variant.additionalImages,
  ];

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

  const discountedPrice =
    product.price - (product.price * product.discount) / 100;

  return (
    <div className="flex flex-col lg:flex-row h-full bg-primary/80">
      {/* -------- Image Section -------- */}
      <div className="lg:w-1/2 p-4 lg:p-6 ">
        <div className=" flex flex-col bg-secondary/40 rounded-md gap-y-4">
          {/* Main Image with Zoom */}
          <div
            className="relative max-h-96 aspect-square overflow-hidden rounded-lg bg-secondary cursor-zoom-in"
            onMouseEnter={() => setIsZooming(true)}
            onMouseLeave={() => setIsZooming(false)}
            onMouseMove={handleMouseMove}
          >
            <Image
              src={allImages[selectedImage]}
              alt={product.title}
              fill
              className="object-contain"
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

            {/* Zoomed Background */}
            {isZooming && (
              <div
                className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-200"
                style={{
                  backgroundImage: `url(${allImages[selectedImage]})`,
                  backgroundPosition: backgroundPosition,
                  backgroundSize: "250%",
                  backgroundRepeat: "no-repeat",
                }}
              />
            )}
          </div>

          {/* Thumbnail Images */}
          {allImages.length > 1 && (
            <div className="flex gap-2 overflow-x-auto pb-2">
              {allImages.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={cn(
                    "relative flex-shrink-0 w-28 h-28 rounded-md overflow-hidden border-2 transition-all",
                    selectedImage === index
                      ? "border-secondary-foreground ring-2 ring-secondary-foreground/20 shadow-md"
                      : "border-secondary hover:border-secondary-foreground/50 "
                  )}
                >
                  <Image
                    src={image}
                    alt={`${product.title} ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* -------- Content Section -------- */}
      <div className="lg:w-1/2 p-4 lg:p-6 overflow-y-auto ">
        {/* <h2 className="text-2xl lg:text-3xl font-bold">{product.title}</h2> */}
        <PrimaryHeading>{product.title}</PrimaryHeading>
        {product.subTitle && (
          // <p className="text-base lg:text-lg">{product.subTitle}</p>
          <SubTitle className="text-start ">{product.subTitle}</SubTitle>
        )}

        <div className="mt-3 space-y-3">
          {/* Price Section */}
          <div className="flex items-baseline gap-3">
            {product.discount > 0 ? (
              <>
                <SecondaryHeading>
                  ${discountedPrice.toFixed(2)}
                </SecondaryHeading>

                <span className="text-xl text-muted-foreground line-through">
                  ${product.price.toFixed(2)}
                </span>
                <Badge variant="destructive">{product.discount}% OFF</Badge>
              </>
            ) : (
              <SecondaryHeading>${product.price.toFixed(2)}</SecondaryHeading>
            )}
          </div>

          {/* Color Info */}
          <div className="flex items-center gap-3">
            <span className="text-sm font-medium">Color:</span>
            <div className="flex items-center gap-2">
              <div
                className="w-5 h-5 rounded-full border border-primary"
                style={{ backgroundColor: product.variant.colorCode }}
              />
              <span className="text-sm text-secondary-foreground">
                {product.variant.colorName}
              </span>
            </div>
          </div>

          {/* Stock Status */}
          <Badge
            variant={product.variant.stock > 0 ? "secondary" : "destructive"}
          >
            {product.variant.stock > 0
              ? `In Stock (${product.variant.stock})`
              : "Out of Stock"}
          </Badge>

          {/* Product Details */}
          <div className="space-y-3">
            {product.fabric && (
              <div className="flex gap-2">
                <span className="text-sm font-medium">Fabric:</span>
                <span className="text-sm text-secondary-foreground">
                  {product.fabric}
                </span>
              </div>
            )}
            {product.category && (
              <div className="flex gap-2">
                <span className="text-sm font-medium">Category:</span>
                <span className="text-sm text-secondary-foreground">
                  {product.category}
                  {product.subCategory && ` / ${product.subCategory}`}
                </span>
              </div>
            )}

            {product.season && (
              <div className="flex gap-2">
                <span className="text-sm font-medium">Season:</span>
                <span className="text-sm text-secondary-foreground">
                  {product.season}
                </span>
              </div>
            )}
            {product.audience && (
              <div className="flex gap-2">
                <span className="text-sm font-medium">Audience:</span>
                <span className="text-sm text-secondary-foreground">
                  {product.audience}
                </span>
              </div>
            )}
          </div>

          {/* Tags */}
          {((product.occasions ?? []).length > 0 ||
            (product.designs ?? []).length > 0 ||
            product.outFitType) && (
            <div className="flex flex-wrap gap-2">
              {product.occasions?.map((occasion) => (
                <Badge key={occasion} variant="secondary">
                  {occasion}
                </Badge>
              ))}
              {product.designs?.map((design) => (
                <Badge key={design} variant="secondary">
                  {design}
                </Badge>
              ))}
              {product.outFitType && (
                <Badge variant="secondary">{product.outFitType}</Badge>
              )}
            </div>
          )}

          {/* Description */}
          {product.description && (
            <div className="space-y-2">
              <h4 className="font-medium">Description</h4>
              <p className="text-sm text-secondary-foreground leading-relaxed">
                {product.description}
              </p>
            </div>
          )}

          {/* Buttons */}
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <AddToCartWrapper
              productId={product.id}
              slug={product.slug}
              title={product.title}
              subTitle={product.subTitle}
              price={product.price}
              discount={product.discount}
              imageSrc={product.variant.featuredImage}
              colorName={product.variant.colorName}
            >
              <Button
                variant="secondary"
                className="w-full lg:w-auto"
                size="lg"
                disabled={product.variant.stock === 0}
              >
                <ShoppingCart className="mr-2 h-5 w-5" />
                Add to Cart
              </Button>
            </AddToCartWrapper>
            <Button
              variant="secondary"
              className="w-full lg:w-auto"
              size="lg"
              disabled={product.variant.stock === 0}
            >
              <WalletCards className="mr-2 h-5 w-5" />
              Buy Now
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
