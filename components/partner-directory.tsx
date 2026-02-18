'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { ExternalLink } from 'lucide-react';
import type { Partner } from '@/types';

interface PartnerDirectoryProps {
  partners: Partner[];
}

export function PartnerDirectory({ partners }: PartnerDirectoryProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [focusFilter, setFocusFilter] = useState<string>('All');
  const [regionFilter, setRegionFilter] = useState<string>('All');

  const filteredPartners = partners.filter((partner) => {
    const matchesSearch = partner.name.toLowerCase().includes(searchQuery.toLowerCase());
    
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
        {filteredPartners.map((partner, idx) => (
          <Card key={idx} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="text-lg">
                <a
                  href={partner.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-primary transition-colors flex items-center gap-2"
                >
                  {partner.name}
                  <ExternalLink className="h-4 w-4" />
                </a>
              </CardTitle>
              <div className="flex flex-wrap gap-2 mt-2">
                {partner.focus.map((f) => (
                  <Badge key={f} variant="secondary">
                    {f}
                  </Badge>
                ))}
                {partner.regions.map((r) => (
                  <Badge key={r} variant="outline" className="text-xs">
                    {r}
                  </Badge>
                ))}
              </div>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-sm mb-4">
                {partner.notes}
              </CardDescription>
              <a
                href={partner.website}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button size="sm" className="w-full">
                  Visit Website <ExternalLink className="ml-2 h-4 w-4" />
                </Button>
              </a>
            </CardContent>
          </Card>
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
