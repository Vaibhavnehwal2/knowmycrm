'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Linkedin, ArrowLeft, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { LinkedInEmbed, type LinkedInPost } from '@/components/linkedin-embed';

interface PaginatedResult {
  posts: LinkedInPost[];
  hasMore: boolean;
  total: number;
}

export default function LinkedInPage() {
  const [posts, setPosts] = useState<LinkedInPost[]>([]);
  const [hasMore, setHasMore] = useState(false);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const pageSize = 10;

  // Initial load
  useEffect(() => {
    fetchPosts(1);
  }, []);

  async function fetchPosts(pageNum: number) {
    try {
      const response = await fetch(`/api/linkedin?page=${pageNum}&pageSize=${pageSize}`);
      const data: PaginatedResult = await response.json();
      
      if (pageNum === 1) {
        setPosts(data.posts);
      } else {
        setPosts(prev => [...prev, ...data.posts]);
      }
      setHasMore(data.hasMore);
      setPage(pageNum);
    } catch (error) {
      console.error('Error fetching LinkedIn posts:', error);
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  }

  function handleLoadMore() {
    setLoadingMore(true);
    fetchPosts(page + 1);
  }

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <section className="bg-gradient-to-br from-[#0A66C2]/5 to-blue-50 py-16">
        <div className="container mx-auto px-4 lg:px-8">
          <Link href="/resources">
            <Button variant="ghost" className="mb-6">
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to Resources
            </Button>
          </Link>
          
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-[#0A66C2] rounded-xl">
              <Linkedin className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold tracking-tight text-gray-900">
              LinkedIn Updates
            </h1>
          </div>
          
          <p className="text-lg text-gray-600 max-w-2xl">
            Stay connected with the latest insights, tips, and updates from the KnowMyCRM team. 
            Follow us on LinkedIn for more content about CRM selection and implementation.
          </p>
          
          <div className="mt-6">
            <Button asChild variant="outline">
              <a 
                href="https://www.linkedin.com/company/knowmycrm" 
                target="_blank" 
                rel="noopener noreferrer"
              >
                <Linkedin className="mr-2 h-4 w-4" /> Follow KnowMyCRM
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* Posts Grid */}
      <section className="container mx-auto px-4 py-12 lg:px-8 lg:py-16 flex-1">
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="h-8 w-8 animate-spin text-[#0A66C2]" />
          </div>
        ) : posts.length === 0 ? (
          <div className="text-center py-20">
            <Linkedin className="h-12 w-12 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">No LinkedIn posts yet. Check back soon!</p>
          </div>
        ) : (
          <>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
              {posts.map((post) => (
                <LinkedInEmbed key={post.id} post={post} />
              ))}
            </div>

            {/* Load More */}
            {hasMore && (
              <div className="mt-12 text-center">
                <Button
                  onClick={handleLoadMore}
                  disabled={loadingMore}
                  variant="outline"
                  size="lg"
                >
                  {loadingMore ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Loading...
                    </>
                  ) : (
                    'Load more'
                  )}
                </Button>
              </div>
            )}
          </>
        )}
      </section>

      {/* CTA */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4 lg:px-8 text-center">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900 mb-4">
            Want personalized CRM recommendations?
          </h2>
          <p className="text-gray-600 mb-6">
            Take our Fit Wizard to get a shortlist tailored to your business needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/wizard">
              <Button size="lg">Start Fit Wizard</Button>
            </Link>
            <Link href="/resources">
              <Button variant="outline" size="lg">Explore Resources</Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
