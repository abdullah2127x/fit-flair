//   *[
//     _type == "product" &&
//     defined(title) &&
//     defined(slug.current) &&
//     defined(featuredImage) &&
//     defined(brand) &&
//     defined(description) &&
//     defined(price)
//   ]
//   {
//   title,
//   "slug": slug.current,
//   price,
//   "category": category,
//   "subCategory": subCategory,
//   "fabric": fabric->name,
//   "audience": audience,
//   "featuredImage": featuredImage.asset->url,
//   "additionalImages":additionalImages[].asset->url,
//   "description": pt::text(description),
//   "uploadedAt":_createdAt,
//   "brand": brand->name,
//   "color": color->name,
//   isFeatured,
//   "tags": select(
//     category == "unstitched" => unstitchedTags,
//     category == "readyToWear" && subCategory == "top" => topTags,
//     category == "readyToWear" && subCategory == "bottom" => bottomTags,
//     category == "readyToWear" && subCategory == "full" => fullTags,
//     [] // fallback empty array
//   ),
//     sizes,

// }

// =============================

// {

// variants[] {
//   // _key,
//   stock,
//   "featuredImage": featuredImage.asset->url,
//   "additionalImages": additionalImages[].asset->url,
//   "colorName": color->name,
//   "colorCode": color->code,
      
//   }
// }
// =======================================
// latest
// *[
//     _type == "product" &&
//     defined(title) &&
//     defined(slug.current) &&
//     defined(description) &&
//     defined(price) &&
//     defined(variants)
  
//   ]
//   {
//   "id":_id,
//   title,
//   "slug": slug.current,
//   price,
//   "category": category,
//   "subCategory": subCategory,
//   "fabric": fabric->name,
//   "audience": audience,
//   variants[] {
//     stock,
//     "featuredImage": featuredImage.asset->url,
//     "additionalImages": additionalImages[].asset->url,
//     "colorName": color->name,
//     "colorCode": color->code,   
//   },
//   "description": pt::text(description),
//   "uploadedAt":_createdAt,
//   isFeatured,
//   relevantTags,
//   "outFitType": select(
//     audience == "men" => menOutfitType,
//     audience == "women" => menOutfitType,
//     [] // fallback empty array
//   ),
//    discount

// }

"use client";
import SecondaryHeading from "./SecondaryHeading";
import EmblaCarousel from "./EmblaCarousel";

const slides = [
  "/carouselImages/image1.jpg",
  "/carouselImages/image2.jpg",
  "/carouselImages/image3.jpg",
  "/carouselImages/image4.jpg",
  "/carouselImages/image5.jpg",
  "/carouselImages/image1.jpg",
  "/carouselImages/image2.jpg",
  "/carouselImages/image3.jpg",
  "/carouselImages/image4.jpg",
  "/carouselImages/image5.jpg",
];
const fabrics = [
  "Chiffon",
  "Cotton",
  "Polyester",
  "Crepe",
  "Rayon",
  "Leather",
  "Velvet",
  "Satin",
  "Denim",
  "Organza",
  "Nylon",
  "Silk",
  "Linen",
  "Wool",
  "Georgette",
  "Tulle",
  "Jersey",
  "Fleece",
  "Chambray",
] as const;

type Category = "Ready to Wear" | "Un Stitched";
type Fabric = (typeof fabrics)[number];

type Slide = {
  id: string | number;
  src: string;
  title: Fabric;
  href?: string;
};

// generate product array
const products: Slide[] = fabrics.map((fabric, index) => ({
  src: `/images/fabrics/${fabric}.webp`,
  title: fabric,
  href: `/collections/${fabric.toLowerCase()}`,
  id: index + 1,
}));

const Fabrics = () => {
  return (
    <div className="flex flex-col gap-y-4 w-full justify-center items-center">
      <SecondaryHeading className="text-3xl md:text-5xl">
        FABRICS
      </SecondaryHeading>

      <EmblaCarousel
        slides={products}
        slidesToShow={3}
        stepAutoPlay
        showNavigation
        autoPlaySpeed={2}
        stopOnHover
        rounded="square"
        emblaOptions={{ loop: true, align: "start" }}
        centerIfFew
        showPagination
        mouseWheelDirection="horizontal"
        freeScroll={false}
      />
    </div>
  );
};

export default Fabrics;
