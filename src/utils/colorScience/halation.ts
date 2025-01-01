// Halation profiles with adjusted parameters
export const halationProfiles = {
  // Warm halation colors (reddish)
  'Portra': { strength: 0.18, color: '#ff8e7a', threshold: 0.7, size: 2 },
  'Ektar': { strength: 0.12, color: '#ff6b5b', threshold: 0.8, size: 1.5 },
  'Gold': { strength: 0.25, color: '#ffb892', threshold: 0.65, size: 2.5 },
  
  // Cool halation colors (bluish)
  'CineStill T': { strength: 0.3, color: '#7aa5ff', threshold: 0.6, size: 3 },
  'Tungsten': { strength: 0.25, color: '#5d89ff', threshold: 0.7, size: 2.5 },
  'Night': { strength: 0.28, color: '#4d7aff', threshold: 0.55, size: 3 },
  
  // Neutral halation colors
  'Classic': { strength: 0.16, color: '#ffffff', threshold: 0.75, size: 2 },
  'Silver': { strength: 0.14, color: '#e0e0e0', threshold: 0.8, size: 1.5 },
  'Pearl': { strength: 0.12, color: '#d0d0d0', threshold: 0.85, size: 1 },
  
  // Vintage tones
  'Sepia': { strength: 0.2, color: '#d4a276', threshold: 0.7, size: 2 },
  'Amber': { strength: 0.22, color: '#ffbf69', threshold: 0.65, size: 2.5 },
  'Bronze': { strength: 0.18, color: '#cd7f32', threshold: 0.75, size: 2 }
} as const;

export const generateHalationFilter = (
  color: string,
  forExport: boolean = false,
  threshold: number = 0.7,
  size: number = 2,
  strength: number = 0.16
): string => {
  // Convert strength to a 0-1 range and apply adjustments
  const normalizedStrength = Math.min(1, Math.max(0, strength));
  const adjustedStrength = forExport ? normalizedStrength * 1.2 : normalizedStrength;
  const adjustedSize = size * (forExport ? 1.5 : 1);
  const blur = Math.max(1, Math.round(adjustedSize * 2));

  // Convert color to rgba
  const hexToRgb = (hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null;
  };

  const rgb = hexToRgb(color);
  if (!rgb) return '';

  // Create a sequence of filters that target highlights
  const filters = [
    // Increase contrast to isolate highlights
    `contrast(${1 + threshold * 2})`,
    
    // Brighten to push more pixels above threshold
    `brightness(${1 + threshold})`,
    
    // Apply color tint to highlights
    `opacity(${adjustedStrength})`,
    
    // Create glow effect with multiple shadows
    ...Array(3).fill(0).map((_, i) => {
      const intensity = adjustedStrength * Math.pow(0.7, i);
      return `drop-shadow(0 0 ${blur * (i + 1)}px rgba(${rgb.r},${rgb.g},${rgb.b},${intensity}))`;
    }),
    
    // Reset contrast and brightness
    `contrast(${1 / (1 + threshold * 2)})`,
    `brightness(${1 / (1 + threshold)})`
  ];

  return filters.join(' ');
};