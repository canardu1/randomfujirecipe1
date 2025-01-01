// Cinematic color profiles with accurate color science
export const cinematicProfiles = {
  'Deakins Natural': {
    base: {
      contrast: 1.1,
      saturation: 0.95,
      temperature: 0,
      shadows: '#1a1a1a',
      highlights: '#f8f8f8'
    },
    curves: {
      red: [[0, 0], [64, 65], [128, 130], [192, 195], [255, 250]],
      green: [[0, 0], [64, 65], [128, 130], [192, 195], [255, 250]],
      blue: [[0, 0], [64, 65], [128, 130], [192, 195], [255, 250]]
    }
  },
  'Deakins Contrast': {
    base: {
      contrast: 1.3,
      saturation: 0.9,
      temperature: -2,
      shadows: '#141414',
      highlights: '#fafafa'
    },
    curves: {
      red: [[0, 0], [64, 60], [128, 125], [192, 200], [255, 255]],
      green: [[0, 0], [64, 60], [128, 125], [192, 200], [255, 255]],
      blue: [[0, 0], [64, 60], [128, 125], [192, 200], [255, 255]]
    }
  },
  'Urban Night': {
    base: {
      contrast: 1.25,
      saturation: 1.1,
      temperature: -15,
      shadows: '#000033',
      highlights: '#e6f0ff'
    },
    curves: {
      red: [[0, 0], [64, 55], [128, 115], [192, 180], [255, 235]],
      green: [[0, 5], [64, 60], [128, 120], [192, 185], [255, 240]],
      blue: [[0, 15], [64, 80], [128, 150], [192, 220], [255, 255]]
    }
  },
  'Muted Noir': {
    base: {
      contrast: 1.2,
      saturation: 0.8,
      temperature: -5,
      shadows: '#1a1a1a',
      highlights: '#f0f0f0'
    },
    curves: {
      red: [[0, 5], [64, 60], [128, 120], [192, 185], [255, 240]],
      green: [[0, 5], [64, 60], [128, 120], [192, 185], [255, 240]],
      blue: [[0, 5], [64, 60], [128, 120], [192, 185], [255, 240]]
    }
  },
  'Blade Runner': {
    base: {
      contrast: 1.4,
      saturation: 1.3,
      temperature: -20,
      shadows: '#000040',
      highlights: '#00ffff'
    },
    curves: {
      red: [[0, 0], [64, 45], [128, 100], [192, 165], [255, 225]],
      green: [[0, 5], [64, 70], [128, 135], [192, 195], [255, 245]],
      blue: [[0, 15], [64, 90], [128, 165], [192, 235], [255, 255]]
    }
  },
  'Matrix Green': {
    base: {
      contrast: 1.5,
      saturation: 1.3,
      temperature: -15,
      shadows: '#001200',
      highlights: '#00ff00'
    },
    curves: {
      red: [[0, 0], [64, 40], [128, 90], [192, 140], [255, 200]],
      green: [[0, 20], [64, 95], [128, 165], [192, 235], [255, 255]],
      blue: [[0, 0], [64, 40], [128, 90], [192, 140], [255, 200]]
    }
  },
  'Ozark Blue': {
    base: {
      contrast: 1.3,
      saturation: 0.85,
      temperature: -25,
      shadows: '#000025',
      highlights: '#e0e8ff'
    },
    curves: {
      red: [[0, 0], [64, 50], [128, 110], [192, 170], [255, 230]],
      green: [[0, 5], [64, 60], [128, 125], [192, 185], [255, 240]],
      blue: [[0, 10], [64, 75], [128, 145], [192, 215], [255, 255]]
    }
  },
  'Mexican Yellow': {
    base: {
      contrast: 1.4,
      saturation: 1.4,
      temperature: 25,
      shadows: '#402200',
      highlights: '#ffee00'
    },
    curves: {
      red: [[0, 10], [64, 95], [128, 175], [192, 235], [255, 255]],
      green: [[0, 10], [64, 90], [128, 170], [192, 230], [255, 255]],
      blue: [[0, 0], [64, 30], [128, 70], [192, 120], [255, 180]]
    }
  }
} as const;