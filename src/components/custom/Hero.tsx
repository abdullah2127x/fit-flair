// "use client";
// import gsap from "gsap";
// import { Swiper, SwiperSlide } from "swiper/react";
// import "swiper/css";
// import { Button } from "@/components/ui/button";
// import Image from "next/image";
// import PrimaryHeading from "./PrimaryHeading";
// import SecondaryHeading from "./SecondaryHeading";
// import { Autoplay } from "swiper/modules";
// import {
//   heroSlideOne,
//   HeroSlideProps,
//   heroSlideThree,
//   heroSlideTwo,
// } from "@/data/heroSlides";
// import { useGSAP } from "@gsap/react";
// import { useRef } from "react";

// const HeroSlide = ({
//   title,
//   subTitle,
//   buttons,
//   imageSide,
//   imageUrl,
//   textColorAfterMd = "black",
// }: HeroSlideProps) => {
//   const btnRefs = useRef(null);
//   // gsap.registerPlugin(useGSAP);
//   useGSAP(() => {
//     if (!btnRefs.current) return;

//     const animate = () => {
//       // gsap code here...
//       gsap.from(btnRefs.current, {
//         scale: 0.5,
//         stagger: 0.15,
//       }); // <-- automatically reverted
//     };
//     animate();
//   });

//   return (
//     <section
//       className={`relative text-center w-full flex justify-center items-end md:items-center md:px-[14vw] py-[5%] xs:py-[8%] md:py-0 h-[38vh] xs:h-[45vh] sm:h-[48vh] md:h-[30vh] lg:h-[50vh] xl:h-[65vh] ${
//         imageSide == "left" ? "md:justify-end" : "md:justify-start"
//       }
//         `}
//     >
//       {/* Background Image */}
//       <Image
//         src={imageUrl}
//         alt="Adventure"
//         fill
//         priority
//         className={`object-cover  -z-10
//           ${
//             imageSide === "left"
//               ? "object-[14%_0%]"
//               : "object-[70%_0%] md:object-[0%_0%] lg:object-[60%_10%]"
//           }
//           `}
//       />

//       {/* Overlay (optional dark layer for better text readability) */}
//       <div
//         className={` absolute inset-0  bg-gradient-to-t ${
//           imageSide == "left" ? "md:bg-gradient-to-l" : "md:bg-gradient-to-r"
//         } from-black/70 md:from-black/40 to-transparent  -z-10`}
//       ></div>

//       {/* Content */}
//       <div className="flex gap-1 md:gap-4 flex-col items-center ">
//         <PrimaryHeading className={`text-white md:text-${textColorAfterMd}`}>
//           {title}
//         </PrimaryHeading>
//         <SecondaryHeading className={`text-white md:text-${textColorAfterMd}`}>
//           {subTitle}
//         </SecondaryHeading>

//         <div ref={btnRefs} className="flex gap-x-4">
//           {buttons.map((button) => (
//             <Button
//               className={`bg-white text-black hover:bg-white/90  ${
//                 textColorAfterMd == "black"
//                   ? "md:bg-black md:text-white hover:md:bg-black/90"
//                   : ""
//               } `}
//               key={button.label}
//             >
//               {button.label}
//             </Button>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default function Hero() {
//   const swiperRef = useRef<any>(null);

//   const animateSlide = (swiper: any) => {
//     const activeSlide = swiper.slides[swiper.activeIndex];
//     if (!activeSlide) return;
//     if (swiper.activeIndex == swiper.previousIndex) return;

//     // Animate elements inside active slide
//     gsap.fromTo(
//       activeSlide.querySelectorAll("h1, h2"),
//       { autoAlpha: 0, x: 400 },
//       { autoAlpha: 1, x: 0, stagger: 0.2, duration: 0.8, ease: "circ.out" }
//     );
//     gsap.fromTo(
//       activeSlide.querySelectorAll("button"),
//       { autoAlpha: 0, scale: 0 },
//       { autoAlpha: 1, scale: 1, stagger: 0.2, duration: 0.8, ease: "circ.out" }
//     );
//   };

