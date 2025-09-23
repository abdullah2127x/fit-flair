"use client";
import React from "react";
import EmblaCarousel from "../custom/EmblaCarousel";
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

const EmblaCarouselExamples: React.FC = () => {
  return (
    <div className="space-y-16 p-6">
      {/* Example 1: Manual Navigation with Middle Arrows */}
      <div>
        <h2 className="text-2xl font-bold mb-4">
          1. Manual Navigation with Middle Arrows
        </h2>
        <p className="text-gray-600 mb-4">
          Interactive carousel with navigation arrows positioned in the middle.
        </p>
        <EmblaCarousel
          variant="collection"
          slides={allFabrics}
          slidesToShow={4}
          autoPlay={false}
          showNavigation={true}
          navigationPosition="middle"
          showPagination={false}
          rounded="circle"
          className="max-w-5xl mx-auto"
        />
      </div>

      {/* Example 2: Auto-play with Pagination Dots */}
      <div>
        <h2 className="text-2xl font-bold mb-4">
          2. Auto-play with Pagination Dots
        </h2>
        <p className="text-gray-600 mb-4">
          Auto-playing carousel with pagination dots below, stops on
          interaction.
        </p>
        <EmblaCarousel
          variant="collection"
          slides={allFabrics}
          slidesToShow={5}
          autoPlay={true}
          autoPlaySpeed={3}
          showPagination={true}
          paginationPosition="below"
          showNavigation={false}
          stopOnHover={true}
          rounded="square"
          className="max-w-6xl mx-auto"
        />
      </div>

      {/* Example 3: Navigation Below with Free Scroll */}
      <div>
        <h2 className="text-2xl font-bold mb-4">
          3. Navigation Below with Free Scroll
        </h2>
        <p className="text-gray-600 mb-4">
          Navigation arrows below with free scrolling enabled.
        </p>
        <EmblaCarousel
          variant="collection"
          slides={allFabrics}
          slidesToShow={6}
          autoPlay={false}
          showNavigation={true}
          navigationPosition="below"
          showPagination={false}
          freeScroll={true}
          rounded="circle"
          className="max-w-7xl mx-auto"
        />
      </div>

      {/* Example 4: Centered Pagination with Auto-play */}
      <div>
        <h2 className="text-2xl font-bold mb-4">
          4. Centered Pagination with Auto-play
        </h2>
        <p className="text-gray-600 mb-4">
          Auto-playing carousel with centered pagination dots.
        </p>
        <EmblaCarousel
          variant="collection"
          slides={allFabrics}
          slidesToShow={3}
          autoPlay={true}
          autoPlaySpeed={4}
          showPagination={true}
          paginationPosition="center"
          showNavigation={false}
          stopOnHover={true}
          rounded="square"
          className="max-w-4xl mx-auto"
        />
      </div>

      {/* Example 5: Full Interactive Controls */}
      <div>
        <h2 className="text-2xl font-bold mb-4">
          5. Full Interactive Controls
        </h2>
        <p className="text-gray-600 mb-4">
          Complete interactive carousel with both navigation and pagination.
        </p>
        <EmblaCarousel
          variant="collection"
          slides={allFabrics}
          slidesToShow={4}
          autoPlay={false}
          showNavigation={true}
          navigationPosition="middle"
          showPagination={true}
          paginationPosition="below"
          freeScroll={false}
          rounded="circle"
          className="max-w-5xl mx-auto"
        />
      </div>

      {/* Example 6: Fast Auto-play with Hover Pause */}
      <div>
        <h2 className="text-2xl font-bold mb-4">
          6. Fast Auto-play with Hover Pause
        </h2>
        <p className="text-gray-600 mb-4">
          Fast auto-playing carousel that pauses on hover.
        </p>
        <EmblaCarousel
          variant="collection"
          slides={allFabrics}
          slidesToShow={7}
          autoPlay={true}
          autoPlaySpeed={2}
          showPagination={true}
          paginationPosition="below"
          showNavigation={false}
          stopOnHover={true}
          rounded="square"
          className="max-w-7xl mx-auto"
        />
      </div>

      {/* Example 7: Large Items with Middle Navigation */}
      <div>
        <h2 className="text-2xl font-bold mb-4">
          7. Large Items with Middle Navigation
        </h2>
        <p className="text-gray-600 mb-4">
          Large display items with middle-positioned navigation arrows.
        </p>
        <EmblaCarousel
          variant="collection"
          slides={allFabrics}
          slidesToShow={2}
          autoPlay={false}
          showNavigation={true}
          navigationPosition="middle"
          showPagination={false}
          rounded="circle"
          className="max-w-3xl mx-auto"
        />
      </div>

      {/* Example 8: Compact Grid with Pagination */}
      <div>
        <h2 className="text-2xl font-bold mb-4">
          8. Compact Grid with Pagination
        </h2>
        <p className="text-gray-600 mb-4">
          Compact grid layout with pagination dots only.
        </p>
        <EmblaCarousel
          variant="collection"
          slides={allFabrics}
          slidesToShow={8}
          autoPlay={false}
          showNavigation={false}
          showPagination={true}
          paginationPosition="below"
          rounded="square"
          className="max-w-8xl mx-auto"
        />
      </div>

      {/* Example 9: Slow Auto-play with Navigation Below */}
      <div>
        <h2 className="text-2xl font-bold mb-4">
          9. Slow Auto-play with Navigation Below
        </h2>
        <p className="text-gray-600 mb-4">
          Slow auto-playing carousel with navigation arrows below.
        </p>
        <EmblaCarousel
          variant="collection"
          slides={allFabrics}
          slidesToShow={5}
          autoPlay={true}
          autoPlaySpeed={5}
          showNavigation={true}
          navigationPosition="below"
          showPagination={false}
          stopOnHover={true}
          rounded="circle"
          className="max-w-6xl mx-auto"
        />
      </div>

      {/* Example 10: Minimalist with Center Pagination */}
      <div>
        <h2 className="text-2xl font-bold mb-4">
          10. Minimalist with Center Pagination
        </h2>
        <p className="text-gray-600 mb-4">
          Clean, minimalist design with centered pagination dots.
        </p>
        <EmblaCarousel
          variant="collection"
          slides={allFabrics}
          slidesToShow={4}
          autoPlay={false}
          showNavigation={false}
          showPagination={true}
          paginationPosition="center"
          rounded="square"
          className="max-w-5xl mx-auto"
        />
      </div>

      {/* Example 11: Free Scroll with Middle Navigation */}
      <div>
        <h2 className="text-2xl font-bold mb-4">
          11. Free Scroll with Middle Navigation
        </h2>
        <p className="text-gray-600 mb-4">
          Free scrolling enabled with middle-positioned navigation arrows.
        </p>
        <EmblaCarousel
          variant="collection"
          slides={allFabrics}
          slidesToShow={6}
          autoPlay={false}
          showNavigation={true}
          navigationPosition="middle"
          showPagination={false}
          freeScroll={true}
          rounded="circle"
          className="max-w-7xl mx-auto"
        />
      </div>

      {/* Example 12: Auto-play with Both Controls */}
      <div>
        <h2 className="text-2xl font-bold mb-4">
          12. Auto-play with Both Controls
        </h2>
        <p className="text-gray-600 mb-4">
          Auto-playing carousel with both navigation and pagination controls.
        </p>
        <EmblaCarousel
          variant="collection"
          slides={allFabrics}
          slidesToShow={3}
          autoPlay={true}
          autoPlaySpeed={3.5}
          showNavigation={true}
          navigationPosition="below"
          showPagination={true}
          paginationPosition="center"
          stopOnHover={true}
          rounded="square"
          className="max-w-4xl mx-auto"
        />
      </div>

      {/* Example 13: Wide Layout with Navigation */}
      <div>
        <h2 className="text-2xl font-bold mb-4">
          13. Wide Layout with Navigation
        </h2>
        <p className="text-gray-600 mb-4">
          Wide layout showing many items with navigation arrows.
        </p>
        <EmblaCarousel
          variant="collection"
          slides={allFabrics}
          slidesToShow={9}
          autoPlay={false}
          showNavigation={true}
          navigationPosition="middle"
          showPagination={false}
          rounded="circle"
          className="max-w-8xl mx-auto"
        />
      </div>

      {/* Example 14: Premium Auto-play Experience */}
      <div>
        <h2 className="text-2xl font-bold mb-4">
          14. Premium Auto-play Experience
        </h2>
        <p className="text-gray-600 mb-4">Premium auto-playing experience.</p>
        <EmblaCarousel
          variant="collection"
          slides={allFabrics}
          slidesToShow={4}
          autoPlay={true}
          autoPlaySpeed={4.5}
          showPagination={true}
          paginationPosition="below"
          showNavigation={false}
          stopOnHover={true}
          rounded="circle"
          className="max-w-5xl mx-auto"
        />
      </div>

      {/* Example 15: Interactive Showcase */}
      <div>
        <h2 className="text-2xl font-bold mb-4">15. Interactive Showcase</h2>
        <p className="text-gray-600 mb-4">
          Complete interactive showcase with all features enabled.
        </p>
        <EmblaCarousel
          variant="collection"
          slides={allFabrics}
          slidesToShow={5}
          autoPlay={true}
          autoPlaySpeed={3}
          showNavigation={true}
          navigationPosition="middle"
          showPagination={true}
          paginationPosition="center"
          stopOnHover={true}
          freeScroll={false}
          rounded="square"
          className="max-w-6xl mx-auto"
        />
      </div>
    </div>
  );
};

export default EmblaCarouselExamples;
