import Link from "next/link";
import InfinityLogo from "./InfinityLogo";

export default function Header() {
  return (
    <header className="border-b border-gray-100">
      <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 text-gray-800 hover:text-black transition-colors">
          <InfinityLogo className="w-7 h-7" />
          <span className="font-semibold text-lg">Learner Always</span>
        </Link>
        <nav className="flex items-center gap-6">
          <Link href="/" className="text-sm text-gray-600 hover:text-black transition-colors">
            Home
          </Link>
          <Link href="/about" className="text-sm text-gray-600 hover:text-black transition-colors">
            About
          </Link>
        </nav>
      </div>
    </header>
  );
}
