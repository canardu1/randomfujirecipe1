import { Recipe } from '../types/Recipe';
import { generateRecipeName } from './nameGenerator';
import {
  filmSimulations,
  dynamicRanges,
  grainEffects,
  grainSizes,
  chromeEffects,
  whiteBalances
} from '../data/constants';

const getSimulationsForCategories = (categories: string[]): string[] => {
  const categoryMap: Record<string, string[]> = {
    fujifilm: ['Classic Neg', 'Velvia', 'Classic Chrome', 'PROVIA/Standard', 'ASTIA/Soft', 'PRO Neg Hi', 'PRO Neg Std', 'Eterna', 'ACROS', 'Monochrome'],
    kodak: ['Portra 160', 'Portra 400', 'Portra 800', 'Ektar 100', 'Gold 200', 'ColorPlus 200', 'Tri-X 400', 'T-Max 400'],
    ilford: ['HP5 Plus', 'Delta 100', 'Pan F Plus 50', 'XP2 Super'],
    cinestill: ['CineStill 50D', 'CineStill 800T'],
    cinematic: ['Deakins Natural', 'Deakins Contrast', 'Urban Night', 'Muted Noir', 'Blade Runner', 'Matrix Green', 'Ozark Blue', 'Mexican Yellow', 'Neon Nights', 'Vintage Technicolor', 'Nordic Winter', 'Desert Gold', 'Moonlight', 'Autumn', 'Emerald City', 'Pastel Dream'],
    instagram: ['Golden Hour', 'Minimal Mood', 'Urban Fade', 'Cafe Tones', 'Travel Story', 'Clean Portrait']
  };

  return categories.flatMap(category => categoryMap[category] || []);
};

const randomFrom = <T>(array: readonly T[] | T[]): T => 
  array[Math.floor(Math.random() * array.length)];

const randomInt = (min: number, max: number): number => 
  Math.floor(Math.random() * (max - min + 1)) + min;

export const generateRandomRecipe = (selectedCategories: string[]): Recipe => {
  const availableSimulations = getSimulationsForCategories(selectedCategories);
  
  const defaultBorder = {
    enabled: false,
    color: '#ffffff',
    width: 20
  };

  return {
    name: generateRecipeName(),
    filmSimulation: randomFrom(availableSimulations),
    dynamicRange: randomFrom(dynamicRanges),
    highlight: randomInt(-2, 4),
    shadow: randomInt(-2, 4),
    color: randomInt(-4, 4),
    sharpness: randomInt(-4, 4),
    noiseReduction: randomInt(-4, 4),
    grainEffect: randomFrom(grainEffects),
    grainSize: randomFrom(grainSizes),
    whiteBalance: randomFrom(whiteBalances),
    whiteBalanceShift: {
      red: randomInt(-9, 9),
      blue: randomInt(-9, 9)
    },
    exposureCompensation: `${randomInt(-3, 3)}/3 EV`,
    chromeEffect: randomFrom(chromeEffects),
    chromeBluePriority: Math.random() > 0.5,
    chromeBlueEffect: randomFrom(chromeEffects),
    aspectRatio: 'Original',
    border: defaultBorder
  };
};