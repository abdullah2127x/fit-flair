import Link from "next/link";
import {
  Facebook,
  Twitter,
  Instagram,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function Footer() {
  // Social Icons
  const socials = [Facebook, Twitter, Instagram];

  // Footer Links
  const quickLinks = [
    { label: "Home", href: "/" },
    { label: "Men's Collection", href: "/men" },
    { label: "Women's Collection", href: "/women" },
    { label: "About Us", href: "/about" },
    { label: "Contact", href: "/contact" },
  ];

  const customerLinks = [
    { label: "Shipping Info", href: "/shipping" },
    { label: "Returns", href: "/returns" },
    { label: "FAQ", href: "/faq" },
    { label: "Support", href: "/support" },
  ];

  // Contact Info
  const contacts = [
    { icon: Mail, text: "hello@elegance.com" },
    { icon: Phone, text: "+1 (555) 123-4567" },
    { icon: MapPin, text: "New York, NY" },
  ];

  // Reusable Link Section
  const LinkSection = ({
    title,
    links,
  }: {
    title: string;
    links: { label: string; href: string }[];
  }) => (
    <div className="flex flex-col items-center md:items-start gap-y-4">
      <h3 className="font-semibold">{title}</h3>
      <div className="flex flex-col items-center md:items-start gap-y-2">
        {links.map((link, i) => (
          <Link
            key={i}
            href={link.href}
            className="block w-fit text-sm  transition-colors relative after:absolute after:-bottom-0.5 after:left-0 after:h-[1px] after:w-0 after:bg-foreground after:transition-all hover:after:w-full"
          >
            {link.label}
          </Link>
        ))}
      </div>
    </div>
  );

  return (
    <footer className="px-4 py-12 text-secondary-foreground">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        {/* Brand Section */}
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <div className="h-8 w-8 bg-primary-foreground rounded-lg flex items-center justify-center">
              <span className="text-primary font-bold text-sm">C</span>
            </div>
            <span className="font-bold text-xl text-primary-foreground">
              Couture
            </span>
          </div>
          <p className="text-sm">
            Discover premium clothing crafted with finest fabrics and attention
            to detail. Your style is our commitment.
          </p>
          <div className="flex space-x-2">
            {socials.map((Icon, i) => (
              <Button
                key={i}
                variant="ghost"
                size="icon"
                className="hover:bg-accent-foreground hover:text-accent transition-transform hover:scale-110"
              >
                <Icon className="h-4 w-4" />
              </Button>
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <LinkSection title="Quick Links" links={quickLinks} />

        {/* Customer Service */}
        <LinkSection title="Customer Service" links={customerLinks} />

        {/* Contact & Newsletter */}
        <div className="flex flex-col items-center md:items-start gap-y-4">
          <h3 className="font-semibold">Get in Touch</h3>
          <div className="flex flex-col gap-y-2 text-sm text-secondary-foreground">
            {contacts.map(({ icon: Icon, text }, i) => (
              <div key={i} className="flex items-center gap-x-2">
                <Icon className="h-4 w-4" />
                <span>{text}</span>
              </div>
            ))}
          </div>

          <div className="space-y-2">
            <p className="text-sm font-medium">Newsletter</p>
            <form className="flex items-center gap-x-2">
              <Input
                placeholder="Enter email"
                type="email"
                required
                className="flex-1"
              />
              <Button
                size="sm"
                className="bg-secondary-foreground text-secondary"
                type="submit"
              >
                Subscribe
              </Button>
            </form>
          </div>
        </div>
      </div>

      <div className="border-t mt-10 pt-8 text-center">
        <p className="text-sm text-muted-foreground">
          © 2024 Couture. All rights reserved. Crafted with finest fabrics and
          attention to detail.
        </p>
      </div>
    </footer>
  );
}
