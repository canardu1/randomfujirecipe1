// Film simulations and settings constants
export const filmSimulations = [
  // Fujifilm
  'Classic Neg',
  'Velvia',
  'Classic Chrome',
  'PROVIA/Standard',
  'ASTIA/Soft',
  'PRO Neg Hi',
  'PRO Neg Std',
  'Eterna',
  'ACROS',
  'Monochrome',
  // Kodak
  'Portra 160',
  'Portra 400',
  'Portra 800',
  'Ektar 100',
  'Gold 200',
  'ColorPlus 200',
  'Tri-X 400',
  'T-Max 400',
  // Ilford
  'HP5 Plus',
  'Delta 100',
  'Pan F Plus 50',
  'XP2 Super',
  // CineStill
  'CineStill 50D',
  'CineStill 800T',
  // Cinematic
  'Deakins Natural',
  'Deakins Contrast',
  'Urban Night',
  'Muted Noir',
  'Blade Runner',
  'Matrix Green',
  'Ozark Blue',
  'Mexican Yellow',
  'Neon Nights',
  'Vintage Technicolor',
  'Nordic Winter',
  'Desert Gold',
  'Moonlight',
  'Autumn',
  'Emerald City',
  'Pastel Dream',
  // Modern
  'Golden Hour',
  'Minimal Mood',
  'Urban Fade',
  'Cafe Tones',
  'Travel Story',
  'Clean Portrait'
] as const;

export const dynamicRanges = ['DR100', 'DR200', 'DR400'] as const;
export const grainEffects = ['Off', 'Weak', 'Strong'] as const;
export const grainSizes = ['Small', 'Large'] as const;
export const chromeEffects = ['Off', 'Weak', 'Strong'] as const;
export const whiteBalances = ['Auto', 'Daylight', 'Shade', 'Cloudy', 'Tungsten', 'Fluorescent'] as const;
export const aspectRatios = ['Original', '3:2', '16:9', '1:1'] as const;