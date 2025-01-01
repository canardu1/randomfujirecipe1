import { Recipe } from '../types/Recipe';
import { BorderStyle } from '../types/styles';
import { generateRecipeName } from '../utils/nameGenerator';
import {
  filmSimulations,
  dynamicRanges,
  grainEffects,
  grainSizes,
  chromeEffects,
  whiteBalances
} from './constants';

export {
  filmSimulations,
  dynamicRanges,
  grainEffects,
  grainSizes,
  chromeEffects,
  whiteBalances
};

const randomFrom = <T>(array: readonly T[]): T => 
  array[Math.floor(Math.random() * array.length)];

const randomInt = (min: number, max: number): number => 
  Math.floor(Math.random() * (max - min + 1)) + min;

export const generateRandomRecipe = (): Recipe => {
  const defaultBorder = {
    enabled: false,
    color: '#ffffff',
    width: 20
  };

  return {
    name: generateRecipeName(),
    filmSimulation: randomFrom(filmSimulations),
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