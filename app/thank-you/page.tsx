'use client';

import { useEffect } from 'react';
import { CheckCircle2 } from 'lucide-react';

export default function ThankYouPage() {
  useEffect(() => {
    // Signal to parent window that Web-to-Lead submission completed
    if (typeof window !== 'undefined' && window.parent !== window) {
      window.parent.postMessage({ type: 'KMC_W2L_SUCCESS' }, '*');
    }
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="text-center p-8">
        <CheckCircle2 className="h-12 w-12 text-green-600 mx-auto mb-4" />
        <p className="text-gray-600">Thanks — submitted.</p>
      </div>
    </div>
  );
}
