import { LutFormat } from '../luts/types';

export const VALID_LUT_EXTENSIONS: Record<LutFormat, string[]> = {
  '3dl': ['.3dl'],
  'cube': ['.cube']
};

export const getLutFormat = (filename: string): LutFormat | null => {
  const extension = filename.toLowerCase();
  
  if (extension.endsWith('.3dl')) return '3dl';
  if (extension.endsWith('.cube')) return 'cube';
  
  return null;
};

export const isValidLutFile = (file: File): boolean => {
  return !!getLutFormat(file.name);
};