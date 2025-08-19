"use client";
import { useEffect, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Link from "next/link";
import { NavLink, navLinks } from "@/data/navLinks";
import { SplitText } from "gsap/all";

const Header = () => {
  const frontRefs = useRef<HTMLSpanElement[][]>([]);
  const backRefs = useRef<HTMLSpanElement[][]>([]);
  const dotRef = useRef<HTMLDivElement[]>([]);
  const [activeLinkIndex, setActiveLinkIndex] = useState<number>(-1);
  const headerContainerRef = useRef<HTMLElement>(null);
  const underlineRef = useRef<HTMLDivElement[]>([]);

  const [show, setShow] = useState<boolean>(true);
  const [lastScrollY, setLastScrollY] = useState<number>(0);
  gsap.registerPlugin(SplitText);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    const controlHeader = () => {
      if (window.scrollY > lastScrollY) {
        // scrolling down
        clearTimeout(timer);
        timer = setTimeout(() => setShow(false), 400); // hide after 2 sec
      } else {
        // scrolling up
        setShow(true);
      }
      setLastScrollY(window.scrollY);
    };

    window.addEventListener("scroll", controlHeader);
    return () => window.removeEventListener("scroll", controlHeader);
  }, [lastScrollY]);

  // GSAP animation
  useGSAP(() => {
    if (show) {
      gsap.to(".header-container", {
        y: 0,
        opacity: 1,
        duration: 0.4,
        ease: "power2.out",
      });
    } else {
      gsap.to(".header-container", {
        y: -100,
        opacity: 0,
        duration: 0.4,
        ease: "power2.in",
      });
    }
  }, [show]);

  const animateIn = (wordIdx: number) => {
    if (activeLinkIndex >= 0) return;
    setActiveLinkIndex(wordIdx);

    const frontChars = frontRefs.current[wordIdx];
    const backChars = backRefs.current[wordIdx];

    if (!frontChars || !backChars) return;

    // Cancel any ongoing animations on these elements
    gsap.killTweensOf([frontChars, backChars, dotRef.current[wordIdx]]);

    if (dotRef.current[wordIdx]) {
      gsap.fromTo(
        dotRef.current[wordIdx],
        { scale: 0 },
        { scale: 1, duration: 0.2, ease: "power2.in" }
      );
    }
    if (underlineRef.current[wordIdx]) {
      gsap.fromTo(
        underlineRef.current[wordIdx],
        { scaleX: 0, transformOrigin: "left" },
        { scaleX: 1, duration: 0.3, ease: "power2.out" }
      );
    }

    gsap.to(frontChars, {
      yPercent: -100,
      opacity: 0,
      duration: 0.4,
      ease: "expo.out",
      stagger: 0.02,
    });

    gsap.to(backChars, {
      yPercent: 0,
      opacity: 1,
      duration: 0.4,
      ease: "expo.out",
      stagger: 0.02,
    });
  };

  const animateOut = (wordIdx: number) => {
    setActiveLinkIndex(-1);

    const frontChars = frontRefs.current[wordIdx];
    const backChars = backRefs.current[wordIdx];

    if (!frontChars || !backChars) return;

    // Stop any in-progress animations
    gsap.killTweensOf([frontChars, backChars, dotRef.current[wordIdx]]);

    if (dotRef.current[wordIdx]) {
      gsap.to(dotRef.current[wordIdx], {
        scale: 0,
        duration: 0.2,
        ease: "power2.in",
      });
    }

    if (underlineRef.current[wordIdx]) {
      gsap.to(underlineRef.current[wordIdx], {
        scaleX: 0,
        transformOrigin: "left",
        duration: 0.3,
        ease: "power2.out",
      });
    }

    gsap.to(frontChars, {
      yPercent: 0,
      opacity: 1,
      duration: 0.4,
      ease: "expo.out",
      stagger: 0.02,
    });

    gsap.to(backChars, {
      yPercent: 100,
      opacity: 0,
      duration: 0.4,
      ease: "expo.out",
      stagger: 0.02,
    });
  };

  return (
    <header
      ref={headerContainerRef}
      className="header-container fixed top-14 left-0 w-full bg-secondary text-secondary-foreground shadow-md z-40"
    >
      <nav className="flex justify-center items-center py-3 gap-8 text-lg">
        {navLinks.map((link: NavLink, idx: number) => (
          <div
            key={idx}
            className="overflow-hidden cursor-pointer hover:text-primary flex flex-col items-center relative pl-5"
            onMouseEnter={() => animateIn(idx)}
            onMouseLeave={() => animateOut(idx)}
          >
            {/* Front layer */}
            <div className="w-full h-full flex items-center justify-center">
              {link.label.split("").map((char, charIdx) => (
                <span
                  className="inline-block"
                  key={charIdx}
                  ref={(el) => {
                    if (el) {
                      if (!frontRefs.current[idx]) frontRefs.current[idx] = [];
                      frontRefs.current[idx][charIdx] = el;
                    }
                  }}
                >
                  {char}
                </span>
              ))}
            </div>

            {/* Back layer */}
            <div className="w-full absolute h-full flex items-center justify-center">
              {link.label.split("").map((char, charIdx) => (
                <span
                  className="inline-block"
                  key={charIdx}
                  ref={(el) => {
                    if (el) {
                      if (!backRefs.current[idx]) backRefs.current[idx] = [];
                      backRefs.current[idx][charIdx] = el;
                    }
                  }}
                >
                  {char}
                </span>
              ))}
            </div>
            {/* active underline */}
            <div
              ref={(el) => {
                if (el) underlineRef.current[idx] = el;
              }}
              className={`bg-primary underline rounded-full absolute left-5 bottom-0 h-[2px] w-full
                 ${activeLinkIndex === idx ? "block" : "hidden"}
                `}
            ></div>
          </div>
          // <Link
          //   onMouseEnter={hoverLink}
          //   key={link.id}
          //   href={link.href}
          //   className="hidden sm:block"
          // >
          //   {link.label}
          // </Link>
        ))}
      </nav>
    </header>
  );
};

export default Header;
