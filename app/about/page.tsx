import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="flex flex-col">
      <section className="container mx-auto px-4 py-16 lg:px-8 lg:py-24">
        <div className="mx-auto max-w-3xl">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            About KnowMyCRM
          </h1>
          
          <div className="mt-8 space-y-6 text-lg text-gray-700 leading-relaxed">
            <p>
              KnowMyCRM helps businesses find the right CRM and ERP fit — and connect with the right implementation partners.
            </p>

            <p>
              We don't sell CRM or ERP software. We provide independent selection support based on your workflows, integrations, and constraints.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">
              Why we exist
            </h2>

            <p>
              Most CRM and ERP projects fail not because the software is bad, but because:
            </p>

            <ul className="list-disc pl-6 space-y-2">
              <li>Companies choose based on features and demos, not fit</li>
              <li>Selection happens in isolation without considering ERP touchpoints</li>
              <li>Implementation partners are chosen on price, not proven expertise</li>
              <li>Change management and adoption are afterthoughts</li>
            </ul>

            <p>
              We fix this by providing:
            </p>

            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Fit-based shortlists:</strong> Not feature matrices, but options that match your workflows and ecosystem</li>
              <li><strong>ERP integration mapping:</strong> CRM and ERP decisions are connected — we map touchpoints upfront</li>
              <li><strong>Partner introductions:</strong> Certified partners with proven track records in your industry and platform</li>
              <li><strong>Independent oversight:</strong> Optional checkpoint during implementation to catch issues early</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">
              Our approach
            </h2>

            <p>
              We start by understanding your workflows, not your feature wishlist. We capture:
            </p>

            <ul className="list-disc pl-6 space-y-2">
              <li>Sales motion complexity (pipeline stages, approvals, pricing rules)</li>
              <li>Service and support needs</li>
              <li>Integration requirements (ERP, accounting, BI, website, WhatsApp, email)</li>
              <li>Reporting and data governance needs</li>
              <li>Growth trajectory and scale considerations</li>
            </ul>

            <p>
              Then we return a shortlist (3–5 options) with clear rationale, trade-offs, and a controlled demo script. No vendor sponsorship, no commission bias.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">
              Vendor neutrality
            </h2>

            <p>
              We are not paid by CRM or ERP vendors. Our recommendations are fit-based, not sponsorship-based.
            </p>

            <p>
              Implementation partners are introduced based on proven expertise, not referral fees.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">
              Get started
            </h2>

            <p>
              Take the Fit Wizard to share your requirements. We'll send you a shortlist with rationale and partner introductions.
            </p>
          </div>

          <div className="mt-12 flex flex-col sm:flex-row gap-4">
            <Link href="/wizard">
              <Button size="lg">
                Start Fit Wizard <ArrowRight className="ml-2 h-4 w-4" />
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
