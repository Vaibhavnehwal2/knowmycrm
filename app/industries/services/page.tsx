import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight } from 'lucide-react';

export default function ServicesIndustryPage() {
  return (
    <div className="flex flex-col">
      <section className="container mx-auto px-4 py-16 lg:px-8 lg:py-24">
        <div className="mx-auto max-w-4xl">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl mb-8">
            CRM & ERP for Services
          </h1>

          <div className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle>Typical Workflows</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-gray-700">
                <p>• Lead capture from website, events, referrals</p>
                <p>• Opportunity management with stages (qualification, proposal, negotiation)</p>
                <p>• Delivery kickoff and project handoff to delivery teams</p>
                <p>• Renewals and upsell tracking</p>
                <p>• Customer success and support integration</p>
                <p>• Time tracking and resource allocation (often in PSA tools)</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>What Matters Most</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-gray-700">
                <p>• <strong>Adoption:</strong> Services teams are often on the go. Mobile, ease of use, and low training overhead are critical.</p>
                <p>• <strong>Forecasting:</strong> Pipeline visibility and deal probability tracking for revenue predictability.</p>
                <p>• <strong>Accounting integration:</strong> Quote-to-invoice flow with accounting/ERP for billing and revenue recognition.</p>
                <p>• <strong>Customer lifecycle:</strong> From lead to closed deal to delivery to renewal — seamless handoffs matter.</p>
                <p>• <strong>Marketing-sales alignment:</strong> Inbound leads from campaigns need smooth handoff and lead scoring.</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Common Pitfalls</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-gray-700">
                <p>• <strong>Over-customization:</strong> Services teams often request heavy customization, leading to complexity and low adoption.</p>
                <p>• <strong>Ignoring delivery handoff:</strong> CRM ends at "closed-won" but delivery teams need visibility. Plan the handoff.</p>
                <p>• <strong>Weak accounting integration:</strong> Manual invoice creation or data entry errors slow down cash flow.</p>
                <p>• <strong>No renewals tracking:</strong> Services businesses live on renewals, but CRM often focuses only on new sales.</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Integration / ERP Touchpoints</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-gray-700">
                <p>• <strong>Accounting/ERP:</strong> Quote-to-invoice for billing, revenue recognition, and payment tracking.</p>
                <p>• <strong>Website/Forms:</strong> Inbound lead capture from contact forms, demo requests.</p>
                <p>• <strong>Email/Calendar:</strong> Email tracking, meeting scheduling, and activity logging.</p>
                <p>• <strong>PSA (Professional Services Automation):</strong> Delivery handoff, time tracking, resource management.</p>
                <p>• <strong>BI/Reporting:</strong> Revenue dashboards, pipeline analytics, customer health scores.</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>"When you need a platform-grade CRM" signals</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-gray-700">
                <p>• Deal approval workflows (pricing discounts, contract terms)</p>
                <p>• Multi-stage quoting with complex pricing or multi-year contracts</p>
                <p>• Heavy integration needs (ERP, PSA, BI, custom tools)</p>
                <p>• Team scaling beyond 50+ users</p>
                <p>• Custom reporting across deals, renewals, and customer success</p>
              </CardContent>
            </Card>
          </div>

          <div className="mt-12 flex flex-col sm:flex-row gap-4">
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
