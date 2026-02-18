import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, Building2, Factory, Ship } from 'lucide-react';

export default function IndustriesPage() {
  const industries = [
    {
      title: 'Services',
      description: 'Lead→opportunity→delivery, renewals, handoffs',
      icon: Building2,
      href: '/industries/services',
    },
    {
      title: 'Manufacturing',
      description: 'Quoting, pricing approvals, dealer/distributor, service/warranty',
      icon: Factory,
      href: '/industries/manufacturing',
    },
    {
      title: 'Exporters',
      description: 'Documentation, approvals, shipment status, claims',
      icon: Ship,
      href: '/industries/exporters',
    },
  ];

  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="container mx-auto px-4 py-16 lg:px-8 lg:py-24">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            Industry-Specific CRM & ERP Guidance
          </h1>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Understand what matters most for your industry — workflows, integrations, and common pitfalls.
          </p>
        </div>
      </section>

      {/* Industry Cards */}
      <section className="container mx-auto px-4 pb-16 lg:px-8 lg:pb-24">
        <div className="grid gap-8 md:grid-cols-3">
          {industries.map((industry) => {
            const Icon = industry.icon;
            return (
              <Link key={industry.href} href={industry.href}>
                <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer">
                  <CardHeader>
                    <Icon className="h-10 w-10 text-primary mb-2" />
                    <CardTitle className="text-2xl">{industry.title}</CardTitle>
                    <CardDescription className="text-sm">
                      {industry.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center text-sm text-primary font-medium">
                      Learn more <ArrowRight className="ml-2 h-4 w-4" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4 lg:px-8 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900">
            Get industry-specific recommendations
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Answer 8 questions about your workflows and we'll send you a shortlist.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/wizard">
              <Button size="lg">
                Start Fit Wizard <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link href="/resources/crm-erp-selection-checklist">
              <Button variant="outline" size="lg">
                Download Checklist
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
