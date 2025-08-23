"use client";
import { useRef } from "react";
import gsap from "gsap";

interface RippleEffectProps {
  className?: string;
  rippleColor?: string;   // tailwind color class or custom
  rippleOpacity?: number; // 0 to 1
}

export default function RippleEffect({
  className = "",
  rippleColor = "white",   // default white
  rippleOpacity = 0.3,     // default semi-transparent
}: RippleEffectProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const handleHover = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (!containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const ripple = document.createElement("span");

    ripple.className = "absolute w-0 h-0 rounded-full pointer-events-none";
    ripple.style.backgroundColor = rippleColor;
    ripple.style.opacity = rippleOpacity.toString();
    ripple.style.left = `${e.clientX - rect.left}px`;
    ripple.style.top = `${e.clientY - rect.top}px`;

    containerRef.current.appendChild(ripple);

    gsap.fromTo(
      ripple,
      {
        xPercent: -50,
        yPercent: -50,
        width: 0,
        height: 0,
      },
      {
        width: rect.width * 2,
        height: rect.width * 2,
        opacity: 0,
        duration: 0.4,
        ease: "power2.out",
        onComplete: () => ripple.remove(),
      }
    );
  };

  return (
    <div
      ref={containerRef}
      onMouseEnter={handleHover}
      className={`relative w-full h-full overflow-hidden rounded-2xl ${className}`}
    />
  );
}
