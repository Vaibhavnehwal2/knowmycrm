import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight } from 'lucide-react';

export default function ExportersIndustryPage() {
  return (
    <div className="flex flex-col">
      <section className="container mx-auto px-4 py-16 lg:px-8 lg:py-24">
        <div className="mx-auto max-w-4xl">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl mb-8">
            CRM & ERP for Exporters
          </h1>

          <div className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle>Typical Workflows</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-gray-700">
                <p>• Inquiry to quote to order (often complex documentation)</p>
                <p>• Approval workflows for pricing, credit terms, and export compliance</p>
                <p>• Shipment status tracking (container, vessel, customs clearance)</p>
                <p>• Claims management (quality issues, shipping delays)</p>
                <p>• Quality checkpoints and inspection logs</p>
                <p>• Multi-currency, multi-entity, and tax compliance</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>What Matters Most</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-gray-700">
                <p>• <strong>Workflow control:</strong> Export compliance, approvals, and documentation are non-negotiable. Governance is critical.</p>
                <p>• <strong>Audit trail:</strong> Every action (pricing, approvals, shipment updates) must be logged for compliance and disputes.</p>
                <p>• <strong>Reporting:</strong> Multi-currency, multi-country, and multi-product reporting for forecasting and compliance.</p>
                <p>• <strong>ERP-CRM sync:</strong> Shipment status, invoicing, and documentation must flow seamlessly between systems.</p>
                <p>• <strong>Customer visibility:</strong> Buyers often need portal access for order status, shipment tracking, and documents.</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Common Pitfalls</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-gray-700">
                <p>• <strong>Choosing lightweight CRM:</strong> Exporters often need platform-grade CRM for workflow governance and audit trails.</p>
                <p>• <strong>Weak ERP integration:</strong> Shipment updates, invoicing, and documentation must sync reliably. Manual entry breaks workflows.</p>
                <p>• <strong>Ignoring compliance needs:</strong> Export regulations, credit approvals, and quality checkpoints need enforced workflows.</p>
                <p>• <strong>No customer portal:</strong> International buyers expect self-service access to order status, documents, and invoices.</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Integration / ERP Touchpoints</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-gray-700">
                <p>• <strong>ERP (SAP, Dynamics, NetSuite, Odoo):</strong> Quote-to-invoice, shipment status, inventory, multi-currency.</p>
                <p>• <strong>Logistics/Freight systems:</strong> Container tracking, vessel schedules, customs clearance updates.</p>
                <p>• <strong>Documentation tools:</strong> Export documentation (invoices, packing lists, certificates of origin).</p>
                <p>• <strong>Quality management:</strong> Inspection logs, quality checkpoints, and claims tracking.</p>
                <p>• <strong>Customer portals:</strong> Self-service access for buyers to track orders and download documents.</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>"When you need a platform-grade CRM" signals</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-gray-700">
                <p>• Multi-stage approval workflows (pricing, credit, compliance)</p>
                <p>• Audit trail requirements for every transaction</p>
                <p>• Deep ERP integration for shipment tracking and invoicing</p>
                <p>• Multi-currency, multi-entity, and tax compliance needs</p>
                <p>• Custom reporting across orders, shipments, and quality metrics</p>
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
