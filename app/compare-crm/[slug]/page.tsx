import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getCRMBySlug, getAllCRMs } from '@/lib/data';
import { BrandIcon } from '@/components/brand-icon';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, CheckCircle2, XCircle, AlertCircle } from 'lucide-react';

export async function generateStaticParams() {
  const crms = getAllCRMs();
  return crms.map((crm) => ({
    slug: crm.slug,
  }));
}

export default function CRMProfilePage({ params }: { params: { slug: string } }) {
  const crm = getCRMBySlug(params.slug);

  if (!crm) {
    notFound();
  }

  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex items-center gap-4 mb-4">
            <BrandIcon iconName={crm.icon} name={crm.name} className="h-12 w-12" />
            <div>
              <h1 className="text-4xl font-bold tracking-tight text-gray-900">
                {crm.name}
              </h1>
              <p className="text-lg text-gray-600 mt-2">{crm.tagline}</p>
            </div>
          </div>
          <div className="flex gap-2 mt-4">
            <Badge variant="secondary">{crm.filters.complexity} complexity</Badge>
            <Badge variant="outline">{crm.filters.ecosystem}</Badge>
            {crm.filters.teamSize.map((size) => (
              <Badge key={size} variant="outline">{size} users</Badge>
            ))}
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="container mx-auto px-4 py-16 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-2">
          {/* Best For */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-green-600" />
                Best For
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {crm.bestFor.map((item, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-green-600 mt-1">•</span>
                    <span className="text-sm text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Choose When */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-blue-600" />
                Choose When
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {crm.chooseWhen.map((item, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-blue-600 mt-1">•</span>
                    <span className="text-sm text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Avoid When */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <XCircle className="h-5 w-5 text-red-600" />
                Avoid When
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {crm.avoidWhen.map((item, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-red-600 mt-1">•</span>
                    <span className="text-sm text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Implementation Reality */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertCircle className="h-5 w-5 text-orange-600" />
                Implementation Reality
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {crm.implementationReality.map((item, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-orange-600 mt-1">•</span>
                    <span className="text-sm text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* ERP Touchpoints */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>ERP Touchpoints</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {crm.erpTouchpoints.map((item, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span className="text-sm text-gray-700">{item}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        {/* Demo Questions */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Demo Questions to Ask</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {crm.demoQuestions.map((item, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-primary mt-1">{i + 1}.</span>
                  <span className="text-sm text-gray-700">{item}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </section>

      {/* Trademark Disclaimer */}
      <section className="bg-gray-50 py-8">
        <div className="container mx-auto px-4 lg:px-8">
          <p className="text-xs text-gray-500 text-center">
            All trademarks and logos are property of their respective owners. Used for identification only.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-primary py-16">
        <div className="container mx-auto px-4 lg:px-8 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-white">
            Is {crm.name} right for you?
          </h2>
          <p className="mt-4 text-lg text-white/90">
            Take our Fit Wizard to get a personalized shortlist and demo script.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/wizard">
              <Button size="lg" variant="secondary">
                Start Fit Wizard <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link href="/book">
              <Button size="lg" variant="outline" className="bg-white hover:bg-gray-100">
                Book a Call
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
