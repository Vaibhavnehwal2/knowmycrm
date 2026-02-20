import Image from 'next/image';
import { cn } from '@/lib/utils';

export type BlogCoverImageVariant = 'card' | 'hero';

interface BlogCoverImageProps {
  src: string;
  alt: string;
  variant?: BlogCoverImageVariant;
  className?: string;
  priority?: boolean;
}

// Helper to check if URL is external
function isExternalUrl(url: string): boolean {
  return url.startsWith('http://') || url.startsWith('https://');
}

export function BlogCoverImage({
  src,
  alt,
  variant = 'card',
  className = '',
  priority = false,
}: BlogCoverImageProps) {
  // Card variant: used in /resources list
  if (variant === 'card') {
    return (
      <div 
        className={cn(
          'relative w-full aspect-video bg-slate-50 overflow-hidden rounded-t-xl',
          className
        )}
      >
        <Image
          src={src}
          alt={alt}
          fill
          className="object-contain object-center"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
          unoptimized={isExternalUrl(src)}
          priority={priority}
        />
      </div>
    );
  }

  // Hero variant: used in /resources/[slug] detail page
  return (
    <div 
      className={cn(
        'relative w-full aspect-video md:aspect-[21/9] max-h-[420px] bg-slate-50 overflow-hidden rounded-xl',
        className
      )}
    >
      <Image
        src={src}
        alt={alt}
        fill
        className="object-contain object-center"
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
        unoptimized={isExternalUrl(src)}
        priority={priority}
      />
    </div>
  );
}

export default BlogCoverImage;
