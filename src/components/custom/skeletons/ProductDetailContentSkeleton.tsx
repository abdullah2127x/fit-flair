import { Skeleton } from "@/components/ui/skeleton";

export default function ProductDetailContentSkeleton() {
  return (
    <div className="flex flex-col container lg:flex-row h-full w-full">
      {/* Left Column: Image Section Skeleton */}
      <div className="lg:w-1/2 p-4 lg:p-6 ">
        <div className="space-y-4">
          {/* Main Image */}
          <Skeleton className="aspect-square w-full rounded-lg  max-h-96" />

          {/* Thumbnails */}
          <div className="flex gap-2 overflow-x-auto pb-2">
            {[1, 2, 3, 4].map((item: number, idx: number) => (
              <Skeleton
                key={item}
                className="w-28 h-28 rounded-md flex-shrink-0"
              />
            ))}
          </div>
        </div>
      </div>

      {/* Right Column: Content Section Skeleton */}
      <div className="lg:w-1/2  p-4 lg:p-6 space-y-6">
        {/* Header */}
        <div className="space-y-2">
          <Skeleton className="h-8 w-3/4" />
          <Skeleton className="h-5 w-1/2" />
        </div>

        {/* Price */}
        <Skeleton className="h-10 w-1/3" />

        {/* Color and Stock Info */}
        <div className="flex gap-4">
          <Skeleton className="h-6 w-24" />
          <Skeleton className="h-6 w-20" />
        </div>

        {/* Product Details (Fabric, Category) */}
        <div className="space-y-3">
          <Skeleton className="h-4 w-full max-w-sm" />
          <Skeleton className="h-4 w-full max-w-xs" />
        </div>

        {/* Tags/Badges */}
        <div className="flex gap-2 flex-wrap">
          <Skeleton className="h-6 w-20 rounded-full" />
          <Skeleton className="h-6 w-24 rounded-full" />
          <Skeleton className="h-6 w-16 rounded-full" />
        </div>

        {/* Description */}
        <div className="space-y-2 mt-4">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6" />
        </div>

        {/* Add to Cart Button */}
        <Skeleton className="h-12 w-40 rounded-md mt-6" />
      </div>
    </div>
  );
}
