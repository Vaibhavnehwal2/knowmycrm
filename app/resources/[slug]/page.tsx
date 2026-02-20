import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getPostBySlug, getAllPosts } from '@/lib/mdx';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Calendar, Clock } from 'lucide-react';
import { compileMDX } from 'next-mdx-remote/rsc';
import { ChecklistLeadMagnet } from '@/components/checklist-lead-magnet';
import { BlogCoverImage } from '@/components/blog-cover-image';

export const dynamic = 'force-static';
export const dynamicParams = true;
export const revalidate = 86400;

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  let post;
  try {
    post = getPostBySlug(params.slug);
  } catch (error) {
    notFound();
  }

  const { content: mdxContent } = await compileMDX({
    source: post.content,
    options: { parseFrontmatter: false },
  });

  return (
    <div className="flex flex-col">
      <article className="container mx-auto px-4 py-16 lg:px-8 lg:py-24">
        <div className="mx-auto max-w-3xl">
          <Link href="/resources">
            <Button variant="ghost" className="mb-8">
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to Resources
            </Button>
          </Link>

          {/* Cover Image - using BlogCoverImage with object-contain for full visibility */}
          {post.frontmatter.coverImage && (
            <div className="mb-8">
              <BlogCoverImage
                src={post.frontmatter.coverImage}
                alt={post.frontmatter.title}
                variant="hero"
                priority
              />
            </div>
          )}

          <header className="mb-8">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl mb-4">
              {post.frontmatter.title}
            </h1>
            <div className="flex items-center gap-4 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <span>
                  {new Date(post.frontmatter.date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                <span>{post.frontmatter.readTime}</span>
              </div>
              <span>By {post.frontmatter.author}</span>
            </div>
          </header>

          <div className="prose prose-lg max-w-none">
            {mdxContent}
          </div>

          {/* Checklist CTA at bottom of article */}
          <div className="mt-12 pt-8 border-t">
            <ChecklistLeadMagnet variant="section-cta" />
          </div>
        </div>
      </article>

      {/* CTA */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4 lg:px-8 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900">
            Ready to find your CRM fit?
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Take our Fit Wizard and get a personalized shortlist.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
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
