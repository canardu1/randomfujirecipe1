// Instagram-inspired color profiles with modern aesthetics
export const instagramInspired = {
  'Golden Hour': {
    base: {
      contrast: 1.2,
      saturation: 1.15,
      temperature: 15,
      shadows: '#2a1810',
      highlights: '#fff2e6'
    },
    curves: {
      red: [[0, 10], [64, 85], [128, 160], [192, 230], [255, 255]],
      green: [[0, 5], [64, 75], [128, 145], [192, 215], [255, 245]],
      blue: [[0, 0], [64, 60], [128, 120], [192, 180], [255, 230]]
    },
    effects: {
      tint: 10,
      colorize: { hue: 35, strength: 0.15 }
    }
  },
  'Minimal Mood': {
    base: {
      contrast: 1.1,
      saturation: 0.85,
      temperature: -5,
      shadows: '#1a1a1a',
      highlights: '#f8f8f8'
    },
    curves: {
      red: [[0, 5], [64, 70], [128, 135], [192, 200], [255, 240]],
      green: [[0, 5], [64, 70], [128, 135], [192, 200], [255, 240]],
      blue: [[0, 5], [64, 70], [128, 135], [192, 200], [255, 240]]
    },
    effects: {
      tint: -5,
      colorize: { hue: 220, strength: 0.05 }
    }
  },
  'Urban Fade': {
    base: {
      contrast: 1.15,
      saturation: 0.9,
      temperature: -8,
      shadows: '#1a1a1a',
      highlights: '#f5f5f5'
    },
    curves: {
      red: [[0, 5], [64, 65], [128, 130], [192, 195], [255, 245]],
      green: [[0, 5], [64, 65], [128, 130], [192, 195], [255, 245]],
      blue: [[0, 8], [64, 70], [128, 135], [192, 200], [255, 250]]
    },
    effects: {
      tint: -5,
      colorize: { hue: 210, strength: 0.1 }
    }
  },
  'Cafe Tones': {
    base: {
      contrast: 1.25,
      saturation: 1.1,
      temperature: 10,
      shadows: '#261a14',
      highlights: '#f9f4f0'
    },
    curves: {
      red: [[0, 8], [64, 80], [128, 150], [192, 220], [255, 250]],
      green: [[0, 5], [64, 75], [128, 140], [192, 210], [255, 245]],
      blue: [[0, 0], [64, 65], [128, 125], [192, 185], [255, 235]]
    },
    effects: {
      tint: 8,
      colorize: { hue: 25, strength: 0.12 }
    }
  },
  'Travel Story': {
    base: {
      contrast: 1.18,
      saturation: 1.05,
      temperature: 5,
      shadows: '#1a1a1a',
      highlights: '#f8f6f4'
    },
    curves: {
      red: [[0, 5], [64, 75], [128, 140], [192, 210], [255, 245]],
      green: [[0, 5], [64, 72], [128, 138], [192, 208], [255, 242]],
      blue: [[0, 2], [64, 68], [128, 132], [192, 200], [255, 240]]
    },
    effects: {
      tint: 3,
      colorize: { hue: 45, strength: 0.08 }
    }
  },
  'Clean Portrait': {
    base: {
      contrast: 1.12,
      saturation: 0.95,
      temperature: 2,
      shadows: '#1c1c1c',
      highlights: '#faf8f6'
    },
    curves: {
      red: [[0, 5], [64, 70], [128, 135], [192, 205], [255, 245]],
      green: [[0, 3], [64, 68], [128, 133], [192, 203], [255, 243]],
      blue: [[0, 0], [64, 65], [128, 130], [192, 200], [255, 240]]
    },
    effects: {
      tint: 2,
      colorize: { hue: 30, strength: 0.05 }
    }
  }
} as const;