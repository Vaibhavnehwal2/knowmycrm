import Link from 'next/link';
import { getAllServices } from '@/lib/data';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, CheckCircle } from 'lucide-react';

export default function ServicesPage() {
  const services = getAllServices();

  return (
    <div className="flex flex-col">
      <section className="bg-gradient-to-b from-blue-50 to-white py-16 sm:py-20">
        <div className="container mx-auto max-w-6xl px-4 md:px-6">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl mb-6">
              Services
            </h1>
            <p className="text-lg text-gray-600">
              We help you choose the right CRM and ERP, and connect you with the right implementation partners.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className="container mx-auto max-w-6xl px-4 md:px-6">
          <div className="grid gap-8 md:grid-cols-2">
            {services.map((service) => (
              <Card key={service.slug} className="flex flex-col hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="text-2xl">{service.name}</CardTitle>
                  <CardDescription className="text-base mt-2">
                    {service.summary}
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-semibold text-sm text-gray-900 mb-3">Key Outcomes:</h3>
                    <ul className="space-y-2 mb-6">
                      {service.outcomes.map((outcome, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <CheckCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                          <span className="text-sm text-gray-700">{outcome}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <Link href={`/services/${service.slug}`}>
                    <Button className="w-full">
                      View Service <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-gray-50 py-16 sm:py-20">
        <div className="container mx-auto max-w-4xl px-4 md:px-6 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 mb-4">
            Get started with the Fit Wizard
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Answer 8 questions about your workflows and we'll send you a shortlist.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
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
    </div>
  );
}
