import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { NavPrefetchLink } from '@/components/nav-prefetch-link';
import { MobileMenu } from '@/components/mobile-menu';
import { BrandLogo } from '@/components/brand-logo';

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'Compare CRM', href: '/compare-crm' },
  { name: 'Compare ERP', href: '/compare-erp' },
  { name: 'Industries', href: '/industries' },
  { name: 'Services', href: '/services' },
  { name: 'Partners', href: '/partners' },
  { name: 'Resources', href: '/resources' },
];

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80">
      <nav className="container mx-auto flex h-18 max-w-7xl items-center justify-between px-4 md:px-6" aria-label="Global">
        <div className="flex items-center">
          <BrandLogo variant="header" linkToHome />
        </div>
        
        <div className="hidden lg:flex lg:gap-x-8">
          {navigation.map((item) => (
            <NavPrefetchLink
              key={item.name}
              href={item.href}
              className="text-sm font-medium text-gray-700 hover:text-primary transition-colors"
            >
              {item.name}
            </NavPrefetchLink>
          ))}
        </div>

        <div className="hidden lg:flex lg:gap-x-3">
          <Button asChild>
            <Link href="/wizard">Start Fit Wizard</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/book">Book a Call</Link>
          </Button>
        </div>

        <div className="flex lg:hidden">
          <MobileMenu navigation={navigation} />
        </div>
      </nav>
    </header>
  );
}
