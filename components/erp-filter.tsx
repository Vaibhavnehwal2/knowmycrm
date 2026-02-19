"use client";

import { useState, useMemo, useDeferredValue, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { PrefetchLink } from '@/components/prefetch-link';
import { BrandIcon } from '@/components/brand-icon';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';
import type { ERPProfile } from '@/types';

interface ERPFilterProps {
  erps: ERPProfile[];
}

export function ERPFilter({ erps }: ERPFilterProps) {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedComplexity, setSelectedComplexity] = useState<string>('');
  const deferredSearch = useDeferredValue(searchQuery);
  const prefetchedTop = useRef(false);

  // Memoize filtered results for performance
  const filteredERPs = useMemo(() => {
    return erps.filter((erp) => {
      const matchesSearch = erp.name.toLowerCase().includes(deferredSearch.toLowerCase()) ||
        erp.tagline.toLowerCase().includes(deferredSearch.toLowerCase());
      const matchesComplexity = !selectedComplexity || erp.filters.complexity === selectedComplexity;
      return matchesSearch && matchesComplexity;
    });
  }, [erps, deferredSearch, selectedComplexity]);

  // Prefetch top 6 visible cards on mount
  useEffect(() => {
    if (!prefetchedTop.current && filteredERPs.length > 0) {
      const topItems = filteredERPs.slice(0, 6);
      topItems.forEach((erp) => {
        router.prefetch(`/compare-erp/${erp.slug}`);
      });
      prefetchedTop.current = true;
    }
  }, [filteredERPs, router]);

  return (
    <>
      {/* Filters */}
      <section className="container mx-auto px-4 pb-8 lg:px-8">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <Input
              type="text"
              placeholder="Search ERPs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex gap-2">
            <Button
              variant={selectedComplexity === '' ? 'default' : 'outline'}
              onClick={() => setSelectedComplexity('')}
              size="sm"
            >
              All
            </Button>
            <Button
              variant={selectedComplexity === 'light' ? 'default' : 'outline'}
              onClick={() => setSelectedComplexity('light')}
              size="sm"
            >
              Light
            </Button>
            <Button
              variant={selectedComplexity === 'medium' ? 'default' : 'outline'}
              onClick={() => setSelectedComplexity('medium')}
              size="sm"
            >
              Medium
            </Button>
            <Button
              variant={selectedComplexity === 'high' ? 'default' : 'outline'}
              onClick={() => setSelectedComplexity('high')}
              size="sm"
            >
              High
            </Button>
          </div>
        </div>
      </section>

      {/* ERP Cards */}
      <section className="container mx-auto px-4 pb-16 lg:px-8 lg:pb-24">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredERPs.map((erp) => (
            <PrefetchLink key={erp.slug} href={`/compare-erp/${erp.slug}`}>
              <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer">
                <CardHeader>
                  <div className="flex items-center gap-3 mb-2">
                    <BrandIcon iconName={erp.icon} name={erp.name} className="h-8 w-8" />
                    <CardTitle className="text-xl">{erp.name}</CardTitle>
                  </div>
                  <CardDescription>{erp.tagline}</CardDescription>
                  <div className="flex gap-2 mt-3">
                    <Badge variant="secondary" className="text-xs">
                      {erp.filters.complexity}
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      {erp.filters.ecosystem}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600">
                    Best for: {erp.bestFor[0]}
                  </p>
                </CardContent>
              </Card>
            </PrefetchLink>
          ))}
        </div>
      </section>
    </>
  );
}
