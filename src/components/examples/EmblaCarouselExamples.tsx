"use client";
import React from "react";
import EmblaCarousel from "../custom/EmblaCarousel";

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

const EmblaCarouselExamples: React.FC = () => {
  return (
    <div className="space-y-16 p-6">
      {/* Example 1: Manual Navigation with Middle Arrows */}
      <div>
        <h2 className="text-2xl font-bold mb-4">1. Manual Navigation with Middle Arrows</h2>
        <p className="text-gray-600 mb-4">
          Interactive carousel with navigation arrows positioned in the middle.
        </p>
        <EmblaCarousel
          slides={allFabrics}
          slidesToShow={4}
          autoPlay={false}
          showNavigation={true}
          navigationPosition="middle"
          showPagination={false}
          rounded="circle"
          ripple={true}
          rippleColor="blue"
          rippleOpacity={0.3}
          className="max-w-5xl mx-auto"
        />
      </div>

      {/* Example 2: Auto-play with Pagination Dots */}
      <div>
        <h2 className="text-2xl font-bold mb-4">2. Auto-play with Pagination Dots</h2>
        <p className="text-gray-600 mb-4">
          Auto-playing carousel with pagination dots below, stops on interaction.
        </p>
        <EmblaCarousel
          slides={allFabrics}
          slidesToShow={5}
          autoPlay={true}
          autoPlaySpeed={3}
          showPagination={true}
          paginationPosition="below"
          showNavigation={false}
          stopOnHover={true}
          rounded="square"
          ripple={false}
          className="max-w-6xl mx-auto"
        />
      </div>

      {/* Example 3: Navigation Below with Free Scroll */}
      <div>
        <h2 className="text-2xl font-bold mb-4">3. Navigation Below with Free Scroll</h2>
        <p className="text-gray-600 mb-4">
          Navigation arrows below with free scrolling enabled.
        </p>
        <EmblaCarousel
          slides={allFabrics}
          slidesToShow={6}
          autoPlay={false}
          showNavigation={true}
          navigationPosition="below"
          showPagination={false}
          freeScroll={true}
          rounded="circle"
          ripple={true}
          rippleColor="purple"
          rippleOpacity={0.4}
          className="max-w-7xl mx-auto"
        />
      </div>

      {/* Example 4: Centered Pagination with Auto-play */}
      <div>
        <h2 className="text-2xl font-bold mb-4">4. Centered Pagination with Auto-play</h2>
        <p className="text-gray-600 mb-4">
          Auto-playing carousel with centered pagination dots.
        </p>
        <EmblaCarousel
          slides={allFabrics}
          slidesToShow={3}
          autoPlay={true}
          autoPlaySpeed={4}
          showPagination={true}
          paginationPosition="center"
          showNavigation={false}
          stopOnHover={true}
          rounded="square"
          ripple={true}
          rippleColor="green"
          rippleOpacity={0.25}
          className="max-w-4xl mx-auto"
        />
      </div>

      {/* Example 5: Full Interactive Controls */}
      <div>
        <h2 className="text-2xl font-bold mb-4">5. Full Interactive Controls</h2>
        <p className="text-gray-600 mb-4">
          Complete interactive carousel with both navigation and pagination.
        </p>
        <EmblaCarousel
          slides={allFabrics}
          slidesToShow={4}
          autoPlay={false}
          showNavigation={true}
          navigationPosition="middle"
          showPagination={true}
          paginationPosition="below"
          freeScroll={false}
          rounded="circle"
          ripple={true}
          rippleColor="red"
          rippleOpacity={0.3}
          className="max-w-5xl mx-auto"
        />
      </div>

      {/* Example 6: Fast Auto-play with Hover Pause */}
      <div>
        <h2 className="text-2xl font-bold mb-4">6. Fast Auto-play with Hover Pause</h2>
        <p className="text-gray-600 mb-4">
          Fast auto-playing carousel that pauses on hover.
        </p>
        <EmblaCarousel
          slides={allFabrics}
          slidesToShow={7}
          autoPlay={true}
          autoPlaySpeed={2}
          showPagination={true}
          paginationPosition="below"
          showNavigation={false}
          stopOnHover={true}
          rounded="square"
          ripple={false}
          className="max-w-7xl mx-auto"
        />
      </div>

      {/* Example 7: Large Items with Middle Navigation */}
      <div>
        <h2 className="text-2xl font-bold mb-4">7. Large Items with Middle Navigation</h2>
        <p className="text-gray-600 mb-4">
          Large display items with middle-positioned navigation arrows.
        </p>
        <EmblaCarousel
          slides={allFabrics}
          slidesToShow={2}
          autoPlay={false}
          showNavigation={true}
          navigationPosition="middle"
          showPagination={false}
          rounded="circle"
          ripple={true}
          rippleColor="orange"
          rippleOpacity={0.35}
          className="max-w-3xl mx-auto"
        />
      </div>

      {/* Example 8: Compact Grid with Pagination */}
      <div>
        <h2 className="text-2xl font-bold mb-4">8. Compact Grid with Pagination</h2>
        <p className="text-gray-600 mb-4">
          Compact grid layout with pagination dots only.
        </p>
        <EmblaCarousel
          slides={allFabrics}
          slidesToShow={8}
          autoPlay={false}
          showNavigation={false}
          showPagination={true}
          paginationPosition="below"
          rounded="square"
          ripple={true}
          rippleColor="pink"
          rippleOpacity={0.3}
          className="max-w-8xl mx-auto"
        />
      </div>

      {/* Example 9: Slow Auto-play with Navigation Below */}
      <div>
        <h2 className="text-2xl font-bold mb-4">9. Slow Auto-play with Navigation Below</h2>
        <p className="text-gray-600 mb-4">
          Slow auto-playing carousel with navigation arrows below.
        </p>
        <EmblaCarousel
          slides={allFabrics}
          slidesToShow={5}
          autoPlay={true}
          autoPlaySpeed={5}
          showNavigation={true}
          navigationPosition="below"
          showPagination={false}
          stopOnHover={true}
          rounded="circle"
          ripple={true}
          rippleColor="teal"
          rippleOpacity={0.25}
          className="max-w-6xl mx-auto"
        />
      </div>

      {/* Example 10: Minimalist with Center Pagination */}
      <div>
        <h2 className="text-2xl font-bold mb-4">10. Minimalist with Center Pagination</h2>
        <p className="text-gray-600 mb-4">
          Clean, minimalist design with centered pagination dots.
        </p>
        <EmblaCarousel
          slides={allFabrics}
          slidesToShow={4}
          autoPlay={false}
          showNavigation={false}
          showPagination={true}
          paginationPosition="center"
          rounded="square"
          ripple={false}
          className="max-w-5xl mx-auto"
        />
      </div>

      {/* Example 11: Free Scroll with Middle Navigation */}
      <div>
        <h2 className="text-2xl font-bold mb-4">11. Free Scroll with Middle Navigation</h2>
        <p className="text-gray-600 mb-4">
          Free scrolling enabled with middle-positioned navigation arrows.
        </p>
        <EmblaCarousel
          slides={allFabrics}
          slidesToShow={6}
          autoPlay={false}
          showNavigation={true}
          navigationPosition="middle"
          showPagination={false}
          freeScroll={true}
          rounded="circle"
          ripple={true}
          rippleColor="indigo"
          rippleOpacity={0.4}
          className="max-w-7xl mx-auto"
        />
      </div>

      {/* Example 12: Auto-play with Both Controls */}
      <div>
        <h2 className="text-2xl font-bold mb-4">12. Auto-play with Both Controls</h2>
        <p className="text-gray-600 mb-4">
          Auto-playing carousel with both navigation and pagination controls.
        </p>
        <EmblaCarousel
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
          ripple={true}
          rippleColor="yellow"
          rippleOpacity={0.3}
          className="max-w-4xl mx-auto"
        />
      </div>

      {/* Example 13: Wide Layout with Navigation */}
      <div>
        <h2 className="text-2xl font-bold mb-4">13. Wide Layout with Navigation</h2>
        <p className="text-gray-600 mb-4">
          Wide layout showing many items with navigation arrows.
        </p>
        <EmblaCarousel
          slides={allFabrics}
          slidesToShow={9}
          autoPlay={false}
          showNavigation={true}
          navigationPosition="middle"
          showPagination={false}
          rounded="circle"
          ripple={true}
          rippleColor="cyan"
          rippleOpacity={0.2}
          className="max-w-8xl mx-auto"
        />
      </div>

      {/* Example 14: Premium Auto-play Experience */}
      <div>
        <h2 className="text-2xl font-bold mb-4">14. Premium Auto-play Experience</h2>
        <p className="text-gray-600 mb-4">
          Premium auto-playing experience with gold ripple effects.
        </p>
        <EmblaCarousel
          slides={allFabrics}
          slidesToShow={4}
          autoPlay={true}
          autoPlaySpeed={4.5}
          showPagination={true}
          paginationPosition="below"
          showNavigation={false}
          stopOnHover={true}
          rounded="circle"
          ripple={true}
          rippleColor="gold"
          rippleOpacity={0.4}
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
          ripple={true}
          rippleColor="lime"
          rippleOpacity={0.3}
          className="max-w-6xl mx-auto"
        />
      </div>
    </div>
  );
};

export default EmblaCarouselExamples;
