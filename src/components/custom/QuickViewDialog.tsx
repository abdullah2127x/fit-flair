import { useEffect, useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { client } from "@/sanity/lib/client";
// import { quickViewProductQuery } from "@/lib/groqQueries";
import { quickViewProductQuery } from "@/lib/groqQueries";

import { QuickViewProductSchema } from "@/types/product";
import ProductDetailContent from "@/components/custom/product/productDetailContent";

interface QuickViewDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  productId: string;
  colorName: string;
}

export default function QuickViewDialog({
  isOpen,
  onOpenChange,
  productId,
  colorName,
}: QuickViewDialogProps) {
  const [product, setProduct] = useState<QuickViewProductSchema | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!productId) return;

    const fetchProductDetailQuery = quickViewProductQuery({
      productId,
      colorName,
    });

    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await client.fetch(fetchProductDetailQuery);
        if (data) setProduct(data as QuickViewProductSchema);
      } catch (error) {
        console.error("Error fetching product:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [productId, colorName]);

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-6xl w-[95vw] p-0 gap-0 max-h-[90vh] overflow-auto">
        <ProductDetailContent product={product} loading={loading} />
      </DialogContent>
    </Dialog>
  );
}
