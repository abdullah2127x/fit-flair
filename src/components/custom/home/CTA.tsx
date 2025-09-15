import React from "react";
import PrimaryHeading from "@/components/custom/PrimaryHeading";
import SubTitle from "@/components/custom/SubTitle";
import { Button } from "@/components/ui/button";
import { ArrowRight, Link } from "lucide-react";

const CTA = () => {
  return (
    <section className="text-center flex flex-col items-center gap-4 ">
      {/* <h2 className="text-4xl font-bold mb-4">
        Ready to Experience Premium Clothing?
      </h2> */}
      <PrimaryHeading>Ready to Experience Premium Clothing?</PrimaryHeading>
      <SubTitle>
        Join thousands of satisfied customers who trust us for premium quality
      </SubTitle>
      {/* <p className="text-xl mb-8 opacity-90">
        clothing
      </p> */}
      <Button
        size="lg"
        variant="default"
        className="group text-lg px-8"
        asChild
      >
        <Link href="/shop">
          Start Shopping{" "}
          <ArrowRight className="ml-2 h-5 group-hover:scale-x-125 group-hover:translate-x-2 w-5" />
        </Link>
      </Button>
    </section>
  );
};

export default CTA;
