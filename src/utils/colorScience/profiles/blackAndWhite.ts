// Black & White film profiles with accurate tonal response
export const blackAndWhiteProfiles = {
  'ACROS': {
    base: {
      contrast: 1.25,
      saturation: 0,
      temperature: 0,
      shadows: '#141414',
      highlights: '#f9f9f9'
    },
    curves: {
      red: [[0, 0], [64, 72], [128, 142], [192, 225], [255, 255]],
      green: [[0, 0], [64, 72], [128, 142], [192, 225], [255, 255]],
      blue: [[0, 0], [64, 72], [128, 142], [192, 225], [255, 255]]
    }
  },
  'Monochrome': {
    base: {
      contrast: 1.15,
      saturation: 0,
      temperature: 0,
      shadows: '#1a1a1a',
      highlights: '#f7f7f7'
    },
    curves: {
      red: [[0, 5], [64, 68], [128, 135], [192, 210], [255, 250]],
      green: [[0, 5], [64, 68], [128, 135], [192, 210], [255, 250]],
      blue: [[0, 5], [64, 68], [128, 135], [192, 210], [255, 250]]
    }
  }
} as const;