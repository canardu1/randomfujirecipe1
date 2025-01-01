// Kodak film profiles with accurate color science
export const kodakProfiles = {
  'Portra 160': {
    base: {
      contrast: 1.05,
      saturation: 0.85,
      temperature: 1,
      shadows: '#1f2420',
      highlights: '#f8f5f0'
    },
    curves: {
      red: [[0, 5], [64, 68], [128, 132], [192, 210], [255, 245]],
      green: [[0, 2], [64, 65], [128, 130], [192, 205], [255, 242]],
      blue: [[0, 0], [64, 62], [128, 125], [192, 195], [255, 238]]
    }
  },
  'Portra 400': {
    base: {
      contrast: 1.08,
      saturation: 0.82,
      temperature: 2,
      shadows: '#202020',
      highlights: '#f6f3ee'
    },
    curves: {
      red: [[0, 8], [64, 70], [128, 135], [192, 215], [255, 248]],
      green: [[0, 5], [64, 68], [128, 132], [192, 210], [255, 245]],
      blue: [[0, 2], [64, 65], [128, 128], [192, 200], [255, 240]]
    }
  },
  'Portra 800': {
    base: {
      contrast: 1.12,
      saturation: 0.88,
      temperature: 3,
      shadows: '#1e1e1e',
      highlights: '#f5f2ed'
    },
    curves: {
      red: [[0, 10], [64, 72], [128, 138], [192, 218], [255, 250]],
      green: [[0, 8], [64, 70], [128, 135], [192, 212], [255, 248]],
      blue: [[0, 5], [64, 68], [128, 130], [192, 205], [255, 242]]
    }
  },
  'Ektar 100': {
    base: {
      contrast: 1.25,
      saturation: 1.35,
      temperature: -1,
      shadows: '#1a1a1a',
      highlights: '#ffffff'
    },
    curves: {
      red: [[0, 0], [64, 75], [128, 145], [192, 225], [255, 255]],
      green: [[0, 0], [64, 70], [128, 140], [192, 220], [255, 252]],
      blue: [[0, 0], [64, 65], [128, 135], [192, 215], [255, 250]]
    }
  },
  'Gold 200': {
    base: {
      contrast: 1.15,
      saturation: 1.15,
      temperature: 4,
      shadows: '#1f1f1f',
      highlights: '#f8f3e8'
    },
    curves: {
      red: [[0, 5], [64, 72], [128, 140], [192, 220], [255, 250]],
      green: [[0, 2], [64, 68], [128, 135], [192, 215], [255, 245]],
      blue: [[0, 0], [64, 62], [128, 125], [192, 200], [255, 235]]
    }
  },
  'ColorPlus 200': {
    base: {
      contrast: 1.1,
      saturation: 1.08,
      temperature: 3,
      shadows: '#1e1e1e',
      highlights: '#f7f2ea'
    },
    curves: {
      red: [[0, 5], [64, 70], [128, 135], [192, 215], [255, 248]],
      green: [[0, 2], [64, 65], [128, 130], [192, 210], [255, 245]],
      blue: [[0, 0], [64, 62], [128, 125], [192, 200], [255, 240]]
    }
  }
} as const;