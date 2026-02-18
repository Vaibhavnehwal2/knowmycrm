import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getServiceBySlug, getAllServices } from '@/lib/data';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Separator } from '@/components/ui/separator';
import { ArrowRight, CheckCircle, Clock } from 'lucide-react';

export async function generateStaticParams() {
  const services = getAllServices();
  return services.map((service) => ({
    slug: service.slug,
  }));
}

export default function ServicePage({ params }: { params: { slug: string } }) {
  const service = getServiceBySlug(params.slug);

  if (!service) {
    notFound();
  }

  return (
    <div className="flex flex-col">
      <section className="bg-gradient-to-b from-blue-50 to-white py-16 sm:py-20">
        <div className="container mx-auto max-w-4xl px-4 md:px-6">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl mb-6">
            {service.name}
          </h1>
          <p className="text-xl text-gray-700 mb-8">
            {service.summary}
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/wizard">
              <Button size="lg">
                Start Fit Wizard <ArrowRight className="ml-2 h-5 w-5" />
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

      <section className="py-16 sm:py-20">
        <div className="container mx-auto max-w-4xl px-4 md:px-6 space-y-12">
          <Card>
            <CardHeader>
              <CardTitle>What this service is</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {service.whatThisIs.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <span className="text-primary mt-1">•</span>
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>What you get</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {service.deliverables.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Best for</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {service.bestFor.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-600 shrink-0 mt-0.5" />
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>How it works</CardTitle>
            </CardHeader>
            <CardContent>
              <ol className="space-y-4">
                {service.howItWorks.map((step, idx) => (
                  <li key={idx} className="flex items-start gap-4">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-white text-sm font-bold">
                      {idx + 1}
                    </div>
                    <span className="text-gray-700 pt-1">{step}</span>
                  </li>
                ))}
              </ol>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>What we need from you</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {service.inputsNeeded.map((input, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <span className="text-primary mt-1">•</span>
                    <span className="text-gray-700">{input}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-primary" />
                Typical timeline
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700">{service.timeline}</p>
            </CardContent>
          </Card>

          {service.faqs && service.faqs.length > 0 && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
              <Accordion type="single" collapsible className="w-full">
                {service.faqs.map((faq, idx) => (
                  <AccordionItem key={idx} value={`item-${idx}`} className="border rounded-lg px-6 mb-4 bg-white">
                    <AccordionTrigger className="text-left hover:no-underline">
                      <span className="font-semibold">{faq.q}</span>
                    </AccordionTrigger>
                    <AccordionContent className="text-gray-600 pt-2">
                      {faq.a}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          )}
        </div>
      </section>

      <section className="bg-primary py-16 sm:py-20">
        <div className="container mx-auto max-w-4xl px-4 md:px-6 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Ready to get started?
          </h2>
          <p className="mt-4 text-lg text-blue-100">
            Take the Fit Wizard or book a call to discuss your needs.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/wizard">
              <Button size="lg" variant="secondary">
                Start Fit Wizard <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="/resources/crm-erp-selection-checklist">
              <Button size="lg" variant="outline" className="bg-white hover:bg-gray-100 text-primary border-white">
                Download Checklist
              </Button>
            </Link>
            <Link href="/book">
              <Button size="lg" variant="outline" className="bg-white hover:bg-gray-100 text-primary border-white">
                Book a Call
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
