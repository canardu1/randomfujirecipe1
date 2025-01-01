// CineStill film profiles with accurate motion picture film characteristics
export const cinestillProfiles = {
  'CineStill 50D': {
    base: {
      contrast: 1.18,
      saturation: 1.12,
      temperature: -1,
      shadows: '#1a1a1a',
      highlights: '#f8f8ff'
    },
    curves: {
      red: [[0, 2], [64, 68], [128, 135], [192, 220], [255, 255]],
      green: [[0, 0], [64, 65], [128, 132], [192, 215], [255, 252]],
      blue: [[0, 0], [64, 65], [128, 130], [192, 210], [255, 250]]
    }
  },
  'CineStill 800T': {
    base: {
      contrast: 1.15,
      saturation: 0.92,
      temperature: -5,
      shadows: '#1c1c24',
      highlights: '#f0f4f8'
    },
    curves: {
      red: [[0, 0], [64, 62], [128, 125], [192, 205], [255, 245]],
      green: [[0, 2], [64, 65], [128, 130], [192, 210], [255, 248]],
      blue: [[0, 5], [64, 70], [128, 138], [192, 220], [255, 255]]
    }
  }
} as const;