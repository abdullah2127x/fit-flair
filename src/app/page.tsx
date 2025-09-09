"use client";
import Hero from "@/components/custom/Hero";
import MenCollection from "@/components/custom/MenCollection";
import WomenCollection from "@/components/custom/WomensCollection";
import WhyChooseUs from "@/components/custom/WhyChooseUs";
import CTA from "@/components/custom/CTA";
import OurProducts from "@/components/custom/OurProducts";
import WinterStyles from "@/components/custom/WinterStyles";
import Fabrics from "@/components/custom/Fabrics";
export default function Home() {
  return (
    <div className=" flex flex-col overflow-hidden ">
      <Hero />

      {/* fabrics */}
      <div className="container mx-auto my-10 flex relative ">
        <Fabrics />
      </div>

      {/* winter styles banner like */}
      <div className="bg-secondary w-full ">
        <div className="container mx-auto flex flex-col my-10 ">
          <WinterStyles />
        </div>
      </div>

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

      {/* why choose us  */}
      <div className="bg-secondary w-full ">
        <div className="container mx-auto flex flex-col justify-center items-center my-10 ">
          <WhyChooseUs />
        </div>
      </div>

      {/* our products */}
      <div className="container  mx-auto flex flex-col gap-10 my-10">
        <OurProducts />
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
