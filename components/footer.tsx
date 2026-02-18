import Link from 'next/link';
import { Separator } from '@/components/ui/separator';

export function Footer() {
  return (
    <footer className="border-t bg-gray-50">
      <div className="container mx-auto max-w-7xl px-4 py-12 md:px-6">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
          <div className="lg:col-span-2">
            <Link href="/" className="text-xl font-bold text-gray-900">
              KnowMyCRM
            </Link>
            <p className="mt-4 text-sm text-gray-600 max-w-md">
              Selection support + partner introductions for CRM and ERP decisions.
            </p>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-4">Platform</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/wizard" className="text-sm text-gray-600 hover:text-primary transition-colors">
                  Fit Wizard
                </Link>
              </li>
              <li>
                <Link href="/compare-crm" className="text-sm text-gray-600 hover:text-primary transition-colors">
                  Compare CRM
                </Link>
              </li>
              <li>
                <Link href="/compare-erp" className="text-sm text-gray-600 hover:text-primary transition-colors">
                  Compare ERP
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-sm text-gray-600 hover:text-primary transition-colors">
                  Services
                </Link>
              </li>
              <li>
                <Link href="/partners" className="text-sm text-gray-600 hover:text-primary transition-colors">
                  Partners
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-4">Company</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/about" className="text-sm text-gray-600 hover:text-primary transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link href="/resources" className="text-sm text-gray-600 hover:text-primary transition-colors">
                  Resources
                </Link>
              </li>
              <li>
                <Link href="/book" className="text-sm text-gray-600 hover:text-primary transition-colors">
                  Book a Call
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-sm text-gray-600 hover:text-primary transition-colors">
                  Privacy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-sm text-gray-600 hover:text-primary transition-colors">
                  Terms
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        <Separator className="my-8" />
        
        <div className="space-y-4">
          <p className="text-xs text-gray-500">
            KnowMyCRM provides selection support and partner introductions. Final tool choice and contracting remain with the client.
          </p>
          <p className="text-xs text-gray-500">
            All trademarks and logos are property of their respective owners. Used for identification only.
          </p>
          <p className="text-xs text-gray-500">
            © {new Date().getFullYear()} KnowMyCRM. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
