// Halation color presets with RGB values for better control
export const halationColors = {
  // Warm halation colors (reddish)
  'Portra': { r: 255, g: 142, b: 122 },
  'Ektar': { r: 255, g: 107, b: 91 },
  'Gold': { r: 255, g: 184, b: 146 },
  
  // Cool halation colors (bluish)
  'CineStill T': { r: 122, g: 165, b: 255 },
  'Tungsten': { r: 93, g: 137, b: 255 },
  'Night': { r: 77, g: 122, b: 255 },
  
  // Neutral halation colors
  'Classic': { r: 255, g: 255, b: 255 },
  'Silver': { r: 224, g: 224, b: 224 },
  'Pearl': { r: 208, g: 208, b: 208 },
  
  // Vintage tones
  'Sepia': { r: 212, g: 162, b: 118 },
  'Amber': { r: 255, g: 191, b: 105 },
  'Bronze': { r: 205, g: 127, b: 50 }
} as const;