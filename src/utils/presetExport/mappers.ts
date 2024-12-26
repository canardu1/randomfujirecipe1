import { Recipe } from '../../types/Recipe';
import { LightroomPreset, LightroomSettings } from './types';

const mapFilmSimulationToToneCurve = (simulation: string) => {
  // Simplified tone curves based on film simulations
  const curves: Record<string, [number, number][]> = {
    'Classic Neg': [[0, 0], [64, 74], [128, 138], [192, 192], [255, 255]],
    'Velvia': [[0, 0], [64, 60], [128, 138], [192, 200], [255, 255]],
    'Classic Chrome': [[0, 0], [64, 58], [128, 128], [192, 192], [255, 245]],
    'PROVIA/Standard': [[0, 0], [64, 64], [128, 128], [192, 192], [255, 255]],
    'ASTIA/Soft': [[0, 0], [64, 68], [128, 128], [192, 188], [255, 255]],
    'Eterna': [[0, 10], [64, 68], [128, 128], [192, 188], [255, 245]]
  };
  
  return curves[simulation] || curves['PROVIA/Standard'];
};

const mapGrainEffect = (effect: string, size: string) => {
  const amounts = { 'Off': 0, 'Weak': 25, 'Strong': 50 };
  const sizes = { 'Small': 25, 'Large': 50 };
  
  return {
    amount: amounts[effect] || 0,
    size: sizes[size] || 25,
    frequency: 50
  };
};

export const recipeToLightroomPreset = (recipe: Recipe): LightroomPreset => {
  const settings: LightroomSettings = {
    processVersion: "11.0",
    temperature: recipe.whiteBalanceShift.red * 100,
    tint: recipe.whiteBalanceShift.blue * 100,
    exposure: parseFloat(recipe.exposureCompensation) || 0,
    contrast: recipe.highlight * 10,
    highlights: recipe.highlight * 25,
    shadows: recipe.shadow * 25,
    whites: recipe.highlight * 15,
    blacks: recipe.shadow * 15,
    clarity: recipe.sharpness * 10,
    vibrance: recipe.color * 15,
    saturation: recipe.color * 10,
    toneCurve: {
      name: recipe.filmSimulation,
      points: mapFilmSimulationToToneCurve(recipe.filmSimulation)
    },
    ...mapGrainEffect(recipe.grainEffect, recipe.grainSize),
    splitToning: {
      highlights: { h: 0, s: 0 },
      shadows: { h: 0, s: 0 },
      balance: 0
    }
  };

  return {
    id: `com.fujifilm.recipe.${recipe.name.toLowerCase().replace(/\s+/g, '-')}`,
    internalName: recipe.name,
    title: recipe.name,
    type: "Develop",
    value: settings
  };
}