'use client';

import { Phone } from 'lucide-react';
import { WhatsAppIcon } from '@/components/social-icons';

interface ContactTrustLineProps {
  className?: string;
  showWhatsApp?: boolean;
}

// Hardcoded for client-side usage (no fs access)
const CONTACT = {
  india: { 
    display: '+91 9315156055', 
    raw: '+919315156055',
    whatsapp: 'https://wa.me/919315156055',
  },
  romania: { 
    display: '+40 754 324 179', 
    raw: '+40754324179',
    whatsapp: 'https://wa.me/40754324179',
  },
};

export function ContactTrustLine({ className = '', showWhatsApp = true }: ContactTrustLineProps) {
  return (
    <div className={`text-sm text-gray-500 ${className}`}>
      <div className="flex flex-wrap items-center justify-center gap-x-2 gap-y-1">
        <span className="flex items-center gap-1.5">
          <Phone className="h-4 w-4 shrink-0" />
          <span>Prefer to speak directly?</span>
        </span>
        <span className="flex items-center gap-1.5">
          <a
            href={`tel:${CONTACT.india.raw}`}
            className="text-primary hover:underline font-medium"
          >
            🇮🇳 {CONTACT.india.display}
          </a>
          <span className="text-gray-400">/</span>
          <a
            href={`tel:${CONTACT.romania.raw}`}
            className="text-primary hover:underline font-medium"
          >
            🇷🇴 {CONTACT.romania.display}
          </a>
        </span>
      </div>
      
      {showWhatsApp && (
        <div className="flex flex-wrap items-center justify-center gap-x-2 gap-y-1 mt-2">
          <span className="flex items-center gap-1.5">
            <WhatsAppIcon className="h-4 w-4 shrink-0 text-[#25D366]" />
            <span>WhatsApp:</span>
          </span>
          <span className="flex items-center gap-1.5">
            <a
              href={CONTACT.india.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#25D366] hover:underline font-medium"
            >
              🇮🇳 India
            </a>
            <span className="text-gray-400">/</span>
            <a
              href={CONTACT.romania.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#25D366] hover:underline font-medium"
            >
              🇷🇴 Romania
            </a>
          </span>
        </div>
      )}
    </div>
  );
}

export default ContactTrustLine;
