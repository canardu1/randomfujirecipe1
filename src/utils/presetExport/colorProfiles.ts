import { FilmSimulation } from '../../types/Recipe';

export interface ColorProfile {
  profile: string;
  toneCurve: {
    red: [number, number][];
    green: [number, number][];
    blue: [number, number][];
  };
  adjustments: {
    temperature: number;
    tint: number;
    vibrance: number;
    saturation: number;
    contrast: number;
    highlights: number;
    shadows: number;
  };
}

export const filmSimulationProfiles: Record<FilmSimulation, ColorProfile> = {
  'Classic Neg': {
    profile: 'Adobe Color',
    toneCurve: {
      red: [[0, 0], [64, 74], [128, 138], [192, 192], [255, 255]],
      green: [[0, 0], [64, 60], [128, 128], [192, 192], [255, 245]],
      blue: [[0, 15], [64, 58], [128, 110], [192, 192], [255, 235]]
    },
    adjustments: {
      temperature: 5,
      tint: 0,
      vibrance: -5,
      saturation: -10,
      contrast: 15,
      highlights: 10,
      shadows: -10
    }
  },
  'Velvia': {
    profile: 'Adobe Color',
    toneCurve: {
      red: [[0, 0], [64, 60], [128, 138], [192, 200], [255, 255]],
      green: [[0, 0], [64, 60], [128, 138], [192, 200], [255, 255]],
      blue: [[0, 0], [64, 60], [128, 138], [192, 200], [255, 255]]
    },
    adjustments: {
      temperature: 0,
      tint: 0,
      vibrance: 20,
      saturation: 15,
      contrast: 25,
      highlights: 15,
      shadows: -5
    }
  },
  'Classic Chrome': {
    profile: 'Adobe Color',
    toneCurve: {
      red: [[0, 0], [64, 58], [128, 128], [192, 192], [255, 245]],
      green: [[0, 10], [64, 58], [128, 115], [192, 192], [255, 235]],
      blue: [[0, 20], [64, 58], [128, 110], [192, 192], [255, 230]]
    },
    adjustments: {
      temperature: -5,
      tint: 0,
      vibrance: -10,
      saturation: -15,
      contrast: 10,
      highlights: -5,
      shadows: -10
    }
  },
  'PROVIA/Standard': {
    profile: 'Adobe Color',
    toneCurve: {
      red: [[0, 0], [64, 64], [128, 128], [192, 192], [255, 255]],
      green: [[0, 0], [64, 64], [128, 128], [192, 192], [255, 255]],
      blue: [[0, 0], [64, 64], [128, 128], [192, 192], [255, 255]]
    },
    adjustments: {
      temperature: 0,
      tint: 0,
      vibrance: 0,
      saturation: 0,
      contrast: 0,
      highlights: 0,
      shadows: 0
    }
  },
  'ASTIA/Soft': {
    profile: 'Adobe Portrait',
    toneCurve: {
      red: [[0, 0], [64, 68], [128, 128], [192, 188], [255, 255]],
      green: [[0, 0], [64, 68], [128, 128], [192, 188], [255, 255]],
      blue: [[0, 0], [64, 68], [128, 128], [192, 188], [255, 255]]
    },
    adjustments: {
      temperature: 2,
      tint: 0,
      vibrance: -5,
      saturation: -5,
      contrast: -5,
      highlights: -5,
      shadows: 5
    }
  },
  'PRO Neg Hi': {
    profile: 'Adobe Portrait',
    toneCurve: {
      red: [[0, 5], [64, 68], [128, 135], [192, 192], [255, 250]],
      green: [[0, 0], [64, 64], [128, 130], [192, 192], [255, 245]],
      blue: [[0, 5], [64, 64], [128, 125], [192, 192], [255, 240]]
    },
    adjustments: {
      temperature: 0,
      tint: 0,
      vibrance: -10,
      saturation: -5,
      contrast: 10,
      highlights: 5,
      shadows: -5
    }
  },
  'PRO Neg Std': {
    profile: 'Adobe Portrait',
    toneCurve: {
      red: [[0, 5], [64, 64], [128, 130], [192, 192], [255, 245]],
      green: [[0, 0], [64, 64], [128, 125], [192, 192], [255, 240]],
      blue: [[0, 5], [64, 64], [128, 120], [192, 192], [255, 235]]
    },
    adjustments: {
      temperature: 0,
      tint: 0,
      vibrance: -5,
      saturation: -10,
      contrast: 0,
      highlights: 0,
      shadows: 0
    }
  },
  'Eterna': {
    profile: 'Adobe Neutral',
    toneCurve: {
      red: [[0, 10], [64, 64], [128, 120], [192, 192], [255, 235]],
      green: [[0, 5], [64, 64], [128, 115], [192, 192], [255, 230]],
      blue: [[0, 10], [64, 64], [128, 115], [192, 192], [255, 225]]
    },
    adjustments: {
      temperature: -3,
      tint: 0,
      vibrance: -15,
      saturation: -15,
      contrast: -10,
      highlights: -10,
      shadows: 5
    }
  },
  'ACROS': {
    profile: 'Adobe Monochrome',
    toneCurve: {
      red: [[0, 0], [64, 64], [128, 135], [192, 192], [255, 255]],
      green: [[0, 0], [64, 64], [128, 135], [192, 192], [255, 255]],
      blue: [[0, 0], [64, 64], [128, 135], [192, 192], [255, 255]]
    },
    adjustments: {
      temperature: 0,
      tint: 0,
      vibrance: 0,
      saturation: -100,
      contrast: 15,
      highlights: 5,
      shadows: -5
    }
  },
  'Monochrome': {
    profile: 'Adobe Monochrome',
    toneCurve: {
      red: [[0, 0], [64, 64], [128, 128], [192, 192], [255, 255]],
      green: [[0, 0], [64, 64], [128, 128], [192, 192], [255, 255]],
      blue: [[0, 0], [64, 64], [128, 128], [192, 192], [255, 255]]
    },
    adjustments: {
      temperature: 0,
      tint: 0,
      vibrance: 0,
      saturation: -100,
      contrast: 0,
      highlights: 0,
      shadows: 0
    }
  }
};