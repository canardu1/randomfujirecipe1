// Monochrome film characteristics based on real film stocks
export const monochromeProfiles = {
  'ACROS': {
    contrast: 1.2,
    shadowStrength: 1.15,
    highlightCompression: 0.92,
    grainIntensity: 0.8
  },
  'Monochrome': {
    contrast: 1.1,
    shadowStrength: 1.0,
    highlightCompression: 0.95,
    grainIntensity: 1.0
  },
  'Tri-X 400': {
    contrast: 1.25,
    shadowStrength: 1.2,
    highlightCompression: 0.9,
    grainIntensity: 1.2
  },
  'T-Max 400': {
    contrast: 1.15,
    shadowStrength: 1.1,
    highlightCompression: 0.93,
    grainIntensity: 0.9
  },
  'HP5 Plus': {
    contrast: 1.18,
    shadowStrength: 1.12,
    highlightCompression: 0.92,
    grainIntensity: 1.1
  },
  'Delta 100': {
    contrast: 1.3,
    shadowStrength: 1.25,
    highlightCompression: 0.88,
    grainIntensity: 0.7
  },
  'Pan F Plus 50': {
    contrast: 1.35,
    shadowStrength: 1.3,
    highlightCompression: 0.85,
    grainIntensity: 0.6
  },
  'XP2 Super': {
    contrast: 1.22,
    shadowStrength: 1.18,
    highlightCompression: 0.91,
    grainIntensity: 0.85
  }
} as const;

export const generateMonochromeTransform = (
  simulation: keyof typeof monochromeProfiles,
  highlight: number,
  shadow: number,
  forExport: boolean = false
): string => {
  const profile = monochromeProfiles[simulation];
  const filters: string[] = [];

  // Base monochrome conversion
  filters.push('grayscale(1)');

  // Apply film-specific contrast
  const contrastValue = profile.contrast * (forExport ? 1.15 : 1);
  filters.push(`contrast(${contrastValue})`);

  // Apply shadow and highlight adjustments
  const shadowValue = 1 + (shadow * 0.05 * profile.shadowStrength);
  filters.push(`brightness(${shadowValue})`);

  const highlightValue = profile.highlightCompression + (highlight * 0.03);
  filters.push(`brightness(${highlightValue})`);

  // Fine-tune the overall look
  if (simulation === 'ACROS' || simulation === 'Tri-X 400') {
    filters.push('brightness(0.95)'); // Slightly darker blacks
  }

  if (simulation === 'Pan F Plus 50' || simulation === 'Delta 100') {
    filters.push('contrast(1.1)'); // Extra contrast for fine-grain films
  }

  return filters.join(' ');
};