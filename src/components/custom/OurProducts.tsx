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

const OurProducts = () => {
  // to control the tabs pinning
  const tabsRef = useRef<HTMLDivElement | null>(null);
  const sectionRef = useRef<HTMLDivElement | null>(null);

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
        <div className="z-40 mb-4 md:mb-0" ref={tabsRef}>
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

        {/* New In */}
        <OurProductsTabContent
          value="new"
          subtitle="Fresh arrivals just in for you."
          query={newInQuery}
        />

        {/* Popular */}
        <OurProductsTabContent
          value="popular"
          subtitle="Popular products just for you."
          query={popularQuery}
        />

        {/* Special Offers */}
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
