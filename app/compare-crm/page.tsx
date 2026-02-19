import Link from 'next/link';
import { getAllCRMs } from '@/lib/data';
import { CRMFilter } from '@/components/crm-filter';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

export const dynamic = 'force-static';
export const revalidate = 86400;

export default function CompareCRMPage() {
  const crms = getAllCRMs();

  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="container mx-auto px-4 py-16 lg:px-8 lg:py-24">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            Compare CRM Platforms
          </h1>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Understand the fit, trade-offs, and implementation reality for leading CRMs.
          </p>
        </div>
      </section>

      {/* Client Filter Component */}
      <CRMFilter crms={crms} />

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
            Not sure which fits your needs?
          </h2>
          <p className="mt-4 text-lg text-white/90">
            Take our Fit Wizard and get a personalized shortlist.
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
