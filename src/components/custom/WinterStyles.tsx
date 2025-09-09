import React from "react";
import SubTitle from "@/components/custom/SubTitle";
import PrimaryHeading from "./PrimaryHeading";
import { IoIosCheckmark } from "react-icons/io";
import { Button } from "../ui/button";
import Link from "next/link";
import Image from "next/image";

// ✅ Features List Data
const features = [
  "Material expose like metals",
  "Clear lines and geometric figures",
  "Simple neutral colours",
  "Durable and cozy fabrics",
];

export default function WinterStyles() {
  return (
    <div className="flex flex-col gap-y-4 w-full justify-center items-center">
      <PrimaryHeading>Winter Styles</PrimaryHeading>
      <SubTitle>Discover the latest trends in winter fashion.</SubTitle>

      <section className="flex w-full flex-col-reverse md:flex-row  justify-between gap-10  md:px-6  md:py-8 ">
        {/* Left Content */}
        <div className=" text-center md:text-left flex flex-col md:py-12 items-start">
          <PrimaryHeading>20% Off Winter Styles</PrimaryHeading>
          <h3 className="text-secondary-foreground text-xl font-semibold mb-4">
            Exclusive Collection
          </h3>
          <p className="text-secondary-foreground max-w-2xl mb-6">
            Discover cozy and stylish outfits for this winter season. Limited
            time offer on our hottest picks.
          </p>

          {/* ✅ Features with mapping */}
          <div className="grid  grid-cols-1 md:grid-cols-2 gap-3 text-sm md:text-base mb-6">
            {features.map((item, index) => (
              <p key={index} className="flex items-center">
                <IoIosCheckmark className="size-6 text-[#7569B2] mr-2" />
                {item}
              </p>
            ))}
          </div>

          <Button asChild className=" px-8 py-3 font-semibold">
            <Link href="/shop">Shop Now</Link>
          </Button>
        </div>

        {/* Right Image */}
        <div className="flex-1  flex justify-center">
          <div className="flex overflow-hidden justify-center items-center rounded-2xl">
            <Image
              src="/images/winter-styles.jpg"
              alt="Winter Outfit"
              width={400} // set your preferred width
              height={400} // set your preferred height
              className="w-full max-w-sm rounded-2xl shadow-lg hover:scale-125 transition-transform duration-500 "
            />
            {/* <ImageCard
                          buttonText={slide.buttonText}
                          showAddToCart={slide.showAddToCart}
                          src={slide.src}
                          price={slide.price}
                          discount={slide.discount}
                          title={slide.title}
                          subTitle={slide.subTitle}
                          rounded={rounded}
                          ripple={ripple}
                          rippleColor={rippleColor}
                          rippleOpacity={rippleOpacity}
                          href={slide.href}
                          colorCode={slide.colorCode}
                          colorName={slide.colorName}
                          tags={slide.tags}
                          changeColorOnHover={changeColorOnHover}
                        /> */}
          </div>
        </div>
      </section>
    </div>
  );
}
