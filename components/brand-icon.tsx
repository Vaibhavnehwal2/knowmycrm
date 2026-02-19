// BrandIcon component - uses static icon map to avoid bundling simple-icons
import { getIconData } from '@/lib/icon-map';

interface BrandIconProps {
  iconName?: string;
  name: string;
  className?: string;
}

export function BrandIcon({ iconName, name, className = "h-6 w-6" }: BrandIconProps) {
  const iconData = iconName ? getIconData(iconName) : null;

  if (!iconData) {
    // Fallback: show first letter of name
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
      fill={iconData.hex}
    >
      <path d={iconData.path} />
    </svg>
  );
}
