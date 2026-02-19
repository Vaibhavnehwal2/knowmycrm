import Link from 'next/link';
import { getAllIndustries, getUniqueCategories } from '@/lib/data';
import { IndustryBrowser } from '@/components/industry-browser';
import { FeaturedIndustries } from '@/components/featured-industries';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

export const dynamic = 'force-static';
export const revalidate = 86400;

export default function IndustriesPage() {
  const allIndustries = getAllIndustries();
  const categories = getUniqueCategories();
  
  // Featured industries (first 9, excluding "Other")
  const featuredIndustries = allIndustries.filter(i => i.slug !== 'other').slice(0, 9);

  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="bg-gradient-to-b from-blue-50 to-white py-16 sm:py-20">
        <div className="container mx-auto max-w-6xl px-4 md:px-6">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl mb-6">
              Industry-Specific CRM & ERP Guidance
            </h1>
            <p className="text-lg text-gray-600">
              Understand what matters most for your industry — workflows, integrations, and common pitfalls.
            </p>
          </div>
        </div>
      </section>

      {/* Featured Industries */}
      <section className="py-16 sm:py-20">
        <div className="container mx-auto max-w-6xl px-4 md:px-6">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Featured Industries</h2>
            <p className="text-gray-600">Popular industries with specific CRM & ERP needs</p>
          </div>
          
          <FeaturedIndustries industries={featuredIndustries} />
        </div>
      </section>

      {/* Browse All Industries */}
      <section className="bg-gray-50 py-16 sm:py-20">
        <div className="container mx-auto max-w-6xl px-4 md:px-6">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Browse All Industries</h2>
            <p className="text-gray-600">Explore our complete industry catalog with {allIndustries.length} industries</p>
          </div>
          
          <IndustryBrowser industries={allIndustries} categories={categories} />
        </div>
      </section>

      {/* CTA */}
      <section className="bg-primary py-16 sm:py-20">
        <div className="container mx-auto max-w-4xl px-4 md:px-6 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Get industry-specific recommendations
          </h2>
          <p className="mt-4 text-lg text-blue-100">
            Answer 8 questions about your workflows and we'll send you a shortlist.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" asChild>
              <Link href="/wizard">
                Start Fit Wizard <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="bg-white hover:bg-gray-100 text-primary border-white" asChild>
              <Link href="/resources/crm-erp-selection-checklist">
                Download Checklist
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
