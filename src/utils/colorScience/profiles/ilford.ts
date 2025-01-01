// Ilford black & white film profiles with accurate tonal response
export const ilfordProfiles = {
  'HP5 Plus': {
    base: {
      contrast: 1.15,
      saturation: 0,
      temperature: 0,
      shadows: '#181818',
      highlights: '#f7f7f7'
    },
    curves: {
      red: [[0, 5], [64, 68], [128, 135], [192, 210], [255, 250]],
      green: [[0, 5], [64, 68], [128, 135], [192, 210], [255, 250]],
      blue: [[0, 5], [64, 68], [128, 135], [192, 210], [255, 250]]
    }
  },
  'Delta 100': {
    base: {
      contrast: 1.28,
      saturation: 0,
      temperature: 0,
      shadows: '#141414',
      highlights: '#fafafa'
    },
    curves: {
      red: [[0, 0], [64, 70], [128, 140], [192, 225], [255, 255]],
      green: [[0, 0], [64, 70], [128, 140], [192, 225], [255, 255]],
      blue: [[0, 0], [64, 70], [128, 140], [192, 225], [255, 255]]
    }
  },
  'Pan F Plus 50': {
    base: {
      contrast: 1.32,
      saturation: 0,
      temperature: 0,
      shadows: '#121212',
      highlights: '#fbfbfb'
    },
    curves: {
      red: [[0, 0], [64, 72], [128, 145], [192, 228], [255, 255]],
      green: [[0, 0], [64, 72], [128, 145], [192, 228], [255, 255]],
      blue: [[0, 0], [64, 72], [128, 145], [192, 228], [255, 255]]
    }
  },
  'XP2 Super': {
    base: {
      contrast: 1.22,
      saturation: 0,
      temperature: 0,
      shadows: '#151515',
      highlights: '#f9f9f9'
    },
    curves: {
      red: [[0, 2], [64, 68], [128, 138], [192, 215], [255, 252]],
      green: [[0, 2], [64, 68], [128, 138], [192, 215], [255, 252]],
      blue: [[0, 2], [64, 68], [128, 138], [192, 215], [255, 252]]
    }
  }
} as const;