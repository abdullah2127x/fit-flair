import React from "react";
import SubTitle from "@/components/custom/SubTitle";
import PrimaryHeading from "../PrimaryHeading";
import { IoIosCheckmark } from "react-icons/io";
import { Button } from "../../ui/button";
import Link from "next/link";
import Image from "next/image";

// ✅ Features List Data from Black Friday
const features = [
  "Limited time offer",
  "Exclusive deals",
  "Free shipping",
  "Bestsellers",
];

export default function BlackFriday() {
  return (
    <div className="flex flex-col gap-y-4 w-full justify-center items-center">
      <PrimaryHeading>Black Friday Mega Sale</PrimaryHeading>
      <SubTitle>Up to 50% off on selected items</SubTitle>

      <section className="flex w-full flex-col-reverse md:flex-row-reverse  justify-between gap-10  md:px-6  md:py-8 ">
        {/* Left Content */}
        <div className=" text-center md:text-left flex flex-col md:py-12 items-start">
          <PrimaryHeading>Grab Deals Now!</PrimaryHeading>
          <h3 className="text-secondary-foreground text-xl font-semibold mb-4">
            Limited Time Offers
          </h3>
          <p className="text-secondary-foreground max-w-2xl mb-6">
            Shop our exclusive Black Friday collection and enjoy unbeatable
            discounts on the hottest picks of the season.
          </p>

          {/* ✅ Features with mapping */}
          <div className="grid  grid-cols-1 md:grid-cols-2 gap-3 text-sm md:text-base mb-6">
            {features.map((item, index) => (
              <p key={index} className="flex items-center">
                <IoIosCheckmark className="size-6 text-red-950 mr-2" />
                {item}
              </p>
            ))}
          </div>

          <Button
            asChild
            className="px-8 py-3 bg-secondary-foreground text-secondary font-semibold"
          >
            <Link href="/shop">Grab Deals</Link>
          </Button>
        </div>

        {/* Right Image */}
        <div className="flex-1  flex justify-center">
          <div className="flex overflow-hidden justify-center items-center w-full rounded-2xl">
            <Image
              src="/images/black-friday.jpg"
              alt="Black Friday Deals"
              width={400}
              height={400}
              className="w-full rounded-2xl shadow-lg hover:scale-125 transition-transform duration-500 "
            />
          </div>
        </div>
      </section>
    </div>
  );
}
