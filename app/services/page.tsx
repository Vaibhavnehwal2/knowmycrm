import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle2, ArrowRight } from 'lucide-react';

export default function ServicesPage() {
  const services = [
    {
      title: 'CRM/ERP Fitment',
      description: 'We capture your true requirements beyond feature checklists',
      deliverables: [
        'Workflow mapping (sales, service, approvals, reporting)',
        'Integration requirements (ERP, accounting, BI, website, WhatsApp)',
        'Data rules and governance needs',
        'Growth trajectory and scale considerations',
        'Ecosystem alignment (Microsoft, Salesforce, independent)',
        'Budget and timeline constraints',
      ],
    },
    {
      title: 'Shortlist + Evaluation Pack',
      description: 'Evidence-based shortlist with trade-offs, not vendor pitches',
      deliverables: [
        '3–5 best-fit options with clear rationale',
        'Trade-off analysis (features, cost, complexity, adoption)',
        'Controlled demo script based on your workflows',
        'Implementation reality check for each option',
        'ERP/accounting integration patterns',
        'Total cost of ownership projections',
      ],
    },
    {
      title: 'Implementation Partner Match',
      description: 'Introductions to certified partners with proven track records',
      deliverables: [
        'Partner shortlist (3–5) aligned to platform + industry',
        'Reference checks and project history review',
        'Due diligence prompts for partner evaluation',
        'Scope and proposal review support',
        'Contract red-flag identification',
        'Partner introduction and coordination',
      ],
    },
    {
      title: 'Independent Oversight (Optional)',
      description: 'Neutral checkpoint during implementation to catch issues early',
      deliverables: [
        'Milestone reviews (data model, workflows, integrations)',
        'UAT and go-live readiness checks',
        'Issue identification and resolution paths',
        'Adoption and change management guidance',
      ],
    },
  ];

  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="container mx-auto px-4 py-16 lg:px-8 lg:py-24">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            Services
          </h1>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            We help you choose the right CRM and ERP, and connect you with the right implementation partners.
          </p>
        </div>
      </section>

      {/* Services */}
      <section className="container mx-auto px-4 pb-16 lg:px-8 lg:pb-24">
        <div className="grid gap-8 md:grid-cols-2">
          {services.map((service, index) => (
            <Card key={index} className="flex flex-col">
              <CardHeader>
                <CardTitle className="text-2xl">{service.title}</CardTitle>
                <CardDescription className="text-base">
                  {service.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-1">
                <ul className="space-y-2">
                  {service.deliverables.map((item, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                      <span className="text-sm text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4 lg:px-8 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900">
            Get started with the Fit Wizard
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Answer 8 questions about your workflows and we'll send you a shortlist.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
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
      </section>
    </div>
  );
}
