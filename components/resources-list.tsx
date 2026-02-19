"use client";

import { useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { PrefetchLink } from '@/components/prefetch-link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, FileText } from 'lucide-react';

interface Post {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
}

interface ResourcesListProps {
  posts: Post[];
}

export function ResourcesList({ posts }: ResourcesListProps) {
  const router = useRouter();
  const prefetchedTop = useRef(false);

  // Prefetch all posts on mount (usually only 2-5 posts)
  useEffect(() => {
    if (!prefetchedTop.current && posts.length > 0) {
      posts.forEach((post) => {
        router.prefetch(`/resources/${post.slug}`);
      });
      prefetchedTop.current = true;
    }
  }, [posts, router]);

  return (
    <div className="grid gap-8 md:grid-cols-2">
      {posts.map((post) => (
        <PrefetchLink key={post.slug} href={`/resources/${post.slug}`}>
          <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader>
              <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
                <FileText className="h-4 w-4" />
                <span>{post.readTime}</span>
                <span>•</span>
                <span>{new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
              </div>
              <CardTitle className="text-xl">{post.title}</CardTitle>
              <CardDescription className="mt-2">{post.excerpt}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center text-sm text-primary font-medium">
                Read article <ArrowRight className="ml-2 h-4 w-4" />
              </div>
            </CardContent>
          </Card>
        </PrefetchLink>
      ))}
    </div>
  );
}
