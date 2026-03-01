export default function Footer() {
  return (
    <footer className="border-t border-gray-100 mt-auto">
      <div className="max-w-4xl mx-auto px-6 py-8 text-center">
        <p className="text-sm text-gray-500">
          &copy; {new Date().getFullYear()} Learner Always. Never stop learning.
        </p>
      </div>
    </footer>
  );
}
