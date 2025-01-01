import { Recipe } from '../../../types/Recipe';
import { RGBCurve } from '../types';
import { filmSimulationMetadata } from '../../../types/FilmSimulation';

export const createColorTransform = (
  curves: RGBCurve,
  recipe: Recipe,
  forExport: boolean = false
): string => {
  const filters: string[] = [];

  // Get natural white balance for film simulation
  const naturalWB = filmSimulationMetadata[recipe.filmSimulation]?.defaultWhiteBalance || 'Daylight';
  
  // Apply white balance adjustments
  const { red, blue } = recipe.whiteBalanceShift;
  
  // Temperature (red shift)
  if (red !== 0) {
    const redIntensity = Math.abs(red) / 9 * (forExport ? 0.2 : 0.15);
    if (red > 0) {
      // Warmer
      filters.push(`sepia(${redIntensity})`);
      filters.push(`hue-rotate(-${redIntensity * 30}deg)`);
      filters.push(`saturate(${1 + redIntensity * 0.3})`);
    } else {
      // Cooler
      filters.push(`sepia(${redIntensity})`);
      filters.push(`hue-rotate(${redIntensity * 60}deg)`);
      filters.push(`saturate(${1 + redIntensity * 0.2})`);
    }
  }

  // Tint (blue shift)
  if (blue !== 0) {
    const blueIntensity = Math.abs(blue) / 9 * (forExport ? 0.2 : 0.15);
    if (blue > 0) {
      // More magenta
      filters.push(`sepia(${blueIntensity * 0.3})`);
      filters.push(`hue-rotate(${blueIntensity * 90}deg)`);
      filters.push(`saturate(${1 + blueIntensity * 0.2})`);
    } else {
      // More green
      filters.push(`sepia(${blueIntensity * 0.3})`);
      filters.push(`hue-rotate(-${blueIntensity * 90}deg)`);
      filters.push(`saturate(${1 + blueIntensity * 0.2})`);
    }
  }

  // Apply white balance presets
  switch (recipe.whiteBalance) {
    case 'Daylight':
      // Neutral reference point
      break;
    case 'Shade':
      filters.push('sepia(0.15)');
      filters.push('hue-rotate(-15deg)');
      filters.push('saturate(1.1)');
      break;
    case 'Cloudy':
      filters.push('sepia(0.1)');
      filters.push('hue-rotate(-10deg)');
      filters.push('saturate(1.05)');
      break;
    case 'Tungsten':
      filters.push('sepia(0.2)');
      filters.push('hue-rotate(30deg)');
      filters.push('saturate(0.9)');
      break;
    case 'Fluorescent':
      filters.push('sepia(0.15)');
      filters.push('hue-rotate(-30deg)');
      filters.push('saturate(0.95)');
      break;
  }

  // Apply Chrome Effect
  if (recipe.chromeEffect !== 'Off') {
    const chromeStrength = recipe.chromeEffect === 'Strong' ? 0.3 : 0.15;
    filters.push(`contrast(${1 + chromeStrength})`);
    filters.push(`saturate(${1 - chromeStrength * 0.5})`);
  }

  return filters.join(' ');
};