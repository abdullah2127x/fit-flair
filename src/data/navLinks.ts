// navLinks.ts
export interface NavLink {
  label: string;
  href: string;
}

export const navLinks: NavLink[] = [
  {label: 'Home', href: '/' },
  {label: 'Shop', href: '/shop' },
  {label: 'About', href: '/about' },
  {label: 'Services', href: '/services' },
  {label: 'Contact', href: '/contact' },
];
