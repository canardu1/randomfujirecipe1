// Updated Fujifilm profiles with accurate color science
export const fujifilmProfiles = {
  'PRO Neg Hi': {
    base: {
      contrast: 1.15,
      saturation: 0.9,
      temperature: 1,
      shadows: '#1a1a1a',
      highlights: '#f8f8f8'
    },
    curves: {
      red: [[0, 5], [64, 70], [128, 135], [192, 215], [255, 250]],
      green: [[0, 2], [64, 65], [128, 130], [192, 210], [255, 245]],
      blue: [[0, 0], [64, 62], [128, 125], [192, 205], [255, 240]]
    }
  },
  'PRO Neg Std': {
    base: {
      contrast: 1.08,
      saturation: 0.85,
      temperature: 0,
      shadows: '#1d1d1d',
      highlights: '#f6f6f6'
    },
    curves: {
      red: [[0, 2], [64, 65], [128, 130], [192, 205], [255, 245]],
      green: [[0, 0], [64, 62], [128, 125], [192, 200], [255, 242]],
      blue: [[0, 0], [64, 60], [128, 122], [192, 195], [255, 240]]
    }
  },
  'PROVIA/Standard': {
    base: {
      contrast: 1.1,
      saturation: 1.0,
      temperature: 0,
      shadows: '#1a1a1a',
      highlights: '#ffffff'
    },
    curves: {
      red: [[0, 0], [64, 65], [128, 130], [192, 210], [255, 255]],
      green: [[0, 0], [64, 65], [128, 130], [192, 210], [255, 255]],
      blue: [[0, 0], [64, 65], [128, 130], [192, 210], [255, 255]]
    }
  },
  'Velvia': {
    base: {
      contrast: 1.4,
      saturation: 1.6,
      temperature: 2,
      shadows: '#1a1a1a',
      highlights: '#ffffff'
    },
    curves: {
      red: [[0, 0], [64, 75], [128, 145], [192, 220], [255, 255]],
      green: [[0, 0], [64, 70], [128, 140], [192, 215], [255, 255]],
      blue: [[0, 0], [64, 65], [128, 135], [192, 210], [255, 250]]
    }
  },
  'ASTIA/Soft': {
    base: {
      contrast: 1.05,
      saturation: 0.9,
      temperature: 1,
      shadows: '#1f1f1f',
      highlights: '#fafafa'
    },
    curves: {
      red: [[0, 5], [64, 70], [128, 130], [192, 210], [255, 250]],
      green: [[0, 0], [64, 68], [128, 128], [192, 205], [255, 250]],
      blue: [[0, 0], [64, 65], [128, 125], [192, 200], [255, 245]]
    }
  },
  'Classic Chrome': {
    base: {
      contrast: 1.15,
      saturation: 0.8,
      temperature: -2,
      shadows: '#1a1a1a',
      highlights: '#f8f8f8'
    },
    curves: {
      red: [[0, 10], [64, 65], [128, 120], [192, 185], [255, 240]],
      green: [[0, 5], [64, 60], [128, 118], [192, 180], [255, 235]],
      blue: [[0, 0], [64, 55], [128, 115], [192, 175], [255, 230]]
    }
  },
  'Classic Neg': {
    base: {
      contrast: 1.2,
      saturation: 0.95,
      temperature: 3,
      shadows: '#1d1d1d',
      highlights: '#f5f5f5'
    },
    curves: {
      red: [[0, 5], [64, 70], [128, 135], [192, 210], [255, 245]],
      green: [[0, 0], [64, 65], [128, 130], [192, 205], [255, 240]],
      blue: [[0, 0], [64, 60], [128, 125], [192, 200], [255, 235]]
    }
  },
  'Eterna': {
    base: {
      contrast: 0.95,
      saturation: 0.85,
      temperature: -1,
      shadows: '#1e1e1e',
      highlights: '#f4f4f4'
    },
    curves: {
      red: [[0, 5], [64, 65], [128, 125], [192, 190], [255, 240]],
      green: [[0, 5], [64, 65], [128, 125], [192, 190], [255, 240]],
      blue: [[0, 5], [64, 65], [128, 125], [192, 190], [255, 240]]
    }
  }
} as const;