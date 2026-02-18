import Link from 'next/link';
import { getAllPosts } from '@/lib/mdx';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, FileText, Download } from 'lucide-react';

export default function ResourcesPage() {
  const posts = getAllPosts();

  return (
    <div className=\"flex flex-col\">
      {/* Hero */}
      <section className=\"container mx-auto px-4 py-16 lg:px-8 lg:py-24\">
        <div className=\"mx-auto max-w-4xl text-center\">
          <h1 className=\"text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl\">
            Resources
          </h1>
          <p className=\"mt-6 text-lg leading-8 text-gray-600\">
            Expert guidance on CRM and ERP selection, implementation, and best practices.
          </p>
        </div>
      </section>

      {/* Featured Checklist */}
      <section className=\"container mx-auto px-4 pb-8 lg:px-8\">
        <Link href=\"/resources/crm-erp-selection-checklist\">
          <Card className=\"border-2 border-primary hover:shadow-lg transition-shadow cursor-pointer\">
            <CardHeader>
              <div className=\"flex items-start justify-between\">
                <div className=\"flex items-center gap-3\">
                  <Download className=\"h-8 w-8 text-primary\" />
                  <div>
                    <CardTitle className=\"text-2xl\">CRM/ERP Selection Checklist</CardTitle>
                    <CardDescription className=\"mt-2\">
                      Download our comprehensive checklist to audit your selection process
                    </CardDescription>
                  </div>
                </div>
                <ArrowRight className=\"h-6 w-6 text-primary\" />
              </div>
            </CardHeader>
          </Card>
        </Link>
      </section>

      {/* Blog Posts */}
      <section className=\"container mx-auto px-4 pb-16 lg:px-8 lg:pb-24\">
        <h2 className=\"text-2xl font-bold text-gray-900 mb-8\">Latest Articles</h2>
        <div className=\"grid gap-8 md:grid-cols-2\">
          {posts.map((post) => (
            <Link key={post.slug} href={`/resources/${post.slug}`}>
              <Card className=\"h-full hover:shadow-lg transition-shadow cursor-pointer\">
                <CardHeader>
                  <div className=\"flex items-center gap-2 text-sm text-gray-500 mb-2\">
                    <FileText className=\"h-4 w-4\" />
                    <span>{post.readTime}</span>
                    <span>\u2022</span>
                    <span>{new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                  </div>
                  <CardTitle className=\"text-xl\">{post.title}</CardTitle>
                  <CardDescription className=\"mt-2\">{post.excerpt}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className=\"flex items-center text-sm text-primary font-medium\">
                    Read article <ArrowRight className=\"ml-2 h-4 w-4\" />
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className=\"bg-primary py-16\">
        <div className=\"container mx-auto px-4 lg:px-8 text-center\">
          <h2 className=\"text-3xl font-bold tracking-tight text-white\">
            Need help choosing the right CRM?
          </h2>
          <p className=\"mt-4 text-lg text-white/90\">
            Take our Fit Wizard and get a personalized shortlist.
          </p>
          <div className=\"mt-8\">
            <Link href=\"/wizard\">
              <Button size=\"lg\" variant=\"secondary\">
                Start Fit Wizard <ArrowRight className=\"ml-2 h-4 w-4\" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
"