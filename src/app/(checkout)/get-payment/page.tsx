import StripePayment from "@/components/custom/StripePayment";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Secure Payment | Fit Flair",
  description:
    "Complete your purchase safely through Fit Flair’s secure payment gateway. We ensure your transaction is fast and protected.",
};

export default function GetPayment() {
  return (
    <main>
      <StripePayment />
    </main>
  );
}
