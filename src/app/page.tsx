"use client";
import Hero from "@/components/custom/Hero";
import Fabrics from "@/components/custom/Fabrics";
import Categories from "@/components/custom/Categories";
import Brands from "@/components/custom/Brands";
import MenCollection from "@/components/custom/MenCollection";
import WomenCollection from "@/components/custom/WomensCollection";
import WhyChooseUs from "@/components/custom/WhyChooseUs";
import CTA from "@/components/custom/CTA";
import OurProducts from "@/components/custom/OurProducts";
import WinterStyles from "@/components/custom/WinterStyles";
export default function Home() {
  return (
    <div className=" flex flex-col overflow-hidden ">
      <Hero />
      {/* men */}
      <div className="bg-secondary/30 w-full ">
        <div className="container mx-auto flex flex-col my-10 ">
          <MenCollection />
        </div>
      </div>
      {/* women */}
      <div className="container  mx-auto flex flex-col gap-10 my-10">
        <WomenCollection />
      </div>
      <div className="bg-secondary w-full ">
        <div className="container mx-auto flex flex-col my-10 ">
          <WinterStyles />
        </div>
      </div>

      <div className="container  mx-auto flex flex-col gap-10 my-10">
        <OurProducts />
        {/* <Fabrics /> */}
        {/* <Categories />
        <Brands /> */}
      </div>

      {/* why choose us  */}
      <div className="bg-secondary w-full ">
        <div className="container mx-auto flex flex-col justify-center items-center my-10 ">
          <WhyChooseUs />
        </div>
      </div>
      {/* CTA */}
      <div className=" bg-primary text-primary-foreground">
        <div className="container mx-auto   my-16 ">
          <CTA />
        </div>
      </div>
    </div>
  );
}
