"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import PrimaryHeading from "./PrimaryHeading";
import SecondaryHeading from "./SecondaryHeading";

const HeroSlideOne = () => {
  return (
    <section className="relative w-full h-[60vh] md:h-[70vh] flex justify-center md:justify-end items-end md:items-center md:px-[14vw] py-[10%] md:py-0    ">

      {/* Background Image */}
      <Image
        src="/images/hero/heroSlideOneImage.webp"
        alt="Adventure"
        fill
        priority
        className="object-cover object-[19%_30%] -z-10"
      />

      {/* Overlay (optional dark layer for better text readability) */}
      {/* <div className="absolute inset-0 bg-black/40 -z-10"></div> */}

      {/* Content */}
      <div className="flex gap-4 flex-col items-center ">
        <PrimaryHeading className="text-secondary md:text-primary">MAN</PrimaryHeading>
        <SecondaryHeading className="text-secondary md:text-primary" >INTERMIX &apos;25</SecondaryHeading>

        <div className="flex gap-x-4">
          {[
            {
              label: "Stiched",
              href: "/get-started",
            },
            {
              label: "UNSTICHED",
              href: "/get-started",
            },
          ].map((item) => (
            <Button className="bg-secondary text-primary md:bg-primary md:text-secondary" key={item.label} size={"lg"}>

              {item.label}
            </Button>
          ))}
        </div>
      </div>
    </section>
  );
};


export default function Hero() {
  return (
    <section className="w-full md:mt-14">
      <Swiper slidesPerView={1} loop={true}>
        <SwiperSlide>
          <HeroSlideOne />
        </SwiperSlide>
      </Swiper>
    </section>
  );
}
