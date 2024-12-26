// Normalize values to Camera Raw ranges
export const normalize = (value: number, fromRange: number): number => {
  return Math.round((value / fromRange) * 100);
};

export const normalizeGrain = (effect: string, size: string) => ({
  amount: effect === 'Off' ? 0 : effect === 'Weak' ? 20 : 40,
  size: size === 'Small' ? 25 : 45,
  frequency: effect === 'Off' ? 0 : 40
});

// Map Fuji film simulations to Adobe profiles and adjustments
export const getColorProfile = (simulation: string) => {
  const profiles: Record<string, { 
    profile: string;
    amount: number;
    colorAdjustments: {
      temperature: number;
      tint: number;
      vibrance: number;
      saturation: number;
      contrast: number;
      highlights: number;
      shadows: number;
    };
  }> = {
    'Classic Neg': {
      profile: 'Camera Standard',
      amount: 100,
      colorAdjustments: {
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
      profile: 'Camera Vivid',
      amount: 100,
      colorAdjustments: {
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
      profile: 'Camera Standard',
      amount: 100,
      colorAdjustments: {
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
      profile: 'Camera Standard',
      amount: 100,
      colorAdjustments: {
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
      profile: 'Camera Portrait',
      amount: 100,
      colorAdjustments: {
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
      profile: 'Camera Portrait',
      amount: 100,
      colorAdjustments: {
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
      profile: 'Camera Portrait',
      amount: 100,
      colorAdjustments: {
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
      profile: 'Camera Neutral',
      amount: 100,
      colorAdjustments: {
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
      profile: 'Camera Monochrome',
      amount: 100,
      colorAdjustments: {
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
      profile: 'Camera Monochrome',
      amount: 100,
      colorAdjustments: {
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

  return profiles[simulation] || profiles['PROVIA/Standard'];
};