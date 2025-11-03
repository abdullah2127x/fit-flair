// app/shop/page.tsx
import { Metadata } from "next";
import ShopPage from "./components/ShopPage";

export const metadata: Metadata = {
  title: "Shop | Fit Flair",
  description: "Browse our latest clothing collection — from elegant dresses to trendy casual wear.",
};

export default function Shop() {
  return <ShopPage />; // render the client component
}
