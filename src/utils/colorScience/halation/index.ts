import { halationColors } from './constants';
import { createGlowFilter } from './filters';
import { RGBColor } from './types';

// Convert hex to RGB
const hexToRgb = (hex: string): RGBColor | null => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
};

// Convert RGB to hex
const rgbToHex = ({ r, g, b }: RGBColor): string => {
  return `#${[r, g, b].map(x => x.toString(16).padStart(2, '0')).join('')}`;
};

export const halationProfiles = Object.entries(halationColors).reduce((acc, [name, color]) => ({
  ...acc,
  [name]: {
    color: rgbToHex(color),
    strength: 0.16,
    threshold: 0.7,
    size: 2
  }
}), {} as Record<string, { color: string; strength: number; threshold: number; size: number; }>);

export const generateHalationFilter = (
  color: string,
  forExport: boolean = false,
  threshold: number = 0.7,
  size: number = 2,
  strength: number = 0.16
): string => {
  const rgb = hexToRgb(color);
  if (!rgb) return '';

  // Adjust parameters for export
  const adjustedStrength = forExport ? strength * 1.2 : strength;
  const adjustedSize = forExport ? size * 1.5 : size;

  return createGlowFilter(rgb, adjustedStrength, adjustedSize, threshold);
};