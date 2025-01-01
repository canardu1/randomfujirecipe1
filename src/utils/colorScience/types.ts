// Color science types
export interface RGBCurve {
  red: [number, number][];
  green: [number, number][];
  blue: [number, number][];
}

export interface ColorEffect {
  tint?: number;
  colorize?: {
    hue: number;
    strength: number;
  };
}

export interface FilmProfile {
  base: {
    contrast: number;
    saturation: number;
    temperature: number;
    shadows: string;
    highlights: string;
  };
  curves: RGBCurve;
  effects?: ColorEffect;
}

export type FilmProfiles = Record<string, FilmProfile>;