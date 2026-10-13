import Link from "next/link";
import Container from "@/components/ui/Container";

export default function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-gray-50">
      <Container>
        <div className="grid gap-8 py-10 sm:grid-cols-2 lg:grid-cols-3">
          <div>
            <Link
              href="/"
              className="text-xl font-bold text-blue-800"
            >
              UOVT
            </Link>

            <p className="mt-3 max-w-sm text-sm leading-6 text-gray-600">
              Your university web application for learning,
              information, and academic resources.
            </p>
          </div>

          <div>
            <h2 className="font-semibold text-gray-900">
              Quick links
            </h2>

            <ul className="mt-3 space-y-2 text-sm text-gray-600">
              <li>
                <Link className="hover:text-blue-700" href="/">
                  Home
                </Link>
              </li>
              <li>
                <Link className="hover:text-blue-700" href="/about">
                  About
                </Link>
              </li>
              <li>
                <Link className="hover:text-blue-700" href="/courses">
                  Courses
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h2 className="font-semibold text-gray-900">
              Contact
            </h2>

            <p className="mt-3 text-sm leading-6 text-gray-600">
              University of Vocational Technology
            </p>
          </div>
        </div>

        <div className="border-t border-gray-200 py-4 text-center text-sm text-gray-500">
          © {new Date().getFullYear()} UOVT. All rights reserved.
        </div>
      </Container>
    </footer>
  );
}