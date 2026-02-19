"use client";

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useCallback, useRef, forwardRef } from 'react';

interface PrefetchLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  children: React.ReactNode;
  className?: string;
  prefetchOnMount?: boolean;
}

/**
 * PrefetchLink - A Link component that prefetches on hover/focus/touch
 * Use this for list items, cards, and other clickable elements
 * Does NOT prefetch on mount by default (unlike NavPrefetchLink)
 */
export const PrefetchLink = forwardRef<HTMLAnchorElement, PrefetchLinkProps>(
  ({ href, children, className, prefetchOnMount = false, ...props }, ref) => {
    const router = useRouter();
    const prefetched = useRef(false);

    const handlePrefetch = useCallback(() => {
      if (!prefetched.current) {
        router.prefetch(href);
        prefetched.current = true;
      }
    }, [href, router]);

    return (
      <Link
        ref={ref}
        href={href}
        className={className}
        onMouseEnter={handlePrefetch}
        onFocus={handlePrefetch}
        onTouchStart={handlePrefetch}
        prefetch={prefetchOnMount}
        {...props}
      >
        {children}
      </Link>
    );
  }
);

PrefetchLink.displayName = 'PrefetchLink';
