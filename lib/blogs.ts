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
  path.join(process.cwd(), 'content/resources'), // Check old location first for backward compatibility
  path.join(process.cwd(), 'content/blogs'),
];

/**
 * Get all MDX files from all blogs directories
 */
function getAllMdxFiles(): { filePath: string; fileName: string }[] {
  const files: { filePath: string; fileName: string }[] = [];
  
  for (const dir of blogsDirectories) {
    if (fs.existsSync(dir)) {
      const fileNames = fs.readdirSync(dir);
      fileNames
        .filter(fileName => fileName.endsWith('.mdx'))
        .forEach(fileName => {
          files.push({
            filePath: path.join(dir, fileName),
            fileName,
          });
        });
    }
  }
  
  return files;
}

/**
 * Find MDX file by slug across all directories
 */
function findMdxFile(slug: string): string | null {
  for (const dir of blogsDirectories) {
    const fullPath = path.join(dir, `${slug}.mdx`);
    if (fs.existsSync(fullPath)) {
      return fullPath;
    }
  }
  return null;
}

/**
 * Get all blog posts
 * Sorted by publishedAt desc
 */
export function getAllBlogs(): BlogPost[] {
  const mdxFiles = getAllMdxFiles();
  
  const posts = mdxFiles.map(({ filePath, fileName }) => {
    const slug = fileName.replace(/\.mdx$/, '');
    const fileContents = fs.readFileSync(filePath, 'utf8');
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
  const fullPath = findMdxFile(slug);
  
  if (!fullPath) {
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
