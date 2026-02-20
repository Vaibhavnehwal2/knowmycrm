import Link from 'next/link';
import { Separator } from '@/components/ui/separator';
import { BrandLogo } from '@/components/brand-logo';
import { Phone, MapPin, MessageCircle } from 'lucide-react';
import { LinkedInIcon, WhatsAppIcon, IndiaFlag, RomaniaFlag } from '@/components/social-icons';

const LINKEDIN_URL = 'https://www.linkedin.com/company/knowmycrm';

// Contact info
const CONTACT = {
  india: {
    name: 'India',
    phone: '+91 9315156055',
    phoneRaw: '+919315156055',
    whatsapp: 'https://wa.me/919315156055',
    address: 'Urbtech NPX, P5/522, Sector 153, Noida, UP 201304',
  },
  romania: {
    name: 'Romania',
    phone: '+40 754 324 179',
    phoneRaw: '+40754324179',
    whatsapp: 'https://wa.me/40754324179',
    address: 'Strada BUZEȘTI, Nr. 75-77, Camera 7, Etaj 9, București',
  },
};

export function Footer() {
  return (
    <footer className="border-t bg-gray-50">
      <div className="container mx-auto max-w-7xl px-4 py-12 md:px-6">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-5">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="inline-block">
              <BrandLogo size="lg" />
            </Link>
            <p className="mt-4 text-sm font-medium text-gray-700">
              Selection support + partner introductions for CRM and ERP decisions.
            </p>
            <p className="mt-2 text-sm text-gray-600 max-w-md">
              Vendor-neutral, no sponsorship bias. We help you find the right fit.
            </p>
            {/* Social Links */}
            <div className="mt-4 flex items-center gap-3">
              <a
                href={LINKEDIN_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-gray-600 hover:text-[#0A66C2] transition-colors"
                aria-label="Follow us on LinkedIn"
              >
                <LinkedInIcon className="h-5 w-5" />
                <span>LinkedIn</span>
              </a>
            </div>
          </div>
          
          {/* Platform */}
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
          
          {/* Company */}
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
                <Link href="/contact" className="text-sm text-gray-600 hover:text-primary transition-colors">
                  Contact
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

          {/* Contact */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-4">Contact</h3>
            <div className="space-y-4">
              {/* India */}
              <div>
                <div className="text-sm font-medium text-gray-800 mb-1.5 flex items-center gap-1.5">
                  <span>{CONTACT.india.flag}</span>
                  <span>{CONTACT.india.name}</span>
                </div>
                <div className="space-y-1">
                  <a
                    href={`tel:${CONTACT.india.phoneRaw}`}
                    className="flex items-center gap-1.5 text-sm text-gray-600 hover:text-primary transition-colors"
                  >
                    <Phone className="h-3.5 w-3.5" />
                    {CONTACT.india.phone}
                  </a>
                  <a
                    href={CONTACT.india.whatsapp}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-sm text-gray-600 hover:text-[#25D366] transition-colors"
                  >
                    <WhatsAppIcon className="h-3.5 w-3.5" />
                    WhatsApp
                  </a>
                </div>
                <div className="flex items-start gap-1.5 text-xs text-gray-500 mt-1">
                  <MapPin className="h-3 w-3 shrink-0 mt-0.5" />
                  <span>{CONTACT.india.address}</span>
                </div>
              </div>
              
              {/* Romania */}
              <div>
                <div className="text-sm font-medium text-gray-800 mb-1.5 flex items-center gap-1.5">
                  <span>{CONTACT.romania.flag}</span>
                  <span>{CONTACT.romania.name}</span>
                </div>
                <div className="space-y-1">
                  <a
                    href={`tel:${CONTACT.romania.phoneRaw}`}
                    className="flex items-center gap-1.5 text-sm text-gray-600 hover:text-primary transition-colors"
                  >
                    <Phone className="h-3.5 w-3.5" />
                    {CONTACT.romania.phone}
                  </a>
                  <a
                    href={CONTACT.romania.whatsapp}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-sm text-gray-600 hover:text-[#25D366] transition-colors"
                  >
                    <WhatsAppIcon className="h-3.5 w-3.5" />
                    WhatsApp
                  </a>
                </div>
                <div className="flex items-start gap-1.5 text-xs text-gray-500 mt-1">
                  <MapPin className="h-3 w-3 shrink-0 mt-0.5" />
                  <span>{CONTACT.romania.address}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <Separator className="my-8" />
        
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="space-y-2">
            <p className="text-xs text-gray-500">
              KnowMyCRM provides selection support and partner introductions. Final tool choice and contracting remain with the client.
            </p>
            <p className="text-xs text-gray-500">
              All trademarks and logos are property of their respective owners. Used for identification only.
            </p>
          </div>
          <p className="text-xs text-gray-500 shrink-0">
            © {new Date().getFullYear()} KnowMyCRM. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
