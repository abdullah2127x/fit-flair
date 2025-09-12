import { Headphones, RefreshCw, Shield, Truck } from "lucide-react";
import React from "react";
import PrimaryHeading from "./PrimaryHeading";
import SubTitle from "./SubTitle";

const WhyChooseUs = () => {
  type Feature = {
    icon: React.ComponentType<any>;
    title: string;
    desc: string;
  };

  const features: Feature[] = [
    {
      icon: Truck,
      title: "Free Shipping",
      desc: "Free shipping on all clothing orders over $75",
    },
    {
      icon: Shield,
      title: "Secure Payment",
      desc: "Safe and secure payment for all your clothing purchases",
    },
    {
      icon: Headphones,
      title: "24/7 Support",
      desc: "Get help with sizing, fabric care, and more",
    },
    {
      icon: RefreshCw,
      title: "Easy Returns",
      desc: "30-day return policy on all clothing items",
    },
  ];

  return (
    <div className="">
      <div className="text-center mb-12">
        <PrimaryHeading>Why Choose Couture</PrimaryHeading>
        <SubTitle>
          Experience the difference with our commitment to quality clothing and
          craftsmanship
        </SubTitle>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {features.map((feature, idx) => {
          const Icon = feature.icon;
          return (
            <div key={idx} className="text-center">
              <div
                className={`w-16 h-16 rounded-lg flex items-center justify-center mx-auto mb-4 bg-primary-foreground`}
              >
                <Icon className={`h-8 w-8 text-primary`} />
              </div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-secondary-foreground">{feature.desc}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default WhyChooseUs;
