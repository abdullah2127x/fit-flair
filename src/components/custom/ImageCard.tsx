// "use client";
// import Image from "next/image";
// import React from "react";
// import RippleEffect from "./RippleEffect";

// type ImageCardProps = {
//   src: string;
//   title?: string;
//   subtitle?: string;
//   rounded?: "circle" | "square";
//   ripple?: boolean; // 👈 enable/disable ripple
//   rippleColor?: string;
//   rippleOpacity?: number;
// };

// const ImageCard: React.FC<ImageCardProps> = ({
//   src,
//   title,
//   subtitle,
//   rounded = "circle",
//   ripple = false,
//   rippleColor = "white",
//   rippleOpacity = 0.3,
// }) => {
//   return (
//     <div>
//       <div
//         className={`relative w-full aspect-square bg-gray-200 ${
//           rounded === "circle" ? "rounded-full" : "rounded-lg"
//         } overflow-hidden flex items-center justify-center`}
//       >
//         {/* Main Image */}
//         <Image
//           src={src}
//           alt={title || "slide"}
//           fill
//           className="object-contain"
//         />

//         {/* Optional Ripple Overlay */}
//         {ripple && (
//           <RippleEffect
//             rippleColor={rippleColor}
//             rippleOpacity={rippleOpacity}
//             className="absolute inset-0"
//           />
//         )}
//       </div>

//       {title && (
//         <h3 className="text-center font-semibold mt-2">{title}</h3>
//       )}
//       {subtitle && (
//         <h3 className="text-center font-medium">{subtitle}</h3>
//       )}
//     </div>
//   );
// };

// export default ImageCard;

"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import RippleEffect from "./RippleEffect";

type ImageCardProps = {
  src: string;
  title?: string;
  subTitle?: string;
  rounded?: "circle" | "square";
  ripple?: boolean;
  rippleColor?: string;
  rippleOpacity?: number;
  href?: string; // optional link URL
  linkEnabled?: boolean; // whether to wrap in Link
};

const ImageCard: React.FC<ImageCardProps> = ({
  src,
  title,
  subTitle,
  rounded = "circle",
  ripple = false,
  rippleColor = "white",
  rippleOpacity = 0.3,
  href,
  linkEnabled = false,
}) => {
  const cardContent = (
    <div>
      <div
        className={`relative w-full aspect-square bg-gray-300 ${
          rounded === "circle" ? "rounded-full" : "rounded-lg"
        } overflow-hidden flex items-center text-center justify-center`}
      >
        <Image
          src={src}
          alt={title || "slide"}
          fill
          className="object-cover object-top"
        />

        {ripple && (
          <RippleEffect
            rippleColor={rippleColor}
            rippleOpacity={rippleOpacity}
            className="absolute inset-0"
          />
        )}
      </div>

      {title && <h3 className="text-center font-semibold mt-2">{title}</h3>}
      {subTitle && <h3 className="text-center font-medium">{subTitle}</h3>}
    </div>
  );

  // Conditionally wrap with Link
  if (linkEnabled && href) {
    return (
      <Link className="cursor-pointer" href={href}>
        {cardContent}
      </Link>
    );
  }

  return cardContent;
};

export default ImageCard;
