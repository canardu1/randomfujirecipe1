import { parse3dlLut } from './3dl';
import { parseCubeLut } from './cube';
import { LutFormat } from '../../luts/types';

export const parseLut = async (file: File, format: LutFormat): Promise<number[][]> => {
  switch (format) {
    case '3dl':
      return parse3dlLut(file);
    case 'cube':
      return parseCubeLut(file);
    default:
      throw new Error(`Unsupported LUT format: ${format}`);
  }
}