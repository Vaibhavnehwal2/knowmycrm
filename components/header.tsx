import Link from 'next/link';
import { Button } from '@/components/ui/button';
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
          <Link href="/" className="text-xl font-bold text-gray-900 hover:text-primary transition-colors">
            KnowMyCRM
          </Link>
        </div>
        
        <div className="hidden lg:flex lg:gap-x-8">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="text-sm font-medium text-gray-700 hover:text-primary transition-colors"
            >
              {item.name}
            </Link>
          ))}
        </div>

        <div className="hidden lg:flex lg:gap-x-3">
          <Link href="/wizard">
            <Button>Start Fit Wizard</Button>
          </Link>
          <Link href="/book">
            <Button variant="outline">Book a Call</Button>
          </Link>
        </div>

        <div className="flex lg:hidden">
          <MobileMenu navigation={navigation} />
        </div>
      </nav>
    </header>
  );
}
