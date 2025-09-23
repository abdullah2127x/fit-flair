"use client";
import React from "react";
import ContinuousCarousel from "../custom/ContinuousCarousel";
import { ProductCollectionSchema } from "@/types/product";

// Example slides data with all available fabrics
const allFabrics: ProductCollectionSchema[] = [
  {
    id: "cotton",
    src: "/images/fabrics/Cotton.webp",
    title: "Cotton",
    slug: "/fabrics/cotton",
  },
  {
    id: "silk",
    src: "/images/fabrics/Silk.webp",
    title: "Silk",
    slug: "/fabrics/silk",
  },
  {
    id: "wool",
    src: "/images/fabrics/Wool.webp",
    title: "Wool",
    slug: "/fabrics/wool",
  },
  {
    id: "denim",
    src: "/images/fabrics/Denim.webp",
    title: "Denim",
    slug: "/fabrics/denim",
  },
  {
    id: "linen",
    src: "/images/fabrics/Linen.webp",
    title: "Linen",
    slug: "/fabrics/linen",
  },
  {
    id: "velvet",
    src: "/images/fabrics/Velvet.webp",
    title: "Velvet",
    slug: "/fabrics/velvet",
  },
  {
    id: "chiffon",
    src: "/images/fabrics/Chiffon.webp",
    title: "Chiffon",
    slug: "/fabrics/chiffon",
  },
  {
    id: "polyester",
    src: "/images/fabrics/Polyester.webp",
    title: "Polyester",
    slug: "/fabrics/polyester",
  },
  {
    id: "crepe",
    src: "/images/fabrics/Crepe.webp",
    title: "Crepe",
    slug: "/fabrics/crepe",
  },
  {
    id: "rayon",
    src: "/images/fabrics/Rayon.webp",
    title: "Rayon",
    slug: "/fabrics/rayon",
  },
  {
    id: "leather",
    src: "/images/fabrics/Leather.webp",
    title: "Leather",
    slug: "/fabrics/leather",
  },
  {
    id: "satin",
    src: "/images/fabrics/Satin.webp",
    title: "Satin",
    slug: "/fabrics/satin",
  },
  {
    id: "organza",
    src: "/images/fabrics/Organza.webp",
    title: "Organza",
    slug: "/fabrics/organza",
  },
  {
    id: "nylon",
    src: "/images/fabrics/Nylon.webp",
    title: "Nylon",
    slug: "/fabrics/nylon",
  },
  {
    id: "georgette",
    src: "/images/fabrics/Georgette.webp",
    title: "Georgette",
    slug: "/fabrics/georgette",
  },
  {
    id: "tulle",
    src: "/images/fabrics/Tulle.webp",
    title: "Tulle",
    slug: "/fabrics/tulle",
  },
  {
    id: "jersey",
    src: "/images/fabrics/Jersey.webp",
    title: "Jersey",
    slug: "/fabrics/jersey",
  },
  {
    id: "poplinn",
    src: "/images/fabrics/Poplinn.webp",
    title: "Poplinn",
    slug: "/fabrics/poplinn",
  },
  {
    id: "fleece",
    src: "/images/fabrics/Fleece.webp",
    title: "Fleece",
    slug: "/fabrics/fleece",
  },
  {
    id: "chambray",
    src: "/images/fabrics/Chambray.webp",
    title: "Chambray",
    slug: "/fabrics/chambray",
  },
];

