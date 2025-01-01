// Extended cinematic profiles with unique characteristics
export const cinematicExtendedProfiles = {
  'Neon Nights': {
    base: {
      contrast: 1.35,
      saturation: 1.25,
      temperature: -10,
      shadows: '#1a0033',
      highlights: '#e6ccff'
    },
    curves: {
      red: [[0, 5], [64, 60], [128, 120], [192, 180], [255, 235]],
      green: [[0, 0], [64, 50], [128, 110], [192, 170], [255, 225]],
      blue: [[0, 15], [64, 85], [128, 155], [192, 225], [255, 255]]
    },
    effects: {
      tint: -20,
      colorize: { hue: 280, strength: 0.2 }
    }
  },
  'Vintage Technicolor': {
    base: {
      contrast: 1.45,
      saturation: 1.5,
      temperature: 5,
      shadows: '#331a1a',
      highlights: '#fff5f0'
    },
    curves: {
      red: [[0, 10], [64, 85], [128, 160], [192, 230], [255, 255]],
      green: [[0, 5], [64, 75], [128, 145], [192, 215], [255, 250]],
      blue: [[0, 0], [64, 65], [128, 130], [192, 195], [255, 240]]
    },
    effects: {
      tint: 10,
      colorize: { hue: 30, strength: 0.15 }
    }
  },
  'Nordic Winter': {
    base: {
      contrast: 1.2,
      saturation: 0.9,
      temperature: -15,
      shadows: '#1a2633',
      highlights: '#f0f5ff'
    },
    curves: {
      red: [[0, 0], [64, 55], [128, 115], [192, 175], [255, 235]],
      green: [[0, 5], [64, 65], [128, 130], [192, 195], [255, 245]],
      blue: [[0, 10], [64, 80], [128, 150], [192, 220], [255, 255]]
    },
    effects: {
      tint: -15,
      colorize: { hue: 210, strength: 0.1 }
    }
  },
  'Desert Gold': {
    base: {
      contrast: 1.3,
      saturation: 1.2,
      temperature: 20,
      shadows: '#332211',
      highlights: '#fff5e6'
    },
    curves: {
      red: [[0, 10], [64, 85], [128, 155], [192, 225], [255, 255]],
      green: [[0, 5], [64, 75], [128, 145], [192, 215], [255, 250]],
      blue: [[0, 0], [64, 55], [128, 110], [192, 165], [255, 220]]
    },
    effects: {
      tint: 15,
      colorize: { hue: 45, strength: 0.2 }
    }
  },
  'Moonlight': {
    base: {
      contrast: 1.25,
      saturation: 0.85,
      temperature: -20,
      shadows: '#000033',
      highlights: '#e6f0ff'
    },
    curves: {
      red: [[0, 0], [64, 50], [128, 110], [192, 170], [255, 230]],
      green: [[0, 5], [64, 60], [128, 125], [192, 190], [255, 245]],
      blue: [[0, 15], [64, 85], [128, 155], [192, 225], [255, 255]]
    },
    effects: {
      tint: -10,
      colorize: { hue: 220, strength: 0.15 }
    }
  },
  'Autumn': {
    base: {
      contrast: 1.35,
      saturation: 1.3,
      temperature: 15,
      shadows: '#331a00',
      highlights: '#fff0e6'
    },
    curves: {
      red: [[0, 15], [64, 90], [128, 165], [192, 230], [255, 255]],
      green: [[0, 5], [64, 70], [128, 135], [192, 200], [255, 245]],
      blue: [[0, 0], [64, 50], [128, 100], [192, 150], [255, 200]]
    },
    effects: {
      tint: 20,
      colorize: { hue: 30, strength: 0.2 }
    }
  },
  'Emerald City': {
    base: {
      contrast: 1.3,
      saturation: 1.2,
      temperature: -5,
      shadows: '#001a1a',
      highlights: '#e6ffff'
    },
    curves: {
      red: [[0, 0], [64, 55], [128, 115], [192, 175], [255, 235]],
      green: [[0, 15], [64, 85], [128, 155], [192, 225], [255, 255]],
      blue: [[0, 5], [64, 65], [128, 130], [192, 195], [255, 245]]
    },
    effects: {
      tint: -5,
      colorize: { hue: 160, strength: 0.15 }
    }
  },
  'Pastel Dream': {
    base: {
      contrast: 1.15,
      saturation: 0.9,
      temperature: 5,
      shadows: '#1a1a2b',
      highlights: '#fff5f5'
    },
    curves: {
      red: [[0, 5], [64, 70], [128, 135], [192, 200], [255, 245]],
      green: [[0, 5], [64, 70], [128, 135], [192, 200], [255, 245]],
      blue: [[0, 10], [64, 75], [128, 140], [192, 205], [255, 250]]
    },
    effects: {
      tint: 5,
      colorize: { hue: 330, strength: 0.1 }
    }
  }
} as const;