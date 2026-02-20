'use client';

import Link from 'next/link';
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

// Text sizes for the wordmark part
const textSizeClasses: Record<BrandLogoSize, string> = {
  sm: 'text-base',
  md: 'text-lg',
  lg: 'text-xl',
};

// KnowMyCRM Logo as inline SVG + Text - guaranteed to render on all deployments
function LogoIcon({ className = '' }: { className?: string }) {
  return (
    <svg 
      className={className}
      viewBox="0 0 48 48" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Globe/World icon representing global CRM */}
      <circle cx="24" cy="24" r="20" fill="#3B82F6" />
      <ellipse cx="24" cy="24" rx="20" ry="8" stroke="white" strokeWidth="1.5" fill="none" />
      <ellipse cx="24" cy="24" rx="8" ry="20" stroke="white" strokeWidth="1.5" fill="none" />
      <line x1="4" y1="24" x2="44" y2="24" stroke="white" strokeWidth="1.5" />
      <line x1="24" y1="4" x2="24" y2="44" stroke="white" strokeWidth="1.5" />
      {/* Person/User icon overlay */}
      <circle cx="32" cy="14" r="8" fill="#F97316" />
      <circle cx="32" cy="11" r="3" fill="white" />
      <path d="M27 18C27 15.5 29 14 32 14C35 14 37 15.5 37 18" stroke="white" strokeWidth="1.5" fill="none" strokeLinecap="round" />
    </svg>
  );
}

export function BrandLogo({
  variant = 'full',
  size = 'md',
  className = '',
  priority = false,
  linkToHome = false,
}: BrandLogoProps) {
  const sizeClass = sizeClasses[size];
  const textSizeClass = textSizeClasses[size];
  
  const logoContent = (
    <div className={cn('inline-flex items-center gap-2', className)}>
      <LogoIcon className={cn(sizeClass, 'w-auto')} />
      <span className={cn('font-bold', textSizeClass)}>
        <span className="text-primary">KnowMy</span>
        <span className="text-gray-700">CRM</span>
      </span>
    </div>
  );

  if (linkToHome) {
    return (
      <Link 
        href="/" 
        className="inline-flex items-center hover:opacity-90 transition-opacity"
      >
        {logoContent}
      </Link>
    );
  }

  return logoContent;
}

export default BrandLogo;
