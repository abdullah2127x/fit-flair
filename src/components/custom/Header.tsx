// "use client";
// import { useEffect, useRef, useState } from "react";
// import { useGSAP } from "@gsap/react";
// import gsap from "gsap";
// import Link from "next/link";
// import { NavLink, navLinks } from "@/data/navLinks";
// import { SplitText } from "gsap/all";

// const Header = () => {
//   const frontRefs = useRef<HTMLSpanElement[][]>([]);
//   const backRefs = useRef<HTMLSpanElement[][]>([]);
//   const dotRef = useRef<HTMLDivElement[]>([]);
//   const [activeLinkIndex, setActiveLinkIndex] = useState<number>(-1);
//   const headerContainerRef = useRef<HTMLElement>(null);
//   const underlineRef = useRef<HTMLDivElement[]>([]);

//   const [show, setShow] = useState<boolean>(true);
//   const [lastScrollY, setLastScrollY] = useState<number>(0);
//   gsap.registerPlugin(SplitText);

//   useEffect(() => {
//     let timer: ReturnType<typeof setTimeout>;
//     const controlHeader = () => {
//       if (window.scrollY > lastScrollY) {
//         // scrolling down
//         clearTimeout(timer);
//         timer = setTimeout(() => setShow(false), 400); // hide after 2 sec
//       } else {
//         // scrolling up
//         setShow(true);
//       }
//       setLastScrollY(window.scrollY);
//     };

//     window.addEventListener("scroll", controlHeader);
//     return () => window.removeEventListener("scroll", controlHeader);
//   }, [lastScrollY]);

//   // GSAP animation
//   useGSAP(() => {
//     if (show) {
//       gsap.to(".header-container", {
//         y: 0,
//         opacity: 1,
//         duration: 0.4,
//         ease: "power2.out",
//       });
//     } else {
//       gsap.to(".header-container", {
//         y: -100,
//         opacity: 0,
//         duration: 0.4,
//         ease: "power2.in",
//       });
//     }
//   }, [show]);

//   const animateIn = (wordIdx: number) => {
//     if (activeLinkIndex >= 0) return;
//     setActiveLinkIndex(wordIdx);

//     const frontChars = frontRefs.current[wordIdx];
//     const backChars = backRefs.current[wordIdx];

//     if (!frontChars || !backChars) return;

//     // Cancel any ongoing animations on these elements
//     gsap.killTweensOf([frontChars, backChars, dotRef.current[wordIdx]]);

//     if (dotRef.current[wordIdx]) {
//       gsap.fromTo(
//         dotRef.current[wordIdx],
//         { scale: 0 },
//         { scale: 1, duration: 0.2, ease: "power2.in" }
//       );
//     }
//     if (underlineRef.current[wordIdx]) {
//       gsap.fromTo(
//         underlineRef.current[wordIdx],
//         { scaleX: 0, transformOrigin: "left" },
//         { scaleX: 1, duration: 0.3, ease: "power2.out" }
//       );
//     }

//     gsap.to(frontChars, {
//       yPercent: -100,
//       opacity: 0,
//       duration: 0.4,
//       ease: "expo.out",
//       stagger: 0.02,
//     });

//     gsap.to(backChars, {
//       yPercent: 0,
//       opacity: 1,
//       duration: 0.4,
//       ease: "expo.out",
//       stagger: 0.02,
//     });
//   };

//   const animateOut = (wordIdx: number) => {
//     setActiveLinkIndex(-1);

//     const frontChars = frontRefs.current[wordIdx];
//     const backChars = backRefs.current[wordIdx];

//     if (!frontChars || !backChars) return;

//     // Stop any in-progress animations
//     gsap.killTweensOf([frontChars, backChars, dotRef.current[wordIdx]]);

//     if (dotRef.current[wordIdx]) {
//       gsap.to(dotRef.current[wordIdx], {
//         scale: 0,
//         duration: 0.2,
//         ease: "power2.in",
//       });
//     }

//     if (underlineRef.current[wordIdx]) {
//       gsap.to(underlineRef.current[wordIdx], {
//         scaleX: 0,
//         transformOrigin: "left",
//         duration: 0.3,
//         ease: "power2.out",
//       });
//     }

