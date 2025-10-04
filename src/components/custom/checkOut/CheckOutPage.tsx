"use client";
import { useState, useEffect } from "react";
import {
  useStripe,
  useElements,
  PaymentElement,
} from "@stripe/react-stripe-js";
import convertToSubCurrency from "@/lib/convertToSubCurrency";
import { useAppSelector } from "@/redux/hooks";
import { Button } from "@/components/ui/button";

const CheckoutPage = ({ amount }: { amount: number }) => {
  const [URL, setURL] = useState("");
  const stripe = useStripe();
  const elements = useElements();
  const cartItems = useAppSelector((state) => state.cart.items);

  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // Determine the base URL on the client side
  useEffect(() => {
    const deployment = process.env.NODE_ENV;
    // const myhost = window.location.host;
    setURL(
      deployment === "development"
        ? "http://localhost:3000"
        : "https://fitflair.vercel.app"
    );
  }, []);

  // Generate a new client secret when the component mounts or the amount changes
  useEffect(() => {
    if (amount <= 0 || cartItems.length === 0) {
      setErrorMessage("Your cart is empty");
      return;
    }

    setLoading(true); // Indicate loading during API call
    fetch("/api/payment-intent", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ amount: convertToSubCurrency(amount) }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.clientSecret) {
          setClientSecret(data.clientSecret);
          setErrorMessage(null);
        } else {
          setErrorMessage("Failed to create payment intent.");
        }
      })
      .catch(() => setErrorMessage("Failed to create payment intent."))
      .finally(() => setLoading(false)); // Remove loading state after completion
  }, [amount, cartItems]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    // Ensure Stripe and Elements are loaded
    if (!stripe || !elements) {
      setErrorMessage("Stripe.js has not loaded yet. Please try again.");
      setLoading(false);
      return;
    }

    // Validate the payment form
    const { error: submitErrors } = await elements.submit();
    if (submitErrors) {
      setErrorMessage(submitErrors.message || "Validation failed.");
      setLoading(false);
      return;
    }

    // Confirm the payment
    const { error } = await stripe.confirmPayment({
      elements,
      clientSecret: clientSecret!,
      confirmParams: {
      return_url: `${URL}/create-order?amount=${amount}`,
      },
    });

    if (error) {
      setErrorMessage(error.message || "An error occurred during payment.");
    } else {
      setErrorMessage(null); // Clear errors on success
    }
    setLoading(false);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-8 max-w-3xl w-full mx-auto bg-secondary rounded-lg shadow-md"
    >
      {errorMessage && <p className="text-destructive mb-4">{errorMessage}</p>}
      {clientSecret ? (
        <>
          <PaymentElement className="bg-secondary" />
          <Button
            disabled={loading || !stripe || !elements}
            className={` ${loading ? "opacity-50 cursor-not-allowed" : ""} w-full mt-4`}
            size="lg"
            variant={"secondary"}
          >
            {loading ? "Processing..." : "Pay Now"}
          </Button>
        </>
      ) : (
        <p className="text-center py-4">Loading payment details...</p>
      )}
    </form>
  );
};

export default CheckoutPage;
