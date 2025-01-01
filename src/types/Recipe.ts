export type FilmSimulation = 
  | 'Classic Neg'
  | 'Velvia'
  | 'Classic Chrome'
  | 'PROVIA/Standard'
  | 'ASTIA/Soft'
  | 'PRO Neg Hi'
  | 'PRO Neg Std'
  | 'Eterna'
  | 'ACROS'
  | 'Monochrome';

export type ChromeEffect = 'Off' | 'Weak' | 'Strong';
export type AspectRatio = '3:2' | '16:9' | '1:1' | 'Original';

export interface Recipe {
  name: string;
  filmSimulation: FilmSimulation;
  dynamicRange: string;
  highlight: number;
  shadow: number;
  color: number;
  sharpness: number;
  noiseReduction: number;
  grainEffect: string;
  grainSize: string;
  whiteBalance: string;
  whiteBalanceShift: {
    red: number;
    blue: number;
  };
  exposureCompensation: string;
  chromeEffect: ChromeEffect;
  aspectRatio: AspectRatio;
  border: BorderStyle;
}