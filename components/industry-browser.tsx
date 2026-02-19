'use client';

import { useState, useMemo, useDeferredValue, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { PrefetchLink } from '@/components/prefetch-link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { ArrowRight } from 'lucide-react';
import type { Industry } from '@/types';

interface IndustryBrowserProps {
  industries: Industry[];
  categories: string[];
}

export function IndustryBrowser({ industries, categories }: IndustryBrowserProps) {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const deferredSearch = useDeferredValue(searchQuery);
  const prefetchedTop = useRef(false);

  // Memoize filtered results for performance
  const filteredIndustries = useMemo(() => {
    return industries.filter((industry) => {
      const matchesSearch = 
        industry.name.toLowerCase().includes(deferredSearch.toLowerCase()) ||
        industry.summary.toLowerCase().includes(deferredSearch.toLowerCase());
      const matchesCategory = activeCategory === 'All' || industry.category === activeCategory;
      return matchesSearch && matchesCategory;
    });
  }, [industries, deferredSearch, activeCategory]);

  // Prefetch top 8 visible industries on mount
  useEffect(() => {
    if (!prefetchedTop.current && filteredIndustries.length > 0) {
      const topItems = filteredIndustries.slice(0, 8);
      topItems.forEach((industry) => {
        router.prefetch(`/industries/${industry.slug}`);
      });
      prefetchedTop.current = true;
    }
  }, [filteredIndustries, router]);

  return (
    <div className="space-y-8">
      {/* Search */}
      <div className="max-w-xl">
        <Input
          type="text"
          placeholder="Search industries..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Category Tabs */}
      <Tabs value={activeCategory} onValueChange={setActiveCategory} className="w-full">
        <TabsList className="flex flex-wrap h-auto">
          <TabsTrigger value="All">All</TabsTrigger>
          {categories.map((category) => (
            <TabsTrigger key={category} value={category}>
              {category}
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value={activeCategory} className="mt-8">
          <p className="text-sm text-gray-600 mb-6">
            Showing {filteredIndustries.length} {filteredIndustries.length === 1 ? 'industry' : 'industries'}
          </p>
          
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredIndustries.map((industry) => (
              <PrefetchLink key={industry.slug} href={`/industries/${industry.slug}`}>
                <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer">
                  <CardHeader>
                    <div className="flex items-start justify-between mb-2">
                      <CardTitle className="text-lg">{industry.name}</CardTitle>
                      <ArrowRight className="h-5 w-5 text-primary shrink-0" />
                    </div>
                    <Badge variant="secondary" className="w-fit">
                      {industry.category}
                    </Badge>
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

          {filteredIndustries.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-600">No industries found matching your search.</p>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
