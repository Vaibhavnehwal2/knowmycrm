import { getAllPosts } from '@/lib/mdx';
import { getLatestLinkedInPosts } from '@/lib/linkedin';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { ResourcesList } from '@/components/resources-list';
import { LinkedInSection } from '@/components/linkedin-section';
import Link from 'next/link';
import { ChecklistLeadMagnet } from '@/components/checklist-lead-magnet';

export const dynamic = 'force-static';
export const revalidate = 86400;

export default function ResourcesPage() {
  const posts = getAllPosts();
  const linkedInPosts = getLatestLinkedInPosts(6);

  return (
    <div className="flex flex-col">
      <section className="container mx-auto px-4 py-16 lg:px-8 lg:py-24">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            Resources
          </h1>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Expert guidance on CRM and ERP selection, implementation, and best practices.
          </p>
        </div>
      </section>

      {/* Checklist Lead Magnet - Prominent CTA */}
      <section className="container mx-auto px-4 pb-8 lg:px-8">
        <ChecklistLeadMagnet variant="inline-card" />
      </section>

      <section className="container mx-auto px-4 pb-16 lg:px-8 lg:pb-24">
        <h2 className="text-2xl font-bold text-gray-900 mb-8">Latest Articles</h2>
        <ResourcesList posts={posts} />
      </section>

      <section className="bg-primary py-16">
        <div className="container mx-auto px-4 lg:px-8 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-white">
            Need help choosing the right CRM?
          </h2>
          <p className="mt-4 text-lg text-white/90">
            Take our Fit Wizard and get a personalized shortlist.
          </p>
          <div className="mt-8">
            <Button size="lg" variant="secondary" asChild>
              <Link href="/wizard">
                Start Fit Wizard <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
