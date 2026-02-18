import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowRight } from 'lucide-react';

interface ServiceCTABlockProps {
  headline: string;
  subtext: string;
  primaryButton: { text: string; href: string };
  secondaryButton: { text: string; href: string };
  note?: string;
}

export function ServiceCTABlock({
  headline,
  subtext,
  primaryButton,
  secondaryButton,
  note
}: ServiceCTABlockProps) {
  return (
    <Card className="bg-gradient-to-br from-blue-50 to-white border-2">
      <CardContent className="p-8 text-center">
        <h3 className="text-2xl font-bold text-gray-900 mb-3">
          {headline}
        </h3>
        <p className="text-gray-700 mb-6 max-w-2xl mx-auto">
          {subtext}
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center mb-4">
          <Link href={primaryButton.href}>
            <Button size="lg">
              {primaryButton.text} <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
          <Link href={secondaryButton.href}>
            <Button variant="outline" size="lg">
              {secondaryButton.text}
            </Button>
          </Link>
        </div>
        {note && (
          <p className="text-xs text-gray-500">{note}</p>
        )}
      </CardContent>
    </Card>
  );
}
