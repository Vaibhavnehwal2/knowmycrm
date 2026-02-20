import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { getAllPartners, getPartnerWithContent } from '@/lib/partners';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowLeft, ExternalLink, Building2, MapPin, Tag } from 'lucide-react';
import { compileMDX } from 'next-mdx-remote/rsc';

// Helper to check if URL is external (S3, etc.)
function isExternalUrl(url: string): boolean {
  return url.startsWith('http://') || url.startsWith('https://');
}

export const dynamic = 'force-static';
export const dynamicParams = false;
export const revalidate = 86400;

export async function generateStaticParams() {
  const partners = getAllPartners();
  return partners.map((partner) => ({
    slug: partner.slug,
  }));
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const partner = getPartnerWithContent(params.slug);
  
  if (!partner) {
    return {
      title: 'Partner Not Found | KnowMyCRM',
    };
  }

  return {
    title: `${partner.name} | Implementation Partners | KnowMyCRM`,
    description: partner.shortDescription,
  };
}

export default async function PartnerDetailPage({ params }: { params: { slug: string } }) {
  const partner = getPartnerWithContent(params.slug);

  if (!partner) {
    notFound();
  }

  // Compile MDX content if available
  let mdxContent = null;
  if (partner.content) {
    try {
      const result = await compileMDX({
        source: partner.content,
        options: { parseFrontmatter: false },
      });
      mdxContent = result.content;
    } catch (error) {
      console.error('Error compiling MDX:', error);
    }
  }

  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="bg-gradient-to-b from-blue-50 to-white py-12 sm:py-16">
        <div className="container mx-auto max-w-4xl px-4 md:px-6">
          <Link href="/partners">
            <Button variant="ghost" className="mb-6">
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to Partners
            </Button>
          </Link>

          <div className="flex items-start gap-6">
            {/* Logo placeholder */}
            <div className="p-4 bg-white rounded-xl shadow-sm border shrink-0">
              <Building2 className="h-12 w-12 text-gray-400" />
            </div>

            <div className="flex-1">
              <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl mb-3">
                {partner.name}
              </h1>
              <p className="text-lg text-gray-600 mb-4">
                {partner.shortDescription}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-6">
                {partner.focus.map((f) => (
                  <Badge key={f} variant="default">
                    {f}
                  </Badge>
                ))}
                {partner.regions.map((r) => (
                  <Badge key={r} variant="outline">
                    <MapPin className="h-3 w-3 mr-1" />
                    {r}
                  </Badge>
                ))}
              </div>

              {/* CTA Button */}
              <a
                href={partner.websiteUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button size="lg">
                  Visit Website <ExternalLink className="ml-2 h-4 w-4" />
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-12 sm:py-16">
        <div className="container mx-auto max-w-4xl px-4 md:px-6">
          {mdxContent ? (
            <div className="prose prose-lg max-w-none">
              {mdxContent}
            </div>
          ) : (
            <Card className="bg-gray-50">
              <CardContent className="py-12 text-center">
                <Building2 className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Details coming soon
                </h3>
                <p className="text-gray-600 mb-6">
                  We're working on adding more information about {partner.name}. 
                  In the meantime, visit their website to learn more.
                </p>
                <a
                  href={partner.websiteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button>
                    Visit {partner.name} <ExternalLink className="ml-2 h-4 w-4" />
                  </Button>
                </a>
              </CardContent>
            </Card>
          )}

          {/* Partner tags if available */}
          {partner.tags && partner.tags.length > 0 && (
            <div className="mt-8 pt-8 border-t">
              <h3 className="text-sm font-medium text-gray-700 mb-3 flex items-center gap-2">
                <Tag className="h-4 w-4" /> Specializations
              </h3>
              <div className="flex flex-wrap gap-2">
                {partner.tags.map((tag) => (
                  <Badge key={tag} variant="secondary">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto max-w-4xl px-4 md:px-6 text-center">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900 mb-4">
            Need help finding the right CRM or ERP?
          </h2>
          <p className="text-gray-600 mb-8">
            Take our Fit Wizard to get personalized recommendations, then we can help connect you with the right partner.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/wizard">
              <Button size="lg">
                Start Fit Wizard
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
