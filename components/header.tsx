import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { NavPrefetchLink } from '@/components/nav-prefetch-link';
import { MobileMenu } from '@/components/mobile-menu';

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
    <header className="sticky top-0 z-50 w-full border-b bg-gray-900">
      <nav className="container mx-auto flex h-24 max-w-7xl items-center justify-between px-4 md:px-6" aria-label="Global">
        <div className="flex items-center">
          <Link href="/" className="flex items-center hover:opacity-90 transition-opacity">
            <Image 
              src="/brand/knowmycrm-logo-large.png" 
              alt="KnowMyCRM - Find the Right CRM & ERP" 
              width={360} 
              height={90}
              className="h-[72px] w-auto"
              priority
            />
          </Link>
        </div>
        
        <div className="hidden lg:flex lg:gap-x-8">
          {navigation.map((item) => (
            <NavPrefetchLink
              key={item.name}
              href={item.href}
              className="text-sm font-medium text-gray-300 hover:text-white transition-colors"
            >
              {item.name}
            </NavPrefetchLink>
          ))}
        </div>

        <div className="hidden lg:flex lg:gap-x-3">
          <Button asChild className="bg-primary hover:bg-primary/90">
            <Link href="/wizard">Start Fit Wizard</Link>
          </Button>
          <Button variant="outline" asChild className="border-gray-600 text-white hover:bg-gray-800">
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
