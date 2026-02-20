import fs from 'fs';
import path from 'path';

export interface LinkedInPost {
  id: string;
  type: 'iframe' | 'link';
  embedSrc?: string;
  title: string;
  date: string;
  linkedInUrl?: string;
}

interface PaginatedResult {
  posts: LinkedInPost[];
  hasMore: boolean;
  total: number;
}

const LINKEDIN_CONTENT_PATH = path.join(process.cwd(), 'content', 'linkedin', 'posts.json');

/**
 * Read and parse the LinkedIn posts JSON file
 */
function readPostsFile(): LinkedInPost[] {
  try {
    const fileContents = fs.readFileSync(LINKEDIN_CONTENT_PATH, 'utf8');
    const posts = JSON.parse(fileContents) as LinkedInPost[];
    return posts;
  } catch (error) {
    console.error('Error reading LinkedIn posts file:', error);
    return [];
  }
}

/**
 * Normalize and validate a LinkedIn post
 */
function normalizePost(post: Partial<LinkedInPost>): LinkedInPost {
  return {
    id: post.id || `post-${Date.now()}`,
    type: post.type || 'iframe',
    embedSrc: post.embedSrc,
    title: post.title || 'LinkedIn Post',
    date: post.date || '1970-01-01', // Old date for posts without date
    linkedInUrl: post.linkedInUrl || deriveLinkedInUrl(post.embedSrc),
  };
}

/**
 * Try to derive a public LinkedIn URL from the embed src
 */
function deriveLinkedInUrl(embedSrc?: string): string | undefined {
  if (!embedSrc) return undefined;
  
  // Extract the URN from the embed URL
  // Format: https://www.linkedin.com/embed/feed/update/urn:li:ugcPost:7429752378242813952
  const match = embedSrc.match(/urn:li:(ugcPost|share):(\d+)/);
  if (match) {
    const [, type, postId] = match;
    // LinkedIn activity URLs
    return `https://www.linkedin.com/feed/update/urn:li:${type}:${postId}`;
  }
  return undefined;
}

/**
 * Get all LinkedIn posts sorted by date (newest first)
 */
export function getAllLinkedInPosts(): LinkedInPost[] {
  const posts = readPostsFile();
  
  return posts
    .map(normalizePost)
    .sort((a, b) => {
      const dateA = new Date(a.date).getTime();
      const dateB = new Date(b.date).getTime();
      return dateB - dateA; // Descending order (newest first)
    });
}

/**
 * Get a paginated slice of LinkedIn posts
 */
export function getLinkedInPostsPage(page: number = 1, pageSize: number = 10): PaginatedResult {
  const allPosts = getAllLinkedInPosts();
  const total = allPosts.length;
  
  const startIndex = (page - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  
  const posts = allPosts.slice(startIndex, endIndex);
  const hasMore = endIndex < total;
  
  return {
    posts,
    hasMore,
    total,
  };
}

/**
 * Get the latest N LinkedIn posts
 */
export function getLatestLinkedInPosts(count: number = 6): LinkedInPost[] {
  const allPosts = getAllLinkedInPosts();
  return allPosts.slice(0, count);
}
