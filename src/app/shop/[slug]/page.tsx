// // app/shop/[slug]/page.tsx

import ProductDetailContentSkeleton from "@/components/custom/skeletons/ProductDetailContentSkeleton";
import ProductDetailPageContent from "./components/Content";
import { Suspense } from "react";

// 👇 This is the main exported page (in Next.js 15 `params` is a Promise in client files)
export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  // ✅ Properly await the params Promise
  const { slug } = await params;

  return (
    <Suspense fallback={<ProductDetailContentSkeleton />}>
      <ProductDetailPageContent slug={slug} />
    </Suspense>
  );
}
