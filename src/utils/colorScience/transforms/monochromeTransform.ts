import { Recipe } from '../../../types/Recipe';

export const createMonochromeTransform = (
  recipe: Recipe,
  forExport: boolean = false
): string => {
  const filters: string[] = [];

  // Convert to grayscale first
  filters.push('grayscale(1)');

  // Base contrast based on film type
  const contrastMap: Record<string, number> = {
    'ACROS': 1.25,
    'Monochrome': 1.15,
    'Tri-X 400': 1.25,
    'T-Max 400': 1.2,
    'HP5 Plus': 1.18,
    'Delta 100': 1.3,
    'Pan F Plus 50': 1.35,
    'XP2 Super': 1.22
  };

  const baseContrast = contrastMap[recipe.filmSimulation] || 1.2;
  filters.push(`contrast(${baseContrast})`);

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