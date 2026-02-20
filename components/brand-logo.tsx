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
  header: 'h-10 md:h-12', // 40px mobile, 48px desktop - clearly visible
  footer: 'h-10', // 40px for footer
  card: 'h-6', // 24px subtle stamp
};

const dimensions: Record<BrandLogoVariant, { width: number; height: number }> = {
  header: { width: 320, height: 80 },
  footer: { width: 280, height: 70 },
  card: { width: 120, height: 30 },
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