const ContinuousCarouselExamples: React.FC = () => {
  return (
    <div className="space-y-16 p-6">
      {/* Example 1: Fast Continuous Scroll */}
      <div>
        <h2 className="text-2xl font-bold mb-4">1. Fast Continuous Scroll</h2>
        <p className="text-gray-600 mb-4">
          High-speed continuous scrolling.
        </p>
        <ContinuousCarousel
          slides={allFabrics}
          slidesToShow={6}
          autoPlaySpeed={1.2}
          stopOnHover={true}
          rounded="circle"
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
          className="max-w-5xl mx-auto"
        />
      </div>

      {/* Example 3: Compact Grid */}
      <div>
        <h2 className="text-2xl font-bold mb-4">3. Compact Grid Display</h2>
        <p className="text-gray-600 mb-4">
          Many items in a compact grid.
        </p>
        <ContinuousCarousel
          slides={allFabrics}
          slidesToShow={8}
          autoPlaySpeed={2.5}
          stopOnHover={true}
          rounded="circle"
          className="max-w-8xl mx-auto"
        />
      </div>

      {/* Example 4: Large Showcase */}
      <div>
        <h2 className="text-2xl font-bold mb-4">4. Large Showcase</h2>
        <p className="text-gray-600 mb-4">
          Large items for prominent display.
        </p>
        <ContinuousCarousel
          slides={allFabrics}
          slidesToShow={3}
          autoPlaySpeed={3}
          stopOnHover={true}
          rounded="square"
          className="max-w-4xl mx-auto"
        />
      </div>

      {/* Example 5: Ultra Fast Ticker */}
      <div>
        <h2 className="text-2xl font-bold mb-4">5. Ultra Fast Ticker</h2>
        <p className="text-gray-600 mb-4">
          Very fast scrolling like a news ticker.
        </p>
        <ContinuousCarousel
          slides={allFabrics}
          slidesToShow={10}
          autoPlaySpeed={0.8}
          stopOnHover={false}
          rounded="circle"
          className="max-w-9xl mx-auto"
        />
      </div>

      {/* Example 6: Medium Speed */}
      <div>
        <h2 className="text-2xl font-bold mb-4">
          6. Medium Speed
        </h2>
        <p className="text-gray-600 mb-4">
          Balanced speed.
        </p>
        <ContinuousCarousel
          slides={allFabrics}
          slidesToShow={5}
          autoPlaySpeed={2}
          stopOnHover={true}
          rounded="circle"
          className="max-w-6xl mx-auto"
        />
      </div>

      {/* Example 7: Minimalist Display */}
      <div>
        <h2 className="text-2xl font-bold mb-4">7. Minimalist Display</h2>
        <p className="text-gray-600 mb-4">
          Clean, simple design without effects.
        </p>
        <ContinuousCarousel
          slides={allFabrics}
          slidesToShow={4}
          autoPlaySpeed={2.8}
          stopOnHover={true}
          rounded="square"
          className="max-w-5xl mx-auto"
        />
      </div>

      {/* Example 8: Medium Speed */}
      <div>
        <h2 className="text-2xl font-bold mb-4">8. Medium Speed</h2>
        <p className="text-gray-600 mb-4">
          Medium speed scrolling.
        </p>
        <ContinuousCarousel
          slides={allFabrics}
          slidesToShow={6}
          autoPlaySpeed={2.2}
          stopOnHover={true}
          rounded="circle"
          className="max-w-7xl mx-auto"
        />
      </div>

      {/* Example 9: Wide Grid Layout */}
      <div>
        <h2 className="text-2xl font-bold mb-4">9. Wide Grid Layout</h2>
        <p className="text-gray-600 mb-4">
          Wide layout showing many items.
        </p>
        <ContinuousCarousel
          slides={allFabrics}
          slidesToShow={9}
          autoPlaySpeed={1.8}
          stopOnHover={true}
          rounded="square"
          className="max-w-8xl mx-auto"
        />
      </div>

      {/* Example 10: Slow Motion */}
      <div>
        <h2 className="text-2xl font-bold mb-4">10. Slow Motion</h2>
        <p className="text-gray-600 mb-4">
          Very slow, deliberate scrolling.
        </p>
        <ContinuousCarousel
          slides={allFabrics}
          slidesToShow={3}
          autoPlaySpeed={5}
          stopOnHover={true}
          rounded="circle"
          className="max-w-4xl mx-auto"
        />
      </div>

      {/* Example 11: Compact Speed */}
      <div>
        <h2 className="text-2xl font-bold mb-4">11. Compact Speed</h2>
        <p className="text-gray-600 mb-4">
          Fast scrolling in a compact layout.
        </p>
        <ContinuousCarousel
          slides={allFabrics}
          slidesToShow={7}
          autoPlaySpeed={1.5}
          stopOnHover={true}
          rounded="circle"
          className="max-w-7xl mx-auto"
        />
      </div>

      {/* Example 12: Large Items */}
      <div>
        <h2 className="text-2xl font-bold mb-4">
          12. Large Items
        </h2>
        <p className="text-gray-600 mb-4">
          Large display items.
        </p>
        <ContinuousCarousel
          slides={allFabrics}
          slidesToShow={2}
          autoPlaySpeed={3.5}
          stopOnHover={true}
          rounded="square"
          className="max-w-3xl mx-auto"
        />
      </div>

      {/* Example 13: Ultra Wide Layout */}
      <div>
        <h2 className="text-2xl font-bold mb-4">13. Ultra Wide Layout</h2>
        <p className="text-gray-600 mb-4">
          Maximum width layout showing many items.
        </p>
        <ContinuousCarousel
          slides={allFabrics}
          slidesToShow={12}
          autoPlaySpeed={1.6}
          stopOnHover={true}
          rounded="circle"
          className="max-w-9xl mx-auto"
        />
      </div>

      {/* Example 14: Centered Focus */}
      <div>
        <h2 className="text-2xl font-bold mb-4">14. Centered Focus</h2>
        <p className="text-gray-600 mb-4">
          Centered layout.
        </p>
        <ContinuousCarousel
          slides={allFabrics}
          slidesToShow={5}
          autoPlaySpeed={2.4}
          stopOnHover={true}
          rounded="circle"
          className="max-w-6xl mx-auto"
          centerIfFew={true}
        />
      </div>

      {/* Example 15: Premium Display */}
      <div>
        <h2 className="text-2xl font-bold mb-4">15. Premium Display</h2>
        <p className="text-gray-600 mb-4">
          Premium layout.
        </p>
        <ContinuousCarousel
          slides={allFabrics}
          slidesToShow={4}
          autoPlaySpeed={2.8}
          stopOnHover={true}
          rounded="square"
          className="max-w-5xl mx-auto"
        />
      </div>
    </div>
  );
};

export default ContinuousCarouselExamples;
