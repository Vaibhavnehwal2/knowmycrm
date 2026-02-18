"use client";

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { CheckCircle2, Download, ArrowRight } from 'lucide-react';

export default function ChecklistLandingPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          source: 'checklist',
          ...formData,
        }),
      });

      if (response.ok) {
        setSubmitted(true);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="container mx-auto px-4 py-16 lg:px-8 lg:py-24">
        <div className="mx-auto max-w-2xl text-center">
          <div className="mb-6 flex justify-center">
            <CheckCircle2 className="h-16 w-16 text-green-600" />
          </div>
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 mb-4">
            Thank you!
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            Your checklist download will be available soon. We'll send it to your email.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/wizard">
              <Button size="lg">
                Start Fit Wizard <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link href="/book">
              <Button variant="outline" size="lg">
                Book a Call
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      <section className="container mx-auto px-4 py-16 lg:px-8 lg:py-24">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left: Copy */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <Download className="h-10 w-10 text-primary" />
              <h1 className="text-4xl font-bold tracking-tight text-gray-900">
                CRM/ERP Selection Checklist
              </h1>
            </div>
            <p className="text-lg text-gray-600 mb-8">
              Audit your selection process with our comprehensive checklist. Covers requirements, fitment, partner evaluation, and implementation readiness.
            </p>

            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="h-6 w-6 text-primary shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-gray-900">Requirements Mapping</h3>
                  <p className="text-sm text-gray-600">
                    Capture workflows, integrations, and data rules beyond feature checklists
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <CheckCircle2 className="h-6 w-6 text-primary shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-gray-900">Fitment Criteria</h3>
                  <p className="text-sm text-gray-600">
                    Evaluate CRM/ERP options based on your scale, complexity, and ecosystem
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <CheckCircle2 className="h-6 w-6 text-primary shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-gray-900">Partner Due Diligence</h3>
                  <p className="text-sm text-gray-600">
                    Questions to ask implementation partners before signing contracts
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <CheckCircle2 className="h-6 w-6 text-primary shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-gray-900">Implementation Readiness</h3>
                  <p className="text-sm text-gray-600">
                    Check your org readiness for change management and adoption
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <CheckCircle2 className="h-6 w-6 text-primary shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-gray-900">ERP Integration Touchpoints</h3>
                  <p className="text-sm text-gray-600">
                    Map CRM-ERP integration needs to avoid post-go-live surprises
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Form */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Download Checklist</CardTitle>
                <CardDescription>
                  Enter your details to get the checklist sent to your email.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Name *</Label>
                    <Input
                      id="name"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="John Doe"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email *</Label>
                    <Input
                      id="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="john@company.com"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="company">Company *</Label>
                    <Input
                      id="company"
                      required
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      placeholder="Company Name"
                    />
                  </div>

                  <Button type="submit" className="w-full" disabled={loading}>
                    {loading ? 'Submitting...' : 'Download Checklist'}
                  </Button>
                </form>
              </CardContent>
            </Card>

            <div className="mt-6 text-center text-sm text-gray-600">
              Prefer to get a personalized shortlist?{' '}
              <Link href="/wizard" className="text-primary hover:underline">
                Take the Fit Wizard
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
