"use client";
import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { Button } from "@/components/ui/button";
import { IoChevronDownOutline } from "react-icons/io5";


export default function ScrollToExplore({
  className = "",
  label = "Scroll to explore",
}) {
  const arrowRef = useRef(null);

  useEffect(() => {
    if (arrowRef.current) {
      gsap.to(arrowRef.current, {
        y: -6,
        duration: 0.8,
        yoyo: true,
        repeat: -1,
        ease: "power1.inOut",
      });
    }
  }, []);

  const handleScroll = () => {
    window.scrollBy({ top: window.innerHeight * 0.95, behavior: "smooth" });
  };

  return (
    <div
      className={`absolute bottom-5 z-50 ${className}`}
      aria-hidden={false}
    >
      <p
        onClick={handleScroll}
        className="flex flex-col justify-center bg-transparent items-center gap-2 rounded-full text-white/70 px-6 py-3 cursor-pointer "
      >
        <span className="font-medium tracking-wide">{label}</span>
        <span ref={arrowRef}>
          <IoChevronDownOutline className="w-4 h-4" />
        </span>
      </p>
    </div>
  );
}
