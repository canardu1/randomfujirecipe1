export const filmSimulationProfiles = {
  // Existing Fujifilm profiles...
  'Classic Neg': {
    profile: 'Adobe Color',
    adjustments: {
      temperature: 5,
      tint: 0,
      vibrance: -5,
      saturation: -10,
      contrast: 15,
      highlights: 10,
      shadows: -10
    }
  },
  
  // Kodak Profiles
  'Portra 160': {
    profile: 'Camera Portrait',
    adjustments: {
      temperature: 2,
      tint: 0,
      vibrance: -5,
      saturation: -15,
      contrast: -5,
      highlights: -5,
      shadows: 5
    }
  },
  'Portra 400': {
    profile: 'Camera Portrait',
    adjustments: {
      temperature: 3,
      tint: 0,
      vibrance: -10,
      saturation: -20,
      contrast: -10,
      highlights: -8,
      shadows: 8
    }
  },
  'Portra 800': {
    profile: 'Camera Portrait',
    adjustments: {
      temperature: 4,
      tint: 0,
      vibrance: -8,
      saturation: -15,
      contrast: 5,
      highlights: -5,
      shadows: 10
    }
  },
  'Ektar 100': {
    profile: 'Camera Vivid',
    adjustments: {
      temperature: -2,
      tint: 0,
      vibrance: 20,
      saturation: 30,
      contrast: 20,
      highlights: 15,
      shadows: -5
    }
  },
  'Gold 200': {
    profile: 'Camera Standard',
    adjustments: {
      temperature: 8,
      tint: 0,
      vibrance: 10,
      saturation: 10,
      contrast: 10,
      highlights: 5,
      shadows: -5
    }
  },
  'ColorPlus 200': {
    profile: 'Camera Standard',
    adjustments: {
      temperature: 6,
      tint: 0,
      vibrance: 5,
      saturation: 5,
      contrast: 5,
      highlights: 0,
      shadows: 0
    }
  },
  
  // CineStill Profiles
  'CineStill 50D': {
    profile: 'Camera Standard',
    adjustments: {
      temperature: -3,
      tint: 0,
      vibrance: 10,
      saturation: 10,
      contrast: 15,
      highlights: 10,
      shadows: -5
    }
  },
  'CineStill 800T': {
    profile: 'Camera Standard',
    adjustments: {
      temperature: -8,
      tint: 0,
      vibrance: -5,
      saturation: -5,
      contrast: 10,
      highlights: 5,
      shadows: 10
    }
  },
  
  // Black & White Profiles
  'Tri-X 400': {
    profile: 'Camera Monochrome',
    adjustments: {
      temperature: 0,
      tint: 0,
      vibrance: 0,
      saturation: -100,
      contrast: 20,
      highlights: 10,
      shadows: -10
    }
  },
  'T-Max 400': {
    profile: 'Camera Monochrome',
    adjustments: {
      temperature: 0,
      tint: 0,
      vibrance: 0,
      saturation: -100,
      contrast: 15,
      highlights: 5,
      shadows: -5
    }
  },
  'HP5 Plus': {
    profile: 'Camera Monochrome',
    adjustments: {
      temperature: 0,
      tint: 0,
      vibrance: 0,
      saturation: -100,
      contrast: 10,
      highlights: 0,
      shadows: 0
    }
  },
  'Delta 100': {
    profile: 'Camera Monochrome',
    adjustments: {
      temperature: 0,
      tint: 0,
      vibrance: 0,
      saturation: -100,
      contrast: 25,
      highlights: 15,
      shadows: -15
    }
  },
  'Pan F Plus 50': {
    profile: 'Camera Monochrome',
    adjustments: {
      temperature: 0,
      tint: 0,
      vibrance: 0,
      saturation: -100,
      contrast: 30,
      highlights: 20,
      shadows: -20
    }
  },
  'XP2 Super': {
    profile: 'Camera Monochrome',
    adjustments: {
      temperature: 0,
      tint: 0,
      vibrance: 0,
      saturation: -100,
      contrast: 20,
      highlights: 10,
      shadows: -10
    }
  }
} as const;