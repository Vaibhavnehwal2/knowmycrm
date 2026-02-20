'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { cn } from '@/lib/utils';

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

// Image dimensions for Next.js (aspect ratio ~4:1 for full logo)
const dimensions: Record<BrandLogoSize, { width: number; height: number }> = {
  sm: { width: 96, height: 24 },
  md: { width: 128, height: 32 },
  lg: { width: 160, height: 40 },
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
  const { width, height } = dimensions[size];
  
  // Use the cropped logo (no whitespace)
  const logoSrc = '/brand/knowmycrm-logo-cropped.png';
  
  // Fallback text element when image fails to load
  const textFallback = (
    <span className={cn(
      'font-bold text-primary',
      textSizeClasses[size],
      className
    )}>
      KnowMy<span className="text-gray-700">CRM</span>
    </span>
  );

  const imageElement = imageError ? textFallback : (
    <Image
      src={logoSrc}
      alt="KnowMyCRM"
      width={width}
      height={height}
      className={cn('w-auto object-contain', sizeClass, className)}
      priority={priority}
      onError={() => setImageError(true)}
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
