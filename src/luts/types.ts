// All supported film simulations
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

export type LutFormat = '3dl' | 'cube';

export interface LutData {
  simulation: FilmSimulation;
  data: number[][];
  format: LutFormat;
}