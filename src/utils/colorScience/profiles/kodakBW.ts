// Kodak black & white film profiles
export const kodakBWProfiles = {
  'Tri-X 400': {
    base: {
      contrast: 1.25,
      saturation: 0,
      temperature: 0,
      shadows: '#141414',
      highlights: '#f8f8f8'
    },
    curves: {
      red: [[0, 0], [64, 70], [128, 140], [192, 220], [255, 255]],
      green: [[0, 0], [64, 70], [128, 140], [192, 220], [255, 255]],
      blue: [[0, 0], [64, 70], [128, 140], [192, 220], [255, 255]]
    }
  },
  'T-Max 400': {
    base: {
      contrast: 1.2,
      saturation: 0,
      temperature: 0,
      shadows: '#161616',
      highlights: '#f9f9f9'
    },
    curves: {
      red: [[0, 0], [64, 68], [128, 135], [192, 215], [255, 255]],
      green: [[0, 0], [64, 68], [128, 135], [192, 215], [255, 255]],
      blue: [[0, 0], [64, 68], [128, 135], [192, 215], [255, 255]]
    }
  }
} as const;