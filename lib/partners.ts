import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

// Partner type definition
export interface Partner {
  slug: string;
  name: string;
  shortDescription: string;
  logoUrl?: string;
  websiteUrl: string;
  focus: string[];
  regions: string[];
  tags?: string[];
  sortOrder?: number;
}

export interface PartnerWithContent extends Partner {
  content?: string;
  hasDetailPage: boolean;
}

const partnersJsonPath = path.join(process.cwd(), 'content/partners/partners.json');
const partnerDetailsDir = path.join(process.cwd(), 'content/partners/details');

/**
 * Get all partners from partners.json
 * Sorted by sortOrder (asc) then name (asc)
 */
export function getAllPartners(): Partner[] {
  const fileContents = fs.readFileSync(partnersJsonPath, 'utf8');
  const partners: Partner[] = JSON.parse(fileContents);
  
  return partners.sort((a, b) => {
    // Sort by sortOrder first (if present)
    const orderA = a.sortOrder ?? 999;
    const orderB = b.sortOrder ?? 999;
    if (orderA !== orderB) {
      return orderA - orderB;
    }
    // Then by name
    return a.name.localeCompare(b.name);
  });
}

/**
 * Get a single partner by slug
 * Returns null if not found
 */
export function getPartnerBySlug(slug: string): Partner | null {
  const partners = getAllPartners();
  return partners.find(p => p.slug === slug) || null;
}

/**
 * Get partner detail MDX content by slug
 * Returns null if MDX file doesn't exist
 */
export function getPartnerDetailContent(slug: string): { content: string; frontmatter: Record<string, any> } | null {
  const mdxPath = path.join(partnerDetailsDir, `${slug}.mdx`);
  
  if (!fs.existsSync(mdxPath)) {
    return null;
  }
  
  const fileContents = fs.readFileSync(mdxPath, 'utf8');
  const { data, content } = matter(fileContents);
  
  return {
    content,
    frontmatter: data,
  };
}

/**
 * Get a partner with its MDX content
 */
export function getPartnerWithContent(slug: string): PartnerWithContent | null {
  const partner = getPartnerBySlug(slug);
  
  if (!partner) {
    return null;
  }
  
  const detailContent = getPartnerDetailContent(slug);
  
  return {
    ...partner,
    content: detailContent?.content || undefined,
    hasDetailPage: !!detailContent,
  };
}

/**
 * Get all partner slugs (for static generation)
 */
export function getAllPartnerSlugs(): string[] {
  const partners = getAllPartners();
  return partners.map(p => p.slug);
}

/**
 * Check if a partner has a detail MDX file
 */
export function partnerHasDetailPage(slug: string): boolean {
  const mdxPath = path.join(partnerDetailsDir, `${slug}.mdx`);
  return fs.existsSync(mdxPath);
}
