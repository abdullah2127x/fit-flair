// navLinks.ts
export interface NavLink {
  id: string;
  label: string;
  href: string;
}

export const navLinks: NavLink[] = [
  { id: '1', label: 'Home', href: '/' },
  { id: '2', label: 'About', href: '/about' },
  { id: '3', label: 'Services', href: '/services' },
  { id: '4', label: 'Contact', href: '/contact' },
];
