import { FilmSimulation } from './types';

// Map film simulation names to their corresponding LUT data
export const getLutData = (simulation: FilmSimulation): string | null => {
  // This will be populated with actual LUT data once provided
  return null;
};

// Apply LUT to canvas/image data
export const applyLut = (
  imageData: ImageData,
  lutData: string
): ImageData => {
  // LUT application logic will be implemented once LUT data is provided
  return imageData;
};