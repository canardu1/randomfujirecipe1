import { Recipe } from '../../types/Recipe';
import { filmProfiles } from './profiles';
import { createColorTransform } from './transforms/colorTransform';
import { createMonochromeTransform } from './transforms/monochromeTransform';

const isMonochromeSimulation = (simulation: string): boolean => {
  return [
    'ACROS', 'Monochrome',
    'Tri-X 400', 'T-Max 400',
    'HP5 Plus', 'Delta 100',
    'Pan F Plus 50', 'XP2 Super'
  ].includes(simulation);
};

export const generateImageTransform = (recipe: Recipe, forExport: boolean = false): string => {
  const filters: string[] = [];

  // Get film profile
  const profile = filmProfiles[recipe.filmSimulation];
  if (!profile) return filters.join(' ');

  // Handle monochrome simulations differently
  if (isMonochromeSimulation(recipe.filmSimulation)) {
    return createMonochromeTransform(recipe, forExport);
  }

  // Apply base adjustments first
  filters.push(`contrast(${profile.base.contrast})`);
  filters.push(`saturate(${profile.base.saturation})`);

  // Apply color transform with white balance shifts
  const colorTransform = createColorTransform(profile.curves, recipe, forExport);
  if (colorTransform) {
    filters.push(colorTransform);
  }

  // Apply color adjustment
  if (recipe.color !== 0) {
    filters.push(`saturate(${1 + recipe.color * 0.1})`);
  }

  // Apply highlight and shadow adjustments
  if (recipe.highlight !== 0) {
    filters.push(`brightness(${1 + recipe.highlight * 0.05})`);
  }
  if (recipe.shadow !== 0) {
    filters.push(`brightness(${1 + recipe.shadow * 0.05})`);
  }

  // Apply grain effect
  if (recipe.grainEffect !== 'Off') {
    const grainStrength = recipe.grainEffect === 'Strong' ? 0.2 : 0.1;
    filters.push(`contrast(${1 + grainStrength})`);
    filters.push(`opacity(${1 - grainStrength * 0.5})`);
  }

  return filters.join(' ');
};