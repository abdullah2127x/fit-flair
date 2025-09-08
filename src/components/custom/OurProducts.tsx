import React, { useRef } from "react";
import PrimaryHeading from "./PrimaryHeading";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import OurProductsTabContent from "./OurProductsTabContent";
import {
  newInQuery,
  popularQuery,
  specialOffersQuery,
} from "@/lib/GroqQueries";

gsap.registerPlugin(ScrollTrigger);

export type OurProductsType = {
  id: number;
  title: string;
  subTitle: string;
  price: number;
  discount: number;
  src: string;
  href: string;
  showAddToCart: boolean;
  buttonText: string;
};

const OurProducts = () => {
  const tabsRef = useRef<HTMLDivElement | null>(null);
  const sectionRef = useRef<HTMLDivElement | null>(null);

  //   useGSAP(() => {
  //     if (tabsRef.current && sectionRef.current) {
  //       ScrollTrigger.create({
  //         trigger: sectionRef.current,
  //         start: "top top", // when OurProducts section hits top of viewport
  //         end: "bottom top", // until the end of the section
  //         pin: tabsRef.current, // pin only the TabsList
  //         pinSpacing: false, // prevent extra white space
  //         markers:true
  //       });
  //       // Refresh ScrollTrigger whenever images or async content load
  //       const observer = new MutationObserver(() => {
  //         ScrollTrigger.refresh();
  //       });

  //       if (sectionRef.current) {
  //         observer.observe(sectionRef.current, { childList: true, subtree: true });
  //       }

  //       return () => observer.disconnect();
  //     }
  // }, []);

  // useGSAP(() => {
  //   if (tabsRef.current && sectionRef.current) {
  //     const st = ScrollTrigger.create({
  //       trigger: sectionRef.current,
  //       start: "top top+=62", // ✅ 64px = 16 * 4 (rem to px for top-16)
  //       // start: "top top",
  //       end: "bottom 80%",
  //       pin: tabsRef.current,
  //       pinSpacing: false,

  //     });

  //     // ✅ Clean up when component unmounts OR effect re-runs
  //     return () => {
  //       st.kill();
  //     };
  //   }
  // }, []);
  useGSAP(() => {
    if (!sectionRef.current || !tabsRef.current) return;

    const mm = gsap.matchMedia();
    const HEADER_OFFSET = 32;

    // Desktop: ≥768px
    mm.add("(min-width: 768px)", () => {
      const st = ScrollTrigger.create({
        trigger: sectionRef.current!,
        start: "top top", // top-0
        end: "bottom 60%",
        pin: tabsRef.current!,
        pinSpacing: false,
      });

      return () => st.kill();
    });

    // Mobile: <768px
    mm.add("(max-width: 767px)", () => {
      gsap.set(tabsRef.current!, { y: HEADER_OFFSET });

      const st = ScrollTrigger.create({
        trigger: sectionRef.current!,
        start: `top top+=${HEADER_OFFSET}`, // top-16
        end: "bottom 60%",
        pin: tabsRef.current!,
        pinSpacing: false,
        onKill: () => gsap.set(tabsRef.current!, { y: 0 }),
      });

      return () => {
        st.kill();
        gsap.set(tabsRef.current!, { y: 0 });
      };
    });

    return () => mm.revert();
  }, []);

  return (
    <div
      ref={sectionRef}
      className="flex flex-col gap-y-6 w-full justify-center items-center"
    >
      <PrimaryHeading>Our Products</PrimaryHeading>

      <Tabs defaultValue="new" className="w-full  flex flex-col gap-y-6">
        {/* Tab Buttons */}
        <div className="z-[997] mb-4 md:mb-0" ref={tabsRef}>
          <TabsList className="flex sm:gap-6 justify-center w-fit mx-auto shadow-md rounded-lg sm:px-4 py-2">
            <TabsTrigger className="px-2 sm:px-3 " value="new">
              New In
            </TabsTrigger>
            <TabsTrigger className="px-2 sm:px-3 " value="popular">
              Most Popular
            </TabsTrigger>
            <TabsTrigger className="px-2 sm:px-3 " value="sale">
              Special Offers
            </TabsTrigger>
          </TabsList>
        </div>

        {/* Tab Contents */}
        {/* <NewIn />
        <Popular />
        <SpeacialOffers /> */}

        {/* Tab Contents */}
        <OurProductsTabContent
          value="new"
          subtitle="Fresh arrivals just in for you."
          query={newInQuery}
        />
        <OurProductsTabContent
          value="popular"
          subtitle="Popular products just for you."
          query={popularQuery}
        />
        <OurProductsTabContent
          value="sale"
          subtitle="Special offers just for you."
          query={specialOffersQuery}
        />
      </Tabs>
    </div>
  );
};

export default OurProducts;
