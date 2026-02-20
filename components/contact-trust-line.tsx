'use client';

import { Phone } from 'lucide-react';

interface ContactTrustLineProps {
  className?: string;
}

// Hardcoded for client-side usage (no fs access)
const PHONES = {
  india: { display: '+91 9315156055', raw: '+919315156055' },
  romania: { display: '+40 754 324 179', raw: '+40754324179' },
};

export function ContactTrustLine({ className = '' }: ContactTrustLineProps) {
  return (
    <div className={`flex items-center justify-center gap-2 text-sm text-gray-500 ${className}`}>
      <Phone className="h-4 w-4 shrink-0" />
      <span>Prefer to speak directly?</span>
      <a
        href={`tel:${PHONES.india.raw}`}
        className="text-primary hover:underline font-medium"
      >
        {PHONES.india.display}
      </a>
      <span className="text-gray-400">/</span>
      <a
        href={`tel:${PHONES.romania.raw}`}
        className="text-primary hover:underline font-medium"
      >
        {PHONES.romania.display}
      </a>
    </div>
  );
}

export default ContactTrustLine;
