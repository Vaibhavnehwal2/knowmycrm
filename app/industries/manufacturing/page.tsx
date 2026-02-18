import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight } from 'lucide-react';

export default function ManufacturingIndustryPage() {
  return (
    <div className="flex flex-col">
      <section className="container mx-auto px-4 py-16 lg:px-8 lg:py-24">
        <div className="mx-auto max-w-4xl">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl mb-8">
            CRM & ERP for Manufacturing
          </h1>

          <div className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle>Typical Workflows</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-gray-700">
                <p>• Quote generation with complex pricing, BOMs, and configurations</p>
                <p>• Approval workflows for pricing exceptions and discounts</p>
                <p>• Dealer / distributor channel management</p>
                <p>• Service and warranty case tracking</p>
                <p>• Order status visibility from ERP (production, shipping)</p>
                <p>• After-sales support and parts management</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>What Matters Most</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-gray-700">
                <p>• <strong>Governance:</strong> Pricing approvals, discount rules, and contract terms need workflow enforcement.</p>
                <p>• <strong>Integration reliability:</strong> CRM-ERP sync for quotes, orders, inventory, and shipment status is mission-critical.</p>
                <p>• <strong>Channel complexity:</strong> If you sell through dealers/distributors, partner portals and PRM matter.</p>
                <p>• <strong>Service after sale:</strong> Warranty, parts, and service cases extend beyond initial sale.</p>
                <p>• <strong>Custom objects:</strong> Products, BOMs, configurations, and assets often need custom data models.</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Common Pitfalls</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-gray-700">
                <p>• <strong>Underestimating ERP integration:</strong> Quote-to-order flow is complex in manufacturing. Plan integration upfront.</p>
                <p>• <strong>Choosing CRM without ERP alignment:</strong> If your ERP is SAP, Oracle, or D365 F&O, CRM choice should match ecosystem.</p>
                <p>• <strong>Ignoring dealer/distributor needs:</strong> Channel partners need portals, order visibility, and co-op fund tracking.</p>
                <p>• <strong>Skipping service workflows:</strong> CRM often focuses on sales, but manufacturing needs post-sale service tracking.</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Integration / ERP Touchpoints</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-gray-700">
                <p>• <strong>ERP (SAP, Dynamics, NetSuite, Odoo):</strong> Quote-to-order, pricing, inventory, order status, invoicing.</p>
                <p>• <strong>CPQ (Configure-Price-Quote):</strong> Complex product configurations and pricing rules.</p>
                <p>• <strong>MRP/Production:</strong> Visibility into production schedules and delivery timelines.</p>
                <p>• <strong>Dealer/Distributor portals:</strong> Channel partner access to orders, quotes, and co-op funds.</p>
                <p>• <strong>Service/Warranty systems:</strong> After-sales support and parts management.</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>"When you need a platform-grade CRM" signals</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-gray-700">
                <p>• Complex quoting with BOMs, configurations, and pricing approvals</p>
                <p>• Multi-tier dealer/distributor channels</p>
                <p>• Deep ERP integration (SAP, Dynamics, Oracle) is non-negotiable</p>
                <p>• Service and warranty workflows extend beyond initial sale</p>
                <p>• Custom objects for products, assets, and configurations</p>
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
