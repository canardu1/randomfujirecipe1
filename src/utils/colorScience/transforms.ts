import { CurveSet } from './types';

export const createColorTransform = (curves: CurveSet, forExport: boolean = false): string => {
  const filters: string[] = [];
  const strength = forExport ? 1.2 : 1;

  // Apply red curve
  if (curves.red) {
    const redShift = (curves.red[2][1] - curves.red[2][0]) / 255;
    if (Math.abs(redShift) > 0.01) {
      filters.push(`sepia(${Math.abs(redShift) * 0.3 * strength})`);
      if (redShift > 0) {
        filters.push(`hue-rotate(-${redShift * 15 * strength}deg)`);
      }
    }
  }

  // Apply blue curve
  if (curves.blue) {
    const blueShift = (curves.blue[2][1] - curves.blue[2][0]) / 255;
    if (Math.abs(blueShift) > 0.01) {
      filters.push(`hue-rotate(${blueShift * 10 * strength}deg)`);
    }
  }

  // Apply green curve
  if (curves.green) {
    const greenShift = (curves.green[2][1] - curves.green[2][0]) / 255;
    if (Math.abs(greenShift) > 0.01) {
      filters.push(`saturate(${1 + greenShift * 0.2 * strength})`);
    }
  }

  return filters.join(' ');
}