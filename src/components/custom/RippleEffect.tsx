"use client";
import React, { useRef } from "react";
import gsap from "gsap";

interface RippleEffectProps {
  className?: string;
  rippleColor?: string;
  rippleOpacity?: number;
}

export default function RippleEffect({
  className = "",
  rippleColor = "white",
  rippleOpacity = 0.3,
}: RippleEffectProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const handleHover = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const localX = e.clientX - rect.left;
    const localY = e.clientY - rect.top;

    const ripple = document.createElement("span");
    ripple.className = "absolute rounded-full pointer-events-none";
    ripple.style.backgroundColor = rippleColor;
    ripple.style.opacity = rippleOpacity.toString();
    ripple.style.left = `${localX}px`;
    ripple.style.top = `${localY}px`;
    ripple.style.width = "0px";
    ripple.style.height = "0px";
    ripple.style.transform = "translate(-50%, -50%)";

    containerRef.current.appendChild(ripple);

    const maxSide = Math.max(rect.width, rect.height);
    const targetSize = maxSide * 2;

    gsap.fromTo(
      ripple,
      { width: 0, height: 0, opacity: rippleOpacity },
      {
        width: targetSize,
        height: targetSize,
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
      className={`relative w-full h-full overflow-hidden rounded-lg ${className}`}
    />
  );
}
