"use client";
import Hero from "@/components/custom/Hero";
import Fabrics from "@/components/custom/Fabrics";
import EmblaCarouselExamples from "@/components/examples/EmblaCarouselExamples";
export default function Home() {
  return (
    <div className="md:mt-12 flex flex-col gap-16 overflow-hidden ">
      <Hero />
      <div className="container mx-auto">
        {/* <Fabrics /> */}
        <EmblaCarouselExamples />
      </div>
    </div>
  );
}
