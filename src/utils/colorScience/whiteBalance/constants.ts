export const WB_TEMPERATURES = {
  Auto: { temp: 5500, tint: 0 },
  Daylight: { temp: 5500, tint: 0 },
  Shade: { temp: 7500, tint: 10 },
  Cloudy: { temp: 6500, tint: 10 },
  Tungsten: { temp: 3200, tint: 0 },
  Fluorescent: { temp: 4000, tint: 15 }
} as const;

export const WB_SHIFT_CONSTANTS = {
  // Maximum shift intensity (0-1 range)
  MAX_INTENSITY: 0.15,
  
  // Temperature multipliers
  TEMP_MULTIPLIER: 100, // Kelvin per shift unit
  TINT_MULTIPLIER: 5,   // Tint units per shift unit
  
  // Base filter strengths
  TEMPERATURE: {
    WARM: { r: 1.1, g: 1.0, b: 0.9 },
    COOL: { r: 0.9, g: 1.0, b: 1.1 }
  }
} as const;