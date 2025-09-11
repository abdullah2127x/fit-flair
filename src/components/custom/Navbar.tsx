import React from "react"
import { Menu, Bus, User, ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Input } from "@/components/ui/input"
import { NavLink, navLinks } from "@/data/navLinks"
import Link from "next/link"
import ThemeToggleButton from "../ui/theme-toggle-button"

export default function Navbar() {
  const menuLinks = ["Home", "About", "Services", "Contact"]
  const icons = [
    { icon: Bus, label: "Bus" },
    { icon: User, label: "Profile" },
    { icon: ShoppingCart, label: "Cart" },
  ]

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background text-foreground shadow-sm">
      <div className="container mx-auto flex items-center justify-between px-4 py-3">
        {/* Left side: Logo + Mobile Menu */}
        <div className="flex items-center gap-2">
          {/* Mobile Sidebar */}
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-64 bg-background text-foreground">
                <SheetHeader>
                  <SheetTitle>Menu</SheetTitle>
                </SheetHeader>
                <div className="mt-4 flex flex-col gap-4">
                  {navLinks.map((link:NavLink,idx:number) => (
                    <Link key={idx} href={link.href} className="text-lg font-medium hover:text-primary">
                      {link.label}
                    </Link>
                  ))}
                </div>
              </SheetContent>
            </Sheet>
          </div>

          {/* Logo */}
          <div className="text-2xl font-bold text-primary">MyLogo</div>
        </div>

        {/* Middle: Search Bar */}
        <div className="hidden md:flex flex-1 justify-center px-6">
          <Input
            type="text"
            placeholder="Search..."
            className="w-full max-w-lg bg-secondary text-foreground"
          />
        </div>

        {/* Right side: Icons */}
        <div className="flex items-center gap-4">
          {icons.map(({ icon: Icon, label }, idx) => (
            <Button key={idx} variant="ghost" size="icon" aria-label={label}>
              <Icon className="h-6 w-6 text-foreground" />
            </Button>
          ))}
          <ThemeToggleButton/>
        </div>
      </div>

      {/* Searchbar visible in mobile view below logo */}
      <div className="md:hidden px-4 pb-3">
        <Input type="text" placeholder="Search..." className="bg-secondary text-foreground" />
      </div>
    </nav>
  )
}
