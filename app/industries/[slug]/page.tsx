import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getIndustryBySlug, getAllIndustries } from '@/lib/data';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, CheckCircle } from 'lucide-react';

export async function generateStaticParams() {
  const industries = getAllIndustries();
  return industries.map((industry) => ({
    slug: industry.slug,
  }));
}

// Generate comprehensive content for each industry
function generateIndustryContent(industry: any) {
  const isServices = industry.category === 'Services';
  const isManufacturing = industry.category === 'Manufacturing';
  const isCommerce = industry.category === 'Commerce';
  const isLogistics = industry.category === 'Logistics';
  
  return {
    workflows: isServices ? [
      'Lead capture from website, referrals, and events',
      'Opportunity management with stage-based pipeline',
      'Proposal generation and contract management',
      'Project/delivery kickoff and handoff workflows',
      'Renewals and upsell tracking',
      'Customer success and support integration'
    ] : isManufacturing ? [
      'Quote generation with BOMs and configurations',
      'Pricing approval workflows',
      'Order processing and ERP sync',
      'Production/inventory visibility',
      'Delivery and shipment tracking',
      'After-sales service and warranty management'
    ] : isCommerce ? [
      'Product catalog and inventory management',
      'Order processing and fulfillment',
      'Customer service and support tickets',
      'Returns and refunds management',
      'Marketing campaigns and promotions',
      'Customer loyalty and retention programs'
    ] : isLogistics ? [
      'Shipment booking and scheduling',
      'Documentation and compliance workflows',
      'Track and trace visibility',
      'Claims and dispute management',
      'Billing and invoicing integration',
      'Performance metrics and SLA tracking'
    ] : [
      'Lead and opportunity management',
      'Customer onboarding workflows',
      'Service delivery and case management',
      'Billing and revenue tracking',
      'Renewal and retention workflows',
      'Reporting and analytics'
    ],
    
    whatMatters: isServices ? [
      'Adoption: Mobile-friendly, low training overhead for teams on the go',
      'Forecasting: Pipeline visibility and deal probability for revenue predictability',
      'Accounting integration: Seamless quote-to-invoice flow',
      'Project handoff: Smooth transition from sales to delivery teams',
      'Renewals tracking: Critical for recurring revenue businesses'
    ] : isManufacturing ? [
      'Governance: Workflow approvals for pricing exceptions and discounts',
      'ERP integration: Reliable quote-to-order sync is mission-critical',
      'Channel complexity: Partner/dealer portals if selling through channels',
      'Service after sale: Warranty, parts, and service case tracking',
      'Custom objects: Products, BOMs, configurations need proper data models'
    ] : isCommerce ? [
      'Customer experience: Fast response times and omnichannel support',
      'Inventory visibility: Real-time stock status for sales and support',
      'Marketing integration: Campaigns, segmentation, and automation',
      'Returns management: Efficient processing of returns and refunds',
      'Analytics: Customer behavior, conversion rates, and lifetime value'
    ] : isLogistics ? [
      'Visibility: Real-time tracking and status updates for shipments',
      'Documentation: Compliance docs, approvals, and audit trails',
      'Integration: Strong ERP/TMS connectivity for operations',
      'Claims handling: Efficient dispute and exception management',
      'Customer communication: Automated updates and notifications'
    ] : [
      'Process automation: Reduce manual work and improve efficiency',
      'Data quality: Clean, accurate customer and pipeline data',
      'Integration: Connect CRM with other business systems',
      'Reporting: Actionable insights for decision-making',
      'User adoption: Easy to use with minimal training required'
    ],
    
    commonPitfalls: [
      'Over-customization: Adding too many features leads to complexity and low adoption',
      'Weak ERP integration: Manual data entry creates errors and slows operations',
      'Ignoring mobile: Field teams need mobile access for real-time updates',
      'Poor change management: CRM fails without proper training and enforcement',
      'Wrong partner choice: Selecting based on price rather than proven expertise'
    ],
    
    integrationTouchpoints: [
      'ERP/Accounting: Quote-to-invoice, customer master data, order status',
      'Website forms: Lead capture from contact forms and demo requests',
      'Email/Calendar: Activity tracking, meeting scheduling, correspondence',
      'BI/Analytics: Revenue dashboards, pipeline analytics, forecasting',
      'Marketing automation: Campaign management, lead scoring, nurturing',
      'Support systems: Case management, ticket routing, customer history',
      'E-commerce platforms: Order sync, customer data, support integration',
      'Communication tools: WhatsApp, SMS, chat integration for customer engagement'
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
    <div className=\"flex flex-col\">
      {/* Hero */}
      <section className=\"bg-gradient-to-b from-blue-50 to-white py-16 sm:py-20\">
        <div className=\"container mx-auto max-w-4xl px-4 md:px-6\">
          <Badge variant=\"secondary\" className=\"mb-4\">{industry.category}</Badge>
          <h1 className=\"text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl mb-6\">
            CRM & ERP for {industry.name}
          </h1>
          <p className=\"text-lg text-gray-600\">
            {industry.summary}
          </p>
        </div>
      </section>

      {/* Content Sections */}
      <section className=\"py-16 sm:py-20\">
        <div className=\"container mx-auto max-w-4xl px-4 md:px-6 space-y-12\">
          {/* Typical Workflows */}
          <Card>
            <CardHeader>
              <CardTitle className=\"flex items-center gap-2\">
                <CheckCircle className=\"h-6 w-6 text-primary\" />
                Typical Workflows
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className=\"space-y-3\">
                {content.workflows.map((item, idx) => (
                  <li key={idx} className=\"flex items-start gap-3\">
                    <span className=\"text-primary mt-1\">•</span>
                    <span className=\"text-gray-700\">{item}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* What Matters Most */}
          <Card>
            <CardHeader>
              <CardTitle className=\"flex items-center gap-2\">
                <CheckCircle className=\"h-6 w-6 text-primary\" />
                What Matters Most
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className=\"space-y-3\">
                {content.whatMatters.map((item, idx) => (
                  <li key={idx} className=\"flex items-start gap-3\">
                    <span className=\"text-primary mt-1\">•</span>
                    <span className=\"text-gray-700\">{item}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Common Pitfalls */}
          <Card>
            <CardHeader>
              <CardTitle className=\"flex items-center gap-2\">
                <CheckCircle className=\"h-6 w-6 text-red-600\" />
                Common Pitfalls
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className=\"space-y-3\">
                {content.commonPitfalls.map((item, idx) => (
                  <li key={idx} className=\"flex items-start gap-3\">
                    <span className=\"text-red-600 mt-1\">•</span>
                    <span className=\"text-gray-700\">{item}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Integration Touchpoints */}
          <Card>
            <CardHeader>
              <CardTitle className=\"flex items-center gap-2\">
                <CheckCircle className=\"h-6 w-6 text-primary\" />
                Integration Touchpoints
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className=\"space-y-3\">
                {content.integrationTouchpoints.map((item, idx) => (
                  <li key={idx} className=\"flex items-start gap-3\">
                    <span className=\"text-primary mt-1\">•</span>
                    <span className=\"text-gray-700\">{item}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA */}
      <section className=\"bg-primary py-16 sm:py-20\">
        <div className=\"container mx-auto max-w-4xl px-4 md:px-6 text-center\">
          <h2 className=\"text-3xl font-bold tracking-tight text-white sm:text-4xl\">
            Ready to find your CRM fit?
          </h2>
          <p className=\"mt-4 text-lg text-blue-100\">
            Get a personalized shortlist based on your {industry.name.toLowerCase()} workflows.
          </p>
          <div className=\"mt-8 flex flex-col sm:flex-row gap-4 justify-center\">
            <Link href=\"/wizard\">
              <Button size=\"lg\" variant=\"secondary\">
                Start Fit Wizard <ArrowRight className=\"ml-2 h-5 w-5\" />
              </Button>
            </Link>
            <Link href=\"/resources/crm-erp-selection-checklist\">
              <Button size=\"lg\" variant=\"outline\" className=\"bg-white hover:bg-gray-100 text-primary border-white\">
                Download Checklist
              </Button>
            </Link>
            <Link href=\"/book\">
              <Button size=\"lg\" variant=\"outline\" className=\"bg-white hover:bg-gray-100 text-primary border-white\">
                Book a Call
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
