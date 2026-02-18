import Link from 'next/link';

export function Footer() {
  return (
    <footer className="border-t bg-gray-50">
      <div className="container mx-auto px-4 py-12 lg:px-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
          <div className="lg:col-span-2">
            <Link href="/" className="text-xl font-bold text-primary">
              KnowMyCRM
            </Link>
            <p className="mt-4 text-sm text-gray-600">
              Selection support + partner introductions.
            </p>
            <p className="mt-4 text-xs text-gray-500">
              KnowMyCRM provides selection support and partner introductions. Final tool choice and contracting remain with the client.
            </p>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-900">Platform</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link href="/wizard" className="text-sm text-gray-600 hover:text-primary">
                  Fit Wizard
                </Link>
              </li>
              <li>
                <Link href="/compare-crm" className="text-sm text-gray-600 hover:text-primary">
                  Compare CRM
                </Link>
              </li>
              <li>
                <Link href="/compare-erp" className="text-sm text-gray-600 hover:text-primary">
                  Compare ERP
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-sm text-gray-600 hover:text-primary">
                  Services
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-900">Company</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link href="/about" className="text-sm text-gray-600 hover:text-primary">
                  About
                </Link>
              </li>
              <li>
                <Link href="/resources" className="text-sm text-gray-600 hover:text-primary">
                  Resources
                </Link>
              </li>
              <li>
                <Link href="/book" className="text-sm text-gray-600 hover:text-primary">
                  Book a Call
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-sm text-gray-600 hover:text-primary">
                  Privacy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-sm text-gray-600 hover:text-primary">
                  Terms
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-12 border-t pt-8">
          <p className="text-xs text-gray-500">
            All trademarks and logos are property of their respective owners. Used for identification only.
          </p>
          <p className="mt-2 text-xs text-gray-500">
            © {new Date().getFullYear()} KnowMyCRM. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
