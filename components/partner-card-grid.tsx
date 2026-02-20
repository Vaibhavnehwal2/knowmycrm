'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Building2 } from 'lucide-react';
import type { Partner } from '@/lib/partners';

interface PartnerCardGridProps {
  partners: Partner[];
}

// Helper to check if URL is external (S3, etc.)
function isExternalUrl(url: string): boolean {
  return url.startsWith('http://') || url.startsWith('https://');
}

export function PartnerCardGrid({ partners }: PartnerCardGridProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [focusFilter, setFocusFilter] = useState<string>('All');
  const [regionFilter, setRegionFilter] = useState<string>('All');

  const filteredPartners = partners.filter((partner) => {
    const matchesSearch = partner.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      partner.shortDescription.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesFocus = focusFilter === 'All' || 
      (focusFilter === 'Both' && partner.focus.includes('CRM') && partner.focus.includes('ERP')) ||
      (focusFilter === 'CRM' && partner.focus.includes('CRM') && !partner.focus.includes('ERP')) ||
      (focusFilter === 'ERP' && partner.focus.includes('ERP') && !partner.focus.includes('CRM')) ||
      (focusFilter !== 'Both' && partner.focus.includes(focusFilter));
    
    const matchesRegion = regionFilter === 'All' || partner.regions.includes(regionFilter);
    
    return matchesSearch && matchesFocus && matchesRegion;
  });

  return (
    <div className="space-y-8">
      {/* Filters */}
      <div className="space-y-4">
        <Input
          type="text"
          placeholder="Search partners..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="max-w-md"
        />
        
        <div className="flex flex-wrap gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Focus:</label>
            <div className="flex flex-wrap gap-2">
              {['All', 'CRM', 'ERP', 'Both'].map((focus) => (
                <Button
                  key={focus}
                  variant={focusFilter === focus ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setFocusFilter(focus)}
                >
                  {focus}
                </Button>
              ))}
            </div>
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Region:</label>
            <div className="flex flex-wrap gap-2">
              {['All', 'Global', 'North America', 'Europe', 'India', 'APAC'].map((region) => (
                <Button
                  key={region}
                  variant={regionFilter === region ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setRegionFilter(region)}
                >
                  {region}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Results count */}
      <p className="text-sm text-gray-600">
        Showing {filteredPartners.length} of {partners.length} partners
      </p>

      {/* Partner Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredPartners.map((partner) => (
          <Link key={partner.slug} href={`/partners/${partner.slug}`}>
            <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer group">
              <CardHeader>
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-gray-100 rounded-lg shrink-0 w-14 h-14 flex items-center justify-center overflow-hidden">
                    {partner.logoUrl ? (
                      <Image
                        src={partner.logoUrl}
                        alt={`${partner.name} logo`}
                        width={48}
                        height={48}
                        className="object-contain w-full h-full"
                        unoptimized={isExternalUrl(partner.logoUrl)}
                      />
                    ) : (
                      <Building2 className="h-6 w-6 text-gray-600" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <CardTitle className="text-lg group-hover:text-primary transition-colors flex items-center gap-2">
                      {partner.name}
                      <ArrowRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </CardTitle>
                    <div className="flex flex-wrap gap-1 mt-2">
                      {partner.focus.map((f) => (
                        <Badge key={f} variant="secondary" className="text-xs">
                          {f}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-sm mb-3 line-clamp-2">
                  {partner.shortDescription}
                </CardDescription>
                <div className="flex flex-wrap gap-1">
                  {partner.regions.slice(0, 3).map((r) => (
                    <Badge key={r} variant="outline" className="text-xs">
                      {r}
                    </Badge>
                  ))}
                  {partner.regions.length > 3 && (
                    <Badge variant="outline" className="text-xs">
                      +{partner.regions.length - 3} more
                    </Badge>
                  )}
                </div>
                {partner.tags && partner.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1 mt-2 pt-2 border-t">
                    {partner.tags.slice(0, 3).map((tag) => (
                      <span key={tag} className="text-xs text-gray-500">
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      {filteredPartners.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-600">No partners found matching your filters.</p>
        </div>
      )}
    </div>
  );
}
