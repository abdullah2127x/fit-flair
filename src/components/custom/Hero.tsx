"use client";
import gsap from "gsap";
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
import { useGSAP } from "@gsap/react";
import { useRef } from "react";

const HeroSlide = ({
  title,
  subTitle,
  buttons,
  imageSide,
  imageUrl,
  textColorAfterMd = "black",
}: HeroSlideProps) => {
  const btnRefs = useRef(null);
  // gsap.registerPlugin(useGSAP);
  useGSAP(() => {
    if (!btnRefs.current) return;

    const animate = () => {
      // gsap code here...
      gsap.from(btnRefs.current, {
        scale: 0.5,
        stagger: 0.15,
      }); // <-- automatically reverted
    };
    animate();
  });

  return (
    <section
      className={`relative text-center w-full flex justify-center items-end md:items-center md:px-[14vw] py-[5%] xs:py-[8%] md:py-0 h-[38vh] xs:h-[45vh] sm:h-[48vh] md:h-[30vh] lg:h-[50vh] xl:h-[65vh] ${
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
        } from-black/70 md:from-black/40 to-transparent  -z-10`}
      ></div>

      {/* Content */}
      <div className="flex gap-1 md:gap-4 flex-col items-center ">
        <PrimaryHeading className={`text-white md:text-${textColorAfterMd}`}>
          {title}
        </PrimaryHeading>
        <SecondaryHeading className={`text-white md:text-${textColorAfterMd}`}>
          {subTitle}
        </SecondaryHeading>

        <div ref={btnRefs} className="flex gap-x-4">
          {buttons.map((button) => (
            <Button
              className={`bg-white text-black hover:bg-white/90  ${
                textColorAfterMd == "black"
                  ? "md:bg-black md:text-white hover:md:bg-black/90"
                  : ""
              } `}
              key={button.label}
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
  const swiperRef = useRef<any>(null);

  const animateSlide = (swiper: any) => {
    const activeSlide = swiper.slides[swiper.activeIndex];
    if (!activeSlide) return;
    if (swiper.activeIndex == swiper.previousIndex) return;

    // Animate elements inside active slide
    gsap.fromTo(
      activeSlide.querySelectorAll("h1, h2"),
      { autoAlpha: 0, x: 400 },
      { autoAlpha: 1, x: 0, stagger: 0.2, duration: 0.8, ease: "circ.out" }
    );
    gsap.fromTo(
      activeSlide.querySelectorAll("button"),
      { autoAlpha: 0, scale: 0 },
      { autoAlpha: 1, scale: 1, stagger: 0.2, duration: 0.8, ease: "circ.out" }
    );
  };

  return (
    <section className="w-full ">
      <Swiper
        modules={[Autoplay]}
        spaceBetween={30}
        slidesPerView={1}
        loop={true}
        allowTouchMove={true}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        onSlideChange={(swiper) => {
          animateSlide(swiper);
        }}
      >
        <SwiperSlide>
          <HeroSlide {...heroSlideOne} />
        </SwiperSlide>
        <SwiperSlide>
          <HeroSlide {...heroSlideTwo} />
        </SwiperSlide>
        <SwiperSlide>
          <HeroSlide {...heroSlideThree} />
        </SwiperSlide>
      </Swiper>
    </section>
  );
}
