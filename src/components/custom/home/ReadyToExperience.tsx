import React from "react";
import PrimaryHeading from "@/components/custom/PrimaryHeading";
import SubTitle from "@/components/custom/SubTitle";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const ReadyToExperience = () => {
  return (
    <section className="text-center flex flex-col items-center gap-4 ">
      {/* <h2 className="text-4xl font-bold mb-4">
        Ready to Experience Premium Clothing?
      </h2> */}
      <PrimaryHeading>Ready to Experience Premium Clothing?</PrimaryHeading>
      <SubTitle>
        Join thousands of satisfied customers who trust us for premium quality
      </SubTitle>

      <Button size="lg" asChild variant="default" className="group">
        <Link href="/shop">
          Start Shoping
          <ArrowRight className="ml-2 h-5 group-hover:scale-x-125 group-hover:translate-x-2 w-5" />
        </Link>
      </Button>
      {/*       
      <Button asChild size="lg" className="group text-lg px-8">
        <Link href="/shop">
          <span>Start Shoppiiing</span>
          <ArrowRight className="ml-2 h-5 group-hover:scale-x-125 group-hover:translate-x-2 w-5" />
      </Button> */}
    </section>
  );
};

export default ReadyToExperience;
