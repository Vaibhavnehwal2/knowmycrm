"use client";

import { getIconSvg, getIconHex } from '@/lib/icons';

interface BrandIconProps {
  iconName?: string;
  name: string;
  className?: string;
}

export function BrandIcon({ iconName, name, className = "h-6 w-6" }: BrandIconProps) {
  const path = iconName ? getIconSvg(iconName) : null;
  const color = iconName ? getIconHex(iconName) : '#6B7280';

  if (!path) {
    return (
      <div className={`${className} flex items-center justify-center bg-gray-200 rounded text-xs font-bold text-gray-600`}>
        {name.charAt(0)}
      </div>
    );
  }

  return (
    <svg
      role="img"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      fill={color}
    >
      <path d={path} />
    </svg>
  );
}