//     gsap.to(frontChars, {
//       yPercent: 0,
//       opacity: 1,
//       duration: 0.4,
//       ease: "expo.out",
//       stagger: 0.02,
//     });

//     gsap.to(backChars, {
//       yPercent: 100,
//       opacity: 0,
//       duration: 0.4,
//       ease: "expo.out",
//       stagger: 0.02,
//     });
//   };

//   return (
//     <header
//       ref={headerContainerRef}
//       className="header-container fixed top-14 left-0 w-full bg-secondary text-secondary-foreground shadow-md z-40"
//     >
//       <nav className="flex justify-center items-center py-3 gap-8 text-lg">
//         {navLinks.map((link: NavLink, idx: number) => (
//           <div
//             key={idx}
//             className="overflow-hidden cursor-pointer hover:text-secondary-foreground/90 flex flex-col items-center justify-center relative"
//             onMouseEnter={() => animateIn(idx)}
//             onMouseLeave={() => animateOut(idx)}
//           >
//             {/* Front layer */}
//             <div className="w-full h-full flex items-center justify-center">
//               {link.label.split("").map((char, charIdx) => (
//                 <span
//                   className="inline-block"
//                   key={charIdx}
//                   ref={(el) => {
//                     if (el) {
//                       if (!frontRefs.current[idx]) frontRefs.current[idx] = [];
//                       frontRefs.current[idx][charIdx] = el;
//                     }
//                   }}
//                 >
//                   {char}
//                 </span>
//               ))}
//             </div>

//             {/* Back layer */}
//             <div className="w-full absolute h-full flex items-center justify-center">
//               {link.label.split("").map((char, charIdx) => (
//                 <span
//                   className="inline-block"
//                   key={charIdx}
//                   ref={(el) => {
//                     if (el) {
//                       if (!backRefs.current[idx]) backRefs.current[idx] = [];
//                       backRefs.current[idx][charIdx] = el;
//                     }
//                   }}
//                 >
//                   {char}
//                 </span>
//               ))}
//             </div>
//             {/* active underline */}
//             <div
//               ref={(el) => {
//                 if (el) underlineRef.current[idx] = el;
//               }}
//               className={`bg-secondary-foreground/90 underline rounded-full absolute bottom-0 h-[2px] w-full
//                  ${activeLinkIndex === idx ? "block" : "hidden"}
//                 `}
//             ></div>
//           </div>
//         ))}
//       </nav>
//     </header>
//   );
// };

// export default Header;
"use client";

import { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import Link from "next/link";
import { Search, ShoppingBag, Menu, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCart } from "@/contexts/CartContext";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import ThemeToggleButton from "../ui/theme-toggle-button";

// ✅ Nav links array
const navLinks = [
  { href: "/", label: "Home" },
  { href: "/men", label: "Men" },
  { href: "/women", label: "Women" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

// ✅ Logo Component
function Logo() {
  return (
    <Link href="/" className="flex items-center space-x-2">
      <div className="h-8 w-8 bg-primary rounded-lg flex items-center justify-center">
        <span className="text-primary-foreground font-bold text-sm">C</span>
      </div>
      <span className="font-bold text-xl">Couture</span>
    </Link>
  );
}

// ✅ Animated DesktopNav
function DesktopNav() {
  const frontRefs = useRef<HTMLSpanElement[][]>([]);
  const backRefs = useRef<HTMLSpanElement[][]>([]);
  const underlineRef = useRef<HTMLDivElement[]>([]);
  const dotRef = useRef<HTMLDivElement[]>([]);
  const [activeLinkIndex, setActiveLinkIndex] = useState<number>(-1);

  const animateIn = (wordIdx: number) => {
    if (activeLinkIndex >= 0) return;
    setActiveLinkIndex(wordIdx);

    const frontChars = frontRefs.current[wordIdx];
    const backChars = backRefs.current[wordIdx];

    if (!frontChars || !backChars) return;

    gsap.killTweensOf([frontChars, backChars, dotRef.current[wordIdx]]);

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

    gsap.killTweensOf([frontChars, backChars, dotRef.current[wordIdx]]);

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
    <nav className="hidden md:flex items-center space-x-8">
      {navLinks.map((link, idx) => (
        <Link
          key={idx}
          href={link.href}
          className="relative flex flex-col items-center cursor-pointer overflow-hidden"
          onMouseEnter={() => animateIn(idx)}
          onMouseLeave={() => animateOut(idx)}
        >
          {/* Front Layer */}
          <div className="w-full h-full flex  items-center justify-center">
            {link.label.split("").map((char, charIdx) => (
              <span
                key={charIdx}
                className="inline-block"
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

          {/* Back Layer */}
          <div className="w-full absolute h-full flex items-center justify-center">
            {link.label.split("").map((char, charIdx) => (
              <span
                key={charIdx}
                className="inline-block"
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

          {/* Underline */}
          <div
            ref={(el) => {
              if (el) underlineRef.current[idx] = el;
            }}
            className="bg-secondary-foreground/90 underline rounded-full absolute bottom-0 h-[2px] w-full scale-x-0"
          ></div>
        </Link>
      ))}
    </nav>
  );
}

// ✅ Desktop Search Component
function DesktopSearch() {
  return (
    <div className="hidden lg:flex items-center space-x-2 flex-1 max-w-sm mx-8">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
        <Input placeholder="Search clothing..." className="pl-10" />
      </div>
    </div>
  );
}

// ✅ Right Section Component (User, Cart, Mobile Menu)
function RightSection({
  itemCount,
  setIsCartOpen,
}: {
  itemCount: number;
  setIsCartOpen: (val: boolean) => void;
}) {
  return (
    <div className="flex items-center space-x-2">
      <Button variant="ghost" size="icon" className="hidden sm:inline-flex">
        <User className="h-5 w-5" />
      </Button>

      <Button
        variant="ghost"
        size="icon"
        className="relative"
        onClick={() => setIsCartOpen(true)}
      >
        <ShoppingBag className="h-5 w-5" />
        {itemCount > 0 && (
          <span className="absolute -top-1 -right-1 h-5 w-5 bg-primary text-primary-foreground text-xs rounded-full flex items-center justify-center">
            {itemCount}
          </span>
        )}
      </Button>
      <ThemeToggleButton />

      {/* ✅ Mobile Nav */}
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon" className="md:hidden">
            <Menu className="h-5 w-5" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-64">
          <nav className="flex flex-col gap-y-4 items-center mt-8">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href}>
                {link.label}
              </Link>
            ))}
          </nav>
        </SheetContent>
      </Sheet>
    </div>
  );
}

// ✅ Mobile Search Component
function MobileSearch({
  searchRef,
}: {
  searchRef: React.RefObject<HTMLDivElement>;
}) {
  return (
    <div
      ref={searchRef}
      className="md:hidden sticky top-16 z-[998] border-b bg-background/90 backdrop-blur supports-[backdrop-filter]:bg-background/60 px-4 py-2"
    >
      <div className="relative bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/70 rounded-md">
        <Search className="absolute left-3  top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
        <Input placeholder="Search clothing..." className="pl-10" />
      </div>
    </div>
  );
}

// ✅ Main Header Component
export default function Header() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { itemCount } = useCart();

  const searchRef = useRef<HTMLDivElement | null>(null);
  const lastScrollY = useRef(0);

  // control the mobile search bar
  useEffect(() => {
    let scrollTimeout: NodeJS.Timeout;
    const scrollThreshold = 50;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      clearTimeout(scrollTimeout);

      // check scroll difference
      const scrollDiff = Math.abs(currentScrollY - lastScrollY.current);
      if (scrollDiff > scrollThreshold) {
        if (currentScrollY > lastScrollY.current) {
          gsap.to(searchRef.current, {
            y: "-100%",
            duration: 0.4,
            opacity: 0,
            ease: "power3.out",
          });
        }
      }

      scrollTimeout = setTimeout(() => {
        gsap.to(searchRef.current, {
          y: "0%",
          duration: 0.4,
          opacity: 1,
          ease: "power3.out",
        });
      }, 100);

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(scrollTimeout);
    };
  }, []);

  return (
    <>
      {/* ✅ Header */}
      <header className="sticky top-0 z-[999] w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <Logo />
          <DesktopNav />
          <DesktopSearch />
          <RightSection itemCount={itemCount} setIsCartOpen={setIsCartOpen} />
        </div>
      </header>

      {/* ✅ Mobile Search */}
      <MobileSearch searchRef={searchRef} />
    </>
  );
}
