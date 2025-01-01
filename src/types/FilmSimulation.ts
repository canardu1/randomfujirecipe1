// Film simulation types with associated metadata
export interface FilmSimulationMetadata {
  name: string;
  defaultWhiteBalance: string;
  description: string;
}

// Film simulation mapping with natural white balance settings
export const filmSimulationMetadata: Record<string, FilmSimulationMetadata> = {
  // Daylight-balanced films (5500K)
  'PROVIA/Standard': {
    name: 'Provia 100F',
    defaultWhiteBalance: 'Daylight',
    description: 'Natural color reproduction'
  },
  'Velvia': {
    name: 'Velvia 50',
    defaultWhiteBalance: 'Daylight',
    description: 'Vibrant colors, high contrast'
  },
  'ASTIA/Soft': {
    name: 'Astia 100F',
    defaultWhiteBalance: 'Daylight',
    description: 'Soft colors, ideal for portraits'
  },
  'Classic Chrome': {
    name: 'Kodachrome',
    defaultWhiteBalance: 'Daylight',
    description: 'Muted colors, classic look'
  },
  'Classic Neg': {
    name: 'Superia',
    defaultWhiteBalance: 'Daylight',
    description: 'Consumer negative film look'
  },
  'Portra 160': {
    name: 'Portra 160',
    defaultWhiteBalance: 'Daylight',
    description: 'Professional portrait film'
  },
  'Portra 400': {
    name: 'Portra 400',
    defaultWhiteBalance: 'Daylight',
    description: 'Versatile portrait film'
  },
  'Portra 800': {
    name: 'Portra 800',
    defaultWhiteBalance: 'Daylight',
    description: 'High-speed portrait film'
  },
  'Ektar 100': {
    name: 'Ektar 100',
    defaultWhiteBalance: 'Daylight',
    description: 'Vibrant color negative film'
  },
  'Gold 200': {
    name: 'Gold 200',
    defaultWhiteBalance: 'Daylight',
    description: 'Consumer color film'
  },
  'ColorPlus 200': {
    name: 'ColorPlus 200',
    defaultWhiteBalance: 'Daylight',
    description: 'Budget color film'
  },

  // Tungsten-balanced films (3200K)
  'CineStill 800T': {
    name: 'CineStill 800T',
    defaultWhiteBalance: 'Tungsten',
    description: 'Tungsten-balanced cinema film'
  },

  // Daylight-balanced cinema film (5500K)
  'CineStill 50D': {
    name: 'CineStill 50D',
    defaultWhiteBalance: 'Daylight',
    description: 'Daylight-balanced cinema film'
  },

  // Black & White films (white balance independent)
  'ACROS': {
    name: 'Acros 100',
    defaultWhiteBalance: 'Auto',
    description: 'Fine grain B&W film'
  },
  'Monochrome': {
    name: 'Monochrome',
    defaultWhiteBalance: 'Auto',
    description: 'Classic B&W look'
  },
  'Tri-X 400': {
    name: 'Tri-X 400',
    defaultWhiteBalance: 'Auto',
    description: 'Classic high contrast B&W'
  },
  'T-Max 400': {
    name: 'T-Max 400',
    defaultWhiteBalance: 'Auto',
    description: 'Fine grain B&W film'
  },
  'HP5 Plus': {
    name: 'HP5 Plus',
    defaultWhiteBalance: 'Auto',
    description: 'Versatile B&W film'
  },
  'Delta 100': {
    name: 'Delta 100',
    defaultWhiteBalance: 'Auto',
    description: 'Fine grain B&W film'
  },
  'Pan F Plus 50': {
    name: 'Pan F Plus 50',
    defaultWhiteBalance: 'Auto',
    description: 'Ultra-fine grain B&W'
  },
  'XP2 Super': {
    name: 'XP2 Super',
    defaultWhiteBalance: 'Auto',
    description: 'C41 B&W film'
  },

  // Cinematic Looks
  'Deakins Natural': {
    name: 'Deakins Natural',
    defaultWhiteBalance: 'Daylight',
    description: 'Natural cinematic look'
  },
  'Deakins Contrast': {
    name: 'Deakins Contrast',
    defaultWhiteBalance: 'Daylight',
    description: 'High contrast cinematic'
  },
  'Urban Night': {
    name: 'Urban Night',
    defaultWhiteBalance: 'Tungsten',
    description: 'Night urban photography'
  },
  'Muted Noir': {
    name: 'Muted Noir',
    defaultWhiteBalance: 'Daylight',
    description: 'Modern noir look'
  },
  'Blade Runner': {
    name: 'Blade Runner',
    defaultWhiteBalance: 'Tungsten',
    description: 'Sci-fi night look'
  },
  'Matrix Green': {
    name: 'Matrix Green',
    defaultWhiteBalance: 'Fluorescent',
    description: 'Digital green tint'
  },
  'Ozark Blue': {
    name: 'Ozark Blue',
    defaultWhiteBalance: 'Daylight',
    description: 'Cold dramatic look'
  },
  'Mexican Yellow': {
    name: 'Mexican Yellow',
    defaultWhiteBalance: 'Daylight',
    description: 'Warm dramatic look'
  }
} as const;