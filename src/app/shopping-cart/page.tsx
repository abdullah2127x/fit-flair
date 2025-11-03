import ShoppingCartPageContent from "./components/ShoppingCartPageContent";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Your Shopping Cart | Fit Flair",
  description:
    "Review your selected products and proceed to secure checkout at Fit Flair.",
};

export default function ShoppingCartPage() {
  return <ShoppingCartPageContent />;
}
