"use client";

import { useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { PrefetchLink } from '@/components/prefetch-link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight } from 'lucide-react';
import type { Industry } from '@/types';

interface FeaturedIndustriesProps {
  industries: Industry[];
}

export function FeaturedIndustries({ industries }: FeaturedIndustriesProps) {
  const router = useRouter();
  const prefetchedTop = useRef(false);

  // Prefetch all featured industries on mount
  useEffect(() => {
    if (!prefetchedTop.current && industries.length > 0) {
      industries.forEach((industry) => {
        router.prefetch(`/industries/${industry.slug}`);
      });
      prefetchedTop.current = true;
    }
  }, [industries, router]);

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {industries.map((industry) => (
        <PrefetchLink key={industry.slug} href={`/industries/${industry.slug}`}>
          <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader>
              <div className="flex items-start justify-between mb-2">
                <CardTitle className="text-lg">{industry.name}</CardTitle>
                <ArrowRight className="h-5 w-5 text-primary shrink-0" />
              </div>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-sm">
                {industry.summary}
              </CardDescription>
            </CardContent>
          </Card>
        </PrefetchLink>
      ))}
    </div>
  );
}
