"use client";
import { useEffect, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Link from "next/link";
import { NavLink, navLinks } from "@/data/navLinks";


const Header = () => {
  const [show, setShow] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

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

  return (
    <header className="header-container fixed top-14 left-0 w-full bg-white shadow-md z-40">
      <nav className="flex justify-center items-center py-4 gap-8 text-lg font-medium text-gray-700">
        {navLinks.map((link: NavLink) => (
          <Link
            key={link.id}
            href={link.href}
            className="hover:text-black transition-colors hidden sm:block text-[hsl(var(--primary))]"
          >
            {link.label}
          </Link>
        ))}
      </nav>
    </header>
  );
};

export default Header;
