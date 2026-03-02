import Link from "next/link";
import Image from "next/image";

export default function Header() {
  return (
    <header className="border-b border-gray-100">
      <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 text-gray-800 hover:text-black transition-colors">
          <Image src="/logo.png" alt="Learner Always logo" width={28} height={28} />
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
