import Link from "next/link";
import { Facebook, Twitter, Instagram, Mail, Phone, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function Footer() {
  return (
    <footer className="bg-secondary/50 border-t">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="h-8 w-8 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-sm">C</span>
              </div>
              <span className="font-bold text-xl">Couture</span>
            </div>
            <p className="text-muted-foreground text-sm">
              Discover premium clothing crafted with finest fabrics and attention to detail.
              Your style is our commitment.
            </p>
            <div className="flex space-x-2">
              {[Facebook, Twitter, Instagram].map((Icon, i) => (
                <Button
                  key={i}
                  variant="ghost"
                  size="icon"
                  className="hover:text-primary transition-transform hover:scale-110"
                >
                  <Icon className="h-4 w-4" />
                </Button>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-semibold">Quick Links</h3>
            <div className="space-y-2">
              {[
                { label: "Home", href: "/" },
                { label: "Men's Collection", href: "/men" },
                { label: "Women's Collection", href: "/women" },
                { label: "About Us", href: "/about" },
                { label: "Contact", href: "/contact" },
              ].map((link, i) => (
                <Link
                  key={i}
                  href={link.href}
                  className="block text-sm text-muted-foreground hover:text-foreground transition-colors relative after:absolute after:-bottom-0.5 after:left-0 after:h-[1px] after:w-0 after:bg-foreground after:transition-all hover:after:w-full"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Customer Service */}
          <div className="space-y-4">
            <h3 className="font-semibold">Customer Service</h3>
            <div className="space-y-2">
              {[
                { label: "Shipping Info", href: "/shipping" },
                { label: "Returns", href: "/returns" },
                { label: "FAQ", href: "/faq" },
                { label: "Support", href: "/support" },
              ].map((link, i) => (
                <Link
                  key={i}
                  href={link.href}
                  className="block text-sm text-muted-foreground hover:text-foreground transition-colors relative after:absolute after:-bottom-0.5 after:left-0 after:h-[1px] after:w-0 after:bg-foreground after:transition-all hover:after:w-full"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Contact & Newsletter */}
          <div className="space-y-4">
            <h3 className="font-semibold">Get in Touch</h3>
            <div className="space-y-2 text-sm text-muted-foreground">
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4" />
                <span>hello@elegance.com</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4" />
                <span>New York, NY</span>
              </div>
            </div>

            <div className="space-y-2">
              <p className="text-sm font-medium">Newsletter</p>
              <form className="flex space-x-2">
                <Input
                  placeholder="Enter email"
                  type="email"
                  required
                  className="flex-1"
                />
                <Button size="sm" type="submit">
                  Subscribe
                </Button>
              </form>
            </div>
          </div>
        </div>

        <div className="border-t mt-10 pt-8 text-center">
          <p className="text-sm text-muted-foreground">
            © 2024 Couture. All rights reserved. Crafted with finest fabrics and attention to detail.
          </p>
        </div>
      </div>
    </footer>
  );
}
