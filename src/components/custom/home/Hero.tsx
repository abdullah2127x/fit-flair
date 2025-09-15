"use client";
import gsap from "gsap";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import Image from "next/image";
import { Autoplay } from "swiper/modules";
import { useRef } from "react";
import { PiShoppingBagOpenFill } from "react-icons/pi";
import WrapButton from "@/components/ui/wrap-button";
import ScrollToExplore from "@/components/custom/home/ScrollToExplore";
import SubTitle from "@/components/custom/SubTitle";

interface Slide {
  id: number;
  title: string;
  accent: string;
  subTitle: string;
  imageUrl: string;
}

const slides: Slide[] = [
  {
    id: 1,
    title: "Discover",
    accent: "Couture",
    subTitle:
      "Premium clothing crafted with finest fabrics and attention to detail",
    imageUrl: "/images/heroImages/image1.png",
  },
  {
    id: 2,
    title: "Unstitched",
    accent: "Elegance",
    subTitle:
      "Experience timeless fashion with our premium unstitched collection",
    imageUrl: "/images/heroImages/image3.jpg",
  },
  {
    id: 3,
    title: "Modern",
    accent: "Heritage",
    subTitle: "Where tradition meets modern design, crafted to perfection",
    imageUrl: "/images/heroImages/image2.jpg",
  },
];

export default function HeroCarousel() {
  const swiperRef = useRef<any>(null);
  const primaryBtnRef = useRef<any>(null);

  const animateSlide = (swiper: any) => {
    const activeSlide = swiper.slides[swiper.activeIndex];
    if (!activeSlide) return;
    if (swiper.activeIndex == swiper.previousIndex) return;

    // Animate heading & subitle
    gsap.fromTo(
      activeSlide.querySelectorAll("h1, p"),
      { autoAlpha: 0, y: 60 },
      { autoAlpha: 1, y: 0, stagger: 0.2, duration: 1, ease: "power4.out" }
    );

    // Animate buttons
    gsap.fromTo(
      // primaryBtnRef.current,
      activeSlide.querySelectorAll("button, span"),
      { autoAlpha: 0, y: 40, scale: 0.9 },
      {
        autoAlpha: 1,
        y: 0,
        scale: 1,
        stagger: 0.2,
        duration: 0.8,
        ease: "back.out(1.7)",
      }
    );
  };

  return (
    <section className="w-full ">
      <Swiper
        modules={[Autoplay]}
        spaceBetween={0}
        slidesPerView={1}
        loop={true}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        onSlideChange={(swiper) => animateSlide(swiper)}
        onSwiper={(swiper) => animateSlide(swiper)} // animate first slide
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <section className="relative h-[90vh] flex flex-col items-center justify-center overflow-hidden">
              {/* Background */}
              <div className="absolute inset-0 z-0">
                <Image
                  src={slide.imageUrl}
                  alt={slide.title}
                  fill
                  className="object-cover object-top"
                  priority
                />
                <div className="absolute inset-0 bg-black/40" />
              </div>

              {/* Content */}
              <div className="relative z-10 text-center text-white max-w-4xl mx-auto flex flex-col items-center px-4">
                <h1 className="text-5xl md:text-7xl font-bold mb-6">
                  {slide.title}
                  <span className="block text-accent dark:text-accent-foreground">
                    {slide.accent}
                  </span>
                </h1>
                {/* <p className="text-xl md:text-2xl mb-8 text-white/90">
                  {slide.subtitle}
                </p> */}
                <SubTitle>{slide.subTitle}</SubTitle>
                <div className="flex flex-col items-center sm:flex-row gap-4 justify-center mt-4">
                  <span>
                    <WrapButton className="" href="/shop">
                      <PiShoppingBagOpenFill className="" />
                      Shop Now
                    </WrapButton>
                  </span>
                </div>
              </div>
              <ScrollToExplore />
            </section>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
