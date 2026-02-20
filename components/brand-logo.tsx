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
  header: 'h-7 md:h-8', // 28px mobile, 32px desktop
  footer: 'h-8', // 32px (balanced, not too big)
  card: 'h-6', // 24px subtle stamp
};

const dimensions: Record<BrandLogoVariant, { width: number; height: number }> = {
  header: { width: 200, height: 50 },
  footer: { width: 180, height: 45 },
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
      className={cn('w-auto', sizeClass, className)}
      priority={variant === 'header'}
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
