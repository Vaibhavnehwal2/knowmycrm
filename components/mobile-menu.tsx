"use client";

import { useState } from 'react';
import Link from 'next/link';
import { Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

interface NavItem {
  name: string;
  href: string;
}

interface MobileMenuProps {
  navigation: NavItem[];
}

export function MobileMenu({ navigation }: MobileMenuProps) {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon">
          <Menu className="h-6 w-6" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-[300px] sm:w-[400px]">
        <div className="flex flex-col gap-4 mt-8">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="text-base font-medium text-gray-900 hover:text-primary transition-colors"
              onClick={() => setOpen(false)}
            >
              {item.name}
            </Link>
          ))}
          <div className="mt-4 flex flex-col gap-2">
            <Link href="/wizard" onClick={() => setOpen(false)}>
              <Button className="w-full">Start Fit Wizard</Button>
            </Link>
            <Link href="/book" onClick={() => setOpen(false)}>
              <Button variant="outline" className="w-full">Book a Call</Button>
            </Link>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
