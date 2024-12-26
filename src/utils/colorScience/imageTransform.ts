import { Recipe } from '../../types/Recipe';
import { filmProfiles } from './filmProfiles';
import { WB_TEMPERATURES } from './whiteBalance/constants';
import { createColorShift } from './transforms';

export const generateImageTransform = (recipe: Recipe): string => {
  const profile = filmProfiles[recipe.filmSimulation];
  if (!profile) return '';

  const filters: string[] = [];
  
  // 1. Apply white balance preset
  const wbPreset = WB_TEMPERATURES[recipe.whiteBalance];
  if (wbPreset) {
    // Convert temperature difference to color shift
    const baseTemp = WB_TEMPERATURES.Daylight.temp;
    const tempDiff = wbPreset.temp - baseTemp;
    
    if (tempDiff !== 0) {
      const tempShift = tempDiff / 1000; // Normalize to -4 to +4 range
      const intensity = Math.abs(tempShift) * 0.15;
      
      if (tempShift > 0) {
        // Warmer
        filters.push(`sepia(${intensity})`);
        filters.push(`hue-rotate(-${intensity * 30}deg)`);
      } else {
        // Cooler
        filters.push(`sepia(${intensity})`);
        filters.push(`hue-rotate(${intensity * 60}deg)`);
      }
    }
    
    // Apply tint
    if (wbPreset.tint !== 0) {
      const tintStrength = wbPreset.tint / 20;
      filters.push(`hue-rotate(${tintStrength * 5}deg)`);
    }
  }

  // 2. Apply white balance fine-tuning
  const redShiftFilter = createColorShift(recipe.whiteBalanceShift.red);
  if (redShiftFilter) filters.push(redShiftFilter);
  
  const blueShiftFilter = createColorShift(recipe.whiteBalanceShift.blue);
  if (blueShiftFilter) filters.push(blueShiftFilter);

  // 3. Apply base adjustments from film profile
  filters.push(`contrast(${profile.base.contrast})`);
  filters.push(`saturate(${profile.base.saturation})`);
  
  // 4. Apply recipe adjustments
  if (recipe.highlight !== 0) {
    filters.push(`brightness(${1 + recipe.highlight * 0.05})`);
  }
  
  if (recipe.shadow !== 0) {
    filters.push(`brightness(${1 + recipe.shadow * 0.05})`);
  }
  
  if (recipe.color !== 0) {
    filters.push(`saturate(${1 + recipe.color * 0.1})`);
  }

  // 5. Special handling for monochrome simulations
  if (recipe.filmSimulation === 'ACROS' || recipe.filmSimulation === 'Monochrome') {
    filters.push('grayscale(1)');
    if (recipe.filmSimulation === 'ACROS') {
      filters.push('contrast(1.1)');
    }
  }

  return filters.join(' ');
};