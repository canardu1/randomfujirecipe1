import { Recipe, FilmSimulation, ChromeEffect, AspectRatio } from '../types/Recipe';
import { BorderStyle } from '../types/styles';
import { generateRecipeName } from '../utils/nameGenerator';

export const filmSimulations = [
  'Classic Neg',
  'Velvia',
  'Classic Chrome',
  'PROVIA/Standard',
  'ASTIA/Soft',
  'PRO Neg Hi',
  'PRO Neg Std',
  'Eterna',
  'ACROS',
  'Monochrome'
] as const;

export const dynamicRanges = ['DR100', 'DR200', 'DR400'] as const;
export const grainEffects = ['Off', 'Weak', 'Strong'] as const;
export const grainSizes = ['Small', 'Large'] as const;
export const chromeEffects: ChromeEffect[] = ['Off', 'Weak', 'Strong'];
export const whiteBalances = ['Auto', 'Daylight', 'Shade', 'Cloudy', 'Tungsten', 'Fluorescent'] as const;
export const aspectRatios: AspectRatio[] = ['Original', '3:2', '16:9', '1:1'];

export const generateRandomRecipe = (): Recipe => {
  const randomInt = (min: number, max: number) => 
    Math.floor(Math.random() * (max - min + 1)) + min;
  
  const randomFrom = <T>(array: readonly T[]): T => 
    array[Math.floor(Math.random() * array.length)];

  const defaultBorder: BorderStyle = {
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
    aspectRatio: 'Original',
    border: defaultBorder
  };
};