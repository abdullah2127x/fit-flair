import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const CTA = () => {
  return (
    <section className="text-center ">
      <h2 className="text-4xl font-bold mb-4">
        Ready to Experience Premium Clothing?
      </h2>
      <p className="text-xl mb-8 opacity-90">
        Join thousands of satisfied customers who trust us for premium quality
        clothing
      </p>
      <Button size="lg" variant="secondary" className="text-lg px-8" asChild>
        <Link href="/products">
          Start Shopping <ArrowRight className="ml-2 h-5 w-5" />
        </Link>
      </Button>
    </section>
  );
};

export default CTA;
