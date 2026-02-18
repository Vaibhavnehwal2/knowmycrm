'use client';
import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

export default function WizardPage() {
  const [submitted, setSubmitted] = useState(false);
  
  if (submitted) {
    return (
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-3xl font-bold mb-4">Thanks!</h1>
        <p>We'll send your shortlist plan.</p>
        <Link href="/"><Button>Back to Home</Button></Link>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-3xl font-bold mb-8">CRM Fit Wizard</h1>
      <Card className="p-8">
        <p className="mb-4">8-step wizard coming soon. For now, please book a call.</p>
        <Link href="/book"><Button>Book a Call</Button></Link>
      </Card>
    </div>
  );
}
