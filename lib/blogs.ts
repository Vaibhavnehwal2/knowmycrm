import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

// Blog post type definition
export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  publishedAt: string;
  updatedAt?: string;
  author: string;
  readTime: string;
  category?: string;
  coverImage?: string;
  tags?: string[];
}

export interface BlogPostWithContent extends BlogPost {
  content: string;
}

// Support both old location (content/resources) and new location (content/blogs)
const blogsDirectories = [
  path.join(process.cwd(), 'content/blogs'),
  path.join(process.cwd(), 'content/resources'),
];

/**
 * Get the blogs directory that exists
 */
function getBlogsDirectory(): string {
  for (const dir of blogsDirectories) {
    if (fs.existsSync(dir)) {
      return dir;
    }
  }
  // Return first option as default
  return blogsDirectories[0];
}

/**
 * Get all blog posts
 * Sorted by publishedAt desc
 */
export function getAllBlogs(): BlogPost[] {
  const blogsDir = getBlogsDirectory();
  
  if (!fs.existsSync(blogsDir)) {
    return [];
  }
  
  const fileNames = fs.readdirSync(blogsDir);
  const posts = fileNames
    .filter(fileName => fileName.endsWith('.mdx'))
    .map(fileName => {
      const slug = fileName.replace(/\.mdx$/, '');
      const fullPath = path.join(blogsDir, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      const { data } = matter(fileContents);

      return {
        slug,
        title: data.title || 'Untitled',
        excerpt: data.excerpt || '',
        // Support both old 'date' and new 'publishedAt' field names
        publishedAt: data.publishedAt || data.date || new Date().toISOString(),
        updatedAt: data.updatedAt || data.updated,
        author: data.author || 'KnowMyCRM Team',
        readTime: data.readTime || '5 min read',
        category: data.category || 'Guide',
        coverImage: data.coverImage,
        tags: data.tags || [],
      };
    });

  // Sort by publishedAt descending
  return posts.sort((a, b) => 
    new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );
}

/**
 * Get a single blog post by slug
 */
export function getBlogBySlug(slug: string): BlogPostWithContent | null {
  const blogsDir = getBlogsDirectory();
  const fullPath = path.join(blogsDir, `${slug}.mdx`);
  
  if (!fs.existsSync(fullPath)) {
    return null;
  }
  
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);

  return {
    slug,
    title: data.title || 'Untitled',
    excerpt: data.excerpt || '',
    publishedAt: data.publishedAt || data.date || new Date().toISOString(),
    updatedAt: data.updatedAt || data.updated,
    author: data.author || 'KnowMyCRM Team',
    readTime: data.readTime || '5 min read',
    category: data.category || 'Guide',
    coverImage: data.coverImage,
    tags: data.tags || [],
    content,
  };
}

/**
 * Get all blog slugs (for static generation)
 */
export function getAllBlogSlugs(): string[] {
  const posts = getAllBlogs();
  return posts.map(p => p.slug);
}
