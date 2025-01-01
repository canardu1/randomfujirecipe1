// Cinematic color profiles inspired by famous cinematographers and films
export const cinematicProfiles = {
  'Matrix Green': {
    base: {
      contrast: 1.5,
      saturation: 1.3,
      temperature: -15,
      shadows: '#001200',
      highlights: '#00ff00',
    },
    curves: {
      red: [[0, 0], [64, 40], [128, 90], [192, 140], [255, 200]], // Heavily reduced reds
      green: [[0, 20], [64, 95], [128, 165], [192, 235], [255, 255]], // Dramatically enhanced greens
      blue: [[0, 0], [64, 40], [128, 90], [192, 140], [255, 200]], // Reduced blues
    },
    effects: {
      tint: -30, // Green tint
      colorize: { hue: 120, strength: 0.3 } // Additional green colorization
    }
  },
  'Mexican Yellow': {
    base: {
      contrast: 1.4,
      saturation: 1.4,
      temperature: 25, // Much warmer
      shadows: '#402200',
      highlights: '#ffee00',
    },
    curves: {
      red: [[0, 10], [64, 95], [128, 175], [192, 235], [255, 255]], // Enhanced reds
      green: [[0, 10], [64, 90], [128, 170], [192, 230], [255, 255]], // Enhanced yellows
      blue: [[0, 0], [64, 30], [128, 70], [192, 120], [255, 180]], // Dramatically reduced blues
    },
    effects: {
      tint: 15, // Warm tint
      colorize: { hue: 45, strength: 0.25 } // Yellow colorization
    }
  },
  'Blade Runner': {
    base: {
      contrast: 1.4,
      saturation: 1.3,
      temperature: -20,
      shadows: '#000040',
      highlights: '#00ffff',
    },
    curves: {
      red: [[0, 0], [64, 45], [128, 100], [192, 165], [255, 225]],
      green: [[0, 5], [64, 70], [128, 135], [192, 195], [255, 245]],
      blue: [[0, 15], [64, 90], [128, 165], [192, 235], [255, 255]], // Dramatically enhanced blues
    },
    effects: {
      tint: -15, // Cyan tint
      colorize: { hue: 180, strength: 0.2 } // Cyan colorization
    }
  },
  // ... other profiles remain unchanged ...
} as const;

// Helper function to apply the enhanced effects
export const applyEnhancedEffects = (profile: typeof cinematicProfiles[keyof typeof cinematicProfiles]) => {
  const filters: string[] = [];
  
  // Apply base adjustments
  filters.push(`contrast(${profile.base.contrast})`);
  filters.push(`saturate(${profile.base.saturation})`);
  
  // Apply color temperature
  if (profile.base.temperature !== 0) {
    const temp = profile.base.temperature;
    filters.push(`sepia(${Math.abs(temp) * 0.05})`);
    if (temp > 0) {
      filters.push(`hue-rotate(-${temp}deg)`);
    } else {
      filters.push(`hue-rotate(${Math.abs(temp)}deg)`);
    }
  }

  // Apply effects if present
  if (profile.effects) {
    if (profile.effects.tint) {
      filters.push(`hue-rotate(${profile.effects.tint}deg)`);
    }
    if (profile.effects.colorize) {
      const { hue, strength } = profile.effects.colorize;
      filters.push(`sepia(${strength})`);
      filters.push(`hue-rotate(${hue}deg)`);
    }
  }

  return filters.join(' ');
};