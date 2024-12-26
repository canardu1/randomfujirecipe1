// Film simulation color profiles based on Fujifilm's color science
export const filmProfiles = {
  'Classic Neg': {
    base: {
      contrast: 1.1,
      saturation: 0.9,
      temperature: 5,
      shadows: '#2c3b47',
      highlights: '#f7e9d5',
    },
    curves: {
      red: [[0, 10], [128, 140], [255, 245]],
      green: [[0, 0], [128, 120], [255, 255]],
      blue: [[0, 15], [128, 110], [255, 235]],
    }
  },
  'Velvia': {
    base: {
      contrast: 1.3,
      saturation: 1.4,
      temperature: 0,
      shadows: '#1a1f2c',
      highlights: '#ffffff',
    },
    curves: {
      red: [[0, 0], [128, 150], [255, 255]],
      green: [[0, 0], [128, 145], [255, 255]],
      blue: [[0, 0], [128, 140], [255, 255]],
    }
  },
  'Classic Chrome': {
    base: {
      contrast: 1.1,
      saturation: 0.8,
      temperature: -3,
      shadows: '#222420',
      highlights: '#f0ebe5',
    },
    curves: {
      red: [[0, 15], [128, 120], [255, 240]],
      green: [[0, 10], [128, 115], [255, 235]],
      blue: [[0, 20], [128, 110], [255, 230]],
    }
  },
  'PROVIA/Standard': {
    base: {
      contrast: 1.0,
      saturation: 1.0,
      temperature: 0,
      shadows: '#1a1a1a',
      highlights: '#ffffff',
    },
    curves: {
      red: [[0, 0], [128, 128], [255, 255]],
      green: [[0, 0], [128, 128], [255, 255]],
      blue: [[0, 0], [128, 128], [255, 255]],
    }
  },
  'ASTIA/Soft': {
    base: {
      contrast: 0.95,
      saturation: 0.95,
      temperature: 2,
      shadows: '#1f1f1f',
      highlights: '#f8f8f8',
    },
    curves: {
      red: [[0, 5], [128, 125], [255, 250]],
      green: [[0, 0], [128, 125], [255, 250]],
      blue: [[0, 5], [128, 125], [255, 245]],
    }
  },
  'PRO Neg Hi': {
    base: {
      contrast: 1.1,
      saturation: 0.9,
      temperature: 0,
      shadows: '#1f1f1f',
      highlights: '#f5f5f5',
    },
    curves: {
      red: [[0, 5], [128, 135], [255, 250]],
      green: [[0, 0], [128, 130], [255, 245]],
      blue: [[0, 5], [128, 125], [255, 240]],
    }
  },
  'PRO Neg Std': {
    base: {
      contrast: 1.0,
      saturation: 0.85,
      temperature: 0,
      shadows: '#1f1f1f',
      highlights: '#f5f5f5',
    },
    curves: {
      red: [[0, 5], [128, 130], [255, 245]],
      green: [[0, 0], [128, 125], [255, 240]],
      blue: [[0, 5], [128, 120], [255, 235]],
    }
  },
  'Eterna': {
    base: {
      contrast: 0.95,
      saturation: 0.85,
      temperature: -2,
      shadows: '#202020',
      highlights: '#f0f0f0',
    },
    curves: {
      red: [[0, 10], [128, 120], [255, 235]],
      green: [[0, 5], [128, 115], [255, 230]],
      blue: [[0, 10], [128, 115], [255, 225]],
    }
  },
  'ACROS': {
    base: {
      contrast: 1.1,
      saturation: 0,
      temperature: 0,
      shadows: '#1a1a1a',
      highlights: '#f8f8f8',
    },
    curves: {
      red: [[0, 0], [128, 135], [255, 255]],
      green: [[0, 0], [128, 135], [255, 255]],
      blue: [[0, 0], [128, 135], [255, 255]],
    }
  },
  'Monochrome': {
    base: {
      contrast: 1.0,
      saturation: 0,
      temperature: 0,
      shadows: '#1a1a1a',
      highlights: '#f8f8f8',
    },
    curves: {
      red: [[0, 0], [128, 128], [255, 255]],
      green: [[0, 0], [128, 128], [255, 255]],
      blue: [[0, 0], [128, 128], [255, 255]],
    }
  }
} as const;