import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

interface InlineMiniCTAProps {
  text: string;
  linkText: string;
  href: string;
}

export function InlineMiniCTA({ text, linkText, href }: InlineMiniCTAProps) {
  return (
    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex items-center justify-between gap-4">
      <p className="text-sm font-medium text-gray-700">{text}</p>
      <Link href={href}>
        <Button variant="outline" size="sm" className="shrink-0">
          {linkText} <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </Link>
    </div>
  );
}
