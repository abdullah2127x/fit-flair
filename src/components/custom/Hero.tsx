"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import PrimaryHeading from "./PrimaryHeading";
import SecondaryHeading from "./SecondaryHeading";
import { Autoplay, Mousewheel } from "swiper/modules";

type HeroSlideProps = {
  title: string;
  subTitle: string;
  buttons: {
    label: string;
    href: string;
  }[];
  imageSide: "left" | "right";
  imageUrl: string;
};
const HeroSlide = ({
  title,
  subTitle,
  buttons,
  imageSide,
  imageUrl,
}: HeroSlideProps) => {
  return (
    <section
      className={`relative w-full h-[60vh] md:h-[70vh] flex justify-center ${
        imageSide == "left" ? "md:justify-end" : "justify-start"
      } items-end md:items-center md:px-[14vw] py-[10%] md:py-0    `}
    >
      {/* Background Image */}
      <Image
        src={imageUrl}
        alt="Adventure"
        fill
        priority
        className={`object-cover md:object-[19%_30%]  -z-10 
          ${imageSide === "left" ? "object-[19%_30%]" : "object-[81%_70%]"}
          `}
      />

      {/* Overlay (optional dark layer for better text readability) */}
      {/* <div className="absolute inset-0 bg-black/40 -z-10"></div> */}

      {/* Content */}
      <div className="flex gap-4 flex-col items-center ">
        <PrimaryHeading className="text-secondary md:text-primary">
          {title}
        </PrimaryHeading>
        <SecondaryHeading className="text-secondary md:text-primary">
          {subTitle}
        </SecondaryHeading>

        <div className="flex gap-x-4">
          {buttons.map((button) => (
            <Button
              className="bg-secondary text-primary md:bg-primary md:text-secondary"
              key={button.label}
              size={"lg"}
            >
              {button.label}
            </Button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default function Hero() {
  const slideOne: HeroSlideProps = {
    title: "MAN ",
    subTitle: "INTERMIX '25",
    buttons: [
      {
        label: "Stiched",
        href: "/get-started",
      },
      {
        label: "UNSTICHED",
        href: "/get-started",
      },
    ],
    imageSide: "left",
    imageUrl: "/images/hero/heroSlideOneImage.webp",
  };
  return (
    <section className="w-full md:mt-14">
      <Swiper
        modules={[Autoplay, Mousewheel]}
        spaceBetween={30}
        slidesPerView={1}
        loop={true}
        allowTouchMove={true}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
      >
        <SwiperSlide>
          <HeroSlide
            title={slideOne.title}
            subTitle={slideOne.subTitle}
            buttons={slideOne.buttons}
            imageSide={slideOne.imageSide}
            imageUrl={slideOne.imageUrl}
          />
        </SwiperSlide>
      </Swiper>
    </section>
  );
}
