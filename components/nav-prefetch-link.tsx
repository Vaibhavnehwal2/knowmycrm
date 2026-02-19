"use client";

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useRef } from 'react';

interface NavPrefetchLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
}

export function NavPrefetchLink({ href, children, className }: NavPrefetchLinkProps) {
  const router = useRouter();
  const prefetched = useRef(false);

  const handlePrefetch = useCallback(() => {
    if (!prefetched.current) {
      router.prefetch(href);
      prefetched.current = true;
    }
  }, [href, router]);

  // Prefetch on mount for critical nav links
  useEffect(() => {
    // Small delay to not block initial render
    const timer = setTimeout(() => {
      router.prefetch(href);
      prefetched.current = true;
    }, 100);
    return () => clearTimeout(timer);
  }, [href, router]);

  return (
    <Link
      href={href}
      className={className}
      onMouseEnter={handlePrefetch}
      onFocus={handlePrefetch}
      onTouchStart={handlePrefetch}
      prefetch={true}
    >
      {children}
    </Link>
  );
}
