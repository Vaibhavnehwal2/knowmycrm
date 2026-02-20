'use client';

import { MapPin, Phone } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { WhatsAppIcon, IndiaFlag, RomaniaFlag } from '@/components/social-icons';

export interface Address {
  line1: string;
  line2?: string;
  city: string;
  state?: string;
  postalCode?: string;
  country: string;
}

export interface Location {
  name: string;
  address: Address;
  phone: string;
  phoneRaw: string;
  whatsapp?: string;
}

// WhatsApp URLs
const WHATSAPP_URLS: Record<string, string> = {
  'India': 'https://wa.me/919315156055',
  'Romania': 'https://wa.me/40754324179',
};

// Flag component selector
function CountryFlag({ country, className = 'h-6 w-8' }: { country: string; className?: string }) {
  if (country === 'India') {
    return <IndiaFlag className={className} />;
  }
  return <RomaniaFlag className={className} />;
}

interface ContactCardProps {
  location: Location;
  variant?: 'default' | 'compact';
}

export function ContactCard({ location, variant = 'default' }: ContactCardProps) {
  const { name, address, phone, phoneRaw } = location;
  const whatsappUrl = location.whatsapp || WHATSAPP_URLS[name];
  const flag = name === 'India' ? '🇮🇳' : '🇷🇴';

  if (variant === 'compact') {
    return (
      <div className="space-y-2">
        <h4 className="font-semibold text-gray-900 text-sm flex items-center gap-1.5">
          <span>{flag}</span>
          <span>{name}</span>
        </h4>
        <div className="space-y-1.5">
          <a
            href={`tel:${phoneRaw}`}
            className="flex items-center gap-2 text-sm text-gray-600 hover:text-primary transition-colors"
          >
            <Phone className="h-3.5 w-3.5 shrink-0" />
            <span>{phone}</span>
          </a>
          {whatsappUrl && (
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm text-gray-600 hover:text-[#25D366] transition-colors"
            >
              <WhatsAppIcon className="h-3.5 w-3.5 shrink-0" />
              <span>WhatsApp</span>
            </a>
          )}
          <div className="flex items-start gap-2 text-sm text-gray-600">
            <MapPin className="h-3.5 w-3.5 shrink-0 mt-0.5" />
            <div className="leading-relaxed">
              <div>{address.line1}</div>
              {address.line2 && <div>{address.line2}</div>}
              <div>
                {address.city}
                {address.state && `, ${address.state}`}
                {address.postalCode && ` ${address.postalCode}`}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <span className="text-2xl">{flag}</span>
          {name}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Phone */}
        <a
          href={`tel:${phoneRaw}`}
          className="flex items-center gap-3 p-3 bg-primary/5 rounded-lg hover:bg-primary/10 transition-colors group"
        >
          <div className="p-2 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
            <Phone className="h-5 w-5 text-primary" />
          </div>
          <div>
            <div className="text-sm text-gray-500">Phone</div>
            <div className="font-semibold text-gray-900">{phone}</div>
          </div>
        </a>
        
        {/* WhatsApp */}
        {whatsappUrl && (
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 p-3 bg-[#25D366]/5 rounded-lg hover:bg-[#25D366]/10 transition-colors group"
          >
            <div className="p-2 bg-[#25D366]/10 rounded-lg group-hover:bg-[#25D366]/20 transition-colors">
              <WhatsAppIcon className="h-5 w-5 text-[#25D366]" />
            </div>
            <div>
              <div className="text-sm text-gray-500">WhatsApp</div>
              <div className="font-semibold text-gray-900">Message us</div>
            </div>
          </a>
        )}
        
        {/* Address */}
        <div className="flex items-start gap-3">
          <div className="p-2 bg-gray-100 rounded-lg">
            <MapPin className="h-5 w-5 text-gray-600" />
          </div>
          <div>
            <div className="text-sm text-gray-500 mb-1">Address</div>
            <div className="text-gray-900 leading-relaxed">
              <div>{address.line1}</div>
              {address.line2 && <div>{address.line2}</div>}
              <div>
                {address.city}
                {address.state && `, ${address.state}`}
              </div>
              {address.postalCode && <div>{address.postalCode}</div>}
              <div className="font-medium">{address.country}</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default ContactCard;
