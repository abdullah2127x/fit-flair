"use client";
import React from "react";
import ContinuousCarousel from "../custom/ContinuousCarousel";

// Example slides data with all available fabrics
const allFabrics = [
  {
    src: "/images/fabrics/Cotton.webp",
    title: "Cotton",
    subTitle: "Natural & Comfortable",
    href: "/fabrics/cotton",
    linkEnabled: true,
  },
  {
    src: "/images/fabrics/Silk.webp",
    title: "Silk",
    subTitle: "Luxury & Elegant",
    href: "/fabrics/silk",
    linkEnabled: true,
  },
  {
    src: "/images/fabrics/Wool.webp",
    title: "Wool",
    subTitle: "Warm & Durable",
    href: "/fabrics/wool",
    linkEnabled: true,
  },
  {
    src: "/images/fabrics/Denim.webp",
    title: "Denim",
    subTitle: "Classic & Strong",
    href: "/fabrics/denim",
    linkEnabled: true,
  },
  {
    src: "/images/fabrics/Linen.webp",
    title: "Linen",
    subTitle: "Breathable & Natural",
    href: "/fabrics/linen",
    linkEnabled: true,
  },
  {
    src: "/images/fabrics/Velvet.webp",
    title: "Velvet",
    subTitle: "Soft & Luxurious",
    href: "/fabrics/velvet",
    linkEnabled: true,
  },
  {
    src: "/images/fabrics/Chiffon.webp",
    title: "Chiffon",
    subTitle: "Light & Flowy",
    href: "/fabrics/chiffon",
    linkEnabled: true,
  },
  {
    src: "/images/fabrics/Polyester.webp",
    title: "Polyester",
    subTitle: "Durable & Easy Care",
    href: "/fabrics/polyester",
    linkEnabled: true,
  },
  {
    src: "/images/fabrics/Crepe.webp",
    title: "Crepe",
    subTitle: "Textured & Elegant",
    href: "/fabrics/crepe",
    linkEnabled: true,
  },
  {
    src: "/images/fabrics/Rayon.webp",
    title: "Rayon",
    subTitle: "Silky & Versatile",
    href: "/fabrics/rayon",
    linkEnabled: true,
  },
  {
    src: "/images/fabrics/Leather.webp",
    title: "Leather",
    subTitle: "Premium & Tough",
    href: "/fabrics/leather",
    linkEnabled: true,
  },
  {
    src: "/images/fabrics/Satin.webp",
    title: "Satin",
    subTitle: "Smooth & Glossy",
    href: "/fabrics/satin",
    linkEnabled: true,
  },
  {
    src: "/images/fabrics/Organza.webp",
    title: "Organza",
    subTitle: "Sheer & Delicate",
    href: "/fabrics/organza",
    linkEnabled: true,
  },
  {
    src: "/images/fabrics/Nylon.webp",
    title: "Nylon",
    subTitle: "Strong & Lightweight",
    href: "/fabrics/nylon",
    linkEnabled: true,
  },
  {
    src: "/images/fabrics/Georgette.webp",
    title: "Georgette",
    subTitle: "Crinkled & Flowy",
    href: "/fabrics/georgette",
    linkEnabled: true,
  },
  {
    src: "/images/fabrics/Tulle.webp",
    title: "Tulle",
    subTitle: "Net & Decorative",
    href: "/fabrics/tulle",
    linkEnabled: true,
  },
  {
    src: "/images/fabrics/Jersey.webp",
    title: "Jersey",
    subTitle: "Stretchy & Comfortable",
    href: "/fabrics/jersey",
    linkEnabled: true,
  },
  {
    src: "/images/fabrics/Poplinn.webp",
    title: "Poplinn",
    subTitle: "Crisp & Structured",
    href: "/fabrics/poplinn",
    linkEnabled: true,
  },
  {
    src: "/images/fabrics/Fleece.webp",
    title: "Fleece",
    subTitle: "Warm & Cozy",
    href: "/fabrics/fleece",
    linkEnabled: true,
  },
  {
    src: "/images/fabrics/Chambray.webp",
    title: "Chambray",
    subTitle: "Denim-Like & Casual",
    href: "/fabrics/chambray",
    linkEnabled: true,
  },
];

