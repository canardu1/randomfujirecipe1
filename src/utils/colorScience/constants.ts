export const WB_CONSTANTS = {
  // Maximum intensity for color shifts (0-1 range)
  MAX_INTENSITY: 0.15,  // Reduced from 0.5
  
  // Color shift angles in degrees
  ANGLES: {
    RED: {
      POSITIVE: -8,    // Reduced from -10
      NEGATIVE: 165    // Adjusted from 160
    },
    BLUE: {
      POSITIVE: 185,   // Adjusted from 180
      NEGATIVE: -8     // Adjusted from -5
    }
  },
  
  // Saturation multipliers
  SATURATION: {
    RED: {
      POSITIVE: 0.1,   // Reduced from 0.2
      NEGATIVE: 0.05   // Reduced from 0.1
    },
    BLUE: {
      POSITIVE: 0.08,  // Reduced from 0.15
      NEGATIVE: 0.05   // Reduced from 0.1
    }
  }
} as const;