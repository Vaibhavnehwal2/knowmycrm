"use client";

import { useState } from 'react';
import Link from 'next/link';
import { BrandIcon } from '@/components/brand-icon';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';
import type { CRMProfile } from '@/types';

interface CRMFilterProps {
  crms: CRMProfile[];
}

export function CRMFilter({ crms }: CRMFilterProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedComplexity, setSelectedComplexity] = useState<string>('');

  const filteredCRMs = crms.filter((crm) => {
    const matchesSearch = crm.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      crm.tagline.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesComplexity = !selectedComplexity || crm.filters.complexity === selectedComplexity;
    return matchesSearch && matchesComplexity;
  });

  return (
    <>
      {/* Filters */}
      <section className="container mx-auto px-4 pb-8 lg:px-8">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <Input
              type="text"
              placeholder="Search CRMs..."
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

      {/* CRM Cards */}
      <section className="container mx-auto px-4 pb-16 lg:px-8 lg:pb-24">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredCRMs.map((crm) => (
            <Link key={crm.slug} href={`/compare-crm/${crm.slug}`}>
              <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer">
                <CardHeader>
                  <div className="flex items-center gap-3 mb-2">
                    <BrandIcon iconName={crm.icon} name={crm.name} className="h-8 w-8" />
                    <CardTitle className="text-xl">{crm.name}</CardTitle>
                  </div>
                  <CardDescription>{crm.tagline}</CardDescription>
                  <div className="flex gap-2 mt-3">
                    <Badge variant="secondary" className="text-xs">
                      {crm.filters.complexity}
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      {crm.filters.ecosystem}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600">
                    Best for: {crm.bestFor[0]}
                  </p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