const ContinuousCarouselExamples: React.FC = () => {
  return (
    <div className="space-y-16 p-6">
      {/* Example 1: Fast Continuous Scroll */}
      <div>
        <h2 className="text-2xl font-bold mb-4">1. Fast Continuous Scroll</h2>
        <p className="text-gray-600 mb-4">
          High-speed continuous scrolling with blue ripple effects.
        </p>
        <ContinuousCarousel
          slides={allFabrics}
          slidesToShow={6}
          autoPlaySpeed={1.2}
          stopOnHover={true}
          rounded="circle"
          ripple={true}
          rippleColor="blue"
          rippleOpacity={0.3}
          className="max-w-7xl mx-auto"
        />
      </div>

      {/* Example 2: Slow Elegant Scroll */}
      <div>
        <h2 className="text-2xl font-bold mb-4">2. Slow Elegant Scroll</h2>
        <p className="text-gray-600 mb-4">
          Gentle, slow-paced scrolling for a sophisticated look.
        </p>
        <ContinuousCarousel
          slides={allFabrics}
          slidesToShow={4}
          autoPlaySpeed={4}
          stopOnHover={true}
          rounded="square"
          ripple={false}
          className="max-w-5xl mx-auto"
        />
      </div>

      {/* Example 3: Compact Grid */}
      <div>
        <h2 className="text-2xl font-bold mb-4">3. Compact Grid Display</h2>
        <p className="text-gray-600 mb-4">
          Many items in a compact grid with purple ripple effects.
        </p>
        <ContinuousCarousel
          slides={allFabrics}
          slidesToShow={8}
          autoPlaySpeed={2.5}
          stopOnHover={true}
          rounded="circle"
          ripple={true}
          rippleColor="purple"
          rippleOpacity={0.4}
          className="max-w-8xl mx-auto"
        />
      </div>

      {/* Example 4: Large Showcase */}
      <div>
        <h2 className="text-2xl font-bold mb-4">4. Large Showcase</h2>
        <p className="text-gray-600 mb-4">
          Large items with green ripple effects for prominent display.
        </p>
        <ContinuousCarousel
          slides={allFabrics}
          slidesToShow={3}
          autoPlaySpeed={3}
          stopOnHover={true}
          rounded="square"
          ripple={true}
          rippleColor="green"
          rippleOpacity={0.25}
          className="max-w-4xl mx-auto"
        />
      </div>

      {/* Example 5: Ultra Fast Ticker */}
      <div>
        <h2 className="text-2xl font-bold mb-4">5. Ultra Fast Ticker</h2>
        <p className="text-gray-600 mb-4">
          Very fast scrolling like a news ticker with red effects.
        </p>
        <ContinuousCarousel
          slides={allFabrics}
          slidesToShow={10}
          autoPlaySpeed={0.8}
          stopOnHover={false}
          rounded="circle"
          ripple={true}
          rippleColor="red"
          rippleOpacity={0.2}
          className="max-w-9xl mx-auto"
        />
      </div>

      {/* Example 6: Medium Speed with Orange Ripple */}
      <div>
        <h2 className="text-2xl font-bold mb-4">6. Medium Speed with Orange Ripple</h2>
        <p className="text-gray-600 mb-4">
          Balanced speed with warm orange ripple effects.
        </p>
        <ContinuousCarousel
          slides={allFabrics}
          slidesToShow={5}
          autoPlaySpeed={2}
          stopOnHover={true}
          rounded="circle"
          ripple={true}
          rippleColor="orange"
          rippleOpacity={0.35}
          className="max-w-6xl mx-auto"
        />
      </div>

      {/* Example 7: Minimalist Display */}
      <div>
        <h2 className="text-2xl font-bold mb-4">7. Minimalist Display</h2>
        <p className="text-gray-600 mb-4">
          Clean, simple design without ripple effects.
        </p>
        <ContinuousCarousel
          slides={allFabrics}
          slidesToShow={4}
          autoPlaySpeed={2.8}
          stopOnHover={true}
          rounded="square"
          ripple={false}
          className="max-w-5xl mx-auto"
        />
      </div>

      {/* Example 8: Pink Ripple Effect */}
      <div>
        <h2 className="text-2xl font-bold mb-4">8. Pink Ripple Effect</h2>
        <p className="text-gray-600 mb-4">
          Elegant pink ripple effects with medium speed.
        </p>
        <ContinuousCarousel
          slides={allFabrics}
          slidesToShow={6}
          autoPlaySpeed={2.2}
          stopOnHover={true}
          rounded="circle"
          ripple={true}
          rippleColor="pink"
          rippleOpacity={0.3}
          className="max-w-7xl mx-auto"
        />
      </div>

      {/* Example 9: Wide Grid Layout */}
      <div>
        <h2 className="text-2xl font-bold mb-4">9. Wide Grid Layout</h2>
        <p className="text-gray-600 mb-4">
          Wide layout showing many items with teal effects.
        </p>
        <ContinuousCarousel
          slides={allFabrics}
          slidesToShow={9}
          autoPlaySpeed={1.8}
          stopOnHover={true}
          rounded="square"
          ripple={true}
          rippleColor="teal"
          rippleOpacity={0.25}
          className="max-w-8xl mx-auto"
        />
      </div>

      {/* Example 10: Slow Motion with Indigo */}
      <div>
        <h2 className="text-2xl font-bold mb-4">10. Slow Motion with Indigo</h2>
        <p className="text-gray-600 mb-4">
          Very slow, deliberate scrolling with indigo ripple effects.
        </p>
        <ContinuousCarousel
          slides={allFabrics}
          slidesToShow={3}
          autoPlaySpeed={5}
          stopOnHover={true}
          rounded="circle"
          ripple={true}
          rippleColor="indigo"
          rippleOpacity={0.4}
          className="max-w-4xl mx-auto"
        />
      </div>

      {/* Example 11: Compact Speed */}
      <div>
        <h2 className="text-2xl font-bold mb-4">11. Compact Speed</h2>
        <p className="text-gray-600 mb-4">
          Fast scrolling in a compact layout with yellow effects.
        </p>
        <ContinuousCarousel
          slides={allFabrics}
          slidesToShow={7}
          autoPlaySpeed={1.5}
          stopOnHover={true}
          rounded="circle"
          ripple={true}
          rippleColor="yellow"
          rippleOpacity={0.3}
          className="max-w-7xl mx-auto"
        />
      </div>

      {/* Example 12: Large Items with Brown Ripple */}
      <div>
        <h2 className="text-2xl font-bold mb-4">12. Large Items with Brown Ripple</h2>
        <p className="text-gray-600 mb-4">
          Large display items with warm brown ripple effects.
        </p>
        <ContinuousCarousel
          slides={allFabrics}
          slidesToShow={2}
          autoPlaySpeed={3.5}
          stopOnHover={true}
          rounded="square"
          ripple={true}
          rippleColor="brown"
          rippleOpacity={0.35}
          className="max-w-3xl mx-auto"
        />
      </div>

      {/* Example 13: Ultra Wide Layout */}
      <div>
        <h2 className="text-2xl font-bold mb-4">13. Ultra Wide Layout</h2>
        <p className="text-gray-600 mb-4">
          Maximum width layout showing many items with cyan effects.
        </p>
        <ContinuousCarousel
          slides={allFabrics}
          slidesToShow={12}
          autoPlaySpeed={1.6}
          stopOnHover={true}
          rounded="circle"
          ripple={true}
          rippleColor="cyan"
          rippleOpacity={0.2}
          className="max-w-9xl mx-auto"
        />
      </div>

      {/* Example 14: Centered Focus */}
      <div>
        <h2 className="text-2xl font-bold mb-4">14. Centered Focus</h2>
        <p className="text-gray-600 mb-4">
          Centered layout with lime green ripple effects.
        </p>
        <ContinuousCarousel
          slides={allFabrics}
          slidesToShow={5}
          autoPlaySpeed={2.4}
          stopOnHover={true}
          rounded="circle"
          ripple={true}
          rippleColor="lime"
          rippleOpacity={0.3}
          className="max-w-6xl mx-auto"
          centerIfFew={true}
        />
      </div>

      {/* Example 15: Premium Display */}
      <div>
        <h2 className="text-2xl font-bold mb-4">15. Premium Display</h2>
        <p className="text-gray-600 mb-4">
          Premium layout with gold ripple effects for luxury feel.
        </p>
        <ContinuousCarousel
          slides={allFabrics}
          slidesToShow={4}
          autoPlaySpeed={2.8}
          stopOnHover={true}
          rounded="square"
          ripple={true}
          rippleColor="gold"
          rippleOpacity={0.4}
          className="max-w-5xl mx-auto"
        />
      </div>
    </div>
  );
};

export default ContinuousCarouselExamples;
