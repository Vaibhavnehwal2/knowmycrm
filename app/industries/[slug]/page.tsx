import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getIndustryBySlug, getAllIndustries } from '@/lib/data';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, CheckCircle } from 'lucide-react';

export const dynamic = 'force-static';
export const dynamicParams = false;
export const revalidate = 86400;

export async function generateStaticParams() {
  const industries = getAllIndustries();
  return industries.map((industry) => ({
    slug: industry.slug,
  }));
}

function generateIndustryContent(industry: any) {
  const isServices = industry.category === 'Services';
  const isManufacturing = industry.category === 'Manufacturing';
  
  return {
    workflows: isServices ? [
      'Lead capture from website, referrals, and events',
      'Opportunity management with stage-based pipeline',
      'Proposal generation and contract management',
      'Project/delivery kickoff and handoff workflows',
      'Renewals and upsell tracking'
    ] : isManufacturing ? [
      'Quote generation with BOMs and configurations',
      'Pricing approval workflows',
      'Order processing and ERP sync',
      'Delivery and shipment tracking',
      'After-sales service and warranty management'
    ] : [
      'Lead and opportunity management',
      'Customer onboarding workflows',
      'Service delivery and case management',
      'Billing and revenue tracking',
      'Renewal and retention workflows'
    ],
    
    whatMatters: [
      'Process automation: Reduce manual work and improve efficiency',
      'Data quality: Clean, accurate customer and pipeline data',
      'Integration: Connect CRM with other business systems',
      'Reporting: Actionable insights for decision-making',
      'User adoption: Easy to use with minimal training required'
    ],
    
    commonPitfalls: [
      'Over-customization: Adding too many features leads to complexity',
      'Weak ERP integration: Manual data entry creates errors',
      'Ignoring mobile: Field teams need mobile access',
      'Poor change management: CRM fails without training',
      'Wrong partner choice: Selecting based on price not expertise'
    ],
    
    integrationTouchpoints: [
      'ERP/Accounting: Quote-to-invoice, customer data, order status',
      'Website forms: Lead capture from contact forms',
      'Email/Calendar: Activity tracking, meeting scheduling',
      'BI/Analytics: Revenue dashboards, pipeline analytics',
      'Marketing automation: Campaign management, lead scoring',
      'Support systems: Case management, ticket routing'
    ]
  };
}

export default function IndustryPage({ params }: { params: { slug: string } }) {
  const industry = getIndustryBySlug(params.slug);

  if (!industry) {
    notFound();
  }

  const content = generateIndustryContent(industry);

  return (
    <div className="flex flex-col">
      <section className="bg-gradient-to-b from-blue-50 to-white py-16 sm:py-20">
        <div className="container mx-auto max-w-4xl px-4 md:px-6">
          <Badge variant="secondary" className="mb-4">{industry.category}</Badge>
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl mb-6">
            CRM & ERP for {industry.name}
          </h1>
          <p className="text-lg text-gray-600">{industry.summary}</p>
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className="container mx-auto max-w-4xl px-4 md:px-6 space-y-12">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle className="h-6 w-6 text-primary" />
                Typical Workflows
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {content.workflows.map((item, idx) => (
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
              <CardTitle className="flex items-center gap-2">
                <CheckCircle className="h-6 w-6 text-primary" />
                What Matters Most
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {content.whatMatters.map((item, idx) => (
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
              <CardTitle className="flex items-center gap-2">
                <CheckCircle className="h-6 w-6 text-red-600" />
                Common Pitfalls
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {content.commonPitfalls.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <span className="text-red-600 mt-1">•</span>
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle className="h-6 w-6 text-primary" />
                Integration Touchpoints
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {content.integrationTouchpoints.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <span className="text-primary mt-1">•</span>
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="bg-primary py-16 sm:py-20">
        <div className="container mx-auto max-w-4xl px-4 md:px-6 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Ready to find your CRM fit?
          </h2>
          <p className="mt-4 text-lg text-blue-100">
            Get a personalized shortlist based on your workflows.
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
