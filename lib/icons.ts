// Utility to get simple-icons SVG paths
import * as simpleIcons from 'simple-icons';

export function getIconSvg(iconName: string): string | null {
  try {
    const icon = simpleIcons[`si${iconName.charAt(0).toUpperCase()}${iconName.slice(1).toLowerCase().replace(/[^a-z0-9]/g, '')}`];
    if (icon && 'path' in icon) {
      return icon.path;
    }
    return null;
  } catch {
    return null;
  }
}

export function getIconHex(iconName: string): string {
  try {
    const icon = simpleIcons[`si${iconName.charAt(0).toUpperCase()}${iconName.slice(1).toLowerCase().replace(/[^a-z0-9]/g, '')}`];
    if (icon && 'hex' in icon) {
      return `#${icon.hex}`;
    }
    return '#6B7280';
  } catch {
    return '#6B7280';
  }
}