import { filmSimulationMetadata } from '../types/FilmSimulation';

// Get the natural white balance for a film simulation
export const getNaturalWhiteBalance = (simulation: string): string => {
  return filmSimulationMetadata[simulation]?.defaultWhiteBalance || 'Auto';
};

// Get the display name for a film simulation
export const getFilmSimulationName = (simulation: string): string => {
  return filmSimulationMetadata[simulation]?.name || simulation;
};

// Get the description for a film simulation
export const getFilmSimulationDescription = (simulation: string): string => {
  return filmSimulationMetadata[simulation]?.description || '';
};