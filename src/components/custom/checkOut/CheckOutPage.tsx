"use client";
import { useState, useEffect } from "react";
import {
  useStripe,
  useElements,
  PaymentElement,
} from "@stripe/react-stripe-js";
import convertToSubCurrency from "@/lib/convertToSubCurrency";

const CheckoutPage = ({ amount }: { amount: number }) => {
  const [URL, setURL] = useState("");
  const stripe = useStripe();
  const elements = useElements();

  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // Determine the base URL on the client side
  useEffect(() => {
    const myhost = window.location.host;
    setURL(
      myhost === "localhost:3000"
        ? "http://localhost:3000"
        : "https://hekto-marketplace-builder.vercel.app"
    );
  }, []);

  // Generate a new client secret when the component mounts or the amount changes
  useEffect(() => {
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
  }, [amount]);

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
        return_url: `${URL}/paymentSuccess?amount=${amount}`,
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
    <form onSubmit={handleSubmit} className="p-8">
      {errorMessage && <p className="text-red-500 mb-4">{errorMessage}</p>}
      {clientSecret ? (
        <>
          <PaymentElement />
          <button
            className={`w-full bg-black text-white py-2 mt-5 ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={loading || !stripe || !elements}
          >
            {loading ? "Processing..." : "Pay Now"}
          </button>
        </>
      ) : (
        <p>Loading payment details...</p>
      )}
    </form>
  );
};

export default CheckoutPage;