//   return (
//     <section className="w-full ">
//       <Swiper
//         modules={[Autoplay]}
//         spaceBetween={30}
//         slidesPerView={1}
//         loop={true}
//         allowTouchMove={true}
//         autoplay={{
//           delay: 5000,
//           disableOnInteraction: false,
//         }}
//         onSlideChange={(swiper) => {
//           animateSlide(swiper);
//         }}
//       >
//         <SwiperSlide>
//           <HeroSlide {...heroSlideOne} />
//         </SwiperSlide>
//         <SwiperSlide>
//           <HeroSlide {...heroSlideTwo} />
//         </SwiperSlide>
//         <SwiperSlide>
//           <HeroSlide {...heroSlideThree} />
//         </SwiperSlide>
//       </Swiper>
//     </section>
//   );
// }

"use client";
import gsap from "gsap";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Autoplay } from "swiper/modules";
import { useRef } from "react";
import { PiShoppingBagOpenFill } from "react-icons/pi";
import WrapButton from "../ui/wrap-button";
import ScrollToExplore from "./ScrollToExplore";

interface Slide {
  id: number;
  title: string;
  accent: string;
  subtitle: string;
  imageUrl: string;
}

const slides: Slide[] = [
  {
    id: 1,
    title: "Discover",
    accent: "Couture",
    subtitle:
      "Premium clothing crafted with finest fabrics and attention to detail",
    imageUrl: "/images/heroImages/image2.jpg",
  },
  {
    id: 2,
    title: "Unstitched",
    accent: "Elegance",
    subtitle:
      "Experience timeless fashion with our premium unstitched collection",
    imageUrl:
      "/images/heroImages/image3.jpg",
  },
  {
    id: 3,
    title: "Modern",
    accent: "Heritage",
    subtitle: "Where tradition meets modern design, crafted to perfection",
    imageUrl:
      "/images/heroImages/image1.png",
  },
];

export default function HeroCarousel() {
  const swiperRef = useRef<any>(null);
  const primaryBtnRef = useRef<any>(null);

  const animateSlide = (swiper: any) => {
    const activeSlide = swiper.slides[swiper.activeIndex];
    if (!activeSlide) return;
    if (swiper.activeIndex == swiper.previousIndex) return;

    // Animate heading & subtitle
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
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-black/40" />
              </div>

              {/* Content */}
              <div className="relative z-10 text-center text-white max-w-4xl mx-auto flex flex-col items-center px-4">
                <h1 className="text-5xl md:text-7xl font-bold mb-6">
                  {slide.title}
                  <span className="block text-accent">{slide.accent}</span>
                </h1>
                <p className="text-xl md:text-2xl mb-8 text-white/90">
                  {slide.subtitle}
                </p>
                <div className="flex flex-col items-center sm:flex-row gap-4 justify-center">
                  {/* <Button
                    size="lg"
                    className="text-lg group border-primary border-[0.7px] text-accent hover:bg-accent hover:border-primary  hover:text-primary px-8"
                    asChild
                  >
                    <Link href="/products">
                      Shop Now{" "}
                      <ArrowRight className="ml-2 h-5 w-5 text-accent transition-transform duration-300 group-hover:translate-x-1 group-hover:text-black" />
                    </Link>
                  </Button> */}
                  <span>
                    <WrapButton className="" href="/shop">
                      <PiShoppingBagOpenFill className=" " />
                      Shop Now
                    </WrapButton>
                  </span>
                  {/* <Button
                    variant="outline"
                    size="lg"
                    className="text-lg px-8 bg-white/10 hover:text-white/10 text-white hover:bg-white border-white/30 hover:bg-white/20"
                  >
                    Learn More
                  </Button> */}
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
