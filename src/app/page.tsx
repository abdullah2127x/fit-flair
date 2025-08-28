"use client";
import Hero from "@/components/custom/Hero";
import Fabrics from "@/components/custom/Fabrics";
import EmblaCarouselExamples from "@/components/examples/EmblaCarouselExamples";
import Categories from "@/components/custom/Categories";
import Brands from "@/components/custom/Brands";
import ImageCard from "@/components/custom/ImageCard";
import RippleEffect from "@/components/custom/RippleEffect";
export default function Home() {
  return (
    <div className=" flex flex-col gap-16 overflow-hidden ">
      <Hero />
      <div className="container mx-auto">
        <Fabrics />
        <Categories />
        {/* <Brands />  */}

        {/* <EmblaCarouselExamples /> */}
      </div>
    </div>
  );
}
