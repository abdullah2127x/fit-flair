import { Skeleton } from "@/components/ui/skeleton";

export function ProductSkeleton() {
  return (
    <div className="flex flex-col md:flex-row gap-6">
      {/* Image skeleton */}
      <Skeleton className="h-[250px] w-[250px] rounded-lg" />

      {/* Text + button skeleton */}
      <div className="flex flex-col justify-between w-full space-y-4">
        {/* Title */}
        <Skeleton className="h-6 w-3/4" />

        {/* Description lines */}
        <div className="space-y-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6" />
          <Skeleton className="h-4 w-2/3" />
        </div>

        {/* Price */}
        <Skeleton className="h-6 w-1/4" />

        {/* Button */}
        <Skeleton className="h-10 w-32 rounded-lg" />
      </div>
    </div>
  );
}
