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
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80">
      <nav className="container mx-auto flex h-16 max-w-7xl items-center justify-between px-4 md:px-6" aria-label="Global">
        <div className="flex items-center">
          <Link href="/" className="flex items-center gap-2 hover:opacity-90 transition-opacity">
            <div className="bg-gray-900 rounded-md px-2 py-1">
              <Image 
                src="/brand/knowmycrm-logo-full.png" 
                alt="KnowMyCRM - Find the Right CRM & ERP" 
                width={180} 
                height={45}
                className="h-10 w-auto"
                priority
              />
            </div>
          </Link>
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
