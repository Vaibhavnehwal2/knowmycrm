'use client';

import Link from 'next/link';
import { Linkedin, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { LinkedInEmbed, type LinkedInPost } from '@/components/linkedin-embed';

interface LinkedInSectionProps {
  posts: LinkedInPost[];
}

export function LinkedInSection({ posts }: LinkedInSectionProps) {
  if (posts.length === 0) {
    return null;
  }

  return (
    <section className="container mx-auto px-4 pb-12 lg:px-8">
      {/* Section Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-[#0A66C2] rounded-lg">
              <Linkedin className="h-5 w-5 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">From LinkedIn</h2>
          </div>
          <p className="text-gray-600">Latest updates from the KnowMyCRM team</p>
        </div>
        <Link href="/linkedin">
          <Button variant="outline" size="sm" className="hidden sm:flex">
            View all <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>
      </div>

      {/* Posts Grid - Responsive: 1 col mobile, 2 col tablet, 3 col desktop */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {posts.slice(0, 6).map((post) => (
          <LinkedInEmbed key={post.id} post={post} compact />
        ))}
      </div>

      {/* Mobile View All Link */}
      <div className="mt-8 text-center sm:hidden">
        <Link href="/linkedin">
          <Button variant="outline">
            View all LinkedIn posts <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>
      </div>
    </section>
  );
}

export default LinkedInSection;
