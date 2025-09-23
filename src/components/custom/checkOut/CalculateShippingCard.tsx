"use client";
import SecondaryHeading from "@/components/custom/SecondaryHeading";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import React, { useState } from "react";

const CalculateShippingCard = () => {
  const [form, setForm] = useState({ country: "", city: "", postalCode: "" });

  const handleChange = (field: keyof typeof form, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const inputs = [
    { name: "country", placeholder: "Country" },
    { name: "city", placeholder: "City" },
    { name: "postalCode", placeholder: "Postal Code" },
  ] as const;

  const query = new URLSearchParams(
    Object.fromEntries(Object.entries(form).filter(([_, v]) => v))
  ).toString();

  return (
    <div className="flex flex-col gap-4">
      <SecondaryHeading className="text-center">
        Calculate Shipping
      </SecondaryHeading>
      <div className="bg-secondary/30 w-full rounded-md">
        <div className="flex flex-col w-full p-8">
          {inputs.map(({ name, placeholder }) => (
            <input
              key={name}
              type="text"
              placeholder={placeholder}
              value={form[name]}
              onChange={(e) => handleChange(name, e.target.value)}
              className="placeholder:text-muted-foreground text-secondary-foreground mt-4 bg-transparent border-b-2 border-secondary-foreground/30 focus-within:outline-none focus-within:border-primary-foreground w-full h-12 text-lg"
            />
          ))}

          <Button asChild variant="secondary" size="lg" className="mt-4">
            <Link href={`/calculate-shipping${query ? `?${query}` : ""}`}>
              Calculate Shipping
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CalculateShippingCard;
