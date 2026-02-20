'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { cn } from '@/lib/utils';

// Import logo statically - this bundles it with the app build
import logoImage from '@/public/brand/knowmycrm-logo-cropped.png';

export type BrandLogoVariant = 'full' | 'icon' | 'wordmark';
export type BrandLogoSize = 'sm' | 'md' | 'lg';

interface BrandLogoProps {
  variant?: BrandLogoVariant;
  size?: BrandLogoSize;
  className?: string;
  priority?: boolean;
  linkToHome?: boolean;
}

// Height classes for each size
const sizeClasses: Record<BrandLogoSize, string> = {
  sm: 'h-6',   // 24px
  md: 'h-8',   // 32px
  lg: 'h-10',  // 40px
};

// Text fallback sizes
const textSizeClasses: Record<BrandLogoSize, string> = {
  sm: 'text-lg',
  md: 'text-xl',
  lg: 'text-2xl',
};

export function BrandLogo({
  variant = 'full',
  size = 'md',
  className = '',
  priority = false,
  linkToHome = false,
}: BrandLogoProps) {
  const [imageError, setImageError] = useState(false);
  const sizeClass = sizeClasses[size];
  
  // Text fallback element
  const textFallback = (
    <span className={cn(
      'font-bold inline-flex items-center',
      textSizeClasses[size],
      className
    )}>
      <span className="text-primary">KnowMy</span>
      <span className="text-gray-700">CRM</span>
    </span>
  );

  if (imageError) {
    if (linkToHome) {
      return (
        <Link href="/" className="inline-flex items-center hover:opacity-90 transition-opacity">
          {textFallback}
        </Link>
      );
    }
    return textFallback;
  }

  const imageElement = (
    <Image
      src={logoImage}
      alt="KnowMyCRM"
      className={cn('w-auto object-contain', sizeClass, className)}
      priority={priority}
      onError={() => setImageError(true)}
    />
  );

  if (linkToHome) {
    return (
      <Link href="/" className="inline-flex items-center hover:opacity-90 transition-opacity">
        {imageElement}
      </Link>
    );
  }

  return imageElement;
}

export default BrandLogo;
