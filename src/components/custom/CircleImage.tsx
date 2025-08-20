"use client";
import { useRef } from "react";
import gsap from "gsap";

export default function RippleCircle() {
  const circleRef = useRef<HTMLDivElement>(null);

  const handleHover = () => {
    if (!circleRef.current) return;

    // Create a span dynamically for the ripple
    const ripple = document.createElement("span");
    ripple.className =
      "absolute top-1/2 left-1/2 w-0 h-0 rounded-full bg-white/50 pointer-events-none";
    circleRef.current.appendChild(ripple);

    // Animate with GSAP
    gsap.fromTo(
      ripple,
      {
        xPercent: -50,
        yPercent: -50,
        width: 0,
        height: 0,
        opacity: 0.6,
      },
      {
        width: circleRef.current.offsetWidth * 2,
        height: circleRef.current.offsetHeight * 2,
        opacity: 0,
        duration: 1,
        ease: "power2.out",
        onComplete: () => ripple.remove(), // remove after animation
      }
    );
  };

  return (
    <div
      ref={circleRef}
      onMouseEnter={handleHover}
      className="relative w-48 h-48 bg-black rounded-full overflow-hidden"
    >
      {/* <img
        src="/images/hero/heroSlideOneImage.webp"
        alt="circle"
        className="w-full h-full object-cover rounded-full"
      /> */}
    </div>
  );
}
