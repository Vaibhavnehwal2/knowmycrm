import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { ArrowRight, CheckCircle2, Target, Users } from 'lucide-react';

export default function Home() {
  return (
    <div className="flex flex-col">
      <section className="container mx-auto px-4 py-16 lg:px-8 lg:py-24">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl lg:text-6xl">
            Find the right CRM & ERP fit — and the right implementation partner
          </h1>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Share your workflows, integrations, and constraints. KnowMyCRM returns a shortlist (3–5 options), a demo script, and partner introductions—so you can decide with clarity, not guesswork.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/wizard">
              <Button size="lg" className="w-full sm:w-auto">
                Start Fit Wizard <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link href="/resources/crm-erp-selection-checklist">
              <Button variant="outline" size="lg" className="w-full sm:w-auto">
                Download CRM/ERP Checklist
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid gap-8 md:grid-cols-3">
            <Card>
              <CardHeader>
                <Target className="h-10 w-10 text-primary mb-2" />
                <CardTitle>Requirements Fitment</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-sm">
                  We capture sales, service, reporting, data rules, and integrations (ERP/accounting, website forms, WhatsApp, email/calendar, BI).
                </CardDescription>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CheckCircle2 className="h-10 w-10 text-primary mb-2" />
                <CardTitle>Shortlist + Rationale</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-sm">
                  Get 3–5 best-fit options with trade-offs and a controlled demo script.
                </CardDescription>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Users className="h-10 w-10 text-primary mb-2" />
                <CardTitle>Partner Match</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-sm">
                  Partner introductions aligned to platform + industry + scope, plus due diligence prompts.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 py-16 lg:px-8 lg:py-24">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl text-center mb-12">
            Frequently Asked Questions
          </h2>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger className="text-left">
                Are you vendor-neutral?
              </AccordionTrigger>
              <AccordionContent>
                Yes. Shortlists are fit-based, not sponsorship-based.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-2">
              <AccordionTrigger className="text-left">
                Do we shortlist tools ourselves?
              </AccordionTrigger>
              <AccordionContent>
                No. You provide inputs; KnowMyCRM shortlists and explains trade-offs.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-3">
              <AccordionTrigger className="text-left">
                Do you implement?
              </AccordionTrigger>
              <AccordionContent>
                We introduce partners; optional oversight. Contracting remains between you and the partner.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-4">
              <AccordionTrigger className="text-left">
                Do you cover ERP?
              </AccordionTrigger>
              <AccordionContent>
                Yes—ERP touchpoints and integration requirements are mapped so CRM decisions don't break operations.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>

      <section className="bg-primary py-16">
        <div className="container mx-auto px-4 lg:px-8 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Ready to find your CRM fit?
          </h2>
          <p className="mt-4 text-lg text-white/90">
            Start with our 8-step fit wizard and get a personalized shortlist.
          </p>
          <div className="mt-8">
            <Link href="/wizard">
              <Button size="lg" variant="secondary">
                Start Fit Wizard <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
