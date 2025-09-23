"use client";
import { Button } from "@/components/ui/button";
// import PinkButton from "@/components/project/PinkButton";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";
import SecondaryHeading from "../SecondaryHeading";

const Input = ({
  type,
  placeholder,
  register,
  name,
  errors,
  required = false,
}: {
  type: string;
  placeholder: string;
  register: any;
  name: string;
  errors?: any;
  required?: boolean;
}) => {
  return (
    <div>
      <input
        type={type}
        placeholder={placeholder}
        {...register(
          name,
          required ? { required: `${placeholder} is required` } : {}
        )}
        // "  focus-within:border-primary-foreground w-full h-12 text-lg"
        className="
        w-full 
        py-3 
        focus:border-b-secondary-foreground
        focus-within:outline-none 
        focus-within:border-primary-foreground 
        bg-transparent 
        border-b-2 
        placeholder:text-muted-foreground
        text-secondary-foreground 
        border-secondary-foreground/30 "
      />
      {errors && errors[name] && (
        <p className="text-destructive text-sm mt-1">{errors[name].message}</p>
      )}
    </div>
  );
};

export default function CalculateShippingLeftSection({
  searchParams,
}: {
  searchParams: { country: string; city: string; postalCode: string };
}) {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      firstName: "",
      lastName: "",
      address: "",
      apartment: "",
      city: searchParams.city || "",
      country: searchParams.country || "",
      postalCode: searchParams.postalCode || "",
      keepUpdated: false,
    },
  });

  const onSubmit = (data: any) => {
    console.log("Form Data:", data);
    router.push("/get-payment");
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="col-span-2  px-2 md:px-8 py-6 h-fit"
    >
      {/* Login Detail */}
      <div className="flex  flex-col gap-6 mb-24">
        <div className="flex flex-col md:flex-row justify-center md:justify-between items-center">
          <SecondaryHeading>Contact Information</SecondaryHeading>

          <p className="text-secondary-foreground text-sm">
            Already have an Account?{" "}
            <Link
              href="/pages/myAccount"
              className="hover:underline text-primary-foreground font-medium"
            >
              Login
            </Link>
          </p>
        </div>
        <div className="flex flex-col gap-4 bg-secondary/30 p-3 rounded-md">
          <Input
            type="text"
            placeholder="Email or mobile phone number"
            register={register}
            name="email"
            errors={errors}
            required
          />

          <label className="flex items-center mt-3">
            <input
              type="checkbox"
              className="mr-2 accent-secondary"
              {...register("keepUpdated")}
            />
            <span className="text-sm text-gray-600">
              Keep me up to date on news and exclusive offers
            </span>
          </label>
        </div>
      </div>

      {/* Shipping Detial */}
      <div className="flex flex-col gap-6">
        <SecondaryHeading>Shipping Address</SecondaryHeading>
        <div className="flex flex-col gap-4 bg-secondary/30 p-3 rounded-md">
          <div className="grid grid-cols-1  sm:grid-cols-2 gap-4">
            <Input
              type="text"
              placeholder="First name (optional)"
              register={register}
              name="firstName"
              errors={errors}
            />
            <Input
              type="text"
              placeholder="Last name"
              register={register}
              name="lastName"
              errors={errors}
            />
          </div>
          <Input
            type="text"
            placeholder="Address"
            register={register}
            name="address"
            errors={errors}
            required
          />
          <Input
            type="text"
            placeholder="Apartment, suite, etc. (optional)"
            register={register}
            name="apartment"
            errors={errors}
          />
          <Input
            type="text"
            placeholder="City"
            register={register}
            name="city"
            errors={errors}
            required
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
            <Input
              type="text"
              placeholder="Country"
              register={register}
              name="country"
              errors={errors}
              required
            />
            <Input
              type="text"
              placeholder="Postal Code"
              register={register}
              name="postalCode"
              errors={errors}
              required
            />
          </div>
        </div>
        <Button variant={"secondary"} size={"lg"} type="submit">
          Continue Shipping
        </Button>
      </div>
    </form>
  );
}
