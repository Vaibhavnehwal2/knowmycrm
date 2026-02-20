// Re-export from blogs.ts for backward compatibility
// This file provides the old API while using the new blogs library

import { getAllBlogs, getBlogBySlug as getBlogBySlugNew } from './blogs';
import type { BlogPost } from '@/types';

/**
 * Get all posts (backward compatible API)
 */
export function getAllPosts(): BlogPost[] {
  const blogs = getAllBlogs();
  
  // Transform to match old BlogPost type
  return blogs.map(blog => ({
    slug: blog.slug,
    title: blog.title,
    excerpt: blog.excerpt,
    date: blog.publishedAt,
    updated: blog.updatedAt,
    author: blog.author,
    readTime: blog.readTime,
    category: (blog.category || 'Guide') as BlogPost['category'],
    tags: blog.tags || [],
  }));
}

/**
 * Get post by slug (backward compatible API)
 */
export function getPostBySlug(slug: string) {
  const blog = getBlogBySlugNew(slug);
  
  if (!blog) {
    throw new Error(`Blog post not found: ${slug}`);
  }
  
  return {
    slug: blog.slug,
    frontmatter: {
      title: blog.title,
      excerpt: blog.excerpt,
      date: blog.publishedAt,
      updated: blog.updatedAt,
      author: blog.author,
      readTime: blog.readTime,
      category: blog.category || 'Guide',
      tags: blog.tags || [],
      coverImage: blog.coverImage,
    },
    content: blog.content,
  };
}
