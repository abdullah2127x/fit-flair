import { Headphones, RefreshCw, Shield, Truck } from "lucide-react";
import React from "react";

const WhyChooseUs = () => {
  return (
    <div className="container ">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold mb-4">Why Choose Couture</h2>
        <p className="text-xl text-muted-foreground">
          Experience the difference with our commitment to quality clothing and
          craftsmanship
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <div className="text-center">
          <div className="w-16 h-16 bg-primary rounded-lg flex items-center justify-center mx-auto mb-4">
            <Truck className="h-8 w-8 text-primary-foreground" />
          </div>
          <h3 className="text-xl font-semibold mb-2">Free Shipping</h3>
          <p className="text-muted-foreground">
            Free shipping on all clothing orders over $75
          </p>
        </div>

        <div className="text-center">
          <div className="w-16 h-16 bg-primary rounded-lg flex items-center justify-center mx-auto mb-4">
            <Shield className="h-8 w-8 text-primary-foreground" />
          </div>
          <h3 className="text-xl font-semibold mb-2">Secure Payment</h3>
          <p className="text-muted-foreground">
            Safe and secure payment for all your clothing purchases
          </p>
        </div>

        <div className="text-center">
          <div className="w-16 h-16 bg-primary rounded-lg flex items-center justify-center mx-auto mb-4">
            <Headphones className="h-8 w-8 text-primary-foreground" />
          </div>
          <h3 className="text-xl font-semibold mb-2">24/7 Support</h3>
          <p className="text-muted-foreground">
            Get help with sizing, fabric care, and more
          </p>
        </div>

        <div className="text-center">
          <div className="w-16 h-16 bg-primary rounded-lg flex items-center justify-center mx-auto mb-4">
            <RefreshCw className="h-8 w-8 text-primary-foreground" />
          </div>
          <h3 className="text-xl font-semibold mb-2">Easy Returns</h3>
          <p className="text-muted-foreground">
            30-day return policy on all clothing items
          </p>
        </div>
      </div>
    </div>
  );
};

export default WhyChooseUs;
