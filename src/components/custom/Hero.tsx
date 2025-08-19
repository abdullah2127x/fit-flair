"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import PrimaryHeading from "./PrimaryHeading";
import SecondaryHeading from "./SecondaryHeading";
import { Autoplay } from "swiper/modules";
import {
  heroSlideOne,
  HeroSlideProps,
  heroSlideThree,
  heroSlideTwo,
} from "@/data/heroSlides";

const HeroSlide = ({
  title,
  subTitle,
  buttons,
  imageSide,
  imageUrl,
  textColorAfterMd = "primary",
}: HeroSlideProps) => {
  return (
    <section
      className={`relative w-full flex justify-center items-end md:items-center md:px-[14vw] py-[5%] xs:py-[8%] md:py-0 h-[38vh] xs:h-[45vh] sm:h-[48vh] md:h-[30vh] lg:h-[50vh] xl:h-[65vh] ${
        imageSide == "left" ? "md:justify-end" : "md:justify-start"
      }
        `}
    >
      {/* Background Image */}
      <Image
        src={imageUrl}
        alt="Adventure"
        fill
        priority
        className={`object-cover  -z-10 
          ${
            imageSide === "left"
              ? "object-[14%_0%]"
              : "object-[70%_0%] md:object-[0%_0%] lg:object-[60%_10%]"
          }
          `}
      />

      {/* Overlay (optional dark layer for better text readability) */}
      <div
        className={` absolute inset-0  bg-gradient-to-t ${
          imageSide == "left" ? "md:bg-gradient-to-l" : "md:bg-gradient-to-r"
        } from-black/50 to-transparent  -z-10`}
      ></div>

      {/* Content */}
      <div className="flex gap-1 md:gap-4 flex-col items-center ">
        <PrimaryHeading
          className={`text-secondary md:text-${textColorAfterMd}`}
        >
          {title}
        </PrimaryHeading>
        <SecondaryHeading
          className={`text-secondary md:text-${textColorAfterMd}`}
        >
          {subTitle}
        </SecondaryHeading>

        <div className="flex gap-x-4">
          {buttons.map((button) => (
            <Button
              className={`bg-secondary text-primary text-sm ${
                textColorAfterMd == "primary"
                  ? "md:bg-primary md:text-secondary"
                  : ""
              } `}
              key={button.label}
              // size={"lg"}
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
  return (
    <section className="w-full md:mt-14 ">
      <Swiper
        modules={[Autoplay]}
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
            title={heroSlideOne.title}
            subTitle={heroSlideOne.subTitle}
            buttons={heroSlideOne.buttons}
            imageSide={heroSlideOne.imageSide}
            imageUrl={heroSlideOne.imageUrl}
            textColorAfterMd={heroSlideOne.textColorAfterMd}
          />
        </SwiperSlide>
        <SwiperSlide>
          <HeroSlide
            title={heroSlideTwo.title}
            subTitle={heroSlideTwo.subTitle}
            buttons={heroSlideTwo.buttons}
            imageSide={heroSlideTwo.imageSide}
            textColorAfterMd={heroSlideTwo.textColorAfterMd}
            imageUrl={heroSlideTwo.imageUrl}
          />
        </SwiperSlide>
        <SwiperSlide>
          <HeroSlide
            title={heroSlideThree.title}
            subTitle={heroSlideThree.subTitle}
            buttons={heroSlideThree.buttons}
            textColorAfterMd={heroSlideThree.textColorAfterMd}
            imageSide={heroSlideThree.imageSide}
            imageUrl={heroSlideThree.imageUrl}
          />
        </SwiperSlide>
      </Swiper>
    </section>
  );
}
