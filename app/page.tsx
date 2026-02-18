import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { ArrowRight, CheckCircle, Target, Users, FileCheck, Lightbulb, UserCheck } from 'lucide-react';

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-blue-50 to-white py-20 sm:py-28">
        <div className="container mx-auto max-w-6xl px-4 md:px-6">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
              Find the right CRM & ERP fit — and the right implementation partner
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600 sm:text-xl">
              Share your workflows, integrations, and constraints. KnowMyCRM returns a shortlist (3–5 options), a demo script, and partner introductions—so you can decide with clarity, not guesswork.
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link href="/wizard">
                <Button size="lg" className="w-full sm:w-auto text-base">
                  Start Fit Wizard <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/resources/crm-erp-selection-checklist">
                <Button variant="outline" size="lg" className="w-full sm:w-auto text-base">
                  Download Checklist
                </Button>
              </Link>
            </div>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-600" />
                <span>Vendor-neutral</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-600" />
                <span>No sponsorship bias</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-600" />
                <span>ERP touchpoints mapped</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Value Props */}
      <section className="py-16 sm:py-20">
        <div className="container mx-auto max-w-6xl px-4 md:px-6">
          <div className="grid gap-8 md:grid-cols-3">
            <Card className="border-2 hover:border-primary/50 transition-colors">
              <CardHeader>
                <Target className="h-12 w-12 text-primary mb-4" />
                <CardTitle className="text-xl">Requirements Fitment</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base leading-relaxed">
                  We capture sales, service, reporting, data rules, and integrations (ERP/accounting, website forms, WhatsApp, email/calendar, BI).
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-primary/50 transition-colors">
              <CardHeader>
                <FileCheck className="h-12 w-12 text-primary mb-4" />
                <CardTitle className="text-xl">Shortlist + Rationale</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base leading-relaxed">
                  Get 3–5 best-fit options with trade-offs and a controlled demo script.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-primary/50 transition-colors">
              <CardHeader>
                <Users className="h-12 w-12 text-primary mb-4" />
                <CardTitle className="text-xl">Partner Match</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base leading-relaxed">
                  Partner introductions aligned to platform + industry + scope, plus due diligence prompts.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-gray-50 py-16 sm:py-20">
        <div className="container mx-auto max-w-6xl px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              How It Works
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Three simple steps to find your perfect CRM fit
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-3">
            <div className="text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary text-white text-2xl font-bold">
                1
              </div>
              <h3 className="text-xl font-semibold mb-2">Share Requirements</h3>
              <p className="text-gray-600">
                Complete our 8-step wizard covering workflows, integrations, scale, and constraints
              </p>
            </div>
            <div className="text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary text-white text-2xl font-bold">
                2
              </div>
              <h3 className="text-xl font-semibold mb-2">Get Shortlist</h3>
              <p className="text-gray-600">
                Receive a curated list of 3–5 options with rationale, trade-offs, and demo scripts
              </p>
            </div>
            <div className="text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary text-white text-2xl font-bold">
                3
              </div>
              <h3 className="text-xl font-semibold mb-2">Meet Partners</h3>
              <p className="text-gray-600">
                Connect with vetted implementation partners matched to your platform and industry
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Who It's For */}
      <section className="py-16 sm:py-20">
        <div className="container mx-auto max-w-6xl px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Who We Help
            </h2>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { title: 'Services Companies', desc: 'Lead → opportunity → delivery with renewals' },
              { title: 'Manufacturers', desc: 'Quoting, pricing approvals, dealer channels' },
              { title: 'Exporters', desc: 'Documentation, compliance, shipment tracking' },
              { title: 'Growing Teams', desc: 'Scaling from 20 to 200+ users' },
              { title: 'Complex Sales', desc: 'Multi-stage workflows with governance' },
              { title: 'ERP-Heavy Ops', desc: 'Deep CRM-ERP integration requirements' },
            ].map((item, idx) => (
              <Card key={idx} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <CardTitle className="text-lg">{item.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600">{item.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-gray-50 py-16 sm:py-20">
        <div className="container mx-auto max-w-3xl px-4 md:px-6">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl text-center mb-12">
            Frequently Asked Questions
          </h2>
          <Accordion type="single" collapsible className="w-full space-y-4">
            <AccordionItem value="item-1" className="border rounded-lg px-6 bg-white">
              <AccordionTrigger className="text-left hover:no-underline">
                <span className="font-semibold">Are you vendor-neutral?</span>
              </AccordionTrigger>
              <AccordionContent className="text-gray-600 pt-2">
                Yes. Shortlists are fit-based, not sponsorship-based.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-2" className="border rounded-lg px-6 bg-white">
              <AccordionTrigger className="text-left hover:no-underline">
                <span className="font-semibold">Do we shortlist tools ourselves?</span>
              </AccordionTrigger>
              <AccordionContent className="text-gray-600 pt-2">
                No. You provide inputs; KnowMyCRM shortlists and explains trade-offs.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-3" className="border rounded-lg px-6 bg-white">
              <AccordionTrigger className="text-left hover:no-underline">
                <span className="font-semibold">Do you implement?</span>
              </AccordionTrigger>
              <AccordionContent className="text-gray-600 pt-2">
                We introduce partners; optional oversight. Contracting remains between you and the partner.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-4" className="border rounded-lg px-6 bg-white">
              <AccordionTrigger className="text-left hover:no-underline">
                <span className="font-semibold">Do you cover ERP?</span>
              </AccordionTrigger>
              <AccordionContent className="text-gray-600 pt-2">
                Yes—ERP touchpoints and integration requirements are mapped so CRM decisions don't break operations.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-primary py-16 sm:py-20">
        <div className="container mx-auto max-w-4xl px-4 md:px-6 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Ready to find your CRM fit?
          </h2>
          <p className="mt-4 text-lg text-blue-100">
            Start with our 8-step fit wizard and get a personalized shortlist.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/wizard">
              <Button size="lg" variant="secondary" className="w-full sm:w-auto text-base">
                Start Fit Wizard <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="/book">
              <Button size="lg" variant="outline" className="w-full sm:w-auto text-base bg-white hover:bg-gray-100 text-primary border-white">
                Book a Call
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
