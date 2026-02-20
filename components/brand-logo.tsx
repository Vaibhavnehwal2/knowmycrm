import Image from 'next/image';
import Link from 'next/link';
import { cn } from '@/lib/utils';

export type BrandLogoVariant = 'header' | 'footer' | 'card';

interface BrandLogoProps {
  variant?: BrandLogoVariant;
  className?: string;
  showWordmark?: boolean;
  linkToHome?: boolean;
}

const sizeClasses: Record<BrandLogoVariant, string> = {
  header: 'h-16 md:h-20', // 64px mobile, 80px desktop - compensate for image whitespace
  footer: 'h-14', // 56px for footer
  card: 'h-10', // 40px stamp
};

const dimensions: Record<BrandLogoVariant, { width: number; height: number }> = {
  header: { width: 400, height: 100 },
  footer: { width: 320, height: 80 },
  card: { width: 160, height: 40 },
};

export function BrandLogo({
  variant = 'header',
  className = '',
  showWordmark = true,
  linkToHome = false,
}: BrandLogoProps) {
  const sizeClass = sizeClasses[variant];
  const { width, height } = dimensions[variant];
  
  // The full logo includes the wordmark
  const logoSrc = '/brand/knowmycrm-logo.png';
  
  const imageElement = (
    <Image
      src={logoSrc}
      alt="KnowMyCRM"
      width={width}
      height={height}
      className={cn('w-auto object-contain', sizeClass, className)}
      priority={variant === 'header'}
      unoptimized
    />
  );

  if (linkToHome) {
    return (
      <Link 
        href="/" 
        className="inline-flex items-center hover:opacity-90 transition-opacity"
      >
        {imageElement}
      </Link>
    );
  }

  return imageElement;
}

export default BrandLogo;
