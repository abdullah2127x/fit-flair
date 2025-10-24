import Link from "next/link";

// ✅ Logo Component
export default function Logo() {
  return (
    <Link href="/" className="flex items-center space-x-2">
      <div className="h-8 w-8 bg-primary-foreground rounded-lg flex items-center justify-center">
        <span className="text-primary font-bold text-sm">FF</span>
      </div>
      <span className="font-bold text-xl">FitFlair</span>
    </Link>
  );
}