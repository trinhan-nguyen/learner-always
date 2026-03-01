import Link from "next/link";

export default function NotFound() {
  return (
    <div className="text-center py-20">
      <h1 className="text-4xl font-bold text-gray-900 mb-4">404</h1>
      <p className="text-gray-500 mb-6">The page you&apos;re looking for doesn&apos;t exist.</p>
      <Link
        href="/"
        className="text-sm text-gray-600 hover:text-black underline underline-offset-4 transition-colors"
      >
        Go back home
      </Link>
    </div>
  );
}
